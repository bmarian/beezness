<script setup lang="ts">
import ProgressButtonComponent from '@/components/ProgressButtonComponent.vue';
import { useBeesStore } from '@/stores/bees';
import { storeToRefs } from 'pinia';

const beesStore = useBeesStore()
const {
  honey,

  droneCount,
  workerCount,
  queenCount,

  dronePrice,
  workerPrice,
  queenPrice,

  productionSpeedHoney,
  productionSpeedDrone,
  productionSpeedWorker,

  incrementAmount,
} = storeToRefs(beesStore)
</script>

<template>
  <div class="honey-production-container">
    <ProgressButtonComponent label="Honey" :count="honey" :productionSpeed="productionSpeedHoney" :incrementAmount="1"
      @buy="beesStore.incrementHoney">
      <template v-slot:image>
        <img src="@/assets/images/honey_jar.webp" alt="drone">
      </template>
    </ProgressButtonComponent>
    <ProgressButtonComponent label="Drone" :count="droneCount" :money="honey" :price="dronePrice"
      :productionSpeed="productionSpeedDrone" :incrementAmount="incrementAmount" @buy="beesStore.incrementDrone">
      <template v-slot:image>
        <img src="@/assets/images/drone.webp" alt="drone">
      </template>
    </ProgressButtonComponent>
    <ProgressButtonComponent label="Worker" :count="workerCount" :money="honey" :price="workerPrice"
      :productionSpeed="productionSpeedWorker" :incrementAmount="incrementAmount" @buy="beesStore.incrementWorker">
      <template v-slot:image>
        <img src="@/assets/images/worker.webp" alt="drone">
      </template>
    </ProgressButtonComponent>
    <ProgressButtonComponent label="Queen" :count="queenCount" :money="honey" :price="queenPrice"
      :incrementAmount="incrementAmount" @buy="beesStore.incrementQueen">
      <template v-slot:image>
        <img src="@/assets/images/queen.webp" alt="drone">
      </template>
    </ProgressButtonComponent>
  </div>
</template>

<style scoped>
.honey-production-container {
  width: 100%;
}
</style>
