<template>
  <div class="login-set-view">
    <div class="clock-set" v-show="loginNum == 1" @click="showLogin">clock</div>
    <div class="login-set" v-show="loginNum == 2">
      <el-form :model="formdata" :rules="formRules" ref="formRef">
        <el-form-item label="" prop="loginName">
          <el-input
            v-model="formdata.loginName"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="loginPsd">
          <el-input
            v-model="formdata.loginPsd"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="flex-center">
        <el-button type="primary" @click="submitLogin">登录</el-button>
        <el-button type="text" @click="registerLogin">注册</el-button>
      </div>
    </div>
    <div class="login-set" v-show="loginNum == 3">
      <el-form
        :model="loginData"
        status-icon
        :rules="loginRules"
        ref="formLogin"
      >
        <el-form-item label="" prop="loginName">
          <el-input
            v-model="loginData.loginName"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="loginPsd">
          <el-input
            v-model="loginData.loginPsd"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="loginSurePsd">
          <el-input
            v-model="loginData.loginSurePsd"
            type="password"
            placeholder="请再次输入密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="flex-center">
        <el-button type="primary" @click="submitRegister">确认注册</el-button>
        <el-button @click="cancelRegister">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请再次输入密码"));
      } else if (value != this.loginData.loginPsd) {
        callback(new Error("两次输入密码不一致！"));
      } else {
        callback();
      }
    };
    return {
      loginNum: 1,
      formdata: {
        loginName: "",
        loginPsd: "",
      },
      loginData: {
        loginName: "",
        loginPsd: "",
        loginSurePsd: "",
        loginPhone: "",
        loginInfo: "",
      },
      formRules: {
        loginName: [{ required: true, message: "请输入用户名" }],
        loginPsd: [{ required: true, message: "请输入密码" }],
      },
      loginRules: {
        loginName: [{ required: true, message: "请输入用户名" }],
        loginPsd: [{ required: true, message: "请输入密码" }],
        loginSurePsd: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    showLogin() {
      this.loginNum = 2;
    },
    // 点击登录
    submitLogin() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          localStorage.setItem("userKey", "1234567");
          this.$router.push({
            path: "HomeView",
          });
        } else {
          return;
        }
      });
    },
    // 点击注册
    registerLogin() {
      console.log(1233);
      this.loginNum = 3;
    },
    // 确认注册
    submitRegister() {
      this.$refs.formLogin.validate((valid) => {
        if (valid) {
          this.$message.success("注册成功!");
          this.loginNum = 2;
          this.$refs.formLogin.resetFields();
        } else {
          return;
        }
      });
    },
    cancelRegister() {
      this.$refs.formLogin.resetFields();
      this.loginNum = 2;
    },
  },
  created() {},
};
</script>
<style lang="scss">
.login-set-view {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
