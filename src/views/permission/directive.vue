<template>
  <div class="app-container">
    <switch-roles @change="handleRolesChange" />
    <div :key="key" style="margin-top:30px;">
      <span v-permission="['ADMIN']" class="permission-alert">
        Only
        <el-tag class="permission-tag" size="small">ADMIN</el-tag> can see this
      </span>
      <span v-permission="['GONG_YING_SHANG']" class="permission-alert">
        Only
        <el-tag class="permission-tag" size="small">GONG_YING_SHANG</el-tag> can see this
      </span>
      <span v-permission="['CU_XIAO_YUAN']" class="permission-alert">
        Only
        <el-tag class="permission-tag" size="small">CU_XIAO_YUAN</el-tag> can see this
      </span>
      <span v-permission="['admin','editor']" class="permission-alert">
        Both
        <el-tag class="permission-tag" size="small">ADMIN</el-tag> and
        <el-tag class="permission-tag" size="small">GONG_YING_SHANG</el-tag> and
        <el-tag class="permission-tag" size="small">CU_XIAO_YUAN</el-tag> can see this
      </span>
    </div>

    <div :key="'checkPermission'+key" style="margin-top:30px;">
      <code>In some cases it is not suitable to use v-permission, such as element Tab component  which can only be achieved by manually setting the v-if.
        <br> e.g.
      </code>
      <el-tabs type="border-card" style="width:500px;">
        <el-tab-pane v-if="checkPermission(['ADMIN'])" label="ADMIN">Admin can see this</el-tab-pane>
        <el-tab-pane v-if="checkPermission(['GONG_YING_SHANG'])" label="GONG_YING_SHANG">Editor can see this</el-tab-pane>
        <el-tab-pane v-if="checkPermission(['ADMIN','GONG_YING_SHANG', 'CU_XIAO_YUAN'])" label="ADMIN-OR-GONG_YING_SHANG-OR-CU_XIAO_YUAN">Both ADMIN or GONG_YING_SHANG or CU_XIAO_YUAN can see this</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import SwitchRoles from './components/SwitchRoles'

export default{
  name: 'DirectivePermission',
  components: { SwitchRoles },
  directives: { permission },
  data() {
    return {
      key: 1 // 为了能每次切换权限的时候重新初始化指令
    }
  },
  methods: {
    checkPermission,
    handleRolesChange() {
      this.key++
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
  /deep/ .permission-alert {
    width: 320px;
    margin-top: 30px;
    background-color: #f0f9eb;
    color: #67c23a;
    padding: 8px 16px;
    border-radius: 4px;
    display: block;
  }
  /deep/ .permission-tag{
    background-color: #ecf5ff;
  }
}
</style>

