<script setup lang="ts">
import { computed, defineProps } from 'vue';
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
const svgClass = computed(() => {
  if (props.className) {
    return 'svg-icon ' + props.className;
  } else {
    return 'svg-icon';
  }
});
</script>

<template>
  <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
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
}
</style>
