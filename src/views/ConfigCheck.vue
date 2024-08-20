<template>
  <div id="configCheck">
    <div class="itemBox">
      <div class="=info-title">
        ① {{ $t('org.config_cla_check_org_repo_title') }}
      </div>
      <div class="margin-top-1rem">
        <el-row :gutter="20">
          <el-col :span="8">
            {{ $t('org.config_cla_check_org_title') }}
          </el-col>
          <el-col :span="8">
            {{ $t('org.config_cla_check_org_alias_title') }}
          </el-col>
          <!-- <el-col :span="8">
                        {{$t('org.config_cla_check_repo_title')}}
                    </el-col> -->
        </el-row>
      </div>
      <div class="margin-top-half-rem">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input disabled="" size="medium" v-model="org"></el-input>
          </el-col>
          <el-col :span="8">
            <el-input disabled="" size="medium" v-model="orgAlias"></el-input>
          </el-col>
          <!-- <el-col :span="8">
                        <el-input disabled="" size="medium" v-model="repo"></el-input>
                    </el-col> -->
        </el-row>
      </div>
    </div>
    <div class="itemBox">
      <div class="=info-title">
        ②{{ $t('org.config_cla_check_email_title') }}
      </div>
      <div class="margin-top-1rem">
        <el-input disabled="" size="medium" class="emailInput" v-model="email">
        </el-input>
      </div>
    </div>
    <div class="itemBox">
      <div class="=info-title">
        ③ {{ $t('org.config_cla_check_url_title') }}
      </div>
      <div v-if="commonStore.claLinkIndividual">
        <div class="margin-top-1rem">
          <el-row :gutter="20">
            <el-col :span="18">
              {{ $t('org.config_cla_paste_individual_url') }}
            </el-col>
            <el-col :span="6">
              {{ $t('org.config_cla_individual_lang') }}
            </el-col>
          </el-row>
        </div>
        <div class="margin-top-half-rem">
          <el-row :gutter="20">
            <el-col :span="18">
              <el-input disabled="" size="medium" v-model="cla_link_individual">
              </el-input>
            </el-col>
            <el-col :span="6">
              <el-input
                disabled=""
                size="medium"
                v-model="individualClaLanguageValue"
              >
              </el-input>
            </el-col>
          </el-row>
        </div>
      </div>
      <div v-if="commonStore.claLinkCorp">
        <div class="margin-top-1rem">
          <el-row :gutter="20">
            <el-col :span="18">
              {{ $t('org.config_cla_paste_corp_url') }}
            </el-col>
            <el-col :span="6">
              {{ $t('org.config_cla_corp_lang') }}
            </el-col>
          </el-row>
        </div>
        <div class="margin-top-half-rem">
          <el-row :gutter="20">
            <el-col :span="18">
              <el-input
                disabled=""
                size="medium"
                v-model="cla_link_corporation"
              >
              </el-input>
            </el-col>
            <el-col :span="6">
              <el-input
                disabled=""
                size="medium"
                v-model="corpClaLanguageValue"
              >
              </el-input>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="itemBox">
      <div style="padding: 0.5rem">
        <p style="font-size: 1.2rem">
          ④ {{ $t('org.config_cla_check_fields_title') }}
        </p>
      </div>
      <div style="padding: 0 2rem">
        <div v-if="commonStore.claLinkIndividual">
          <el-row class="margin-top-1rem">
            {{ $t('org.config_cla_individual_metadata') }}
          </el-row>
          <div>
            <el-row
              class="margin-top-1rem"
              type="flex"
              align="middle"
              :gutter="20"
            >
              <el-col :span="5">
                {{ $t('org.config_cla_check_fields_title_title') }}
              </el-col>
              <el-col :span="5">
                {{ $t('org.config_cla_check_fields_type_title') }}
              </el-col>
              <el-col :span="5">
                {{ $t('org.config_cla_check_fields_describe_title') }}
              </el-col>
              <el-col :span="5" style="height: 100%">
                {{ $t('org.config_cla_check_fields_require_title') }}
              </el-col>
            </el-row>
            <el-row
              style="padding: 0.5rem 0"
              type="flex"
              align="middle"
              :gutter="20"
              v-for="(item, index) in individualMetadata"
            >
              <el-col :span="5">
                <el-input
                  disabled=""
                  v-model="item.title"
                  size="medium"
                  readonly=""
                >
                </el-input>
              </el-col>
              <el-col :span="5">
                <el-input
                  disabled=""
                  v-model="item.type"
                  size="medium"
                  readonly
                ></el-input>
              </el-col>
              <el-col :span="5">
                <el-input
                  disabled=""
                  v-model="item.description"
                  size="medium"
                  readonly
                ></el-input>
              </el-col>
              <el-col :span="5" style="height: 100%">
                <el-checkbox v-model="item.required" disabled="">
                  {{ $t('org.config_cla_fields_required') }}
                </el-checkbox>
              </el-col>
            </el-row>
          </div>
        </div>
        <div v-if="commonStore.claLinkCorp">
          <el-row class="margin-top-1rem">
            {{ $t('org.config_cla_corp_metadata') }}
          </el-row>
          <div>
            <el-row
              class="margin-top-1rem"
              type="flex"
              align="middle"
              :gutter="20"
            >
              <el-col :span="5">
                {{ $t('org.config_cla_check_fields_title_title') }}
              </el-col>
              <el-col :span="5">
                {{ $t('org.config_cla_check_fields_type_title') }}
              </el-col>
              <el-col :span="5">
                {{ $t('org.config_cla_check_fields_describe_title') }}
              </el-col>
              <el-col :span="5" style="height: 100%">
                {{ $t('org.config_cla_check_fields_require_title') }}
              </el-col>
            </el-row>
            <el-row
              style="padding: 0.5rem 0"
              type="flex"
              align="middle"
              :gutter="20"
              v-for="(item, index) in corporationMetadata"
            >
              <el-col :span="5">
                <el-input
                  disabled=""
                  v-model="item.title"
                  size="medium"
                  readonly=""
                >
                </el-input>
              </el-col>
              <el-col :span="5">
                <el-input
                  disabled=""
                  v-model="item.type"
                  size="medium"
                  readonly
                ></el-input>
              </el-col>
              <el-col :span="5">
                <el-input
                  disabled=""
                  v-model="item.description"
                  size="medium"
                  readonly
                ></el-input>
              </el-col>
              <el-col :span="5" style="height: 100%">
                <el-checkbox v-model="item.required" disabled="">
                  {{ $t('org.config_cla_fields_required') }}
                </el-checkbox>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <div class="stepBtBox">
      <button @click="toConfigField" class="step_button">
        {{ $t('org.previous_step') }}
      </button>
      <button @click="binding" class="step_button">
        {{ $t('org.submit') }}
      </button>
    </div>
    <ReLoginDialog
      :dialogVisible="reLoginDialogVisible"
      :message="reLoginMsg"
    ></ReLoginDialog>
    <ReTryDialog
      :dialogVisible="reTryVisible"
      :message="reLoginMsg"
    ></ReTryDialog>
  </div>
</template>

<script setup lang="ts">
import * as url from '../util/api';
import http from '../util/http';
import * as util from '../util/util';
import ReLoginDialog from '../components/ReLoginDialog.vue';
import ReTryDialog from '../components/ReTryDialog.vue';

import { ref, computed, inject, onUpdated, onMounted } from 'vue';
import { useCommonStore } from '../stores/common';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const { t, locale } = useI18n();
const $t = t;
const commonStore = useCommonStore();
const router = useRouter();

const reTryVisible = computed(() => {
  return commonStore.reTryDialogVisible;
});
const reLoginDialogVisible = computed(() => {
  return commonStore.orgReLoginDialogVisible;
});
const reLoginMsg = computed(() => {
  return commonStore.dialogMessage;
});
const orgChoose = computed(() => {
  return `${commonStore.orgChoose}` === 'true';
});
const isEmail = computed(() => {
  return `${commonStore.isEmail}` === 'true';
});
const repositoryChoose = computed(() => {
  return `${commonStore.repositoryChoose}` === 'true';
});
const email = computed(() => {
  return commonStore.email;
});
const org = computed(() => {
  return commonStore.chooseOrg;
});
const orgAlias = computed(() => {
  if (commonStore.orgAlias) {
    return commonStore.orgAlias;
  } else {
    return commonStore.chooseOrg;
  }
});
const repo = computed(() => {
  return commonStore.repo;
});
const cla_link_individual = computed({
  get() {
    return commonStore.claLinkIndividual;
  },
  set(value) {
    commonStore.setClaLinkIndividual(value);
  },
});
const cla_link_corporation = computed({
  get() {
    return commonStore.claLinkCorp;
  },
  set(value) {
    commonStore.setClaLinkCorp(value);
  },
});
const individualMetadata = computed(() => {
  return commonStore.individualMetadata;
});
const corporationMetadata = computed(() => {
  return commonStore.corporationMetadata;
});
const individualClaLanguageValue = computed(() => {
  return commonStore.individualLanguage;
});
const corpClaLanguageValue = computed(() => {
  return commonStore.corpLanguage;
});
const platform = computed(() => {
  return commonStore.platform?.toLowerCase();
});

const loading = ref(false);
const isVerify = ref(false);
const previewShow = ref(false);
const loginType = ref(commonStore.loginType);
const access_token = ref(commonStore.access_token);
const refresh_token = ref(commonStore.refresh_token);
const platform_token = ref(commonStore.platform_token);

const setClientHeight = inject('setClientHeight');

const toConfigField = () => {
  if (commonStore.bindType === 'add-bind') {
    if (commonStore.claLinkIndividual) {
      router.push('/addIndividualUrl');
    } else {
      router.push('/addCorpUrl');
    }
  } else {
    router.push('/config-fields');
  }
};
const editMetadata = (metadata) => {
  if (metadata) {
    let metadataArr = metadata;
    let fields = [];
    metadataArr.forEach((item, index) => {
      if (item.title !== '' && item.type !== '') {
        fields.push({
          id: index + '',
          title: item.title,
          type: item.type,
          description: item.description,
          required: item.required,
        });
      }
    });
    return fields;
  } else {
    return false;
  }
};
const dataURLtoFile = (dataurl, filename) => {
  let arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};
const binding = () => {
  if (commonStore.bindType === 'add-bind') {
    addBinding();
  } else {
    newBinding();
  }
};
const addBinding = () => {
  loading.value = util.getLoading(this, 'tips.loading');
  let formData = new FormData();
  let obj = {};
  let _url = '';
  if (commonStore.claLinkCorp) {
    obj = {
      url: cla_link_corporation.value.trim(),
      language: corpClaLanguageValue.value,
      fields: editMetadata(corporationMetadata.value),
      type: 'corporation',
    };
    _url = `${url.addCla}/${commonStore.corpItem.link_id}`;
  } else {
    obj = {
      url: cla_link_individual.value.trim(),
      language: individualClaLanguageValue.value,
      fields: editMetadata(individualMetadata.value),
      type: 'individual',
    };
    _url = `${url.addCla}/${commonStore.corpItem.link_id}`;
  }
  formData.append('data', JSON.stringify(obj));
  http({
    url: _url,
    method: 'post',
    data: formData,
  })
    .then((res) => {
      loading.value.close();
      util.successMessage(this);
      util.clearSession(this);
      router.push('/corporationList');
    })
    .catch((err) => {
      loading.value.close();
      util.catchErr(err, 'setOrgReLogin', this);
    });
};
const newBinding = () => {
  loading.value = util.getLoading(this, 'tips.loading');

  let formData = new FormData();
  let obj = {};
  let corpCla = {};
  let individualCla = {
    url: cla_link_individual.value.trim(),
    language: individualClaLanguageValue.value,
    fields: editMetadata(individualMetadata.value),
  };
  if (cla_link_corporation.value) {
    corpCla = {
      url: cla_link_corporation.value.trim(),
      language: corpClaLanguageValue.value,
      fields: editMetadata(corporationMetadata.value),
    };
    if (repo.value) {
      obj = {
        repo_id: repo.value,
        org_email: email.value,
        platform: platform.value,
        org_id: org.value,
        org_alias: orgAlias.value,
        individual_cla: individualCla,
        corp_cla: corpCla,
      };
    } else {
      obj = {
        org_email: email.value,
        platform: platform.value,
        org_id: org.value,
        org_alias: orgAlias.value,
        individual_cla: individualCla,
        corp_cla: corpCla,
      };
    }
  } else {
    if (repo.value) {
      obj = {
        repo_id: repo.value,
        org_email: email.value,
        platform: platform.value,
        org_id: org.value,
        org_alias: orgAlias.value,
        individual_cla: individualCla,
      };
    } else {
      obj = {
        org_email: email.value,
        platform: platform.value,
        org_id: org.value,
        org_alias: orgAlias.value,
        individual_cla: individualCla,
      };
    }
  }
  formData.append('data', JSON.stringify(obj));
  http({
    url: url.linkRepository,
    method: 'post',
    data: formData,
  })
    .then((res) => {
      loading.value.close();
      util.successMessage(this);
      router.push('/home');
    })
    .catch((err) => {
      loading.value.close();
      util.catchErr(err, 'setOrgReLogin', this);
    });
};

onUpdated(() => {
  setClientHeight();
});
</script>

<style lang="scss" scoped>
#configCla {
  .nextStepBtBox {
    text-align: right;
    margin-bottom: 2rem;
  }

  .margin-top-half-rem {
    margin-top: 0.5rem;
  }

  .el-dialog__body {
    text-align: center;
    word-break: keep-all;
  }

  .info-title {
    font-size: 1.2rem;
    padding: 0.5rem;
  }

  .size-b {
    font-weight: bold;
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

  .typeCol {
    padding: 0.5rem 10px;
  }

  #section {
    flex-grow: 1;
    text-align: left;

    .pageTitle {
      padding: 2rem 0;
      font-size: 1.3rem;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      -webkit-touch-callout: none;
      user-select: none;
    }
  }
}

.el-dropdown-link {
  cursor: pointer;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.dialogDesc {
  font-size: 1.2rem;
  margin: 2rem 0;
}

li {
  margin: 1rem 0;
}
</style>
