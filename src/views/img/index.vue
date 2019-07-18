<template>
  <el-card class="box-card">
    <!-- 面包屑组件 -->
    <div slot="header">
      <my-bread>素材管理</my-bread>
    </div>
    <!-- 顶部按钮 -->
    <div style="margin-bottom: 20px">
      <el-radio-group v-model="reqParams.collect" @change="search()" size="small">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <!-- 添加素材 -->
      <el-button size="small" @click="dialogVisible = true" style="float:right" type="success">添加素材</el-button>
      <el-dialog title="添加素材" :visible.sync="dialogVisible" width="30%">
        <el-upload
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :show-file-list="false"
          :on-success="handleSuccess"
          :headers="headers"
          name="image"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 图片列表 -->
    <ul class="img-list">
      <li v-for="item in images" :key="item.id">
        <img :src="item.url" alt />
        <div class="fot" v-if="!reqParams.collect">
          <span class="el-icon-star-off" :class="{red:item.is_collected}"></span>
          <span class="el-icon-delete"></span>
        </div>
      </li>
    </ul>
    <el-pagination
      v-if="total>reqParams.per_page"
      background
      layout="prev, pager, next"
      :page-size="reqParams.per_page"
      :current-page="reqParams.page"
      :total="total"
      @current-change="pager"
    ></el-pagination>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      // 显示图片列表数据
      images: [],
      // 分页总条数
      total: 0,
      // 添加素材
      dialogVisible: false,
      // 预览的地址
      imageUrl: null,
      // 请求头
      headers: {
        Authorization:
          'Bearer ' +
          JSON.parse(window.sessionStorage.getItem('hm73-toutiao')).token
      }
    }
  },
  created () {
    // 获取图片素材
    this.getImg()
  },
  methods: {
    // 获取 ajax 请求
    async getImg () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    // 切换收藏按钮
    search () {
      this.reqParams.page = 1
      this.getImg()
    },
    // 分页获取数据
    pager (newPage) {
      // 每点新页，显示新的数据
      this.reqParams.page = newPage
      this.getImg()
    },
    // 上传成功后的处理函数
    handleSuccess (res) {
      // 预览 地址
      this.imageUrl = res.data.url
      // 提示上传成功
      this.$message.success('上传成功')
      // 关闭对话框 更新列表
      window.setTimeout(() => {
        // 关闭对话框
        this.dialogVisible = false
        // 重新更新列表内容
        this.getImg()
        // 关闭前情况预览图片
        this.imageUrl = null
      }, 1500)
    }
  }
}
</script>

<style scoped lang="less">
.img-list {
  list-style: none;
  margin: 0 auto;
  padding: 0;
  overflow: hidden;
  li {
    width: 180px;
    height: 180px;
    float: left;
    border: 1px dashed #eee;
    margin-right: 20px;
    margin-bottom: 20px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .fot {
      width: 100%;
      height: 30px;
      line-height: 30px;
      color: #fff;
      background: rgba(0, 0, 0, 0.5);
      position: absolute;
      left: 0;
      bottom: 0;
      text-align: center;
      span {
        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
