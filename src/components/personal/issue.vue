<template>
  <div>
    <div>
      <van-nav-bar :title="$t('m.personal.release1')" left-text left-arrow @click-left="onClickLeft" />
    </div>
    <!-- <div class="mealimg">
         <img src="../../assets/logo1.png" alt />
    </div>-->
    <div class="p20">
      <div class="issuelist" v-for="(item,index) in issuelist" :key="index">
        <div class="f-flex f-jc-sb">
          <p>{{item.setmealname}}</p>
          <p>
            {{$t('m.personal.release2')}}
            <span>INR {{item.price}}</span>
          </p>
        </div>
        <div>
          <p>{{$t('m.personal.release3')}}:{{item.number}}</p>
          <p>{{$t('m.personal.release4')}}:{{item.money}}{{$t('m.personal.release5')}}</p>
          <!-- <p><el-button class="f-flex f-jc-sb"><span>赠送(每天{{item.give}}条接单任务)</span>   <el-button type="primary">购买</el-button></p> -->
          <p class="f-flex f-jc-sb">
            <span>{{$t('m.personal.release6')}}{{item.give}}{{$t('m.personal.release7')}}</span>
            <el-button type="primary" @click="detail(index)">{{$t('m.personal.release8')}}</el-button>
          </p>
    
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      issuelist: "",
      reward: "",
      xinx: false,
      id: "",
      textarea2:'',
      options: [
        {
          value: "1",
          label: this.$t('m.personal.release9')
        },
        {
          value: "2",
          label: this.$t('m.personal.release10')
        },
        {
          value: "3",
          label: this.$t('m.personal.release11')
        }
      ],
      value: "1"
    };
  },
  mounted() {
    this.my_setmeal_list();
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    my_setmeal_list() {
      this.$api.Post("my_setmeal_list").then(res => {
        if (res.status == 1) {
          this.issuelist = res.result.list;
        }
      });
    },
    detail(e){
       this.$router.push({name:'issuedetail',query:{index:e}})
    }

  }
};
</script>

<style lang="less">
.mealimg {
  text-align: center;
  img {
    width: 200px;
  }
}
.issuelist {
  border-radius: 8px;
  box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  font-size: 14px;
  > div:nth-child(1) {
    background: #0e1526 !important;
    border-radius: 8px 8px 0 0;
    padding: 12px;
    color: #fff;
    > p:nth-child(2) {
      span {
        font-weight: 700;
        font-size: 18px;
      }
    }
  }
  > div:nth-child(2) {
    padding: 15px;
    font-weight: 700;
    line-height: 36px;
    > p:nth-child(3) {
      button{
        padding: 5px 10px;
      }
    }
  }
}
.xinx {
  padding: 20px;
  i {
    color: #ffbf00;
    vertical-align: middle;
    margin-right: 10px;
    font-size: 27px;
  }
  > p:nth-child(2) {
    width: 80%;
    margin-left: 40px;
    font-size: 14px;
  }
}
</style>