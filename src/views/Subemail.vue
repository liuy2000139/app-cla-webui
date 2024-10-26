<template>
  <el-row>
    <el-col>
      <p class="tabName">{{ $t('header.SubEmail') }}</p>
      <el-row class="tableBox">
        <el-col>
          <el-row>
            <el-col align="left">
              <button class="create_button" @click="addSubEmail">
                {{ $t('corp.addSubEmail') }}
              </button>
            </el-col>
          </el-row>
          <el-row>
            <el-table
              :empty-text="$t('corp.no_data')"
              class="tableClass"
              :data="tableData"
            >
              <el-table-column prop="id" :label="$t('corp.number')">
              </el-table-column>
              <el-table-column prop="email" :label="$t('header.SubEmail')">
              </el-table-column>
            </el-table>
          </el-row>
        </el-col>
      </el-row>
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
import corpReLoginDialog from '../components/CorpReLoginDialog.vue';
import reTryDialog from '../components/ReTryDialog.vue';
import * as util from '../util/util';

import { ref, computed, inject, onUpdated, onMounted, watch } from 'vue';
import { useCommonStore } from '../stores/common';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const { t, locale } = useI18n();
const $t = t;
const commonStore = useCommonStore();
const router = useRouter();

const corpReLoginDialogVisible = computed(() => {
  return commonStore.dialogVisible;
});
const corpReLoginMsg = computed(() => {
  return commonStore.dialogMessage;
});
const corpReTryDialogVisible = computed(() => {
  return commonStore.reTryDialogVisible;
});

const tableData = ref([]);

const addSubEmail = () => {
  router.push('add-subemail');
};
const getEmails = () => {
  http({
    url: url.addSubEmail,
  })
    .then((res) => {
      let data = res.data.data;
      commonStore.setEmailSuffix(data);
      let newData = [];
      data.forEach((item, index) => {
        newData.push({ id: index + 1, email: item });
      });
      tableData.value = newData;
    })
    .catch((err) => {
      util.catchErr(err, 'errorSet', this);
    });
};

getEmails();
</script>

<style scoped lang="scss">
@import '../assets/font/css/Roboto-Regular.css';
:deep(.el-table .el-table__cell) {
  padding: 12px 0;
}
:deep(.el-table--fit) {
  border-right: 1px solid;
  border-bottom: 1px solid;
}
</style>
