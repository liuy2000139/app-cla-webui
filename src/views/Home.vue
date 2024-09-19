<script setup lang="ts">
import { onUpdated, nextTick, provide } from 'vue';

import * as util from '../util/util.js';
import Header from '@/components/NewHeader.vue';
import Footer from '@/components/NewFooter.vue';

const setClientHeight = () => {
  nextTick(() => {
    document.getElementById('home').style.minHeight = '0px';
    if (util.getClientHeight() > document.getElementById('home').offsetHeight) {
      document.getElementById('home').style.minHeight =
        util.getClientHeight() + 'px';
    } else {
      document.getElementById('home').style.minHeight =
        document.getElementById('home').offsetHeight + 'px';
    }
  });
};
provide('setClientHeight', setClientHeight);
onUpdated(() => {
  setClientHeight();
});

window.onresize = () => {
  if (util.getClientHeight() > document.getElementById('home').offsetHeight) {
    document.getElementById('home').style.minHeight =
      util.getClientHeight() + 'px';
  }
};
</script>

<template>
  <div id="home">
    <Header></Header>
    <div>
      <div id="section">
        <router-view></router-view>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<style lang="scss" scoped>
@media screen and (min-width: 1200px) {
  #section {
    width: 1200px;
    margin: auto;
  }
}

#home {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
  min-height: 100vh;

  & > div:nth-of-type(2) {
    flex-grow: 1;
    text-align: left;
    background-color: #f9f9f9;
    padding: 0 1rem;
  }

  .el-dropdown-link {
    cursor: pointer;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }
}
</style>
