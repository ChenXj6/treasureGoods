<template>
  <div>
    <div>
      <van-nav-bar :title="$t('m.taskmanagement.management1')" left-text left-arrow @click-left="onClickLeft" />
    </div>
    <div>
      <div>
        <div class="source f-flex f-jc-c">
            <p>{{$t('m.taskmanagement.management1')}}：</p> 
          <van-dropdown-menu>
            <van-dropdown-item v-model="value1" @change="tasktype" :options="option1" />
          </van-dropdown-menu>
        </div>
      </div>
    </div>
      <div class="p20">
      <div class="issuelist" v-for="(item,index) in managelist" :key="index">
        <div class="f-flex f-jc-sb">
          <p>{{item.tasksname}}</p>
          <p>
           {{item.status=='1'?$t('m.taskmanagement.management2'):$t('m.taskmanagement.management3')}}
          </p>
        </div>
        <div>
          <p>{{$t('m.taskmanagement.management4')}}:{{item.total}} ({{item.total}}/{{item.number}})</p>
          <p>{{$t('m.taskmanagement.management5')}}:{{item.money}}{{$t('m.taskmanagement.management6')}}</p>
          <!-- <el-button class="f-flex f-jc-sb"><span>赠送(每天6条接单任务)</span>   <el-button type="primary">购买</el-button></p> -->
          <p class="f-flex f-jc-sb">
            <span>{{$t('m.taskmanagement.management7')}}：{{item.needs}}</span>
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
      value1: '',
      option1: [
        { text: this.$t('m.taskmanagement.management8'), value: '' },
        { text: this.$t('m.taskmanagement.management3'), value: 0 },
        { text: this.$t('m.taskmanagement.management2'), value: 1 },
        // { text: "已驳回", value: 3 },
      ],
      managelist:''
    };
  },
  mounted() {
    this.my_publish()
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    tasktype(){
       this.my_publish()
    },
    my_publish(){
      this.$api.Post('my_publish',{status:this.value1}).then(res=>{
        if(res.status==1){
          this.managelist=res.result.list
        }
      })
    }
  }
};
</script>


<style lang="less">

.source{
    position: relative;
    // border-bottom: 1px solid #eee;
    >p{
        padding-top: 15px;
        font-size: 16px;
    }
}
.van-dropdown-menu__title{
        font-size: 16px !important;
}
</style>