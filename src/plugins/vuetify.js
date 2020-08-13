import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#607D8B',
        secondary: '#B0BEC5',
        accent: '#ECEFF1',
      },
    },
  },
});
