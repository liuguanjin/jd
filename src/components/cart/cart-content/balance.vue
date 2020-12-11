<template>
	<div class="balance">
		
	</div>
</template>

<script>
	export default {
		data(){
			return {
				goods_ids:[],
				goods:[],
			}
		},
		created(){
			this.goods_ids = this.$route.query.goods_ids;
			this.getGoods();
		},
		methods:{
			getGoods(){
				this.$homehttp({
		 			url:'balancegoods',
		 			method:'post',
		 			data:this.goods_ids
		 		}).then(result=>{
		 			const {code,msg,data} = result.data;
		 			if (code == 200) {
		 				for(var i = 0;i < data.length;i ++ ){
		 					if (typeof(data[i].spec_goods.price) == 'string') {
				 				data[i].spec_goods.price = parseFloat(data[i].spec_goods.price);
		 					}
		 				}
		 				this.goods = data;
		 				console.log(this.goods);
		 			}else{
		 				this.$message({message:msg,type:'warning'});
		 			}
		 		})
			}
		}
	}
</script>

<style lang="less" scoped>
	
</style>