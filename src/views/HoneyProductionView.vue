<script setup lang="ts">
import ProgressButtonComponent from '@/components/ProgressButtonComponent.vue';
import { useBeesStore } from '@/stores/bees';
import { storeToRefs } from 'pinia';

const beesStore = useBeesStore()
const {
  honey,
  droneCount,
  dronePrice,
  workerCount,
  workerPrice,
  queenCount,
  queenPrice,
} = storeToRefs(beesStore)

</script>

<template>
  <div class="honey-production-container">
    <ProgressButtonComponent label="Drones" :count="droneCount" :price="dronePrice">
      <template v-slot:image>
        <img src="@/assets/images/drone.webp" alt="drone">
      </template>
    </ProgressButtonComponent>
    <ProgressButtonComponent label="Worker" :count="workerCount" :price="workerPrice">
      <template v-slot:image>
        <img src="@/assets/images/worker.webp" alt="drone">
      </template>
    </ProgressButtonComponent>
    <ProgressButtonComponent label="Queen" :count="queenCount" :price="queenPrice">
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
