<template>
		<div>
			<div >
				 <van-nav-bar :title="$t('m.ViewLogistics.Logistics1')" left-text left-arrow @click-left="$router.go(-1)" />
			</div>
			<van-cell-group >
			  <van-cell :title="$t('m.ViewLogistics.Logistics2')" v-model="express"/>
			</van-cell-group>
			<van-cell-group >
			  <van-cell :title="$t('m.ViewLogistics.Logistics3')" v-model="expressn" />
			</van-cell-group>
			<div style="margin-top: 24px;padding: 10px 24px;">
				<van-button type="primary" size="large" @click="copyCode(expressn)">{{$t('m.ViewLogistics.Logistics4')}}</van-button>
			</div>
		</div>
		
</template>

<script>
	export default{
			data(){
				return{
						express:this.$route.params.express || '',
						expressn:this.$route.params.expressn || ''
				}
			},
			mounted(){
			},
			methods:{
			copyCode(e) {
				console.log(e)
				this.$copyText(`地址：${e}`).then(
						res => {
							this.$dialog({ 'message': this.$t('m.ViewLogistics.Logistics5') });
						},
						err => {
							this.$dialog({ 'message': this.$t('m.ViewLogistics.Logistics6') });
						}
					)
				}
			}
		
				
	}
</script>

<style scoped="less">
	
</style>
