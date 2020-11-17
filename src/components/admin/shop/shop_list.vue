<template>
	<div class="shop_list">
		<!-- 商品列表界面头部显示 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/shop' }">商城</el-breadcrumb-item>
			<el-breadcrumb-item>商品管理</el-breadcrumb-item>
			<el-breadcrumb-item>商品列表</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 搜索框 -->
		<div class="search">
			<el-input 
	      	v-model="keyword" 
	      	autocomplete="off"
	      	placeholder="搜索商品"
	      	>
	      	</el-input>
	      	<el-button type="primary" @click="getGoodsList(keyword)">搜索</el-button>
		</div>
		<!-- 进入添加商品会话按钮 -->
		<el-row>
			<el-col :span="24">
				<div class="addGoods">
					<el-button type="primary" @click="showAddGoods">添加商品</el-button>
				</div>
			</el-col>
		</el-row>
		<!-- 全部商品列表表格 -->
		<el-table
	    :data="goodsList"
	    border
	    style="width: 100%"
	    row-key="id"
	    >
		    <el-table-column
		    prop="id"
		    label="ID"
		    align="center"
		    >
		    </el-table-column>
		    <el-table-column
	    	prop="goods_name"
	    	label="商品名称"
	    	align="center"
	    	>
		    </el-table-column>
		    <el-table-column
	    	prop="goods_logo"
	    	label="商品logo"
	    	align="center"
	    	>
		    </el-table-column>
		    <el-table-column
	    	prop="goods_price"
	    	label="商品价格"
	    	align="center"
	    	>
		    </el-table-column>
		    <el-table-column
	    	prop="market_price"
	    	label="商品市场价"
	    	align="center"
	    	>
		    </el-table-column>
		    <el-table-column
	    	prop="cost_price"
	    	label="商品成本价"
	    	align="center"
	    	>
		    </el-table-column> 
		    <el-table-column
	    	prop="goods_number"
	    	label="商品库存"
	    	align="center"
	    	>
		    </el-table-column>
		    <el-table-column
	    	prop="sales_num"
	    	label="商品销量"
	    	align="center"
	    	>
		    </el-table-column>
		    <el-table-column
	    	prop="cate_name"
	    	label="所属分类"
	    	align="center"
	    	>
		    </el-table-column>
		    <el-table-column
	    	prop="brand_name"
	    	label="所属品牌"
	    	align="center"
	    	>
		    </el-table-column>
		    <el-table-column
	    	prop="type_name"
	    	label="所属模型"
	    	align="center"
	    	>
		    </el-table-column>
	    	<el-table-column
	    	label="操作"
	    	align="center"
	    	>
	    		<template slot-scope="scope">
	    			<i class="el-icon-edit" size="mini" @click="editGoods(scope.row.id)"></i>
	    			<i class="el-icon-delete" size="mini" @click="deleteGoods(scope.row.id)"></i>
	    		</template>
		    </el-table-column>
	  	</el-table>
	  	<!-- 分页 -->
	  	<el-pagination
	    layout="prev, pager, next"
	    :total="total"
	    :page-size.sync="perPage"
	    @current-change="currentChange"
	    >
	  	</el-pagination>
	  	<!-- 添加模型会话 -->
	  	<el-dialog 
	  	title="添加商品" 
	  	:visible.sync="isShowAddGoods"
	  	destroy-on-close
	  	>
	  		<el-form :model="addGoodsData">
			    <el-form-item 
			    label="商品名称" 
			    >
			      	<el-input 
			      	v-model="addGoodsData.goods_name" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item> 
			    <el-form-item 
			    label="商品价格" 
			    >
			      	<el-input 
			      	v-model="addGoodsData.goods_price" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
			    <el-form-item 
			    label="商品市场价" 
			    >
			      	<el-input 
			      	v-model="addGoodsData.market_price" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
			    <el-form-item 
			    label="商品成本价" 
			    >
			      	<el-input 
			      	v-model="addGoodsData.cost_price" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item> 
			    <el-form-item 
			    label="商品库存" 
			    >
			      	<el-input 
			      	v-model="addGoodsData.goods_number" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
			    <el-form-item 
			    label="商品图片" 
			    >
			    	<el-upload
                    class="upload-demo"
                    action="http://adminapi.lgj.com/logo"
                    :before-upload="beforeAvatarUpload"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :file-list="fileList"
                    :on-success = 'addUploadSuccess'
                    :limit="1"
                    :on-error="uploadError"
                    :headers="myHeader"
                    name="logo"
                    :data="myData"
                    >
                        <el-button slot="trigger" size="small" type="primary">上传logo</el-button>
                        <div slot="tip" class="el-upload__tip">jpg/jpeg/png/gif文件，且不超过10MB</div>
                    </el-upload>
                </el-form-item>
		  	</el-form>
		  	<div 
		  	slot="footer" 
		  	class="dialog-footer"
		  	>
			    <el-button @click="isShowAddGoods = false">
			    取 消
				</el-button>
			    <el-button 
			    type="primary" 
			    @click="addGoods"
			    >
			    确 定
				</el-button>
			</div>
	  	</el-dialog>
	</div>
</template>

<script>
	var token = localStorage.getItem('token');
	export default {
		data(){
			return {
				isShowAddGoods:false,
				goodsList:[],
				total:0,
				perPage:10,
				currentPage:1,
				keyword:"",
				addGoodsData:{
					goods_name:"",
					goods_price:"",
					goods_logo:"",
					market_price:"",
					cost_price:"",
					goods_number:""
				},
				fileList:[],
				myHeader:{
					Authorization:token
				},
				myData:{
					type:'goods'
				},
			}
		},
		methods:{
			getGoodsList(keyword=""){
				this.$http({
					url:'goods?keyword='+this.keyword+'&page='+this.currentPage
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.goodsList = data.data;
						this.total = data.total;
						this.perPage = data.per_page;
					}else{
						this.$message({message:msg,type:'warning'});
					}
				})
			},
			showAddGoods(){
				this.isShowAddGoods = true;
			},
			addGoods(){

			},
			editGoods(id){

			},
			deleteGoods(id){

			},
			currentChange(c){
				this.currentPage = c;
				this.getGoodsList();
			},
			beforeAvatarUpload(file) {
		        var isRightImage = false;
		        var isLt10M = file.size / 1024 / 1024 < 10;
		        if(file.type === 'image/jpeg'
		        	|| file.type === 'image/jpg'
		        	|| file.type === 'image/png'
		        	|| file.type === 'image/gif'){

		        	isRightImage = true;
		       	}
		        if (!isRightImage) {
		          this.$message.error('上传头像图片只能是 jpg/jpeg/png/gif 格式!');
		        }
		        if (!isLt10M) {
		          this.$message.error('上传头像图片大小不能超过 10MB!');
		        }
		        return isRightImage && isLt10M;
	      	},
	      	handleRemove(file, fileList) {
        		this.$message({message:`移除 ${ file.name } 成功`,type:'success'});
      		},
      		beforeRemove(file, fileList) {
        		return this.$confirm(`确定移除 ${ file.name }？`);
      		},
      		addUploadSuccess(response,file,fileList){
	      		this.$message({message:`${file.name}上传成功`,type:'success'});
	      		this.addGoodsData.goods_logo = response.data;
			},
			uploadError(){
	      		this.$message({message:'上传失败，请检查上传地址',type:'warning'})
	      	},
	  //     	updateUploadSuccess(response,file,fileList){
	  //     		this.$message({message:`${file.name}上传成功`,type:'success'});
	  //     		this.updateBrandData.logo = response.data;
			// },
		},
		mounted(){
			this.getGoodsList();
		}
	}
</script>

<style lang="less" scoped>
	.el-row{
		margin-top:10px;
		margin-bottom:10px;
	}
	.search{
		margin-top:10px;
		display:flex;
		flex-direction:row;
	}
	.el-dialog{
		.el-button{
			margin-top:10px;
		}
	}
</style>