<template>
  <div class="shop_detail">
  	<div class="shop_header">
  		<div class="shop_message">
  			<div class="img">
  				<img :src="'http://adminapi.lgj.com'+shopDetail.shop_logo" alt="">
  			</div>
  			<div class="shop_name">
  				<p>{{shopDetail.shop_name}}</p>
  				<div class="star">
  					<span>店铺星级</span>
  					<div class="scope">
  						<i class="el-icon-star-on"></i>
  						<i class="el-icon-star-on"></i>
  						<i class="el-icon-star-on"></i>
  						<i class="el-icon-star-on"></i>
  						<i class="el-icon-star-on"></i>
  					</div>
  				</div>	
  			</div>
  		</div>
  		<div class="header_right">
  			<div class="collect">
  				<div class="collect-button">
			 		<el-button type="danger" icon="el-icon-star-on" round>收藏</el-button>
  				</div>
	  			<div class="collect-allnumer">
	  				xxx名用户已收藏
	  			</div>
  			</div>
  			<div class="more">
  				<el-dropdown trigger="click">
					<i class="el-icon-more"></i>
			      	<el-dropdown-menu slot="dropdown">
			        	<el-dropdown-item icon="el-icon-s-home">首页</el-dropdown-item>
			        	<el-dropdown-item icon="el-icon-search">分类搜索</el-dropdown-item>
			        	<el-dropdown-item icon="el-icon-shopping-cart-2">购物车</el-dropdown-item>
			        	<el-dropdown-item icon="el-icon-user">个人中心</el-dropdown-item>
			        	<el-dropdown-item icon="el-icon-s-data">足迹</el-dropdown-item>
			      	</el-dropdown-menu>
			    </el-dropdown>
  			</div>
  		</div>
  	</div>
  	<div class="shop_content">
  		<div class="goods" v-for="(item,index) in shopDetail.goods" :key="index" @click="enterDetail(item.id)">
  			<img :src="'http://adminapi.lgj.com'+item.goods_logo" alt="">
  			<p class="title">{{item.goods_name}}</p>
  			<p class="price red">${{item.goods_price}}</p>
  			<p class="number red">剩余:{{item.goods_number}}</p>
  		</div>
  	</div>
  </div>
</template>

<script>
	import myHead from "../common/head.vue";
	export default {
		data(){
			return {
				id:"",
				shopDetail:{
					shop_logo:"",
					shop_name:"",
					goods:[

					]
				}
			}
		},
		created(){
			this.id = this.$route.query.id;
		},
		mounted(){
			this.getShopDetail();
		},
		methods:{
			getShopDetail(){
				this.$homehttp({
					url:'shopdetail/'+this.id
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.shopDetail = data;
					}else{
						this.$message({message:msg,type:'warning'});
					}
				})
			},
			back(){
				this.$router.go(-1);
			},
			enterDetail(id){
	 			// 进入商品详情界面
	 			this.$router.push({name:"detail",query:{id:id}});
 			},
		}
	}
</script>

<style lang="less" scoped>
	.shop_detail{
		margin-bottom:60px;
		background-color:#eee;
		.shop_header{
			background-color:#400553;
			display:flex;
			flex-direction:row;
			.shop_message{
				margin:10px;
				display:flex;
				flex-direction:row;
				img{
					width:85px;
				}
				.shop_name{
					margin-left:10px;
					p{
						font-size:16px;
						color:white;
					}
					p:after{
						content:"";
						display:inline-block;
						width:6px;
						height:6px;
						margin-left:5px;
						margin-bottom:1px;
						border-color:#fff;
						border-style:solid;
						border-width:2px 2px 0 0;
						-webkit-transform:rotate(45deg);
						transform:rotate(45deg);
					}
					.star{
						display:flex;
						flex-direction:row;
						color:white;
					}
				}
			}
		}
		.shop_content{
			margin:10px;
			display:flex;
			flex-direction:row;
			justify-content:auto;
			align-items:center;
			flex-wrap:wrap;
			.goods{
				display:flex;
				flex-direction:column;
				justify-content:space-between;
				align-items:center;
				border-radius:15px;
				background-color:white;
				width:47.5%;
				margin:0 10px 10px 0;
				img{
					width:80%;
				}
				.title{
					font-size:14px;
					line-height:20px;
					height:40px;
					overflow:hidden;
					margin:5px;
				}
				.red{
					font-size:16px;
					line-height:16px;
					align-self:flex-start;
					color:red;
					margin:5px;
				}
			}
		}
	}
</style>