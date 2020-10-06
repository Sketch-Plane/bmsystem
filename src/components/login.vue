<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域start -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="">
      </div>
      <!-- 头像区域end -->
      <!-- 登陆表单区域start -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="login_btn">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="loginFormRest">重置</el-button>
        </el-form-item>
      </el-form>  
      <!-- 登陆表单区域end -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //这是登陆表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      //这是表单预验证规则对象
      loginFormRules: {
        //验证用户名是否合法
        username: [
          { required: true, message: '请输入登陆名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        //验证密码是否合法
        password: [
          { required: true, message: '请输入登陆密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ]  

      }
    }
  },
  methods: {
    loginFormRest() {
      // console.log(this);
      //重置表单数据
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        // console.log(valid);
        if(!valid) return;
        const {data: res} =await this.$http.post("login", this.loginForm)
        if(res.meta.status !== 200) return this.$message.error("登陆失败");
        this.$message.success("登陆成功")
        // console.log(res);
        // 1将登陆成功之后的token保存在客户端的sessionStorage中
        //  1.1项目中除了登陆之外的其他API接口，必须在登陆之后才能访问
        //  1.2token只应在当前网站打开期间生效，所以token将保存在sessionStorage中
        window.sessionStorage.setItem("token", res.data.token)
        // 2通过代码跳转路由到后台主页，  路由地址/home
        this.$router.push("/home")
      })
    }
  }
}
</script>
<style scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
}
 .login_box .avatar_box {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 130px;
  height: 130px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow:  0 0 10px #ddd;
}
.login_box .avatar_box img {
  width: 100%;
  border-radius: 50%;
  background-color: #eee;
}
.login_form {
  position: absolute;
  left: 0;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  padding: 0 20px;
}
.login_btn {
  display: flex;
  justify-content: flex-end;
}
</style>