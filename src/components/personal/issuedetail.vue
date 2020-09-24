<template>
  <div>
    <div>
      <van-nav-bar :title="$t('m.personal.release1')" left-text left-arrow @click-left="onClickLeft" />
    </div>
    <!-- <div class="mealimg">
         <img src="../../assets/logo1.png" alt />
    </div>-->
    <div class="p20">
      <div class="issuelist">
        <div class="f-flex f-jc-sb">
          <p>{{detailcon.setmealname}}</p>
          <p>
            {{$t('m.personal.release2')}}
            <span>INR {{detailcon.price}}</span>
          </p>
        </div>
        <div>
          <p>{{$t('m.personal.release3')}}:{{detailcon.number}}</p>
          <p>{{$t('m.personal.release4')}}:{{detailcon.money}}{{$t('m.personal.release5')}}</p>
          <!-- <el-button class="f-flex f-jc-sb"><span>赠送(每天6条接单任务)</span>   <el-button type="primary">购买</el-button></p> -->
          <p class="f-flex f-jc-sb">
            <span>{{$t('m.personal.release6')}}{{detailcon.give}}{{$t('m.personal.release7')}}</span>
          </p>
          <!-- <p class="f-flex">
              任务编号：<el-input v-model="tasksname" placeholder="请输入任务编号" style="width:70%;"></el-input>
          </p> -->
           <p class="f-flex mt1">
               {{$t('m.personalsupplement.supplement1')}}<span style="  opacity: 0;">{{$t('m.personalsupplement.supplement2')}}</span>{{$t('m.personalsupplement.supplement3')}}<el-input v-model="needs" :placeholder="$t('m.personalsupplement.supplement4')" style="width:70%;"></el-input>
          </p>
          <p class="f-flex mt1">
            {{$t('m.personalsupplement.supplement5')}}
            <el-select v-model="value" placeholder="Select" style="width:70%">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </p>
          <div>
            <p>{{$t('m.personalsupplement.supplement6')}}</p>
            <p>
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                :placeholder="$t('m.personalsupplement.supplement7')"
                v-model="link"
              ></el-input>
            </p>
          </div>
        </div>
      </div>
      <div>
            <el-button type="primary" style="width:100%" @click="announce">{{$t('m.personalsupplement.supplement8')}}</el-button>
      </div>
    </div>
    <!-- 确认信息 -->
    <van-dialog v-model="xinx" show-cancel-button @confirm="confirms">
      <div class="xinx">
        <p>
          <van-icon name="question" />{{$t('m.personalsupplement.supplement9')}}
        </p>
      </div>
    </van-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detailcon: "",
      reward: "",
      xinx: false,
      id: "",
      tasksname:'',
      link:'',
      needs:'',
      ind:this.$route.query.index,
      options: [
        {
          value: "0",
          label: this.$t('m.personalsupplement.supplement10')
        },
        {
          value: "1",
          label: this.$t('m.personalsupplement.supplement11')
        },
       
      ],
      value: "0"
    };
  },
  mounted() {
    this.my_task_one();
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    my_task_one() {
      this.$api.Post("my_setmeal_list").then(res => {
        if (res.status == 1) {
          this.detailcon = res.result.list[this.ind];
        }
      });
    },
    announce() {
        // if(this.tasksname==''){
        //     this.$toast('请输入任务编号')
        //     return
        // }
         if(this.needs==''){
            this.$toast(this.$t('m.personalsupplement.supplement12'))
            return
        }
         if(this.link==''){
            this.$toast(this.$t('m.personalsupplement.supplement13'))
            return
        }
       this.xinx = true;
    },
    confirms() {
      this.$api.Post("publish", 
      { id: this.detailcon.id,
        tasksname:this.tasksname,
        needs:this.needs,
        link:this.link,
        type:this.value

      }).then(res => {
        this.$toast(res.result.message);
        if (res.status == 1) {
          this.$router.go(-1);
        }
      });
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
    background: #57a1ec;
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