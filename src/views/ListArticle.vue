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
        <div>
          <el-table :row-style="{maxHeight: '30px', height: '20px'}" :data="articles.slice((currentPage-1) * pageSize, currentPage * pageSize)" stripe
                    v-loading="loading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(229, 255, 253, 0.8)"
                    height="568px">
            <el-table-column type="index" label="序号" align="center" width="100">
              <template slot-scope="scope"><span>{{ scope.$index+1}}</span></template>
            </el-table-column>
            <el-table-column  label="标题" width="140">
              <template slot-scope="scope">
                <span>{{scope.row.title}}</span>
              </template>
            </el-table-column>
            <el-table-column label="内容" width="320">
              <template slot-scope="scope">
                <span>{{scope.row.body | ellipsis}}</span>
              </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="190">
              <template slot-scope="scope">
                <el-button @click="edit(scope.row._id)" type="primary" size="normal" round>编辑</el-button>
                <el-button @click="remove(scope.row._id)" type="danger" size="normal" round>删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
              class="pagination"
              background
              layout="prev, pager, next"
              :total="articles.length"
              @current-change="current_change">
          </el-pagination>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "ListArticle",
  data() {
    return {
      articles: [],
      loading: true,
      total: 0, //默认数据页数
      pageSize:10,  //每页显示数据条数
      currentPage: 1 //当前所在页数
    }
  },
  methods: {
    feach() {
      this.$http.get("/articles").then((res) => {
        setTimeout(()=> {
          console.log(res.data);
          this.articles = res.data;
          this.loading = false;
        }, 300)
      })
    },
    edit(id) {
      this.$router.push(`/articles/${id}/edit`)
    },
    remove(id) {
      console.log(id);
      this.$http.delete(`/articles/${id}`).then((res) => {
        if (this.articles.length / 10 === 0) {
          setTimeout(()=> {
            this.currentPage -=2;
            this.$router.push('/articles/index');
          },100)
        }
        console.log(res);
        this.$message({
          type: 'success',
          message: "删除成功"
        })
        this.feach()
      })
    },
    current_change(currentPage) {
      this.currentPage = currentPage;
    }
  },
  created() {
    this.feach()
  },
  filters: {
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 20) {
        return value.slice(0, 20) + "...";
      }
      return value;
    }
  }
}
</script>

<style scoped>
.pagination {
  text-align: center;
  margin-top: 20px;
}

</style>