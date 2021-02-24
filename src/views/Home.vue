<template>
  <div id="home" >
    <articles>
      <banner />
    </articles>
    <about />

    <subscribe />

    <social />
  </div>
</template>

<script>
export default {
  name: 'Home',

  components: {
    About: () => import('@/components/home/About'),
    Articles: () => import('@/components/home/Articles'),
    Banner: () => import('@/components/home/Banner'),
    Social: () => import('@/components/home/Social'),
    Subscribe: () => import('@/components/home/Subscribe'),
  },

  created() {
    this.$store.dispatch('posts/getArticles');
  },

  computed: {
    checkRoutes() {
      return this.$route.name === 'Home' || this.$route.name === 'Post';
    },
  },
};
</script>
<style>
</style>
