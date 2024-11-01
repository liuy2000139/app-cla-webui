<template>
  <div>
    <el-steps :active="props.steping" align-center>
      <el-step :title="$t('corp.find_pwd_step1')" description=""></el-step>
      <el-step :title="$t('corp.find_pwd_step2')" description=""></el-step>
    </el-steps>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const $t = t;
const props = defineProps({
  steping: {
    type: Number,
    default: 0,
  },
});
</script>

<style scoped></style>
