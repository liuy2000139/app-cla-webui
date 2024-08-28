<template>
  <div id="rootManager">
    <Header></Header>
    <div>
      <div id="rootManager_section" class="padding-top-bottom-2rem">
        <router-view></router-view>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script setup lang="ts">
import Header from '@/components/NewHeader.vue';
import Footer from '@/components/NewFooter.vue';
import * as util from '../util/util';
import { ref, computed, inject, onUpdated, onMounted, nextTick } from 'vue';
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
    util.getClientHeight() > document.getElementById('rootManager').offsetHeight
  ) {
    document.getElementById('rootManager').style.height =
      util.getClientHeight() + 'px';
  }
};

const user = computed(() => {
  return commonStore.loginInfo;
});

const active = ref('first');

onMounted(() => {
  setClientHeight();
});

const setClientHeight = () => {
  nextTick(() => {
    document.getElementById('rootManager').style.minHeight = '0px';
    if (
      util.getClientHeight() >
      document.getElementById('rootManager').offsetHeight
    ) {
      document.getElementById('rootManager').style.minHeight =
        util.getClientHeight() + 'px';
    } else {
      document.getElementById('rootManager').style.minHeight =
        document.getElementById('rootManager').offsetHeight + 'px';
    }
  });
};
</script>
<style lang="scss">
@media screen and (min-width: 1200px) {
  #rootManager_section {
    width: 1200px;
    margin: auto;
  }
}

#rootManager {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;

  & > div:nth-of-type(2) {
    flex-grow: 1;
    background-color: #f0f2f5;
    padding: 0 1rem;
  }
}

.tableBox {
  border-radius: 1.5rem;
  margin-bottom: 2rem;
  padding: 3rem;
  background-color: white;
}

.tableClass {
  border: 1px solid black;
  border-radius: 1.5rem;
}

.el-dialog {
  border-radius: 1rem;
}

.tabName {
  user-select: none;
  font-family: Roboto-Regular, sans-serif;
  font-size: 2rem;
  text-align: left;
}
</style>
