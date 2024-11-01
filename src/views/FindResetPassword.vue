<template>
  <div class="margin-top-5rem margin-bottom-3rem">
    <Step class="margin-top-5rem margin-bottom-2rem" :steping="1"></Step>
    <div class="findPwdBox">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleFormRef"
        label-width="0"
      >
        <el-form-item prop="newPassword">
          <el-input
            :placeholder="$t('corp.input_new_pwd')"
            clearable=""
            type="password"
            v-model="ruleForm.newPassword"
          ></el-input>
        </el-form-item>
        <el-form-item prop="newPasswordAgain">
          <el-input
            :disabled="!haveNewPwd"
            :placeholder="$t('corp.input_new_pwd_again')"
            clearable=""
            type="password"
            v-model="ruleForm.newPasswordAgain"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <button
            class="reset_pwd_button"
            type="button"
            @click="submitForm('ruleForm')"
          >
            {{ $t('corp.submit') }}
          </button>
        </el-form-item>
      </el-form>
    </div>
    <ReTryDialog
      :dialogVisible="reTryDialogVisible"
      :message="reLoginMsg"
    ></ReTryDialog>
  </div>
</template>

<script setup lang="ts">
import Step from '../components/FindPwdSteps.vue';
import http from '../util/_axios.js';
import * as url from '../util/api.js';
import * as util from '../util/util.js';
import ReTryDialog from '../components/ReTryDialog.vue';
import cla from '../lang/global.js';

import { ref, computed, watch } from 'vue';
import { useCommonStore } from '../stores/common.js';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';

const { t, locale } = useI18n();
const $t = t;
const commonStore = useCommonStore();
const router = useRouter();
const route = useRoute();
const ruleFormRef = ref();

watch(
  () => {
    locale.value;
  },
  () => {
    util.verifyMsgChangeLang('ruleForm', this);
  }
);

const reLoginMsg = computed(() => {
  return commonStore.dialogMessage;
});
const reTryDialogVisible = computed(() => {
  return commonStore.reTryDialogVisible;
});

const validateNewPwd = (rule, value, callback) => {
  if (value === '') {
    callback(new Error($t('corp.input_new_pwd')));
  } else if (
    value.length < cla.PWD_MIN_LENGTH ||
    value.length > cla.PWD_MAX_LENGTH ||
    util.checkIllegalChar(value)
  ) {
    callback(
      new Error(
        $t('corp.newPwd_contains_Illegal_character', {
          minLength: cla.PWD_MIN_LENGTH,
          maxLength: cla.PWD_MAX_LENGTH,
        })
      )
    );
  } else {
    haveNewPwd.value = true;
    callback();
  }
};
const validateNewPwdAgain = (rule, value, callback) => {
  if (value === '') {
    callback(new Error($t('corp.input_new_pwd_again')));
  } else if (value !== ruleForm.value.newPassword) {
    callback(new Error($t('corp.newPwd_diff')));
  } else {
    callback();
  }
};

const haveNewPwd = ref(false);
const ruleForm = ref({ newPassword: '', newPasswordAgain: '' });
const rules = ref({
  newPassword: [
    {
      required: true,
      validator: validateNewPwd,
      trigger: ['blur', 'change'],
    },
  ],
  newPasswordAgain: [
    {
      required: true,
      validator: validateNewPwdAgain,
      trigger: ['blur', 'change'],
    },
  ],
});
const linkId = computed(() => route.params.linkId);
const key = ref('');
const asciiArray = ref([]);

const getParams = () => {
  key.value = route.query.key;
  commonStore.setLinkId(linkId.value);
};
const submitForm = (formName) => {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      submitReset();
    } else {
      return false;
    }
  });
};
getParams();
const submitReset = () => {
  http({
    url: url.findPwdResetPwd + linkId.value,
    method: 'put',
    data: {
      password: util.getAsciiArray(
        asciiArray.value,
        ruleForm.value.newPassword
      ),
    },
    headers: {
      'Password-Retrieval-Key': key.value,
    },
  })
    .then((res) => {
      asciiArray.value = [];
      ElMessage.success({
        message: $t('tips.reset_password_success'),
        duration: 6000,
      });
      router.push('corporationManagerLogin');
    })
    .catch((err) => {
      util.catchErr(err, '', this);
    });
};
</script>

<style lang="scss" scoped>
:deep(.el-input) {
  .el-input__wrapper {
    .el-input__inner {
      font-size: 1rem;
    }
  }
  &.is-disabled {
    .el-input__wrapper {
      background-color: #f5f7fa !important;
    }
  }
}


</style>
