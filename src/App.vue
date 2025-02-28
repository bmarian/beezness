<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useBeesStore } from './stores/bees';
import { storeToRefs } from 'pinia';
import ProfileMenuComponent from './components/ProfileMenuComponent.vue';

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
  <main>
    <RouterView />
  </main>
  <footer>
    <ProfileMenuComponent />
  </footer>
</template>

<style scoped>
header .wrapper {
  margin-top: 1rem;
}
</style>
