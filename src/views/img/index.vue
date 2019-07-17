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
      <el-button size="small" style="float:right" type="success">添加素材</el-button>
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
    <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
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
      images: []
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
    },
    // 切换收藏按钮
    search () {
      this.reqParams.page = 1
      this.getImg()
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
