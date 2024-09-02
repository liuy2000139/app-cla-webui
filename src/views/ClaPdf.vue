<template>
  <el-row id="cla_pdf">
    <VuePdfEmbed
      class="pdfPage margin-bottom-1rem"
      ref="pdf"
      :source="claText"
      :page="null"
      :width="clientWidth"
    ></VuePdfEmbed>
  </el-row>
</template>

<script setup lang="ts">
import VuePdfEmbed from 'vue-pdf-embed';
import http from '../util/_axios';
import * as url from '../util/api';
import * as util from '../util/util';
import { useCommonStore } from '../stores/common';

import { ref, computed, onMounted } from 'vue';
const claText = ref('');
const numPages = ref(null);
const commonStore = useCommonStore();

const clientWidth = computed(() => {
  return Math.min(document.documentElement.clientWidth, 1200)
})

const apply_to = computed(() => {
  if (commonStore.loginType === 'corporation') {
    return commonStore.loginType;
  }
  return 'individual';
});
const claTextUrl = computed(() => {
  return commonStore.domain;
});

const getNumPages = (url) => {};
const setClaText = (obj) => {
  let dataFromParent = obj;
  if (dataFromParent.pdfData && dataFromParent.pdfData.length) {
    for (let i = 0; i < dataFromParent.pdfData.length; i++) {
      if (
        Object.prototype.hasOwnProperty.call(
          dataFromParent.pdfData[i],
          dataFromParent.lang
        )
      ) {
        claText.value && window.URL.revokeObjectURL(claText.value);
        claText.value = window.URL.createObjectURL(
          dataFromParent.pdfData[i][dataFromParent.lang]
        );
        getNumPages(claText.value);
        return;
      }
    }
  }
  if (!Object.prototype.hasOwnProperty.call(dataFromParent, 'pdfData')) {
    return;
  }

  http({
    url: `${url.getCLAPdf}/${dataFromParent.link_id}/${commonStore.cla_id}`,
    responseType: 'blob',
  })
    .then((res) => {
      if (res && res.data) {
        let blob = new Blob([res.data], { type: 'application/pdf' });
        let data = dataFromParent.pdfData;
        data.push({ [dataFromParent.lang]: blob });
        window.parent.postMessage(data, claTextUrl.value);
        window.URL.revokeObjectURL(claText.value);
        claText.value = window.URL.createObjectURL(blob);
        getNumPages(claText.value);
      }
    })
    .catch((err) => {
      util.catchErr(err, 'errorSet', this);
    });
};
const getData = () => {
  window.addEventListener(
    'message',
    (event) => {
      if (event.origin === commonStore.domain) {
        if (event.data && event.data.from === 'sign-cla') {
          setClaText(event.data);
        }
      }
    },
    false
  );
  // setClaText({
  //   hash: undefined,
  //   lang: 'Chinese',
  //   link_id: 'gitee_clahhy-1722565300256643981',
  //   pdfData: [],
  // });
};
getData();
onMounted(() => {
  window.parent.postMessage({loaded: true}, commonStore.domain);
})
</script>

<style scoped lang="scss">
#cla_pdf > span:not(:last-of-type) {
  box-shadow: 0 0 20px 10px #f3f3f3;
  border-radius: 1rem;
  overflow: hidden;
}
</style>
