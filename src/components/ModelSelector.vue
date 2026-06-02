<script setup lang="ts">
import type { ModelData } from '../data/models'

const props = defineProps<{
  models: ModelData[]
  selectedIds: string[]
  maxSelection: number
}>()

const emit = defineEmits<{
  update: [ids: string[]]
}>()

function toggle(modelId: string) {
  const isSelected = props.selectedIds.includes(modelId)
  if (isSelected) {
    emit('update', props.selectedIds.filter((id) => id !== modelId))
  } else if (props.selectedIds.length < props.maxSelection) {
    emit('update', [...props.selectedIds, modelId])
  }
}

function isSelected(modelId: string) {
  return props.selectedIds.includes(modelId)
}

const providers = [...new Set(props.models.map((m) => m.provider))]
</script>

<template>
  <div class="selector">
    <div v-for="provider in providers" :key="provider" class="provider-group">
      <div class="provider-label">{{ provider }}</div>
      <div class="model-list">
        <button
          v-for="model in models.filter((m) => m.provider === provider)"
          :key="model.id"
          class="model-chip"
          :class="{
            selected: isSelected(model.id),
            disabled: !isSelected(model.id) && selectedIds.length >= maxSelection,
          }"
          :style="
            isSelected(model.id)
              ? { borderColor: model.color, background: model.color + '18', color: model.color }
              : {}
          "
          @click="toggle(model.id)"
        >
          <span class="chip-dot" :style="{ background: model.color }"></span>
          <span class="chip-name">{{ model.name }}</span>
          <span v-if="model.isOpenSource" class="chip-badge">开源</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.selector {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.provider-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.provider-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
  min-width: 72px;
  text-align: right;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.model-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.model-chip {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 999px;
  background: var(--bg-card);
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}

.model-chip:hover:not(.disabled) {
  background: var(--bg-card-hover);
  border-color: var(--text-muted);
}

.model-chip.selected {
  font-weight: 600;
  border-width: 2px;
}

.model-chip.disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.chip-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.chip-name {
  white-space: nowrap;
}

.chip-badge {
  font-size: 0.625rem;
  font-weight: 700;
  padding: 0.125rem 0.375rem;
  border-radius: 999px;
  background: rgba(34, 197, 94, 0.15);
  color: #22c55e;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

@media (max-width: 768px) {
  .provider-group {
    flex-direction: column;
    align-items: flex-start;
  }

  .provider-label {
    text-align: left;
    min-width: auto;
  }
}
</style>
