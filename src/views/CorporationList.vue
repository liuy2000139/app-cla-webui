<template>
  <div id="corporationList">
    <el-tabs
      v-model="activeName"
      type="border-card"
      @tab-click="tabsHandleClick"
    >
      <el-tab-pane
        :label="$t('org.signed_corporation')"
        name="first"
        class="margin-top-1rem"
      >
        <el-tabs v-model="corpActiveName" @tab-click="corpTabsHandleClick">
          <el-tab-pane
            :label="$t('org.not_complete')"
            name="first"
            class="margin-top-1rem"
          >
            <div class="tableStyle">
              <el-table
                :empty-text="$t('corp.no_data')"
                :data="signedNotCompleted"
                align="center"
                :row-class-name="createdAdmin"
                class="tableClass"
                style="width: 100%"
              >
                <el-table-column
                  min-width="20"
                  prop="corporation_name"
                  :label="$t('org.corporation_name')"
                >
                </el-table-column>
                <el-table-column
                  min-width="15"
                  prop="admin_name"
                  :label="$t('org.config_cla_field_corp_default_title1')"
                >
                </el-table-column>
                <el-table-column
                  min-width="25"
                  prop="admin_email"
                  :label="$t('org.to_email')"
                >
                </el-table-column>
                <el-table-column
                  min-width="10"
                  prop="cla_language"
                  :label="$t('org.cla_language')"
                >
                </el-table-column>
                <el-table-column
                  min-width="10"
                  prop="date"
                  :label="$t('org.date')"
                >
                </el-table-column>
                <el-table-column min-width="10">
                  <template slot="header" #default="scope">
                    <el-tooltip
                      effect="dark"
                      :content="$t('org.corp_signed_pdf')"
                      placement="top"
                    >
                      <span>PDF</span>
                    </el-tooltip>

                    <!-- <template #reference> -->
                    <el-popover width="80" trigger="hover" placement="right">
                      <div class="menuBT">
                        <el-button
                          @click="uploadClaFile(scope.row)"
                          size="mini"
                        >
                          {{ $t('org.upload') }}
                        </el-button>
                        <el-button
                          v-if="scope.row.pdf_uploaded"
                          @click="downloadClaFile(scope.row)"
                          size="mini"
                          >{{ $t('org.download') }}
                        </el-button>
                        <el-button
                          v-if="scope.row.pdf_uploaded"
                          @click="previewClaFile(scope.row)"
                          type=""
                          size="mini"
                          >{{ $t('org.preview') }}
                        </el-button>
                      </div>
                      <svg-icon
                        slot="reference"
                        class="pointer"
                        icon-class="pdf"
                        @click=""
                      />
                    </el-popover>
                    <!-- </template> -->
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
                            :disabled="scope.row.admin_added"
                            :command="{ command: 'a', row: scope.row }"
                          >
                            {{ $t('org.create_administrator') }}
                          </el-dropdown-item>
                          <el-dropdown-item
                            :disabled="scope.row.pdf_uploaded"
                            :command="{ command: 'b', row: scope.row }"
                          >
                            {{ $t('org.resend_email') }}
                          </el-dropdown-item>
                          <el-dropdown-item
                            :disabled="scope.row.admin_added"
                            :command="{ command: 'c', row: scope.row }"
                          >
                            {{ $t('corp.delete') }}
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane
            :label="$t('org.complete')"
            name="second"
            class="margin-top-1rem"
          >
            <div class="tableStyle">
              <el-table
                :empty-text="$t('corp.no_data')"
                :data="signedCompleted"
                class="tableClass"
                :row-class-name="createdAdmin"
                align="center"
                style="width: 100%"
              >
                <el-table-column
                  min-width="20"
                  prop="corporation_name"
                  :label="$t('org.corporation_name')"
                >
                </el-table-column>
                <el-table-column
                  min-width="15"
                  prop="admin_name"
                  :label="$t('org.config_cla_field_corp_default_title1')"
                >
                </el-table-column>
                <el-table-column
                  min-width="25"
                  prop="admin_email"
                  :label="$t('org.to_email')"
                >
                </el-table-column>
                <el-table-column
                  min-width="10"
                  prop="cla_language"
                  :label="$t('org.cla_language')"
                >
                </el-table-column>
                <el-table-column
                  min-width="10"
                  prop="date"
                  :label="$t('org.date')"
                >
                </el-table-column>
                <el-table-column min-width="10" >
                  <template #header>
                    <el-tooltip
                      effect="dark"
                      :content="$t('org.corp_signed_pdf')"
                      placement="top"
                    >
                      <span>PDF</span>
                    </el-tooltip>
                  </template>
                  <template #default="scope">
                    <el-popover width="80" trigger="hover" placement="right">
                      <div class="menuBT">
                        <el-button
                          @click="uploadClaFile(scope.row)"
                          size="mini"
                        >
                          {{ $t('org.upload') }}
                        </el-button>
                        <el-button
                          v-if="scope.row.pdf_uploaded"
                          @click="downloadClaFile(scope.row)"
                          size="mini"
                          >{{ $t('org.download') }}
                        </el-button>
                        <el-button
                          v-if="scope.row.pdf_uploaded"
                          @click="previewClaFile(scope.row)"
                          type=""
                          size="mini"
                          >{{ $t('org.preview') }}
                        </el-button>
                      </div>
                      <template #reference>
                        <svg-icon class="pointer" icon-class="pdf" @click=""
                      /></template>
                    </el-popover>
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
                            :disabled="scope.row.admin_added"
                            :command="{ command: 'a', row: scope.row }"
                          >
                            {{ $t('org.create_administrator') }}
                          </el-dropdown-item>
                          <el-dropdown-item
                            :disabled="scope.row.pdf_uploaded"
                            :command="{ command: 'b', row: scope.row }"
                          >
                            {{ $t('org.resend_email') }}
                          </el-dropdown-item>
                          <el-dropdown-item
                            :disabled="scope.row.admin_added"
                            :command="{ command: 'c', row: scope.row }"
                          >
                            {{ $t('corp.delete') }}
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <!-- <el-tab-pane
            :label="$t('org.invalidSignature')"
            name="third"
            class="margin-top-1rem"
          >
            <div class="tableStyle">
              <el-table
                :empty-text="$t('corp.no_data')"
                :data="deletedCorpInfo"
                align="center"
                class="tableClass"
                style="width: 100%"
              >
                <el-table-column
                  min-width="25"
                  prop="corporation_name"
                  :label="$t('org.corporation_name')"
                >
                </el-table-column>
                <el-table-column
                  min-width="15"
                  prop="admin_name"
                  :label="$t('org.config_cla_field_corp_default_title1')"
                >
                </el-table-column>
                <el-table-column
                  min-width="25"
                  prop="admin_email"
                  :label="$t('org.to_email')"
                >
                </el-table-column>
                <el-table-column
                  min-width="15"
                  prop="cla_language"
                  :label="$t('org.cla_language')"
                >
                </el-table-column>
                <el-table-column
                  min-width="10"
                  prop="date"
                  :label="$t('org.date')"
                >
                </el-table-column>
                <el-table-column min-width="10" :label="$t('org.operation')">
                  <template slot-scope="scope">
                    <el-dropdown
                      placement="bottom-start"
                      trigger="hover"
                      @command="menuCommand"
                    >
                      <span class="el-dropdown-link">
                        <svg-icon icon-class="operation"></svg-icon>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                          disabled=""
                          :command="{ command: 'd', row: scope.row }"
                        >
                          {{ $t('org.reduction') }}
                        </el-dropdown-item>
                        <el-dropdown-item
                          disabled=""
                          :command="{ command: 'e', row: scope.row }"
                        >
                          {{ $t('org.deleteCompletely') }}
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane> -->
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane
        :label="$t('org.individual_cla')"
        name="second"
        class="margin-top-1rem"
      >
        <div class="tableStyle">
          <el-table
            v-if="individualClaData.length"
            :empty-text="$t('corp.no_data')"
            :data="individualClaData"
            class="tableClass"
            align="center"
            style="width: 100%"
          >
            <el-table-column min-width="60" prop="url" label="Url">
              <template #default="scope">
                <span class="hoverUnderline" @click="checkUrl(scope.row.url)">{{
                  scope.row.url
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              min-width="20"
              prop="language"
              :label="$t('org.toLanguage')"
            >
            </el-table-column>
            <el-table-column
              min-width="20"
              prop=""
              :label="$t('org.operation')"
            >
              <template #default="scope">
                <el-dropdown placement="bottom-start" trigger="hover">
                  <span class="el-dropdown-link">
                    <svg-icon icon-class="operation"></svg-icon>
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu slot="dropdown">
                      <!--<el-dropdown-item>{{$t('org.modify_field')}}</el-dropdown-item>-->
                      <el-dropdown-item
                        @click.native="clickDeleteCla(scope.row, 'individual')"
                      >
                        {{ $t('org.delete_cla') }}
                      </el-dropdown-item>
                      <el-dropdown-item
                        @click.native="addIndividualCla(scope.row)"
                      >
                        {{ $t('org.add_cla_for_other_language') }}
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
          <el-button v-else @click="createIndividualCla">{{
            $t('org.addIndividualCla')
          }}</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane
        :label="$t('org.corporation_cla')"
        name="third"
        class="margin-top-1rem"
      >
        <div class="tableStyle">
          <el-table
            v-if="corpClaData.length"
            :empty-text="$t('corp.no_data')"
            :data="corpClaData"
            align="center"
            class="tableClass"
            style="width: 100%"
          >
            <el-table-column min-width="60" prop="url" label="Url">
              <template #default="scope">
                <span class="hoverUnderline" @click="checkUrl(scope.row.url)">{{
                  scope.row.url
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              min-width="20"
              prop="language"
              :label="$t('org.toLanguage')"
            >
            </el-table-column>
            <el-table-column min-width="20" :label="$t('org.operation')">
              <template #default="scope">
                <el-dropdown placement="bottom-start" trigger="hover">
                  <span class="el-dropdown-link">
                    <svg-icon icon-class="operation"></svg-icon>
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        @click.native="clickDeleteCla(scope.row, 'corporation')"
                      >
                        {{ $t('org.delete_cla') }}
                      </el-dropdown-item>
                      <el-dropdown-item @click.native="addCorpCla(scope.row)">
                        {{ $t('org.add_cla_for_other_language') }}
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
          <el-button v-else @click="createCorpCla">{{
            $t('org.addCorpCla')
          }}</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      :title="$t('org.upload_file')"
      top="5vh"
      :visible.sync="uploadDialogVisible"
      width="35%"
    >
      <div>
        <div class="left">
          <el-form v-model="form">
            <el-form-item label="" label-width="0">
              <el-upload
                name="pdf"
                ref="uploadPdf"
                class="upload-demo"
                action=""
                :multiple="false"
                :headers="uploadHeaders"
                :http-request="upload"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :auto-upload="false"
                :on-change="handleChange"
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="fileList"
              >
                <el-button slot="trigger" size="small" type="primary">{{
                  $t('org.select')
                }}</el-button>
                <el-button
                  style="margin-left: 10px"
                  size="small"
                  type="success"
                  @click="submitUpload"
                >
                  {{ $t('org.upload') }}
                </el-button>
                <div slot="tip" class="el-upload__tip">
                  {{
                    $t('org.signature_file_size', {
                      max_size_m: file_size,
                    })
                  }}
                </div>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>
    <el-dialog top="5vh" :visible.sync="resendEmailDialogVisible" width="20%">
      <div class="dialogContent">
        {{ $t('org.resend_email_message') }}
        <div class="dialogBtBox">
          <button class="button_submit" @click="resendPDF">
            {{ $t('corp.yes') }}
          </button>
          <button class="cancelBt" @click="resendEmailDialogVisible = false">
            {{ $t('corp.no') }}
          </button>
        </div>
      </div>
    </el-dialog>
    <DeleteDialog
      :deleteMessage="deleteMessage"
      :deleteVisible="deleteCorpVisible"
      @delete="submitDeleteCorp"
      @cancel="cancelDeleteCorp"
    ></DeleteDialog>
    <DeleteDialog
      :deleteMessage="deleteMessage"
      :deleteVisible="deleteVisible"
      @delete="submitDeleteCla"
      @cancel="cancelDeleteCla"
    ></DeleteDialog>
    <DeleteDialog
      :deleteMessage="completeDeleteMessage"
      :deleteVisible="deleteCompleteVisible"
      @delete="submitDeleteCorpComplete"
      @cancel="cancelDeleteCorpComplete"
    ></DeleteDialog>
    <ReTryDialog
      :dialogVisible="reTryDialogVisible"
      :message="reLoginMsg"
    ></ReTryDialog>
    <ReLoginDialog
      :dialogVisible="reLoginDialogVisible"
      :message="reLoginMsg"
    ></ReLoginDialog>
  </div>
</template>
<script setup lang="ts">
import * as url from '../util/api';
import * as util from '../util/util';
import http from '../util/http';
import ReLoginDialog from '../components/ReLoginDialog.vue';
import ReTryDialog from '../components/ReTryDialog.vue';
import DeleteDialog from '../components/DeleteDialog.vue';
import claConfig from '../lang/global';
import { saveAs } from 'file-saver';
import { ref, computed, inject, onMounted, onUpdated } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCommonStore } from '../stores/common';
import { useI18n } from 'vue-i18n';
import { ElMessage, ElMessageBox } from 'element-plus';

const route = useRoute();
const router = useRouter();
const commonStore = useCommonStore();
const { t, locale } = useI18n();
const $t = t;
const uploadPdf = ref();
const completeDeleteMessage = computed(() => {
  return $t('corp.completeDeleteTips');
});
const deleteMessage = computed(() => {
  return $t('corp.deleteTips');
});
const platform = computed(() => {
  return commonStore.platform.toLowerCase();
});
const reLoginDialogVisible = computed(() => {
  return commonStore.dialogVisible;
});
const reTryDialogVisible = computed(() => {
  return commonStore.reTryDialogVisible;
});
const reLoginMsg = computed(() => {
  return commonStore.dialogMessage;
});

const signedCompleted = ref([]);
const signedNotCompleted = ref([]);
const deletedCorpInfo = ref([]);
const corpActiveName = ref('first');
const deleteCompleteVisible = ref(false);
const invalidSignatureData = ref([]);
const deleteCorpVisible = ref(false);
const deleteCorpEmail = ref('');
const delete_apply = ref('');
const deleteRow = ref('');
const deleteVisible = ref(false);
const file_size = ref(claConfig.SIGNATURE_FILE_MAX_SIZE);
const uploadLoading = ref(false);
const individualClaData = ref([]);
const corpClaData = ref([]);
const previewOriginalDialogVisible = ref(false);
const resendEmailDialogVisible = ref(false);
const resendEmail = ref('');
const claData = ref('');
const activeName = ref('first');
const uploadHeaders = ref({
  Token: commonStore.access_token,
});
const uploadUrl = ref('');
const access_token = ref(commonStore.access_token);
const refresh_token = ref(commonStore.refresh_token);
const docInfo = ref({});
const previewDialogVisible = ref(false);
const form = ref({ file: '' });
const fileList = ref([]);
const uploadDialogVisible = ref(false);
const item = ref('');
const currentPage = ref(1);
const tableTotal = ref(0);

const setClientHeight = inject('setClientHeight');
const sortDate = (dataArr) => {
  if (!(dataArr && dataArr.length)) {
    return;
  }
  dataArr.forEach((item) => {
    let dateNum = parseInt(item.date.replace(/-/g, ''));
    Object.assign(item, { dateNum: dateNum });
  });
  for (let i = 0; i < dataArr.length; i++) {
    for (let j = i + 1; j < dataArr.length; j++) {
      if (dataArr[i].dateNum < dataArr[j].dateNum) {
        let data = dataArr[i];
        dataArr[i] = dataArr[j];
        dataArr[j] = data;
      }
    }
  }
};
const submitDeleteCorpComplete = () => {
  deleteCompleteVisible.value = false;
};
const cancelDeleteCorpComplete = () => {
  deleteCompleteVisible.value = false;
};
const submitDeleteCorp = () => {
  deleteCorpVisible.value = false;
  deleteCorp(deleteCorpEmail.value);
};
const cancelDeleteCorp = () => {
  deleteCorpVisible.value = false;
};
const submitDeleteCla = () => {
  deleteVisible.value = false;
  deleteCla(deleteRow.value);
};
const cancelDeleteCla = () => {
  deleteVisible.value = false;
};
const clickDeleteCla = (row, apply_to) => {
  delete_apply.value = apply_to;
  deleteRow.value = row;
  deleteVisible.value = true;
};
const deleteCla = (row) => {
  http({
    url: `${url.delCla}/${commonStore.corpItem.link_id}/${row.cla_id}`,
    method: 'delete',
  })
    .then((res) => {
      util.successMessage(this);
      if (delete_apply.value === 'individual') {
        getIndividualClaInfo();
      } else if (delete_apply.value === 'corporation') {
        getCorpClaInfo();
      }
    })
    .catch((err) => {
      util.catchErr(err, 'errorSet', this);
    });
};
const createdAdmin = (param) => {
  if (param.row.admin_added) {
    return 'mark-row-green';
  } else if (param.row.pdf_uploaded) {
    return 'mark-row-orange';
  }
};
const createCorpCla = () => {
  commonStore.setAddBindFirst(true);
  setCheckInfo();
  router.push('/addCorpCla');
};
const createIndividualCla = () => {
  commonStore.setAddBindFirst(true);
  setCheckInfo();
  router.push('/addIndividualCla');
};
const addIndividualCla = (row) => {
  router.push('/addIndividualCla');
  setIndividualPD(row);
};
const setIndividualPD = (row) => {
  setCheckInfo();
  if (row.fields.length > 2) {
    let data = [];
    row.fields.forEach((item, index) => {
      if (index > 1) {
        let field = {};
        for (let key in item) {
          if (key !== 'id') {
            Object.assign(field, { [key]: item[key] });
          }
        }
        data.push(field);
      }
    });
    commonStore.setIndividualCustomMetadataArr(data);
  }
};
const addCorpCla = (row) => {
  commonStore.setAddBindFirst(true);
  setCorpPD(row);
  router.push('/addCorpCla');
};
const setCheckInfo = () => {
  commonStore.setBindType('add-bind');
  commonStore.setChooseOrg(commonStore.corpItem.org_id);
  commonStore.setRepo(commonStore.corpItem.repo_id);
  commonStore.setOrgAlias(commonStore.corpItem.org_alias);
  commonStore.setEmail(commonStore.corpItem.org_email);
};
const setCorpPD = (row) => {
  setCheckInfo();
  if (row.fields?.length > 4) {
    let data = [];
    row.fields.forEach((item, index) => {
      if (index > 3) {
        let field = {};
        for (let key in item) {
          if (key !== 'id') {
            Object.assign(field, { [key]: item[key] });
          }
        }
        data.push(field);
      }
    });
    commonStore.setCorporationCustomMetadataArr(data);
  }
};
const checkUrl = (url) => {
  window.open(url);
};
const corpTabsHandleClick = (tab, event) => {
  if (tab.index === '2') {
    getDeletedCorpInfo();
  }
};
const tabsHandleClick = (tab, event) => {
  if (tab.index === '0') {
    getCorporationInfo();
  } else if (tab.index === '1') {
    getIndividualClaInfo();
  } else if (tab.index === '2') {
    getCorpClaInfo();
  } else if (tab.index === '3') {
    getDeletedCorpInfo();
  }
};
const getCorpClaInfo = () => {
  let link_id = commonStore.corpItem.link_id;
  http({
    url: `${url.getCla}/${link_id}`,
  })
    .then((res) => {
      if (res.data && res.data.data.corp_clas) {
        corpClaData.value = res.data.data.corp_clas;
      }
    })
    .catch((err) => {
      util.catchErr(err, 'errorSet', this);
    });
};
const getIndividualClaInfo = () => {
  let link_id = commonStore.corpItem.link_id;
  http({
    url: `${url.getCla}/${link_id}`,
  })
    .then((res) => {
      if (res && res.data.data) {
        individualClaData.value = res.data.data.individual_clas;
      }
    })
    .catch((err) => {
      util.catchErr(err, 'errorSet', this);
    });
};
const getCorporationInfo = () => {
  console.log(commonStore.corpItem);
  http({
    url: `${url.getCorporationSigning}/${commonStore.corpItem.link_id}`,
  })
    .then((resp) => {
      if (resp.data.data && resp.data.data.length) {
        let tableData = resp.data.data;
        signedCompleted.value = [];
        signedNotCompleted.value = [];
        tableData.forEach((item) => {
          if (item.admin_added) {
            signedCompleted.value.push(item);
          } else {
            signedNotCompleted.value.push(item);
          }
        });
        sortDate(signedCompleted.value);
        sortDate(signedNotCompleted.value);
      }
    })
    .catch((err) => {
      util.catchErr(err, 'errorSet', this);
    });
};
const getDeletedCorpInfo = () => {
  http({
    url: `${url.getDeletedCorpInfo}/${commonStore.corpItem.link_id}`,
  })
    .then((resp) => {
      deletedCorpInfo.value = resp.data.data;
      sortDate(deletedCorpInfo.value);
    })
    .catch((err) => {
      util.catchErr(err, 'errorSet', this);
    });
};
const previewClaFile = (row) => {
  http({
    url: `${url.corporationPdf}/${commonStore.corpItem.link_id}/${row.id}`,
    responseType: 'blob',
  })
    .then((res) => {
      if (res && res.data) {
        let blob = new Blob([res.data], { type: 'application/pdf' });
        let url = window.URL.createObjectURL(blob);
        window.open(
          `../../static/pdf_source/web/viewer.html?file=${encodeURIComponent(
            url
          )}`
        );
      }
    })
    .catch((err) => {
      util.catchErr(err, 'errorSet', this);
    });
};
const downloadClaFile = (row) => {
  http({
    url: `${url.corporationPdf}/${commonStore.corpItem.link_id}/${row.id}`,
    responseType: 'blob',
  })
    .then((res) => {
      if (res.data) {
        let time = util.getNowDateToTime();
        const blob = new Blob([res.data], { type: 'application/pdf' });
        saveAs(blob, `${row.corporation_name}_signature${time}.pdf`);
      } else {
        commonStore.errorCodeSet({
          dialogVisible: true,
          dialogMessage: $t('tips.not_upload_file'),
        });
      }
    })
    .catch((err) => {
      util.catchErr(err, 'errorSet', this);
    });
};
const uploadClaFile = (row) => {
  uploadUrl.value = `${url.corporationPdf}/${commonStore.corpItem.link_id}/${row.id}`;
  uploadDialogVisible.value = true;
};
const upload = (fileObj) => {
  const formData = new FormData();
  let file = fileObj.file;
  formData.append('pdf', file);
  formData.append('type', file.type);
  http({
    url: uploadUrl.value,
    method: 'post',
    data: formData,
  })
    .then((res) => {
      uploadPdf.clearFiles();
      clearFileList();
      uploadLoading.value.close();
      uploadDialogVisible.value = false;
      util.successMessage(this);
      getCorporationInfo();
    })
    .catch((err) => {
      uploadLoading.value.close();
      util.catchErr(err, 'errorSet', this);
      uploadLoading.value.close();
    });
};
const submitUpload = () => {
  if (fileList.value.length) {
    uploadLoading.value = util.getLoading(this, 'org.upload_loading_text');
    uploadPdf.submit();
  } else {
    ElMessage.closeAll();
    ElMessage.error($t('tips.select_file'));
  }
};
const handleChange = (file, fileList) => {
  let max_size = file_size.value * 1024 * 1024;
  if (/.(PDF|pdf)$/.test(file.name)) {
    if (file.size < max_size) {
      fileList.value.push(file);
    } else {
      for (let i = 0; i < fileList.length; i++) {
        fileList.splice(i, 1);
        i--;
      }
      commonStore.errorCodeSet({
        dialogVisible: true,
        dialogMessage: $t('tips.file_too_large'),
      });
    }
  } else {
    for (let i = 0; i < fileList.length; i++) {
      fileList.splice(i, 1);
      i--;
    }
    commonStore.errorCodeSet({
      dialogVisible: true,
      dialogMessage: $t('tips.not_pdf'),
    });
  }
};
const handleRemove = (file, fileList) => {
  fileList.value.splice(0, 1);
};
const clearFileList = () => {
  for (let i = 0; i < fileList.value.length; i++) {
    fileList.value.splice(0, 1);
    i--;
  }
};
const handleExceed = (files, fileList) => {
  ElMessage.warning($t('org.file_limit_tips'));
};
const beforeRemove = (file, fileList) => {
  return ElMessageBox.confirm(
    $t('org.remove_file_tips', { fileName: file.name }),
    {
      cancelButtonText: $t('org.cancel_remove'),
      confirmButtonText: $t('org.confirm_remove'),
    }
  );
};
const openResendPdf = (row) => {
  resendEmail.value = row;
  resendEmailDialogVisible.value = true;
};
const openDeleteCorp = (row) => {
  deleteCorpEmail.value = row;
  deleteCorpVisible.value = true;
};
const resendPDF = () => {
  let row = resendEmail.value;
  let resend_url = '';
  resend_url = `${url.resend_pdf}/${commonStore.corpItem.link_id}/${row.id}`;
  http({
    url: resend_url,
    method: 'put',
  })
    .then((res) => {
      resendEmailDialogVisible.value = false;
      util.successMessage(this);
    })
    .catch((err) => {
      util.catchErr(err, 'errorSet', this);
    });
};
const menuCommand = (command) => {
  switch (command.command) {
    case 'a':
      createRoot(command.row);
      break;
    case 'b':
      openResendPdf(command.row);
      break;
    case 'c':
      openDeleteCorp(command.row);
      break;
    case 'd':
      reductionCorp(command.row);
      break;
    case 'e':
      deleteCompletely(command.row);
      break;
  }
};
const deleteCompletely = (email) => {
  deleteCompleteVisible.value = true;
};
const reductionCorp = (row) => {
  http({
    url: `${url.corporationManager}/${commonStore.corpItem.link_id}/${row.id}`,
    method: 'patch',
  })
    .then((res) => {
      util.successMessage(this);
      getCorporationInfo();
    })
    .catch((err) => {
      util.catchErr(err, 'errorSet', this);
    });
};
const deleteCorp = (row) => {
  deleteCorpVisible.value = false;
  http({
    url: `${url.corporation_signing}/${commonStore.corpItem.link_id}/${row.id}`,
    method: 'delete',
  })
    .then((res) => {
      util.successMessage(this);
      getCorporationInfo();
    })
    .catch((err) => {
      util.catchErr(err, 'errorSet', this);
    });
};
const createRoot = (row) => {
  http({
    url: `${url.corporationManager}/${commonStore.corpItem.link_id}/${row.id}`,
    method: 'post',
  })
    .then((res) => {
      util.successMessage(this);
      getCorporationInfo();
    })
    .catch((err) => {
      util.catchErr(err, 'errorSet', this);
    });
};

util.clearSession(this);
getCorporationInfo();
onMounted(() => {
  setClientHeight();
});
onUpdated(() => {
  setClientHeight();
});
</script>

<style lang="scss" scoped>
#corporationList {
  padding-top: 3rem;

  .margin-top-1rem {
    margin-top: 1rem;
  }

  #pop {
    position: relative;
    text-align: center;
    z-index: 9;

    canvas {
      margin: 20px auto;
      display: block;
    }
  }

  #pop {
    position: relative;
    text-align: center;
    z-index: 9;

    canvas {
      margin: 20px auto;
      display: block;
    }
  }

  .dialogContent {
    text-align: center;
  }

  .dialogBtBox {
    margin-top: 2rem;
  }

  .el-button.is-disabled,
  .el-button.is-disabled:focus,
  .el-button.is-disabled:hover {
    cursor: pointer;
  }

  .el-popover {
    min-width: 7rem;
  }

  .mySwitch .el-switch__label {
    position: absolute;
    display: none;
    color: #fff;
  }

  .mySwitch .el-switch__label--right {
    z-index: 1;
    right: 0.5rem;
  }

  .mySwitch .el-switch__label--left {
    z-index: 1;
    left: 0.5rem;
  }

  .mySwitch .el-switch__label.is-active {
    display: block;
  }

  .mySwitch.el-switch .el-switch__core,
  .el-switch .el-switch__label {
    width: 4rem !important;
  }

  .mySwitch .el-switch.is-disabled .el-switch__core,
  .mySwitch .el-switch.is-disabled .el-switch__label,
  .tableStyle {
    cursor: pointer;
  }

  .tableStyle {
    margin-bottom: 2rem;
    padding: 3rem;
    background-color: white;
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

  .disableClass {
    margin-top: 2rem;
    text-align: center;
    height: 3rem;
    background-color: #acd7e6;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

.el-popover {
  min-width: 6rem;

  .menuBT {
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
</style>
