<template>
  <div class="bje">
    <div>
      <van-nav-bar
        :title="$t('m.Balance.withdrawal1')"
        left-text
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="f-flex f-jc-sb with-m">
      <span>{{$t('m.Balance.withdrawal2')}}：INR {{money}}</span>
      <a href="#"  @click="alltx">{{$t('m.Balance.withdrawal3')}}</a>
    </div>
    <div class="with-num p20">
      <p style="color: #999999">{{$t('m.Balance.withdrawal4')}}</p>
      <p class="f-flex">
        <span>INR</span>
        <input type="number" v-model="amount.withdraw_money" />
      </p>
    </div>
    <p class="division"></p>
    <div class="with-type">
      <p>{{$t('m.Balance.withdrawal5')}}</p>
      <!-- <p class="f-flex f-jc-sb">
            <span><img src="../../assets/zfb.png" alt="">提现到支付宝</span>
             <el-radio v-model="radio" label="1"></el-radio>
        </p> -->
      <p class="f-flex f-jc-sb">
        <span v-if="amount.type == 4"><img src="../../assets/bank.png" alt="" />{{$t('m.Balance.withdrawal6')}}</span>
        <span v-else><img src="../../assets/bank.png" alt="" />{{$t('m.Balance.withdrawal25')}}</span>
        <el-radio v-model="radio" label="2"></el-radio>
      </p>
      <p>
        <van-field
          v-model="amount.username"
          :placeholder="amount.type == 4 ? $t('m.Balance.withdrawal7') : $t('m.Balance.withdrawal26')"
          :label="$t('m.Balance.withdrawal8')"
        />
      </p>
      <p           v-if="amount.type == 3">
        <van-field
           maxlength="11"
          v-model="amount.tel"
          :placeholder="$t('m.Balance.withdrawal9')"
          :label="$t('m.Balance.withdrawal10')"
        />
      </p>
      <p           v-if="amount.type == 3">
        <van-field
          v-model="amount.bank_name"
          :placeholder="$t('m.Balance.withdrawal11')"
          :label="$t('m.Balance.withdrawal12')"
        />
      </p>
      <p           v-if="amount.type == 3">
        <van-field
          v-model="amount.bank_card"
          :placeholder="$t('m.Balance.withdrawal13')"
          :label="$t('m.Balance.withdrawal14')"
        />
      </p>
      <p           v-if="amount.type == 3">
        <van-field
          v-model="amount.bank_card1"
          :placeholder="$t('m.Balance.withdrawal15')"
          :label="$t('m.Balance.withdrawal16')"
        />
      </p>
    </div>
    <div class="with-btn">
      <el-button type="primary" @click="withdrae(amount.type)">{{$t('m.Balance.withdrawal17')}}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: "2",
      money:this.$route.query.money,
      amount: {
        username: "",
        bank_card: "",
        bank_card1: "",
        bank_name: "",
        tel: "",
        withdraw_money: "",
        type:0
      },
    };
  },
  created () {
     let islog=localStorage.getItem('amount')||false;
     if(islog!=false){
       this.amount=JSON.parse(islog)
     }
     this.logo()
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    logo(){
      this.$api.Post('logo').then(res=>{
        this.amount.type = res.result.type
      })
    },
    //提现
    withdrae(type) {
      console.log(this.amount)
      if (this.amount.username == "") {
        this.$toast(this.$t('m.Balance.withdrawal19'));
        return;
      }
      if(type == 3){
        var isMobile = /^1[3|4|5|6|7|8][0-9]{9}$/;
        if (this.amount.withdraw_money == "") {
          this.$toast(this.$t('m.Balance.withdrawal18'));
          return;
        }
        if (this.amount.tel == "") {
          this.$toast(this.$t('m.Balance.withdrawal20'));
          return;
        }
        if (!isMobile.test(this.amount.tel)) {
          this.$toast(this.$t('m.Balance.withdrawal21'));
          return;
        }
        if (this.amount.bank_name == "") {
          this.$toast(this.$t('m.Balance.withdrawal22'));
          return;
        }
        if (this.amount.bank_card == "") {
          this.$toast(this.$t('m.Balance.withdrawal23'));
          return;
        }
        if (this.amount.bank_card != this.amount.bank_card1) {
          this.$toast(this.$t('m.Balance.withdrawal24'));
          return;
        }
      }
      this.$api.Post("submit_withdraw", this.amount).then(res => {
        this.$toast(res.result.message);
        if (res.status == 1) {
          this.amount.withdraw_money='';
          this.amount.type = 0;
          localStorage.setItem('amount',JSON.stringify(this.amount))
          this.$router.go(-1);
        }
      });
    },
    //全部提现
    alltx(){
        this.amount.withdraw_money=this.money
    }
  }
};
</script>

<style lang="less">
.with-m {
  background: #171c2f;
  padding: 15px;
  font-size: 14px;
  span {
    line-height: 2.3;
  }
    a {
    font-size: 12px;
    color: #ffffff;
    display: inline-block;
    padding: 8px 12px;
    background: #5d70bd;
    border-radius: 5px;
  }
}
.with-num {
  background-color: #1e243d;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24) !important;
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  > p:nth-child(2) {
    margin-top: 10px;
    color: #fff;
    span {
      font-weight: 700;
      font-size: 28px;
    }
    input {
      font-size: 28px;
      font-weight: 700;
      width: 80%;
    }
  }
}
.division {
  // background: #f3f3f3;
  padding: 10px;
}
.with-type {
  background-color: #171c2f;
  border-radius: 8px 8px 0 0;
  > p {
    padding: 15px 20px;
    border-bottom: 1px solid #1e243d;
  }
  img {
    width: 30px;
    margin-right: 10px;
  }
}
.bje .el-radio__label {
  opacity: 0;
}
.bje .el-radio__inner {
  width: 20px !important;
  height: 20px !important;
}
.bje .el-radio__inner::after {
  width: 8px !important;
  height: 8px !important;
}
.bje .van-cell {
  padding: 0 !important;
  font-size: 16px !important;
  background: none;
  color: #eee;
  font-size: 14px !important;
  line-height: 1.6;
}
.bje .van-cell .van-field__control{ color: #fff !important;}
.with-btn {
  padding: 20px;
  button {
    width: 100%;
  }
}
</style>
