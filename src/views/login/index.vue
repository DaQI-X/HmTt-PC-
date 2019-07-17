<template>
  <div class="containe">
    <el-card class="login_box">
      <img class="img" src="../../assets/images/logo_index.png" alt />
      <el-form ref="form" :model="loginForm" :rules="loginRules" status-icon class="demo-dynamic">
        <el-form-item prop="mobile">
          <el-input style="width:100%" placeholder="请输入手机号" v-model="loginForm.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input style="width:75%" placeholder="请输入验证码" v-model="loginForm.code"></el-input>
          <el-button plain style="float:right">验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="loginForm.checked"></el-checkbox>我已阅读并同意用户协议隐私条款
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
        mobile: '13911111111',
        code: '246810',
        checked: true
      },
      loginRules: {
        mobile: [
          // 具体的校验规则
          { required: true, message: '手机号必填', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [{ required: true, message: '验证码必填', trigger: 'blur' }]
      }
    }
  },

  methods: {
    /* 13911111111
    246810 */
    login () {
      this.$refs.form.validate(async valid => {
        console.log(valid)
        if (valid) {
          try {
            // 发送ajax请求--请求地址
            const res = await this.$http.post('authorizations', this.loginForm)
            // 把当前响应回的数据，设置在 sessionStorage 中,响应的数据为 json 数据，需转换为字符串
            window.sessionStorage.setItem(
              'hm73-toutiao',
              JSON.stringify(res.data.data)
            )
            // 响应成功，跳转首页
            this.$router.push('/')
          } catch (err) {
            // 错误，重新登录，并且弹出错误信息
            this.$message({
              message: '用户名或密码错误',
              type: 'warning'
            })
          }

          // // 校验成功，进行登录
          // this.$http
          //   .post(
          //     'authorizations',
          //     this.loginForm
          //   )
          //   .then(res => {
          //     console.log(res)
          //     // 登录成功，跳转主页
          //     if (res.status === 201) {
          //       // 如果登录成功，跳转到首页
          //       this.$router.push({ name: 'Home' })
          //       // 在 sessionStorage 设置保存响应的 token 数据
          //       window.sessionStorage.setItem(
          //         'hm73-toutiao',
          //         JSON.stringify(res.data.data)
          //       )
          //     }
          //   })
          //   .catch(() => {
          //     // 如果失败，显示弹框
          //     this.$message({
          //       message: '用户名或密码错误',
          //       type: 'warning'
          //     })
          //   })
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
    .demo-dynamic {
      .el-checkbox {
        padding-right: 15px;
      }
    }
  }
}
</style>
