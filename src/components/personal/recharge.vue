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
        <!-- <p><el-input v-model="money" :placeholder="$t('m.Recharge.Recharge2')"></el-input></p>
         <p><el-button type="primary" @click="showPicker=true">充值方式</el-button></p> -->
        <form class="form-horizontal js-ajax-form margin-top-20">
          <input type="text"
                 class="form-control form-money"
                 name="amount"
                 placeholder="Please enter the top-up amount"
                 :disabled="!haveSign"
                 v-model="money">
          <!--  -->
          <!-- <div class="van-dropdown-menu van-hairline--top-bottom" v-if="this.pay_type == 'loanmanager'">
            <div role="button"
                 tabindex="0"
                 class="van-dropdown-menu__item"
                 @click="openChangePaytype"
                 >
              <span class="van-dropdown-menu__title">
                <div class="van-ellipsis">{{paytypeValue}}</div>
              </span>
            </div>
          </div> -->
          <!--  -->
          <!-- <input type="text"
                 v-if="this.pay_type == 'loanmanager' && paytype == 2"
                 class="form-control form-money"
                 name="amount"
                 :placeholder="$t('m.Balance.withdrawal15')"
                 v-model="accno">
          <input type="text"
                 v-if="this.pay_type == 'loanmanager' && paytype == 2"
                 class="form-control form-money"
                 name="amount"
                 @click="openChangeBankcode"
                 :placeholder="$t('m.Recharge.Recharge18')"
                 v-model="bankCode"> -->
          <!--  -->
          <input type="text"
                 class="form-control form-hidden"
                 name="appid"
                 :value="appid">
          <input type="text"
                 class="form-control form-hidden"
                 name="out_trade_no"
                 :value="out_trade_no">
          <input type="text"
                 class="form-control form-hidden"
                 name="version"
                 :value="version">
          <input type="text"
                 class="form-control form-hidden"
                 name="pay_type"
                 :value="pay_type">
          <input type="text"
                 class="form-control form-hidden"
                 name="callback_url"
                 :value="callback_url">
          <input type="text"
                 class="form-control form-hidden"
                 name="success_url"
                 :value="success_url">
          <input type="text"
                 class="form-control form-hidden"
                 name="error_url"
                 :value="error_url">
          <input type="text"
                 class="form-control form-hidden"
                 name="sign"
                 :value="sign">
                 {{sign}}
          <p>
            <el-button type="primary"
                       @click="openDialong"
                       class="btn"
                       v-if="haveSign">Enter the amount</el-button>
          </p>
        </form>
      </div>

    </div>
    <van-popup v-model="showPicker"
               position="bottom">
      <van-picker show-toolbar
                  :columns="columns"
                  @confirm="onConfirm"
                  @cancel="showPicker = false" />
    </van-popup>
            <!-- pay_type -->
    <van-popup v-model="changePaytype"
                position="bottom">
      <van-picker show-toolbar
                  :columns="paytypes"
                  @cancel="changePaytype = false"
                  @confirm="onChangePaytype"
                  :confirm-button-text="$t('m.Personal.Center23')"
                  :cancel-button-text="$t('m.Personal.Center24')" />
    </van-popup>
    <van-popup v-model="changeBankcode"
                position="bottom">
      <van-picker show-toolbar
                  :columns="bankCodes"
                  @cancel="changeBankcode = false"
                  @confirm="onChangeBankcode"
                  :confirm-button-text="$t('m.Personal.Center23')"
                  :cancel-button-text="$t('m.Personal.Center24')" />
    </van-popup>
  </div>
</template>

<script>
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
      maxmoney:'',
      minmoney:'',
      paytype:'',
      changePaytype:false,
      changeBankcode:false,
      bankCode:'',
      paytypeValue :this.$t('m.Recharge.Recharge14'),
      paytypes: [
        { text: this.$t('m.Recharge.Recharge14'), value: 0 },
        { text: this.$t('m.Recharge.Recharge15'), value: 1 },
        { text: this.$t('m.Recharge.Recharge16'), value: 2 },
      ],
      bankCodes: [
        { text: 'KBANK', value: 'KBANK' },
        { text: 'BBL', value: 'BBL' },
        { text: 'BAAC', value: 'BAAC' },
        { text: 'BOA', value: 'BOA' },
        { text: 'BAY', value: 'BAY' },
        { text: 'BOC', value: 'BOC' },
        { text: 'BNPP', value: 'BNPP' },
        { text: 'CIMB', value: 'CIMB' },
        { text: 'CITI', value: 'CITI' },
        { text: 'DB', value: 'DB' },
        { text: 'GHB', value: 'GHB' },
        { text: 'ICBC', value: 'ICBC' },
        { text: 'TIBT', value: 'TIBT' },
        { text: 'CHAS', value: 'CHAS' },
        { text: 'KKB', value: 'KKB' },
        { text: 'KTB', value: 'KTB' },
        { text: 'LHBA', value: 'LHBA' },
        { text: 'MEGA', value: 'MEGA' },
        { text: 'MHCB', value: 'MHCB' },
        { text: 'SCBT', value: 'SCBT' },
        { text: 'SMTB', value: 'SMTB' },
        { text: 'TBNK', value: 'TBNK' },
        { text: 'GSB', value: 'GSB' },
        { text: 'HSBC', value: 'HSBC' },
        { text: 'SCB', value: 'SCB' },
        { text: 'SMBC', value: 'SMBC' },
        { text: 'TCRB', value: 'TCRB' },
        { text: 'TISCO', value: 'TISCO' },
        { text: 'TMB', value: 'TMB' },
        { text: 'UOB', value: 'UOB' },
      ],

    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created () {
    this.logo()
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted () {
  },
  methods: {
    openChangePaytype(){
      this.changePaytype = true
    },
    // 选择支付方式
    onChangePaytype (e) {
      if (e.value == 0) {
        this.$toast(this.$t('m.Recharge.Recharge17'))
        return
      }
      this.paytype = e.value;
      this.paytypeValue = e.text;
      this.changePaytype = false;
    },
    // 打开选择
    openChangeBankcode () {
      this.changeBankcode = true;
    },
    // 选择银行编码
    onChangeBankcode (e) {
      this.bankCode = e.value;
      this.changeBankcode = false
    },
    openDialong () {
      if (this.money == '') {
        this.$toast('Please enter the recharge amount!')
        return
      }else if(this.money < this.minmoney){
        this.$toast(this.$t('m.Recharge.Recharge6') + this.minmoney)
        return
      }else if(this.money > this.maxmoney){
        this.$toast(this.$t('m.Recharge.Recharge7') + this.maxmoney)
        return
      }
      // if(this.pay_type == 'loanmanager'){
      //   if (this.paytype == 2) {
      //     if (this.bankCode == '') {
      //       this.$toast(this.$t('m.Recharge.Recharge18'))
      //       return
      //     }
      //     if (this.accno == '') {
      //       this.$toast(this.$t('m.Balance.withdrawal15'))
      //       return
      //     }
      //   } else if (this.paytype == 0) {
      //     this.$toast(this.$t('m.Recharge.Recharge17'))
      //     setTimeout(() => { this.changePaytype = true }, 500)
      //     return
      //   } else if (this.paytype == 1){
      //     this.busi_code = '100202'
      //   }
      // }
      this.$router.push({ name: 'rchange', query: { paytype:this.paytype, amount: this.money, busi_code: this.busi_code, accno: this.accno, bank_code: this.bankCode, } })
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    logo () {
      this.$api.Post('logo').then(res => {
        if(res.status == 1){
          this.maxmoney = Number(res.result.maxmoney)
          this.minmoney = Number(res.result.minmoney)
          this.pay_type = res.result.pay_type
        }
      })
    },
    onConfirm (value, index) {
      this.value = index;
      this.showPicker = false;
      this.recharges(this.op[this.value].val);
    },
    recharges (e) {
      if (this.money == '') {
        this.$toast(this.$t('m.Recharge.Recharge4'))
        return;
      }
      this.$api.Post('recharge', {
        money: this.money,
        PayType: e
      }).then(res => {
        if (res.status == 0) {
          this.$toast(res.result.message)
          return;
        }
        if (res.status == 1) {
          location.href = res.result.val;
        }
      })
    },
  },
}
</script>
<style lang="less">
.ras {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  justify-content: center;
  align-content: center;
  align-items: center;
}
.recharges {
  margin-top: -150px;
  width: 80%;
  > p:nth-child(2) {
    margin-top: 30px;
    button {
      width: 100%;
    }
  }
  > p:nth-child(3) {
    margin-top: 15px;
    button {
      width: 100%;
    }
  }
}
.form-hidden {
  display: none;
}
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
.form-money {
  width: 100%;
  background-color: azure;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
  margin-bottom: 10px;
  color: #999;
  text-align: center;
}
</style>