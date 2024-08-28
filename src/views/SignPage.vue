<template>
  <el-row id="signPage">
    <Header ref="header"></Header>
    <div id="content">
      <router-view
        @getLangOptions="getLangOptions"
        @initHeader="initHeader"
      ></router-view>
    </div>
    <Footer></Footer>
  </el-row>
</template>

<script setup lang="ts">
import Header from '@/components/NewHeader.vue';
import Footer from '@/components/NewFooter.vue';
import * as util from '../util/util';

import { nextTick, onMounted, onUnmounted, provide, ref } from 'vue';

const header = ref();
const initHeader = (value) => {
  nextTick(() => {
    header.value.init(value);
  });
};
const getLangOptions = (data) => {
  nextTick(() => {
    header.value.updateLangOptions(data);
  });
};

const setClientHeight = () => {
  nextTick(() => {
    document.getElementById('signPage').style.minHeight = '0px';
    if (
      util.getClientHeight() > document.getElementById('signPage').offsetHeight
    ) {
      document.getElementById('signPage').style.minHeight =
        util.getClientHeight() + 'px';
      document.getElementById('content').style.minHeight =
        util.getClientHeight() -
        parseInt(
          window.getComputedStyle(
            document.getElementsByClassName('parentBox')[0]
          ).height
        ) *
          2 +
        'px';
    } else {
      document.getElementById('signPage').style.minHeight =
        document.getElementById('signPage').offsetHeight + 'px';
    }
  });
};
provide('setClientHeight', setClientHeight);
onMounted(() => {
  setClientHeight();
  window.onresize = () => {
    if (
      util.getClientHeight() > document.getElementById('signPage').offsetHeight
    ) {
      document.getElementById('signPage').style.minHeight =
        util.getClientHeight() + 'px';
      document.getElementById('content').style.minHeight =
        util.getClientHeight() -
        parseInt(
          window.getComputedStyle(
            document.getElementsByClassName('parentBox')[0]
          ).height
        ) *
          2 +
        'px';
    }
  };
});
onUnmounted(() => {
  window.onresize = null;
});
</script>
<style lang="scss" scoped>
#content {
  margin: 0 auto;
}
</style>
