<template>
  <ElButton
    :loading="dataDisable"
    :style="customStyle"
    :class="buttonClass"
    @click="submit()"
  >
    {{ text }}
  </ElButton>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus';
import { watch, ref, defineEmits } from 'vue';

const emit = defineEmits(['httpSubmit']);
const props = defineProps({
  text: {
    type: String,
    default: 'button',
  },
  buttonDisable: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    default: '9rem',
  },
  height: {
    type: String,
    default: '4rem',
  },
  borderRadius: {
    type: String,
    default: '2rem',
  },
});

watch(
  () => {
    props.buttonDisable;
  },
  () => {
    dataDisable.value = props.buttonDisable;
  }
);

const buttonWidth = ref(props.width);
const dataDisable = ref(props.buttonDisable);
const buttonClass = ref('loginButton');
const customStyle = ref({
  width: props.width,
  height: props.height,
  borderRadius: props.height,
});

const submit = () => {
  emit('httpSubmit');
};
</script>

<style lang="scss" scoped>
@import '../assets/font/css/Roboto-Light.css';

.loginButton {
  font-family: Roboto-Light, sans-serif;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  background: linear-gradient(to right, #97db30, #319e55);
}

.loginButton:focus {
  outline: none;
}

.el-button.is-disabled {
  cursor: default;
  background-color: #b3e19d;
  color: white;
}
</style>
