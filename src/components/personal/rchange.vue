<!--  -->
<template>
  <div>
    <div>
      <van-nav-bar :title="$t('m.Recharge.Recharge1')"
                   left-text
                   left-arrow
                   @click-left="onClickLeft" />
    </div>
    <div class="ras f-flex">
      <div class="recharges">
          <h4 style="margin:0 0 20px" v-if="pay_type == 'mppay'">{{$t('m.Recharge.Recharge5')}}</h4>
        <!-- <form class="form-horizontal js-ajax-form margin-top-20"> -->
          <div class="TipsBox" v-if="pay_type == 'mppay'">
            <input type="text"
               class="form-control TipsTitle"
               name="ifsc"
               id="IFSC"
               readonly
               v-model="$store.state.ifsc">
            <div class="TipsBtn" @click="copyFn('#IFSC', 'IFSC')"><img src="../../assets/copy.png" alt="" style="width:25px;height:25px"></div>
          </div>
        <div class="TipsBox" v-if="pay_type == 'mppay'">
            <input type="text"
               class="form-control TipsTitle"
               name="ifsc"
               id="receiveVa"
               readonly
               v-model="$store.state.receiveVa">
            <div class="TipsBtn" @click="copyFn('#receiveVa', 'ReceiveVa')"><img src="../../assets/copy.png" alt="" style="width:25px;height:25px"></div>
        </div>


       
        <input type="text"
               class="form-control form-money"
               name="amount"
               readonly
               v-model="money">
        <p>
          <button   v-if="pay_type != 'mppay'"
                    class="btn" :class="sub ? 'noSub' : ''"
                    id="rzp-button1"
                    :disabled='sub' @click="methods1">{{ sub ? time+'S' : $t('m.Recharge.Recharge3')}}</button>
          <button   v-else
                    class="btn" :class="sub ? 'noSub' : ''"
                    id="rzp-button1"
                    :disabled='sub' @click="methods2">{{ sub ? time+'S' : $t('m.Recharge.Recharge3')}}</button>
        </p>

        <!-- </form> -->
      </div>

    </div>
  </div>
</template>

<script src="../../api/import.js"></script>
<script>
import { clickPay, options } from "../../api/import";
import Clipboard from "clipboard";

export default {
  data () {
    return {
      money: '',
      value: '',
      columns: [],
      op: [],
      showPicker: false,
      host: process.env.NODE_ENV == 'development' ? 'http://5016.yesswl.top' : `${location.protocol}//${location.host}`,
      postData: {
      },
      money: '',
      sign: '',
      url: '',
      appid: '',
      out_trade_no: '',
      version: '',
      pay_type: '',
      callback_url: '',
      success_url: '',
      error_url: '',
      dislong: false,
      haveSign: true,
      sub: true,
      time: 3,
      timer: null,
      pay_type:'',
      payUrl:''
    }
  },
  methods: {
    methods1: function () {
      if(this.pay_type == 'mixyd' || '786' || 'loanmanager' || 'shineupay'){
        location.href = this.payUrl
      }else{
        clickPay();
      }
    },
    methods2(){
      this.$router.push({name:'index'})
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    getSign () {
      let amount = this.money;
      return new Promise((resolve) => {
        this.$api.Post('get_sign', { amount }).then(res => {
          resolve(res)
        })
      })
    },
    copyFn(id,title) {
      var clipboard = new Clipboard(id)
      clipboard.on('success', e => {
        this.$toast({
          message: '复制成功'
        })
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        this.$toast({
          message: '手机权限不支持复制功能'
        })
        console.log('该浏览器不支持自动复制')
        // 释放内存
        clipboard.destroy()
      })
    },
  },
  created () {
    this.money = this.$route.query.amount;
    this.payUrl = '';
    this.getSign().then(res => {
      if (res.result != '') {
        options.key = res.result.postData.key   
        // options.key = 'rzp_live_GSPBCypUEBaML4' 
        options.amount = res.result.postData.amount
        options.callback_url = res.result.postData.callback_url
        options.order_id = res.result.postData.pay_order_id
        this.pay_type = res.result.postData.pay_type;
        this.$store.state.receiveVa = res.result.postData.receiveVa;
        this.$store.state.ifsc = res.result.postData.ifsc;
        this.payUrl = res.result.postData.payUrl;
      }
    })
  },
  mounted () {
    setTimeout(() => {
      this.sub = false;
    }, 3000)
    this.timer = setInterval(() => {
      this.time--;
      if (this.time < 1) {
        clearInterval(this.timer)
      }
    }, 1000)
  },
}
</script>

<style scoped>
.btn {
  width: 100%;
  height: 50px;
  background-color: #409eff;
  line-height: 50px;
  text-align: center;
  border-radius: 5px;
  margin: 10px 0;
  box-sizing: border-box;
}
.noSub {
  background-color: #999999;
}
.TipsBox{
  width: 100%;
  display: flex;
  justify-content: flex-start;
  height: 50px;
  margin-bottom: 20px;
  line-height: 50px;
  text-align: center;
  border-radius: 5px;
  background-color: #999999;
}
.TipsLabel{
  width: 30%;  
  /* background-color: #999999; */
  text-align: center;
}
.TipsTitle{
  width: 85%;
  background-color:#ffffff;
  text-align: center;
  color: #409eff;
}
.TipsBtn{
  max-width: 15%;
  width: 15%;
}
</style>