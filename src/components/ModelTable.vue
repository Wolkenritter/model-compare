<script setup lang="ts">
import type { ModelData, BenchmarkInfo } from '../data/models'

const props = defineProps<{
  models: ModelData[]
  benchmarks: BenchmarkInfo[]
}>()

function getBestScore(benchmark: BenchmarkInfo): number {
  return Math.max(...props.models.map((m) => m.benchmarks[benchmark.key] as number))
}

function isBest(model: ModelData, benchmark: BenchmarkInfo): boolean {
  return (model.benchmarks[benchmark.key] as number) === getBestScore(benchmark)
}
</script>

<template>
  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th class="sticky-col">模型</th>
          <th v-for="b in benchmarks" :key="b.key" class="score-col">
            <div class="th-label">{{ b.label }}</div>
            <div class="th-desc">{{ b.description }}</div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="model in models" :key="model.id">
          <td class="sticky-col">
            <div class="model-cell">
              <span class="model-dot" :style="{ background: model.color }"></span>
              <div>
                <div class="model-name">{{ model.name }}</div>
                <div class="model-provider">{{ model.provider }}</div>
              </div>
            </div>
          </td>
          <td
            v-for="b in benchmarks"
            :key="b.key"
            class="score-cell"
            :class="{ best: isBest(model, b) }"
          >
            <span class="score-value">{{ (model.benchmarks[b.key] as number).toFixed(1) }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-wrapper {
  overflow-x: auto;
  margin-top: 0.5rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

th,
td {
  padding: 0.75rem 1rem;
  text-align: center;
  white-space: nowrap;
}

thead tr {
  border-bottom: 2px solid var(--border-color);
}

.sticky-col {
  position: sticky;
  left: 0;
  background: var(--bg-card);
  z-index: 1;
  text-align: left;
  min-width: 180px;
}

thead .sticky-col {
  z-index: 2;
  background: var(--bg-card);
}

.score-col {
  min-width: 100px;
}

.th-label {
  font-weight: 600;
  color: var(--text-primary);
}

.th-desc {
  font-size: 0.625rem;
  color: var(--text-muted);
  margin-top: 0.125rem;
  font-weight: 400;
  white-space: normal;
  max-width: 100px;
}

.model-cell {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.model-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.model-name {
  font-weight: 600;
  color: var(--text-primary);
}

.model-provider {
  font-size: 0.7rem;
  color: var(--text-muted);
}

.score-cell {
  font-variant-numeric: tabular-nums;
}

.score-value {
  font-weight: 500;
  color: var(--text-secondary);
}

.best .score-value {
  color: var(--accent-light);
  font-weight: 700;
}

tbody tr {
  border-bottom: 1px solid rgba(51, 65, 85, 0.3);
}

tbody tr:hover {
  background: rgba(99, 102, 241, 0.04);
}

tbody tr:hover .sticky-col {
  background: var(--bg-card-hover);
}
</style>
