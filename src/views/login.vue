<template>
    <div>
      <el-row>
        <el-col :span="7"><div class="grid-content"></div></el-col>
        <el-col :span="10"><div class="grid-content">
          <h3 style="text-align: center">用户登录</h3>
          <el-form ref="elForm" :model="loginForm" :rules="rules" size="medium" label-width="80px">
            <el-col :span="18">
              <el-form-item label="用户名" prop="name">
                <el-input v-model="loginForm.name" placeholder="请输入用户名" :maxlength="12" clearable
                          prefix-icon='el-icon-user' :style="{width: '100%'}"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password" placeholder="请输入密码" :maxlength="10" clearable
                          prefix-icon='el-icon-lock' show-password :style="{width: '100%'}"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-form-item size="large">
                <el-button type="primary" @click="submitForm">登录</el-button>
                <el-button type="primary" plain @click="openDialog">手机登录</el-button>
                <el-button @click="resetForm">重置</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <router-link to="/register" style="text-decoration: none"><el-link style="text-decoration: none" type="primary">还没账号? 前往注册</el-link></router-link>

            </el-col>
          </el-form>
        </div></el-col>
        <el-col :span="7"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
      <el-dialog :visible.sync="dialogData.show"  title="手机登录" style="text-align: center;">
        <el-row :gutter="10">
          <el-form ref="phoneForm" :model="dialogData" :rules="rules" size="medium" label-width="120px">
            <el-col :span="14">
              <el-form-item label="手机号" prop="phone">
                <el-input v-model="dialogData.phone" placeholder="请输入手机号" clearable prefix-icon='el-icon-mobile-phone'
                          :style="{width: '100%'}"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="验证码" prop="code">
                <el-input v-model="dialogData.code" placeholder="请输入验证码" :maxlength="6" clearable
                          :style="{width: '100%'}">
                  <template slot="append"><el-button type="primary" @click="getCode">获取验证码</el-button></template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <div slot="footer">
          <el-button @click="dialogData.show = false">取消</el-button>
          <el-button type="primary" @click="phoneLogin">确定</el-button>
        </div>
      </el-dialog>

    </div>
</template>

<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      loginForm: {
        name: "",
        password: ""
      },
      dialogData: {
        phone: "",
        code: "",
        show: false
      },
      rules: {
        name: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }, {
          pattern: /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{6,16}$/,
          message: '密码须6-16位, 且含大写小写字母、数字和特殊符当中至少两种',
          trigger: 'blur'
        }],
        phone: [{
          required: true,
          message: '请输入手机号码',
          trigger: 'blur'
        }, {
          pattern: /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/,
          message: '请输入正确的手机号',
          trigger: 'blur'
        }],
        code: [{
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submitForm() {
      this.$refs['elForm'].validate(valid => {
        if (valid){
            this.$http.post('/login', this.loginForm).then(res => {
              if (res.data.code === 1) {
                console.log("res的数据为: " + JSON.stringify(res.data));
                this.$message({
                  type: 'success',
                  message: '登录成功'
                })
                this.$router.push('/articles/index');
              } else {
                this.$message({
                  type: 'warning',
                  message: '用户名或密码错误'
                })
              }
            })
        }
      })
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
    },
    openDialog () {
      this.dialogData.phone = ''
      this.dialogData.code = ''
      this.dialogData.show = true;
    },
    getCode() {
      console.log(this.dialogData.phone)
      this.$http.post('/code', this.dialogData).then(res => {
        if (res.data.code === 1) {
          this.$message({
            type: 'success',
            message: res.data.msg
          })
        } else if (res.data.code === 0){
          this.$message({
            type: 'warning',
            message: res.data.msg
          })
        }
      })
    },
    phoneLogin() {
      this.$refs['phoneForm'].validate(valid => {
        if (valid) {
          this.$http.post('/loginPhone', this.dialogData).then( res => {
            if (res.data.code === 1) {
              this.$message({
                type: 'success',
                message: res.data.msg
              })
              this.dialogData.show = false
              this.$router.push('/articles/index');
            } else if (res.data.code === 0) {
              this.$message({
                type: 'warning',
                message: res.data.msg
              })
              this.dialogData.show = true
            }
          })
        }
      })
    }
  }
}

</script>

<style scoped>
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>