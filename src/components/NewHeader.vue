<script setup lang="ts">
import http from '../util/http';
import * as url from '../util/api';
import * as util from '../util/util';
import cla from '../lang/global';
import { computed, onMounted, ref, defineExpose, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useCommonStore } from '@/stores/common';

import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n();
const $t = t;
const commonStore = useCommonStore();
const route = useRoute();
const router = useRouter();
const role = ref('');
const loginRole = ref('');
const showHeaderMenu = ref(true);
const menuVisible = ref(false);
const isActive = ref(true);
const language = ref('English');
const value = ref(0);
const visible = ref({
  visibility: 'hidden',
});
const options = ref([
  { value: 0, label: 'English' },
  { value: 1, label: 'Chinese' },
]);
const communityInfo = computed(() => {
  if (
    commonStore.loginInfo &&
    commonStore.loginInfo.userInfo &&
    commonStore.loginInfo.userInfo.repo_id
  ) {
    return `${commonStore.loginInfo.userInfo.org_id}/${commonStore.loginInfo.userInfo.repo_id}`;
  }
  return (
    commonStore.loginInfo &&
    commonStore.loginInfo.userInfo &&
    commonStore.loginInfo.userInfo.org_id
  );
});

const updateLangOptions = (data) => {
  options.value = data;
};

onMounted(() => {
  getUserInfo()
})
const getUserInfo= () => {
  http({
    url: url.getCorpManagerInfo,
    method: 'get',
  }).then((res) => {
    let data = null;
    if (res.data) {
      data = res.data.data;
    }
    if (data) {
      let userInfo = { userInfo: data };
      Object.assign(userInfo, { userName: 'todo' });
      commonStore.setLoginInfo(userInfo);
      Object.assign(userInfo, { orgValue: 0 });
      commonStore.setPwdIsChanged(data.initial_pw_changed);
      commonStore.setLoginInfo(userInfo);
      if (!data.initial_pw_changed) {
        router.push('/resetPassword');
      }
    } else {
      commonStore.errorCodeSet({
        dialogVisible: true,
        dialogMessage: $t('tips.id_pwd_err'),
      });
    }
    init();
  });
}

const toIndex = () => {
  if (route.path === '/platformSelect') {
    router.push('/');
  } else if (
    route.path === '/corporationList' ||
    route.path === '/addCorpUrl' ||
    route.path === '/config-check' ||
    route.path === '/addIndividualUrl' ||
    route.path === '/config-org' ||
    route.path === '/config-email' ||
    route.path === '/config-cla-link' ||
    route.path === '/config-fields'
  ) {
    router.push('/linkedRepo');
  } else if (route.path === '/createManager') {
    router.push('/managerList');
  } else if (route.path === '/resetPassword') {
    if (commonStore.loginInfo.userInfo.role === 'manager') {
      router.push('/employeeList');
    } else {
      router.push('/managerList');
    }
  } else if (route.path === '/add-subemail') {
    router.push('/subemail');
  } else if (route.path === '/privacy') {
    router.push('/sign-cla');
  } else if (route.path === '/corporationManagerLogin') {
    if (commonStore.linkId) {
      router.replace(`${cla.SIGN_ROUTER}/${commonStore.linkId}`);
    } else {
      commonStore.errorCodeSet({
        dialogVisible: true,
        dialogMessage: $t('tips.page_error'),
      });
    }
  }
};
const openOrCloseMenu = () => {
  menuVisible.value = !menuVisible.value;
};
const handleCommand = (command) => {
  switch (command) {
    case 'a':
      toHome();
      break;
    case 'b':
      toManager();
      break;
    case 'c':
      toEmployee();
      break;
    case 'd':
      toAddSubEmail();
      break;
    case 'e':
      toCreateManager();
      break;
    case 'f':
      toResetPwd();
      break;
    case 'g':
      toCLA();
      break;
    case 'h':
      loginOut();
      break;
    default:
      toHome();
      break;
  }
};
const toHome = () => {
  if (route.path !== '/linkedRepo') {
    router.push('/home');
  }
};
const toManager = () => {
  if (route.path !== '/managerList') {
    router.push('/managerList');
  }
};
const toEmployee = () => {
  if (route.path !== '/employeeList') {
    router.push('/employeeList');
  }
};
const toAddSubEmail = () => {
  if (route.path !== '/subemail') {
    router.push('/subemail');
  }
};
const toCreateManager = () => {
  if (route.path !== '/createManager') {
    router.push('/createManager');
  }
};
const toResetPwd = () => {
  if (route.path !== '/resetPassword') {
    router.push('/resetPassword');
  }
};
const toCLA = () => {
  http({
    url: url.corporationPdf,
    responseType: 'blob',
  })
    .then((res) => {
      if (res && res.data) {
        let blob = new Blob([res.data], { type: 'application/pdf' });
        let url = window.URL.createObjectURL(blob);
        window.open(
          `../../static/pdf_source/web/viewer.html?file=${encodeURIComponent(
            url
          )}`
        );
      }
    })
    .catch((err) => {
      util.catchErr(err, 'errorSet', this);
    });
};
const loginOut = () => {
  const loginUrl = '/corporationManagerLogin/' + commonStore.loginInfo.userInfo.link_id
  util.clearManagerSession(this);
  if (loginRole.value === 'corp') {
    http({
      url: url.corporationManagerAuth,
      method: 'put',
    }).then(() => {
      router.push(loginUrl);
    });
  } else {
    http({
      url: url.logout,
      method: 'put',
    }).then(() => {
      router.push('/');
    });
  }
};
const chooseLng = (id) => {
  if (value.value !== id) {
    value.value = id;
    language.value = options.value[id].label;

    commonStore.setLang(language.value);
    changeI18N(language.value);
  }
  isActive.value = true;
};
const clickSelect = () => {
  isActive.value = !isActive.value;
};
const changeI18N = (language) => {
  switch (language) {
    case 'English':
      locale.value = 'en-us';
      break;
    case 'Chinese':
      locale.value = 'zh-cn';
      break;
    default:
      locale.value = 'en-us';
      break;
  }
};
const setLangValue = (language) => {
  for (let i = 0; i < options.value.length; i++) {
    if (options.value[i].label === language) {
      value.value = i;
    }
  }
};

const init = (value) => {
  if (value !== '' && value !== undefined) {
    language.value = value;
  } else {
    let lang = commonStore.lang;
    switch (lang) {
      case '0':
      case 'English':
        language.value = 'English';
        commonStore.setLang(language.value);
        break;
      case '1':
      case 'Chinese':
        language.value = 'Chinese';
        commonStore.setLang(language.value);
        break;
      default:
        language.value = 'Chinese';
        commonStore.setLang(language.value);
        break;
    }
  }
  changeI18N(language.value);
  setLangValue(language.value);
  if (commonStore.loginInfo.userInfo) {
    role.value = commonStore.loginInfo.userInfo.role;
  }
  showHeaderMenu.value = util.getMenuState(route);
  if (showHeaderMenu.value === 'corp' || showHeaderMenu.value === 'org') {
    loginRole.value = showHeaderMenu.value;
  }
};

defineExpose({ updateLangOptions, init });

const documentClick = (e) => {
    if (!['my_select', 'select_content', 'select_icon_box', 'select_icon'].includes(e.target.id)) {
      isActive.value = true;
    }
    if (e.target.id !== 'svgCover') {
      menuVisible.value = false;
    }
  }
onMounted(() => {
  document.addEventListener('click', documentClick);
});

onUnmounted(() => {
  document.removeEventListener('click', documentClick);
})

</script>

<template>
  <div class="parentBox">
    <el-row class="headerBox">
      <el-col class="header">
        <div class="box" @click="toIndex">
          <svg-icon icon-class="logo" class="icon"></svg-icon>
        </div>
        <div>
          <div v-if="showHeaderMenu === 'corp'">
            <div v-if="commonStore.loginInfo" class="grayColor">
              <span>{{ communityInfo }}</span>
              <span class="margin-left-1rem">{{
                commonStore.loginInfo.userName
              }}</span>
            </div>
          </div>
          <div>
            <div v-if="showHeaderMenu" class="menuBox">
              <div class="userImgBox" id="imgBox">
                <div
                  id="svgCover"
                  class="svgCover"
                  @click="openOrCloseMenu()"
                ></div>
                <svg-icon
                  id="defaultImg"
                  class="userImg"
                  icon-class="default-user"
                ></svg-icon>
              </div>
              <div v-if="menuVisible" id="menuOption">
                <div v-if="loginRole === 'org'" @click="handleCommand('a')">
                  {{ $t('header.home') }}
                </div>
                <div
                  v-if="loginRole === 'corp' && role === 'admin'"
                  @click="handleCommand('b')"
                >
                  {{ $t('header.manager') }}
                </div>
                <div
                  v-if="loginRole === 'corp' && role === 'manager'"
                  @click="handleCommand('c')"
                >
                  {{ $t('header.emp') }}
                </div>
                <div
                  v-if="loginRole === 'corp' && role === 'admin'"
                  @click="handleCommand('d')"
                >
                  {{ $t('header.SubEmail') }}
                </div>
                <div
                  v-if="loginRole === 'corp' && role === 'admin'"
                  @click="handleCommand('e')"
                >
                  {{ $t('header.createManager') }}
                </div>
                <div v-if="loginRole === 'corp'" @click="handleCommand('f')">
                  {{ $t('header.resetPwd') }}
                </div>
                <div
                  v-if="loginRole === 'corp' && role === 'admin'"
                  @click="handleCommand('g')"
                >
                  {{ $t('header.corpCla') }}
                </div>
                <div @click="handleCommand('h')">
                  {{ $t('header.loginOut') }}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="my_select_box">
              <el-row
                id="my_select"
                class="my_select"
                @click.native="clickSelect()"
              >
                <el-col id="select_content" :span="20" class="select_content">
                  {{ language }}
                </el-col>
                <el-col id="select_icon_box" :span="4" class="select_content">
                  <svg-icon id="select_icon" icon-class="arrow"></svg-icon>
                </el-col>
              </el-row>
              <div id="my_option" :class="{ visible: isActive }">
                <div
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                  <div style="width: 100%" @click="chooseLng(item.value)">
                    <div>
                      <div
                        :class="{
                          isShow: value !== item.value,
                          mark: item.label,
                        }"
                      ></div>
                    </div>
                    <div>
                      {{ item.label }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
@media screen and (max-width: 1200px) {
  .headerBox {
    width: 100%;
  }
}

@media screen and (min-width: 1200px) {
  .headerBox {
    width: 1200px;
    margin: auto;
  }
}

.parentBox {
  box-sizing: border-box;
  width: 100%;
  border-bottom: 2px solid #f2f2f2;

  .headerBox {
    padding: 0 1rem;
    height: 5.5rem;

    .margin-left-1rem {
      margin-left: 1rem;
    }

    .box {
      cursor: pointer;
    }

    .visible {
      visibility: hidden;
    }

    .pointer {
      cursor: pointer;
    }

    .menuBox {
      position: relative;
      height: 2.6rem;
      width: 8rem;
    }

    .userImgBox {
      cursor: pointer;
      height: 2.6rem;
      width: 2.6rem;
      overflow: hidden;
      border-radius: 1.3rem;
      position: absolute;
      right: 0;
      top: 0;
      z-index: 5;

      .svgCover {
        background-color: transparent;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 3;
        height: 2.6rem;
        width: 2.6rem;
        border-radius: 1.3rem;
      }

      & .userImg {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        height: 2.6rem;
        width: 2.6rem;
      }
    }

    #menuOption {
      border: 1px solid black;
      border-radius: 1.3rem;
      position: absolute;
      right: 0;
      top: 0;
      z-index: 4;
      background-color: white;
      white-space: pre;
      width: 10rem;

      & > div {
        height: 2.6rem;
        line-height: 2.6rem;
        margin: 0 1rem;
        cursor: pointer;
        user-select: none;
      }

      & > div:not(:last-of-type) {
        border-bottom: 1px solid black;
      }
    }

    .mark {
      height: 6px;
      width: 6px;
      border-radius: 50%;
      background-color: #2e9c55;
    }

    .isShow {
      visibility: hidden;
    }

    & .my_box {
      height: 2.6rem;
      position: relative;
    }

    & .my_box > div {
      position: absolute;
      top: 0;
      left: 0;
      border: 1px solid black;
      border-radius: 1.3rem;
      width: 8rem;
    }

    & .my_select_box {
      height: 2.6rem;
      width: 8rem;
      position: relative;
    }

    & .my_select {
      position: absolute;
      top: 0;
      left: 0;
      box-sizing: border-box;
      width: 8rem;
      height: 2.6rem;
      border: 1px solid black;
      border-radius: 1.3rem;
      padding: 0 1rem;
      z-index: 2;
      cursor: pointer;
    }

    & .select_content {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      -webkit-touch-callout: none;
      user-select: none;
    }

    & #my_option {
      z-index: 1;
      position: absolute;
      background-color: white;
      top: 0;
      left: 0;
      padding-top: 2.6rem;
      box-sizing: border-box;
      width: 8rem;
      border: 1px solid black;
      border-radius: 1.3rem;
      cursor: pointer;
    }

    & #my_option > div {
      cursor: pointer;
      background-color: white;
      border-radius: 1.3rem;
      height: 2.6rem;
      padding: 0 1rem;
      display: flex;
      justify-content: center;
    }

    & #my_option > div > div {
      cursor: pointer;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    & #my_option > div > div > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      cursor: pointer;
    }

    & #my_option > div > div > div:last-child {
      flex-grow: 1;
    }

    & #my_option > div:not(:last-child) > div {
      border-bottom: 1px solid black;
    }

    & .ul_box > div {
      box-sizing: border-box;
      width: 8rem;
      height: 2.6rem;
      border: 1px solid black;
      border-radius: 1.3rem;
    }

    & .icon {
      width: 3.5rem;
      height: 3.5rem;
    }

    & .header {
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    & .header > div:nth-of-type(1) {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    & .header > div:nth-of-type(2) {
      display: flex;
      justify-content: space-between;

      & > div {
        margin-left: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
  }
}
</style>
