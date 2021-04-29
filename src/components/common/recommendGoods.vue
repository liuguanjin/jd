<template>
	<!-- 推荐商品 -->
	<div class="recommend-goods">
		<div class="content-item" v-for="(item,index) in goods">
			<img :src="'http://adminapi.lgj.com'+item.goods_logo"  @click="enterDetail(item.id,$event)">
			<p class="title"  @click="enterDetail(item.id,$event)">{{item.goods_name}}</p>
			<div class="goods-bottom">
				<div class="price-number"  @click="enterDetail(item.id,$event)">
					<p class="price">${{item.goods_price}}</p>
					<p class="number">剩余:{{item.goods_number}}</p>
				</div>
				<p class="empty" v-if="false">空元素</p>
				<p class="shop_name" @click="enterShopDetail(item.shop.id)">{{item.shop.shop_name}}</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				goods:[],
			}
		},
		methods:{
			getGoods(){
				var userinfo = localStorage.getItem('userinfo');
				userinfo = JSON.parse(userinfo)
				var user_id = 0;
				if (userinfo != null && userinfo != '' && userinfo != undefined) {
					user_id = userinfo.user_id;
				}
				this.$homehttp({
					url:'recommend-goods/'+user_id
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.goods = data;
					}
					console.log(this.goods);
				})
			},
			enterDetail(id,e){
	 			// 进入商品详情界面
	 			this.$router.push({name:"detail",query:{id:id}});
 			},
 			enterShopDetail(id){
 				this.$router.push({name:"shopDetail",query:{id:id}});
 			}
		},
		created(){
			this.getGoods();
		}
	}
</script>

<style lang="less" scoped>

</style>