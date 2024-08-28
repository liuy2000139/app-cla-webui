<template>
  <div id="signedRepo" :style="section">
    <Header></Header>
    <div>
      <div id="signedRepo_section" class="padding-top-bottom-2rem">
        <router-view></router-view>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script setup lang="ts">
import * as url from '../util/api';
import * as util from '../util/util';
import axios from 'axios';
import Header from '@/components/NewHeader.vue';
import Footer from '@/components/NewFooter.vue';

import { ref, computed, inject, onUpdated, onMounted ,nextTick} from 'vue';
import { useCommonStore } from '../stores/common';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const { t, locale } = useI18n();
const $t = t;
const commonStore = useCommonStore();
const router = useRouter();

window.onresize = () => {
  if (
    util.getClientHeight() > document.getElementById('signedRepo').offsetHeight
  ) {
    document.getElementById('signedRepo').style.height =
      util.getClientHeight() + 'px';
  }
};

const user = ref(commonStore.loginInfo);

const active = ref('first');
const section = ref({
  height: '',
});
const deleteId = ref('');
const listDialogVisible = ref(false);
const tableDataOther = ref([
  {
    repository: 'ooo',
    cla: 'test',
    sharedGist: 'Yes',
    contributors: '0',
  },
]);
const tableTotal = ref(0);
const currentPage = ref(1);
const inactiveData = ref([
  { id: 0, name: 'jack', email: '10577507@qq.com', isUsed: false },
  {
    id: 1,
    name: 'Rose',
    email: '105507@163.com',
    isUsed: false,
  },
]);
const activeData = ref([
  { id: 0, name: 'tom', email: '10577507@qq.com', isUsed: true },
  {
    id: 1,
    name: 'helen',
    email: '105507@163.com',
    isUsed: true,
  },
]);

const changeActive = (id, active) => {
  let data = { id: id, active: active };
  axios({
    url: `/api${url.changeActive}`,
    method: 'post',
    data: data,
  })
    .then((res) => {})
    .catch((err) => {
      ElMessage.closeAll();
      ElMessage.error(err.response.data);
    });
};
const deleteContributor = () => {
  axios({
    url: `/api${url.deleteCon}/${deleteId.value}`,
    method: 'delete',
  })
    .then((res) => {})
    .catch((err) => {
      ElMessage.closeAll();
      ElMessage.error(err.response.data);
    });
};
const changePage = (page) => {};
const setClientHeight = () => {
  nextTick(() => {
    util.getClientHeight() > document.getElementById('signedRepo').offsetHeight
      ? (section.value.height = util.getClientHeight() + 'px')
      : (section.value.height =
          document.getElementById('signedRepo').offsetHeight);
  });
};
const loginOut = () => {
  sessionStorage.clear();
  router.push('/corporationManagerLogin');
};

onMounted(() => {
  setClientHeight();
});
</script>

<style lang="scss">
@media screen and (min-width: 1200px) {
  #signedRepo_section {
    width: 1200px;
    margin: auto;
  }
}

#signedRepo {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;

  & > div:nth-of-type(2) {
    flex-grow: 1;
    background-color: #f0f2f5;
    padding: 0 1rem;
  }

  & .tableStyle {
    margin-bottom: 2rem;
    padding: 3rem;
    background-color: white;
  }

  & .pointer {
    cursor: pointer;
  }

  & .marginTop1rem {
    margin-top: 1rem;
  }

  & .contentTitle {
    font-size: 1.2rem;
  }
}
</style>
