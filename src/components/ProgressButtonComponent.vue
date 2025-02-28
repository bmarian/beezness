<script setup lang="ts">
import { scientificFormat } from '@/utils';
import { computed } from 'vue';

interface Props {
  label: string,
  count: number,
  money?: number,
  price?: number,
  productionSpeed?: number,
  incrementAmount: number,
}

const props = withDefaults(defineProps<Props>(), {
  productionSpeed: 0,
  price: 0,
})

const scientificAmount = computed(() => {
  if (props.price < 1000000) return { value: scientificFormat(props.price), scientificAmount: "" }
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
        <div class="automation-label">{{ props.label }}</div>
        <div v-if="productionSpeed" class="automation-amount">{{ scientificFormat(props.productionSpeed) }} / s</div>
      </div>
      <div class="buy-button" :class="{ disabled: typeof props.money !== 'undefined' && props.money < props.price }"
        @click="$emit('buy')">
        <div class="number-of-items">
          <span class="buy">Buy</span>
          <div class="amount-container">
            <span class="x">x </span>
            <span class="amount">{{ props.incrementAmount !== Infinity ? props.incrementAmount : 'Max' }}</span>
          </div>
        </div>
        <div v-if="props.price" class="price">
          <div class="amount-container">
            <span class="dollar-sign">$</span>
            <span class="amount">{{ scientificAmount.value }}</span>
          </div>
          <span v-if="scientificAmount.scientificAmount" class="scientific-amount">{{ scientificAmount.scientificAmount
            }}</span>
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
  display: flex;

  margin: 0 1rem 1rem 1rem;
}

.avatar {
  position: relative;
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

  font-weight: bold;
}

.automation .automation-label {
  margin-left: 0.5rem;
}

.automation .automation-amount {
  margin-right: 0.5rem;
}

.buy-button {
  cursor: pointer;
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

.buy-button.disabled {
  cursor: default;
  background-color: #b7b7b7;
  color: var(--soft-cream);
}

.buy-button:not(.disabled):hover {
  border: 3px solid black;
}

.buy-button .number-of-items {
  height: 100%;
  margin: 0.2rem 0.5rem;

  display: flex;
  flex-direction: column;
  justify-content: center;

  font-weight: bold;
}

.buy-button .number-of-items .amount-container {
  font-style: italic;
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
