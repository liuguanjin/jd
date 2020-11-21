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
	  	<!-- 添加商品会话 -->
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
			    label="所属分类" 
			    >
		      		<el-cascader
		      		v-model="add_cate_name"
				    :options="cateList"
				    :props="cateProp"
		    		clearable
		    		@change="addCateChange"
		    		>
		    		</el-cascader>
			    </el-form-item>
			    <el-form-item 
			    label="所属品牌" 
			    >
		      		<el-select
		      		v-model="add_brand_name" 
		      		placeholder="请选择品牌"
		    		clearable
		    		@change="addBrandChange"
		      		>
			      		<el-option
			      		v-for="item in brandList"
			      		:key="item.id"
			      		:value="item.id"
			      		:label="item.name"
			    		>
			    		</el-option>
		      		</el-select>
			    </el-form-item>
			    <el-form-item 
			    label="所属模型" 
			    >
			    	<el-select
		      		v-model="add_type_name" 
		      		placeholder="请选择模型"
		    		clearable
		    		@change="addTypeChange"
		      		>
			      		<el-option
			      		v-for="item in typeList"
			      		:key="item.id"
			      		:value="item.id"
			      		:label="item.type_name"
			    		>
			    		</el-option>
		      		</el-select>
			    </el-form-item>
			    <el-form-item 
			    label="商品logo" 
			    >
			    	<el-upload
                    class="upload-demo"
                    action="http://adminapi.lgj.com/logo"
                    list-type="picture"
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
                <el-form-item 
			    label="商品相册" 
			    >
			    	<el-upload
			    	ref="upload"
                    class="upload-demo"
                    action="http://adminapi.lgj.com/images"
                    :data="myData"
                    :auto-upload="false"
                	multiple
                    name="images"
                    list-type="picture"
                    :http-request="handleUpload"
                    :before-upload="beforeAvatarUpload"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :file-list="imagesList"
                    :on-success = 'addImagesSuccess'
                    :on-error="uploadError"
                    :headers="myHeader"
                    >
                        <el-button slot="trigger" size="small" type="primary">上传商品相册</el-button>
                        <el-button size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                        <div slot="tip" class="el-upload__tip">jpg/jpeg/png/gif文件，且不超过10MB</div>
                    </el-upload>
                </el-form-item>
		  	</el-form>
		  	<!-- 对规格的添加 -->
		  	<el-button @click="addSpecInAdd" type="primary">添加规格商品</el-button>
		  	<el-table
		  	:data="addGoodsData.item"
		  	>
		  		<el-table-column
			    label="价格"
			    align="center"
			    min-width="20%"
			    >
			    	<template slot-scope="scope">
			    		<el-input v-model="scope.row.price" placeholder="请输入价格"></el-input>
			    	</template>
			    </el-table-column>
			    <el-table-column
			    label="成本价"
			    align="center"
			    min-width="25%"
			    >
			    	<template slot-scope="scope">
			    		<el-input v-model="scope.row.cost_price" placeholder="请输入成本价"></el-input>
			    	</template>
			    </el-table-column>
			    <el-table-column
			    label="库存"
			    align="center"
			    min-width="20%"
			    >
			    	<template slot-scope="scope">
			    		<el-input v-model="scope.row.store_count" placeholder="请输入库存"></el-input>
			    	</template>
			    </el-table-column>
			    <el-table-column
			    label="规格值"
			    align="center"
			    min-width="25%"
			    >
			    	<template slot-scope="scope">
			    		<el-select
				    	v-for="(item1,index1) in specList"
		      			:key="index1"
			      		v-model="spec_value[(scope.$index+1000)*(index1+1)]"
			      		:placeholder="'请选择'+item1.spec_name"
			    		clearable
			    		@visible-change="isGetSpecvalue($event,item1.id)"
			    		@change="specvalueChange($event,scope.$index,index1,item1.spec_name)"
			      		>
				      		<el-option
				      		v-for="item in specvalueList"
				      		:key="item.id"
				      		:value="item.id"
				      		:label="item.spec_value"
				    		>
				    		</el-option> 
			      		</el-select>
			    	</template>
			    </el-table-column>
			    <el-table-column
		    	label="操作"
		    	align="center"
		    	min-width="10%"
		    	>
		    		<template slot-scope="scope">
		    			<i class="el-icon-delete" size="mini" @click="deleteSpecInAdd(scope.$index)"></i>
		    		</template>
			    </el-table-column>
		  	</el-table>
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
					goods_number:"",
					cate_id:"",
					brand_id:"",
					type_id:"",
					item:[
						{price:"",cost_price:"",store_count:"",value_ids:"",value_names:""}
					],
					goods_images:[]
				},
				fileList:[],
				imagesList:[],
				myHeader:{
					Authorization:token
				},
				myData:{
					type:'goods'
				},
				add_cate_name:'',
				add_brand_name:'',
				add_type_name:'',
				spec_value:[],
				cateList:[],
				brandList:[],
				typeList:[],
				specList:[],
				specvalueList:[],
				cateProp:{ 
					lazy:true,
					value:'id',
					label:'cate_name',
					lazyLoad:(node,resolve)=>{
						//console.log(node);
						const { level} = node;
						if (level == 1 || level == 2) {
							const { data } = node;
							this.$http({
								url:'categorys?type=list&pid='+data.id
							}).then(result=>{
								const res = result.data.data.map(item=>({
									cate_name:item.cate_name,
									label:item.level,
									id:item.id,
									leaf:level >= 2,
								}))
								//console.log(res);
								resolve(res);
							})
						}
					}
				},
				spec_goods:{},
			}
		},
		methods:{
			//获取商品列表 keywo 搜索关键字
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
			//获取分类列表 用于选择商品所属分类
			getCateList(){
				this.$http({
					url:'categorys?type=list&pid=0'
				}).then(result=>{
					const {code,data,msg} = result.data;
					if (code == 200) {
						this.cateList = data;
					}else{
						this.$message({message:msg,type:'warning'});
					}
				})
			},
			//获取品牌列表 用于选择商品所属品牌
			getBrandList(){
				this.$http({
					url:'allbrands'
				}).then(result=>{
					const {code,data,msg} = result.data;
					if (code == 200) {
						this.brandList = data;
					}else{
						this.$message({message:msg,type:'warning'});
					}
				})
			},
			//获取模型列表 用于选择商品所属模型 keyword 搜索关键字
			getTypeList(keyword=""){
				this.$http({
					url:'types?keyword='+keyword
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.typeList = data;
					}else{
						this.$message({message:msg,type:'warning'});
					}
				})
			},
			//获取规格列表 用于选择商品所属规格 type_id 所属模型id
			getSpecList(id){
				this.$http({
					url:'specs?type_id='+id
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.specList = data;
					}else{
						this.$message({message:msg,type:'warning'});
					}
				})
			},
			//是否展示添加商品会话
			showAddGoods(){
				this.isShowAddGoods = true;
			},
			//添加商品逻辑 发送请求
			addGoods(){
				this.$http({
					url:'goods',
					method:'post',
					data:this.addGoodsData
				}).then(result=>{
					const {code,data,msg} = result.data;
					if (code == 200) {
						this.$message({message:'添加商品成功',type:'success'});
					}else{
						this.$message({message:msg,type:'warning'});
					}
				})
			},
			//是否展示修改商品会话 id 商品id
			editGoods(id){

			},
			//删除商品逻辑 发送请求 id 商品id
			deleteGoods(id){

			},
			//改变分页页数 使当前页为点击页 重新渲染界面
			currentChange(c){
				this.currentPage = c;
				this.getGoodsList();
			},
			//在上传logo时判断 格式大小是否为指定格式大小
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
	      	//移除已上传的logo 显示移除提示
	      	handleRemove(file, fileList) {
        		this.$message({message:`移除 ${ file.name } 成功`,type:'success'});
      		},
      		//在移除前的判断 提示是否移除
      		beforeRemove(file, fileList) {
        		return this.$confirm(`确定移除 ${ file.name }？`);
      		},
      		//上传logo成功 提示信息 将上传成功的地址添加到数据中
      		addUploadSuccess(response,file,fileList){
	      		this.$message({message:`${file.name}上传成功`,type:'success'});
	      		this.addGoodsData.goods_logo = response.data;
			},
			//上传iamges成功 提示信息 将上传成功的地址添加到数据中
      		addImagesSuccess(response,file,fileList){
	      		this.$message({message:`${file.name}上传成功`,type:'success'});
			},
			//上传logo失败的逻辑 提示上传失败
			uploadError(){
	      		this.$message({message:'上传失败，请检查上传地址',type:'warning'});
	      	},
	  //     	updateUploadSuccess(response,file,fileList){
	  //     		this.$message({message:`${file.name}上传成功`,type:'success'});
	  //     		this.updateBrandData.logo = response.data;
			// },
			submitUpload(){
				this.$refs.upload.submit();
				var fd = new window.FormData();
				fd.append('operator','刘观金');
				fd.append('type','goods');
				this.imagesList.forEach(function(file){
					fd.append('images[]',file.file);
				});
				this.$http({
					url:'images',
					method:'post',
					data:fd
				}).then(result=>{
					const {code,msg,data} = result.data;
					if (code == 200) {
						this.addGoodsData.goods_images = data.success;
					}else{
						this.$message({message:msg,type:'warning'});
					}
				})
			},
			handleUpload(row){
				this.imagesList.push(row);
			},
			//添加商品时改变选中分类的逻辑 将选中的分类id添加至数据中
			addCateChange(e){
	      		this.addGoodsData.cate_id = e[2];
	      	},
	      	//添加商品时改变选中品牌的逻辑 将选中的品牌id添加至数据中
	      	addBrandChange(e){
	      		this.addGoodsData.brand_id = e;
	      	},
	      	//添加商品时改变选中模型的逻辑 将选中的模型id添加至数据中 并重新请求该模型下的规格
	      	addTypeChange(e){
	      		this.addGoodsData.type_id = e;
	      		this.getSpecList(e);
	      	},
	      	//点击添加规格商品按钮后的逻辑 push方法使数据中的item添加一项空的值
	      	addSpecInAdd(){
	      		this.addGoodsData.item.push({price:"",cost_price:"",store_count:"",value_ids:"",value_names:""});
	      	},
	      	//点击规格商品中的删除图标后的逻辑 splice删除item中的该项
	      	deleteSpecInAdd(index){
	      		this.addGoodsData.item.splice(index,1);
	      	},
	      	//当规格值下拉列表展开时 如果specvalueList为空则发送获取specvalue的请求
	      	//当规格值下拉列表收起时清空specvalue
	      	isGetSpecvalue(flag,id){
	      		if (flag) {
	      			if (this.specvalueList.length == 0) {
		      			this.$http({
		      				url:'specvalues?spec_id='+id
		      			}).then(result=>{
		      				const {code,msg,data} = result.data;
		      				if (code == 200) {
		      					this.specvalueList = data;
		      				}else{
		      					this.$message({message:msg,type:'warning'})
		      				}
		      			})
	      			}
	      		}else{
	      			this.specvalueList = [];
	      		}
	      	},
	      	//规格值下拉列表发生改变时的逻辑
	      	specvalueChange(e,index,index1,name){
	      		this.spec_goods = this.specvalueList.find(item=>item.id ==e);
	      		var value = this.spec_goods.spec_value;
  				var value_ids = this.addGoodsData.item[index].value_ids;
  				var value_names = this.addGoodsData.item[index].value_names;
	      		if (index1 == 0) {
	      			if (value_ids.length == 0) {
	      				this.addGoodsData.item[index].value_ids = e + '_';
	      			}else{
		      			value_ids = value_ids.slice(value_ids.indexOf('_'),value_ids.length);
		      			e += value_ids;
		      			this.addGoodsData.item[index].value_ids = e;
	      			}
	      			if (value_names.length == 0) {
	      				this.addGoodsData.item[index].value_names = name + ':' + value + ';';
	      			}else{
	      				value_names = value_names.slice(value_names.indexOf(';'),value_names.length);

	      				value = name + ':' + value + value_names;
	      				this.addGoodsData.item[index].value_names = value;
	      			}
	      		}else{
	      			if (value_ids.length == 0) {
	      				this.addGoodsData.item[index].value_ids = '_' + e;
	      			}else{
		      			if(value_ids.length > value_ids.indexOf('_')){
		      				this.addGoodsData.item[index].value_ids = value_ids.slice(0,value_ids.indexOf('_')+1);
		      				this.addGoodsData.item[index].value_ids += e;
		      			}else{
		      				this.addGoodsData.item[index].value_ids += e;
						}
	      			}
	      			if (value_names.length == 0) {
	      				this.addGoodsData.item[index].value_names = ';' + name + ':' + value;
	      			}else{
	      				if (value_names.length > value_names.indexOf(';')) {
	      					value_names = value_names.slice(0,value_names.indexOf(';')+1);
	      					value_names = value_names + name + ':' + value;
	      					this.addGoodsData.item[index].value_names = value_names;
	      				}
	      			}
	      		}
	      		//console.log(this.addGoodsData);
	      	}
		},
		mounted(){
			this.getGoodsList();
			this.getCateList();
			this.getBrandList();
			this.getTypeList();
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