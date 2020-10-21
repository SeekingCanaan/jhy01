<template>
  <el-container style="height: 100vh; border: 1px solid #eee">



    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router :default-openeds="['1']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-tickets"></i>内容管理</template>
          <el-menu-item index="/articles/create">新建文章</el-menu-item>
          <el-menu-item index="/articles/index">文章列表</el-menu-item>
        </el-submenu>

      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">

      </el-header>

      <el-main>
        <el-form @submit.native.prevent="saveArticle" ref="form" :model="article" label-width="80px">

          <el-form-item label="文章标题">
            <el-input v-model="article.title"></el-input>
          </el-form-item>

          <el-form-item label="文章内容">
            <el-input type="textarea" v-model="article.body"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" native-type="submit">保存</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>

      </el-main>
    </el-container>
  </el-container>


</template>
<script>
export default {
  data() {
    return {
      article: {
        title: '',
        body: ''
      }
    }
  },
  methods: {
    saveArticle() {
      this.$http.put(`/articles/${this.$route.params.id}`, this.article).then(res => {
        console.log(res.data);
        this.$message({
          type: 'success',
          message: '修改文章成功'
        });
        this.$router.push('/articles/index')
      })
    },
    feach() {
      this.$http.get(`/articles/${this.$route.params.id}`).then(res => {
        console.log(res);
        this.article = res.data;
      })
    }
  },
  created() {
    this.feach()
  }
}
</script>
