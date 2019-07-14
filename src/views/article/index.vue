<template>
  <div class="articlecont">
    <el-card class="box-card">
      <!-- 面包屑导航 -->
      <div class="header">
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
          <el-select v-model="reqParams.channel_id" placeholder="所有频道">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 日期格式化 -->
        <el-form-item label="时间：">
          <!-- <span class="demonstration">默认</span> -->
          <el-date-picker
            v-model="dateValues"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!--  -->
    <el-card>
      <hello-world>
        <template slot="s1">内容1</template>
        <template v-slot:s2="scope">内容2{{scope.test}}</template>
      </hello-world>
    </el-card>
  </div>
</template>

<script>
import MyBread from "@/components/my-bread.vue";

export default {
  components: { MyBread },
  data() {
    return {
      // 提交给后台的筛选条件  传参
      // 数据默认是''还是null的区别,如果是null将不会发送字段
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      // 默认频道数据
      channelOptions: [{ name: "Java", id: 1 }],
      // 日期控件的数据
      dateValues: []
    };
  }
};
</script>

<style scoped lang="less">
.el-card {
  margin-bottom: 20px;
  .el-breadcrumb {
    border-bottom: 1px dashed #eee;
    height: 30px;
    margin-bottom: 20px;
  }
  .el-form-item {
    padding-top: 5px;
  }
}
</style>
