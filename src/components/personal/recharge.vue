<!--  -->
<template>
<div>
     <div>
      <van-nav-bar
        :title="$t('m.Recharge.Recharge1')"
        left-text
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="ras f-flex">
    <div class="recharges">
        <p><el-input v-model="money" :placeholder="$t('m.Recharge.Recharge2')"></el-input></p>
        <!-- <p><el-button type="primary" @click="showPicker=true">充值方式</el-button></p> -->
				<p><el-button type="primary" @click="toshowget()">{{$t('m.Recharge.Recharge3')}}</el-button></p>
        <!-- <p> <el-button type="success"  @click="recharges('wxpay')">微信充值</el-button></p> -->
    </div>
	
    </div>
		<van-popup v-model="showPicker" position="bottom">
		<van-picker
		show-toolbar
		:columns="columns"
		@confirm="onConfirm"
		@cancel="showPicker = false"
		/>
		</van-popup>
</div>
</template>

<script>
export default {
data() {
return {
  money:'',
	 value: '',
	columns: [],
	op:[],
	showPicker: false,
	host:process.env.NODE_ENV=='development'?'http://5016.yesswl.top':`${location.protocol}//${location.host}`
	
}
},
//生命周期 - 创建完成（访问当前this实例）
created() {
	
},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {
this.rpowes()
},
methods:{
    onClickLeft(){
        this.$router.go(-1)
    },
		 onConfirm(value,index) {
		      this.value = index;
				  
		      this.showPicker = false;
					this.recharges(this.op[this.value].val);
		    },
		rpowes(){
			this.$api.Post('top_up_way',{
			}).then(res=>{
				   this.op = res.result.list;
				   this.columns = res.result.list.map((item,index)=> item.text = item.title);
			})
		},
    recharges(e){
	
        if(this.money==''){
            this.$toast(this.$t('m.Recharge.Recharge4'))
            return;
        }
        this.$api.Post('recharge',{
            money:this.money,
            PayType:e
        }).then(res=>{
            if(res.status==0){
                this.$toast(res.result.message)
                return;
            }
            if(res.status==1){
                location.href=res.result.val; 
            }
        })
    },
		toshowget(){
            var language = window.localStorage.getItem('language');
            var lang;
            if(language==""||language=="cn-CN"){
                lang="cn"
            }else{
                lang="en"
            }
			location.href=this.host+"/app/index.php?i=4&c=entry&do=payee&m=weliam_indiana&lang="+lang;
		}

}
}
</script>
<style lang="less">
.ras{
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left: 0;
    justify-content: center;
    align-content: center;
    align-items: center;
}
.recharges{
    margin-top: -150px;
    width: 80%;
    >p:nth-child(2){
        margin-top: 30px;
        button{
            width: 100%;
        }
    }
     >p:nth-child(3){
        margin-top: 15px;
        button{
            width: 100%;
        }
    }
}
</style>