<template>
  <div id="BoxAudit">
    <!-- 箱审计---------------------------------------------- -->
    <template>
      <el-tabs v-model="activeName">
        <el-tab-pane label="箱审计" name="tag1">
          <BoxAuditTab1
            :queryType="queryType_"
            :ContainerID="ContainerID_"
          ></BoxAuditTab1>
        </el-tab-pane>
        <el-tab-pane label="删除提单审计" name="tag2">
          <BoxAuditTab2
            :queryType="queryType_"
            :ContainerID="ContainerID_"
          ></BoxAuditTab2>
        </el-tab-pane>
        <el-tab-pane label="VGM审计" name="tag3">
          <BoxAuditTab3
            :queryType="queryType_"
            :ContainerID="ContainerID_"
          ></BoxAuditTab3>
        </el-tab-pane>
        <el-tab-pane label="危险品预检审计" name="tag4">
          <BoxAuditTab4
            :queryType="queryType_"
            :ContainerID="ContainerID_"
          ></BoxAuditTab4>
        </el-tab-pane>
        <el-tab-pane label="冷藏箱管理审计" name="tag5">
          <BoxAuditTab5
            :queryType="queryType_"
            :ContainerID="ContainerID_"
          ></BoxAuditTab5>
        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>

<script>
import BoxAuditTab1 from "./BoxAuditModule/BoxAudit_tab1.vue";
import BoxAuditTab2 from "./BoxAuditModule/BoxAudit_tab2.vue";
import BoxAuditTab3 from "./BoxAuditModule/BoxAudit_tab3.vue";
import BoxAuditTab4 from "./BoxAuditModule/BoxAudit_tab4.vue";
import BoxAuditTab5 from "./BoxAuditModule/BoxAudit_tab5.vue";
export default {
  props: {
    queryType: String,
    ContainerID: Number,
  },
  data() {
    return {
      activeName: "tag1",
      queryType_: "",
      ContainerID_: null,
    };
  },
  methods: {
    getBoxAudit() {
      this.ContainerID_ = this.ContainerID;
    },
  },
  mounted() {
    this.getBoxAudit();
  },
  watch: {
    ContainerID(val) {
      this.queryType_ = this.queryType;
      this.ContainerID_ = val;
    },
  },
  components: {
    BoxAuditTab1,
    BoxAuditTab2,
    BoxAuditTab3,
    BoxAuditTab4,
    BoxAuditTab5,
  },
};
</script>

<style scoped lang="less">
</style>
