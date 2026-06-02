<script setup lang="ts">
import { computed } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { RadarChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent, RadarComponent } from 'echarts/components'
import type { ModelData, BenchmarkInfo } from '../data/models'

use([CanvasRenderer, RadarChart, TooltipComponent, LegendComponent, RadarComponent])

const props = defineProps<{
  models: ModelData[]
  benchmarks: BenchmarkInfo[]
}>()

const option = computed(() => {
  const indicator = props.benchmarks.map((b) => ({
    name: b.label,
    max: 100,
  }))

  const seriesData = props.models.map((model) => ({
    name: model.name,
    value: props.benchmarks.map((b) => model.benchmarks[b.key]),
    symbol: 'circle',
    symbolSize: 6,
    lineStyle: {
      width: 2.5,
    },
    areaStyle: {
      opacity: 0.12,
    },
    itemStyle: {
      color: model.color,
    },
  }))

  return {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(15, 23, 42, 0.95)',
      borderColor: 'rgba(99, 102, 241, 0.3)',
      borderWidth: 1,
      textStyle: {
        color: '#f1f5f9',
        fontSize: 13,
      },
      formatter: (params: any) => {
        const values = params.value
        let html = `<div style="font-weight:600;margin-bottom:6px;color:${params.color}">${params.name}</div>`
        props.benchmarks.forEach((b, i) => {
          html += `<div style="display:flex;justify-content:space-between;gap:1.5rem;padding:1px 0">
            <span style="color:#94a3b8">${b.label}</span>
            <span style="font-weight:600">${values[i].toFixed(1)}</span>
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
    radar: {
      indicator,
      radius: '65%',
      center: ['50%', '48%'],
      shape: 'polygon',
      axisName: {
        color: '#94a3b8',
        fontSize: 11,
        fontWeight: 500,
      },
      splitArea: {
        areaStyle: {
          color: ['rgba(99, 102, 241, 0.02)', 'rgba(99, 102, 241, 0.05)'],
        },
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(51, 65, 85, 0.6)',
        },
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(51, 65, 85, 0.4)',
        },
      },
    },
    series: [
      {
        type: 'radar',
        data: seriesData,
        emphasis: {
          lineStyle: {
            width: 3.5,
          },
        },
      },
    ],
  }
})
</script>

<template>
  <div class="radar-chart">
    <v-chart :option="option" autoresize style="height: 420px" />
  </div>
</template>

<style scoped>
.radar-chart {
  width: 100%;
}
</style>
