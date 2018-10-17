<template>
  <div class="container--shop common-top-nav-rown">
    <div class="labelHead">1</div>
    <el-table
      v-loading="loading"
      :data="storeStock"
      tooltip-effect="dark"
      style="width: 100%;margin-top:15px;"
      empty-text="暂无相关卡信息"
      border>
      <el-table-column
        :min-width="storeStock.every((el)=>el.name===''||el.name===null)?'160':'160'"
        label="门店名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column
        width="100"
        prop="address"
        label="门店地址">
      </el-table-column>
      <el-table-column
        width="160"
        prop="area_code"
        label="门店区号">
      </el-table-column>
      <el-table-column
        :width="storeStock.every((el)=>el.create_time===''||el.create_time===null)?'80':'160'"
        label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.create_time || time('yyyy-MM-dd HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column
        width="100"
        prop="delete_sign"
        label="delete_sign">
      </el-table-column>
      <el-table-column
        width="160"
        prop="food_distribution_center"
        label="食物配送中心">
      </el-table-column>
      <el-table-column
        width="160"
        prop="fresh_distribution_center"
        label="生鲜配送中心">
      </el-table-column>
      <el-table-column
        width="120"
        prop="purchase_group"
        label="购买集团">
      </el-table-column>
      <el-table-column
        width="100"
        prop="responsible"
        label="负责人">
      </el-table-column>
      <el-table-column
        width="120"
        prop="responsible_tel"
        label="负责人电话">
      </el-table-column>
      <el-table-column
        :width="storeStock.every((el)=>el.create_time===''||el.create_time===null)?'80':'160'"
        label="更新时间">
        <template slot-scope="scope">
          {{ scope.row.update_time | time('yyyy-MM-dd HH:mm:ss') }}
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :page-sizes="[10, 20, 30, 40,50]"
      :current-page="pager.num"
      :page-size="pager.size"
      :total="pager.count"
      layout="total, sizes, prev, pager, next, jumper"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
    </el-pagination>
    <!-- <el-table
      border
      ref="multipleTable"
      :data="cardStock"
      v-loading="loading"
      tooltip-effect="dark"
      style="width: 100%;margin-top:15px;"
      @header-contextmenu="headerclick"
      empty-text="暂无相关卡信息"
      @select-all="handleAllSelectionChange"
    ></el-table> -->
  </div>
</template>

<script>
import time from '@/utils/time'
import { getStoreInfo } from '@/api/orgManage/shop.js'

export default {
  // name: 'store',
  data() {
    return {
      loading: true, // 表格加载
      storeStock: [],
      pager: {
        num: 1, // 当前页数
        size: 10, // 每页显示条目个数
        count: 0 // 总条目数
      }
    }
  },
  computed: {},
  created() {
    this.getStore()
  },
  methods: {
    getStore() {
      this.loading = false
      console.log('this.getStore!!!!!!!!!!')
      getStoreInfo(this.pager.num).then(res => {
        console.log('this.getStore!!!!!!!!!!')
        this.loading = false
        console.log(res.data.data.datas)
        this.storeStock = res.data.data.datas

        this.pager = {
          // num: res.data.pageNo + 1,
          // num: res.data.pageNo + 1,
          num: res.data.pageNo,
          size: res.data.pageSize,
          count: res.data.totalCount
        }
        // this.total = response.data.total
        // this.listLoading = false
        // this.oldList = this.list.map(v => v.id)
        // this.newList = this.oldList.slice()
        // this.$nextTick(() => {
        //   this.setSort()
        // })
      })
    },
    handleCurrentChange(val) {
      this.listPageInWareHouseByCondition(val, this.pager.size)
    },
    handleSizeChange(val) {
      this.listPageInWareHouseByCondition(1, val)
    }
  }
}
</script>

<style lang="scss">
.container--shop {
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


