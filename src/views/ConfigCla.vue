<template>
  <div id="configCla" :style="configClaStyle">
    <div id="section">
      <div class="pageTitle">{{ title }}</div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, inject, onUpdated } from 'vue';
import { useI18n } from 'vue-i18n';
import { useCommonStore } from '../stores/common';

const commonStore = useCommonStore();
const { t, locale } = useI18n();
const $t = t;

const configClaStyle = ref({ height: '' });
const title = ref('');

const setClientHeight = inject('setClientHeight');

watch(
  () => {
    locale;
  },
  () => {
    setTitle();
  }
);

const setTitle = () => {
  if (commonStore.bindType === 'add-bind') {
    if (commonStore.claLinkCorp) {
      title.value = $t('org.addCorpCla');
    } else {
      title.value = $t('org.addIndividualCla');
    }
  } else {
    title.value = $t('org.configure_bt');
  }
};
setTitle();
onUpdated(() => {
  setClientHeight();
});
</script>

<style lang="scss">
.margin-top-2rem {
  margin-top: 2rem;
}

.margin-top-1rem {
  margin-top: 1rem;
}

.padding-left-right-2rem {
  padding: 0 2rem;
}

.stepBtBox {
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
}

.stepBt {
  width: 12rem;
}

#configCla {
  #section {
    flex-grow: 1;
    text-align: left;

    .pageTitle {
      padding: 2rem 0;
      font-size: 1.3rem;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      -webkit-touch-callout: none;
      user-select: none;
    }
  }
}

.el-dropdown-link {
  cursor: pointer;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.dialogDesc {
  font-size: 1.2rem;
  margin: 2rem 0;
}

li {
  margin: 1rem 0;
}
</style>
