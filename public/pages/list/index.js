;(function() {
    "use strict";

    require.config({
        baseUrl:"../../js/",
        paths:{
            vue:"libs/vue",
            http:"libs/http",
            axios:"libs/axios",
            vuedraggable:"libs/vuedraggable.min",
            sortablejs:"libs/sortable.min",
            underscore:"libs/underscore",
            ELEMENT:"libs/elm-2.1.0"
        }
    }); 

    require(["vue" , "ELEMENT" , "http" , "vuedraggable" , "underscore"] , 
    function (Vue , ELEMENT , http , vuedraggable , _) {
        ELEMENT.install(Vue);
        Vue.component("draggable" , vuedraggable);
        window.vm = new Vue({
            el:"#app",
            data:{
                list:{
                    from:null,
                    to:null
                },
                fromIds:null,
                toIds:null,
            },
            created:function () {
                this.$on("onglobalsearch" , result => {
                    this.$message("当前页面监听到全局搜索事件:"+result.value);
                });
            },
            mounted:function () {
                this.$get("/list").then( response => {
                    this.list.from = response.data.from;
                    this.list.to = response.data.to;
                }).catch( e => {}); 
            },
            methods:{
                onFromDragEnd:function (evt) {
                    // 测试:查看打印拖拽后的数据是否正常 
                    this.fromIds = _.pluck(this.list.from , "id");
                    this.toIds = _.pluck(this.list.to , "id");
                }, 
                onToDragEnd:function (evt) {
                    // 测试:查看打印拖拽后的数据是否正常
                    this.fromIds = _.pluck(this.list.from , "id");
                    this.toIds = _.pluck(this.list.to , "id");
                }
            }
        })
    });

})()