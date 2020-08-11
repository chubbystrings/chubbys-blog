<template>
    <div>
        <users-posts />
    </div>
</template>
<script>
export default {
  components: {
    UsersPosts: () => import('../components/UserPostsComponent'),
  },
};
</script>
