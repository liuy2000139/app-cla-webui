<template>
  <div>
    <el-dialog
      width="20%"
      title=""
      align="center"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      v-model="props.deleteVisible"
    >
      <el-row align="center">
        {{ props.deleteMessage }}
      </el-row>
      <el-row align="center" class="margin-top-1rem">
        <button class="deleteBt" @click="submit">{{ $t('corp.yes') }}</button>
        <button class="cancelBt" @click="cancel">{{ $t('corp.no') }}</button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
const $t = t;
const props = defineProps({
  deleteVisible: {
    type: Boolean,
  },
  deleteMessage: {
    type: String,
  },
});
const emit = defineEmits(['delete', 'cancel']);
const submit = () => {
  emit('delete');
};
const cancel = () => {
  emit('cancel');
};
</script>

<style  lang='scss' scoped>
.el-row {
  justify-content: center;
}
</style>
