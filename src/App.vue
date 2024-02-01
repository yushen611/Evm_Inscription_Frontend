<script setup>
// import HelloWorld from './components/HelloWorld.vue'
// import inscribeData from './components/inscribeData.vue'
// import Vue from'vue'
// import router from 'vue-router'
// import mintData from'./components/mint.vue'
// import display from'./components/display.vue'

</script>

<template>
  <div id="app" class="container">
    <div id="nav" class="navigation">
      <h1><router-link to="/mint">MINTDATA</router-link></h1>
      <h1><router-link to="/display">DISPLAY</router-link></h1>
    </div>
    <router-view/>
  </div>
</template>

<style>
.contianer{
  display: flex;
  display: -webkit-flex;
}


.navigation h1 {
  margin: 0;
  display: flex;
  width: 100%;
  font-size: 18px;
}

.router-link-active {
  /* 添加激活状态的样式 */
  color: #007bff; /* 这是蓝色的例子，你可以根据你的设计更改颜色 */
  font-weight: bold;
}
</style>
