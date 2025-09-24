<template>
  <div class="h-full w-full">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const chartCanvas = ref<HTMLCanvasElement>()
let chartInstance: ChartJS | null = null

// Demo data for activity chart
const chartData = {
  labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
  datasets: [
    {
      label: 'Hoạt động',
      data: [12, 19, 8, 15, 22, 18, 25],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(59, 130, 246, 0.8)'
      ],
      borderColor: [
        'rgb(59, 130, 246)',
        'rgb(59, 130, 246)',
        'rgb(59, 130, 246)',
        'rgb(59, 130, 246)',
        'rgb(59, 130, 246)',
        'rgb(59, 130, 246)',
        'rgb(59, 130, 246)'
      ],
      borderWidth: 1,
      borderRadius: 4,
      borderSkipped: false
    }
  ]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: 'rgba(59, 130, 246, 0.5)',
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: false,
      callbacks: {
        title: function(context: any) {
          const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật']
          return days[context[0].dataIndex]
        },
        label: function(context: any) {
          return `Số hoạt động: ${context.parsed.y}`
        }
      }
    }
  },
  scales: {
    x: {
      display: true,
      grid: {
        display: false
      },
      ticks: {
        font: {
          size: 11,
          family: 'Inter, sans-serif'
        },
        color: '#6b7280'
      }
    },
    y: {
      display: true,
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
        drawBorder: false
      },
      ticks: {
        font: {
          size: 11,
          family: 'Inter, sans-serif'
        },
        color: '#6b7280',
        stepSize: 5
      }
    }
  }
}

onMounted(() => {
  // Wait for next tick to ensure canvas is rendered
  nextTick(() => {
    if (chartCanvas.value) {
      const ctx = chartCanvas.value.getContext('2d')
      if (ctx) {
        chartInstance = new ChartJS(ctx, {
          type: 'bar',
          data: chartData,
          options: chartOptions
        })
      }
    }
  })
})

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy()
    chartInstance = null
  }
})
</script>

<style scoped>
canvas {
  max-height: 100%;
}
</style>
