<template>
    <div>
        <users />
    </div>
</template>
<script>
export default {
  components: {
    Users: () => import('../components/UsersComponent'),
  },
};
</script>
