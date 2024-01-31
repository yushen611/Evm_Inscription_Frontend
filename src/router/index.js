import {createRouter, createWebHashHistory} from 'vue-router'
import mintData from'../components/mint.vue'
import display from'../components/display.vue'

const routes =[
  {
    path:'/',
    redirect:'/mint'
  },{
    path:'/display',
    components:display
  },{
    path:'/mint',
    component: mintData
  }
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
});

export default router;