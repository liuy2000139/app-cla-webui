<template>
  <el-row id="reTryDialog">
    <el-dialog
      title=""
      v-model="props.dialogVisible"
      :close-on-press-escape="false"
      :show-close="false"
      :close-on-click-modal="false"
      :width="dialogWidth"
    >
      <div class="titleBox">
        <svg-icon icon-class="fail_icon" class="dialogIcon"></svg-icon>
        <span>{{ $t('tips.failedTitle') }}</span>
      </div>
      <el-row>
        <el-col align="center">
          <p :class="dialogMessage">{{ props.message }}</p>
          <button class="dialogBt" @click="reTry()">
            {{ $t('tips.dialogBt') }}
          </button>
        </el-col>
      </el-row>
    </el-dialog>
  </el-row>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useCommonStore } from '@/stores/common';
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n();
const $t = t;

const chinese = ref('Chinese');
const english = ref('English');

const commonStore = useCommonStore();

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



const IS_MOBILE = computed(() => {
  return commonStore.isMobile;
});
const dialogWidth = computed(() => {
  if (IS_MOBILE.value) {
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

function reTry() {
  commonStore.errorCodeSet({
    dialogVisible: false,
    dialogMessage: '',
  });
}
</script>

<style lang="scss" scoped>
#reTryDialog {
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
    color: #e22424;
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
