<template>
  <div id="linkedRepo">
    <div id="configBtDiv">
      <button class="button" @click="configCla()">
        {{ $t('org.configure_bt') }}
      </button>
    </div>
    <el-tabs v-model="activeName" @tab-click="tabsHandleClick">
      <el-tab-pane
        :label="$t('org.linked_tab')"
        name="first"
        class="margin-top-1rem"
      >
      </el-tab-pane>
    </el-tabs>
    <el-row :gutter="20" class="table-back">
      <el-col :span="5" class="orgTableStyle tableStyle">
        <el-table
          empty-text="No data"
          :data="orgTableData"
          align="center"
          class="tableClass"
          @cell-click="clickOrg"
          :row-class-name="tableRowClassName"
          style="width: 100%"
        >
          <el-table-column prop="Organization" :label="$t('org.organization')">
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="19" class="tableStyle">
        <el-table
          empty-text="No data"
          :data="boundTableData"
          class="tableClass"
          style="width: 100%"
        >
          <el-table-column
            min-width="40"
            prop="repo_id"
            :label="$t('org.repository')"
          >
            <template #default="scope">
              <svg-icon icon-class="repository" />
              <span
                class="pointer hoverUnderline"
                @click="checkCorporationList(scope.row)"
                style="margin-left: 10px"
                >{{ scope.row.org_id
                }}<span v-if="scope.row.repo_id"
                  >/{{ scope.row.repo_id }}</span
                ></span
              >
            </template>
          </el-table-column>
          <el-table-column
            min-width="30"
            prop="org_email"
            :label="$t('corp.email')"
          >
          </el-table-column>
          <el-table-column min-width="10" :label="$t('org.unlink')" width="100">
            <template #default="scope">
              <el-tooltip
                slot="reference"
                effect="dark"
                :content="$t('org.unlink')"
                placement="bottom"
              >
                <svg-icon
                  class="pointer"
                  icon-class="delete"
                  @click="unlinkHandleClick(scope)"
                />
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column min-width="10" :label="$t('org.operation')">
            <template #default="scope">
              <el-dropdown
                placement="bottom-start"
                trigger="hover"
                @command="menuCommand"
              >
                <span class="el-dropdown-link">
                  <svg-icon icon-class="operation"></svg-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      :command="{ command: 'a', row: scope.row }"
                    >
                      {{ $t('org.toSign') }}
                    </el-dropdown-item>
                    <el-dropdown-item
                      :command="{ command: 'b', row: scope.row }"
                    >
                      {{ $t('org.copy_address') }}
                    </el-dropdown-item>
                    <el-dropdown-item
                      :command="{ command: 'c', row: scope.row }"
                    >
                      {{ $t('org.toDetail') }}
                    </el-dropdown-item>
                    <!-- <el-dropdown-item :command="{command:'d',row:scope.row}">
                                        {{$t('org.modify_email')}}
                                    </el-dropdown-item> -->
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div class="paginationClass">
      <el-pagination
        background
        :page-size="5"
        :pager-count="5"
        :hide-on-single-page="true"
        :current-page="currentPage"
        @current-change="changePage"
        layout="prev, pager, next"
        :total="tableTotal"
      >
      </el-pagination>
    </div>
    <el-dialog title="" top="5vh" v-model="unLinkDialogVisible" width="35%">
      <div>
        <p class="dialogDesc">{{ $t('org.unlink_p') }}</p>
        <div style="padding: 0 6rem; text-align: left; font-size: 1.3rem">
          <p style="text-align: center">{{ $t('org.unlink_will') }}</p>
          <ul>
            <li>{{ $t('org.unlink_desc1') }}</li>
            <li>{{ $t('org.unlink_desc2') }}</li>
          </ul>
        </div>
        <div class="right">
          <el-button @click="unLinkDialogVisible = false">{{
            $t('corp.cancel')
          }}</el-button>
          <el-button type="danger" @click="unLinkRepositoryFun()">{{
            $t('org.unlink')
          }}</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      title="upload"
      top="5vh"
      v-model="uploadOrgDialogVisible"
      width="35%"
    >
      <div>
        <div class="left">
          <el-form v-model="form">
            <el-form-item label="" label-width="0">
              <el-upload
                name="signature_page"
                ref="uploadPdf"
                class="upload-demo"
                :action="uploadUrl"
                :headers="uploadHeaders"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :before-remove="beforeRemove"
                :auto-upload="false"
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="fileList"
              >
                <el-button slot="trigger" size="small" type="primary"
                  >{{ $t('org.select_file') }}
                </el-button>
                <el-button
                  style="margin-left: 10px"
                  size="small"
                  type="success"
                  @click="submitUpload"
                >
                  {{ $t('org.upload') }}
                </el-button>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>
    <ReLoginDialog
      :dialogVisible="reLoginDialogVisible"
      :message="reLoginMsg"
    ></ReLoginDialog>
    <ReTryDialog
      :dialogVisible="reTryVisible"
      :message="reLoginMsg"
    ></ReTryDialog>
    <ConfigEmailSelect
      :emailDialogVisible="emailDialogVisible"
      :modifyEmailLinkId="modifyEmailLinkId"
      @callback="getLinkedRepoList"
      @closeEmailDialog="closeEmailDialog"
    ></ConfigEmailSelect>
  </div>
</template>
<script setup lang="ts">
import * as url from '../util/api';
import * as util from '../util/util';
import http from '../util/http';
import _cookie from 'js-cookie';
import ReLoginDialog from '../components/ReLoginDialog.vue';
import ReTryDialog from '../components/ReTryDialog.vue';
import ConfigEmailSelect from './ConfigEmailSelect.vue';
import claConfig from '../lang/global';
import { computed, ref, onUpdated, inject } from 'vue';
import { useCommonStore } from '@/stores/common';
import { useRoute, useRouter } from 'vue-router';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n();
const $t = t;
const uploadPdf = ref();
const route = useRoute();
const router = useRouter();
const commonStore = useCommonStore();
const loading = ref(false);
const copyAddressValue = ref('');
const organization = ref('');
const signAddress = ref('');
const activeName = ref('first');
const clickRow = ref(0);
const tableData = ref([]);
const orgTableData = ref([]);
const boundTableData = ref([]);
// const url = ref('');
const pdfSrc = ref('');
const numPages = ref(undefined);
const docInfo = ref({});
const uploadHeaders = ref({
  Token: commonStore.access_token,
});
const uploadUrl = ref('');
const form = ref({ file: '' });
const fileList = ref([]);
const previewOriginalDialogVisible = ref(false);
const uploadOrgDialogVisible = ref(false);
const unlinkId = ref('');
const unLinkDialogVisible = ref(false);
const tableTotal = ref(0);
const currentPage = ref(1);
const emailDialogVisible = ref(false);
const modifyEmailLinkId = ref('');

const platform = computed(() => {
  return commonStore.platform.toLowerCase();
});
const reLoginDialogVisible = computed(() => {
  return commonStore.orgReLoginDialogVisible;
});
const reTryVisible = computed(() => {
  return commonStore.reTryDialogVisible;
});
const reLoginMsg = computed(() => {
  return commonStore.dialogMessage;
});
const address = computed(() => {
  return commonStore.domain;
});

const setClientHeight = inject('setClientHeight');

onUpdated(() => {
  setClientHeight();
});

const closeEmailDialog = (value) => {
  emailDialogVisible.value = value;
};
const menuCommand = (command) => {
  switch (command.command) {
    case 'a':
      toSignPage(command.row);
      break;
    case 'b':
      copyAddress(command.row);
      break;
    case 'c':
      checkCorporationList(command.row);
      break;
    case 'd':
      modifyEmail(command.row);
      break;
  }
};
const modifyEmail = (row) => {
  emailDialogVisible.value = true;
  modifyEmailLinkId.value = row.link_id;
};
const clearConfigSession = () => {
  util.clearSession();
  commonStore.setCorpItem('');
};
const configCla = () => {
  router.push('/bind-cla');
};
const tabsHandleClick = (tab, event) => {
  tab.index === '0'
    ? router.push('/linkedRepo')
    : router.push('/signedRepoLogin');
};
const tableRowClassName = ({ row, rowIndex }) => {
  if (row.Organization === organization.value) {
    return 'warning-row';
  }
  return '';
};
const getBoundTableData = () => {
  let newData = [];
  tableData.value.forEach((item, index) => {
    if (item.org_id === organization.value) {
      newData.push(item);
    }
  });
  boundTableData.value = newData;
};
const clickOrg = (row, column, cell, event) => {
  organization.value = row.Organization;
  getBoundTableData();
};
const getLinkedRepoList = () => {
  http({
    url: url.getLinkedRepoList,
  })
    .then((res) => {
      if (res.data.data && res.data.data.length) {
        let data = res.data.data;
        let count = res.data.data.length;
        data.forEach((item, index) => {
          new Promise((resolve, reject) => {
            let claName = getClaName(item.id);
            resolve(claName);
          }).then(
            (res) => {
              Object.assign(data[index], { claName: res });
              count--;
            },
            (err) => {}
          );
        });

        let setDataInterval = setInterval(() => {
          if (count === 0) {
            tableData.value = data;
            getOrgTableData(data);
            clearInterval(setDataInterval);
          }
        }, 20);
      } else {
        tableData.value = [];
        boundTableData.value = [];
        orgTableData.value = [];
      }
    })
    .catch((err) => {
      util.catchErr(err, 'setOrgReLogin', this);
    });
};
const getClaName = async (org_cla_id) => {
  if (org_cla_id) {
    let name = '';
    await http({
      url: `${url.getClaInfo}/${org_cla_id}/cla`,
    })
      .then((res) => {
        if (res.data && res.data.data && res.data.data.name) {
          name = res.data.data.name;
        }
      })
      .catch((err) => {
        util.catchErr(err, 'setOrgReLogin', this);
      });
    return name;
  }
};
const getOrgTableData = (data) => {
  let orgData = [];
  data.forEach((item, index) => {
    orgData.push({ Organization: item.org_id });
  });

  for (let i = 0; i < orgData.length; i++) {
    for (let j = i + 1; j < orgData.length; j++) {
      if (orgData[i].Organization === orgData[j].Organization) {
        orgData.splice(j, 1);
        j--;
      }
    }
  }
  orgTableData.value = orgData;
  orgTableData.value.length > 0
    ? (organization.value = orgTableData.value[0].Organization)
    : (organization.value = []);
  getBoundTableData();
};
const copyAddress = (row) => {
  let address = window.location.href.split('/linkedRepo')[0];
  let url = `${address}${claConfig.SIGN_ROUTER}/${row.link_id}`;
  let copyInput = document.createElement('input');
  copyInput.value = url;
  document.body.appendChild(copyInput);
  copyInput.select();
  document.execCommand('Copy');
  copyInput.className = 'copyInput';
  copyInput.style.display = 'none';
  document.body.removeChild(document.getElementsByClassName('copyInput')[0]);
};
const toSignPage = (row) => {
  let url = `${address.value}${claConfig.SIGN_ROUTER}/${row.link_id}`;
  window.open(url);
};
const submitUpload = () => {
  uploadPdf.value.submit();
};
const handleSuccess = (file, fileList) => {
  fileList.value = [];
  util.successMessage(this);
  uploadOrgDialogVisible.value = false;
};
const handleRemove = (file, fileList) => {
  ElMessage.closeAll();
  ElMessage.success(file);
};
const handleExceed = (files, fileList) => {
  ElMessage.warning(
    `Currently, 1 file is limited to be selected. ${
      files.length
    } files are selected this time, and a total of ${
      files.length + fileList.length
    } files are selected`
  );
};
const beforeRemove = (file, fileList) => {
  ElMessageBox.confirm(`Are you sure you want to remove ${file.name}？`);
};
const getCookieData = (resolve) => {
  if (document.cookie) {
    let cookieArr = document.cookie.split(';');
    let access_token,
      refresh_token,
      platform_token = '';
    cookieArr.forEach((item, index) => {
      let arr = item.split('=');
      let name = arr[0].trim();
      let value = arr[1].trim();
      if (name === 'refresh_token') {
        refresh_token = value;
      } else if (name === 'platform_token') {
        platform_token = value;
      } else if (name === 'access_token') {
        access_token = value;
      }
      // _cookie.remove(name, { path: '/' });
    });
    let data = { access_token, refresh_token, platform_token, resolve };
    commonStore.setToken(data);
  } else {
    resolve('complete');
  }
};
const unlinkHandleClick = (scope) => {
  unlinkId.value = scope.row.link_id;
  unLinkDialogVisible.value = true;
};
const checkCorporationList = (item) => {
  commonStore.setCorpItem({});
  commonStore.setCorpItem(item);
  router.push('/corporationList');
};
const newWindow = (repo) => {
  window.open(`https://gitee.com/${repo}`);
};

const unLinkRepositoryFun = () => {
  loading.value = util.getLoading(this, 'tips.loading');
  http({
    url: `${url.unLinkRepository}/${unlinkId.value}`,
    method: 'delete',
  })
    .then((res) => {
      loading.value.close();
      util.successMessage(this);
      unLinkDialogVisible.value = false;
      getLinkedRepoList();
    })
    .catch((err) => {
      loading.value.close();
      util.catchErr(err, 'setOrgReLogin', this);
    });
};
const changePage = (page) => {};
const setDomain = () => {
  let domain = window.location.href.split('/linkedRepo')[0];
  if (domain === window.location.href) {
    domain = window.location.href.split('/home')[0];
  }

  commonStore.setDomain(domain);
};
setDomain();
clearConfigSession();
new Promise((resolve, reject) => {
  getCookieData(resolve);
}).then((res) => {
  getLinkedRepoList();
});
</script>

<style lang="scss" scoped>
@import '../assets/font/css/Roboto-Bold.css';
@import '../assets/font/css/Roboto-Black.css';
@import '../assets/font/css/Roboto-Light.css';
@import '../assets/font/css/Roboto-Regular.css';
:deep(.el-dropdown-menu__item:not(.is-disabled):focus) {
  color: #319e55;
}
.el-popover {
  min-width: 6rem;

  .pdfBT {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    * {
      width: 6rem;
      margin: 0.2rem 0;
      text-align: center;
    }
  }
}

.tableClass {
  border: 1px solid black;
  border-radius: 1.5rem;
}

.el-table__body,
.el-table__footer,
.el-table__header {
  padding: 0;
  width: auto;
}

.el-table__body-wrapper {
  margin: 0 1rem;
}

.el-table__body tr:not(:last-of-type) td {
  border-bottom: 1px dashed lightgrey;
}

.el-table::before {
  height: 0;
}

.el-table__body-wrapper,
.el-table__footer-wrapper,
.el-table__header-wrapper {
  padding: 0;
  width: auto;
}

.el-table__footer-wrapper,
.el-table__header-wrapper {
  border-bottom: 1px solid black;
  border-radius: 1.5rem;
  padding: 0 1rem;
}

:deep(.el-tabs__active-bar) {
  background-color: #319e55;
}

:deep(.el-tabs__item.is-active) {
  color: #319e55;
}

.el-tabs__item:hover {
  color: #319e55;
}

:deep(.el-tabs__item) {
  font-size: 1rem;
}

#linkedRepo {
  .margin-top-1rem {
    margin-top: 1rem;
  }

  .button {
    font-family: Roboto-Regular, sans-serif;
    width: 15rem;
    height: 4rem;
    border-radius: 2rem;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    background: linear-gradient(to right, #97db30, #319e55);
    margin: 1.2rem 0;
  }

  .button:focus {
    outline: none;
  }

  :deep(.el-table .warning-row) {
    color: #319e55;
    font-weight: bold;
  }

  .table-back {
    background-color: white;
    margin-bottom: 2rem;
  }

  .tableStyle {
    margin-bottom: 2rem;
    padding: 3rem;
    background-color: white;
    border-radius: 1.5rem;
  }

  & .cancelBt {
    width: 5rem;
    height: 2rem;
    border-radius: 1rem;
    border: 1px solid black;
    color: black;
    font-size: 1rem;
    cursor: pointer;
    background-color: white;
    margin-left: 1rem;
  }

  & .cancelBt:focus {
    outline: none;
  }

  & .deleteBt {
    margin-left: 1rem;
    width: 5rem;
    height: 2rem;
    border-radius: 1rem;
    border: none;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    background: linear-gradient(to right, #ff9d58, #e22424);
  }

  & .deleteBt:focus {
    outline: none;
  }

  .orgTableStyle {
    cursor: pointer;
  }

  .paginationClass {
    text-align: center;
    margin-bottom: 1rem;
  }

  .el-dropdown-link {
    cursor: pointer;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  .hoverUnderline:hover {
    text-decoration: underline;
  }

  .qusLink {
    text-decoration: underline;
    font-size: 0.8rem;
    cursor: pointer;
  }

  .left {
    text-align: left;
  }

  .right {
    text-align: right;
  }

  .size_b {
    font-size: 1.3rem;
  }

  .size_m {
    font-size: 1rem;
    text-align: left;
  }

  .pointer {
    cursor: pointer;
  }

  .dialogDesc {
    font-size: 1.2rem;
    margin: 2rem 0;
    text-align: center;
  }

  li {
    margin: 1rem 0;
  }

  #configBtDiv {
    text-align: left;
    padding-top: 3rem;
    margin-bottom: 2rem;
  }
}
:deep(.el-table .el-table__cell) {
  padding: 12px 0;
}
:deep(.el-dialog) {
  border-radius: 1rem;
  li {
    list-style-type: disc;
    list-style-position: inside;
  }
  .el-button {
    padding: 15px 20px;
  }
}
:deep(.el-table__header-wrapper) {
  width: auto;
}
:deep(.el-table--fit) {
  border-right: 1px solid;
  border-bottom: 1px solid;
}
</style>
