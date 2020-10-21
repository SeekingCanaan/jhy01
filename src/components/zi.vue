<template>
  <div>
    <ul>
      <li v-for="menu in menus" :key="menu.id">
        {{menu.val}}
        <el-button @click="deleteMenu(menu.id)" round plain>删除</el-button>
        <el-button plain type="success" @click="add">添加</el-button>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  name: "zi",
  props: {
    menus: Array
  },
  methods: {
    deleteMenu(id) {
      this.$emit('del', id)
    },
    add() {
      this.$bus.$emit('addNum')
    }
  }
}
</script>

<style scoped>

</style>