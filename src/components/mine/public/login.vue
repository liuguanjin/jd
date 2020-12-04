<template>
  <div id="mine-login">
  	<!-- 登录界面logo -->
  	<div class="logo">
  		<img src="https://person-use.oss-cn-shenzhen.aliyuncs.com/images/cart-login/1.jpg" alt="">	
  	</div>
  	<!-- 账号注册框 -->
  	<div class="uname-box">
  		<p>账号:</p>
  		<input type="text" v-model="loginForm.username" class="uname" placeholder="请输入您的账号">
  		<p :class="show?'prompt-show':'prompt-none'">{{uanmePrompt}}</p>
  	</div>
  	<!-- 密码注册框 -->
  	<div class="pwd-box">
  		<p>密码:</p>
  		<input type="password" v-model="loginForm.password" class="upwd" placeholder="请输入您的密码">
  		<p :class="pwdshow?'pwdprompt-show':'pwdprompt-none'">{{upwdPrompt}}</p>
  	</div>
  	<!-- 验证码框 -->
  	<div class="verification">
  		<p>验证码:</p>
  		<input type="text" class="veri-input" v-model="loginForm.code" placeholder="请输入验证码">
  		<span class="ver-code" @click="generateVerify"><img :src="verify.src" alt="正在加载"></span>
  		<p :class="veriShow?'verify-show':'verify-none'">{{veriPrompt}}</p>
  	</div>
  	<!-- 登录注册按钮 -->
  	<div class="btn">
  		<button class="login" @click="login">登录</button>
  		<button class="regist" @click="regist">免费注册</button>
  		<button class="admin" @click="admin">我是商家</button>
  	</div>
  </div>
</template>

<script>
import {mapState,mapActions} from "vuex";
export default {
 	data(){
 		return {
 			loginForm:{
 				username:"",
 				password:"",
 				code:"",
 			},
 			uanmePrompt:"",
 			show:false,
 			upwdPrompt:"",
 			pwdshow:false,
 			verify:"",
 			veriShow:false,
 			veriPrompt:""
 		}
 	},
 	computed:{
 		...mapState({
 			arr : state => state.cart.cartArr
 		})
 	},
 	created(){
 		// 生命周期方法
 		this.generateVerify();
 		this.loginForm.username="";
		this.loginForm.password="";
		this.loginForm.code="";
 	},
 	methods:{
 		...mapActions({
 			replaceCartArr:"replaceCartArr"
 		}),
 		login(){
 			//登录的判断
 			var username = this.loginForm.username;
 			var password = this.loginForm.password;
 			var code = this.loginForm.code;
 			if (username == "") {
 				this.uanmePrompt = "请输入用户名";
				this.show = true;
 			}else if(password == ""){
 				this.show = false;
 				this.pwdshow = true;
 				this.upwdPrompt = "密码不能为空";
 			}else if(code == ""){
 				this.veriShow = true;
 				this.veriPrompt = "验证码不能为空";
 				this.pwdshow = false;
 				this.show = false;
 			}else{
 				this.veriShow = false;
 				this.loginForm.uniqid = this.verify.uniqid;
 				this.$http({
 					url:'homeLogin',
 					method:"post",
 					data:this.loginForm
 				}).then(result=>{
 					const {code,msg,data} = result.data;
	 				if (code == 200) {
	 					var userinfo = {};
	 					userinfo = JSON.stringify(data);
	 					localStorage.setItem("userinfo",userinfo);
	 					this.$homehttp({
	 						url:'cart/'+data.user_id
	 					}).then(result=>{
	 						const {code,msg,data} = result.data;
	 						if (code == 200) {
	 							this.replaceCartArr(data);
	 						}else{
	 							this.replaceCartArr([]);
	 						}
	 					})
	 					this.$message({message:'登录成功',type:'success'});
	 					this.$router.push("/logsuc");
	 				}else{
	 					this.uanmePrompt = msg;
	 					this.show = true;
	 				}
 				})
	 			this.generateVerify();
 			}
 		},
 		regist(){
 			//注册按钮点击跳转到注册界面
 			this.$router.push({path:"/regist"});
 		},
 		generateVerify(){
 			/*//随机验证码的生成
 			var str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
 			var yzm = "";
 			for(var i = 0;i < 4;i ++ ){
 				var index = parseInt(Math.random()*str.length);
 				yzm += str.charAt(index);
 			}
 			this.verify = yzm;*/
 			this.$http({
				url:'captcha'
			}).then(result=>{
				var {data,code,msg} = result.data;
				if (code == 200) {
					this.verify = data;
				}else{
					this.$message({message:msg,type:'warning'});
				}
			})
 		},
 		//去后台管理界面
 		admin(){
 			this.$router.push({path:'/adminLogin'});
 		}
 	}
}
</script>

<style lang="less" scoped>
	@import url("../../less/common.less");
	#mine-login{
		width:100%;
		.logo{
			width:100%;
			.flexRowCenter();
			justify-content:center;
			img{
				width:100px;
				height:100px;
				border-radius:50%;
			}
		}
		.uname-box{
			margin:50px auto;
			p{
				width:50px;
				margin:0 5px; 
				text-align:center;
			}
			width:100%;
			.flexRowCenter();
			
			.prompt-show{
				color:@mallColor;
				display:block;
				width:150px;
			}
			.prompt-none{
				display:none;
				width:100px;
			}
			input{
				width:150px;
			}
		}
		.pwd-box{
			margin:50px 0;
			width:100%;
			.flexRowCenter();
			p{
				width:50px;
				margin:0 5px; 
				text-align:center;
			}
			.pwdprompt-show{
				color:@mallColor;
				display:block;
				width:100px;
			}	
			.pwdprompt-none{
				display:none;
				width:100px;
			}
			input{
				width:150px;
			}
		}
		.verification{
			margin:50px 0;
			.flexRowCenter();
			p{
				width:50px;
				margin:0;
				margin-right:10px;
				text-align:center;
			}
			.veri-input{
				width:150px;
				margin-right:10px;
			}
			.ver-code{
				display:inline-block;
				width:60px;
				height:30px;
				background-color:#ccc;
				text-align:center;
				line-height:30px;
				img{
					width:150px;
					height:30px;
				}
			}
			.verify-show{
				color:@mallColor;
				display:block;
				width:100px;
			}
			.verify-none{
				display:none;
				width:100px;
			}
		}
		.btn{
			.flexRowCenter();
			justify-content:space-around;
			.login{
				width:33%;
				height:40px;
				border:0;
				border-radius:.6rem;
				background-color:#FF8600
			}
			.regist{
				width:33%;
				height:40px;
				border:0;
				border-radius:.6rem;
				background-color:#FF8600
			}
			.admin{
				width:33%;
				height:40px;
				border:0;
				border-radius:.6rem;
				background-color:#FF8600
			}
		}
	}
</style>
