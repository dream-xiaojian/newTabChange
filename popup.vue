<template>
  <div>
    <div class="container">
      <input type="text" v-model="state.redirectUrl">
      <span @click="save()">保存</span>
    </div>
  </div>
</template>

<style>
.container {
  min-width: 470px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 47px;
  cursor: pointer;
}
.text-center {
  text-align: center;
}
.action {
  color: #470;
  font-weight: bold;
}
</style>

<script setup lang="ts">
/**
 * popup.vue
 * 主要作用：配置打开新标签页中的页面
 * （1）读入当前已经配置的url -- 展示
 * （2）修改当前已经配置的url -- 修改
 */
import { reactive, onMounted } from "vue"
import type { App } from "vue"

const state = reactive({ redirectUrl: "", count: 0})
const uniqueKey = `configuredUrl_${chrome.runtime.id}`;

function save() {
  console.log('savePath', state.redirectUrl, uniqueKey);
  chrome.runtime.sendMessage({redirectUrl: state.redirectUrl}, (response) => {

  });
}

onMounted(() => {
    chrome.storage.local.get(uniqueKey, function(result) {
        if (result[uniqueKey]) {
            state.redirectUrl = result[uniqueKey];
        }
    })
})

defineOptions({
  prepare(app: App) {
    // Use any plugins here:
    // app.use
  }
})
</script>
