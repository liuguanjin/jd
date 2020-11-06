<template>
  <div id="app">
    <!-- 返回之后界面停留在返回之前的位置 keepalive -->
  	<keep-alive >
    	<router-view v-if="$route.meta.keepAlive"></router-view>
  	</keep-alive>
	<router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- 底部标签栏 -->
    <tabbar></tabbar>
  </div>
</template>

<script>
// 引入tabbar
import tabbar from "./components/tabbar.vue";
import axios from "axios";
import qs from "qs";
//使用vuex保存登录状态
import {mapActions,mapState} from "vuex";
export default {
  components:{
    "tabbar":tabbar
  },
  created(){
    // console.log(typeof(localStorage.getItem("uname")));
    var emptyCartArr = [];
    // 判断localstorage里是否有用户信息
    var that = this ;
    window.addEventListener("beforeunload",()=>{
      localStorage.setItem("cartArr",JSON.stringify(that.cartArr));
    })
  },
  methods:{
    ...mapActions({
      replaceCartArr:"replaceCartArr",
      replaceCollectArr:"replaceCollectArr",
      replaceCollectNum:"replaceCollectNum",
      replaceFootprintArr:"replaceFootprintArr"
    })
  },
  computed:{
    ...mapState({
      uname:state => state.cart.uname,
      cartArr:state => state.cart.cartArr,
      collectArr:state => state.collect.collectArr,
      footprintArr:state => state.footprint.footprintArr
    })
  }
}
</script>

<style lang="less" scoped>
	@import url("./components/less/reset.less");
  #app{
    max-width:800px;
    margin:0 auto;
  }
</style>
