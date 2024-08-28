<template>
  <el-row id="orgSelect" style="height: 100%">
    <el-col align="right" class="formBox">
      <div class="formBack_Box">
        <div class="formBack">
          <el-row class="marginTop">
            <el-col>
              <span>{{ $t('corp.select_community') }}</span>
            </el-col>
          </el-row>
          <el-row class="marginTop margin-bottom">
            <el-col>
              <el-select
                value=""
                v-model="orgValue"
                clearable=""
                filterable=""
                class="select"
                :placeholder="$t('corp.select_placeholder')"
                @change="changeOrg"
              >
                <el-option
                  v-for="item in orgData"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <div class="marginTop buttonRow">
            <div class="buttonBox">
              <button class="org-button" @click="submit">
                {{ $t('corp.submit') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCommonStore } from '../stores/common';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
const $t = t;

const router = useRouter();
const commonStore = useCommonStore();

const orgData = computed(() => {
  let data = [];
  if (commonStore.loginInfo.userInfo.length) {
    commonStore.loginInfo.userInfo.forEach((item, index) => {
      if (item.repo_id) {
        data.push({
          value: index,
          label: `${item.org_id}/${item.repo_id}`,
        });
      } else {
        data.push({ value: index, label: item.org_id });
      }
    });
    orgValue.value = 0;
  }
  return data;
});

const orgValue = ref('');

const changeOrg = (value) => {
  orgValue.value = value;
};
const submit = () => {
  let data = JSON.parse(JSON.stringify(commonStore.loginInfo));
  Object.assign(data, { orgValue: orgValue.value });
  commonStore.setCorpToken(data.userInfo[orgValue.value].token);
  commonStore.setLoginInfo(data);
  if (data.userInfo[orgValue.value].role === 'admin') {
    router.replace('/rootManager');
  } else {
    router.replace('/signedRepo');
  }
};
</script>

<style lang="scss">
.el-select-dropdown__item.selected {
  color: #319e55;
}

.el-select .el-input.is-focus .el-input__inner {
  border-color: #319e55;
}

.el-select .el-input__inner:focus {
  border-color: #319e55;
}

.el-input--suffix .el-input__inner {
  padding-right: 2rem;
  height: 3rem;
  width: 100%;
  border-radius: 1.5rem;
}

#orgSelect {
  .select {
    width: 100%;
  }

  .buttonRow {
    position: relative;

    .buttonBox {
      height: 4rem;
      position: absolute;
      left: 50%;

      .org-button {
        position: relative;
        left: -50%;
        top: -2rem;
        width: 15rem;
        height: 4rem;
        border-radius: 2rem;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        background: linear-gradient(to right, #97db30, #319e55);
      }

      .org-button:focus {
        outline: none;
      }
    }
  }

  .formBack_Box {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  .formBack {
    width: 18rem;
    box-shadow: 0 0 20px 10px #f3f3f3;
    padding: 2rem 2rem 0 2rem;
    background-color: white;
    border-radius: 2rem;
  }

  .formBox {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .marginTop {
    margin-top: 2rem;
  }

  .margin-bottom {
    margin-bottom: 6rem;
  }
}
</style>
