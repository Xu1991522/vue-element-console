<template>
  <div class="container--store common-top-nav-rown">
    <div class="labelHead">store</div>
  </div>
</template>

<script>
// import time from '@/utils/time'
// import { getStoreInfo } from '@/api/orgManage/shop.js'

export default {
  // name: 'store',
  data() {
    return {
      // loading: true, // 表格加载

      // storeStock: [],
      // pager: {
      //   num: 1, // 当前页数
      //   size: 10, // 每页显示条目个数
      //   count: 0 // 总条目数
      // },
    }
  },
  computed: {},
  created() {
    // this.getStoreInfo()
  },
  methods: {
    // getStoreInfo() {
    //   this.listLoading = true
    //   getStoreInfo(this.pager.num).then(res => {
    //     console.log(res)
    //     this.storeStock = res.data.datas

    //     this.pager = {
    //       // num: res.data.pageNo + 1,
    //       // num: res.data.pageNo + 1,
    //       num: res.data.pageNo,
    //       size: res.data.pageSize,
    //       count: res.data.totalCount
    //     }
    //   })
    // }
  }
}
</script>

<style lang="scss">
.container--store {
  .el-input-group__append {
    background: #038ae3 !important;
    color: #fff !important;
    border: 1px solid #038ae3;
  }
}
</style>

<style lang="scss" scoped>
 .common-top-nav-rown{
   padding: 15px;
 }
 .labelHead{
    border: 1px solid #ebeef5;
    padding: 15px 10px 25px 10px;
    height: 36px;
    line-height: 36px;
  }
</style>

