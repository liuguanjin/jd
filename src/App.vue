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
    this.getData();
    window.addEventListener('beforeunload',e=>this.beforeLoad(e));
  },
  methods:{
    ...mapActions({
      replaceCartArr:"replaceCartArr",
      replaceCollectArr:"replaceCollectArr",
      replaceCollectNum:"replaceCollectNum",
      replaceFootprintArr:"replaceFootprintArr",
      replaceFootprinttNum:"replaceFootprinttNum",
    }),
    beforeLoad(e){
      var userinfo = localStorage.getItem('userinfo');
      if (userinfo != '' && userinfo != undefined) {
        userinfo = JSON.parse(userinfo)
        var user_id = userinfo.user_id;
        this.$homehttp({
          url:'cart/'+user_id,
          method:'put',
          data:this.cartArr
        }).then(result=>{

        })
        this.$homehttp({
          url:'collect/'+user_id,
          method:'put',
          data:this.collectArr
        }).then(result=>{

        }) 
        this.$homehttp({
          url:'footprint/'+user_id,
          method:'put',
          data:this.footprintArr
        }).then(result=>{

        })
      }else{
        localStorage.setItem("cartArr",JSON.stringify(that.cartArr));
      }
    },
    getData(){
      var userinfo = localStorage.getItem('userinfo');
      if (userinfo != '' && userinfo != undefined) {
        userinfo = JSON.parse(userinfo)
        var user_id = userinfo.user_id;
        this.$homehttp({
          url:'cart/'+user_id
        }).then(result=>{
          const {code,msg,data} = result.data;
          if (code == 200) {
            this.replaceCartArr(data);
          }else{
            this.$message({message:'服务器异常',type:'warning'});
          }
        })
        this.$homehttp({
          url:'collect/'+user_id
        }).then(result=>{
          const {code,msg,data} = result.data;
          if (code == 200) {
            this.replaceCollectArr(data);
            this.replaceCollectNum(data.length);
          }else{
            this.$message({message:'服务器异常',type:'warning'});
          }
        })
        this.$homehttp({
          url:'footprint/'+user_id
        }).then(result=>{
          const {code,msg,data} = result.data;
          if (code == 200) {
            this.replaceFootprintArr(data);
            var num = 0;
            for(var i = 0;i < data.length;i ++ ){
              for(var j = 0;j < data[i].detail.length; j ++){
              }
              num = (i+1)*j;
            }
            this.replaceFootprinttNum(num);
          }else{
            this.$message({message:'服务器异常',type:'warning'});
          }
        })
      }else{
        if (localStorage.getItem('cartArr') != '' && localStorage.getItem('cartArr') != undefined) {
          this.replaceCartArr(localStorage.getItem('cartArr'));
        }
      }
    },
  },
  computed:{
    ...mapState({
      cartArr:state => state.cart.cartArr,
      collectArr:state => state.collect.collectArr,
      footprintArr:state => state.footprint.foorprintArr
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
