<template>
  <div class="h-full w-full relative">
    <!-- Simple SVG Chart -->
    <svg :width="width" :height="height" class="w-full h-full">
      <!-- Grid lines -->
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" stroke-width="1" opacity="0.3"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      
      <!-- Chart area -->
      <g :transform="`translate(${padding}, ${padding})`">
        <!-- Y-axis labels -->
        <g v-for="(label, index) in yLabels" :key="`y-${index}`" class="text-xs fill-gray-500">
          <text :x="-10" :y="index * (chartHeight / (yLabels.length - 1))" text-anchor="end" dominant-baseline="middle">
            {{ label }}
          </text>
        </g>
        
        <!-- X-axis labels -->
        <g v-for="(label, index) in xLabels" :key="`x-${index}`" class="text-xs fill-gray-500">
          <text :x="index * (chartWidth / (xLabels.length - 1))" :y="chartHeight + 20" text-anchor="middle">
            {{ label }}
          </text>
        </g>
        
        <!-- Chart line -->
        <polyline
          :points="linePoints"
          fill="none"
          stroke="#3b82f6"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        
        <!-- Chart area fill -->
        <polygon
          :points="`0,${chartHeight} ${linePoints} ${chartWidth},${chartHeight}`"
          fill="url(#gradient)"
          opacity="0.1"
        />
        
        <!-- Data points -->
        <circle
          v-for="(point, index) in dataPoints"
          :key="`point-${index}`"
          :cx="point.x"
          :cy="point.y"
          r="6"
          fill="#3b82f6"
          stroke="#fff"
          stroke-width="2"
          class="hover:r-8 transition-all duration-200 cursor-pointer"
        />
      </g>
      
      <!-- Gradient definition -->
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.3" />
          <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:0" />
        </linearGradient>
      </defs>
    </svg>
    
    <!-- Chart title -->
    <div class="absolute top-4 left-4 text-sm font-medium text-gray-700">
      {{ title }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  data: number[]
  labels: string[]
  title: string
  width?: number
  height?: number
}

const props = withDefaults(defineProps<Props>(), {
  width: 400,
  height: 200
})

const padding = 40
const chartWidth = computed(() => props.width - padding * 2)
const chartHeight = computed(() => props.height - padding * 2)

const xLabels = computed(() => props.labels)
const yLabels = computed(() => {
  const max = Math.max(...props.data)
  const min = Math.min(...props.data)
  const range = max - min
  const step = range / 4
  
  return [
    Math.round(max).toLocaleString('vi-VN'),
    Math.round(max - step).toLocaleString('vi-VN'),
    Math.round(max - step * 2).toLocaleString('vi-VN'),
    Math.round(max - step * 3).toLocaleString('vi-VN'),
    Math.round(min).toLocaleString('vi-VN')
  ]
})

const dataPoints = computed(() => {
  const max = Math.max(...props.data)
  const min = Math.min(...props.data)
  const range = max - min
  
  return props.data.map((value, index) => ({
    x: (index / (props.data.length - 1)) * chartWidth.value,
    y: chartHeight.value - ((value - min) / range) * chartHeight.value
  }))
})

const linePoints = computed(() => {
  return dataPoints.value.map(point => `${point.x},${point.y}`).join(' ')
})
</script>
