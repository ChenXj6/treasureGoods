<template>
  <div>
    <div>
      <van-nav-bar
        :title="$t('m.Capital.detailed1')"
        left-text
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div>
      <div>
       <div class="source f-flex f-jc-c">
		   <p>{{$t('m.Capital.detailed2')}}</p>
		   <div class="van-dropdown-menu van-hairline--top-bottom">
			   <div role="button" tabindex="0" class="van-dropdown-menu__item"><span class="van-dropdown-menu__title">
			   <div class="van-ellipsis" @click="tobsea()">{{bvaseTy}}</div></span></div>
			   <div><div class="van-dropdown-item van-dropdown-item--down" style="z-index: 10; top: 0px; display: none;"><!----></div></div></div></div>
      </div>
    </div>
	
	<van-popup v-model="showPicker" position="bottom">
	  <van-picker
	    show-toolbar
	    :columns="option1"
	    @cancel="showPicker = false"
	    @confirm="onConfirm"
      :confirm-button-text="$t('m.Personal.Center23')"
      :cancel-button-text="$t('m.Personal.Center24')"
	  />
	</van-popup>
	
    <div class="p20" style="padding-top:5px">
      <van-list
        v-model="loading"
        :finished="finished"
        :loading-text="$t('m.mission.mission21')"
        :finished-text="$t('m.Capital.detailed3')"
        @load="onLoad"
      >
        <div
          class="financiallist"
          v-for="(item, index) in finanlist"
          :key="index"
        >
          <p class="f-flex f-jc-sb">
            <span>{{ item.title }}</span>
            <span>{{ item.money }}</span>
          </p>
          <p class="f-flex f-jc-sb">
            <span>{{ (item.createtime * 1) | formatDate }}</span>
            <!-- <span>{{
              item.status == "1"
                ? "待审批"
                : item.status == "2"
                ? "成功"
                : "驳回"
            }}</span> -->
          </p>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: this.$route.query.type||'',
	  bvaseTy:this.$t('m.Capital.detailed4'),
      page: 1,
      loading: false,
      finished: false,
	  showPicker: false,
      option1: [
        { text: this.$t('m.Capital.detailed4'), value: "" },
        { text: this.$t('m.Capital.detailed5'), value: 0 },
        // { text: "提现", value: 1 },
        { text: this.$t('m.Capital.detailed6'), value: 2 },
        { text: this.$t('m.Capital.detailed7'), value: 3 },
        { text: this.$t('m.Capital.detailed8'), value: 4 }
      ],
      finanlist: []
    };
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
  mounted() {
    this.bill_flow();
	//this.bvaseTy = this.option1[parseInt(this.$route.query.type)].text;
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
	tobsea(){
	   this.showPicker = true;
	   
	},
	onConfirm(e){
		if(e.value.text != this.type){
			this.type =e.value;
			this.page = 0;
			this.bvaseTy = e.text;
			this.bill_flow();
			 
		}
		this.showPicker = false;
	},

    //请求明细接口
    bill_flow() {
      this.$api
        .Post("bill_flow", { type: this.type, page: this.page })
        .then(res => {
          this.finanlist = res.result.list;
        });
    },
    //分类切换
    selects(e) {
      this.page=1
      this.bill_flow();
    },
    onLoad() {
      // 异步更新数据
      this.page++;
      this.$api
        .Post("bill_flow", {
          type: this.type,
          page: this.page
        })
        .then(res => {
          if (res.status == 1) {
            this.finanlist = this.finanlist.concat(res.result.list);
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

<style lang="less">
.financiallist {
  border-bottom: 1px solid #171c2f;
  padding: 10px 0;
  font-size: 14px;
  > p:nth-child(1) {
    > span:nth-child(2) {
      color: #f90;
      font-weight: 500;
      font-size: 16px;
    }
  }
  > p:nth-child(2) {
    margin-top: 6px;
    color: #999;
  }
}
.source {
  position: relative;
  // border-bottom: 1px solid #eee;
  > p {
    padding-top: 15px;
    font-size: 16px;
  }
}
.van-dropdown-menu__title {
  font-size: 16px !important;
}
</style>
