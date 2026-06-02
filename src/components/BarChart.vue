<script setup lang="ts">
import { computed } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent, GridComponent } from 'echarts/components'
import type { ModelData, BenchmarkInfo } from '../data/models'

use([CanvasRenderer, BarChart, TooltipComponent, LegendComponent, GridComponent])

const props = defineProps<{
  models: ModelData[]
  benchmarks: BenchmarkInfo[]
}>()

const option = computed(() => {
  const categories = props.benchmarks.map((b) => b.label)

  const seriesData = props.models.map((model) => ({
    name: model.name,
    type: 'bar' as const,
    barGap: '10%',
    barMaxWidth: 32,
    emphasis: {
      focus: 'series' as const,
    },
    itemStyle: {
      color: model.color,
      borderRadius: [4, 4, 0, 0],
    },
    data: props.benchmarks.map((b) => {
      const val = model.benchmarks[b.key]
      return typeof val === 'number' ? val : 0
    }),
  }))

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      backgroundColor: 'rgba(15, 23, 42, 0.95)',
      borderColor: 'rgba(99, 102, 241, 0.3)',
      borderWidth: 1,
      textStyle: {
        color: '#f1f5f9',
        fontSize: 13,
      },
      formatter: (params: any) => {
        const items = params as any[]
        let html = `<div style="font-weight:600;margin-bottom:6px">${items[0]?.axisValue}</div>`
        items
          .sort((a: any, b: any) => b.value - a.value)
          .forEach((p: any) => {
            const model = props.models.find((m) => m.name === p.seriesName)
            html += `<div style="display:flex;justify-content:space-between;gap:1.5rem;padding:1px 0">
              <span style="display:flex;align-items:center;gap:6px">
                <span style="width:8px;height:8px;border-radius:50%;background:${model?.color || '#999'};display:inline-block"></span>
                ${p.seriesName}
              </span>
              <span style="font-weight:600">${p.value?.toFixed(1) ?? '-'}</span>
            </div>`
          })
        return html
      },
    },
    legend: {
      bottom: 0,
      textStyle: {
        color: '#94a3b8',
        fontSize: 12,
      },
      icon: 'circle',
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 24,
    },
    grid: {
      top: 16,
      left: 8,
      right: 16,
      bottom: 48,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: categories,
      axisLabel: {
        color: '#94a3b8',
        fontSize: 11,
        rotate: 15,
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(51, 65, 85, 0.4)',
        },
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100,
      splitNumber: 5,
      axisLabel: {
        color: '#64748b',
        fontSize: 11,
        formatter: '{value}',
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(51, 65, 85, 0.3)',
        },
      },
    },
    series: seriesData,
  }
})
</script>

<template>
  <div class="bar-chart">
    <v-chart :option="option" autoresize style="height: 420px" />
  </div>
</template>

<style scoped>
.bar-chart {
  width: 100%;
}
</style>
