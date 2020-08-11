<template>
  <v-main >
    <transition mode="out-in"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut">
        <router-view />
    </transition>
  </v-main>
</template>

<script>
export default {
  name: 'CoreView',
};
</script>
<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css";
</style>
