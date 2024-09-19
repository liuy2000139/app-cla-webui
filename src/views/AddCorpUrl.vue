<template>
  <div>
    <div class="itemBox">
      <div class="stepTitle">
        {{ $t('org.config_cla_paste_url_title') }}
        <el-tooltip
          class="item"
          effect="light"
          :content="$t('org.config_cla_paste_url_title_tooltips')"
          placement="right"
        >
          <svg-icon icon-class="tips"></svg-icon>
        </el-tooltip>
      </div>
      <div>
        <div class="margin-top-1rem">
          {{ $t('org.config_cla_paste_corp_url') }}
        </div>
        <div class="margin-top-1rem">
          {{
            $t('org.config_cla_corp_url_desc', {
              platform: commonStore.platform,
            })
          }}
        </div>
        <div class="margin-top-1rem">
          <el-row class="margin-top-1rem">
            <el-col>
              <el-input
                clearable=""
                :placeholder="$t('org.config_cla_url_placeholder')"
                size="medium"
                v-model="cla_link_corporation"
              >
              </el-input>
            </el-col>
          </el-row>
          <el-row class="margin-top-1rem">
            {{ $t('org.config_cla_corp_lang') }}
          </el-row>
          <el-row class="margin-top-1rem">
            <el-col>
              <el-select
                v-model="corpClaLanguageValue"
                :placeholder="$t('org.config_cla_select_lang')"
                style="width: 100%"
                size="medium"
                clearable
                filterable
                @change="changeCorpLanguage"
              >
                <el-option
                  v-for="item in languageOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="itemBox">
      <div style="padding: 0.5rem">
        <p style="font-size: 1.2rem">
          {{ $t('org.config_cla_fields') }}
          <el-tooltip
            class="item"
            effect="dark"
            :content="$t('org.config_cla_fields_desc')"
            placement="right"
          >
            <svg-icon icon-class="tips"></svg-icon>
          </el-tooltip>
        </p>
      </div>
      <div class="margin-top-1rem">
        <div>
          <div class="margin-top-1rem">
            {{ $t('org.config_cla_corp_metadata') }}
          </div>
          <div class="margin-top-1rem">
            <div class="margin-top-1rem">
              {{ $t('org.config_cla_corp_metadata_desc') }}
            </div>
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
                v-for="(item, index) in corporationMetadataArr"
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
            <div>
              <el-row
                style="padding: 0.5rem 0"
                type="flex"
                align="middle"
                :gutter="20"
                v-for="(item, index) in corporationCustomMetadataArr"
              >
                <el-col :span="5">
                  <el-select
                    :disabled="!add_bind_first"
                    style="width: 100%"
                    v-model="item.title"
                    :placeholder="$t('org.config_cla_fields_title_placeholder')"
                    @change="changeCorpTitle($event, item)"
                    size="medium"
                  >
                    <el-option
                      v-for="i in corpTitleOptions"
                      :key="i.value"
                      :label="i.label"
                      :value="i.value"
                    >
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="5">
                  <el-input
                    disabled=""
                    v-model="item.type"
                    size="medium"
                    :placeholder="$t('org.config_cla_fields_type_placeholder')"
                  ></el-input>
                </el-col>
                <el-col :span="5" style="height: 100%">
                  <el-input
                    disabled=""
                    v-model="item.description"
                    size="medium"
                    :placeholder="$t('org.config_cla_fields_desc_placeholder')"
                  ></el-input>
                </el-col>
                <el-col :span="5" style="height: 100%">
                  <el-checkbox
                    :disabled="!add_bind_first"
                    v-model="item.required"
                  >
                    {{ $t('org.config_cla_fields_required') }}
                  </el-checkbox>
                </el-col>
                <el-col v-show="add_bind_first" :span="4">
                  <button class="add_button" @click="addCorpRow(index)">
                    +
                  </button>
                  <button class="deleteBt" @click="myCorpDeleteRow(index)">
                    -
                  </button>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="nextStepBtBox">
      <button class="step_button" @click="toNextPage">
        {{ $t('org.next_step') }}
      </button>
    </div>
    <ReTryDialog
      :message="reLoginMsg"
      :dialogVisible="reTryVisible"
    ></ReTryDialog>
    <ReLoginDialog
      :dialogVisible="reLoginDialogVisible"
      :message="reLoginMsg"
    ></ReLoginDialog>
  </div>
</template>

<script setup lang="ts">
import ReTryDialog from '../components/ReTryDialog.vue';
import ReLoginDialog from '../components/ReLoginDialog.vue';
import * as util from '../util/util';
import claConfig from '../lang/global';
import { ref, computed, inject, onUpdated, onMounted } from 'vue';
import { useCommonStore } from '../stores/common';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const { t, locale } = useI18n();
const $t = t;
const commonStore = useCommonStore();
const router = useRouter();

const corpMetadata = ref([]);
const languageOptions = ref([
  { value: 'english', label: 'English' },
  { value: 'chinese', label: '中文' },
]);
const corporationMetadataArr = ref(claConfig.CORPORATIONMETADATAARR_EN);
const initCorpCustomMetadata = ref(
  JSON.parse(JSON.stringify(claConfig.INITCUSTOMMETADATA))
);
const corpTitleOptions = ref(claConfig.TITLE_OPTIONS_EN);

const add_bind_first = computed(() => {
  return commonStore.add_bind_first;
});
const reTryVisible = computed(() => {
  return commonStore.reTryDialogVisible;
});
const reLoginDialogVisible = computed(() => {
  return commonStore.orgReLoginDialogVisible;
});
const reLoginMsg = computed(() => {
  return commonStore.dialogMessage;
});
const corporationCustomMetadataArr = computed(() => {
  if (commonStore.add_bind_first) {
    if (
      commonStore.corporationCustomMetadataArr &&
      commonStore.corporationCustomMetadataArr.length
    ) {
      return commonStore.corporationCustomMetadataArr;
    } else {
      return initCorpCustomMetadata.value;
    }
  } else {
    return commonStore.corporationCustomMetadataArr;
  }
});
const cla_link_corporation = computed({
  get() {
    return commonStore.claLinkCorp;
  },
  set(value) {
    commonStore.setClaLinkCorp(value);
  },
});
const corpClaLanguageValue = computed({
  get() {
    return commonStore.corpLanguage;
  },
  set(value) {
    commonStore.setCorpLanguage(value);
  },
});

const changeCorpTitle = (e, item) => {
  util.changeCorpTitle(e, item);
};
const addCorpRow = (index) => {
  let metadata = corporationCustomMetadataArr.value;
  metadata.splice(index + 1, 0, {
    title: '',
    type: '',
    description: '',
    required: false,
  });
  commonStore.setCorporationCustomMetadataArr(metadata);
};
const myCorpDeleteRow = (index) => {
  let metadata = corporationCustomMetadataArr.value;
  if (metadata.length === 1) {
    metadata[0].type = '';
    metadata[0].title = '';
    metadata[0].description = '';
  } else {
    metadata.splice(index, 1);
  }
  commonStore.setCorporationCustomMetadataArr(metadata);
};
const initMetadata = (lang) => {
  if (lang === 'chinese') {
    corporationMetadataArr.value = claConfig.CORPORATIONMETADATAARR_ZH;
  } else if (lang === 'english') {
    corporationMetadataArr.value = claConfig.CORPORATIONMETADATAARR_EN;
  }
};
const corpInit = () => {
  commonStore.setCorpLanguage('');
  commonStore.setClaLinkCorp('');

  commonStore.setCorpMetadata(corporationMetadataArr.value);
};
const toNextPage = () => {
  if (cla_link_corporation.value && corpClaLanguageValue.value) {
    let corpArr = checkMetadata();
    if (corpArr) {
      commonStore.setCorpMetadata(corpArr);
      commonStore.setCorporationCustomMetadataArr(corpMetadata.value);
      router.replace('/config-check');
    } else {
      ElMessage.closeAll();
      ElMessage.error($t('tips.title_type_repeat'));
    }
  } else if (cla_link_corporation.value) {
    commonStore.errorCodeSet({
      dialogVisible: true,
      dialogMessage: $t('tips.select_corp_language'),
    });
  } else {
    commonStore.errorCodeSet({
      dialogVisible: true,
      dialogMessage: $t('tips.paste_corp_link'),
    });
  }
};
const checkMetadata = () => {
  let corpMetadata = [];
  corporationCustomMetadataArr.value &&
    corporationCustomMetadataArr.value.forEach((item) => {
      if (item.title !== '' && item.type !== '') {
        corpMetadata.push(item);
      }
    });
  let corpArr = corporationMetadataArr.value.concat(corpMetadata);
  for (let i = 0; i < corpArr.length; i++) {
    for (let j = i + 1; j < corpArr.length; j++) {
      if (
        corpArr[i].title === corpArr[j].title ||
        corpArr[i].type === corpArr[j].type
      ) {
        return false;
      }
    }
  }
  corpMetadata.value = corpMetadata;
  return corpArr;
};
const changeCorpLanguage = (value) => {
  if (value === 'english') {
    corpTitleOptions.value = claConfig.TITLE_OPTIONS_EN;
    util.corpFiledExchangeToEn(corporationCustomMetadataArr.value);
  } else {
    corpTitleOptions.value = claConfig.TITLE_OPTIONS_ZH;
    util.corpFiledExchangeToZh(corporationCustomMetadataArr.value);
  }
  initMetadata(value);
  commonStore.setCorpLanguage(value);
  commonStore.setAddLang(value);
};

initMetadata(commonStore.individualLanguage);
</script>

<style lang="scss" scoped>
.nextStepBtBox {
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
}

.deleteBt {
  width: 3rem;
  height: 3rem;
  border-radius: 1.5rem;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  background: linear-gradient(to right, #ff9d58, #e22424);
  margin-right: 1rem;
}

.deleteBt:focus {
  outline: none;
}

.add_button {
  width: 3rem;
  height: 3rem;
  border-radius: 1.5rem;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  background: linear-gradient(to right, #97db30, #319e55);
  margin-right: 1rem;
}

.add_button:focus {
  outline: none;
}
:deep(.el-input__wrapper) {
  .el-input__inner {
    height: 36px;
  }
}
.itemBox:nth-child(2) :deep(.el-input__wrapper) {
  background-color: #f5f7fa !important;
}
:deep(.el-select .el-input.is-focus .el-input__wrapper) {
  box-shadow: none !important;
}
:deep(.el-select .el-input .el-input__wrapper.is-focus) {
  box-shadow: none !important;
}
:deep(.el-input__wrapper) {
  &.is-focus {
    border-color: #319e55 !important;
  }
}
</style>
<style>
.el-select-dropdown__item.selected {
  color: #319e55 !important;
}
</style>
