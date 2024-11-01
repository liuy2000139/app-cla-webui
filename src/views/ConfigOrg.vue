<template>
  <el-row id="configOne">
    <div class="itemBox">
      <div class="stepTitle">① {{ $t('org.config_cla_select_org_tile') }}</div>
      <div class="margin-top-1rem">
        {{ $t('org.config_cla_select_org') }}
      </div>
      <el-row class="margin-top-1rem">
        <el-col>
          <el-select
            v-model="orgValue"
            :placeholder="$t('org.config_cla_select_org_placeholder')"
            style="width: 100%"
            clearable
            filterable
            @visible-change="orgVisibleChange"
            @change="changeOrg"
            :no-data-text="$t('corp.no_data')"
          >
            <el-option
              v-for="item in orgOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <div class="margin-top-1rem">
        {{ $t('org.config_cla_select_org_alias') }}
      </div>
      <div class="margin-top-1rem">
        <el-input
          v-model="org_alias"
          :placeholder="$t('org.config_cla_select_org_alias_placeholder')"
        ></el-input>
      </div>
    </div>
    <div class="orgStepBtBox">
      <button class="step_button" @click="toConfigClaLink">
        {{ $t('org.next_step') }}
      </button>
    </div>
    <ReTryDialog
      :message="reTryMsg"
      :dialogVisible="reTryVisible"
    ></ReTryDialog>
    <ReLoginDialog
      :message="reTryMsg"
      :dialogVisible="orgReLoginVisible"
    ></ReLoginDialog>
    <CustomDialog
      :message="reTryMsg"
      :dialogVisible="customVisible"
    ></CustomDialog>
  </el-row>
</template>

<script setup lang="ts">
import ReTryDialog from '../components/ReTryDialog.vue';
import ReLoginDialog from '../components/ReLoginDialog.vue';
import CustomDialog from '../components/CustomDialog.vue';
import * as url from '../util/api.js';
import _axios from '../util/_axios.js';
import platform_http from '../util/platform_http.js';
import claConfig from '../lang/global.js';
import { ref, computed, inject, onUpdated } from 'vue';
import { useCommonStore } from '../stores/common.js';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const { t, locale } = useI18n();
const $t = t;
const commonStore = useCommonStore();
const router = useRouter();

const org_id = ref('');
const org = ref(commonStore.chooseOrg);
const orgValue = ref(commonStore.chooseOrg);
const reTryMsg = computed(() => {
  return commonStore.dialogMessage;
});
const orgReLoginVisible = computed(() => {
  return commonStore.orgReLoginDialogVisible;
});
const reTryVisible = computed(() => {
  return commonStore.reTryDialogVisible;
});
const customVisible = computed(() => {
  return commonStore.customVisible;
});

const orgOptions = computed(() => {
  try {
    return JSON.parse(commonStore.orgOptions);
  } catch (e) {
    return commonStore.orgOptions;
  }
});

const orgChoose = computed(() => {
  return `${commonStore.orgChoose}` === 'true';
});
const repositoryChoose = computed(() => {
  return `${commonStore.repositoryChoose}` === 'true';
});
const repositoryOptions = computed(() => {
  try {
    return JSON.parse(commonStore.repositoryOptions);
  } catch (e) {
    return commonStore.repositoryOptions;
  }
});
const repositoryValue = computed(() => {
  if (
    commonStore.repositoryValue === undefined ||
    commonStore.repositoryValue === '' ||
    commonStore.repositoryValue === 'undefined'
  ) {
    return undefined;
  } else {
    return Number(commonStore.repositoryValue);
  }
});
const org_alias = computed({
  get() {
    return commonStore.orgAlias;
  },
  set(value) {
    commonStore.setOrgAlias(value);
  },
});
const repo = computed({
  get() {
    return commonStore.repo;
  },
  set(value) {
    commonStore.setRepo(value);
  },
});

const setClientHeight = inject('setClientHeight');
const checkRepo = (org, repo) => {
  let _url = '';
  let obj = {};
  let _http = '';
  if (commonStore.platform === 'Gitee') {
    _url = `https://gitee.com/api/v5/repos/${org}/${repo}`;
    obj = { access_token: commonStore.platform_token };
    _http = _axios;
  } else if (commonStore.platform === 'Github') {
    _url = `https://api.github.com/repos/${org}/${repo}`;
    _http = platform_http;
  }
  obj = { access_token: commonStore.platform_token };
  _http({
    url: _url,
    params: obj,
  })
    .then((res) => {
      router.replace('/config-email');
    })
    .catch((err) => {
      switch (err.status) {
        case 401:
          if (
            err.data.message === claConfig.GITEE_CHECK_REPO_401_ERROR_PRIVATE
          ) {
            commonStore.setCustomVisible({
              dialogVisible: true,
              dialogMessage: $t('tips.checkRepoMessage'),
            });
          } else if (
            err.data.message ===
            claConfig.GITEE_CHECK_REPO_401_ERROR_TOKEN_EXIST
          )
            commonStore.setOrgReLogin({
              dialogVisible: true,
              dialogMessage: $t('tips.missing_token'),
            });
          break;
        case 403:
          commonStore.setOrgReLogin({
            dialogVisible: true,
            dialogMessage: $t('tips.missing_token'),
          });
          break;
        case 404:
          commonStore.setCustomVisible({
            dialogVisible: true,
            dialogMessage: $t('tips.checkRepoMessage'),
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
const toConfigClaLink = () => {
  if (orgValue.value) {
    if (repo.value) {
      checkRepo(org.value, repo.value);
    } else {
      router.replace('/config-email');
    }
  } else {
    commonStore.errorCodeSet({
      dialogVisible: true,
      dialogMessage: $t('corp.fill_complete'),
    });
  }
  // router.replace("/config-email");
};
const orgVisibleChange = (visible) => {
  if (visible) {
    getOrgsInfo();
  }
};
const changeOrg = (value) => {
  commonStore.setOrgValue(value);
  commonStore.setRepositoryValue(undefined);
  commonStore.setRepositoryChoose(false);
  commonStore.setRepositoryOptions(undefined);
  if (value === '') {
    commonStore.setChooseOrg('');
    org.value = '';
    org_id.value = '';
    commonStore.setOrgChoose(false);
  } else {
    commonStore.setChooseOrg(commonStore.orgValue);
    org.value = orgOptions.value[value]?.label;
    org_id.value = orgOptions.value[value]?.id;
    commonStore.setOrgChoose(true);
  }
};
const getRepositoriesOfOrg = (org, org_id) => {
  let _url = '';
  if (commonStore.platform === 'Gitee') {
    _url = `https://gitee.com/api/v5/orgs/${org}/repos`;
  } else if (commonStore.platform === 'Github') {
    _url = `https://api.github.com/orgs/${org}/repos`;
  }
  let obj = {
    access_token: commonStore.platform_token,
    org: org,
    page: 1,
    per_page: 100,
  };
  _axios({
    url: _url,
    params: obj,
  })
    .then((res) => {
      let repositoryOptions = [];
      res.data.forEach((item, index) => {
        repositoryOptions.push({
          value: index,
          org: org,
          org_id: org_id,
          repoName: item.name,
          label: item.name,
          id: item.id,
        });
      });
      commonStore.setRepositoryOptions(repositoryOptions);
    })
    .catch((err) => {
      commonStore.errorCodeSet({
        dialogVisible: true,
        dialogMessage: $t('tips.system_error'),
      });
    });
};
const getOrgsInfo = () => {
  let _url = url.getOrganizationInfo;
  let _http = _axios;
  let obj = {};
  _http({
    url: _url,
  })
    .then((res) => {
      if (res.status === 200) {
        let orgOptions = [];
        res.data.data.forEach((item, index) => {
          orgOptions.push({ value: item, label: item, id: item });
        });

        commonStore.setOrgOption(orgOptions);
      }
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

const init = () => {
  commonStore.setOrgOption([]);
  commonStore.setOrgValue('');
  commonStore.setOrgChoose('');
  commonStore.setRepositoryOptions([]);
  commonStore.setRepositoryChoose('');
  commonStore.setRepositoryValue('');
  commonStore.setOrgAlias('');
  commonStore.setRepo('');
  commonStore.setChooseOrg('');
  commonStore.setChooseRepo('');
};

// onBeforeRouteEnter((to, from, next) => {
//   next((vm) => {
//     if (from.path === '/') {
//       vm.init();
//     }
//   });
// });
onUpdated(() => {
  setClientHeight();
});
</script>

<style lang="scss" scoped>
#configOne {
  .orgStepBtBox {
    text-align: right;
    margin-bottom: 2rem;
  }

  .stepTitle {
    font-size: 1.2rem;
    padding: 0.5rem;
  }

  .itemBox {
    border-radius: 1.25rem;
    box-shadow: 0 0 20px 10px #f3f3f3;
    padding: 2rem;
    margin-bottom: 2rem;

    .emailInput {
      cursor: pointer;
    }
  }
}
.el-row {
  display: block;
}

:deep(.el-input) {
  .el-input__wrapper {
    &:hover {
      border-color: #c0c4cc;
    }
  }
  .el-input__inner {
    height: 32px;
  }
}
</style>
