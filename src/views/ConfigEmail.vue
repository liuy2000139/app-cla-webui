<template>
  <el-row id="configThree">
    <div class="itemBox">
      <div class="stepTitle">② {{ $t('org.config_cla_email_title') }}</div>
      <div class="margin-top-1rem">
        {{ $t('org.config_cla_email_authorize') }}
      </div>
      <div class="margin-top-1rem">
        <el-input
          readonly=""
          size="medium"
          class="emailInput"
          :placeholder="$t('org.config_cla_email_placeholder')"
          @click.native="toAuthorizedEmail()"
          v-model="email"
        >
        </el-input>
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
    <ConfigEmailSelect
      :emailDialogVisible="emailDialogVisible"
      @closeEmailDialog="emailDialogVisible = false"
    ></ConfigEmailSelect>
    <ReLoginDialog
      :dialogVisible="reLoginDialogVisible"
      :message="reLoginMsg"
    ></ReLoginDialog>
    <ReTryDialog
      :dialogVisible="reTryVisible"
      :message="reLoginMsg"
    ></ReTryDialog>
  </el-row>
</template>

<script setup lang="ts">
import _cookie from 'js-cookie';
import ReLoginDialog from '../components/ReLoginDialog.vue';
import ReTryDialog from '../components/ReTryDialog.vue';
import ConfigEmailSelect from './ConfigEmailSelect.vue';
import claConfig from '../lang/global';

import { ref, computed, inject, onUpdated, onMounted } from 'vue';
import { useCommonStore } from '../stores/common';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const { t, locale } = useI18n();
const $t = t;
const commonStore = useCommonStore();
const router = useRouter();

const loading = ref(false);
const emailDialogVisible = ref(false);

const reTryVisible = computed(() => {
  return commonStore.reTryDialogVisible;
});
const reLoginDialogVisible = computed(() => {
  return commonStore.orgReLoginDialogVisible;
});
const reLoginMsg = computed(() => {
  return commonStore.dialogMessage;
});
const isEmail = computed(() => {
  return `${commonStore.isEmail}` === 'true';
});
const email = computed(() => {
  return commonStore.email;
});

const setClientHeight = inject('setClientHeight');

const toPreviousPage = () => {
  router
    .replace('/config-org')
    .then((route) => {})
    .catch((err) => {});
};
const toNextPage = () => {
  if (email.value) {
    router
      .replace('/config-cla-link')
      .then((route) => {})
      .catch((err) => {});
  } else {
    ElMessage.closeAll();
    ElMessage.error($t('tips.authorized_email'));
  }
};
const getCookieData = () => {
  if (document.cookie !== '') {
    let cookieArr = document.cookie.split(';');
    let email = '';
    cookieArr.forEach((item) => {
      let arr = item.split('=');
      let name = arr[0].trim();
      let value = arr[1].trim();
      if (name === 'email') {
        email = value;
      } else if (name === claConfig.EMAIL_ERROR) {
        commonStore.errorCodeSet({
          dialogVisible: true,
          dialogMessage: $t('tips.email_system_error'),
        });
      }
    });
    email ? commonStore.setIsEmail(true) : commonStore.setIsEmail(false);
    commonStore.setEmail(email);
  }
};
const toAuthorizedEmail = () => {
  emailDialogVisible.value = true;
};
const init = () => {
  commonStore.setEmail('');
  commonStore.setIsEmail(false);
};
getCookieData();

onMounted(() => {
  setClientHeight();
});
// beforeRouteEnter(to, from, next) {
//   next((vm) => {
//     if (from.path === '/') {
//       let cookie = document.cookie;
//       if (cookie) {
//         let cookieArr = cookie.split(';');
//         cookieArr.forEach((item) => {
//           let arr = item.split('=');
//           let name = arr[0].trim();
//           _cookie.remove(name, { path: '/' });
//         });
//       } else {
//         vm.init();
//       }
//     }
//   });
// },
</script>

<style lang="scss" scoped>
#configThree {
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
