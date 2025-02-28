
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useBeesStore = defineStore('bees', () => {
  const honey = ref(0)
  const droneCount = ref(0)
  const workerCount = ref(0)
  const queenCount = ref(0)

  const incrementAmount = ref(1)

  const productionSpeedHoney = computed(() => 0.8 * droneCount.value + 0.05 * droneCount.value ** 2)
  const productionSpeedDrone = computed(() => 0.5 * workerCount.value + 0.1 * workerCount.value ** 2)
  const productionSpeedWorker = computed(() => 0.2 * queenCount.value + 0.05 * queenCount.value ** 2)

  const dronePriceBase = computed(() => 10 + 2 * droneCount.value + 0.5 * droneCount.value ** 2)
  const workerPriceBase = computed(() => 500 + 5 * workerCount.value + 1.2 * workerCount.value ** 2)
  const queenPriceBase = computed(() => 5000 + 20 * queenCount.value + 2 * queenCount.value ** 3)

  const getPriceBasedOnIncrementAmount = (count: number): number => {
    if (incrementAmount.value !== Infinity) return incrementAmount.value * count
    return honey.value <= count ? count : Math.floor(honey.value / count) * count
  }

  const dronePrice = computed(() => getPriceBasedOnIncrementAmount(dronePriceBase.value))
  const workerPrice = computed(() => getPriceBasedOnIncrementAmount(workerPriceBase.value))
  const queenPrice = computed(() => getPriceBasedOnIncrementAmount(queenPriceBase.value))

  const getIncrementBasedOnIncrementAmount = (price: number, basePrice: number): number => {
    if (honey.value < price) return 0
    return incrementAmount.value !== Infinity ? incrementAmount.value : Math.floor(honey.value / basePrice)
  }

  const incrementHoney = () => {
    honey.value += 1
  }

  const incrementDrone = () => {
    const ammountToChange = getIncrementBasedOnIncrementAmount(dronePrice.value, dronePriceBase.value)
    if (!ammountToChange) return

    honey.value -= dronePrice.value
    droneCount.value += ammountToChange
  }
  const incrementWorker = () => {
    const ammountToChange = getIncrementBasedOnIncrementAmount(workerPrice.value, workerPriceBase.value)
    if (!ammountToChange) return

    honey.value -= workerPrice.value
    workerCount.value += ammountToChange
  }
  const incrementQueen = () => {
    const ammountToChange = getIncrementBasedOnIncrementAmount(queenPrice.value, queenPriceBase.value)
    if (!ammountToChange) return

    honey.value -= queenPrice.value
    queenCount.value += ammountToChange
  }

  return {
    honey,
    droneCount,
    workerCount,
    queenCount,

    dronePrice,
    workerPrice,
    queenPrice,

    productionSpeedDrone,
    productionSpeedWorker,
    productionSpeedHoney,

    incrementAmount,

    incrementHoney,
    incrementDrone,
    incrementWorker,
    incrementQueen,
  }
})
