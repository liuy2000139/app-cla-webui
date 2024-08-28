<template>
  <div id="forgetPwd">
    <Header></Header>
    <div>
      <div id="forgetPwd_section">
        <router-view></router-view>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script setup lang="ts">
import Header from '../components/NewHeader.vue';
import Footer from '../components/NewFooter.vue';
import * as util from '../util/util';

import { ref, computed, inject, onUpdated, onMounted, watch,nextTick } from 'vue';
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
    util.getClientHeight() > document.getElementById('forgetPwd').offsetHeight
  ) {
    document.getElementById('forgetPwd').style.height =
      util.getClientHeight() + 'px';
  }
};

onMounted(() => {
  setClientHeight();
});
  
const setClientHeight = () => {
  nextTick(() => {
    document.getElementById('forgetPwd').style.minHeight = '0px';
    if (
      util.getClientHeight() >
      document.getElementById('forgetPwd').offsetHeight
    ) {
      document.getElementById('forgetPwd').style.minHeight =
        util.getClientHeight() + 'px';
    } else {
      document.getElementById('forgetPwd').style.minHeight =
        document.getElementById('forgetPwd').offsetHeight + 'px';
    }
  });
};

</script>

<style scoped lang="scss">
@media screen and (min-width: 1200px) {
  #forgetPwd_section {
    width: 1200px;
    margin: auto;
  }
}

#forgetPwd {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;

  & > div:nth-of-type(2) {
    flex-grow: 1;
    background-color: #f0f2f5;
    padding: 0 1rem;
  }
}
</style>
