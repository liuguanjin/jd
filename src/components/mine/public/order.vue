<template>
	<div class="order">
		<div class="head">
			<i class="el-icon-arrow-left back" @click="back"></i>
			<input type="text" placeholder="搜索我的订单" v-model="keyword">
			<i class="el-icon-more more"></i>
		</div>
		<el-tabs 
		tab-position="top" 
		type="border-card"
		v-model="name"
		@tab-click="handleClick"
		>
		    <el-tab-pane label="全部" name="quanbu">
		    	<div class="quanbu tab-content" v-for="(item,index) in orderList">
		    		<div class="goods" v-for="(item1,index1) in item.order_goods">
		    			<div class="goods-head">
		    				<i class="el-icon-s-shop"></i>
		    				<p class="shop-name" @click="enterShop(item1.shop_id)">{{item1.shop_name}}</p>
		    			</div>
		    			<div class="goods-content">
		    				<img :src="'http://adminapi.lgj.com'+item1.goods_logo" alt="正在加载">
		    				<div class="goods-content-center">
		    					<p class="goods-name" @click="enterGoods(item1.goods_id)">{{item1.goods_name}}</p>
		    					<p class="value-name">{{item1.spec_value_names}}</p>
		    				</div>
		    				<div class="goods-content-right">
		    					<span>¥{{item1.spec_price}}</span>
		    					<span>×{{item1.number}}</span>
		    				</div>
		    			</div>
		    			<div class="goods-price">
		    				<span>总价¥{{(item1.spec_price*item1.number).toFixed(2)}}</span>
		    				<span>实付款¥{{(item1.spec_price*item1.number).toFixed(2)}}</span>
		    			</div>
		    			<div class="goods-foot">
		    				<span 
		    				v-if="item1.status === 2||item1.status === 3"
		    				class="more" 
		    				>
		    					更多
		    				</span>
		    				<span 
		    				v-if="item1.status === 2"
		    				class="common" 
		    				>
		    					挑选服务
		    				</span>
		    				<span 
		    				v-if="item1.status === 4"
							class="common" 
		    				>
		    					卖了换钱
		    				</span>
		    				<span 
		    				v-if="item1.status === 2"
		    				class="common" 
		    				>
		    					删除订单
		    				</span>
		    				<span 
		    				v-if="(item1.status === 2||item1.status === 3)"
		    				class="common" 
		    				>
		    					加入购物车
		    				</span>
		    				<span 
		    				v-if="(item1.status === 2||item1.status === 3)"
		    				class="common" 
		    				>
		    					查看物流
		    				</span>
		    				<span 
		    				v-if="item1.status === 2"
		    				class="last" 
		    				@click="accept(item1.id)"
		    				>
		    					确认收货
		    				</span>
		    				<span 
		    				v-if="item1.status === 3"
		    				class="last"
		    				@click="evaluate(item1.id)"
		    				>
		    					评价
		    				</span>
		    				<span 
		    				v-if="item1.status === 1"
		    				class="last"
		    				@click="remind(item1.id)"
		    				>
		    					提醒发货
		    				</span>
		    				<span 
		    				v-if="item1.status === 0"
		    				class="last"
	    				 	@click="pay(item1.order_id,item1.spec_price,item1.number)" 
		    				>
		    					去付款
		    				</span>
		    				<span 
		    				v-if="item1.status === 6"
		    				class="last" 
		    				>
		    					申请退款
		    				</span>
		    			</div>
		    		</div>
		    	</div>
		    </el-tab-pane>
		    <el-tab-pane label="待付款" name="daifukuan">
		    	<div class="daifukuan tab-content">
			    	<div class="goods" v-for="(item,index) in nopayList">
		    			<div class="goods-head">
		    				<i class="el-icon-s-shop"></i>
		    				<p class="shop-name" @click="enterShop(item.shop_id)">{{item.shop_name}}</p>
		    			</div>
		    			<div class="goods-content">
		    				<img :src="'http://adminapi.lgj.com'+item.goods_logo" alt="正在加载">
		    				<div class="goods-content-center">
		    					<p class="goods-name" @click="enterGoods(item.goods_id)">{{item.goods_name}}</p>
		    					<p class="value-name">{{item.spec_value_names}}</p>
		    				</div>
		    				<div class="goods-content-right">
		    					<span>¥{{item.spec_price}}</span>
		    					<span>×{{item.number}}</span>
		    				</div>
		    			</div>
		    			<div class="goods-price">
		    				<span>总价¥{{(item.spec_price*item.number).toFixed(2)}}</span>
		    				<span>实付款¥{{(item.spec_price*item.number).toFixed(2)}}</span>
		    			</div>
		    			<div class="goods-foot">
		    				<span class="last" @click="pay(item.order_id,item.spec_price,item.number)">去付款</span>
		    			</div>
			    	</div>
		    	</div>
		    </el-tab-pane>
		    <el-tab-pane label="待发货" name="daifahuo">
		    	<div class="daifahuo tab-content">
			    	<div class="goods" v-for="(item,index) in nosendList">
		    			<div class="goods-head">
		    				<i class="el-icon-s-shop"></i>
		    				<p class="shop-name" @click="enterShop(item.shop_id)">{{item.shop_name}}</p>
		    			</div>
		    			<div class="goods-content">
		    				<img :src="'http://adminapi.lgj.com'+item.goods_logo" alt="正在加载">
		    				<div class="goods-content-center">
		    					<p class="goods-name" @click="enterGoods(item.goods_id)">{{item.goods_name}}</p>
		    					<p class="value-name">{{item.spec_value_names}}</p>
		    				</div>
		    				<div class="goods-content-right">
		    					<span>¥{{item.spec_price}}</span>
		    					<span>×{{item.number}}</span>
		    				</div>
		    			</div>
		    			<div class="goods-price">
		    				<span>总价¥{{(item.spec_price*item.number).toFixed(2)}}</span>
		    				<span>实付款¥{{(item.spec_price*item.number).toFixed(2)}}</span>
		    			</div>
		    			<div class="goods-foot">
		    				<span class="last" @click="remind(item.id)">提醒发货</span>
		    			</div>
			    	</div>
		    	</div>
		    </el-tab-pane>
		    <el-tab-pane label="待收货" name="daishouhuo">
		    	<div class="daishouhuo tab-content">
			    	<div class="goods" v-for="(item,index) in noacceptList">
		    			<div class="goods-head">
		    				<i class="el-icon-s-shop"></i>
		    				<p class="shop-name" @click="enterShop(item.shop_id)">{{item.shop_name}}</p>
		    			</div>
		    			<div class="goods-content">
		    				<img :src="'http://adminapi.lgj.com'+item.goods_logo" alt="正在加载">
		    				<div class="goods-content-center">
		    					<p class="goods-name" @click="enterGoods(item.goods_id)">{{item.goods_name}}</p>
		    					<p class="value-name">{{item.spec_value_names}}</p>
		    				</div>
		    				<div class="goods-content-right">
		    					<span>¥{{item.spec_price}}</span>
		    					<span>×{{item.number}}</span>
		    				</div>
		    			</div>
		    			<div class="goods-price">
		    				<span>总价¥{{(item.spec_price*item.number).toFixed(2)}}</span>
		    				<span>实付款¥{{(item.spec_price*item.number).toFixed(2)}}</span>
		    			</div>
		    			<div class="goods-foot">
		    				<span class="more">更多</span>
		    				<span class="common">挑选服务</span>
		    				<span class="common">查看物流</span>
		    				<span class="last" @click="accept(item.id)">确认收货</span>
		    			</div>
			    	</div>
    			</div>		
		    </el-tab-pane>
		    <el-tab-pane label="待评价" name="daipingjia">
		    	<div class="daishouhuo tab-content">
			    	<div class="goods" v-for="(item,index) in noevaluateList">
		    			<div class="goods-head">
		    				<i class="el-icon-s-shop"></i>
		    				<p class="shop-name" @click="enterShop(item.shop_id)">{{item.shop_name}}</p>
		    			</div>
		    			<div class="goods-content">
		    				<img :src="'http://adminapi.lgj.com'+item.goods_logo" alt="正在加载">
		    				<div class="goods-content-center">
		    					<p class="goods-name" @click="enterGoods(item.goods_id)">{{item.goods_name}}</p>
		    					<p class="value-name">{{item.spec_value_names}}</p>
		    				</div>
		    				<div class="goods-content-right">
		    					<span>¥{{item.spec_price}}</span>
		    					<span>×{{item.number}}</span>
		    				</div>
		    			</div>
		    			<div class="goods-price">
		    				<span>总价¥{{(item.spec_price*item.number).toFixed(2)}}</span>
		    				<span>实付款¥{{(item.spec_price*item.number).toFixed(2)}}</span>
		    			</div>
		    			<div class="goods-foot">
		    				<span class="common">加入购物车</span>
		    				<span class="common">查看物流</span>
		    				<span class="last" @click="evaluate(item.id)">评价</span>
		    			</div>
			    	</div>
		    	</div>
		    </el-tab-pane>
		    <el-tab-pane label="退款/售后" name="tuikuan">
		    	<div class="tuikuan tab-content">
			    	<div class="goods" v-for="(item,index) in refundList">
		    			<div class="goods-head">
		    				<i class="el-icon-s-shop"></i>
		    				<p class="shop-name" @click="enterShop(item.shop_id)">{{item.shop_name}}</p>
		    			</div>
		    			<div class="goods-content">
		    				<img :src="'http://adminapi.lgj.com'+item.goods_logo" alt="正在加载">
		    				<div class="goods-content-center">
		    					<p class="goods-name" @click="enterGoods(item.goods_id)">{{item.goods_name}}</p>
		    					<p class="value-name">{{item.spec_value_names}}</p>
		    				</div>
		    				<div class="goods-content-right">
		    					<span>¥{{item.spec_price}}</span>
		    					<span>×{{item.number}}</span>
		    				</div>
		    			</div>
		    			<div class="goods-price">
		    				<span>总价¥{{(item.spec_price*item.number).toFixed(2)}}</span>
		    				<span>实付款¥{{(item.spec_price*item.number).toFixed(2)}}</span>
		    			</div>
		    			<div class="goods-foot">
		    				<span class="last">申请退款</span>
		    			</div>
			    	</div>
		    	</div>
		    </el-tab-pane>
	  	</el-tabs>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				name:'quanbu',
				keyword:'',
				orderList:[],
				nopayList:[],
				nosendList:[],
				noacceptList:[],
				noevaluateList:[],
				refundList:[],
			}
		},
		created(){
			this.name = this.$route.query.name;
			this.getOrderList();
		},
		methods:{
			pay(id,price,number){
				var pay = this.orderList.filter(item=>item.id == id);
				var WIDTQout_trade_no = pay[0].order_sn;
				var	WIDtotal_amount = price*number;
				WIDtotal_amount = WIDtotal_amount.toFixed(2);
				var newwindow = window.open('_blank');
				newwindow.location = "http://www.lgj.com/plugins/apply?WIDTQout_trade_no="+WIDTQout_trade_no+"&WIDtotal_amount="+WIDtotal_amount;
				//window.location.href = "http://www.lgj.com/plugins/apply?WIDTQout_trade_no="+WIDTQout_trade_no+"&WIDtotal_amount="+WIDtotal_amount;
				
			},
			accept(id){
				this.$homehttp({
					url:'accept-goods/'+id
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.$message({message:'收货成功',type:'success'});
						this.getOrderList();
					}else{
						this.$message({message:msg,type:'warning'});
					}
				})
			},
			remind(id){
				this.$homehttp({
					url:'remind-goods/'+id
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.$message({message:'提醒商家成功',type:'success'});
					}else{
						this.$message({message:msg,type:'warning'});
					}
				})
			},
			enterShop(id){
				this.$router.push({name:"shopDetail",query:{id:id}});
			},
			enterGoods(id){
				this.$router.push({name:"detail",query:{id:id}});
			},
			back(){
				this.$router.go(-1);
			},
			evaluate(id){
				this.$router.push({name:'evaluate',query:{id:id}});
			},
			handleClick(tabs,event){
				this.getOrderList();
			},
			getOrderList(){
				var userinfo = localStorage.getItem('userinfo');
				if (userinfo != null && userinfo != '' && userinfo != undefined) {
					var user_id = JSON.parse(userinfo).user_id;
					this.$homehttp({
	       				url:'order?user_id='+user_id
	      			}).then(result=>{
	        			const {code,msg,data} = result.data;
	        			if (code == 200) {
	          				this.orderList = data;
	          				this.nopayList = [];
	          				this.nosendList = [];
	          				this.noacceptList = [];
	          				this.noevaluateList = [];
	          				this.refundList = [];
	          				for(var i = 0;i < data.length;i ++ ){
	          					for(var j = 0;j < data[i].order_goods.length;j ++ ){
	            					switch(data[i].order_goods[j].status){
	              						case 0:
	                						this.nopayList.push(data[i].order_goods[j]);
	                						break;
	              						case 1:
	                						this.nosendList.push(data[i].order_goods[j]);
	                						break;
	             		 				case 2:
	                						this.noacceptList.push(data[i].order_goods[j]);
	                						break;
	              						case 3:
	                						this.noevaluateList.push(data[i].order_goods[j]);
	                						break;
	              						case 6:
	                						this.refundList.push(data[i].order_goods[j]);
	                						break;
	              						case 7:
	                						this.refundList.push(data[i].order_goods[j]);
	                						break;
	            					}
	          					}
          					}
	        			}else{

	        			}
	      			})
				}
			},
		}
	}
</script>

<style lang="less" scoped>
	.order{
		background-color:#F3F3F5;
		.head{
			display:flex;
			flex-direction:row;
			justify-content:space-between;
			align-items:center;
			height:60px;
			line-height:60px;
			padding:0 10px;
			input{
				border:1px solid red;
				border-radius:15px;
				padding:6px 0 6px 10px;
				width:60%;
			}
		}
		/deep/ .el-tabs__nav{
			width:100%;
			display:flex;
			flex-direction:row;
			.el-tabs__item{
				padding:0;
				width:17%;
				text-align:center;
			}
			.el-tabs__item:nth-child(2){
				padding-left:0;
			}
		}
		/deep/ .el-tabs__content{
			background-color:#eee;
			.el-tab-pane{
				margin:0 20px;
				.tab-content{
					display:flex;
					flex-direction:column;
					align-items:center;
					.goods{
						width:100%;
						background-color:white;
						border-radius:15px;
						padding:15px 15px 0 15px;
						margin:15px 0;
						.goods-head{
							display:flex;
							flex-direction:row;
							align-items:center;
							p{
								cursor:pointer;
								margin-left:8px;
							}
							p:after{
								content:"";
								display:inline-block;
								width:5px;
								height:5px;
								margin-left:5px;
								margin-bottom:1px;
								border-color:#aaa;
								border-style:solid;
								border-width:2px 2px 0 0;
								-webkit-transform:rotate(45deg);
								transform:rotate(45deg);
							}
						}
						.goods-content{
							display:flex;
							flex-direction:row;
							justify-content:space-between;
							align-items:center;
							img{
								width:20%;
								border:1px solid #aaa;
							}
							.goods-content-center{
								display:flex;
								flex-direction:column;
								align-items:center;
								p{
									padding:0;
									font-size:16px;
									line-height:20px;
									overflow:hidden;
								}
								.goods-name{
									margin:0 5px 5px 5px;
									height:40px;
									cursor:pointer;
								}
								.value-name{
									margin:0 5px;
									align-self:flex-start;
									font-size:12px;
									color:#aaa;
								}
							}
							.goods-content-right{
								margin-left:5px;
								align-self:flex-start;
								display:flex;
								flex-direction:column;
								align-items:center;
								span:nth-child(2){
									color:#aaa;
									align-self:flex-end;
								}
							}
						}
						.goods-price{
							margin:10px 0;
							display:flex;
							flex-direction:row;
							justify-content:flex-end;
							align-items:center;
							span:nth-child(1){
								color:#aaa;
								margin-right:8px;
							}
						}
						.goods-foot{
							display:flex;
							flex-direction:row;
							justify-content:flex-end;
							align-items:center;
							position:relative;
							margin:10px 0;
							span{
								text-align:center;
								cursor:pointer;
							}
							.more{
								position:absolute;
								left:0;
								color:#aaa;
							}
							.common{
								padding:5px 10px;
								border:1px solid #aaa;
								border-radius:15px;
								margin-right:10px;
							}
							.last{
								padding:5px 10px;
								border:1px solid #f23030;
								border-radius:15px;
								color:#f23030;
								margin-right:10px;
							}
						}
					}
				}
			}
		}
	}
</style>