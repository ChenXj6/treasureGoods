<template>
  <div>
    <div>
      <van-nav-bar :title="$t('m.Article.details')" left-text left-arrow @click-left="onClickLeft" />
    </div>
    <div class="p20">
      <div class="wdetail" >
        <h2>{{newdetail.title}}</h2>
        <p class="wtime">{{newdetail.createtime*1 | formatDate}}</p>
        <p class="wcontent" v-html="newdetail.detail">
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
          newdetail:''
        }
    },
    mounted(){
      this.one_new()
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
    onClickLeft() {
     this.$router.go(-1)
    },
    one_new(){
        this.$api.Post('one_new',{id:this.$route.query.id}).then(res=>{
            if(res.status==1){
                this.newdetail=res.result.new;
            }
        })
    }
  }
};
</script>

<style lang="less">
.wdetail h2{
  font-weight: 600;
}
.wtime{
    color: rgba(150, 150, 150, 0.75);
    margin: 20px 0;

}
.wcontent{
    margin-top: 1rem;
    line-height: 1.8;
}
</style>