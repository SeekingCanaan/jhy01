<template>
  <div>
    <zi :menus="menuList" @del="del"></zi>
    <gouwuche></gouwuche>
    <test-a></test-a>
  </div>
</template>

<script>
import zi from './zi'
import gouwuche from "@/components/gouwuche";
import testA from "@/components/testA";
export default {
  name: "fu",
  components: {
    zi,
    gouwuche,
    testA
  },
  //nidaye
  provide() {
    return {
      title: this.title,
      app: this
    }
  },
  data () {
    return {
      menuList: [{id: 1, val: '红色'}, {id: 2, val: '蓝色'}, {id: 3, val: '绿色'}, {id: 4, val: '白色'}],
      title: 'testB标题'
    }
  },
  methods: {
    del(id) {
      console.log(id)
    }
  }
}
</script>

<style scoped>

</style>