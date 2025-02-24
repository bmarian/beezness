
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useBeesStore = defineStore('bees', () => {
  const honey = ref(0)
  const droneCount = ref(0)
  const workerCount = ref(0)
  const queenCount = ref(0)

  const dronePrice = computed(() => 10 + 2 * droneCount.value + 0.5 * droneCount.value ** 2)
  const workerPrice = computed(() => 500 + 5 * workerCount.value + 1.2 * workerCount.value ** 2)
  const queenPrice = computed(() => 5000 + 20 * queenCount.value + 2 * queenCount.value ** 3)

  return {
    honey,
    droneCount,
    workerCount,
    queenCount,

    dronePrice,
    workerPrice,
    queenPrice,
  }
})
