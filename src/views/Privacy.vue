<template>
  <el-row id="privacyBox">
    <el-col>
      <div class="margin-top-3rem" id="contentBox">
        <div v-dompurify-html="statementHtml"></div>
      </div>
    </el-col>
    <ReTryDialog
      :dialogVisible="reTryVisible"
      :message="reLoginMsg"
    ></ReTryDialog>
  </el-row>
</template>

<script setup lang="ts">
import _axios from '../util/_axios';
import * as util from '../util/util';
import ReTryDialog from '../components/ReTryDialog.vue';
import claConfig from '../lang/global.js';

import { ref, computed, inject, onMounted, watch, defineEmits } from 'vue';
import { useCommonStore } from '../stores/common.js';
import { useI18n } from 'vue-i18n';
import Markdown from 'markdown-it';
import { Base64 } from 'js-base64';

const mkit = new Markdown({ html: true });

const privacyData = ref(claConfig.PRIVACY_POLICY_DATA);
const value = ref(0);
const langOptions = ref([]);
const privacyText = ref('');
const lang = ref('English');

let statementHtml = ref();

const { t, locale } = useI18n();
const $t = t;
const commonStore = useCommonStore();

const setClientHeight = inject('setClientHeight');

const privacyTextObj = computed(() => {
  return commonStore.privacyTextObj;
});
const reTryVisible = computed(() => {
  return commonStore.reTryDialogVisible;
});
const reLoginMsg = computed(() => {
  return commonStore.dialogMessage;
});

watch(
  () => {
    locale.value;
  },
  () => {
    getLanguage();
    getPrivacy(privacyData.value[value.value]);
  }
);

const getPrivacy = (obj) => {
  if (checkPrivacyConf()) {
    return;
  }
  if (commonStore.lang !== undefined) {
    lang.value = commonStore.lang;
  }
  let notExistPrivacy = true;
  for (let key in privacyTextObj.value) {
    if (key === lang.value) {
      privacyText.value = privacyTextObj.value[key];
    
      notExistPrivacy = true;
      break;
    }
  }
  if (notExistPrivacy) {
    let platform = obj.platform.toLowerCase();
    let _url = '';
    if (platform === 'gitee') {
      _url = `https://gitee.com/api/v5/repos/${obj.owner}/${obj.repo}/contents/${obj.path}`;
    } else if (platform === 'github') {
      _url = `https://api.github.com/repos/${obj.owner}/${obj.repo}/contents/${obj.path}`;
    } else {
      commonStore.errorCodeSet({
        dialogVisible: true,
        dialogMessage: $t('tips.not_support_platform'),
      });
      return;
    }
    _axios({
      url: _url,
    })
      .then((res) => {
        if (res.data.length === 0) {
          commonStore.errorCodeSet({
            dialogVisible: true,
            dialogMessage: $t('tips.privacy_conf_err'),
          });
          return;
        }
        let privacyObj = privacyTextObj.value;
        privacyText.value = Base64.decode(res.data.content);
        
        statementHtml.value = mkit.render(privacyText.value);
        
        Object.assign(privacyObj, { [lang.value]: privacyText.value });
        commonStore.setPrivacyData(privacyObj);
      })
      .catch((err) => {
        if (err.status === 403 || err.status === 404) {
          commonStore.errorCodeSet({
            dialogVisible: true,
            dialogMessage: $t('tips.privacy_conf_err'),
          });
          return;
        }
        util.catchErr(err, '', this);
      });
  }
};
const checkPrivacyConf = () => {
  let hasSameLang = false;
  for (let i = 0, len = privacyData.value.length; i < len; i++) {
    for (let j = i + 1, len = privacyData.value.length; j < len; j++) {
      if (privacyData.value[i].language === privacyData.value[j].language) {
        hasSameLang = true;
        commonStore.errorCodeSet({
          dialogVisible: true,
          dialogMessage: $t('tips.has_same_lang_privacy'),
        });
        break;
      }
    }
    if (hasSameLang) break;
  }
  return hasSameLang;
};
const emit = defineEmits(['getLangOptions', 'initHeader']);
const getLangOption = () => {
  if (checkPrivacyConf()) {
    return;
  }
  let langOptions = [];
  let langLabel = '';
  privacyData.value.forEach((item, index) => {
    langLabel = util.upperFirstCase(item.language);
    langOptions.push({ value: index, label: langLabel });
  });
  lang.valueOptions = langOptions;
 

  emit('getLangOptions', lang.valueOptions);
 
  commonStore.setLang(lang.valueOptions[value.value].label);
  emit('initHeader', lang.valueOptions[value.value].label);
};

const getLanguage = () => {
  if (commonStore.lang !== undefined) {
    lang.value = commonStore.lang;
  }
  let langLabel = '';
  privacyData.value.forEach((item, index) => {
    langLabel = util.upperFirstCase(item.language);
    if (langLabel === lang.value) {
      value.value = index;
      return false;
    }
  });
};
const init = () => {
  getLanguage();
  getLangOption();
  getPrivacy(privacyData.value[value.value]);
};

init();

watch(() => commonStore.lang, () => {
  init()
})

onMounted(() => {
  setClientHeight();
});
</script>

<style scoped lang="scss">
@media screen and (min-width: 1200px) {
  #privacyBox {
    width: 1200px;
    margin: auto;
  }
}

#privacyBox {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

#contentBox {
  text-align: left;
  padding: 2rem;
  margin-bottom: 2rem;
  white-space: pre-wrap;
  word-wrap: break-word;
  box-shadow: 0 0 20px 10px #f3f3f3;
  border-radius: 1.25rem;
}
</style>
