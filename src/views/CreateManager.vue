<template>
  <el-row id="createUser">
    <el-col>
      <p id="tabName">{{ $t('header.createManager') }}</p>
      <div class="createUserBack">
        <el-row type="flex" align="middle" class="emailRow" gutter="20">
          <el-col align="left" :span="6">
            <span class="requireText">{{ $t('corp.managerName') }}</span>
          </el-col>
          <el-col align="left" :span="8">
            <span class="requireText">{{ $t('corp.managerEmail') }}</span>
          </el-col>
          <el-col align="left" :span="6">
            <span class="requireText">{{ $t('corp.managerId') }}</span>
            <el-tooltip
              effect="light"
              :content="$t('corp.managerIdDesc')"
              placement="right"
            >
              <svg-icon class="pointer" icon-class="bangzhu" />
            </el-tooltip>
          </el-col>
        </el-row>
        <el-row
          type="flex"
          align="middle"
          class="emailRow"
          gutter="20"
          v-for="(item, index) in data"
        >
          <el-col :span="6">
            <el-input
              :placeholder="$t('tips.fill_name')"
              @blur="setAcount(item.name, index)"
              clearable=""
              size="medium"
              v-model="item.name"
            >
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-input
              :placeholder="$t('tips.not_fill_email')"
              clearable=""
              size="medium"
              v-model="item.email"
            >
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input
              :placeholder="$t('tips.not_fill_id')"
              clearable=""
              size="medium"
              v-model="item.id"
            >
            </el-input>
          </el-col>
          <el-col :span="4" align="right">
            <button class="deleteBt" @click="myDeleteRow(index)">-</button>
            <button class="add-button" @click="addRow(index)">+</button>
          </el-col>
        </el-row>

        <el-row align="middle">
          <el-col align="center">
            <button class="submitBt" @click="createUser()">
              {{ $t('corp.submit') }}
            </button>
          </el-col>
        </el-row>
      </div>

      <corpReLoginDialog
        :message="corpReLoginMsg"
        :dialogVisible="corpReLoginDialogVisible"
      ></corpReLoginDialog>
      <reTryDialog
        :message="corpReLoginMsg"
        :dialogVisible="corpReTryDialogVisible"
      ></reTryDialog>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import * as url from '../util/api';
import http from '../util/http';
import * as util from '../util/util';
import corpReLoginDialog from '../components/CorpReLoginDialog.vue';
import reTryDialog from '../components/ReTryDialog.vue';

import { ref, computed, inject, onUpdated, onMounted } from 'vue';
import { useCommonStore } from '../stores/common';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const { t, locale } = useI18n();
const $t = t;
const commonStore = useCommonStore();
const router = useRouter();

const orgValue = computed(() => {
  return commonStore.loginInfo.orgValue;
});
const userInfo = computed(() => {
  return commonStore.loginInfo.userInfo;
});
const corpReLoginDialogVisible = computed(() => {
  return commonStore.dialogVisible;
});
const corpReLoginMsg = computed(() => {
  return commonStore.dialogMessage;
});
const corpReTryDialogVisible = computed(() => {
  return commonStore.reTryDialogVisible;
});

const data = ref([{ name: '', email: '', id: '' }]);
const limit = ref(5);

const setAcount = (name, index) => {
  let reg = /^[a-zA-Z0-9_.]+$/;
  let myName = name.trim();
  if (reg.test(myName) && data.value[index].id.trim() === '') {
    data.value[index].id = myName;
  }
};
const pressEnter = () => {
  if (event.keyCode === 13) {
    createUser();
  }
};
const addRow = (index) => {
  if (Number(commonStore.userLimit) + data.value.length >= limit.value) {
    ElMessage.closeAll();
    ElMessage.error($t('corp.manager_limit', { limit: limit.value }));
  } else {
    data.value.splice(index + 1, 0, { name: '', email: '', id: '' });
  }
};
const myDeleteRow = (index) => {
  if (data.value.length === 1) {
    data.value[0].name = '';
    data.value[0].email = '';
    data.value[0].id = '';
  } else {
    data.value.splice(index, 1);
  }
};
const createUser = () => {
  let managers = commonStore.managerList;
  let newManagers = [];
  let isCreate = true;
  if (isCreate) {
    for (let i = 0; i < data.value.length; i++) {
      let email = data.value[i].email.trim();
      let name = data.value[i].name.trim();
      let id = data.value[i].id.trim();
      if (
        !(
          (email === '' && name === '' && id === '') ||
          (email !== '' && name !== '' && id !== '')
        )
      ) {
        isCreate = false;
        commonStore.errorCodeSet( {
          dialogVisible: true,
          dialogMessage: $t('corp.fill_complete'),
        });
        break;
      } else if (email !== '' && name !== '' && id !== '') {
        newManagers.push({ name: name, email: email, id: id });
        if (!id.match(/^[a-zA-Z0-9_.]+$/)) {
          isCreate = false;
          commonStore.errorCodeSet( {
            dialogVisible: true,
            dialogMessage: $t('tips.invalid_id'),
          });
          break;
        }
      }
    }
  }
  if (isCreate) {
    for (let i = 0; i < newManagers.length; i++) {
      let flag = 0;
      for (let j = i + 1; j < newManagers.length; j++) {
        if (newManagers[i].email.trim() === newManagers[j].email.trim()) {
          isCreate = false;
          commonStore.errorCodeSet({
            dialogVisible: true,
            dialogMessage: $t('tips.same_email'),
          });
          flag = 1;
          break;
        }
        if (newManagers[i].id.trim() === newManagers[j].id.trim()) {
          isCreate = false;
          commonStore.errorCodeSet({
            dialogVisible: true,
            dialogMessage: $t('tips.same_id'),
          });
          flag = 1;
          break;
        }
      }
      if (flag) {
        break;
      }
    }
  }
  if (isCreate) {
    for (let i = 0; i < managers.length; i++) {
      let flag = 0;
      for (let j = 0; j < data.value.length; j++) {
        if (managers[i].email.trim() === data.value[j].email.trim()) {
          isCreate = false;
          commonStore.errorCodeSet({
            dialogVisible: true,
            dialogMessage: $t('tips.exits_email'),
          });
          flag = 1;
          break;
        }
        if (managers[i].id.trim() === data.value[j].id.trim()) {
          isCreate = false;
          commonStore.errorCodeSet({
            dialogVisible: true,
            dialogMessage: $t('tips.exits_id'),
          });
          flag = 1;
          break;
        }
      }
      if (flag) {
        break;
      }
    }
  }
  if (newManagers.length && isCreate) {
    let obj = { managers: newManagers };
    http({
      url: url.addEmployeeManager,
      method: 'post',
      data: obj,
    })
      .then((res) => {
        util.successMessage(this);
        setTimeout(() => {
          router.push('/managerList');
        }, 500);
      })
      .catch((err) => {
        util.catchErr(err, 'errorSet', this);
      });
  }
};
</script>

<style lang="scss">
@import '../assets/font/css/Roboto-Regular.css';

#createUser {
  .requireText {
    font-family: Roboto-Regular, sans-serif;
  }

  .requireText:before {
    content: '*';
    color: #f56c6c;
    margin-right: 4px;
  }

  & .el-dialog {
    border-radius: 1rem;
  }

  & .createUserBack {
    box-shadow: 0 0 20px 10px #f3f3f3;
    padding: 2rem;
    background-color: white;
    border-radius: 1rem;
  }

  & .el-input__inner {
    height: 3rem;
    background-color: #f3f3f3;
    border-radius: 1.5rem;
    border: 1px solid #f3f3f3;
    font-size: 1.2rem;
  }

  & #tabName {
    font-family: Roboto-Regular, sans-serif;
    font-size: 2rem;
    text-align: left;
  }

  & .emailRow {
    margin-bottom: 1rem;
  }

  & .submitBt {
    margin: 1rem 0;
    width: 10rem;
    height: 3rem;
    border-radius: 1.5rem;
    border: none;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    background: linear-gradient(to right, #97db30, #319e55);
  }

  & .submitBt:focus {
    outline: none;
  }

  & .add-button {
    width: 3rem;
    height: 3rem;
    border-radius: 1.5rem;
    border: none;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    background: linear-gradient(to right, #97db30, #319e55);
  }

  & .add-button:focus {
    outline: none;
  }

  & .deleteBt {
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

  & .deleteBt:focus {
    outline: none;
  }
}
</style>
