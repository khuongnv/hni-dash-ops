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
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const chartCanvas = ref<HTMLCanvasElement>()
let chartInstance: ChartJS | null = null

// Demo data
const chartData = {
  labels: [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ],
  datasets: [
    {
      label: 'Doanh thu (VNĐ)',
      data: [32000000, 35000000, 28000000, 42000000, 38000000, 45000000, 
             52000000, 48000000, 55000000, 62000000, 58000000, 65000000],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: 'rgb(59, 130, 246)',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 6,
      pointHoverRadius: 8
    }
  ]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top' as const,
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          size: 12,
          family: 'Inter, sans-serif'
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: 'rgba(59, 130, 246, 0.5)',
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: true,
      callbacks: {
        label: function(context: any) {
          const value = context.parsed.y
          return `Doanh thu: ${value.toLocaleString('vi-VN')} VNĐ`
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
        callback: function(value: any) {
          return `${(value / 1000000).toFixed(0)}M`
        }
      }
    }
  },
  interaction: {
    intersect: false,
    mode: 'index' as const
  },
  elements: {
    point: {
      hoverBackgroundColor: 'rgb(59, 130, 246)'
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
          type: 'line',
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
