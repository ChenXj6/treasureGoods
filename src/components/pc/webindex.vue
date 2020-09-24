<template>
  <div>
    <div class="webindex">
      <el-tabs type="border-card"  v-model="tabvalue" @tab-click='seles' >
           <p class="search f-flex">
            <el-input v-model="keyword" :placeholder="$t('m.frontindex.front1')"></el-input>
            <el-button type="primary" @click="search">{{$t('m.frontindex.front2')}}</el-button>
          </p>
        <el-tab-pane :label="$t('m.frontindex.front3')" name="1">
          <div class="mt2">
            <el-table :data="memberlist" border style="width: 100%">
              <el-table-column prop="id" :label="$t('m.frontindex.front4')" width="180">
              </el-table-column>
              <el-table-column prop="incode" :label="$t('m.frontindex.front5')" width="180">
              </el-table-column>
              <el-table-column prop="mobile" :label="$t('m.frontindex.front6')">
              </el-table-column>
              <el-table-column prop="createtime" :label="$t('m.frontindex.front7')">
              </el-table-column>
              <el-table-column prop="credit2" :label="$t('m.frontindex.front8')"> </el-table-column>
            </el-table>
          </div>
         
        </el-tab-pane>
        <el-tab-pane :label="$t('m.frontindex.front9')" name="2">
          <div class="mt2">
            <el-table :data="rewardlist" border style="width: 100%">
              <el-table-column prop="logno" :label="$t('m.frontindex.front10')"> </el-table-column>
              <el-table-column :label="$t('m.frontindex.front11')">
                <template slot-scope="scope" v-if="true">
                  <img :src="scope.row.avatar" alt="" />
                  <span style="margin-left: 10px">{{
                    scope.row.nickname
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="mobile" :label="$t('m.frontindex.front12')">
              </el-table-column>
              <el-table-column prop="title" :label="$t('m.frontindex.front13')"> </el-table-column>
              <el-table-column prop="money" :label="$t('m.frontindex.front14')"> </el-table-column>
              <el-table-column prop="createtime" :label="$t('m.frontindex.front15')">
              </el-table-column>
              <el-table-column prop="credit2" :label="$t('m.frontindex.front16')">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{
                    scope.row.status == 1 ? $t('m.frontindex.front17') : $t('m.frontindex.front18')
                  }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
         
        </el-tab-pane>
        <el-tab-pane :label="$t('m.frontindex.front19')" name="3">
          <div class="mt2">
            <el-table :data="setmeal_lists" border style="width: 100%">
              <el-table-column prop="id" label="ID" width="180">
              </el-table-column>
              <el-table-column prop="mobile" :label="$t('m.frontindex.front20')" width="180">
              </el-table-column>
              <el-table-column prop="setmealname" :label="$t('m.frontindex.front21')">
              </el-table-column>
    
              <el-table-column prop="credit2" :label="$t('m.frontindex.front22')">
                     <template slot-scope="scope">
                  <span style="margin-left: 10px">{{
                    scope.row.status == 1 ? $t('m.frontindex.front23') : $t('m.frontindex.front24')
                  }}</span>
                </template>
                   </el-table-column>
              <el-table-column prop="createtime" :label="$t('m.frontindex.front25')"> </el-table-column>
            </el-table>
          </div>
           
        </el-tab-pane>
        <!-- 分页 -->
         <div class="mt1" v-if="total>20">
            <el-pagination background @current-change='cpage1' layout="prev, pager, next" :page-size='20' :total="total">
            </el-pagination>
          </div>
      </el-tabs>
      <div class="exitbtn">
            <el-button type="primary" @click="exitbtn">{{$t('m.frontindex.front26')}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabvalue:'1',
      memberlist: [],
      rewardlist: [],
      setmeal_lists: [],
      page:1,
      keyword:'',
      total:0,
    };
  },
 
  mounted() {
    this.member();
    // this.reward();
    // this.setmeal_list();
  },
  methods: {
      //会员信息列表
    member() {
      this.$api
        .Post("member", {
          web: "pc",
          page:this.page,
          keyword:this.keyword,
          webopenid: localStorage.getItem("webopenid"),
        })
        .then((res) => {
          this.memberlist = res.result.list;
          this.total=res.result.total
        });
    },
    //财务管理列表
    reward() {
      this.$api
        .Post("reward", {
          web: "pc",
           page:this.page,
          keyword:this.keyword,
          webopenid: localStorage.getItem("webopenid"),
        })
        .then((res) => {
          this.rewardlist = res.result.list;
          this.total=res.result.total

        });
    },
    //购买信息列表
    setmeal_list() {
      this.$api
        .Post("setmeal_list", {
          web: "pc",
           page:this.page,
          keyword:this.keyword,
          webopenid: localStorage.getItem("webopenid"),
        })
        .then((res) => {
          this.setmeal_lists = res.result.list;
          this.total=res.result.total
        });
    },
    //导航切换
    seles(){
        this.page=1;
        this.keyword=''
         if(this.tabvalue=='1'){
            this.member();
        } else
        if(this.tabvalue=='2'){
            this.reward();
        }else
        if(this.tabvalue=='3'){
            this.setmeal_list();
        }
    },
    //下一页
    cpage1(e){
         this.page=e;
        if(this.tabvalue=='1'){
            this.member();
        } else
        if(this.tabvalue=='2'){
            this.reward();
        }else
        if(this.tabvalue=='3'){
            this.setmeal_list();
        }
    },
    //搜索
    search(){
         if(this.tabvalue=='1'){
            this.member();
        } else
        if(this.tabvalue=='2'){
            this.reward();
        }else
        if(this.tabvalue=='3'){
            this.setmeal_list();
        }
    },
   //退出登录
   exitbtn(){
       localStorage.removeItem('webopenid');
       this.$api.Post('weblogout',{
            webopenid: localStorage.getItem("webopenid"),
            web:'pc'
       }).then(res=>{
               this.$router.replace({name:'weblogin'})
        
       })
   }

  },
};
</script>

<style lang="less">
.webindex {
  position: relative;
  padding: 10px 0;
  .search {
    width: 60%;
  }
  .exitbtn{
      position: absolute;
      top:10px;
      z-index: 1000000000000;
      right: 5px;
  }
}
.webindex .el-table .cell {
  img {
    width: 25px;
  }
}
.webindex .el-table .cell{
    font-size: 14px ;
    // font-weight: 400;
}
</style>
