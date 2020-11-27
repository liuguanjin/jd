<template>
  <div class="home-content">
  	<!-- 首页内容 -->
	<div class="content-item" v-for="(item,index) in homeContent" @click="enterDetail(item.id)">
		<img :src="'http://adminapi.lgj.com'+item.goods_logo">
		<p class="title">{{item.goods_name}}</p>
		<p class="price">${{item.goods_price}}</p>
		<p class="number">剩余:{{item.goods_number}}</p>
	</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
 	data(){
 		return {
 			homeContent:[],
 			refreshing:false,
 			loading:false
 		}
 	},
 	created(){
 		// 生命周期方法
 		this.getGoods();
 	},
 	methods:{
 		getGoods(){
 			this.$homehttp({
 				url:'goods'
 			}).then(result=>{
 				const {code,msg,data} = result.data;
 				if (code == 200) {
 					this.homeContent = data;
 				}else{
 					this.$message({message:msg,type:'warning'});
 				}
 			})
 		},
 		enterDetail(id){
 			// 进入商品详情界面
 			this.$router.push({name:"detail",query:{id:id}});
 		}
 	}
}
</script>

<style lang="less" scoped>
	@import url("../less/common.less");
	.home-content{
		background-color:#eee;
		.flexRowCenter();
		flex-wrap:wrap;
		margin-bottom:60px;
		.content-item{
			background-color:#fff;
			border-radius:15px;
			margin-top:10px;
			margin-left:@commonMargin;
			.flexColumnCenter();
			width:47%;
			img{
				width:100%;
				margin:0;
			}
			.title{
				font-size:@textSize;
				line-height:20px;
				height:40px;
				overflow:hidden;
				margin:5px;
			}
			.price{
				font-size:@bigTextSize;
				line-height:@bigTextSize;
				align-self:flex-start;
				color:@mallColor;
				margin:5px;
			}
			.number{
				font-size:@bigTextSize;
				line-height:@bigTextSize;
				align-self:flex-start;
				color:@mallColor;
				margin:5px;
			}
		}
	}
</style>
