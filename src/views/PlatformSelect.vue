<template>
  <el-row id="platformSelect" style="height: 100%">
    <el-col align="right" class="formBox">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="icon_back">
            <div class="icon_box">
              <div class="loginSvg">
                <svg-icon icon-class="gitee_new" class="loginIcon"></svg-icon>
              </div>
            </div>
            <div class="icon_box">
              <div class="loginBt">
                <HttpButton
                  :text="$t(`corp.${giteeLoginText}`)"
                  :buttonDisable="giteeLoginButtonDisable"
                  @httpSubmit="getLoginUrl('gitee')"
                >
                </HttpButton>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="icon_back">
            <div class="icon_box">
              <div class="loginSvg">
                <svg-icon icon-class="github_new" class="loginIcon"></svg-icon>
              </div>
            </div>
            <div class="icon_box">
              <div class="loginBt">
                <HttpButton
                  :text="$t(`corp.${githubLoginText}`)"
                  :buttonDisable="githubLoginButtonDisable"
                  @httpSubmit="getLoginUrl('github')"
                >
                </HttpButton>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <ReTryDialog
        :message="corpReLoginMsg"
        :dialogVisible="corpReTryDialogVisible"
      ></ReTryDialog>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import * as url from '../util/api';
import http from '../util/http';
import * as util from '../util/util';
import ReTryDialog from '../components/ReTryDialog.vue';
import HttpButton from '../components/HttpButton.vue';
import { computed, ref, inject, onMounted } from 'vue';
import { useCommonStore } from '../stores/common';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
const $t = t;

const commonStore = useCommonStore();

const corpReLoginMsg = computed(() => {
  return commonStore.dialogMessage;
});

const corpReTryDialogVisible = computed(() => {
  return commonStore.reTryDialogVisible;
});

const giteeLoginText = ref('login_in');
const githubLoginText = ref('login_in');
const giteeLoginButtonDisable = ref(false);
const githubLoginButtonDisable = ref(false);
const platform = ref('');

const setClientHeight = inject('setClientHeight');

const getLoginUrl = (platform) => {
  if (platform) {
    commonStore.setPlatform(platform);
    if (platform === 'gitee') {
      giteeLoginButtonDisable.value = true;
      giteeLoginText.value = 'logining';
    } else if (platform === 'github') {
      githubLoginButtonDisable.value = true;
      githubLoginText.value = 'logining';
    }
    http({
      url: `${url.getAuthCodeUrl}/${platform}/login`,
    })
      .then((res) => {
        window.location.href = res.data.data.url;
      })
      .catch((err) => {
        if (platform === 'gitee') {
          giteeLoginButtonDisable.value = false;
          giteeLoginText.value = 'login_in';
        } else if (platform === 'github') {
          githubLoginButtonDisable.value = false;
          githubLoginText.value = 'login_in';
        }
        util.catchErr(err, 'errorSet', this);
      });
  }
};
onMounted(() => {
  setClientHeight();
});
</script>

<style lang="scss">
#platformSelect {
  .bt_desc {
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .icon_box {
    display: flex;
    justify-content: center;
    position: relative;
  }

  .loginSvg {
    position: absolute;
    top: 2rem;
  }

  .loginBt {
    position: absolute;
    bottom: -2rem;
  }

  .icon_back {
    background-color: white;
    border-radius: 1rem;
    height: 12rem;
    width: 12rem;
    box-shadow: 0 0 20px 10px #f3f3f3;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
  }

  .button {
    width: 9rem;
    height: 4rem;
    border-radius: 2rem;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    background: linear-gradient(to right, #97db30, #319e55);
  }

  .button:focus {
    outline: none;
  }

  .formBox {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    & .el-dialog {
      border-radius: 1rem;
      text-align: center;
    }
  }

  .loginIcon {
    cursor: pointer;
    width: 6rem;
    height: 6rem;
    margin: 0 1rem;
  }
}
</style>
