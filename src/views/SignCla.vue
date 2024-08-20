<template>
  <el-row id="signCla">
    <div id="singCla_section">
      <el-row class="content">
        <el-col>
          <p class="contentTitle" v-if="showInput === 'employee'">
            {{ $t('signPage.claContentTitle') }}111
          </p>
          <p class="contentTitle" v-else>{{ $t('signPage.claTitle') }}</p>
          <el-row class="marginTop3rem form" v-if="showInput === 'employee'">
            <h3 style="text-align: center">
              {{ $t('signPage.claContentSTitle') }}
            </h3>
            {{ $t('signPage.claContent1')
            }}<span class="title">{{ companyName }}</span
            >{{ $t('signPage.claContent2', { name: communityName })
            }}<span class="title">{{ myForm.email }}</span>
            {{ $t('signPage.claContent3', { name: communityName })
            }}<span class="title">{{ companyName }}</span>
            {{ $t('signPage.claS') }}
            <br />
            <h3 style="display: inline-block">{{ $t('signPage.claZ') }}</h3>
            {{ $t('signPage.claContentT') }}</el-row
          >
          <el-row class="marginTop3rem" id="claBox" v-else>
            <iframe
              id="pdf_iframe"
              ref="pdf_iframe"
              class="iframeClass"
              :src="claTextUrl"
              frameborder="0"
            ></iframe>
          </el-row>
          <el-row class="marginTop3rem form">
            <el-col>
              <el-form
                v-if="this.IS_MOBILE"
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-position="left"
                label-width="25%"
                class="demo-ruleForm"
              >
                <el-form-item
                  v-for="(item, index) in fields"
                  label-width="0"
                  :key="index"
                  :required="item.required"
                  :prop="item.id"
                >
                  <div>
                    <span v-if="item.required" class="requiredIcon">*</span
                    >{{ item.title }}
                  </div>
                  <el-input
                    v-if="item.type === 'date'"
                    readonly=""
                    v-model="ruleForm[item.id]"
                    size="small"
                    @input="setMyForm(item.type, ruleForm[item.id])"
                  ></el-input>
                  <el-input
                    v-else
                    v-model="ruleForm[item.id]"
                    :placeholder="
                      item.type === 'email' && showInput === 'employee'
                        ? $t('signPage.claHolder')
                        : $t('signPage.holder', { title: item.title })
                    "
                    size="small"
                    @input="setMyForm(item.type, ruleForm[item.id])"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  :label="$t('signPage.corp')"
                  v-if="showInput === 'employee'"
                  required
                >
                  <el-select
                    v-model="orgValue"
                    :placeholder="$t('org.config_cla_select_org_placeholder')"
                    size="small"
                    style="width: 100%"
                    clearable
                    filterable
                    @visible-change="orgVisibleChange"
                    :disabled="getOrg"
                  >
                    <el-option
                      v-for="item in signingData"
                      :key="item.corp_signing_id"
                      :label="item.corp_name"
                      :value="item.corp_signing_id"
                      @click.native="getCompany(item.corp_name)"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item v-if="rules.code" label-width="0" prop="code">
                  <div>
                    <span class="requiredIcon">*</span
                    >{{ $t('signPage.verifyCode') }}
                  </div>
                  <el-input
                    v-model="ruleForm.code"
                    :placeholder="$t('signPage.verifyCodeHolder')"
                    size="small"
                  >
                  </el-input>
                </el-form-item>
                <button
                  class="margin-top-1rem mobileBt"
                  type="button"
                  :disabled="sendBtDisable"
                  @click="sendCode()"
                >
                  {{ sendBtTextFromLang }}
                </button>
                <div class="borderClass fontSize12">
                  <span class="requiredIcon">*</span
                  >{{ $t('signPage.requireText') }}
                </div>
                <div class="margin-top-1rem fontSize12">
                  <el-checkbox v-model="isRead"
                    ><span
                      >{{ $t('signPage.checkBoxText1')
                      }}<span class="privacy" @click="previewPrivacy()">{{
                        $t('signPage.privacy')
                      }}</span
                      >{{ $t('signPage.checkBoxText2')
                      }}<span> {{ $t('signPage.claSignPlatform') }}</span
                      >{{ $t('signPage.checkBoxText3') }}</span
                    >
                  </el-checkbox>
                </div>
                <el-form-item label-width="0" class="margin-top-1rem signBtBox">
                  <button
                    class="mobileBt"
                    type="button"
                    @click="submitForm('ruleForm')"
                  >
                    {{ $t('signPage.sign') }}
                  </button>
                </el-form-item>
              </el-form>
              <el-form
                v-else
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-position="left"
                label-width="25%"
                class="demo-ruleForm"
              >
                <el-form-item
                  v-for="(item, index) in fields"
                  :label="item.title"
                  :required="item.required"
                  :prop="item.id"
                  :key="index"
                >
                  <el-input
                    v-if="item.type === 'date'"
                    readonly=""
                    v-model="ruleForm[item.id]"
                    size="small"
                    @input="setMyForm(item.type, ruleForm[item.id])"
                  ></el-input>
                  <el-input
                    v-else
                    v-model="ruleForm[item.id]"
                    :placeholder="
                      item.type === 'email' && showInput === 'employee'
                        ? $t('signPage.claHolder')
                        : $t('signPage.holder', { title: item.title })
                    "
                    size="small"
                    @input="setMyForm(item.type, ruleForm[item.id])"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  :label="$t('signPage.corp')"
                  v-if="showInput === 'employee'"
                  required
                >
                  <el-select
                    v-model="orgValue"
                    :placeholder="$t('org.config_cla_select_org_placeholder')"
                    size="small"
                    style="width: 100%"
                    clearable
                    filterable
                    @visible-change="orgVisibleChange"
                    :disabled="getOrg"
                  >
                    <el-option
                      v-for="item in signingData"
                      :key="item.corp_signing_id"
                      :label="item.corp_name"
                      :value="item.corp_signing_id"
                      @click.native="getCompany(item.corp_name)"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  class="sendCodeClass"
                  v-if="rules.code"
                  :label="$t('signPage.verifyCode')"
                  prop="code"
                >
                  <el-input
                    v-model="ruleForm.code"
                    :placeholder="$t('signPage.verifyCodeHolder')"
                    size="small"
                  >
                    <el-tooltip
                      slot="append"
                      :content="$t('signPage.sendCodeTip')"
                      placement="top"
                      effect="light"
                      popper-class="my_tooltip"
                    >
                      <el-button :disabled="sendBtDisable" @click="sendCode()"
                        >{{ sendBtTextFromLang }}
                      </el-button>
                    </el-tooltip>
                  </el-input>
                </el-form-item>
                <div class="borderClass fontSize12">
                  <span class="requiredIcon">*</span
                  >{{ $t('signPage.requireText') }}
                </div>
                <div class="margin-top-1rem fontSize12">
                  <el-checkbox v-model="isRead"
                    ><span
                      >{{ $t('signPage.checkBoxText1')
                      }}<span class="privacy" @click="previewPrivacy()">{{
                        $t('signPage.privacy')
                      }}</span
                      >{{ $t('signPage.checkBoxText2')
                      }}<span> {{ $t('signPage.claSignPlatform') }}</span
                      >{{ $t('signPage.checkBoxText3') }}</span
                    >
                  </el-checkbox>
                </div>
                <el-form-item
                  label-width="0"
                  class="margin-top-1rem padding-top-bottom-1rem signBtBox"
                >
                  <HttpButton
                    :text="$t(`signPage.${signText}`)"
                    :buttonDisable="signButtonDisable"
                    :width="signButtonWidth"
                    :height="signButtonHeight"
                    :borderRaduis="signButtonBorderRadius"
                    @httpSubmit="submitForm('ruleForm')"
                  >
                  </HttpButton>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>

    <ReLoginDialog
      :dialogVisible="reLoginDialogVisible"
      :message="reLoginMsg"
    ></ReLoginDialog>
    <ReTryDialog
      :dialogVisible="reTryDialogVisible"
      :message="reLoginMsg"
    ></ReTryDialog>
    <SignSuccessDialog
      :dialogVisible="signSuccessDialogVisible"
      :message="reLoginMsg"
    ></SignSuccessDialog>
    <SignReLoginDialog
      :dialogVisible="signReLoginDialogVisible"
      :message="reLoginMsg"
    ></SignReLoginDialog>
  </el-row>
</template>

<script setup lang="ts">
import * as util from '../util/util';
import * as url from '../util/api';

import axios from '../util/_axios';
import ReLoginDialog from '../components/ReLoginDialog.vue';
import ReTryDialog from '../components/ReTryDialog.vue';
import SignSuccessDialog from '../components/SignSuccessDialog.vue';
import SignReLoginDialog from '../components/SignReLoginDialog.vue';
import HttpButton from '../components/HttpButton.vue';
import cla from '../lang/global';
import {
  ref,
  computed,
  inject,
  onUpdated,
  onMounted,
  watch,
  nextTick,
  defineEmits,
} from 'vue';
import { useCommonStore } from '../stores/common';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';

const { t, locale } = useI18n();
const $t = t;
const commonStore = useCommonStore();
const router = useRouter();
const route = useRoute();
const pdf_iframe = ref();
const emit = defineEmits(['getLangOptions', 'initHeader']);

const pdfData = computed(() => {
  if (commonStore.pdfData) {
    return commonStore.pdfData;
  }
  return [];
});
const loginType = computed(() => {
  return commonStore.loginType;
});
const org = computed(() => {
  let org = commonStore.repoInfo.org_id;
  if (org.length > 1) {
    return org.charAt(0).toUpperCase() + org.substring(1);
  } else {
    return org.charAt(0).toUpperCase();
  }
});
const reLoginDialogVisible = computed(() => {
  return commonStore.dialogVisible;
});
const reLoginMsg = computed(() => {
  return commonStore.dialogMessage;
});
const reTryDialogVisible = computed(() => {
  return commonStore.reTryDialogVisible;
});
const signSuccessDialogVisible = computed(() => {
  return commonStore.signSuccessDialogVisible;
});
const signReLoginDialogVisible = computed(() => {
  return commonStore.signReLoginDialogVisible;
});
const sendBtTextFromLang = computed({
  get: function () {
    return sendBtText.value;
  },
  set: function (value) {
    sendBtText.value = value;
  },
});
const claTextUrl = computed(() => {
  return `${commonStore.domain}/cla-pdf`;
});

watch(
  () => {
    '$i18n.locale';
  },
  () => {
    if (route.path !== '/sign-cla') {
      return;
    }
    cla_lang.value = '';
    lang.value = localStorage.getItem('lang');
    signPageData.value.forEach((item, index) => {
      if (item.language === lang.value) {
        cla_lang.value = item.language;
        value.value = index;
        cla_hash.value = item.cla_id;
        cla_id.value = item.cla_id;
        sessionStorage.setItem('cla_id', item.cla_id);
        console.log('aaa');
        pdf_iframe.value?.contentWindow.postMessage(
          {
            link_id: link_id.value,
            lang: lang.value,
            hash: cla_hash.value,
            pdfData: pdfData.value,
          },
          claTextUrl.value
        );
        fields.value = signPageData.value[value.value].fields;
        if (Object.keys(rules.value).length === 0) {
          setFieldsData();
        }
      }
    });
    setSendBtText();
    ruleForm.value &&
      ruleForm.value.fields.forEach((item) => {
        if (item.validateState === 'error') {
          ruleForm.value.validateField(item.labelFor);
        }
      });
  }
);

const setClientHeight = inject('setClientHeight');
console.log(setClientHeight);
const sendBtDisable = ref(false);
const signText = ref('sign');
const signButtonDisable = ref(false);
const signButtonWidth = ref('15rem');
const signButtonHeight = ref('3rem');
const signButtonBorderRadius = ref('1.5rem');
const corporation = ref('corporation');
const individual = ref('individual');
const employee = ref('employee');
const claText = ref('');
const numPages = ref(null);
const lang = ref('');
const cla_hash = ref('');
const second = ref('');
const sendBtText = ref($t('signPage.sendCode'));
const domain = ref(commonStore.domain);
const tipsTitle = ref('');
const tipsMessage = ref($t('tips.individual_sign'));
const tipsDialogVisible = ref(false);
const signPageData = ref('');
const link_id = ref(commonStore.linkId);
const claOrgIdArr = ref([]);
const fields = ref([]);
const claIdArr = ref([]);
const isVerify = ref(false);
const verifyCode = ref('');
const dialogVisible = ref(false);
const repositoryOptions = ref([]);
const role = ref('0');
const ruleForm = ref({});
const myForm = ref({});
const rules = ref({});
const isRead = ref(false);
const value = ref('');
const cla_lang = ref('');
const signingData = ref([]);
const orgValue = ref('');
const cla_id = ref('');
const showInput = ref(sessionStorage.getItem('loginType'));
const getOrg = ref(true);
const companyName = ref('');
const communityName = ref('');

const getCompany = (val) => {
  companyName.value = val;
};
const setSendBtText = () => {
  if (
    sendBtTextFromLang.value === 'send code' ||
    sendBtTextFromLang.value === '发送验证码'
  ) {
    sendBtTextFromLang.value = $t('signPage.sendCode');
  } else {
    sendBtTextFromLang.value = $t('signPage.reSendCode', {
      second: second.value,
    });
  }
};
const setIframeEventListener = () => {
  window.addEventListener(
    'message',
    (event) => {
      if (event.data instanceof Array && event.origin === commonStore.domain) {
        commonStore.setPdfData(event.data);
      }
    },
    false
  );
};
const previewPrivacy = () => {
  util.toPrivacy(this);
};
const requireVerifyTel = async (rule, value, callback) => {
  if (value) {
    let reg = /^1[3456789]\d{9}$/;
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error($t('tips.invalid_telephone_num')));
    }
  } else {
    callback(new Error($t('tips.not_fill_telephone_num')));
  }
};
const verifyTel = async (rule, value, callback) => {
  if (value) {
    let reg = /^1[3456789]\d{9}$/;
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error($t('tips.invalid_telephone_num')));
    }
  }
};
const verifyAddr = async (rule, value, callback) => {
  if (!value) {
    callback(new Error($t('tips.not_fill_address')));
  } else {
    callback();
  }
};
const verifyFax = async (rule, value, callback) => {
  if (!value) {
    callback(new Error($t('tips.not_fill_fax')));
  } else {
    callback();
  }
};
const verifyFormEmail = async (rule, value, callback) => {
  let email = '';
  if (value) {
    email = value.trim();
  }
  if (cla.EMAIL_REG.test(email)) {
    callback();
    getOrg.value = false;
  } else {
    callback(new Error($t('tips.invalid_email')));
    getOrg.value = true;
  }
};
const verifyName = async (rule, value, callback) => {
  if (value) {
    callback();
  } else {
    callback(new Error($t('tips.fill_name')));
  }
};
const verifyCorpName = async (rule, value, callback) => {
  if (!value) {
    callback(new Error($t('tips.fill_corp_name')));
  } else {
    callback();
  }
};
const verifyTitle = async (rule, value, callback) => {
  if (!value) {
    callback(new Error($t('tips.fill_representative_title')));
  } else {
    callback();
  }
};
const verifyAuthorized = async (rule, value, callback) => {
  if (!value) {
    callback(new Error($t('tips.fill_representative_name')));
  } else {
    callback();
  }
};
const verifyDate = async (rule, value, callback) => {
  if (!value) {
    callback(new Error($t('tips.fill_date')));
  } else {
    callback();
  }
};
const verifyCodeCheck = async (rule, value, callback) => {
  if (!value) {
    callback(new Error($t('tips.fill_verification_code')));
  } else {
    callback();
  }
};
const setMyForm = (type, value) => {
  companyName.value = '';
  myForm.value[type] = value;
  if (!myForm.value.email) {
    getOrg.value = true;
  }
};
const sendCode = () => {
  let email = myForm.value.email;
  let _url = '';
  if (sessionStorage.getItem('loginType') === 'corporation') {
    _url = `${url.sendCorporationCode}/${link_id.value}/code`;
  } else if (sessionStorage.getItem('loginType') === 'individual') {
    _url = `${url.sendVerifyCode}/${link_id.value}/code`;
  } else if (sessionStorage.getItem('loginType') === 'employee') {
    _url = `${url.sendEmployeeCode}/${link_id.value}/${orgValue.value}/code`;
  }
  if (email && EMAIL_REG.test(email)) {
    sendBtDisable.value = true;
    axios({
      url: _url,
      method: 'post',
      data: { email: myForm.value.email },
    })
      .then((res) => {
        ElMessage.closeAll();
        ElMessage.success({
          message: $t('tips.sending_email'),
          duration: 8000,
        });
        second.value = 60;
        let codeInterval = setInterval(() => {
          if (second.value !== 0) {
            second.value--;
            sendBtTextFromLang.value = $t('signPage.reSendCode', {
              second: second.value,
            });
          } else {
            sendBtTextFromLang.value = $t('signPage.sendCode');
            sendBtDisable.value = false;
            clearInterval(codeInterval);
          }
        }, 1000);
      })
      .catch((err) => {
        util.catchErr(err, 'setSignReLogin', this);
      });
  } else {
    ElMessage.closeAll();
    if (EMAIL_REG.test(email) && !orgValue.value) {
      ElMessage.error($t('tips.not_fill_org'));
    } else {
      ElMessage.error($t('tips.not_fill_email'));
    }
  }
};
const getNowDate = () => {
  let date = new Date();
  let year, month, day;
  year = date.getFullYear();
  date.getMonth() < 9
    ? (month = `0${date.getMonth() + 1}`)
    : (month = date.getMonth() + 1);
  date.getDate() < 10 ? (day = `0${date.getDate()}`) : (day = date.getDate());
  for (let item of fields.value) {
    if (item.type === 'date') {
      myForm.value.date = year + '-' + month + '-' + day;
      Object.assign(ruleForm.value, {
        [item.id]: year + '-' + month + '-' + day,
      });
      break;
    }
  }
};
const setData = (res, resolve) => {
  if (res && res.data.data) {
    if (res.data.data && res.data.data.length) {
      signPageData.value = res.data.data;
      if (localStorage.getItem('lang') !== undefined) {
        lang.value = localStorage.getItem('lang');
      }
      let langOptions = [];
      let langLabel = '';
      signPageData.value.forEach((item, index) => {
        langLabel = util.upperFirstCase(item.language);
        langOptions.push({ value: index, label: langLabel });
        if (item.language === lang.value) {
          cla_lang.value = item.language;
          sessionStorage.setItem('cla_id', item.cla_id);
          value.value = index;
          cla_hash.value = item.cla_hash;
        }
      });
      emit('getLangOptions', langOptions);
      if (!cla_lang.value) {
        lang.value = signPageData.value[0].language;
        cla_lang.value = signPageData.value[0].language;
        value.value = 0;
        cla_hash.value = signPageData.value[0].cla_hash;
        localStorage.setItem('lang', util.upperFirstCase(lang.value));
      }
      setClaText({
        link_id: link_id.value,
        lang: lang.value,
        hash: cla_hash.value,
        pdfData: pdfData.value,
      });
      setFields(value.value);
      setFieldsData();
      resolve('complete');
      emit('initHeader', util.upperFirstCase(lang.value));
    } else {
      let message = '';
      if (commonStore.loginType === corporation.value) {
        message = $t('tips.no_cla_binding_corp');
      } else if (commonStore.loginType === employee.value) {
        message = $t('tips.no_cla_binding_emp');
      }
      if (commonStore.loginType === individual.value) {
        message = $t('tips.no_cla_binding_individual');
      }
      commonStore.setSignReLogin({
        dialogVisible: true,
        dialogMessage: message,
      });
    }
  }
};
const getSignPage = (resolve) => {
  let applyTo = '';
  loginType.value === corporation.value
    ? (applyTo = loginType.value)
    : (applyTo = individual.value);
  if (!commonStore.linkId) {
    commonStore.errorCodeSet({
      dialogVisible: true,
      dialogMessage: $t('tips.page_error'),
    });
    return;
  }
  console.log(url.getSignPage);
  console.log(commonStore.linkId);
  console.log(applyTo);

  axios({
    url: `${url.getSignPage}/${commonStore.linkId}/${applyTo}`,
  })
    .then((res) => {
      setData(res, resolve);
    })
    .catch((err) => {
      util.catchErr(err, 'setSignReLogin', this);
    });
};
const setClaText = (obj) => {
  nextTick(() => {
    pdf_iframe.value.contentWindow.onload = () => {
      pdf_iframe.value.contentWindow.postMessage(obj, '*');
      console.log('ddd');
      console.log(claTextUrl.value);
      console.log(obj);
    };
  });
};
const setFields = (key) => {
  for (let i = 0; i < signPageData.value[key].fields.length; i++) {
    for (let j = i + 1; j < signPageData.value[key].fields.length; j++) {
      if (
        Number(signPageData.value[key].fields[i].id) >
        Number(signPageData.value[key].fields[j].id)
      ) {
        let field = signPageData.value[key].fields[i];
        signPageData.value[key].fields[i] = signPageData.value[key].fields[j];
        signPageData.value[key].fields[j] = field;
      }
    }
  }
  fields.value = signPageData.value[key].fields;
};
const setFieldsData = () => {
  let form = {};
  let rules = {};
  fields.value.forEach((item) => {
    Object.assign(form, { [item.id]: '' });
    if (item.type === 'name') {
      Object.assign(myForm.value, { name: '' });
      item.required &&
        Object.assign(rules, {
          [item.id]: [
            {
              required: item.required,
              validator: verifyName,
              trigger: ['blur', 'change'],
            },
          ],
        });
    } else if (item.type === 'corporationName') {
      Object.assign(myForm.value, { corporationName: '' });
      item.required &&
        Object.assign(rules, {
          [item.id]: [
            {
              required: item.required,
              validator: verifyCorpName,
              trigger: ['blur', 'change'],
            },
          ],
        });
    } else if (item.type === 'title') {
      Object.assign(myForm.value, { title: '' });
      item.required &&
        Object.assign(rules, {
          [item.id]: [
            {
              required: item.required,
              validator: verifyTitle,
              trigger: ['blur', 'change'],
            },
          ],
        });
    } else if (item.type === 'authorized') {
      Object.assign(myForm.value, { authorized: '' });
      item.required &&
        Object.assign(rules, {
          [item.id]: [
            {
              required: item.required,
              validator: verifyAuthorized,
              trigger: ['blur', 'change'],
            },
          ],
        });
    } else if (item.type === 'date') {
      Object.assign(myForm.value, { date: '' });
      item.required &&
        Object.assign(rules, {
          [item.id]: [
            {
              required: item.required,
              validator: verifyDate,
              trigger: ['blur', 'change'],
            },
          ],
        });
    } else if (item.type === 'email') {
      Object.assign(myForm.value, { email: '' });
      item.required &&
        Object.assign(rules, {
          [item.id]: [
            {
              required: item.required,
              validator: verifyFormEmail,
              trigger: ['blur', 'change'],
            },
          ],
        });
    } else if (item.type === 'telephone') {
      Object.assign(myForm.value, { telephone: '' });
      if (item.required) {
        Object.assign(rules, {
          [item.id]: [
            {
              required: item.required,
              validator: requireVerifyTel,
              trigger: ['blur', 'change'],
            },
          ],
        });
      } else {
        Object.assign(rules, {
          [item.id]: [
            {
              validator: verifyTel,
              trigger: ['blur', 'change'],
            },
          ],
        });
      }
    } else if (item.type === 'address') {
      Object.assign(myForm.value, { address: '' });
      item.required &&
        Object.assign(rules, {
          [item.id]: [
            {
              required: item.required,
              validator: verifyAddr,
              trigger: ['blur', 'change'],
            },
          ],
        });
    } else if (item.type === 'fax') {
      Object.assign(myForm.value, { fax: '' });
      item.required &&
        Object.assign(rules, {
          [item.id]: [
            {
              required: item.required,
              validator: verifyFax,
              trigger: ['blur', 'change'],
            },
          ],
        });
    }
  });
  Object.assign(form, { code: '' });
  Object.assign(myForm.value, { code: '' });
  Object.assign(rules, {
    code: [
      {
        required: true,
        validator: verifyCodeCheck,
        trigger: ['blur', 'change'],
      },
    ],
  });
  ruleForm.value = form;
  rules.value = rules;
};
//签署
const signCla = () => {
  let info = {};
  let myUrl = '';
  let obj = {};
  for (let key in ruleForm.value) {
    if (ruleForm.value[key] !== '') {
      Object.assign(info, { [key]: ruleForm.value[key] + '' });
    }
  }
  if (commonStore.loginType === corporation.value) {
    myUrl = `${url.corporation_signing}/${link_id.value}`;
    obj = {
      corporation_name: myForm.value.corporationName,
      admin_name: myForm.value.authorized,
      admin_email: myForm.value.email,
      enabled: true,
      info: info,
      verification_code: ruleForm.value.code,
      corp_signing_id: orgValue.value,
      cla_id: sessionStorage.getItem('cla_id'),
      cla_language: cla_lang.value,
      privacy_checked: isRead.value,
    };
  } else {
    if (commonStore.loginType === employee.value) {
      obj = {
        name: myForm.value.name,
        email: myForm.value.email,
        verification_code: ruleForm.value.code,
        info: info,
        cla_id: sessionStorage.getItem('cla_id'),
        cla_language: cla_lang.value,
        corp_signing_id: orgValue.value,
        privacy_checked: isRead.value,
      };
    } else {
      obj = {
        name: myForm.value.name,
        email: myForm.value.email,
        verification_code: ruleForm.value.code,
        info: info,
        cla_id: sessionStorage.getItem('cla_id'),
        cla_language: cla_lang.value,
        privacy_checked: isRead.value,
      };
    }

    if (commonStore.loginType === individual.value) {
      myUrl = `${url.individual_signing}/${link_id.value}`;
    } else if (commonStore.loginType === employee.value) {
      myUrl = `${url.employee_signing}/${link_id.value}`;
    }
  }
  sign(myUrl, obj);
};
const sign = (myUrl, obj) => {
  if (!myUrl) {
    return;
  }
  signText.value = 'signing';
  signButtonDisable.value = true;
  axios({
    url: myUrl,
    method: 'post',
    data: obj,
  })
    .then((res) => {
      signText.value = 'sign';
      signButtonDisable.value = false;
      if (commonStore.loginType === corporation.value) {
        tipsMessage.value = $t('tips.corp_sign');
      } else if (commonStore.loginType === employee.value) {
        tipsMessage.value = $t('tips.emp_sign');
      } else if (commonStore.loginType === individual.value) {
        tipsMessage.value = $t('tips.individual_sign');
      }
      commonStore.setSignSuccess({
        dialogVisible: true,
        dialogMessage: tipsMessage.value,
      });
    })
    .catch((err) => {
      signText.value = 'sign';
      signButtonDisable.value = false;
      util.catchErr(err, 'setSignReLogin', this);
    });
};
const submitForm = (formName) => {
  formName.value.validate((valid) => {
    if (valid) {
      if (isRead.value) {
        signCla();
      } else {
        ElMessage.closeAll();
        ElMessage.error($t('tips.review_privacy'));
      }
    } else {
      return false;
    }
  });
};
//拉取公司列表
const orgVisibleChange = (visible) => {
  if (visible) {
    getOrg.valuesInfo();
  }
};
const getOrgsInfo = () => {
  axios({
    url: `${url.getCorporationSigning}/${link_id.value}/corps/${myForm.value.email}`,
    method: 'get',
  })
    .then((res) => {
      signingData.value = res.data.data;
    })
    .catch((err) => {
      switch (err.status) {
        case 401:
          commonStore.setOrgReLogin({
            dialogVisible: true,
            dialogMessage: $t('tips.not_authorize_group'),
          });
          break;
        case 403:
          commonStore.setOrgReLogin({
            dialogVisible: true,
            dialogMessage: $t('tips.invalid_token'),
          });
          break;
        default:
          commonStore.errorCodeSet({
            dialogVisible: true,
            dialogMessage: $t('tips.system_error'),
          });
      }
    });
};

//获取社区名字
const getCommunity = () => {
  console.log(url.getCommunity);
  console.log(link_id.value);

  axios({
    url: `${url.getCommunity}/${link_id.value}`,
    method: 'get',
  }).then((res) => {
    communityName.value = res.data.data.org_alias;
  });
};

const activated = () => {
  if (signPageData.value) {
    setClientHeight();
    if (localStorage.getItem('lang') !== undefined) {
      lang.value = localStorage.getItem('lang');
    }
    let langOptions = [];
    let langLabel = '';
    cla_lang.value = '';
    signPageData.value.forEach((item, index) => {
      langLabel = util.upperFirstCase(item.language);
      langOptions.push({ value: index, label: langLabel });
      if (item.language === lang.value) {
        cla_lang.value = item.language;
        value.value = index;
        cla_hash.value = item.cla_hash;
        setClaText({
          link_id: link_id.value,
          lang: lang.value,
          hash: cla_hash.value,
          pdfData: pdfData.value,
        });
        setFields(value.value);
      }
    });
    emit('getLangOptions', langOptions);
    if (!cla_lang.value) {
      lang.value = signPageData.value[0].language;
      value.value = 0;
      cla_hash.value = signPageData.value[0].cla_hash;
      setClaText({
        link_id: link_id.value,
        lang: lang.value,
        hash: cla_hash.value,
        pdfData: pdfData.value,
      });
      setFields(value.value);
      localStorage.setItem('lang', util.upperFirstCase(lang.value));
    }
    emit('initHeader', util.upperFirstCase(lang.value));
    pdf_iframe.value.contentWindow.onload = () => {
      pdf_iframe.value.contentWindow.postMessage(
        {
          link_id: link_id.value,
          lang: lang.value,
          hash: cla_hash.value,
          pdfData: pdfData.value,
        },
        claTextUrl.value
      );
      console.log('ccc');
    };
    setSendBtText();
  }
};
setIframeEventListener();
new Promise((resolve, reject) => {
  getSignPage(resolve);
}).then((res) => {
  getNowDate();
});

onMounted(() => {
  setClientHeight();
  getCommunity();
});
</script>

<style lang="scss" scoped>
@import '../assets/font/css/Roboto-Bold.css';
@import '../assets/font/css/Roboto-Black.css';
@import '../assets/font/css/Roboto-Light.css';

@media screen and (min-width: 1200px) {
  #singCla_section {
    width: 1200px;
    margin: auto;
  }
}

.signBtBox {
  display: flex;
  justify-content: center;
  width: 100%;

  .el-form-item__content {
    width: 100%;
    text-align: center;
  }
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

.privacy {
  cursor: pointer;
  color: #319e55;
}

.codeBox .el-button--medium,
.codeBox .el-button {
  border-radius: 0 4px 4px 0;
}

.codeBox .el-input__inner {
  border-radius: 4px 0 0 4px;
}

.el-button.is-disabled,
.el-button.is-disabled:focus,
.el-button.is-disabled:hover {
  cursor: pointer;
  border: none;
  background: linear-gradient(to right, #97db30, #319e55);
}

.pointer {
  cursor: pointer;
}

.verifyClass {
  padding: 10rem 0;
}

.borderClass {
  font-size: 1.2rem;
  margin-top: 1rem;
  padding: 1rem 0;
  border-top: 1px dashed #f3f3f3;
}

.form {
  border-radius: 1.25rem;
  box-shadow: 0 0 20px 10px #f3f3f3;
  padding: 2rem;
  margin-bottom: 2rem;
  font-size: 1.2rem;

  .sendCodeClass {
    & .el-input.el-input--small.el-input-group.el-input-group--append {
      position: relative;
    }

    & .el-button.el-button--default {
      position: absolute;
      top: 0;
      left: 0;
      width: 11rem;
      height: 2.5rem;
      border-radius: 1.25rem;
      font-size: 1.2rem;
      color: white;
      margin: 0;
      font-family: Roboto-Light, sans-serif;
    }

    & .el-input-group__append {
      position: absolute;
      right: 0;
      top: 0;
      background: linear-gradient(to right, #97db30, #319e55);
      width: 11rem;
      height: 2.5rem;
      border-radius: 1.25rem;
      padding: 0;
    }
  }

  & .fontSize12 {
    font-size: 1.2rem;
  }

  & .el-input--small .el-input__inner {
    height: 2.5rem;
  }

  & .el-form-item__label {
    font-size: 1.2rem;
  }

  & .el-input__inner {
    background-color: #f3f3f3;
    border-radius: 1.25rem;
    border: 1px solid #f3f3f3;
    font-size: 1.2rem;
  }

  .el-input__inner:focus {
    border-color: #319e55;
  }

  & .el-form-item {
    margin-bottom: 28px;
  }

  & .el-checkbox__label {
    display: inline-grid;
    white-space: pre-line;
    font-size: 1.2rem;
  }

  & .el-checkbox__input.is-checked + .el-checkbox__label {
    display: inline-grid;
    white-space: pre-line;
    color: #606266;
    font-size: 1.2rem;
  }

  & .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #3ea650;
    border-color: #3ea650;
  }

  & .el-checkbox__input.is-focus .el-checkbox__inner {
    border-color: #3ea650;
  }

  & .el-checkbox__inner {
    border: 1px solid #3ea650;
    width: 20px;
    height: 20px;
  }

  & .el-checkbox__inner:hover {
    border: 1px solid #3ea650;
  }

  & .el-checkbox__inner:focus {
    border: 1px solid #3ea650;
  }

  & .el-checkbox__inner:after {
    height: 10px;
    left: 7px;
    top: 2px;
  }
}

.marginTop3rem {
  margin-top: 3rem;
}

.iframeClass {
  width: 100%;
  height: 900px;
  box-shadow: 0 0 20px 10px #f3f3f3;
  border-radius: 1rem;
}

#claBox {
  margin-bottom: 2rem;
  border-radius: 1.25rem;
  white-space: pre-wrap;
  font-size: 1.2rem;
  /*box-shadow: 0 0 20px 10px #F3F3F3;*/
  /*padding: 2rem;*/
}

.contentTitle {
  font-size: 2rem;
  font-weight: bold;
  margin: 2rem 0;
  text-align: center;
}

.size_s {
  font-size: 0.9rem;
}

#signCla {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  .requiredIcon {
    color: #f56c6c;
  }

  & .el-dialog {
    border-radius: 1rem;
  }

  .mobileBt {
    font-family: Roboto-Light, sans-serif;
    width: 100%;
    height: 3rem;
    border-radius: 1.5rem;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    background: linear-gradient(to right, #97db30, #319e55);
    margin: 1rem 0;
  }

  .mobileBt:focus {
    outline: none;
  }

  #singCla_section {
    flex-grow: 1;
    font-family: Roboto-Light, sans-serif;
    padding: 0 1rem;

    & .button {
      font-family: Roboto-Light, sans-serif;
      width: 15rem;
      height: 3rem;
      border-radius: 1.5rem;
      border: none;
      color: white;
      font-size: 1.2rem;
      cursor: pointer;
      background: linear-gradient(to right, #97db30, #319e55);
      margin: 1rem 0;
    }

    & .button:focus {
      outline: none;
    }

    & > .content {
      padding: 1rem 0;
      text-align: left;
    }
  }
}
.title {
  border-bottom: 1px solid #000;
  min-width: 50px;
  display: inline-block;
  width: fit-content;
  color: #002fa7;
  text-align: center;
  margin: 0 5px;
}
</style>
