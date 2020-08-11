<template>
      <div >
        <add-user />
      </div>
</template>
<script>
import { mapState } from 'vuex';

export default {

  computed: {
    ...mapState(['currentUser']),
  },
  components: {
    AddUser: () => import('../components/AddUserComponent'),
  },
};
</script>
