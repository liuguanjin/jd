<template>
	<!-- 购物车中的商品列表 -->
  	<div class="cart-shop">
  		<!-- 商品列表 -->
  		<div class="shop">
		  	<div class="shop-detail" v-for="(item,index) in cartDetail">
		  		<!-- 商家名称 -->
		  		<div class="shop-title">
		  			<!-- 商家选中图标 -->
		  			<i :class="item.shop_is_selected?'icon-select':'icon-common'" @click="changeSelect(index)"></i>
		  			<!-- 商家logo -->
		  			<i class="el-icon-s-shop"></i>
		  			<!-- 商店名 -->
		  			<p @click="enterShopDetail(item.goods.shop.id)">{{item.goods.shop.shop_name}}</p>
		  		</div>
		  		<div class="shop-box">
		  			<!-- 商品选中图标 -->
		  			<i :class="item.goods.goods_is_selected?'icon-select':'icon-common'" @click="changeGoodsSelect(index)"></i>
		  			<!-- 商品图片 -->
			  		<img :src="'http://adminapi.lgj.com'+item.goods.goods_logo" alt="" @click="enterDetail(item.goods.id)">
			  		<div class="shop-des">
			  			<!-- 商品标题 -->
			  			<p class="title" @click="enterDetail(item.goods.id)">{{item.goods.goods_name}}</p>
			  			<!-- 商品类型选择 -->
			  			<p class="des">{{item.spec_goods.value_names}}</p>
			  			<!-- 商品数量选择 -->
			  			<div class="shop-num">
			  				<p class="price">¥{{item.spec_goods.price}}</p>
			  				<div class="addOrDel">
			  					<i class="el-icon-minus" @click="delNum(index)"></i>
					  			<p>{{item.number}}</p>
					  			<i class="el-icon-plus" @click="addNum(index)"></i>
			  				</div>
			  			</div>
			  		</div>
		  		</div>
		  	</div>
  		</div>
	  	<!-- 购物车全选结算 -->
	  	<div class="cart-foor" v-if="isCal">
	  		<div class="choose" @click="calculation()">
	  			<i :class="isSel?'icon-select':'icon-common'"></i>
	  			<p>全选</p>
	  		</div>
	  		<div class="settlement">
	  			<p>总计 : ¥{{total}}</p>
	  			<el-button type="danger" round @click="balance">去结算</el-button>
	  		</div>
	  	</div>
	  	<div class="cart-foor" v-if="!isCal">
	  		<div class="choose" @click="calculation()">
	  			<i :class="isSel?'icon-select':'icon-common'"></i>
	  			<p>全选</p>
	  		</div>
	  		<div class="colOrMov">
	  			<p class="collect" @click="addToCol">移入收藏夹</p>
	  			<p class="move" @click="moveShop">删除</p>
	  		</div>
	  	</div>
	  	<div class="addcommon addFailed" v-show="noLogin">
			<i class="el-icon-close"></i>
			<p>请先登录</p>
		</div>
		<div class="addcommon addSuccess" v-show="isShowCollectSuccess">
			<i class="el-icon-check"></i>
			<p>添加至收藏夹成功</p>
		</div>
		
  	</div>
</template>

<script>
import {mapState,mapActions} from "vuex";
import eventBus from "../../eventbus/eventbus.js";
export default {
	data(){
		return{
			isSel:true,
			isCal:true,
			noLogin:false,
			isShowCollectSuccess:false,
		}
	},
 	computed:{
 		...mapState({
 			cartArr:state => state.cart.cartArr,
 			collectArr:state => state.collect.collectArr,
 			cartDetail:state => state.cart.cartDetail,
 			total:state => state.cart.total,
		 	footprintArr:state => state.footprint.foorprintArr
 		})
 	},
 	created(){
 		this.$homehttp({
 			url:'cart',
 			method:'post',
 			data:this.cartArr
 		}).then(result=>{
 			const {code,msg,data} = result.data;
 			if (code == 200) {
 				for(var i = 0;i < data.length;i ++ ){
 					if (typeof(data[i].spec_goods.price) == 'string') {
		 				data[i].spec_goods.price = parseFloat(data[i].spec_goods.price);
 					}
 				}
 				this.replaceCartDetail(data);
 				this.calculate();
 			}else{
 				this.$message({message:msg,type:'warning'});
 			}
 		})
 		eventBus.$on("calOrDel",()=>{
 			this.isCal = ! this.isCal;
 		});
 	},
 	methods:{
 		...mapActions({
 			shopSelect:"changeShopSelect",
 			goodsSelect:"goodsSelect",
 			calculate:"calculateAllMoney",
 			shopChangeCount:"shopChangeCount",
 			goodsChangeCount:"goodsChangeCount",
 			cartDelNum:"deleteNum",
 			cartAddNum:"addNum",
 			delShop:"popShop",
 			shopNumTotal:"totalShopNum",
 			replaceCartDetail:"replaceCartDetail",
 			addCollectGoods:"increCollectGoos",
 			allSelect:"allSelect"
 		}),
 		changeSelect(index){
 			this.shopSelect(index);
 			var allChoose = this.shopChangeCount(index);
 			if (!allChoose) {
 				this.isSel = false;
 			}
 		},
 		changeGoodsSelect(index){
 			this.goodsSelect(index);
 			var allChoose = this.goodsChangeCount(index);
 			if (!allChoose) {
 				this.isSel = false;
 			}
 		},
 		calculation(){
 			this.isSel = ! this.isSel;
 			this.allSelect(this.isSel);
 			this.calculate();
 		},
 		delNum(index){
 			this.cartDelNum(index);
 		},
 		addNum(index){
 			this.cartAddNum(index);
 		},
 		balance(){
			var userinfo = JSON.parse(localStorage.getItem('userinfo'));
 			var goods_ids = this.cartArr.filter(item => item.goods_is_selected== 1);
 			if (userinfo == '' || userinfo == undefined || userinfo == null) {
 				this.noLogin = true;
				setTimeout(()=>{
					this.noLogin = false;
				},2000)
 			}else if(this.cartArr.length == 0){
 				this.$message({message:'购物车暂无商品',type:'warning'});
 			}else if(goods_ids.length == 0){
 				this.$message({message:'请先选中商品再结算',type:'warning'});
 			}else{
	 			this.$router.push({name:'balance',query:{goods_ids:goods_ids}});
 			}
 		},
 		addToCol(){
 			function unique(arr){
				return Array.from(new Set(arr));
			}
 			var collectArr = this.collectArr;
 			var cartDetail = this.cartDetail;
 			var userinfo = JSON.parse(localStorage.getItem('userinfo'));
 			var goods = this.cartArr.filter(item => item.goods_is_selected== 1);
			if (userinfo == '' || userinfo == undefined || userinfo == null) {
				this.noLogin = true;
				setTimeout(()=>{
					this.noLogin = false;
				},2000)
			}else if(this.cartArr.length == 0){
 				this.$message({message:'购物车暂无商品',type:'warning'});
 			}else if(goods.length == 0){
 				this.$message({message:'请先选中商品再收藏',type:'warning'});
 			}else{
				var goodsNotInCollect = true;
				var goods_ids = [];
				for(var j = 0;j < cartDetail.length;j ++ ){
					if (cartDetail[j].goods.goods_is_selected) {
						for(var i = 0;i < collectArr.length;i ++ ){
							if (cartDetail[j].goods.id == collectArr[i]) {
								goodsNotInCollect = false;
							}
						}
						if (goodsNotInCollect) {
							goods_ids.push(cartDetail[j].goods.id);
						}
					}
				}
				goods_ids = unique(goods_ids);
				for(var i = 0;i < goods_ids.length;i ++ ){
					this.addCollectGoods(goods_ids[i]);
				}
				this.isShowCollectSuccess = true;
				setTimeout(()=>{
					this.isShowCollectSuccess = false;
				},2000)
			}
 		},
 		moveShop(){
 			this.delShop();
 			this.shopNumTotal();
 		},
 		enterShopDetail(id){
 			this.$router.push({name:"shopDetail",query:{id:id}});
 		},
 		enterDetail(id){
 			// 进入商品详情界面
 			this.$router.push({name:"detail",query:{id:id}});
 		},
 	}
}
</script>

<style lang="less" scoped>
@import url("../../less/common.less");
	.cart-shop{
		background-color:#eee;
		margin-bottom:60px;
		.addcommon{
			width:120px;
			height:100px;
			background-color:rgba(0,0,0,0.7);
			border:1px solid rgba(255,255,255,0.7);
			position:absolute;
			top:50%;
			left:50%;
			margin-left:-50px;
			margin-top:-50px;
			.flexColumnCenter();
			justify-content:center;
			p{
				margin:0 auto;
				padding:0;
			}
			.el-icon-check{
				padding:10px;
				border-radius:50%;
				font-size:16px;
			}
		}
		.addFailed{
			p{
				color:red;
			}
			.el-icon-close{
				padding:10px;
				border-radius:50%;
				border:1px solid red;
				color:red;
			}
		}
		.addSuccess{
			p{
				color:white;
			}
			.el-icon-check{
				border:1px solid white;
				color:white;
			}
		}
		.icon-common{
			margin-left:5px;
		    background-image: url(//wq.360buyimg.com/wxsq_trade/cart_vue/main/images/sprite.img_default_437_c4816605.png);
			background-position: -80px 0;
			background-size: 116px 110px;
			width:20px;
			height:20px;
		}
		.icon-select{
			margin-left:5px;
		    background-image: url(//wq.360buyimg.com/wxsq_trade/cart_vue/main/images/sprite.img_default_437_c4816605.png);
			background-position: -80px -40px;
			background-size: 116px 110px;
			width:20px;
			height:20px;
		}
		.cart-foor{
			width:100%;
			max-width:800px;
			position:fixed;
			bottom:56px;
			z-index:100;
			background-color:#fff;
			border-top:1px solid #eee;
			padding-top:5px;
			.flexRowCenter();
			justify-content:space-between;
			.choose{
				.flexColumnCenter();
				p{
					padding:0;
					margin:0;
					margin-left:5px;
					color:gray;
				}
			}
			.settlement{
				.flexRowCenter();
				p{
					margin:0;
					padding:0;
					margin-right:20px;
					font-size:20px;
					font-weight:250;
				}
				.el-button{
					margin-right:10px;
				}
			}
			.colOrMov{
				.flexRowCenter();
				p{
					margin:0;
					padding:0;
					margin-right:5px;
				}
				.collect{
					color:#FF5000;
					border-radius:15px;
					border:1px solid #FF5000;
					width:90px;
					height:32px;
					line-height:30px;
					text-align:center;
				}
				.move{
					color:#FC0A0A;
					border-radius:15px;
					border:1px solid #FC0A0A;
					width:90px;
					height:32px;
					line-height:30px;
					text-align:center;
				}
			}
		}
		.shop{
			margin-bottom:120px;
			.shop-detail{
				width:90%;
				margin:0 auto;
				background-color:#fff;
				border-radius:15px;
				margin-top:10px;
				z-index:2;
				.shop-title{
					.flexRowCenter();
					.el-icon-s-shop{
						width:15px;
						height:15px;
						margin:0 3px;
						color:gray;
					}
					p{
						font-size:18px;
						font-weight:600;
					}
					p:hover{
						cursor:pointer;
						color:#FF4400;
					}
				}
				
				.shop-box{
					.flexRowCenter();
					.icon-common{
						margin-left:10px;
						margin-right:5px;
					}
					.icon-select{
						margin-left:10px;
						margin-right:5px;
					}
					img{
						width:100px;
						height:100px;
					}
					.shop-des{
						margin:0 8px;
						width:61%;
						.flexColumnCenter();
						.title{
							font-size:14px;
							height:40px;
							line-height:20px;
							overflow:hidden;
							margin:0;
						}
						p.title:hover{
							cursor:pointer;
							color:#FF4400;
						}
						.des{
							width:100%;
							background-color:#f7f7f7;
							margin:5px 0;
						}
						.shop-num{
							width:100%;
							margin:0;
							.flexRowCenter();
							justify-content:space-between;	
							.price{
								color:@mallColor;
							}
							.addOrDel{
								.flexRowCenter();
							}
						}
					}
				}
			}
		}
	}
</style>
