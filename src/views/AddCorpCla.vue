<template>
  <div id="addCorpCla">
    <div class="pageTitle">{{ $t('org.addCorpCla') }}</div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n();
const $t = t;
</script>

<style lang="scss" scoped>
.pageTitle {
  padding: 2rem 0;
  font-size: 1.3rem;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -webkit-touch-callout: none;
  user-select: none;
}
</style>
