<template>
	<div class="nopay">
		<div class="head">
			<i class="el-icon-arrow-left back" @click="back"></i>
			<input type="text" placeholder="搜索我的订单">
			<i class="el-icon-more more"></i>
		</div>
		<el-tabs tab-position="top" type="border-card">
		    <el-tab-pane label="全部">全部</el-tab-pane>
		    <el-tab-pane label="待付款">待付款</el-tab-pane>
		    <el-tab-pane label="待发货">待发货</el-tab-pane>
		    <el-tab-pane label="待收货">待收货</el-tab-pane>
		    <el-tab-pane label="待评价">待评价</el-tab-pane>
	  	</el-tabs>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				nopayList:[]
			}
		},
		created(){
			this.nopayList = this.$route.query.nopayList;
			console.log(this.nopayList);
		},
		methods:{
			back(){
				this.$router.go(-1);
			},
		}
	}
</script>

<style lang="less" scoped>
	.nopay{
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
				width:21%;
				text-align:center;
			}
		}
	}
</style>