<template>
  	<div class="address">
  		<div class="address-head">
  			<i class="el-icon-back back" @click="back"></i>
      		<p class="head-center">我的收货地址</p>
      		<p @click="addAddress" class="add-address">添加新地址</p>
  		</div>
  		<div class="address-content">
  			<div 
  			class="address-li" 
  			v-for="(item,index) in addressList"
  			:key="index"
  			>
  				<div class="li-span">
	  				<span class="sign">{{item.sign}}</span>
  				</div>
  				<div class="address-message">
  					<div class="message-header">
  						<span class="consignee">{{item.consignee}}</span>
  						<span class="phone">{{item.phone}}</span>
  					</div>
  					<div class="message-footer">
  						<span 
  						:class="item.is_default == 1 ?'default':'common'">
							{{item.is_default == 1?'默认':item.sign}}
  						</span>
  						<span class="address-text">{{item.area+item.address}}</span>
  					</div>
  				</div>
  				<span class="edit li-span" @click="editAddress(item.id)">编辑</span>
  			</div>
  		</div>
  	</div>
</template>

<script>
	export default {
		created(){
			this.user_id = this.$route.query.id;
			this.getAddress();
		},
		data(){
			return {
				user_id:0,
				addressList:[],
			}
		},
		methods:{
			back(){
				this.$router.go(-1);
			},
			addAddress(){
				this.$router.push({name:'addAddress',query:{user_id:this.user_id}})
			},
			getAddress(){
				this.$homehttp({
					url:'address?user_id='+this.user_id
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.addressList = data;
					}else{

					}
				})
			},
			editAddress(id){
				this.$router.push({name:'editAddress',query:{id:id,user_id:this.user_id}});
			},
		}
	}
</script>

<style lang="less" scoped>
	.address{
		.address-head{
		 	position: relative;
	      	height:44px;
	      	line-height:44px;
	      	background-color:#eee;
	      	.back{
	      		position:absolute;
	      		left:20px;
	      		height:44px;
        		line-height:44px;
        		font-size:20px;
	      	}
      	 	.head-center{
		        text-align:center;
		        font-weight:bold;
		        margin:0;
      		}
      		.add-address{
      			position:absolute;
      			right:10px;
      			top:0;
      			height:44px;
        		line-height:44px;
		        text-align:center;
        		font-size:16px;
		        margin:0;
      		}
		}
		.address-content{
			display:flex;
			flex-direction:column;
			justify-content:center;
			align-items:center;
			.address-li{
				margin:22px 0;
				width:100%;
				display:flex;
				flex-direction:row;
				justify-content:center;
				align-items:center;
				padding-bottom:10px;
				border-bottom:1px solid #eee;
				.sign{
					display:inline-block;
					width:25px;
					height:25px;
					line-height:25px;
					overflow: hidden;
					border-radius:50%;
					background-color:#eee;
				}
				.li-span{
					width:12%;
					text-align:center;
					height:20px;
					line-height:20px;
					text-align:center;
				}
				.address-message{
					width:76%;
					.message-header{
						.consignee{
							font-size:16px;
							margin-right:10px;
						}
						.phone{
							font-size:12px;
							color:#888;
						}
					}
					.message-footer{
						span{
							padding:0 8px;
							font-size:12px;
							text-align:center;
						}
						.default{
							background-color:#FFD6CC;
							color:#FF603F;
						}
						.common{
							background-color:#eee;
							color:#8f8f8f;
						}
						.address-text{
							font-size:14px;
						}
					}
				}
				.edit{
					border-left:1px solid #eee;
				}
			}
		}
	}
</style>