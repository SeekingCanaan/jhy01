<template>
    <div>
      <el-row>
        <el-col :span="7"><div class="grid-content "></div></el-col>
        <el-col :span="10"><div class="grid-content ">
          <h3 style="text-align: center">用户注册</h3>
          <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="80px">

            <el-col :span="18">
              <el-form-item label="用户名" prop="name">
                <el-input v-model="formData.name" placeholder="请输入用户名" :maxlength="12" clearable
                          prefix-icon='el-icon-user' :style="{width: '100%'}"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-form-item label="密码" prop="password">
                <el-input v-model="formData.password" placeholder="请输入密码" :maxlength="10" clearable
                          prefix-icon='el-icon-lock' show-password :style="{width: '100%'}"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-form-item label="确认密码" prop="password2">
                <el-input v-model="formData.password2" placeholder="请再次输入密码" :maxlength="10" clearable
                          prefix-icon='el-icon-lock' show-password :style="{width: '100%'}"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-form-item label="性别" prop="sex">
                <el-radio-group v-model="formData.sex" size="medium">
                  <el-radio v-for="(item, index) in sexOptions" :key="index" :label="item.value"
                            :disabled="item.disabled">{{item.label}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="formData.email" placeholder="请输入邮箱" :maxlength="18" clearable
                          prefix-icon='el-icon-message' :style="{width: '100%'}"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-form-item label="手机" prop="phone">
                <el-input v-model="formData.phone" placeholder="请输入手机号码" :maxlength="11" clearable
                          prefix-icon='el-icon-mobile-phone' :style="{width: '100%'}"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item size="large">
                <el-button type="primary" @click="submitForm">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </div></el-col>
        <el-col :span="7"><div class="grid-content "></div></el-col>
      </el-row>
    </div>
</template>

<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      formData: {
        name: "",
        password: "",
        password2: "",
        sex: "",
        email: "",
        phone: "",
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
        password2: [{
          required: true,
          message: '请再次输入密码',
          trigger: 'blur'
        }],
        sex: [{
          required: true,
          message: '性别不能为空',
          trigger: 'change'
        }],
        email: [{
          required: true,
          message: '请输入邮箱',
          trigger: 'blur'
        }, {
          pattern: /^\d{5,12}@[qQ][qQ]\.(com|cn)$/,
          message: '请输入正确的邮箱',
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
      },
      sexOptions: [{
        "label": "男",
        "value": "男"
      }, {
        "label": "女",
        "value": "女"
      }],
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
         if (this.formData.password === this.formData.password2) {
           this.$http.post('/register', this.formData).then(res => {
             console.log(res.data);
             if (res.data.code === 1) {
               this.$message({
                 type: 'success',
                 message: '用户注册成功'
               })
               this.$router.push('/login');
             } else {
               this.$message({
                 type: 'warning',
                 message: '用户名已存在'
               })
             }
           })
         } else {
           this.formData.password = ''
           this.formData.password2 = ''
           this.$message({
             type: 'warning',
             message: '两次输入的密码不一致'
           })
         }
        }
      })
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
    },
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