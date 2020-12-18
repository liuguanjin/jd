import Vue from 'vue';
import VueRouter from "vue-router";
Vue.use(VueRouter);
//引入各模块
//前台首页界面
import Home from "@/components/home/home.vue";
//前台分类界面
import Classify from "@/components/classify/classify.vue";
//前台购物车界面
import Cart from "@/components/cart/cart.vue";
//前台结算界面
import Balance from '@/components/cart/cart-content/balance.vue';
//前台我的界面
import Mine from "@/components/mine/mine.vue";
//前台商品详情界面
import Detail from "@/components/home/detail/detail.vue";
//前台店铺详情界面
import ShopDetail from "@/components/shop/shop_detail.vue";
//前台注册界面
import Regist from "@/components/mine/public/regist.vue";
//前台注册成功界面
import Registsuccess from "@/components/mine/public/registSuccess.vue";
//前台登录成功界面
import LoginSuccess from "@/components/mine/public/loginSuccess.vue";
//前台分类详情界面
import classifyDetail from "@/components/classify/classify-detail.vue";
//前台登录成功进入设置界面
import Setting from "@/components/mine/public/setting.vue";
//前台首页分类进入各分类界面
import Supermarket from "@/components/home/supermarket/supermarket.vue";
import Digit from "@/components/home/digit/digit.vue";
import Clothes from "@/components/home/clothes/clothes.vue";
import Fresh from "@/components/home/fresh/fresh.vue";
import Daojia from "@/components/home/daojia/daojia.vue";
import Recharge from "@/components/home/recharge/recharge.vue";
import Jingxi from "@/components/home/jingxi/jingxi.vue";
import Lingquan from "@/components/home/lingquan/lingquan.vue";
import Zhuangqian from "@/components/home/zhuangqian/zhuangqian.vue";
import Vip from "@/components/home/vip/vip.vue";
import Collect from "@/components/mine/public/collect.vue";
import Foot from "@/components/mine/public/foot.vue";
//后台登录界面
import AdminLogin from '@/components/admin/adminLogin.vue';
//后台界面
import Admin from '@/components/admin/admin.vue';
//后台首页界面
import AdminIndex from '@/components/admin/index.vue';
//后台首页内容界面
import IndexContent from '@/components/admin/index/index.vue';
//后台平台界面
import Platform from '@/components/admin/platform.vue';
//后台平台配置管理界面
import SettingManager from '@/components/admin/platform/setting_manager.vue';
//后台平台网站管理界面
import WebsiteManager from '@/components/admin/platform/website_manager.vue';
//后台平台附件设置界面
import FujianManager from '@/components/admin/platform/fujian_manager.vue';
//后台平台权限设置界面
import Menumanager from '@/components/admin/platform/menu_manager.vue';
//后台平台管理员管理界面
import AdminManager from '@/components/admin/platform/admin_manager.vue';
//后台平台角色管理界面
import RoleManager from '@/components/admin/platform/role_manager.vue';
//后台平台管理日志界面
import ManagerLog from '@/components/admin/platform/manager_log.vue';
//后台商城界面
import Shop from '@/components/admin/shop.vue';
//后台商城订单管理界面
import Ordermanager from '@/components/admin/shop/order_manager.vue';
//后台商城投诉订单界面
import Ordercomplaint from '@/components/admin/shop/order_complaint.vue';
//后台商城退款订单界面
import Orderrefund from '@/components/admin/shop/order_refund.vue';
//后台商城商品分类界面
import Shopcategory from '@/components/admin/shop/shop_category.vue';
//后台商城商品品牌界面
import Shopbrand from '@/components/admin/shop/shop_brand.vue';
//后台商城商品模型界面
import Shoptype from '@/components/admin/shop/shop_type.vue';
//后台商城商品列表界面
import Shoplist from '@/components/admin/shop/shop_list.vue';
//后台商城回收站界面
import Shoprecycle from '@/components/admin/shop/shop_recycle.vue';
//后台商城商品属性界面
import Shopattribute from '@/components/admin/shop/shop_attribute.vue';
//后台商城商品规格界面
import Shopspec from '@/components/admin/shop/shop_spec.vue';
//后台商城评价管理界面
import Shopevaluate from '@/components/admin/shop/shop_evaluate.vue';
//后台商城商品咨询界面
import Shopserver from '@/components/admin/shop/shop_server.vue';
//后台商城会员等级界面
import Vipgrade from '@/components/admin/shop/vip_grade.vue';
//后台商城会员管理界面
import Vipmanager from '@/components/admin/shop/vip_manager.vue';
//后台商城广告管理界面
import Advertisementmanager from '@/components/admin/shop/advertisement_manager.vue';
//后台商城银行管理界面
import Bankmanager from '@/components/admin/shop/bank_manager.vue';
//后台商城支付管理界面
import Crowdfundingmanager from '@/components/admin/shop/crowdfunding_manager.vue';
//后台商城众筹管理界面
import Paymanager from '@/components/admin/shop/pay_manager.vue';
//后台商城店铺管理界面
import StoreList from '@/components/admin/shop/store_list.vue';
//后台管理界面
import Operator from '@/components/admin/operator.vue';
//个人中心收货地址界面
import Address from '@/components/mine/public/address.vue';
//个人中心添加收货地址界面
import AddAddress from '@/components/mine/public/addAddress.vue';
//个人中心编辑收货地址界面
import EditAddress from '@/components/mine/public/editAddress.vue';
//前台提交订单成功界面
import OrderSuccess from '@/components/cart/cart-content/orderSuccess.vue';
//前台个人中心关注店铺界面
import FollowShop from '@/components/mine/public/followShop.vue';
//前台个人中心待付款界面
import Nopay from '@/components/mine/public/nopay.vue';
//前台个人中心待发货界面
import Nosend from '@/components/mine/public/nosend.vue';
//前台个人中心待收货界面
import Noaccept from '@/components/mine/public/noaccept.vue';
//前台个人中心待评价界面
import Noevaluate from '@/components/mine/public/noevaluate.vue';
//前台个人中心退款界面
import Refund from '@/components/mine/public/refund.vue';
//配置routes
var routes = [
	{path:"/",redirect:"/home"},
	{path:"/home",component:Home,meta:{title:"商城首页",keepAlive:true}},
	{path:"/classify",component:Classify,meta:{title:"商城分类",keepAlive:true}},
	{path:"/cart",component:Cart,meta:{title:"购物车",keepAlive:false}},
	{path:"/balance",component:Balance,name:'balance',meta:{title:"结算",keepAlive:false}},
	{path:"/mine",component:Mine,meta:{title:"个人中心",keepAlive:false}},
	{path:"/detail",component:Detail,name:"detail",meta:{title:"商品详情",keepAlive:false}},
	{path:"/shopdetail",component:ShopDetail,name:"shopDetail",meta:{title:"店铺详情",keepAlive:false}},
	{path:"/regist",component:Regist,meta:{title:"注册",keepAlive:false}},
	{path:"/regses",component:Registsuccess,meta:{title:"注册成功",keepAlive:false}},
	{path:"/logsuc",component:LoginSuccess,name:"logsuc",meta:{title:"个人中心",keepAlive:false}},
	{path:"/supermarket",component:Supermarket,meta:{title:"京东超市",keepAlive:true}},
	{path:"/digit",component:Digit,meta:{title:"数码电器",keepAlive:true}},
	{path:"/clothes",component:Clothes,meta:{title:"京东服饰",keepAlive:true}},
	{path:"/fresh",component:Fresh,meta:{title:"京东生鲜",keepAlive:true}},
	{path:"/daojia",component:Daojia,meta:{title:"京东到家",keepAlive:true}},
	{path:"/recharge",component:Recharge,meta:{title:"充值缴费",keepAlive:true}},
	{path:"/jingxi",component:Jingxi,meta:{title:"京喜",keepAlive:true}},
	{path:"/lingquan",component:Lingquan,meta:{title:"领券",keepAlive:true}},
	{path:"/zhuangqian",component:Zhuangqian,meta:{title:"赚钱",keepAlive:true}},
	{path:"/vip",component:Vip,meta:{title:"PLUS会员",keepAlive:true}},
	{path:"/setting",component:Setting,name:"setting",meta:{title:"设置",keepAlive:false}},
	{path:"/address",component:Address,name:"address",meta:{title:"我的收货地址",keepAlive:false}},
	{path:"/addaddress",component:AddAddress,name:"addAddress",meta:{title:"添加收货地址",keepAlive:false}},
	{path:"/editaddress",component:EditAddress,name:"editAddress",meta:{title:"编辑收货地址",keepAlive:false}},
	{path:"/followShop",component:FollowShop,name:"followShop",meta:{title:"关注店铺",keepAlive:false}},
	{path:"/nopay",component:Nopay,name:"nopay",meta:{title:"待付款",keepAlive:false}},
	{path:"/nosend",component:Nosend,name:"nosend",meta:{title:"待发货",keepAlive:false}},
	{path:"/noaccept",component:Noaccept,name:"noaccept",meta:{title:"待收货",keepAlive:false}},
	{path:"/noevaluate",component:Noevaluate,name:"noevaluate",meta:{title:"待评价",keepAlive:false}},
	{path:"/refund",component:Refund,name:"refund",meta:{title:"退款/售后",keepAlive:false}},
	{path:"/ordersuccess",component:OrderSuccess,name:"ordersuccess",meta:{title:"订单提交成功",keepAlive:true}},
	{path:"/collect",component:Collect,meta:{title:"收藏夹",keepAlive:false}},
	{path:"/adminLogin",component:AdminLogin,meta:{title:"登录后台",keepAlive:false}},
	{path:"/admin",component:Admin,meta:{title:"后台管理",keepAlive:false},
		children:[
			{path:'/adminindex',component:AdminIndex,meta:{title:"后台首页",keepAlive:false},
				children:[
					{path:'/indexcontent',component:IndexContent,meta:{title:"后台首页内容",keepAlive:false}}
				]
			},
			{path:'/platform',component:Platform,meta:{title:"后台平台",keepAlive:false},
				children:[
					{path:'/settingmanager',component:SettingManager,meta:{title:"后台平台配置管理",keepAlive:false}},
					{path:'/websitemanager',component:WebsiteManager,meta:{title:"后台平台网站设置",keepAlive:false}},
					{path:'/fujianmanager',component:FujianManager,meta:{title:"后台平台附件设置",keepAlive:false}},
					{path:'/menumanager',component:Menumanager,meta:{title:"后台平台菜单管理",keepAlive:false}},
					{path:'/adminmanager',component:AdminManager,meta:{title:"后台平台管理员管理",keepAlive:false}},
					{path:'/rolemanager',component:RoleManager,meta:{title:"后台平台角色管理",keepAlive:false}},
					{path:'/managerlog',component:ManagerLog,meta:{title:"后台平台管理日志",keepAlive:false}}
				]
			},
			{path:'/shop',component:Shop,meta:{title:"后台商城",keepAlive:false},
				children:[
					{path:'/ordermanager',component:Ordermanager,meta:{title:"后台商城订单管理界面",keepAlive:false}},
					{path:'/ordercomplaint',component:Ordercomplaint,meta:{title:"后台商城投诉订单界面",keepAlive:false}},
					{path:'/orderrefund',component:Orderrefund,meta:{title:"后台商城退款订单界面",keepAlive:false}},
					{path:'/shopcategory',component:Shopcategory,meta:{title:"后台商城商品分类界面",keepAlive:false}},
					{path:'/shopbrand',component:Shopbrand,meta:{title:"后台商城商品品牌界面",keepAlive:false}},
					{path:'/shoptype',component:Shoptype,meta:{title:"后台商城商品模型界面",keepAlive:false}},
					{path:'/shoplist',component:Shoplist,meta:{title:"后台商城商品列表界面",keepAlive:false}},
					{path:'/shoprecycle',component:Shoprecycle,meta:{title:"后台商城回收站界面",keepAlive:false}},
					{path:'/shopattribute',component:Shopattribute,meta:{title:"后台商城商品属性界面",keepAlive:false}},
					{path:'/shopspec',component:Shopspec,meta:{title:"后台商城商品规格界面",keepAlive:false}},
					{path:'/shopevaluate',component:Shopevaluate,meta:{title:"后台商城评价管理界面",keepAlive:false}},
					{path:'/shopserver',component:Shopserver,meta:{title:"后台商城商品咨询界面",keepAlive:false}},
					{path:'/vipgrade',component:Vipgrade,meta:{title:"后台商城会员等级界面",keepAlive:false}},
					{path:'/vipmanager',component:Vipmanager,meta:{title:"后台商城会员管理界面",keepAlive:false}},
					{path:'/advertisementmanager',component:Advertisementmanager,meta:{title:"后台商城广告管理界面",keepAlive:false}},
					{path:'/bankmanager',component:Bankmanager,meta:{title:"后台商城银行管理界面",keepAlive:false}},
					{path:'/crowdfundingmanager',component:Crowdfundingmanager,meta:{title:"后台商城支付管理界面",keepAlive:false}},
					{path:'/paymanager',component:Paymanager,meta:{title:"后台商城众筹管理界面",keepAlive:false}},
					{path:'/storelist',component:StoreList,meta:{title:"后台商城店铺管理界面",keepAlive:false}},
				]
			},
			{path:'/operator',component:Operator,meta:{title:"后台运营",keepAlive:false}}
		]
	},
	{path:"/foot",component:Foot,meta:{title:"足迹",keepAlive:false}},
	{path:"/classify-detail",name:'classify-detail',component:classifyDetail,meta:{title:"分类详情",keepAlive:false}},
];
// router对象实例化
var router = new VueRouter({
	routes:routes,
	linkActiveClass:"active"
});
// 对title的修改及mine页面的判断
router.beforeEach((to,from,next)=>{
	document.title = to.meta.title;
	next();
	if (to.path == "/mine") {
		var userinfo = localStorage.getItem('userinfo');
		if (userinfo != null) {
			next("/logsuc");
		}else{
			next();
		}
	}
});
export default router;

