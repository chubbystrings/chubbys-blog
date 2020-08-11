<template>
    <div>
        <post />
    </div>
</template>
<script>
export default {
  components: {
    Post: () => import('../components/DashboardComponent'),
  },
};
</script>
