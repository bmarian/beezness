<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useBeesStore } from './stores/bees';
import { storeToRefs } from 'pinia';

const beesStore = useBeesStore()
const {
  honey,

  droneCount,
  workerCount,

  productionSpeedHoney,
  productionSpeedDrone,
  productionSpeedWorker,
} = storeToRefs(beesStore)

setInterval(() => {
  honey.value += productionSpeedHoney.value;
  droneCount.value += productionSpeedDrone.value
  workerCount.value += productionSpeedWorker.value
}, 1000)
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <!-- <RouterLink to="/">Home</RouterLink> -->
        <!-- <RouterLink to="/about">About</RouterLink> -->
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header .wrapper {
  margin-top: 1rem;
}
</style>
