;(function() {
    "use strict";

    require.config({
        baseUrl:"../../../js/",
        paths:{
            vue:"libs/vue",
            http:"libs/http",
            axios:"libs/axios",
            ELEMENT:"libs/elm-2.1.0",
            underscore:"libs/underscore",
        }
    }); 

    require(["vue" , "ELEMENT" , "http" , "underscore"] , function (Vue , ELEMENT , Http , _) {
        ELEMENT.install(Vue);
        window.vm = new Vue({
            el:"#app",
            data:{
                rawData:[],
                rawFilterData:[],
                tableData:[],
                currentPage:1,
                pageSizes:[15, 30 , 50, 80],
                pageSize:15,
                searchName:"",
                searchGender:"",
                selections:[]
            },
            created:function () {
                this.$on("onglobalsearch" , result => {
                    this.$message("当前页面监听到全局搜索事件:"+result.value);
                });
            },
            mounted:function () {
                this.$get("/pagination").then( response => {
                    this.rawData = response.data;
                    this.rawFilterData = response.data;
                    this.getCurrentPageData();
                }).catch( e => {
                    console.log(e);
                })
            },
            methods:{
                handleSelectionChange:function (selection) {
                    this.selections = selection ;
                },
                // 取消选择
                handleClearSelection:function () {
                    this.$refs.tb.clearSelection();
                    this.selections = [];
                },
                // 查询
                handleLocalSearch:function () {
                    this.rawData = (this.searchName == "" &&  this.searchGender == "") ? this.rawFilterData 
                    : this.rawFilterData.filter(this.createFilter(this.searchName , this.searchGender));
                    this.getCurrentPageData();
                },
                handleDel:function () {
                    this.showConfirmDialog( () => {
                        let ids = _.pluck(this.selections , "id");
                        let result = this.rawData.filter( item => {
                            return ids.indexOf(item.id) == -1 ;
                        });
                        this.rawData = result ;
                        this.rawFilterData = result ;
                        this.handleClearSelection();
                        this.getCurrentPageData();
                    })
                },
                handleSizeChange:function (val) {
                    this.pageSize = val ;
                    this.getCurrentPageData();
                },
                handleCurrentChange:function (val) {
                    this.currentPage = val ;
                    this.getCurrentPageData();
                },
                // 获取当前页的数据
                getCurrentPageData:function () {
                    let start = (this.currentPage - 1) * this.pageSize ;
                    let end = start + this.pageSize ;
                    this.tableData = this.rawData.slice( start , end);
                },
                // 设置选中行
                setSelectionRow:function () {
                    setTimeout( () => {
                        this.selectedRows.forEach( row => {
                            this.$refs.tb.toggleRowSelection(row , true);
                        });
                    },100);
                },
                createFilter:function (name , gender) {
                    return (item) => {
                        if(name && gender != "") {
                            return item.name.toLowerCase().indexOf(name.toLowerCase()) != -1 && item.gender == gender ;
                        } else if(name) {
                           return item.name.toLowerCase().indexOf(name.toLowerCase()) != -1;
                        } else if(gender != "") {
                            return item.gender == gender ;
                        }
                    }
                },
                showConfirmDialog:function (cb) {
                    // 如果需要使弹框的遮罩覆盖全屏，则需要通过 parent.top.vm 来调用
                    parent.top.vm.$confirm('是否删除选中的数据?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                      }).then(() => {
                        cb.call(this);
                      }).catch(() => {});   
                }
            }
        })
    });
})()