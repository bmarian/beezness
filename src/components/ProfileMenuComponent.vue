<script setup lang="ts">
import { useBeesStore } from '@/stores/bees';
import { storeToRefs } from 'pinia';

const beesStore = useBeesStore()
const {
  incrementAmount
} = storeToRefs(beesStore)

const changeIncrementAmount = () => {
  switch (incrementAmount.value) {
    case 1: {
      incrementAmount.value = 10
      break;
    }
    case 10: {
      incrementAmount.value = 100
      break;
    }
    case 100: {
      incrementAmount.value = Infinity
      break;
    }
    case Infinity: {
      incrementAmount.value = 1
      break;
    }
  }
} 
</script>

<template>
  <div class="footer">
    <img class="profile-picture" src="@/assets/images/profile_picture.webp" alt="profile_picture">
    <div class="links">
      <!--       <RouterLink to="/">Home</RouterLink> -->
      <!--       <RouterLink to="/about">About</RouterLink> -->
    </div>
    <button class="increment-amount" @click="changeIncrementAmount">{{ incrementAmount !== Infinity ? incrementAmount :
      'Max' }}</button>
  </div>
</template>

<style>
.footer {
  height: 100%;
  width: 100%;
  background-color: var(--honeycomb-yellow);

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.profile-picture {
  width: 4rem;
  height: 4rem;

  object-fit: cover;
  border-radius: 50%;
  /* border: 3px solid var(--border-gold); */
}

.increment-amount {}
</style>
