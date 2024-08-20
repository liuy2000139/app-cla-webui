<template>
  <el-row id="customDialog">
    <el-dialog
      title=""
      v-model="props.dialogVisible"
      :close-on-press-escape="false"
      :show-close="false"
      :close-on-click-modal="false"
      :width="dialogWidth"
    >
      <div class="titleBox">
        <svg-icon icon-class="warning" class="dialogIcon"></svg-icon>
        <span>{{ $t('tips.warningTitle') }}</span>
      </div>
      <el-row>
        <el-col align="center">
          <p :class="dialogMessage">{{ props.message }}</p>
          <el-row>
            <el-col align="center" :span="12">
              <button class="cancelBt" @click="cancel()">
                {{ $t('corp.cancel') }}
              </button>
            </el-col>
            <el-col align="center" :span="12">
              <button class="dialogBt" @click="toNext()">
                {{ $t('tips.dialogBt') }}
              </button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-dialog>
  </el-row>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useCommonStore } from '@/stores/common';
import { useRouter } from 'vue-router';

const commonStore = useCommonStore();
const { t } = useI18n();
const $t = t;
const router = useRouter();
const chinese = ref('Chinese');
const english = ref('English');

const props = defineProps({
  dialogVisible: {
    type: Boolean,
  },
  message: {
    type: String,
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
  if (localStorage.getItem('lang') === english.value) {
    return 'dialogMessageEn';
  } else if (localStorage.getItem('lang') === chinese.value) {
    return 'dialogMessage';
  }
});

const cancel = () => {
  commonStore.setCustomVisible({
    dialogVisible: false,
    dialogMessage: '',
  });
};
const toNext = () => {
  cancel();
  router.replace('/config-email');
};
</script>

<style lang="scss" scoped>
#customDialog {
  .cancelBt {
    margin-top: 3rem;
    width: 8rem;
    height: 3rem;
    background: white;
    border-radius: 1.5rem;
    border: 1px solid black;
    color: black;
    cursor: pointer;
    outline: none;
  }

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

  .el-dialog__header {
    padding: 0;
  }

  .el-dialog__body {
    padding: 20px;
  }

  .titleBox {
    text-align: left;
    font-size: 1.5rem;
    color: #e6a23c;
    margin-bottom: 1rem;

    .dialogIcon {
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 1rem;
    }
  }
}
</style>
