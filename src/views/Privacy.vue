<template>
  <el-row id="privacyBox">
    <el-col>
      <div class="margin-top-3rem" id="contentBox">
        <!-- <VueMarkdown :source="privacyText"> </VueMarkdown> -->11111111111111111111111111
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
// import VueMarkdown from 'vue-markdown';
import ReTryDialog from '../components/ReTryDialog.vue';
import claConfig from '../lang/global';

import { ref, computed, inject, onUpdated, onMounted, watch ,defineEmits} from 'vue';
import { useCommonStore } from '../stores/common';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const { t, locale } = useI18n();
const $t = t;
const commonStore = useCommonStore();
const router = useRouter();

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
    '$i18n.locale';
  },
  () => {
    getLanguage();
    getPrivacy(privacyData.value[value.value]);
  }
);

const privacyData = ref(claConfig.PRIVACY_POLICY_DATA);
const value = ref(0);
const langOptions = ref([]);
const privacyText = ref('');
const lang = ref('English');

const getPrivacy = (obj) => {
  if (checkPrivacyConf()) {
    return;
  }
  if (localStorage.getItem('lang') !== undefined) {
    lang.value = localStorage.getItem('lang');
  }
  let notExistPrivacy = true;
  for (let key in privacyTextObj.value) {
    if (key === lang.value) {
      privacyText.value = privacyTextObj.value[key];
      notExistPrivacy = false;
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
        let Base64 = require('js-base64').Base64;
        privacyText.value = Base64.decode(res.data.content);
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
  console.log(454)
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
  console.log(666)
    console.log(lang.valueOptions)

  emit('getLangOptions', lang.valueOptions);
  localStorage.setItem('lang', lang.valueOptions[value.value].label);
  emit('initHeader', lang.valueOptions[value.value].label);
};

const getLanguage = () => {
  if (localStorage.getItem('lang') !== undefined) {
    lang.value = localStorage.getItem('lang');
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
