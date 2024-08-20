<template>
  <el-row id="configTwo">
    <div class="itemBox">
      <div class="stepTitle">
        ③ {{ $t('org.config_cla_paste_url_title') }}
        <el-tooltip
          class="item"
          effect="light"
          :content="$t('org.config_cla_paste_url_title_tooltips')"
          placement="right"
        >
          <svg-icon icon-class="tips"></svg-icon>
        </el-tooltip>
      </div>
      <div>
        <div class="margin-top-1rem">
          {{ $t('org.config_cla_paste_individual_url') }}
        </div>
        <div class="margin-top-1rem">
          {{
            $t('org.config_cla_individual_url_desc', {
              platform: commonStore.platform,
            })
          }}
        </div>
        <div class="margin-top-1rem">
          <el-row class="margin-top-1rem">
            <el-col>
              <el-input
                clearable=""
                :placeholder="$t('org.config_cla_url_placeholder')"
                size="medium"
                v-model="cla_link_individual"
              >
              </el-input>
            </el-col>
          </el-row>
          <el-row class="margin-top-1rem">
            {{ $t('org.config_cla_individual_lang') }}
          </el-row>
          <el-row class="margin-top-1rem">
            <el-col>
              <el-select
                v-model="individualClaLanguageValue"
                :placeholder="$t('org.config_cla_select_lang')"
                style="width: 100%"
                size="medium"
                clearable
                filterable
                @change="changeIndividualLanguage"
              >
                <el-option
                  v-for="item in languageOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="margin-top-2rem">
        <div class="margin-top-1rem">
          {{ $t('org.config_cla_corp_url') }}
        </div>
        <div class="margin-top-1rem">
          {{ $t('org.config_cla_paste_corp_url') }}
        </div>
        <div class="margin-top-1rem">
          {{
            $t('org.config_cla_corp_url_desc', {
              platform: commonStore.platform,
            })
          }}
        </div>
        <div class="margin-top-1rem">
          <el-row>
            <el-col>
              <el-input
                clearable=""
                :placeholder="$t('org.config_cla_url_placeholder')"
                size="medium"
                v-model="cla_link_corporation"
              >
              </el-input>
            </el-col>
          </el-row>
          <div class="margin-top-1rem">
            {{ $t('org.config_cla_corp_lang') }}
          </div>
          <el-row class="margin-top-1rem">
            <el-col>
              <el-select
                v-model="corpClaLanguageValue"
                :placeholder="$t('org.config_cla_select_lang')"
                style="width: 100%"
                size="medium"
                clearable
                filterable
                @change="changeCorpLanguage"
              >
                <el-option
                  v-for="item in languageOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="stepBtBox">
      <button class="step_button" @click="toPreviousPage">
        {{ $t('org.previous_step') }}
      </button>
      <button class="step_button" @click="toNextPage">
        {{ $t('org.next_step') }}
      </button>
    </div>
    <ReTryDialog
      :message="reLoginMsg"
      :dialogVisible="reTryVisible"
    ></ReTryDialog>
    <ReLoginDialog
      :dialogVisible="reLoginDialogVisible"
      :message="reLoginMsg"
    ></ReLoginDialog>
  </el-row>
</template>
<script setup lang="ts">
import * as url from '../util/api';
import * as util from '../util/util';
import http from '../util/http';
import ReTryDialog from '../components/ReTryDialog.vue';
import ReLoginDialog from '../components/ReLoginDialog.vue';

import { ref, computed, inject, onUpdated, onMounted } from 'vue';
import { useCommonStore } from '../stores/common';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const { t, locale } = useI18n();
const $t = t;
const commonStore = useCommonStore();
const router = useRouter();
const languageOptions = ref([
  { value: 'english', label: 'English' },
  { value: 'chinese', label: '中文' },
]);

const reTryVisible = computed(() => {
  return commonStore.reTryDialogVisible;
});
const reLoginDialogVisible = computed(() => {
  return commonStore.orgReLoginDialogVisible;
});
const reLoginMsg = computed(() => {
  return commonStore.dialogMessage;
});
const cla_link_individual = computed({
  get() {
    return commonStore.claLinkIndividual;
  },
  set(value) {
    commonStore.setClaLinkIndividual(value);
  },
});
const cla_link_corporation = computed({
  get() {
    return commonStore.claLinkCorp;
  },
  set(value) {
    commonStore.setClaLinkCorp(value);
  },
});
const individualClaLanguageValue = computed({
  get() {
    return commonStore.individualLanguage;
  },
  set(value) {
    commonStore.setIndividualLanguage(value);
  },
});
const corpClaLanguageValue = computed({
  get() {
    return commonStore.corpLanguage;
  },
  set(value) {
    commonStore.setCorpLanguage(value);
  },
});

const setClientHeight = inject('setClientHeight');

const init = () => {
  commonStore.setIndividualLanguage('');
  commonStore.setCorpLanguage('');
  commonStore.setClaLinkIndividual('');
  commonStore.setClaLinkCorp('');
  sessionStorage.removeItem('individualLanguage');
  sessionStorage.removeItem('corpLanguage');
  sessionStorage.removeItem('claLinkIndividual');
  sessionStorage.removeItem('claLinkCorp');
};
const changeIndividualLanguage = (value) => {
  commonStore.setIndividualLanguage(value);
};
const changeCorpLanguage = (value) => {
  commonStore.setCorpLanguage(value);
};
const toPreviousPage = () => {
  router.replace('/config-email');
};
const toNextPage = () => {
  if (cla_link_individual.value && individualClaLanguageValue.value) {
    if (
      (cla_link_corporation.value && corpClaLanguageValue.value) ||
      !(cla_link_corporation.value || corpClaLanguageValue.value)
    ) {
      let arr = cla_link_individual.value.trim().split('.');
      let isRightFormat = true;
      if (cla_link_corporation.value) {
        let arr = cla_link_corporation.value.split('.');
        if (arr[arr.length - 1] !== 'pdf') {
          isRightFormat = false;
        }
      }
      if (arr[arr.length - 1] === 'pdf' && isRightFormat) {
        router.replace('/config-fields');
      } else {
        ElMessage.closeAll();
        ElMessage.error($t('org.cla_format_err'));
      }
    } else if (cla_link_corporation.value) {
      commonStore.errorCodeSet({
        dialogVisible: true,
        dialogMessage: $t('tips.select_corp_language'),
      });
    } else {
      commonStore.errorCodeSet({
        dialogVisible: true,
        dialogMessage: $t('tips.paste_corp_link'),
      });
    }
  } else if (cla_link_individual.value) {
    commonStore.errorCodeSet({
      dialogVisible: true,
      dialogMessage: $t('tips.select_individual_language'),
    });
  } else {
    commonStore.errorCodeSet({
      dialogVisible: true,
      dialogMessage: $t('tips.paste_individual_link'),
    });
  }
};

onUpdated(() => {
  setClientHeight();
});
// beforeRouteEnter(to, from, next) {
//   next((vm) => {
//     if (from.path === '/') {
//       vm.init();
//     }
//   });
// },
</script>
<style lang="scss" scoped>
#configTwo {
  .file_button {
    font-family: Roboto-Regular, sans-serif;
    width: 5rem;
    height: 3rem;
    border-radius: 1.5rem;
    border: none;
    color: white;
    font-size: 0.8rem;
    cursor: pointer;
    background: linear-gradient(to right, #97db30, #319e55);
    margin: 1.2rem 0;
  }

  .file_button:focus {
    outline: none;
  }

  .stepTitle {
    font-size: 1.2rem;
    padding: 0.5rem;
  }

  .itemBox {
    border-radius: 1.25rem;
    box-shadow: 0 0 20px 10px #f3f3f3;
    padding: 2rem;
    margin-bottom: 2rem;

    .emailInput {
      cursor: pointer;
    }
  }
}
</style>
