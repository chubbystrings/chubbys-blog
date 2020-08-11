<template>
      <div v-if="!currentUser">
        <login />
    </div>
</template>
<script>
import { mapState } from 'vuex';

export default {

  computed: {
    ...mapState(['currentUser']),
  },
  components: {
    Login: () => import('../components/LoginComponent'),
  },

  created() {
    if (this.currentUser) {
      this.$router.replace('/dashboard');
    }
  },
};
</script>
