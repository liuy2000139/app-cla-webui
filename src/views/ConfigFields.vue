<template>
  <el-row id="configFields">
    <div class="itemBox">
      <div style="padding: 0.5rem">
        <p style="font-size: 1.2rem">
          ④ {{ $t('org.config_cla_fields') }}
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
                    disabled=""
                    v-model="item.title"
                    size="medium"
                    readonly=""
                  ></el-input>
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
        <div v-if="commonStore.claLinkCorp" class="margin-top-1rem">
          <div class="margin-top-1rem">
            {{ $t('org.config_cla_corp_metadata') }}
          </div>
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
              :key="index"
            >
              <el-col :span="5">
                <el-select
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
                <el-checkbox v-model="item.required"
                  >{{ $t('org.config_cla_fields_required') }}
                </el-checkbox>
              </el-col>
              <el-col :span="4">
                <button class="add_button" @click="addCorpRow(index)">+</button>
                <button class="deleteBt" @click="myCorpDeleteRow(index)">
                  -
                </button>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <div class="stepBtBox">
      <button class="step_button" @click="toConfigClaLink">
        {{ $t('org.previous_step') }}
      </button>
      <button class="step_button" @click="toNextPage">
        {{ $t('org.next_step') }}
      </button>
    </div>
  </el-row>
</template>

<script setup lang="ts">
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

const individualCustomMetadataArr = computed(() => {
  if (commonStore.individualCustomMetadataArr) {
    return commonStore.individualCustomMetadataArr;
  } else {
    return initIndividualCustomMetadata.value;
  }
});
const corporationCustomMetadataArr = computed(() => {
  if (commonStore.corporationCustomMetadataArr) {
    return commonStore.corporationCustomMetadataArr;
  } else {
    return initCorpCustomMetadata.value;
  }
});

const individualMetadata = ref([]);
const corpMetadata = ref([]);
const individualMetadataArr = ref(claConfig.INDIVIDUALMETADATAARR_EN);
const corporationMetadataArr = ref(claConfig.CORPORATIONMETADATAARR_EN);
const initIndividualCustomMetadata = ref(
  JSON.parse(JSON.stringify(claConfig.INITCUSTOMMETADATA))
);
const initCorpCustomMetadata = ref(
  JSON.parse(JSON.stringify(claConfig.INITCUSTOMMETADATA))
);
const individualTitleOptions = ref(claConfig.TITLE_OPTIONS_EN);
const corpTitleOptions = ref(claConfig.TITLE_OPTIONS_EN);

// beforeRouteEnter(to, from, next) {
//   next((vm) => {
//     if (from.path === '/') {
//       vm.flashInit();
//     }
//   });

const setClientHeight = inject('setClientHeight');

const changeCorpTitle = (e, item) => {
  util.changeCorpTitle(e, item);
};
const init = () => {
  if (commonStore.individualLanguage === 'chinese') {
    individualMetadataArr.value = claConfig.INDIVIDUALMETADATAARR_ZH;
  }
  if (commonStore.corpLanguage === 'chinese') {
    corporationMetadataArr.value = claConfig.CORPORATIONMETADATAARR_ZH;
    corpTitleOptions.value = claConfig.TITLE_OPTIONS_ZH;
    util.corpFiledExchangeToZh(corporationCustomMetadataArr.value);
  } else if (commonStore.corpLanguage === 'english') {
    util.corpFiledExchangeToEn(corporationCustomMetadataArr.value);
  }
};
const flashInit = () => {
  init();
  commonStore.setCorporationCustomMetadataArr(initCorpCustomMetadata.value);
  sessionStorage.removeItem('corporationCustomMetadataArr');
};
const toConfigClaLink = () => {
  commonStore.setIndividualCustomMetadataArr(individualCustomMetadataArr.value);
  commonStore.setCorporationCustomMetadataArr(
    corporationCustomMetadataArr.value
  );
  router.replace('/config-cla-link');
};
const toNextPage = () => {
  let corpArr = checkMetadata();
  if (corpArr) {
    commonStore.setIndividualMetadata(individualMetadataArr.value);
    commonStore.setCorpMetadata(corpArr);
    commonStore.setCorporationCustomMetadataArr(corpMetadata.value);
    router.replace('/config-check');
  } else {
    ElMessage.closeAll();
    ElMessage.error($t('tips.title_type_repeat'));
  }
};
const checkMetadata = () => {
  let corpMetadata = [];
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
  corpMetadata.push({
    title: '',
    type: '',
    description: '',
    required: false,
  });
  corpMetadata.value = corpMetadata;
  return corpArr;
};
const addCorpRow = (index) => {
  let metadata = JSON.parse(JSON.stringify(corporationCustomMetadataArr.value));
  metadata.splice(index + 1, 0, {
    title: '',
    type: '',
    description: '',
    required: false,
  });
  commonStore.setCorporationCustomMetadataArr(metadata);
};
const myCorpDeleteRow = (index) => {
  let metadata = JSON.parse(JSON.stringify(corporationCustomMetadataArr.value));
  if (metadata.length === 1) {
    metadata[0].type = '';
    metadata[0].title = '';
    metadata[0].description = '';
  } else {
    metadata.splice(index, 1);
  }
  commonStore.setCorporationCustomMetadataArr(metadata);
};

init();

onUpdated(() => {
  setClientHeight();
});
</script>

<style lang="scss" scoped>
#configFields {
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

  .itemBox {
    border-radius: 1.25rem;
    box-shadow: 0 0 20px 10px #f3f3f3;
    padding: 2rem;
    margin-bottom: 2rem;
  }
}
</style>
