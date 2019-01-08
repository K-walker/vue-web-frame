;(function() {
    "use strict";

    require.config({
        baseUrl:"../../../js/",
        paths:{
            vue:"libs/vue",
            http:"libs/http",
            axios:"libs/axios",
            underscore:"libs/underscore",
            sortable:"libs/sortable.min",
            ELEMENT:"libs/elm-2.1.0"
        }
    }); 

    require(["vue" , "ELEMENT" , "http" , "sortable" , "underscore"] , function (Vue , ELEMENT , http , Sortable , _) {
        ELEMENT.install(Vue);
        window.vm = new Vue({
            el:"#app",
            data:{
                tableData:null,
                sortable:null,
                loading:true
            },
            created:function () {
                this.$on("onglobalsearch" , result => {
                    this.$message("当前页面监听到全局搜索事件:"+result.value);
                });
            },
            mounted:function () {
                this.$get("/editable").then( response => {
                    setTimeout(() => {
                        this.loading = false ;
                        this.tableData = response.data;
                        this.$nextTick( () => {
                            this.setDraggable();
                        })
                    }, 2000);
                }).catch( e => {
                    this.loading = false ;
                });
            },
            methods:{
                setDraggable:function () {
                    const el = document.querySelector('#app .el-table .el-table__body-wrapper > table > tbody');
                    this.sortable = Sortable.create(el , {
                        ghostClass:"ghost-class",
                        fallbackClass:"fallback-class",
                        setData: (dataTransfer) => {
                            dataTransfer.setData('Text', '');
                        },
                        // 拖拽结束后的回调
                        onEnd: (evt) => {
                            // 更改表格数据顺序
                            const targetRow = this.tableData.splice(evt.oldIndex , 1)[0];
                            this.tableData.splice(evt.newIndex, 0, targetRow);
                            // 测试:打印拖拽后的数据顺序
                            console.log(_.pluck(this.tableData , "id"));
                        }
                    });
                }
            }
        })
    });
})()