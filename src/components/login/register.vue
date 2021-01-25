<template>
  <div class="p20">
    <p class="logo">
      <img class="logoImg"
           :src="logoimg"
           alt />
    </p>
    <input type="password"
           style="display: none;">
    <div class="memberset">

      <p>{{$t('m.registerpage.register1')}}</p>
      <p>

        <i class="el-icon-s-custom"></i>
        <input type="text"
               v-model="zcdata.incode"
               :placeholder="$t('m.registerpage.register2')" />
      </p>
      <p>

        <i class="el-icon-user-solid"></i>
        <input type="text"
               v-model="zcdata.nickname"
               :placeholder="$t('m.registerpage.register3')" />
      </p>
      <p>
        <i class="el-icon-phone"></i>91
        <input type="text"
               v-model="zcdata.mobile"
               maxlength="20"
               :placeholder="$t('m.registerpage.register4')" />
      </p>
      <p class="f-flex">
        <i class="el-icon-orange"></i>
        <input type="text"
               v-model="zcdata.code"
               :placeholder="$t('m.registerpage.register5')" />
        <el-button class="saveCodeBtn"
                   type="primary"
                   @click="getcode"
                   :disabled="iscode">{{countDown}} </el-button>
      </p>
      <p>
        <i class="el-icon-lock"></i>
        <input type="text"
               onfocus="this.type='password'"
               autocomplete="off"
               v-model="zcdata.password"
               :placeholder="$t('m.registerpage.register8')" />
      </p>
      <p>
        <i class="el-icon-lock"></i>
        <input type="text"
               onfocus="this.type='password'"
               autocomplete="off"
               v-model="zcdata.password1"
               :placeholder="$t('m.registerpage.register9')" />
      </p>
      <p>
        <el-button type="primary"
                   @click="reister">{{$t('m.registerpage.register10')}}</el-button>
      </p>
      <div class="golog"><span @click="gologin">{{$t('m.registerpage.register11')}}</span></div>
      <div class="golog"><span><a :href="loginUrl"
             style="color:#5d70bd">{{$t('m.loginpage.login11')}}</a></span></div>
      <p>
        <a href="https://www.treasure365.vip/treasure.apk">{{$t('m.registerpage.register12')}}</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      zcdata: {
        mobile: '',
        password: '',
        password1: '',
        nickname: '',
        code: '',
        incode: this.GetUrlParam('incode')
      },
      iscode: false,
      logoimg: '',
      loginUrl: '',
      timer: null,
      outTime: 60,
      countDown: this.$t('m.registerpage.register7'),
      lang: 'en-US',
    }
  },
  mounted () {
    this.logo();
    this.lang = localStorage.getItem('language')
  },
  methods: {
    logo () {
      this.$api.Post('logo').then(res => {
        this.logoimg = res.result.logo
        this.loginUrl = res.result.loginurl
      })
    },
    gologin () {
      this.$router.push({ name: 'login' })
    },
    reister () {
      let that = this;
      if (that.zcdata.nickname == '') {
        that.$toast(that.$t('m.registerpage.register13'))
        return;
      }
      if (that.zcdata.mobile == '') {
        that.$toast(that.$t('m.registerpage.register14'))
        return;
      }
      if (that.zcdata.code == '') {
        that.$toast(that.$t('m.registerpage.register16'))
        return;
      }
      if (that.zcdata.password == '') {
        that.$toast(that.$t('m.registerpage.register17'))
        return;
      }
      if (that.zcdata.password != that.zcdata.password1) {
        that.$toast(that.$t('m.registerpage.register18'))
        return;
      }
      that.$api.Post('register', that.zcdata).then(res => {
        if (res.status == 1) {
          localStorage.setItem('mobile', this.zcdata.mobile)
          this.$router.push('/')
        } else {
          //  if(){

          //  }
          that.$toast(that.$t('m.registerpage.register21'))
        }
      })
    },
    //获取验证码
    getcode () {
      if (this.zcdata.mobile == '') {
        this.$toast(this.$t('m.registerpage.register19'))
        return;
      }
      this.$api.Post('sendcode', { mobile: this.zcdata.mobile }).then(res => {
        if (res.status == 1) {
          this.iscode = true;
          this.lang = localStorage.getItem('language')
          if (!this.timer) {
            this.timer = setInterval(() => {
              if (this.lang == 'en-US' || 'en') {
                this.countDown = this.$t('m.registerpage.register22') + ' ' + this.outTime + 's';
              } else {
                this.countDown = this.outTime + this.$t('m.registerpage.register22');
              }
              this.outTime -= 1;
              if (this.outTime < 0) {
                clearInterval(this.timer);
                this.countDown = this.$t('m.registerpage.register7');
                this.outTime = 60;
                this.timer = null;
                this.iscode = false;
              }
            }, 1000)
          }
        }else{
          this.$toast(this.$t('m.registerpage.register21'))
        }
      })

    },
    //paraName 等找参数的名称
    GetUrlParam (paraName) {
      var url = document.location.toString();
      var arrObj = url.split("?");

      if (arrObj.length > 1) {
        var arrPara = arrObj[1].split("&");
        var arr;

        for (var i = 0; i < arrPara.length; i++) {
          arr = arrPara[i].split("=");

          if (arr != null && arr[0] == paraName) {
            return arr[1];
          }
        }
        return "";
      }
      else {
        return "";
      }
    }
  }
};
</script>

<style lang="less">
.logo {
  position: relative;
  text-align: center;
  margin: 20px auto;
}
.logoImg {
  display: inline-block;
  width: 270px !important;
}
.memberset {
  color: #58a1eb;
  > p:nth-child(1) {
    font-weight: 700;
    font-size: 20px;
  }
  > p:nth-child(2) {
    background: #f7f7f7;
    //   padding: 15px;
    border-radius: 4px;
    margin-top: 30px;
    height: 50px;
    input {
      width: 80%;
      height: 100%;
    }
  }
  > p:nth-child(3) {
    background: #f7f7f7;
    //   padding: 15px;
    border-radius: 4px;
    margin-top: 15px;
    height: 50px;
    input {
      width: 60%;
      height: 100%;
    }
    span {
      padding: 14px 10px;
    }
  }
  > p:nth-child(4) {
    background: #f7f7f7;
    //   padding: 15px;
    border-radius: 4px;
    margin-top: 15px;
    height: 50px;
    input {
      width: 80%;
      height: 100%;
    }
  }
  > p:nth-child(5) {
    background: #f7f7f7;
    //   padding: 15px;
    border-radius: 4px;
    margin-top: 15px;
    height: 50px;
    input {
      width: 80%;
      height: 100%;
    }
  }
  > p:nth-child(6) {
    background: #f7f7f7;
    //   padding: 15px;
    border-radius: 4px;
    margin-top: 15px;
    height: 50px;
    input {
      width: 80%;
      height: 100%;
    }
  }
  > p:nth-child(7) {
    background: #f7f7f7;
    //   padding: 15px;
    border-radius: 4px;
    margin-top: 15px;
    height: 50px;
    input {
      width: 80%;
      height: 100%;
    }
  }

  > p:nth-child(8) {
    margin-top: 40px;
    button {
      width: 100%;
      border-radius: 4px;
      padding: 15px;
    }
  }
  > p:last-child {
    margin-top: 30px;
    text-align: center;
    font-size: 18px;
    color: #c98954;
    padding: 8px 20px;
    border: 1px #c98954 solid;
    border-radius: 4px;
    > a {
      color: #c98954;
    }
  }
  i {
    font-size: 22px;
    padding: 14px 10px;
  }
}
.golog {
  text-align: center;
  padding: 10px 0;
  color: #5d70bd;
}
</style>
