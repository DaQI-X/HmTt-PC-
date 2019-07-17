<template>
  <div class="articlecont">
    <!-- 头部分 -->
    <el-card class="box-card">
      <!-- 面包屑导航 -->
      <div slot="header">
        <!-- 插槽 -->
        <my-bread>内容管理</my-bread>
      </div>

      <el-form :model="reqParams" size="small" label-width="80px">
        <!-- 单选框组 -->
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 频道，下拉菜单 -->
        <el-form-item label="频道：">
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <!-- 日期格式化 -->
        <el-form-item label="时间：">
          <!-- <span class="demonstration">默认</span> -->
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="dateValues"
            @change="changeDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 底部分 -->
    <el-card class="box-card">
      <div slot="header">
        根据筛选条件共查询到
        <b>{{total}}</b>条结果
      </div>
      <el-table :data="articles" style="width: 100%">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image lazy :src="scope.row.cover.images[0]" style="width:100px;height:75px">
              <div slot="error" class="image-slot">
                <img src="../../assets/images/error.gif" width="100" height="75" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag type="success" v-if="scope.row.status===2">审核通过</el-tag>
            <el-tag type="warning" v-if="scope.row.status===3">审核失败</el-tag>
            <el-tag type="danger" v-if="scope.row.status===4">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button plain type="primary" icon="el-icon-edit" @click="edit(scope.row.id)" circle></el-button>
            <el-button plain type="danger" icon="el-icon-delete" @click="del(scope.row.id)" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <div class="box">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="changePager"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 提交给后台的筛选条件  传参
      // 数据默认是''还是null的区别,如果是null将不会发送字段
      reqParams: {
        page: 1,
        per_page: 20,
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      // 文章内容数据
      articles: [],
      // 日期控件的数据
      dateValues: [],
      // 总条数
      total: 0
    }
  },
  created () {
    // 获取文章内容列表
    this.getArticles()
  },
  methods: {
    // 获取文章内容数据
    async getArticles () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      // 获取数据文章列表内容
      this.articles = data.results
      // 获取总条数
      this.total = data.total_count
    },
    // 删除当前文章内容的数据
    del (id) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 发送ajax请求
          await this.$http.delete(`articles/${id}`)
          // 删除成功提示信息
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 编辑当前文章
    edit (id) {
      // 路径传参用 query ；键值对传参用 params
      // this.$router.push({ path: '/publish', query: { id } }) // 路径传参
      this.$router.push({ path: '/publish', params: { id: id } }) // 键值对传参
    },
    // 点击搜索的时候--重新获取列表数据
    changeDate (values) {
      this.reqParams.begin_pubdate = values[0]
      this.reqParams.end_pubdate = values[1]
    },
    // 点击搜索按钮
    search () {
      this.reqParams.page = 1
      this.getArticles()
    },
    // 页面数据内容监听
    changePager (newPage) {
      // newPage 当前点击的按钮的页码
      // 更新提交给后台的参数
      this.reqParams.page = newPage
      // 获取当前数据
      this.getArticles()
    }
  }
}
</script>

<style scoped lang="less">
.el-card {
  margin-bottom: 20px;
  .el-form-item {
    padding-top: 5px;
  }
}
//分页
.box {
  text-align: center;
  margin-top: 20px;
}
</style>
