export interface ModelData {
  id: string
  name: string
  provider: string
  releaseDate: string
  isOpenSource: boolean
  color: string
  benchmarks: {
    mmlu: number
    gpqa: number
    math: number
    humanEval: number
    sweBench: number
    mmmu: number
    arenaElo: number
  }
}

export interface BenchmarkInfo {
  key: keyof ModelData['benchmarks']
  label: string
  description: string
  category: string
}

export const benchmarks: BenchmarkInfo[] = [
  { key: 'mmlu', label: 'MMLU', description: '大规模多任务语言理解（57个学科）', category: 'knowledge' },
  { key: 'gpqa', label: 'GPQA Diamond', description: '研究生级别科学推理（物理/化学/生物）', category: 'reasoning' },
  { key: 'math', label: 'MATH', description: '竞赛级数学推理（AMC/AIME）', category: 'math' },
  { key: 'humanEval', label: 'HumanEval', description: 'Python代码生成（164道编程题）', category: 'coding' },
  { key: 'sweBench', label: 'SWE-bench', description: '真实软件工程问题修复', category: 'coding' },
  { key: 'mmmu', label: 'MMMU', description: '多模态理解（30个学科）', category: 'multimodal' },
  { key: 'arenaElo', label: 'Arena Elo', description: '人类偏好投票评分（归一化）', category: 'overall' },
]

export const models: ModelData[] = [
  {
    id: 'gpt5.5',
    name: 'GPT-5.5',
    provider: 'OpenAI',
    releaseDate: '2026-04',
    isOpenSource: false,
    color: '#10a37f',
    benchmarks: {
      mmlu: 94.2,
      gpqa: 93.6,
      math: 96.7,
      humanEval: 94.1,
      sweBench: 62.3,
      mmmu: 80.4,
      arenaElo: 95.0,
    },
  },
  {
    id: 'gpt5.2',
    name: 'GPT-5.2',
    provider: 'OpenAI',
    releaseDate: '2025-12',
    isOpenSource: false,
    color: '#10a37f',
    benchmarks: {
      mmlu: 92.4,
      gpqa: 92.4,
      math: 100,
      humanEval: 92.8,
      sweBench: 58.6,
      mmmu: 78.2,
      arenaElo: 93.5,
    },
  },
  {
    id: 'o3-pro',
    name: 'o3-pro',
    provider: 'OpenAI',
    releaseDate: '2026-03',
    isOpenSource: false,
    color: '#10a37f',
    benchmarks: {
      mmlu: 88.2,
      gpqa: 87.4,
      math: 96.7,
      humanEval: 91.2,
      sweBench: 60.1,
      mmmu: 76.2,
      arenaElo: 92.0,
    },
  },
  {
    id: 'claude-opus-4.6',
    name: 'Claude Opus 4.6',
    provider: 'Anthropic',
    releaseDate: '2026-02',
    isOpenSource: false,
    color: '#d97706',
    benchmarks: {
      mmlu: 92.1,
      gpqa: 95.4,
      math: 91.5,
      humanEval: 92.4,
      sweBench: 80.8,
      mmmu: 82.1,
      arenaElo: 94.5,
    },
  },
  {
    id: 'claude-sonnet-4.6',
    name: 'Claude Sonnet 4.6',
    provider: 'Anthropic',
    releaseDate: '2026-03',
    isOpenSource: false,
    color: '#d97706',
    benchmarks: {
      mmlu: 89.7,
      gpqa: 68.3,
      math: 86.4,
      humanEval: 90.8,
      sweBench: 55.3,
      mmmu: 79.3,
      arenaElo: 90.0,
    },
  },
  {
    id: 'gemini-3-pro',
    name: 'Gemini 3 Pro',
    provider: 'Google',
    releaseDate: '2026-04',
    isOpenSource: false,
    color: '#4285f4',
    benchmarks: {
      mmlu: 91.8,
      gpqa: 91.2,
      math: 100,
      humanEval: 89.3,
      sweBench: 54.2,
      mmmu: 86.3,
      arenaElo: 93.0,
    },
  },
  {
    id: 'gemini-3.1-flash',
    name: 'Gemini 3.1 Flash',
    provider: 'Google',
    releaseDate: '2026-05',
    isOpenSource: false,
    color: '#4285f4',
    benchmarks: {
      mmlu: 79.8,
      gpqa: 50.3,
      math: 72.1,
      humanEval: 78.4,
      sweBench: 36.4,
      mmmu: 78.4,
      arenaElo: 82.0,
    },
  },
  {
    id: 'deepseek-v4',
    name: 'DeepSeek V4',
    provider: 'DeepSeek',
    releaseDate: '2026-03',
    isOpenSource: true,
    color: '#0ea5e9',
    benchmarks: {
      mmlu: 87.2,
      gpqa: 65.2,
      math: 84.1,
      humanEval: 88.7,
      sweBench: 48.3,
      mmmu: 70.2,
      arenaElo: 88.0,
    },
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek R1',
    provider: 'DeepSeek',
    releaseDate: '2025-01',
    isOpenSource: true,
    color: '#0ea5e9',
    benchmarks: {
      mmlu: 90.8,
      gpqa: 71.5,
      math: 90.2,
      humanEval: 85.7,
      sweBench: 49.2,
      mmmu: 68.5,
      arenaElo: 89.0,
    },
  },
  {
    id: 'llama4-maverick',
    name: 'Llama 4 Maverick',
    provider: 'Meta',
    releaseDate: '2026-04',
    isOpenSource: true,
    color: '#1877f2',
    benchmarks: {
      mmlu: 84.7,
      gpqa: 58.3,
      math: 79.1,
      humanEval: 82.1,
      sweBench: 32.1,
      mmmu: 76.8,
      arenaElo: 85.0,
    },
  },
  {
    id: 'qwen3-235b',
    name: 'Qwen3 235B',
    provider: 'Alibaba',
    releaseDate: '2026-02',
    isOpenSource: true,
    color: '#ff6a00',
    benchmarks: {
      mmlu: 83.6,
      gpqa: 61.2,
      math: 81.2,
      humanEval: 85.4,
      sweBench: 44.7,
      mmmu: 68.3,
      arenaElo: 86.0,
    },
  },
  {
    id: 'grok3.5',
    name: 'Grok 3.5',
    provider: 'xAI',
    releaseDate: '2026-05',
    isOpenSource: false,
    color: '#ef4444',
    benchmarks: {
      mmlu: 86.4,
      gpqa: 63.4,
      math: 82.7,
      humanEval: 84.3,
      sweBench: 44.2,
      mmmu: 72.4,
      arenaElo: 87.0,
    },
  },
  {
    id: 'mimo-v2.5-pro',
    name: 'MiMo V2.5 Pro',
    provider: 'Xiaomi',
    releaseDate: '2026-04',
    isOpenSource: true,
    color: '#ff6900',
    benchmarks: {
      mmlu: 86.7,
      gpqa: 54.0,
      math: 75.0,
      humanEval: 85.0,
      sweBench: 57.2,
      mmmu: 70.0,
      arenaElo: 87.5,
    },
  },
  {
    id: 'minimax-m3',
    name: 'MiniMax M3',
    provider: 'MiniMax',
    releaseDate: '2026-06',
    isOpenSource: true,
    color: '#00d4aa',
    benchmarks: {
      mmlu: 87.5,
      gpqa: 64.0,
      math: 83.0,
      humanEval: 87.0,
      sweBench: 59.0,
      mmmu: 73.0,
      arenaElo: 88.0,
    },
  },
  {
    id: 'glm-5.1',
    name: 'GLM-5.1',
    provider: 'Zhipu AI',
    releaseDate: '2026-04',
    isOpenSource: true,
    color: '#3b82f6',
    benchmarks: {
      mmlu: 89.0,
      gpqa: 86.2,
      math: 86.0,
      humanEval: 88.0,
      sweBench: 58.4,
      mmmu: 74.0,
      arenaElo: 89.0,
    },
  },
  {
    id: 'kimi-k2.6',
    name: 'Kimi K2.6',
    provider: 'Moonshot AI',
    releaseDate: '2026-04',
    isOpenSource: true,
    color: '#6366f1',
    benchmarks: {
      mmlu: 90.0,
      gpqa: 62.0,
      math: 88.0,
      humanEval: 90.0,
      sweBench: 58.6,
      mmmu: 72.0,
      arenaElo: 88.5,
    },
  },
]
