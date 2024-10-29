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
          {{ $t('org.config_cla_paste_individual_url') }}
        </div>
        <div class="margin-top-1rem">
          {{
            $t('org.config_cla_individual_url_desc', {
              platform: commonStore.platform,
            })
          }}
        </div>
        <div class="margin-top-1rem">
          <el-row class="margin-top-1rem">
            <el-col>
              <el-input
                clearable
                :placeholder="$t('org.config_cla_url_placeholder')"
                v-model="cla_link_individual"
              >
              </el-input>
            </el-col>
          </el-row>
          <el-row class="margin-top-1rem">
            {{ $t('org.config_cla_individual_lang') }}
          </el-row>
          <el-row class="margin-top-1rem">
            <el-col>
              <el-select
                v-model="individualClaLanguageValue"
                :placeholder="$t('org.config_cla_select_lang')"
                style="width: 100%"
                clearable
                filterable
                @change="changeIndividualLanguage"
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
            {{ $t('org.config_cla_individual_metadata') }}
          </div>
          <div class="margin-top-1rem">
            <div class="margin-top-1rem">
              {{ $t('org.config_cla_individual_metadata_desc') }}
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
                v-for="(item, index) in individualMetadataArr"
              >
                <el-col :span="5">
                  <el-input
                    disabled
                    v-model="item.title"
                    readonly
                  >
                  </el-input>
                </el-col>
                <el-col :span="5">
                  <el-input
                    disabled
                    v-model="item.type"
                    readonly
                  ></el-input>
                </el-col>
                <el-col :span="5">
                  <el-input
                    disabled
                    v-model="item.description"
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
            <div v-if="!add_bind_first">
              <el-row
                style="padding: 0.5rem 0"
                type="flex"
                align="middle"
                :gutter="20"
                v-for="(item, index) in individualCustomMetadataArr"
              >
                <el-col :span="5">
                  <el-input
                    disabled
                    v-model="item.title"
                    :placeholder="$t('org.config_cla_fields_title_placeholder')"
                  >
                  </el-input>
                </el-col>
                <el-col :span="5">
                  <el-select
                    disabled
                    style="width: 100%"
                    v-model="item.type"
                    :placeholder="$t('org.config_cla_fields_type_placeholder')"
                  >
                    <el-option
                      v-for="i in dataTypeOptions"
                      :key="i.value"
                      :label="i.label"
                      :value="i.value"
                    >
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="5" style="height: 100%">
                  <el-input
                    disabled
                    v-model="item.description"
                    :placeholder="$t('org.config_cla_fields_desc_placeholder')"
                  ></el-input>
                </el-col>
                <el-col :span="5" style="height: 100%">
                  <el-checkbox disabled="" v-model="item.required">
                    {{ $t('org.config_cla_fields_required') }}
                  </el-checkbox>
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

const individualMetadata = ref([]);
const languageOptions = ref([
  { value: 'english', label: 'English' },
  { value: 'chinese', label: '中文' },
]);
const individualMetadataArr = ref(claConfig.INDIVIDUALMETADATAARR_EN);
const initIndividualCustomMetadata = ref(
  JSON.parse(JSON.stringify(claConfig.INITCUSTOMMETADATA))
);
const individualTitleOptions = ref(claConfig.TITLE_OPTIONS_EN);

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
const individualCustomMetadataArr = computed(() => {
  return commonStore.individualCustomMetadataArr;
});
const cla_link_individual = computed({
  get() {
    return commonStore.claLinkIndividual;
  },
  set(value) {
    commonStore.setClaLinkIndividual(value);
  },
});
const individualClaLanguageValue = computed({
  get() {
    return commonStore.individualLanguage;
  },
  set(value) {
    commonStore.setIndividualLanguage(value);
  },
});

const initMetadata = (lang) => {
  if (lang === 'chinese') {
    individualMetadataArr.value = claConfig.INDIVIDUALMETADATAARR_ZH;
  } else if (lang === 'english') {
    individualMetadataArr.value = claConfig.INDIVIDUALMETADATAARR_EN;
  }
};
const individualInit = () => {
  commonStore.setIndividualLanguage('');
  commonStore.setClaLinkIndividual('');

  commonStore.setIndividualMetadata(individualMetadataArr.value);
};
const toNextPage = () => {
  if (cla_link_individual.value && individualClaLanguageValue.value) {
    let individualArr = checkMetadata();
    if (individualArr) {
      commonStore.setIndividualMetadata(individualArr);
      commonStore.setIndividualCustomMetadataArr(individualMetadata.value);
      router.replace('/config-check');
    } else {
      ElMessage.closeAll();
      ElMessage.error($t('tips.title_type_repeat'));
    }
  } else if (cla_link_individual.value) {
    commonStore.errorCodeSet({
      dialogVisible: true,
      dialogMessage: $t('tips.select_individual_language'),
    });
  } else {
    commonStore.errorCodeSet({
      dialogVisible: true,
      dialogMessage: $t('tips.paste_individual_link'),
    });
  }
};
const checkMetadata = () => {
  let individualMetadata = [];
  individualCustomMetadataArr.value &&
    individualCustomMetadataArr.value.forEach((item) => {
      if (item.title !== '' && item.type !== '') {
        individualMetadata.push(item);
      }
    });
  let individualArr = individualMetadataArr.value.concat(individualMetadata);
  for (let i = 0; i < individualArr.length; i++) {
    for (let j = i + 1; j < individualArr.length; j++) {
      if (
        individualArr[i].title === individualArr[j].title ||
        individualArr[i].type === individualArr[j].type
      ) {
        return false;
      }
    }
  }
  individualMetadata.value = individualMetadata;
  return individualArr;
};
const changeIndividualLanguage = (value) => {
  if (value === 'chinese') {
    individualTitleOptions.value = claConfig.TITLE_OPTIONS_ZH;
    util.individualFiledExchangeToZh(individualCustomMetadataArr.value);
  } else if (value === 'english') {
    individualTitleOptions.value = claConfig.TITLE_OPTIONS_EN;
    util.individualFiledExchangeToEn(individualCustomMetadataArr.value);
  }
  initMetadata(value);
  commonStore.setIndividualLanguage(value);
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
.el-tooltip__popper {
  padding: 10px;
}
</style>
