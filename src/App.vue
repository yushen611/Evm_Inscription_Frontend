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
    <div id="nav">
     <h1><router-link to="/display">display</router-link>  |</h1>
      <h1><router-link to="/mint">mintData</router-link> </h1>
    </div>
    <router-view/>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100vh; /* 设置最小高度，确保内容撑开整个视口 */
  }
h1 {
    color: #0a0909;
    font-size: 32px;
    margin-bottom: 13px;
  }
</style>
