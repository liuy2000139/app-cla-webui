import { nextTick, ref } from 'vue';
import claConfig from '../lang/global';

import { useCommonStore } from '../stores/common';
import i18n from '../i18n';
import { ElLoading, ElMessage } from 'element-plus';

const $t = i18n.global.t;

const commonStore = useCommonStore();

export const getClientHeight = () => window.innerHeight;
export const setMinHeight = (box, inner) => {
  document.getElementById(box).style.minHeight =
    document.getElementById(inner).clientHeight * 2 + 'px';
};
export const strToBase64 = (params) => {
  try {
    return window.btoa(encodeURIComponent(params));
  } catch (e) {
    return false;
  }
};
export const base64ToStr = (params) => {
  try {
    return window.decodeURIComponent(window.atob(params));
  } catch (e) {
    return false;
  }
};
export const getNowDateToTime = () => {
  let date = new Date();
  return date.getTime();
};
export const clearSession = () => {
  commonStore.setOrgOption([]);
  commonStore.setOrgValue('');
  commonStore.setOrgChoose('');
  commonStore.setRepositoryOptions([]);
  commonStore.setRepositoryChoose('');
  commonStore.setRepositoryValue('');
  commonStore.setOrgAlias('');
  commonStore.setIndividualLanguage('');
  commonStore.setCorpLanguage('');
  commonStore.setClaLinkIndividual('');
  commonStore.setClaLinkCorp('');
  // commonStore.setCorpFDName('');
  // commonStore.setCorpFD('');
  commonStore.setIndividualMetadata(claConfig.INDIVIDUALMETADATAARR_EN);
  commonStore.setCorpMetadata(claConfig.CORPORATIONMETADATAARR_EN);
  commonStore.setIndividualCustomMetadataArr([]);
  commonStore.setCorporationCustomMetadataArr([]);
  commonStore.setEmail('');
  commonStore.setIsEmail(false);
  commonStore.setChooseRepo('');
  commonStore.setChooseOrg('');
  commonStore.setBindType('');
  commonStore.setAddLang('');
  commonStore.setRepo('');
  commonStore.setAddBindFirst('');
};
export const setI18nLang = () => {
  let lang = commonStore.lang;
  if (lang === null) {
    commonStore.setLang('English');
    return 'en-us';
  } else {
    if (lang === 'Chinese') {
      return 'zh-cn';
    } else if (lang === 'English') {
      return 'en-us';
    }
  }
};
export const clearManagerSession = () => {
  commonStore.setManagerList('');
  commonStore.setUserLimit('');
  commonStore.setCorpToken('');
  commonStore.setLoginInfo('');
  commonStore.setPwdIsChanged('');

  sessionStorage.removeItem('token');
};
export const successMessage = () => {
  ElMessage.closeAll();
  ElMessage.success($t('tips.successTitle'));
};
export const getMenuState = (route) => {
  let pageType = route.meta.pageType;
  if (pageType === 'notLogin') {
    return false;
  } else {
    return pageType;
  }
};
export const catchErr = (err, commit, route) => {
  if (err.response?.status === 401) {
    commonStore[commit]({
      dialogVisible: true,
      dialogMessage: $t('tips.unknown_token'),
    });
    return false
  }
  if (
    err.response?.data &&
    Object.prototype.hasOwnProperty.call(err.response?.data, 'data')
  ) {
    let message = '';
    switch (err.response.data?.data.error_code) {
      case 'cla.invalid_token':
        commonStore[commit]({
          dialogVisible: true,
          dialogMessage: $t('tips.invalid_token'),
        });
        break;
      case 'cla.expired_token':
        commonStore[commit]({
          dialogVisible: true,
          dialogMessage: $t('tips.invalid_token'),
        });

        break;
      case 'cla.missing_token':
        commonStore[commit]({
          dialogVisible: true,
          dialogMessage: $t('tips.missing_token'),
        });

        break;
      case 'cla.unknown_token':
        commonStore[commit]({
          dialogVisible: true,
          dialogMessage: $t('tips.unknown_token'),
        });
        break;
      case 'cla.unauthorized_token':
        commonStore[commit]({
          dialogVisible: true,
          dialogMessage: $t('tips.unauthorized_token'),
        });
        break;
      case 'cla.no_link_or_no_manager':
        commonStore.errorCodeSet({
          dialogVisible: true,
          dialogMessage: $t('tips.unknown_email'),
        });
        break;
      case 'cla.no_cla_binding':
        if (commonStore.loginType === 'corporation') {
          message = $t('tips.no_cla_binding_corp');
        } else if (commonStore.loginType === 'employee') {
          message = $t('tips.no_cla_binding_emp');
        } else if (commonStore.loginType === 'individual') {
          message = $t('tips.no_cla_binding_individual');
        }
        commonStore[commit]({
          dialogVisible: true,
          dialogMessage: message,
        });
        break;
      case 'cla.no_corp_manager':
        commonStore[commit]({
          dialogVisible: true,
          dialogMessage: $t('tips.no_corp_manager'),
        });
        break;
      case 'cla.has_not_signed':
        commonStore[commit]({
          dialogVisible: true,
          dialogMessage: $t('tips.has_not_signed'),
        });
        break;
      case 'cla.uncompleted_signing':
        commonStore[commit]({
          dialogVisible: true,
          dialogMessage: $t('tips.uncompleted_signing'),
        });
        break;
      case 'cla.not_ready_to_sign':
        commonStore[commit]({
          dialogVisible: true,
          dialogMessage: $t('tips.not_ready_to_sign'),
        });
        break;
      case 'cla.resigned':
        if (commonStore.loginType === 'corporation') {
          message = $t('tips.corp_has_signed');
        } else {
          message = $t('tips.has_signed');
        }
        commonStore[commit]({
          dialogVisible: true,
          dialogMessage: message,
        });
        break;
      case 'cla.go_to_sign_employee_cla':
        commonStore[commit]({
          dialogVisible: true,
          dialogMessage: $t('tips.go_to_sign_employee_cla'),
        });
        break;
      case 'cla.no_employee_manager':
        commonStore[commit]({
          dialogVisible: true,
          dialogMessage: $t('tips.no_corp_manager'),
        });
        break;
      case 'cla.no_link': {
        let _commit = '';
        if (route.path === 'sign-cla') {
          _commit = commit;
        } else {
          _commit = 'errorCodeSet';
        }
        commonStore[_commit]({
          dialogVisible: true,
          dialogMessage: $t('tips.no_link'),
        });
        break;
      }
      case 'cla.unmatched_cla':
        commonStore.errorCodeSet({
          dialogVisible: true,
          dialogMessage: $t('tips.unmatched_cla'),
        });
        break;
      case 'cla.failed_to_send_email':
        commonStore.errorCodeSet({
          dialogVisible: true,
          dialogMessage: $t('tips.failed_to_send_email'),
        });
        break;
      case 'cla.unknown_email_platform':
        commonStore.errorCodeSet({
          dialogVisible: true,
          dialogMessage: $t('tips.unknown_email'),
        });
        break;
      case 'cla.link_exists':
        commonStore.errorCodeSet({
          dialogVisible: true,
          dialogMessage: $t('tips.link_exists'),
        });
        break;
      case 'cla.cla_is_used':
        commonStore.errorCodeSet({
          dialogVisible: true,
          dialogMessage: $t('tips.cla_is_used'),
        });
        break;
      case 'cla.no_pdf_of_corp':
        commonStore.errorCodeSet({
          dialogVisible: true,
          dialogMessage: $t('tips.no_pdf_of_corp'),
        });
        break;
      case 'cla.unuploaded':
        commonStore.errorCodeSet({
          dialogVisible: true,
          dialogMessage: $t('tips.no_pdf_of_corp'),
        });
        break;
      case 'cla.not_an_email':
        commonStore.errorCodeSet({
          dialogVisible: true,
          dialogMessage: $t('tips.invalid_email'),
        });
        break;
      case 'cla.many_employee_managers':
        commonStore.errorCodeSet({
          dialogVisible: true,
          dialogMessage: $t('tips.many_employee_managers'),
        });
        break;
      case 'cla.num_of_corp_managers_exceeded':
        commonStore.errorCodeSet({
          dialogVisible: true,
          dialogMessage: $t('tips.num_of_corp_managers_exceeded'),
        });
        break;
      case 'cla.corp_manager_exists':
        commonStore.errorCodeSet({
          dialogVisible: true,
          dialogMessage: $t('tips.corp_manager_exists'),
        });
        break;
      case 'cla.admin_as_manager':
        commonStore.errorCodeSet({
          dialogVisible: true,
          dialogMessage: $t('corp.manager_email_same_with_admin'),
        });
        break;
      case 'cla.cla_exists':
        commonStore.errorCodeSet({
          dialogVisible: true,
          dialogMessage: $t('tips.cla_exists'),
        });
        break;
      case 'cla.wrong_verification_code':
        if (['/sign-cla', '/config-email'].includes(route.path)) {
          message = $t('tips.wrong_verification_code');
        } else {
          message = $t('tips.link_expired');
        }
        commonStore.errorCodeSet({
          dialogVisible: true,
          dialogMessage: message,
        });
        break;
      case 'cla.too_short_or_long_password':
        commonStore.errorCodeSet({
          dialogVisible: true,
          dialogMessage: $t('tips.newPwd_length_err', {
            minLength: claConfig.PWD_MIN_LENGTH,
            maxLength: claConfig.PWD_MAX_LENGTH,
          }),
        });
        break;
      case 'cla.invalid_password':
        commonStore.errorCodeSet({
          dialogVisible: true,
          dialogMessage: $t('corp.newPwd_contains_Illegal_character'),
        });
        break;
      case 'cla.invalid_account_or_pw':
        commonStore.errorCodeSet({
          dialogVisible: true,
          dialogMessage: $t('tips.invalid_account_or_pw'),
        });
        break;
      case 'cla.no_db_record':
        if (route.path === '/corporationManagerLogin') {
          message = $t('tips.id_pwd_err');
        } else if (route.name === 'resetPassword') {
          message = $t('tips.invalid_account_or_pw');
        }
        commonStore.errorCodeSet({
          dialogVisible: true,
          dialogMessage: message,
        });
        break;
      case 'cla.restricted_email_suffix':
        commonStore.errorCodeSet({
          dialogVisible: true,
          dialogMessage: $t('tips.restricted_email_suffix'),
        });
        break;
      case 'cla.expired_verification_code':
        if (route.path === '/sign-cla') {
          message = $t('tips.expired_verification_code');
        } else {
          message = $t('tips.link_expired');
        }
        commonStore.errorCodeSet({
          dialogVisible: true,
          dialogMessage: message,
        });
        break;
      case 'cla.retrieve_pw_encrypt_failure':
      case 'cla.retrieve_pw_decrypt_failure':
      case 'cla.retrieve_pw_validate_failure':
        commonStore.commit.errorCodeSet({
          dialogVisible: true,
          dialogMessage: $t('tips.illegal_link'),
        });
        break;
      case 'cla.no_link_or_unsigned':
        commonStore.errorCodeSet({
          dialogVisible: true,
          dialogMessage: $t('tips.no_link_or_unsigned'),
        });
        break;
      case 'cla.unmatch_email_domain':
        commonStore.errorCodeSet({
          dialogVisible: true,
          dialogMessage: $t('tips.subemailErr'),
        });
        break;
      case 'cla.not_same_corp':
        commonStore.errorCodeSet({
          dialogVisible: true,
          dialogMessage: $t('tips.not_same_corp'),
        });
        break;
      case 'cla.error_parsing_api_body':
        commonStore.errorCodeSet({
          dialogVisible: true,
          dialogMessage: $t('tips.error_parsing_api_body'),
        });
        break;
      case 'cla.invalid_manager_id':
      case 'cla.wrong_id_or_pw':
        commonStore.errorCodeSet({
          dialogVisible: true,
          dialogMessage: $t('tips.id_pwd_err'),
        });
        break;
      case 'wrong_id_or_pw':
        commonStore.errorCodeSet({
          dialogVisible: true,
          dialogMessage:
            $t('tips.id_pwd_err_new') +
            err.response.data.data.retry_num +
            $t('tips.id_pwd_err_corp'),
        });
        break;
      case 'cla.user_login_frozen':
        commonStore.errorCodeSet({
          dialogVisible: true,
          dialogMessage: $t('tips.user_login_frozen'),
        });
        break;
      case 'cla.system_error':
        commonStore.errorCodeSet({
          dialogVisible: true,
          dialogMessage: $t('tips.system_error'),
        });
        break;
      case 'cla.user_not_exists':
        commonStore.errorCodeSet({
          dialogVisible: true,
          dialogMessage: $t('tips.user_not_exists'),
        });
        break;
      default:
        commonStore.errorCodeSet({
          dialogVisible: true,
          dialogMessage:
            err.response.data?.data.error_message || $t('tips.unknown_error'),
        });
        break;
    }
  } else {
    commonStore.errorCodeSet({
      dialogVisible: true,
      dialogMessage: $t('tips.system_error'),
    });
  }
};
export const toPrivacy = (route, router) => {
  const linkId = route.params.linkId || commonStore.linkId || ''
  let type = ''
  if (linkId) {
    if (commonStore.loginInfo) {
      type = 'corp'
    } else {
      type = 'sign'
    }
  }
  if (['PlatformSelect'].includes(route.name)) {
    type = route.name
  }

  if (route.name !== 'Privacy') {
    router.push(`/privacy${type ? '/' + type : ''}${linkId ? '/' + linkId : ''}`);
  }
};
export const upperFirstCase = (word) => {
  let initials = word.substring(0, 1);
  let upper = initials.toUpperCase();
  let end = word.substring(1);
  return upper + end;
};
export const individualFiledExchangeToZh = (individualFieldData) => {
  individualFieldData.forEach((item) => {
    switch (item.type) {
      case 'date':
        item.title = '日期';
        item.description = '签署日期';
        break;
      case 'address':
        item.title = '地址';
        item.description = '个人家庭地址';
        break;
      case 'telephone':
        item.title = '电话';
        item.description = '个人电话';
        break;
      case 'fax':
        item.title = '传真';
        item.description = '个人传真';
        break;
    }
  });
};
export const individualFiledExchangeToEn = (individualFieldData) => {
  individualFieldData.forEach((item) => {
    switch (item.type) {
      case 'date':
        item.title = 'Date';
        item.description = 'Date of signing';
        break;
      case 'address':
        item.title = 'Address';
        item.description = 'Personal home address';
        break;
      case 'telephone':
        item.title = 'Telephone';
        item.description = 'Personal phone';
        break;
      case 'fax':
        item.title = 'Fax';
        item.description = 'Personal fax';
        break;
    }
  });
};
export const corpFiledExchangeToEn = (corpFieldData) => {
  corpFieldData.forEach((item) => {
    switch (item.type) {
      case 'date':
        item.title = 'Date';
        item.description = 'Date of signing';
        break;
      case 'address':
        item.title = 'Address';
        item.description = 'Address of the corporation';
        break;
      case 'telephone':
        item.title = 'Telephone';
        item.description = 'Telephone of the corporation';
        break;
      case 'fax':
        item.title = 'Fax';
        item.description = 'Fax of the corporation';
        break;
    }
  });
};
export const corpFiledExchangeToZh = (corpFieldData) => {
  corpFieldData.forEach((item) => {
    switch (item.type) {
      case 'date':
        item.title = '日期';
        item.description = '签署日期';
        break;
      case 'address':
        item.title = '地址';
        item.description = '公司的地址';
        break;
      case 'telephone':
        item.title = '电话';
        item.description = '公司的电话';
        break;
      case 'fax':
        item.title = '传真';
        item.description = '公司的传真';
        break;
    }
  });
};
export const changeCorpTitle = (e, item) => {
  switch (e) {
    case 'Date':
      item.type = 'date';
      item.description = 'Date of signing';
      break;
    case 'Address':
      item.type = 'address';
      item.description = 'Address of the corporation';
      break;
    case 'Telephone':
      item.type = 'telephone';
      item.description = 'Telephone of the corporation';
      break;
    case 'Fax':
      item.type = 'fax';
      item.description = 'Fax of the corporation';
      break;
    case '日期':
      item.type = 'date';
      item.description = '签署日期';
      break;
    case '地址':
      item.type = 'address';
      item.description = '公司的地址';
      break;
    case '电话':
      item.type = 'telephone';
      item.description = '公司的电话';
      break;
    case '传真':
      item.type = 'fax';
      item.description = '公司的传真';
      break;
  }
};
export const checkIllegalChar = (str) => {
  let numType = 0;
  let upperCaseTpe = 0;
  let lowerCaseType = 0;
  let charType = 0;
  for (let char of str) {
    if (char >= '0' && char <= '9') {
      numType = 1;
    } else if (char >= 'A' && char <= 'Z') {
      upperCaseTpe = 1;
    } else if (char >= 'a' && char <= 'z') {
      lowerCaseType = 1;
    } else {
      charType = 1;
    }
  }
  return numType + upperCaseTpe + lowerCaseType + charType < 3;
};
export const getAsciiArray = (str, val) => {
  str = [];
  for (let i = 0; i < val.length; i++) {
    str.push(val.charCodeAt(i));
  }
  return str;
};
export const verifyMsgChangeLang = (ruleForm) => {
  ruleForm.value &&
    ruleForm.value.fields.forEach((item) => {
      if (item.validateState === 'error') {
        ruleForm.value.validateField(item.labelFor);
      }
    });
};

export const getLoading = (_, langText = 'tips.loading') => {
  return ElLoading.service({
    lock: true,
    text: $t(langText),
    spinner: 'el-icon-loading',
    customClass: 'loading_class',
    background: 'rgba(0, 0, 0, 0.7)',
  });
};
