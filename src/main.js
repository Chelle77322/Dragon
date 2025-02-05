//*NEW CODE VUE JS Version 3 */

import { createApp } from 'vue';
import * as VueRouter from 'vue-router';


// import App component
import App from './App.vue';



const app = createApp(App);

const routes = [{ path:"/:"}];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
 routes,
});

app.use(router);

app.mount('#app');



