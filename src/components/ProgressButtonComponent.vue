<script setup lang="ts">
import { scientificFormat } from '@/utils';
import { computed } from 'vue';

interface Props {
  label: string,
  count: number,
  price: number,
  progressTimer?: number,
}

const props = withDefaults(defineProps<Props>(), {
  progressTimer: 1000,
})

const scientificAmount = computed(() => {
  if (props.price < 1000000) return { value: props.price, scientificAmount: "" }
  const [value, scientificAmount] = scientificFormat(props.price).split("e")
  return { value, scientificAmount: `e${scientificAmount}` }
})

</script>

<template>
  <div class="progress-button">
    <div class="avatar">
      <slot class="avatar-image" name="image"></slot>
      <span class="avatar-count">{{ scientificFormat(props.count) }}</span>
    </div>
    <div class="button">
      <div class="automation">
        <div class="automatin-ammount">{{ props.label }}</div>
      </div>
      <div class="buy-button">
        <div class="number-of-items">
          <span class="buy">Buy</span>
          <div class="amount-container">
            <span class="x">x</span>
            <span class="amount">1</span>
          </div>
        </div>
        <div class="price">
          <div class="amount-container">
            <span class="dollar-sign">$</span>
            <span class="amount">{{ scientificAmount.value }}</span>
          </div>
          <span class="scientific-amount">{{ scientificAmount.scientificAmount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.progress-button .avatar img {
  width: 5rem;
  height: 5rem;

  object-fit: cover;
  border-radius: 50%;
  border: 3px solid var(--border-gold);
}
</style>

<style scoped>
.progress-button {
  position: relative;
  display: flex;

  width: 90%;
  margin: 0 1rem 1rem 1rem;
}

.button {
  width: 100%;
  margin-left: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 0.1rem;
}

.automation {
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 100%;

  border: 3px solid var(--border-gold);
  border-radius: 0.5rem;
  background-color: var(--amber-orange);
  color: var(--soft-cream);
}

.buy-button {
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 100%;

  border: 3px solid var(--border-gold);
  border-radius: 0.5rem;
  background-color: var(--honeycomb-yellow);
  color: var(--text-dark);
}

.buy-button .number-of-items {
  height: 100%;
  margin: 0.2rem 0.5rem;

  display: flex;
  flex-direction: column;
  justify-content: center;

  font-weight: bold;
}

.buy-button .price {
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  justify-content: center;

  height: 100%;
  margin: 0.2rem 0.5rem;
}

.buy-button .price .amount-container {
  font-size: x-large;
  font-weight: bold;
}

.buy-button .price .dollar-sign {
  margin-right: 0.2rem;
}

.avatar-count {
  position: absolute;
  width: 85px;

  bottom: 0;
  left: 0;

  border-radius: 24%;
  margin-left: -1px;

  border: 3px solid var(--border-gold);
  background-color: var(--honeycomb-yellow);
  color: var(--text-dark);

  text-align: center;
}
</style>

