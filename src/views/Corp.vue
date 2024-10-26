<template>
  <div id="corpWrapper">
    <Header></Header>
    <div class="content-wrapper2">
      <div id="corpWrapper_section" class="padding-top-bottom-2rem">
        <RouterView></RouterView>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script setup lang="ts">
import Header from '@/components/NewHeader.vue';
import Footer from '@/components/NewFooter.vue';
import * as util from '../util/util.js';
import { onMounted, nextTick, computed } from 'vue';
import { useCommonStore } from '../stores/common.js';
import { useRoute, useRouter } from 'vue-router';

const commonStore = useCommonStore();
const router = useRouter();
const route = useRoute<{
  params: {
    linkId: string
  }
}>();
const linkId = computed(() => route.params.linkId);
window.onresize = () => {
  if (
    util.getClientHeight() > document.getElementById('corpWrapper').offsetHeight
  ) {
    document.getElementById('corpWrapper').style.height =
      util.getClientHeight() + 'px';
  }
};


onMounted(() => {
  setClientHeight();
});

const setClientHeight = () => {
  nextTick(() => {
    document.getElementById('corpWrapper').style.minHeight = '0px';
    if (
      util.getClientHeight() >
      document.getElementById('corpWrapper').offsetHeight
    ) {
      document.getElementById('corpWrapper').style.minHeight =
        util.getClientHeight() + 'px';
    } else {
      document.getElementById('corpWrapper').style.minHeight =
        document.getElementById('corpWrapper').offsetHeight + 'px';
    }
  });
};
</script>
<style lang="scss">
@media screen and (min-width: 1200px) {
  #corpWrapper_section {
    width: 1200px;
    margin: auto;
  }
}

#corpWrapper {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;

  & > .content-wrapper2 {
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
