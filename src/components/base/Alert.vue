<template>
    <div class="text-center successBar"  v-if="alerts.alert">
    <transition
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    >
    <v-snackbar
      v-model="snackbar"
      :multi-line="multiLine"
      :color="alerts.type"
      :timeout="timeout"
      top
    >
      {{ alerts.message }}
    </v-snackbar>
      </transition>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'BaseAlert',
  data: () => ({
    multiLine: true,
    snackbar: true,
    timeout: -1,
  }),

  computed: {
    ...mapState(['alerts']),
  },
};
</script>
<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css";
</style>
