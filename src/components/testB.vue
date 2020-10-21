<template>
  <div>
    <h2>{{title}}</h2>
  </div>
</template>

<script>
export default {
  name: "testB",
  inject: ['title', 'app'],
  created() {
    console.log(this.app)
    console.log(this)
  }
}
</script>

<style scoped>

</style>