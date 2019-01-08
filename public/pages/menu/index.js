;(function() {
    "use strict";

    require.config({
        baseUrl:"../../js/",
        paths:{
            vue:"libs/vue",
            http:"libs/http",
            axios:"libs/axios",
            ELEMENT:"libs/elm-2.1.0",
            CHhorizonalMenu:"components/menu/ch-horizonal-menu",
            CHhorizonalMenuItem:"components/menu/ch-horizonal-menu-item",
            CHVerticalMenuItem:"components/menu/ch-vertical-menu-item",
        }
    }); 

    require(["vue" , "ELEMENT" , "http" , "CHhorizonalMenuItem" , "CHhorizonalMenu" , "CHVerticalMenuItem"] , 
    function (Vue , ELEMENT , http , CHhorizonalMenuItem , CHhorizonalMenu  , CHVerticalMenuItem) {
        ELEMENT.install(Vue);
        // 注意 CHhorizonalMenuItem 必须在 CHhorizonalMenu 前注册
        Vue.component(CHhorizonalMenuItem.name , CHhorizonalMenuItem.template); 
        Vue.component(CHhorizonalMenu.name , CHhorizonalMenu.template); 
        Vue.component(CHVerticalMenuItem.name , CHVerticalMenuItem.template); 
        
        window.vm = new Vue({
            el:"#app",
            data:{
                menus:[]
            },
            created:function () {
                this.$on("onglobalsearch" , result => {
                    this.$message("当前页面监听到全局搜索事件:"+result.value);
                });
            },
            mounted:function () {
                this.$get("/menus").then( response => {
                    this.menus = response.data ;
                }).catch( e=> {});
            },
            methods:{
                onHorizonalMenuClick:function (obj) {
                    console.log(obj.name)
                },
                onVerticalMenuClick:function (obj) {
                    console.log(obj.name)
                }
            }
        })
    });

})()