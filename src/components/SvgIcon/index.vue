<script setup lang="ts">
import { computed, defineProps } from 'vue';
const emits = defineEmits(['click']);
const props = defineProps({
  iconClass: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: '',
  },
});

const iconName = computed(() => {
  return `#icon-${props.iconClass}`;
});

const click = (e: MouseEvent) => {
  emits('click', e)
}
</script>

<template>
  <svg :class="`svg-icon ${props.className}`" aria-hidden="true" @click="click">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<style lang="scss" scoped>
.svg-icon {
  width: 1rem;
  height: 1rem; /*根据自己需要来*/
  vertical-align: -0.15rem;
  fill: currentColor;
  overflow: hidden;
  &:focus {
    outline: none;
  }
}
</style>
