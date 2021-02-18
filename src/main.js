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
  let userSessionTimeout = null;
  if (user == null || userSessionTimeout) {
    clearTimeout(userSessionTimeout);
    userSessionTimeout = null;
  } else {
    user.getIdTokenResult()
      .then((idTokenResult) => {
        const authTime = idTokenResult.claims.auth_time * 1000;
        const sessionDurationInMilliSeconds = 60 * 60 * 1000;
        const expirationInMilliSeconds = sessionDurationInMilliSeconds - (Date.now() - authTime);
        userSessionTimeout = setTimeout(() => {
          fb.auth.signOut();
        }, expirationInMilliSeconds);
      });
  }

  if (!app) {
    app = new Vue({
      vuetify,
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
