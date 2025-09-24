<template>
  <div class="h-full w-full relative">
    <!-- Simple SVG Bar Chart -->
    <svg :width="width" :height="height" class="w-full h-full">
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
          <text :x="(index + 0.5) * barWidth" :y="chartHeight + 20" text-anchor="middle">
            {{ label }}
          </text>
        </g>
        
        <!-- Bars -->
        <rect
          v-for="(bar, index) in bars"
          :key="`bar-${index}`"
          :x="bar.x"
          :y="bar.y"
          :width="barWidth - 4"
          :height="bar.height"
          fill="#3b82f6"
          rx="2"
          class="hover:fill-blue-600 transition-colors duration-200 cursor-pointer"
        />
      </g>
    </svg>
    
    <!-- Chart title -->
    <div class="absolute top-2 left-2 text-xs font-medium text-gray-700">
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
  width: 300,
  height: 120
})

const padding = 30
const chartWidth = computed(() => props.width - padding * 2)
const chartHeight = computed(() => props.height - padding * 2)

const xLabels = computed(() => props.labels)
const yLabels = computed(() => {
  const max = Math.max(...props.data)
  const step = max / 4
  
  return [
    Math.round(max).toString(),
    Math.round(max - step).toString(),
    Math.round(max - step * 2).toString(),
    Math.round(max - step * 3).toString(),
    '0'
  ]
})

const barWidth = computed(() => chartWidth.value / props.data.length)

const bars = computed(() => {
  const max = Math.max(...props.data)
  
  return props.data.map((value, index) => ({
    x: index * barWidth.value + 2,
    y: chartHeight.value - (value / max) * chartHeight.value,
    height: (value / max) * chartHeight.value
  }))
})
</script>
