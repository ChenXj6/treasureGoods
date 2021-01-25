<template>
  <div>
    <div>
      <van-nav-bar :title="$t('m.mission.mission1')" @click="changeModel"  :right-text="modelValue || $t('m.Personal.Center27')" @click-left="onClickLeft"   @click-right="openChangeModel()"></van-nav-bar>
       
    </div>
    <!-- <div class="f-flex navtask">
      <p @click="openChangeModel()">{{modelValue || $t('m.Personal.Center27')}}</p>
     
    </div> -->
    <!-- 商品列表 -->
    <div class="zylist p20" v-if="modelType == 0">
      <van-list v-model="loading" :finished="finished" :loading-text="$t('m.mission.mission21')" :finished-text="$t('m.mission.mission6')" @load="onLoad">
      <div class="taskall" v-for="(item,index) in goodslist" :key="index">
        <!-- 商品名称 -->
        <div class="title"> 
          <span style=" color: #1e95c9">{{item.goodstitle}}</span>
        </div>
        <!-- 商品介绍 -->
        
        <!--  -->
        <div class="f-flex taskitem" >
          <!-- 左侧图片 -->
          <div>
            <img :src="item.thumb" alt="">
          </div>
          <!-- 右侧 -->
          <div>
            <p><span>{{item.abstract}}</span></p>
            <p>
              <span>{{$t('m.mission.mission8')}}:</span>
              {{item.price}}
            </p>
            <p><span>{{$t('m.mission.mission9')}}：</span>{{item.profit}}&nbsp;/h</p>
          </div>
        </div>
        <div>
          <el-button type="primary" @click="purchase(item.id)">{{$t('m.mission.mission15')}}</el-button>   
        </div>
      </div>
      </van-list>
    </div>
    <!-- 购买记录 -->
    <div class="zylist p20" v-else>
      <div class="source f-flex">
          <p>{{$t('m.payRecords.record7')}}: {{$currency}} {{goods_hour_profit || 0.00}}{{$numberUnit}}&nbsp;/h</p>
          <p>{{$t('m.payRecords.record4')}}: {{$currency}} {{totalmoney || 0.00}}{{$numberUnit}}</p>
          <p>{{$t('m.payRecords.record8')}}: {{$currency}} {{goods_total_profit || 0.00}}{{$numberUnit}}</p>

        </div>
      <van-list v-model="loading" :finished="finished" :loading-text="$t('m.mission.mission21')" :finished-text="$t('m.mission.mission6')" @load="onLoad1">
        <div class="recordllist" v-for="(item, index) in payRecordsList" :key="index">
            <p class="goods"><span>{{item.goodstitle}}</span><span>{{$t('m.payRecords.record9')}}{{$currency}} {{item.totalprofit}}{{$numberUnit}}</span></p>
            <p>{{$t('m.payRecords.record2')}} &nbsp; {{item.createtime | formatDate}}</p>
        </div>
      </van-list>
    </div>
    <!--  -->
    <div style="width:100%;height:98px"></div>
    <Foot></Foot>
    <van-popup v-model="isopenChangeModel"
                position="bottom">
      <van-picker show-toolbar
                  :columns="modelTypes"
                  @cancel="isopenChangeModel = false"
                  @confirm="changeModel"
                  :confirm-button-text="$t('m.Personal.Center23')"
                  :cancel-button-text="$t('m.Personal.Center24')" />
    </van-popup>
  </div>
</template>

<script>
import Foot from '@/components/index/footer'
export default {
  data() {
    return {
      type: 2,
      page:1,
      goodslist:[],
      loading: false,
      finished: false,
      dy:require('../../assets/Tiktok.png'),
      ks:require('../../assets/Zantine.png'),
      grade:this.$route.query.grad,
      payRecordsList:[],
      totalmoney:'',
      isopenChangeModel:false,
      modelType:0,
      modelValue:'',
      modelTypes:[
        {text:this.$t('m.Personal.Center27'),value:0},
        {text:this.$t('m.Personal.Center26'),value:1},
      ],
      goods_hour_profit:'',
      goods_total_profit:'',

    };
  },
  components:{
    Foot
  },
  mounted(){
    this.getGoods_list();
    this.getPurchaserecords();
  },
   filters: {
    formatDate: function(value) {
      let date = new Date(value*1000);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    }
  },
  methods: {
    // 选择商品列表和购买记录
    openChangeModel(){
      this.isopenChangeModel = true;
    },
    changeModel(e){
      let islogin = this.getCookie3("openid") || false;
      if(e.value == 1){
        if(islogin == false){
          this.$toast('Please log in again!');
          this.isopenChangeModel = false;
          setTimeout(()=>this.$router.push({name:'login'}),1000)
          return;
        }else{
          this.page = 1;
          this.onLoad1();
        }
      }
      this.modelValue = e.text;
      this.modelType = e.value;
      this.isopenChangeModel = false;
      this.page = 1;
    },
    purchase(id){
      this.$api.Post('payGood',{id}).then(res=>{
        if(res.status==1){
          this.$toast(res.result.message)
        }
      })
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    // 获取数据
    getGoods_list(){
      this.$api.Post('goodslist',{
        page:this.page,
        psize: 10
       }).then(res=>{
         if(res.status==1){
           this.goodslist = res.result.goodslist;
         }
       })
    },
    getPurchaserecords(){
      this.$api.Post('Purchaserecords',{
        page:this.page,
        psize: 10
       }).then(res=>{
         if(res.status==1){
           this.payRecordsList = res.result.list;
           this.totalmoney = res.result.profit;
           this.goods_hour_profit = res.result.goods_hour_profit;
           this.goods_total_profit = res.result.goods_total_profit;
         }
       })
    },
    onLoad() {
      // 异步更新数据
      this.page++;
      this.$api
        .Post("goodslist", {
          page:this.page,
          psize: 10
        })
        .then(res => {
          if (res.status == 1) {
            this.goodslist = this.goodslist.concat(res.result.goodslist);
            // 数据全部加载完成
            if (res.result.goodslist.length < 10) {
              this.finished = true;
            }
            
          }
        });
      // 加载状态结束
      this.loading = false;
    },
    onLoad1() {
      // 异步更新数据
      this.page++;
      this.$api
        .Post("Purchaserecords", {
          page:this.page,
          psize: 10
        })
        .then(res => {
          if (res.status == 1) {
            this.payRecordsList = this.payRecordsList.concat(res.result.list);
            this.totalmoney = res.result.profit;
            this.goods_hour_profit = res.result.goods_hour_profit;
            this.goods_total_profit = res.result.goods_total_profit;
            // 数据全部加载完成
            if (res.result.list.length < 10) {
              this.finished = true;
            }
          }
        });
      // 加载状态结束
      this.loading = false;
    }
  }
};
</script>

<style lang="less" >
.p20{
  padding: 0 10px !important;
}
.navtask {
  border-bottom: 1px solid #1e243d;
  padding: 15px;
  .active {
    color: #57a1ec;
    background-color: #171c2f;
  }
  > p {
    width: 100% !important;
    text-align: center;
    padding: 0.3rem 0;
    border-radius: 0.16667rem;
  }
}
.taskall{
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  margin-bottom: 20px;
  background-color: #1e243d;
  >div:last-child{
    width: 100%;
    margin: 10px 0;
    padding-bottom: 10px;
    box-sizing: border-box;
    >button{
      width: 60%;
      display:block;
      margin: 0 auto;
    }
  }
}
.taskitem {
  position: relative;
  padding: 10px;
  line-height: 26px;
  > div:nth-child(1) {
    width: 30%;
    img{
      width: 100%;
      // height: 100%;
    }
  }
  > div:nth-child(2) {
    width: 60%;
    margin-left: 10%;
    min-height: 100px !important;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-size: 14px;
    >p:nth-child(1){
      min-height:30%;
      width: 100%;
      line-height: 16px;
      max-height: 50%;
      display:-webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-box-orient:vertical;
      -webkit-line-clamp:3;
    }
    span {
      color: #fff;
      padding: 5px 0;
      border-radius: 20px;
    }
  }
  // img {
  //   width: 50px;
  //   // margin-top: 30px;
  // }
}
.copylink{
  text-align: center;
  padding:0 10px 10px;
  button{
    
  }
}
.title .float-r { font-size: 16px; color: #f90;}
.title .float-r span{ font-size: 12px; color: #999; margin-right: 6px;}
.recordllist{
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-bottom: 10px;
}
.source {
  border-bottom: 1px solid #eee;
  width: 100%;
  padding: 10px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  > p {
    padding-top: 15px;
    font-size: 12px;
  }
}
.goods{
  display: flex;
  justify-content: space-between;
}
</style>
