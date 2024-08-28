<template>
  <div id="ConfigEmailSelect">
    <el-dialog
      top="5vh"
      title=""
      v-model="props.emailDialogVisible"
      @closed="clear"
      @open="open"
      width="35%"
    >
      <div>
        <p :class="{ word_break: lang === '1' }" class="dialogDesc">
          {{ $t('org.config_cla_email_platform_select') }}
        </p>
        <div>
          <el-row>
            <el-col :offset="2" :span="20">
              <el-form
                label-position="left"
                :label-width="labelWidth"
                :model="emailForm"
              >
                <el-form-item>
                  <template #label>
                    <div class="mailboxType">
                      {{ $t('org.config_cla_mailbox_type') }}
                    </div>
                  </template>
                  <el-select
                    class="my-select"
                    :placeholder="
                      $t('org.config_cla_email_platform_select_placeholder')
                    "
                    filterable
                    v-model="emailType"
                  >
                    <el-option
                      v-for="item in emailTypeArr"
                      :key="item.value"
                      :value="item.value"
                      :label="item.label"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </div>
        <el-row v-if="emailType === TENCENT_EMAIL" class="tencent-form">
          <el-col :offset="2" :span="20">
            <el-form
              label-position="left"
              :label-width="labelWidth"
              :model="emailForm"
              :rules="rules"
              ref="emailFormRef"
            >
              <el-form-item prop="email">
                <template #label>
                  <div class="mailboxType">
                    {{ $t('org.config_cla_email_address') }}
                  </div>
                </template>
                <el-input v-model="emailForm.email"></el-input>
              </el-form-item>
              <el-form-item prop="authorizeCode">
                <template #label>
                  <div class="mailboxType">
                    {{ $t('org.config_cla_authorize_code') }}
                    <svg-icon
                      icon-class="tips"
                      class="tips-icon"
                      @click="goToHelp"
                    ></svg-icon>
                  </div>
                </template>
                <el-input v-model="emailForm.authorizeCode">
                  <template #append>
                    <el-button @click="sendVerifyCode">
                      {{ $t('org.config_cla_validation_title') }}
                    </el-button>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item prop="verifyCode">
                <template #label>
                  <div class="mailboxType">
                    {{ $t('signPage.verifyCode') }}
                  </div>
                </template>
                <el-input v-model="emailForm.verifyCode"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row class="authorize_desc">
          <el-col :offset="2" :span="20">
            <p class="align_center">
              {{ $t('org.config_cla_email_authorize_desc') }}
            </p>
            <ul
              class="align_left break_word"
              :class="{ word_break: lang === '1' }"
            >
              <li>{{ $t('org.config_cla_email_authorize_desc1') }}</li>
              <li>{{ $t('org.config_cla_email_authorize_desc2') }}</li>
              <li>{{ $t('org.config_cla_email_authorize_desc3') }}</li>
            </ul>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <button class="email_button" @click="authorizeEmail()">
            {{ $t('org.confirm_remove') }}
          </button>
          <button class="email_cancel" @click="closeDialog()">
            {{ $t('org.cancel_remove') }}
          </button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits, computed } from 'vue';
import * as url from '../util/api';
import http from '../util/http';
import * as util from '../util/util';
import claConfig from '../lang/global';
import { useCommonStore } from '@/stores/common';
import { useI18n } from 'vue-i18n';

const emailFormRef = ref();
const { t, locale } = useI18n();
const $t = t;

const rules = {
  email: [
    {
      required: true,
      message: $t('org.config_not_fill_address'),
      trigger: 'blur',
    },
    {
      pattern: claConfig.EMAIL_REG,
      message: $t('tips.not_fill_email'),
      trigger: 'blur',
    },
  ],
  authorizeCode: [
    {
      required: true,
      message: $t('tips.fill_authorize_code'),
      trigger: 'blur',
    },
  ],
  verifyCode: [
    {
      required: true,
      message: $t('org.config_fill_verification_code'),
      trigger: 'blur',
    },
  ],
};
const TENCENT_EMAIL = 'txmail';
const commonStore = useCommonStore();
const loading = ref(false);
const lang = ref('');
const emailType = ref('');
const emailForm = ref({
  type: TENCENT_EMAIL,
  email: '',
  authorizeCode: '',
  verifyCode: '',
});
const asciiArray = ref([]);

const emit = defineEmits(['callback', 'closeEmailDialog']);
const props = defineProps({
  emailDialogVisible: {
    type: Boolean,
    required: true,
  },
  modifyEmailLinkId: {
    type: String,
    required: false,
  },
});

const labelWidth = computed(() => {
  return lang.value === 'Chinese' ? '100px' : '188px';
});
const emailTypeArr = computed(() => {
  return props.modifyEmailLinkId
    ? [
        {
          value: TENCENT_EMAIL,
          label: $t('org.config_cla_tencent_email'),
        },
      ]
    : [
        // { value: 'G-Mail', label: 'G-Mail' },
        {
          value: TENCENT_EMAIL,
          label: $t('org.config_cla_tencent_email'),
        },
      ];
});
// 修改时暂不支持gmail

function open() {
  lang.value = commonStore.lang;
}
function clear() {
  emailType.value = '';
  emailForm.value = {
    type: TENCENT_EMAIL,
    email: '',
    authorizeCode: '',
    verifyCode: '',
  };
  emit('closeEmailDialog', false);
}
function closeDialog() {
  emit('closeEmailDialog', false);
}
function goToHelp() {
  window.open(
    'https://service.mail.qq.com/cgi-bin/help?subtype=1&id=28&no=1001256'
  );
}
function sendVerifyCode() {
  
  const validArr = ['email', 'authorizeCode'];
  let count = 0;
  validArr.forEach((item) => {
    emailFormRef.value.validateField(item, (valid) => {
      
      if (valid) {
        count++;
      }
      // 校验都通过则发送验证码
      if (count === validArr.length) {
        let formData = new FormData();
        const obj = {
          email: emailForm.value.email,
          authorize: util.getAsciiArray(
            asciiArray.value,
            emailForm.value.authorizeCode
          ),
        };
        formData.append('data', JSON.stringify(obj));
        http({
          url: `${url.postEmailCode}`,
          method: 'post',
          data: formData,
        })
          .then((res) => {
            asciiArray.value = [];
            util.successMessage(this);
          })
          .catch((err) => {
            util.catchErr(err, 'setOrgReLogin', this);
          });
      }
    });
  });
}
function authorizeEmail() {
  if (emailType.value === 'G-Mail') {
    loading.value = util.getLoading(this, 'tips.loading');
    http({
      url: url.getAuthEmail,
    })
      .then((res) => {
        window.location.href = res.data.data.url;
      })
      .catch((err) => {
        loading.value.close();
        util.catchErr(err, 'setOrgReLogin', this);
      });
  } else if (emailType.value === TENCENT_EMAIL) {
    emailFormRef.value.validate((valid) => {
      if (!valid) {
        loading.value.close();
      } else {
        loading.value = util.getLoading(this, 'tips.loading');
        let formData = new FormData();
        const obj = {
          email: emailForm.value.email,
          authorize: util.getAsciiArray(
            asciiArray.value,
            emailForm.value.authorizeCode
          ),
          code: emailForm.value.verifyCode,
        };
        formData.append('data', JSON.stringify(obj));
        http({
          url: `${url.authorizeEmail}`,
          method: 'post',
          data: formData,
        })
          .then((res) => {
            asciiArray.value = [];
            if (props.modifyEmailLinkId) {
              let formData1 = new FormData();
              formData1.append('email', emailForm.value.email);
              http({
                url: `${url.modifyAuthorizeEmail}/${props.modifyEmailLinkId}`,
                method: 'post',
                data: formData1,
              })
                .then((res) => {
                  loading.value.close();
                  closeDialog();
                  emit('callback');
                })
                .catch((err) => {
                  loading.value.close();
                  util.catchErr(err, 'setOrgReLogin', this);
                });
            } else {
              // window.location.reload();
              commonStore.email = emailForm.value.email;
              loading.value.close();
              closeDialog();
              emit('callback');
            }
          })
          .catch((err) => {
            loading.value.close();
            util.catchErr(err, 'setOrgReLogin', this);
          });
      }
    });
  }
}
</script>

<style lang="scss" scoped>
#ConfigEmailSelect {
  .my-select {
    width: 100%;
  }

  .dialog-footer {
    text-align: center;
  }

  .word_break {
    word-break: break-all;
  }

  .break_word {
    word-break: break-word;
  }

  .align_center {
    text-align: center;
  }

  .dialogDesc {
    font-size: 1.2rem;
    margin: 2rem 0;
    text-align: center;
  }

  .mailboxType {
    font-size: 1rem;
    font-weight: 600;
    height: 40px;
    line-height: 40px;
    color: #000;
  }

  .tencent-form {
    .tips-icon {
      cursor: pointer;
      width: 1.2rem;
      height: 1.2rem;
      vertical-align: text-bottom;
    }
    .el-input__inner {
      background-color: #fff;
      border: 1px solid #333;
      color: #606266;
    }
    .el-input-group__append {
      border-color: #333;
      border-top-right-radius: 1.25rem;
      border-bottom-right-radius: 1.25rem;
    }
    .el-form-item__label::before {
      content: '';
      display: none;
    }
  }

  .authorize_desc {
    padding: 2rem 0;
    font-size: 1.3rem;
  }

  .email_button {
    font-family: Roboto-Regular, sans-serif;
    width: 6rem;
    height: 3rem;
    border-radius: 1.5rem;
    border: none;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    background: linear-gradient(to right, #97db30, #319e55);
    margin: 1.2rem 0;
  }

  .email_button:focus {
    outline: none;
  }

  .email_cancel {
    width: 6rem;
    height: 3rem;
    border-radius: 1.5rem;
    border: 1px solid black;
    color: black;
    font-size: 1rem;
    cursor: pointer;
    background-color: white;
    margin-left: 3rem;
  }

  .email_cancel:focus {
    outline: none;
  }
}
</style>
