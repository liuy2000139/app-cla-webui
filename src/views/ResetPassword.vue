<template>
  <el-row>
    <el-col class="resetPwdFormBox" :offset="6" :span="12">
      <p id="tabName">{{ $t('header.resetPwd') }}</p>
      <el-form
        class="resetPwdForm"
        :model="ruleForm"
        :rules="rules"
        ref="ruleFormRef"
        label-width="100px"
      >
        <el-form-item label="" prop="oldPassword" label-width="0">
          <el-input
            :placeholder="$t('corp.input_old_pwd')"
            clearable=""
            type="password"
            v-model="ruleForm.oldPassword"
            @keydown.native="pressEnter"
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="newPassword" label-width="0">
          <el-input
            :disabled="!haveOldPwd"
            :placeholder="$t('corp.input_new_pwd')"
            clearable=""
            type="password"
            v-model="ruleForm.newPassword"
            @keydown.native="pressEnter"
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="checkPwd" label-width="0">
          <el-input
            :disabled="!haveNewPwd"
            :placeholder="$t('corp.input_new_pwd_again')"
            clearable=""
            type="password"
            v-model="ruleForm.checkPwd"
            @keydown.native="pressEnter"
          ></el-input>
        </el-form-item>
        <el-form-item label-width="0" class="buttons">
          <button class="button" type="button" @click="submit('ruleForm')">
            {{ $t('corp.submit') }}
          </button>
          <button class="cancelBt" type="reset" @click="reset('ruleForm')">
            {{ $t('corp.reset') }}
          </button>
        </el-form-item>
      </el-form>
      <corpReLoginDialog
        :message="corpReLoginMsg"
        :dialogVisible="corpReLoginDialogVisible"
      ></corpReLoginDialog>
      <reTryDialog
        :message="corpReLoginMsg"
        :dialogVisible="corpReTryDialogVisible"
      ></reTryDialog>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import * as url from '../util/api';
import http from '../util/http';
import * as util from '../util/util';
import corpReLoginDialog from '../components/CorpReLoginDialog.vue';
import reTryDialog from '../components/ReTryDialog.vue';
import cla from '../lang/global';

import { ref, computed, inject, onUpdated, onMounted, watch } from 'vue';
import { useCommonStore } from '../stores/common';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const { t, locale } = useI18n();
const $t = t;
const commonStore = useCommonStore();
const router = useRouter();
const ruleFormRef = ref();

watch(
  () => {
    locale.value;
  },
  () => {
    ruleFormRef.value &&
      ruleFormRef.value.fields.forEach((item) => {
        if (item.validateState === 'error') {
          ruleFormRef.value.validateField(item.labelFor);
        }
      });
  }
);

const orgValue = computed(() => {
  return commonStore.loginInfo.orgValue;
});
const userInfo = computed(() => {
  return commonStore.loginInfo.userInfo;
});
const corpReLoginDialogVisible = computed(() => {
  return commonStore.dialogVisible;
});
const corpReLoginMsg = computed(() => {
  return commonStore.dialogMessage;
});
const corpReTryDialogVisible = computed(() => {
  return commonStore.reTryDialogVisible;
});

var validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error($t('corp.input_old_pwd')));
  } else {
    haveOldPwd.value = true;
    callback();
  }
};
var validatePass2 = (rule, value, callback) => {
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
          maxLength: cla.WD_MAX_LENGTH,
        })
      )
    );
  } else if (value === ruleForm.value.oldPassword) {
    callback(new Error($t('corp.newPwd_diff_with_oldPwd')));
  } else {
    haveNewPwd.value = true;
    callback();
  }
};
var validatePass3 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error($t('corp.input_new_pwd_again')));
  } else if (value !== ruleForm.value.newPassword) {
    callback(new Error($t('corp.newPwd_diff')));
  } else {
    callback();
  }
};

const haveOldPwd = ref(false);
const haveNewPwd = ref(false);
const asciiArray = ref([]);
const asciiOldArray = ref([]);
const ruleForm = ref({
  oldPassword: '',
  newPassword: '',
  checkPwd: '',
});
const rules = ref({
  oldPassword: [{ require: true, validator: validatePass, trigger: 'blur' }],
  newPassword: [{ require: true, validator: validatePass2, trigger: 'blur' }],
  checkPwd: [{ require: true, validator: validatePass3, trigger: 'blur' }],
});

const pressEnter = () => {
  if (event.keyCode === 13) {
    submit('ruleForm');
  }
};
const resetPassword = () => {
  let obj = {
    old_password: util.getAsciiArray(
      asciiOldArray.value,
      ruleForm.value.oldPassword
    ),
    new_password: util.getAsciiArray(
      asciiArray.value,
      ruleForm.value.newPassword
    ),
  };
  http({
    url: url.resetPassword,
    method: 'put',
    data: obj,
  })
    .then((res) => {
      commonStore.setPwdIsChanged(true);
      util.successMessage(this);
      // if (commonStore.loginInfo.userInfo[0].role === 'manager') {
      //     this.$router.push('/employeeList');
      // } else {
      //     this.$router.push('/managerList');
      // }
      router.push('/corporationManagerLogin');
      asciiOldArray.value = [];
      asciiArray.value = [];
    })
    .catch((err) => {
      util.catchErr(err, 'errorSet', this);
    });
};
const submit = (formName) => {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      resetPassword();
    } else {
      return false;
    }
  });
};
const reset = (formName) => {
  ruleFormRef.value.resetFields();
};
</script>

<style lang="scss" scoped>
@import '../assets/font/css/Roboto-Regular.css';

:deep(.resetPwdFormBox) {
  & .el-dialog {
    border-radius: 1rem;
  }

  & .resetPwdForm {
    box-shadow: 0 0 20px 10px #f3f3f3;
    padding: 2rem 2rem 0;
    background-color: white;
    border-radius: 1rem;
  }

  & #tabName {
    font-family: Roboto-Regular, sans-serif;
    font-size: 2rem;
    text-align: left;
  }

  & .el-form-item__label {
    font-size: 1.2rem;
  }

  & .el-input__inner {
    height: 3rem;
    background-color: #f3f3f3;
    border-radius: 1.5rem;
    border: 1px solid #f3f3f3;
    font-size: 1.2rem !important;
  }

  & .el-form-item {
    margin-bottom: 2rem;
  }

  .cancelBt {
    width: 6rem;
    height: 3rem;
    border-radius: 1.5rem;
    border: 1px solid black;
    color: black;
    font-size: 1rem;
    cursor: pointer;
    background-color: white;
    margin-left: 1rem;
    margin-bottom: 1rem;
  }

  .cancelBt:focus {
    outline: none;
  }

  & .button {
    width: 6rem;
    height: 3rem;
    border-radius: 1.5rem;
    border: none;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    background: linear-gradient(to right, #97db30, #319e55);
    margin-bottom: 1rem;
  }

  & .button:focus {
    outline: none;
  }
  .el-form-item.buttons .el-form-item__content {
    justify-content: center;
  }
}
</style>
