<template>
	<!-- 分类页面的内容 -->
	<div class="classify-main" v-if="isShow">
		<!-- 左侧内容 -->
		<div class="left-content">
			<ul class="content">
				<li 
				v-for="(item,index) in category_one"
				:key="index"
				@click="categoryOneClick(item.id,index)"
				:class="index === active?'active':''"
				>
					{{item.cate_name}}
				</li>
			</ul>
		</div>
		<!-- 右侧详情 -->
		<div class="detail-content" v-if="isShowRight">
			 <div  
			 v-for="(item1,index1) in category_two"  
			 :key="index1" 
			 class="content-classify""
			 >
			 	<h4>{{item1.cate_name}}</h4>
			 	<ul class="content-detail">
			 		<li 
			 		v-for="(item2,index2) in category_three[index1]" 
			 		:key="index2" 
			 		class="content-li"  
			 		@click="toClassifyDetail(item2.id)"
			 		>
			 			<img 
			 			:src="'http://adminapi.lgj.com'+item2.image_url" 
			 			alt="正在加载"
			 			>
			 			<p>{{item2.cate_name}}</p>
			 		</li>
			 	</ul>
			 </div>
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return{
			category_one:[],
			category_two:[],
			category_three:[],
			active:0,
			isShowRight:false,
		}
	},
	created(){
		this.getCategoryOne();
		this.getCategoryTwo(1);
	},
	methods:{
		getCategoryOne(){
			this.$homehttp({
				url:'category/0'
			}).then(result=>{
				const {code,msg,data} = result.data;
				if (code == 200) {
					this.category_one = data;
				}else{
					this.$message({message:msg,type:'warning'})
				}
			})
		},
		getCategoryTwo(id){
			this.$homehttp({
				url:'category/'+id
			}).then(result=>{
				const {code,msg,data} = result.data;
				if (code == 200) {
					this.category_two = data;
					for(var i = 0;i < data.length;i ++ ){
						((i)=>{
							//获取三级分类
							this.$homehttp({
								url:'category/'+data[i].id
							}).then(result1=>{
								const {code,msg,data} = result1.data;
								if (code == 200) {
									this.category_three[i] = new Array();
									this.category_three[i] = data;
									this.isShowRight = true;
								}else{
									this.$message({message:msg,type:'warning'});
								}
							})
						})(i)
					}
				}else{
					this.$message({message:msg,type:'warning'});
				}
			})
		},
		categoryOneClick(id,index){
			//将active值修改为左侧点击的具体index
			this.active = index;
			//获取二级分类
			this.category_two = [];
			this.category_three = [];
			this.getCategoryTwo(id);
		},
		toClassifyDetail(id){
			this.$router.push({name:'classify-detail',query:{id:id}});
		}
	},
	props:["isShow"]
}	
</script>

<style lang="less" scoped>
@import url("../less/common.less");
@import url("../less/reset.less");
.classify-main{
	width:100%;
	margin-top:@navHeight;
	margin-bottom:60px;
	display:flex;
	flex-direction:row;
	align-items:space-around;
	height:100%;
	.left-content{
		background-color:#eee;
		flex:1;
		.content{
			height:100%;
			li{
				height:60px;
				.titleStyle(#000,@textSize,center);
				line-height:60px;
				cursor: pointer;
				-webkit-tap-highlight-color: transparent;
			}
			.active{
				background-color:white;
				color:#e93b3d;
			}
		}
	}
	.detail-content{
		background-color:white;
		margin-left:5px;
		flex:6;
		.content-classify{
			h4{
				height:40px;
				line-height:40px;
				font-size:14px;
				font-weight:700;
			}
			.content-detail{
				margin-left:5%;
				.flexRowCenter();
				flex-wrap:wrap;
				li{
					margin-right:2%;
					width:30%;
					background-color:white;
					border-radius:8px;
					margin-bottom:5px;
					img{
						margin-top:5px;
						width:100%;
						height:70%;
						border-bottom:2px solid #f7f7f7;
					}
					p{
						width:100%;
						height:30%;
						font-size:12px;
						text-align:center;
					}
				}
			}
		}
	}
}
</style>