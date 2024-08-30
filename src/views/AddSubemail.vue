<template>
  <el-row id="addSubemail">
    <el-col class="addSubemail" :offset="6" :span="12">
      <p class="tabName">
        {{ $t('corp.addSubEmail') }}
        <el-tooltip
          effect="light"
          :content="$t('corp.subEmailDesc')"
          placement="right"
        >
          <svg-icon class="pointer" icon-class="tips" />
        </el-tooltip>
      </p>
      <el-form
        class="addSubemailForm"
        :model="ruleForm"
        :rules="rules"
        ref="ruleFormRef"
        label-width="0"
      >
        <el-form-item prop="email">
          <el-input
            :placeholder="$t('corp.email_input_holder')"
            size="small"
            v-model="ruleForm.email"
            clearable=""
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row align="middle" :gutter="20">
            <el-col :span="16">
              <el-input
                v-model="ruleForm.code"
                :placeholder="$t('signPage.verifyCodeHolder')"
                size="small"
                clearable=""
              >
              </el-input>
            </el-col>
            <el-col :span="8">
              <el-button
                :disabled="sendBtTextFromLang !== $t('signPage.sendCode')"
                @click="sendCode()"
                >{{ sendBtTextFromLang }}
              </el-button>
            </el-col>
          </el-row>
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
import claConfig from '../lang/global';
import { ref, computed, inject, onUpdated, onMounted, watch } from 'vue';
import { useCommonStore } from '../stores/common';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const { t, locale } = useI18n();
const $t = t;
const commonStore = useCommonStore();
const router = useRouter();

const corpReLoginDialogVisible = computed(() => {
  return commonStore.dialogVisible;
});
const corpReLoginMsg = computed(() => {
  return commonStore.dialogMessage;
});
const corpReTryDialogVisible = computed(() => {
  return commonStore.reTryDialogVisible;
});
const sendBtTextFromLang = computed({
  get: function () {
    return sendBtText.value;
  },
  set: function (value) {
    sendBtText.value = value;
  },
});

watch(
  () => {
    locale.value;
  },
  () => {
    if (
      sendBtText.valueFromLang === 'send code' ||
      sendBtText.valueFromLang === '发送验证码'
    ) {
      sendBtText.valueFromLang = $t('signPage.sendCode');
    } else {
      sendBtText.valueFromLang = $t('signPage.reSendCode', {
        second: second.value,
      });
    }
    ruleFormRef.value &&
      ruleFormRef.value.fields.forEach((item) => {
        if (item.validateState === 'error') {
          ruleFormRef.value.validateField(item.labelFor);
        }
      });
  }
);
const ruleFormRef = ref();
const second = ref('');
const sendBtText = ref($t('signPage.sendCode'));
const ruleForm = ref({ email: '', code: '' });

const verifyFormEmail = async (rule, value, callback) => {
  let email = value.trim();
  if (claConfig.EMAIL_REG.test(email)) {
    callback();
  } else {
    callback(new Error($t('tips.invalid_email')));
  }
};
const verifyCodeCheck = async (rule, value, callback) => {
  if (value) {
    callback();
  } else {
    callback(new Error($t('tips.fill_verification_code')));
  }
};
const rules = ref({
  email: [
    {
      required: true,
      validator: verifyFormEmail,
      trigger: ['blur', 'change'],
    },
  ],
  code: [
    {
      required: true,
      validator: verifyCodeCheck,
      trigger: ['blur', 'change'],
    },
  ],
});
const isExistSuffix = (suffixArr, suffix) => {
  if (!suffixArr) {
    ElMessage.closeAll();
    ElMessage.error($t('tips.noSession'));
    return;
  }
  let isExist = false;
  for (let i = 0; i < suffixArr.length; i++) {
    if (suffixArr[i] === suffix) {
      isExist = true;
      break;
    }
  }
  return isExist;
};
const submitSubEmail = () => {
  let subEmailSplit = ruleForm.value.email.trim().split('@');
  if (
    isExistSuffix(
      commonStore.emailSuffixArr,
      subEmailSplit[subEmailSplit.length - 1]
    )
  ) {
    commonStore.errorCodeSet({
      dialogVisible: true,
      dialogMessage: $t('tips.sameEmailSuffix'),
    });
    return;
  }
  http({
    url: url.addSubEmail,
    method: 'post',
    data: {
      verification_code: ruleForm.value.code.trim(),
      sub_email: ruleForm.value.email.trim(),
    },
  })
    .then((res) => {
      util.successMessage(this);
      router.push('/subemail');
    })
    .catch((err) => {
      util.catchErr(err, 'errorSet', this);
    });
};
const submitForm = (formName) => {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      if (
        !compareEmailSuffix(
          commonStore.loginInfo.userName,
          ruleForm.value.email.trim()
        )
      ) {
        commonStore.errorCodeSet({
          dialogVisible: true,
          dialogMessage: $t('tips.subemailErr'),
        });
        return;
      }
      submitSubEmail();
    } else {
      return false;
    }
  });
};
const compareEmailSuffix = (loginEmailOrID, subemail) => {
  let loginSuffix,
    subSuffix = '';
  let loginSuffixArr,
    subSuffixArr = [];
  if (loginEmailOrID.indexOf('@') !== -1) {
    let suffixArr = loginEmailOrID.split('@');
    loginSuffix = suffixArr[suffixArr.length - 1];
  } else {
    let suffixArr = loginEmailOrID.split('_');
    loginSuffix = suffixArr[suffixArr.length - 1];
  }
  let suffixArr = subemail.split('@');
  subSuffix = suffixArr[suffixArr.length - 1];
  loginSuffixArr = loginSuffix.split('.');
  subSuffixArr = subSuffix.split('.');
  if (loginSuffixArr.length >= 2 && subSuffixArr.length >= 2) {
    let isPass = true;
    for (let i = 0; i < 2; i++) {
      if (
        loginSuffixArr[loginSuffixArr.length - 1 - i] !==
        subSuffixArr[subSuffixArr.length - 1 - i]
      ) {
        isPass = false;
        break;
      }
    }
    return isPass;
  } else {
    return false;
  }
};
const sendCode = () => {
  let email = ruleForm.value.email.trim();
  if (email && claConfig.EMAIL_REG.test(email)) {
    if (!compareEmailSuffix(commonStore.loginInfo.userName, email)) {
      commonStore.errorCodeSet({
        dialogVisible: true,
        dialogMessage: $t('tips.subemailErr'),
      });
      return;
    }
    http({
      url: `${url.sendDomainCode}/code`,
      method: 'post',
      data: { email: email },
    })
      .then((res) => {
        ElMessage.closeAll();
        ElMessage.success({
          message: $t('tips.sending_email'),
          duration: 5000,
        });
        second.value = 60;
        let codeInterval = setInterval(() => {
          if (second.value !== 0) {
            second.value--;
            sendBtText.valueFromLang = $t('signPage.reSendCode', {
              second: second.value,
            });
          } else {
            sendBtText.valueFromLang = $t('signPage.sendCode');
            clearInterval(codeInterval);
          }
        }, 1000);
      })
      .catch((err) => {
        util.catchErr(err, 'errorSet', this);
      });
  } else {
    ElMessage.closeAll();
    ElMessage.error($t('tips.not_fill_email'));
  }
};
</script>

<style lang="scss" scoped>
#addSubemail {
  .addSubemailForm {
    box-shadow: 0 0 20px 10px #f3f3f3;
    padding: 2rem 2rem 0;
    background-color: white;
    border-radius: 1rem;
  }

  .el-button.is-disabled,
  .el-button.is-disabled:focus,
  .el-button.is-disabled:hover {
    cursor: pointer;
    border: none;
    background: linear-gradient(to right, #97db30, #319e55);
  }

  .el-input.el-input--small.el-input-group.el-input-group--append {
    position: relative;
  }

  .el-button {
    top: 0;
    left: 0;
    width: 100%;
    height: 2.5rem;
    border-radius: 1.25rem;
    font-size: 1rem;
    color: white;
    margin: 0;
    font-family: Roboto-Light, sans-serif;
    background: linear-gradient(to right, #97db30, #319e55);
  }

  .el-input-group__append {
    position: absolute;
    right: 0;
    top: 0;
    background: linear-gradient(to right, #97db30, #319e55);
    width: 11rem;
    height: 2.5rem;
    border-radius: 1.25rem;
    padding: 0;
  }

  .el-input--small .el-input__inner {
    height: 2.5rem;
  }

  .el-form-item__label {
    font-size: 1.2rem;
  }

  .el-input__inner {
    background-color: #f3f3f3;
    border-radius: 1.25rem;

    font-size: 1rem;
  }

  .el-form-item {
    margin-bottom: 28px;
  }
}
:deep(.el-form-item__content) {
  display: block;
}
</style>
