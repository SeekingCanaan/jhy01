<template>
  <div>
    <h3>购物车数量: {{ num }}</h3>
  </div>
</template>

<script>
export default {
  name: "gouwuche",
  data() {
    return {
      num: 0
    }
  },
  created() {
    this.$bus.$on('addNum', ()=> {
      this.num++;
    })
  }
}
</script>

<style scoped>

</style>