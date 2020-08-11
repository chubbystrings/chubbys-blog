import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#BA68C8',
        secondary: '#083759',
        accent: '#F3E5F5',
      },
    },
  },
});
