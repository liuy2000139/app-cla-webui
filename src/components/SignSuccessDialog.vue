<template>
  <el-row id="signSuccessDialog">
    <el-dialog
      title=""
      v-model="props.dialogVisible"
      :close-on-press-escape="false"
      :show-close="false"
      :close-on-click-modal="false"
      :width="dialogWidth"
    >
      <div class="titleBox">
        <svg-icon icon-class="chenggong" class="dialogIcon"></svg-icon>
        <span>{{ $t('tips.successTitle') }}</span>
      </div>
      <el-row>
        <el-col align="center">
          <p :class="dialogMessage">{{ props.message }}</p>
          <button class="dialogBt" @click="clickGoHome()">
            {{ $t('tips.dialogBt') }}
          </button>
        </el-col>
      </el-row>
    </el-dialog>
  </el-row>
</template>

<script setup lang="ts">
import * as util from '../util/util';
import cla from '../lang/global';
import { ref, computed, inject, onUpdated, onMounted } from 'vue';
import { useCommonStore } from '../stores/common';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useIsMobile } from '@/util/useIsMobile';

const { t, locale } = useI18n();
const $t = t;
const commonStore = useCommonStore();
const router = useRouter();

const { IS_MOBILE } = useIsMobile();

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
    default: '',
  },
});

const dialogWidth = computed(() => {
  if (IS_MOBILE) {
    return '80%';
  } else {
    return '30%';
  }
});
const dialogMessage = computed(() => {
  if (commonStore.lang === english.value) {
    return 'dialogMessageEn';
  } else if (commonStore.lang === chinese.value) {
    return 'dialogMessage';
  }
});

const domain = ref(commonStore.domain);
const chinese = ref('Chinese');
const english = ref('English');

const clickGoHome = () => {
  commonStore.setSignSuccess({
    dialogVisible: false,
    dialogMessage: '',
  });

  if (window.location.origin === cla.OPENLOOKENG_SIGN_URL) {
    let path = cla.SIGN_ROUTER;
    router.replace(path);
  } else {
    let path = `${cla.SIGN_ROUTER}/${commonStore.linkId}`;
    router.replace(path);
  }
};
</script>

<style lang="scss" scoped>
#signSuccessDialog {
  .dialogBt {
    margin-top: 3rem;
    width: 8rem;
    height: 3rem;
    background: linear-gradient(to right, #97db30, #319e55);
    border-radius: 1.5rem;
    border: none;
    color: white;
    cursor: pointer;
    outline: none;
  }

  :deep(.el-dialog) {
    border-radius: 1rem;
    
    .el-dialog__header {
      padding: 0;
    }

    .el-dialog__body {
      padding: 20px;
    }
  }

  .titleBox {
    text-align: left;
    font-size: 1.5rem;
    color: #319e55;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;

    .dialogIcon {
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 1rem;
    }
  }
}
</style>
