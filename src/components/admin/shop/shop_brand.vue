<template>
	<div class="shop_brand">
		<!-- 商品品牌界面头部显示 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/shop' }">商城</el-breadcrumb-item>
			<el-breadcrumb-item>商品管理</el-breadcrumb-item>
			<el-breadcrumb-item>商品品牌</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 搜索框 -->
		<div class="search">
			<el-input 
	      	v-model="keyword" 
	      	autocomplete="off"
	      	placeholder="搜索品牌"
	      	>
	      	</el-input>
	      	<el-button type="primary" @click="getBrandList(keyword)">搜索</el-button>
		</div>
		<!-- 进入添加品牌会话按钮 -->
		<el-row>
			<el-col :span="24">
				<div class="addBrand">
					<el-button type="primary" @click="showAddBrand">添加分类</el-button>
				</div>
			</el-col>
		</el-row>
		<!-- 全部品牌列表表格 -->
		<el-table
	    :data="brandList"
	    border
	    style="width: 100%"
	    row-key="id"
	    >
		    <el-table-column
		    prop="id"
		    label="ID"
		    align="left"
		    >
		    </el-table-column>
		    <el-table-column
	    	prop="name"
	    	label="品牌名称"
	    	align="center"
	    	>
		    </el-table-column>
		    <el-table-column
	    	prop="logo"
	    	label="品牌图片"
	    	align="center"
	    	>
		    	<template slot-scope="scope">
		    		<img :src="'http://adminapi.jd.com'+scope.row.logo" alt="正在加载">
		      	</template>
	    	</el-table-column> 
	    	<el-table-column
	    	prop="sort"
	    	label="排序"
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
	    	prop="is_hot"
	    	label="是否热门"
	    	align="center"
	    	>
	    	</el-table-column>
	    	<el-table-column
	    	prop="desc"
	    	label="品牌描述"
	    	align="center"
	    	>
	    	</el-table-column>
	    	<el-table-column
	    	label="操作"
	    	align="center"
	    	>
	    		<template slot-scope="scope">
	    			<i class="el-icon-edit" size="mini" @click="editCategory(scope.row.id)"></i>
	    			<i class="el-icon-delete" size="mini" @click="deleteCategory(scope.row.id)"></i>
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
	  	<!-- 添加管理员会话 -->
	  	<el-dialog 
	  	title="添加品牌" 
	  	:visible.sync="isShowAddBrand"
	  	destroy-on-close
	  	>
		  	<el-form :model="addBrandData">
			    <el-form-item 
			    label="品牌名称" 
			    >
			      	<el-input 
			      	v-model="addBrandData.name" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
			    <el-form-item 
			    label="品牌描述" 
			    >
			      	<el-input 
			      	v-model="addBrandData.desc" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
			    <el-form-item 
			    label="排序" 
			    >
			      	<el-input 
			      	v-model="addBrandData.sort" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
		    	<el-form-item 
			    label="是否热门" 
			    >
			      	<el-radio 
			      	v-model="addBrandData.is_hot"
			      	label="1" 
			      	>
			      	是
			      	</el-radio>
			      	<el-radio 
			      	v-model="addBrandData.is_hot"
			      	label="0" 
			      	>
			      	否
			      	</el-radio>
			    </el-form-item>
			    <el-form-item 
			    label="所属分类" 
			    >
			      	<el-select
			      	v-model="value"
			      	clearable
			      	placeholder="请选择分类"
			      	@change="addCategoryChange"
			      	>
				      	<el-option
				      	v-for="item in cateList"
				      	:key="item.id"
				      	:label="item.cate_name"
				      	:value="item.id"
				      	>
				      	</el-option>
		      		</el-select>
			    </el-form-item>
		  	</el-form>
		  	<div 
		  	slot="footer" 
		  	class="dialog-footer"
		  	>
			    <el-button @click="isShowAddBrand = false">
			    取 消
				</el-button>
			    <el-button 
			    type="primary" 
			    @click="addBrand"
			    >
			    确 定
				</el-button>
			</div>
		</el-dialog>
		<!-- 修改管理员会话 -->
	  	<el-dialog 
	  	title="修改管理员" 
	  	:visible.sync="isShowEditBrand"
	  	destroy-on-close
	  	>
		  	<el-form :model="updateBrandData">
			    <el-form-item 
			    label="品牌名称" 
			    >
			      	<el-input 
			      	v-model="updateBrandData.name" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
			    <el-form-item 
			    label="品牌描述" 
			    >
			      	<el-input 
			      	v-model="updateBrandData.desc" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
			    <el-form-item 
			    label="排序" 
			    >
			      	<el-input 
			      	v-model="updateBrandData.sort" 
			      	autocomplete="off"
			      	>
			      	</el-input>
			    </el-form-item>
		    	<el-form-item 
			    label="是否热门" 
			    >
			      	<el-radio 
			      	v-model="updateBrandData.is_hot"
			      	label="1" 
			      	>
			      	是
			      	</el-radio>
			      	<el-radio 
			      	v-model="updateBrandData.is_hot"
			      	label="0" 
			      	>
			      	否
			      	</el-radio>
			    </el-form-item>
			    <el-form-item 
			    label="所属分类" 
			    >
			    	<!--
			      	<el-select
			      	v-model="value"
			      	clearable
			      	placeholder="请选择分类"
			      	@change="editCategoryChange"
			      	>
				      	<el-option
				      	v-for="item in cateList"
				      	:key="item.id"
				      	:label="item.cate_name"
				      	:value="item.id"
				      	>
				      	</el-option>
		      		</el-select>
		      		-->
		      		<el-cascader
				    :options="cateList"
				    :props="prop"
		    		clearable
		    		>
		    		</el-cascader>
			    </el-form-item>
		  	</el-form>
		  	<div 
		  	slot="footer" 
		  	class="dialog-footer"
		  	>
			    <el-button @click="isShowEditBrand = false">
			    取 消
				</el-button>
			    <el-button 
			    type="primary" 
			    @click="updateBrand"
			    >
			    确 定
				</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				keyword:"",
				brandList:[],
				total:0,
				perPage:4,
				currentPage:1,
				isShowAddBrand:false,
				addBrandData:{
					name:"",
					logo:"",
					sort:50,
					cate_id:"",
					is_hot:1,
					desc:""
				},
				updateBrandData:{
					name:"",
					logo:"",
					sort:50,
					cate_id:"",
					is_hot:1,
					desc:""
				},
				value:'',
				cateList:[],
				isShowEditBrand:false,
				prop:{ 
					lazy:true,
					value:'id',
					label:'cate_name',
					lazyLoad:(node,resolve)=>{
						//console.log(node);
						const { level,data} = node;
						setTimeout(()=>{
							this.$http({
								url:'categorys?type=list&pid='+data.id
							}).then(result=>{
								const res = result.data.data.map(item=>({
									value:item.cate_name,
									label:item.id,
									leaf:level >= 2
								}))
								console.log(res);
								resolve(res);
							})
						},1000)
					}
				}
			}
		},
		methods:{
			getBrandList(keyword=""){
				this.$http({
					url:'brands?page='+this.currentPage+'&keyword='+this.keyword
				}).then(result=>{
					if (result.data.code == 200) {
						this.brandList = result.data.data.data;
						this.total = result.data.data.total;
						this.perPage = result.data.data.per_page;
					}else{
						this.$message({message:result.data.msg,type:'warning'});
					}
				})
			},
			showAddBrand(){
				this.isShowAddBrand = true;
			},
			editCategory(id){
				this.isShowEditBrand = true;
			},
			deleteCategory(id){

			},
			currentChange(c){
				this.currentPage = c;
				this.getBrandList();
			},
			getCateList(){
				this.$http({
					url:'categorys?type=list&pid=0'
				}).then(result=>{
					if (result.data.code == 200) {
						this.cateList = result.data.data;
					}else{
						this.$message({message:result.data.msg,type:'warning'});
					}
				})
			},
			addBrand(){

			},
			addCategoryChange(){

			},
			editCategoryChange(){

			},
			updateBrand(){

			},
		},
		mounted(){
			this.getBrandList();
			this.getCateList();
		},
		created(){
			this.prop.lazyload = function(node,resolve){
				console.log(node,resolve);
			}
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
	.el-pagination{
		display:flex;
		flex-direction:row;
		justify-content:center;
	}
</style>