<script setup lang="ts">
import { ref, computed } from 'vue'
import { models, benchmarks, type ModelData } from './data/models'
import ModelSelector from './components/ModelSelector.vue'
import RadarChart from './components/RadarChart.vue'
import BarChart from './components/BarChart.vue'
import ModelTable from './components/ModelTable.vue'

const selectedModelIds = ref<string[]>(['gpt5.5', 'claude-opus-4.6'])

const selectedModels = computed<ModelData[]>(() =>
  selectedModelIds.value
    .map((id) => models.find((m) => m.id === id))
    .filter((m): m is ModelData => m !== undefined)
)


function handleSelectionChange(ids: string[]) {
  selectedModelIds.value = ids
}
</script>

<template>
  <div class="app">
    <header class="header" role="banner">
      <div class="header-inner">
        <div class="logo">
          <div class="logo-icon" aria-hidden="true">AI</div>
          <div>
            <h1>Model Compare</h1>
            <p class="subtitle">主流大模型能力对比 · 截至 2026 年 6 月</p>
          </div>
        </div>
      </div>
    </header>

    <main class="main" role="main">
      <section class="selector-section" aria-labelledby="select-models">
        <div class="section-header">
          <h2 id="select-models">选择模型</h2>
          <span class="badge" aria-live="polite">{{ selectedModelIds.length }} / 3 已选</span>
        </div>
        <ModelSelector
          :models="models"
          :selectedIds="selectedModelIds"
          :maxSelection="3"
          @update="handleSelectionChange"
        />
      </section>

      <section v-if="selectedModels.length >= 2" class="charts-section" aria-labelledby="radar-chart-title">
        <div class="charts-grid">
          <div class="chart-card">
            <h3 id="radar-chart-title">能力雷达图</h3>
            <p class="chart-desc">多维度能力综合对比</p>
            <RadarChart :models="selectedModels" :benchmarks="benchmarks" />
          </div>
          <div class="chart-card">
            <h3 id="bar-chart-title">基准测试得分</h3>
            <p class="chart-desc">各测试基准分项对比</p>
            <BarChart :models="selectedModels" :benchmarks="benchmarks" />
          </div>
        </div>
      </section>

      <section v-if="selectedModels.length >= 2" class="table-section" aria-labelledby="detail-table-title">
        <div class="chart-card">
          <h3 id="detail-table-title">详细数据</h3>
          <p class="chart-desc">所有基准测试的精确得分</p>
          <ModelTable :models="selectedModels" :benchmarks="benchmarks" />
        </div>
      </section>

      <section v-if="selectedModels.length < 2" class="empty-state" aria-label="提示">
        <div class="empty-icon" aria-hidden="true">📊</div>
        <h3>请选择至少 2 个模型</h3>
        <p>选择 2-3 个主流大模型，即可查看它们在各基准测试中的对比结果。</p>
      </section>

      <section class="seo-content" aria-label="关于大模型评测">
        <h2>关于 AI 大模型评测</h2>
        <p>
          本平台收录了截至 2026 年 6 月的主流 AI 大模型，包括 OpenAI GPT-5.5、Anthropic Claude Opus 4.6、Google Gemini 3 Pro、DeepSeek V4、Xiaomi MiMo V2.5 Pro、MiniMax M3、Zhipu GLM-5.1、Moonshot Kimi K2.6、Meta Llama 4 Maverick、Alibaba Qwen3 235B、xAI Grok 3.5 等 16+ 模型。
        </p>
        <p>
          对比维度涵盖 MMLU（大规模多任务语言理解）、GPQA Diamond（研究生级别科学推理）、MATH（竞赛级数学推理）、HumanEval（Python 代码生成）、SWE-bench（真实软件工程问题修复）、MMMU（多模态理解）、Arena Elo（人类偏好投票评分）共 7 项权威基准测试。
        </p>
        <p>
          支持任意选择 2-3 个模型进行可视化对比，通过雷达图和柱状图直观展示各模型的能力差异，帮助开发者和研究人员选择最适合的 AI 模型。
        </p>
      </section>
    </main>

    <footer class="footer" role="contentinfo">
      <p>数据来源：官方技术报告、第三方评测、公开排行榜 · 数据截止 2026 年 6 月 2 日</p>
    </footer>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
}

.header {
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  padding: 1.25rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(12px);
}

.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.875rem;
  color: white;
  letter-spacing: 1px;
}

.logo h1 {
  font-size: 1.375rem;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.subtitle {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-top: 0.125rem;
}

.main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.section-header h2 {
  font-size: 1.25rem;
  font-weight: 600;
}

.badge {
  background: var(--accent-bg);
  color: var(--accent-light);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  border: 1px solid rgba(99, 102, 241, 0.2);
}

.selector-section {
  margin-bottom: 2rem;
}

.charts-section {
  margin-bottom: 2rem;
}

.charts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.chart-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: 1.5rem;
  transition: border-color 0.2s;
}

.chart-card:hover {
  border-color: var(--accent);
}

.chart-card h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.chart-desc {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 1.25rem;
}

.table-section {
  margin-bottom: 2rem;
}

.empty-state {
  text-align: center;
  padding: 5rem 2rem;
  color: var(--text-secondary);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.empty-state h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.footer {
  text-align: center;
  padding: 2rem 0 1rem;
  font-size: 0.75rem;
  color: var(--text-muted);
  border-top: 1px solid var(--border-color);
  margin-top: 2rem;
}

.seo-content {
  margin-top: 3rem;
  padding: 2rem;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
}

.seo-content h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.seo-content p {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 0.75rem;
}

.seo-content p:last-child {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .header {
    padding: 1rem;
  }

  .main {
    padding: 1rem;
  }

  .charts-grid {
    grid-template-columns: 1fr;
  }

  .logo h1 {
    font-size: 1.125rem;
  }
}
</style>
