import Vue from 'vue';
import vuetify from './plugins/vuetify';
import './plugins/base';
import App from './App.vue';
import router from './router';
import store from './store';

const fb = require('./firebaseConfig.js');

Vue.config.productionTip = false;

let app;
// eslint-disable-next-line no-unused-vars
fb.auth.onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      vuetify,
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
