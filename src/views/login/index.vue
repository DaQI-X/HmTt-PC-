<template>
  <div class="containe">
    <el-card class="login_box">
      <img class="img" src="../../assets/images/logo_index.png" alt />
      <el-form ref="form" :model="formData">
        <el-form-item>
          <el-input style="width:100%" placeholder="请输入手机号" v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input style="width:70%" placeholder="请输入验证码" v-model="formData.name"></el-input>
          <el-button plain style="float:right">验证码</el-button>
        </el-form-item>
        <el-form-item>
            <el-checkbox v-model="formData.checked"></el-checkbox>
            我已阅读并同意用户协议隐私条款
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type="primary">立即登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        name: '',
        checked: true
      }
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
