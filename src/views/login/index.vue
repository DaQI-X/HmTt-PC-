<template>
  <div class="containe">
    <el-card class="login_box">
      <img class="img" src="../../assets/images/logo_index.png" alt />
      <el-form ref="form" :model="loginForm" :rules="loginRules" status-icon class="demo-dynamic">
        <el-form-item  prop="mobile">
          <el-input style="width:100%" placeholder="请输入手机号" v-model="loginForm.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input style="width:75%" placeholder="请输入验证码" v-model="loginForm.code"></el-input>
          <el-button plain style="float:right">验证码</el-button>
        </el-form-item>
        <el-form-item>
            <el-checkbox v-model="loginForm.checked"></el-checkbox>
            我已阅读并同意用户协议隐私条款
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type="primary" @click="login(loginForm)">立即登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// http://ttapi.research.itcast.cn/mp/v1_0/authorizations
export default {

  data () {
    const checkMobile = (rule, value, callback) => {
      // 校验逻辑
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('号码格式错误'))
      }
    }
    return {
      loginForm: {
        mobile: '',
        code: '',
        checked: true
      },
      loginRules: {
        mobile: [
          // 具体的校验规则
          { required: true, message: '手机号必填', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码必填', trigger: 'blur' }
        ]
      }

    }
  },

  methods: {
    /* 13911111111
    246810 */
    login () {
      this.$refs.form.validate((valid) => {
        console.log(valid)
        if (valid) {
        // 校验成功，进行登录
          this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm)
            .then((res) => {
              // 登录成功，跳转主页
              if (res.status === 201) {
                // 如果登录成功，跳转到首页
                this.$router.push({ name: 'Home' })
              }
            }).catch(() => {
              // 如果失败，显示弹框
              this.$message({
                message: '用户名或密码错误',
                type: 'warning'
              })
            })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.containe {
  width: 100%;
  height: 100%;
  position: absolute;
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
  .login_box {
    width: 450px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .img {
      display: block;
      width: 200px;
      margin: 10px auto 30px;
    }

  }
}
</style>
