<template>
  <el-row id="corpManagerLogin" style="height: 100%">
    <el-col align="right" class="formBox">
      <div class="formBack_Box">
        <div class="formBack">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleFormRef"
            label-width="0"
          >
            <el-form-item :required="true" prop="userName">
              <el-input
                clearable=""
                v-model="ruleForm.userName"
                autocomplete="off"
                :placeholder="$t('corp.id')"
                @keydown.native="pressEnter"
              ></el-input>
            </el-form-item>
            <el-form-item :required="true" label="" prop="pwd">
              <el-input
                clearable=""
                type="password"
                v-model="ruleForm.pwd"
                autocomplete="off"
                :placeholder="$t('corp.pwd')"
                @keydown.native="pressEnter"
              ></el-input>
            </el-form-item>
            <el-form-item style="text-align: right" class="forgetPwd">
              <span @click="findPwd" class="pointer" id="forgetPwd">{{
                $t('corp.forget_pwd')
              }}</span>
            </el-form-item>
            <el-form-item style="text-align: center" class="loginBtn">
              <HttpButton
                :text="$t(`corp.${loginText}`)"
                :width="loginBtWidth"
                :buttonDisable="loginButtonDisable"
                @httpSubmit="submitForm('ruleFormRef')"
              >
              </HttpButton>
            </el-form-item>
          </el-form>
        </div>
      </div>
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
import reTryDialog from '../components/ReTryDialog.vue';
import HttpButton from '../components/HttpButton.vue';

import { ref, computed, inject, onUpdated, onMounted } from 'vue';
import { useCommonStore } from '../stores/common';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const { t, locale } = useI18n();
const $t = t;
const commonStore = useCommonStore();
const router = useRouter();
const ruleFormRef = ref();

const corpReLoginMsg = computed(() => {
  return commonStore.dialogMessage;
});
const corpReTryDialogVisible = computed(() => {
  return commonStore.reTryDialogVisible;
});

var validateAccount = (rule, value, callback) => {
  if (value === '') {
    callback(new Error($t('tips.not_fill_email')));
  } else {
    callback();
  }
};
var validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error($t('tips.fill_pwd')));
  } else {
    callback();
  }
};

const loginBtWidth = ref('15rem');
const loginText = ref('login_in');
const loginButtonDisable = ref(false);
const myStyle = ref({
  height: '',
});
const rules = ref({
  userName: [
    {
      required: true,
      validator: validateAccount,
      trigger: ['blur', 'change'],
    },
  ],
  pwd: [
    {
      required: true,
      validator: validatePass,
      trigger: ['blur', 'change'],
    },
  ],
});
const ruleForm = ref({
  userName: '',
  pwd: '',
});
const asciiArray = ref([]);

const setClientHeight = inject('setClientHeight');

const pressEnter = () => {
  if (event.keyCode === 13) {
    submitForm('ruleFormRef');
  }
};
const findPwd = () => {
  router.push(`/password/${commonStore.linkId}`);
};
const login = (userName, pwd) => {
  let linkId = '';
  if (commonStore.linkId) {
    linkId = commonStore.linkId;
  } else {
    commonStore.errorCodeSet({
      dialogVisible: true,
      dialogMessage: $t('tips.page_error'),
    });
    return;
  }
  let obj = {
    user: userName.trim(),
    password: util.getAsciiArray(asciiArray.value, pwd),
    link_id: linkId,
  };
  loginButtonDisable.value = true;
  loginText.value = 'logining';
  http({
    url: url.corporationManagerAuth,
    method: 'post',
    data: obj,
  })
    .then((res) => {
      let data = [];
      asciiArray.value = [];
      if (res.data) {
        data = res.data.data;
      }
      loginButtonDisable.value = false;
      loginText.value = 'login_in';
      if (data.length) {
        new Promise((resolve, reject) => {
          let userInfo = { userInfo: data };
          Object.assign(userInfo, { userName: userName });
          commonStore.setLoginInfo(userInfo);
          console.log(data);
          if (data.length > 1) {
            router.push('/orgSelect');
          } else {
            commonStore.setCorpToken(data[0].token);
            Object.assign(userInfo, { orgValue: 0 });
            commonStore.setPwdIsChanged(data[0].initial_pw_changed);
            commonStore.setLoginInfo(userInfo);
            if (data[0].initial_pw_changed) {
              if (data[0].role === 'admin') {
                router.push('/rootManager');
              } else {
                router.push('/signedRepo');
              }
            } else {
              router.push('/resetPassword');
            }
          }
          resolve('completed');
        }).then(
          (res) => {},
          (err) => {}
        );
      } else {
        commonStore.errorCodeSet({
          dialogVisible: true,
          dialogMessage: $t('tips.id_pwd_err'),
        });
      }
    })
    .catch((err) => {
      asciiArray.value = [];
      loginButtonDisable.value = false;
      loginText.value = 'login_in';
      util.catchErr(err, 'errorSet', this);
    });
};
const submitForm = (formName) => {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      login(ruleForm.value.userName, ruleForm.value.pwd);
    } else {
      return false;
    }
  });
};

util.clearManagerSession(this);

onMounted(() => {
  setClientHeight();
});
</script>

<style lang="scss" scoped>
@import '../assets/font/css/Roboto-Regular.css';

#corpManagerLogin {
  .formBack_Box {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  .formBack {
    width: 18rem;
    box-shadow: 0 0 20px 10px #f3f3f3;
    padding: 2rem 2rem 0;
    background-color: white;
    border-radius: 1rem;

    & .el-input__inner {
      height: 3rem;
    }

    & .el-form-item__label {
      font-size: 1.2rem;
    }

    & :deep(.el-input__inner) {
      background-color: #f3f3f3;
      border-radius: 1.5rem;
      border: 1px solid #f3f3f3;
      font-size: 1.2rem;
    }

    & .el-form-item:not(:last-child) {
      margin-bottom: 1.8rem;
    }

    & .el-form-item:last-child {
      margin-bottom: -2rem;
    }
  }

  .formBox {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    & .el-dialog {
      border-radius: 1rem;
      text-align: center;
    }

    & .button {
      font-family: Roboto-Regular, sans-serif;
      width: 15rem;
      height: 4rem;
      border-radius: 2rem;
      border: none;
      color: white;
      font-size: 1.3rem;
      cursor: pointer;
      background: linear-gradient(to right, #97db30, #319e55);
    }

    & .button:focus {
      outline: none;
    }
  }

  .pointer {
    cursor: pointer;
  }

  #forgetPwd {
    font-size: 1rem;
  }

  #forgetPwd:hover {
    text-decoration: underline;
  }

  .el-form-item__error {
    font-size: 0.8rem;
  }
  :deep(.loginBtn .el-form-item__content) {
    justify-content: center;
  }
  :deep(.forgetPwd .el-form-item__content) {
    justify-content: flex-end;
  }
}
</style>
