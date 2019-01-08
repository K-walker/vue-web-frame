;(function () {
    "use strict";
    require.config({
        baseUrl:"../../js/",
        paths:{
            vue:"libs/vue",
            http:"libs/http",
            axios:"libs/axios",
            ELEMENT:"libs/elm-2.1.0",
            permission:"components/permission",
        }
    }); 

    require(["vue" , "ELEMENT" , "permission"] , function (Vue , ELEMENT , Permission) {
        ELEMENT.install(Vue);
        window.vm = new Vue({
            el:"#app",
            data:{
                message:"Permission"
            },
            extends:Permission,
            created:function () {
                this.$on("onglobalsearch" , (result) => {
                    this.$message("当前页面监听到全局搜索事件1:"+result.value);
                });
            },
            methods:{
                handlePut:function () {
                    this.$put("/put" ,{dicId:"1001"}).then( response => {
                        this.$message({
                            type:"success",
                            duration:1000,
                            message:response
                        });
                    }).catch( e => {
                        console.log(e);
                    });
                },
                handleGet:function () {
                    this.$get("/test").then(response => {
                        this.$message({
                            type:"success",
                            message:response
                        });
                    }).catch( err => {
                        console.log(err);
                    });
                },
                handlePost:function () {
                    this.$post("/permission" , {username:"spring",token:"123"}).then(response => {
                        this.$message({
                            type:"success",
                            message:JSON.stringify(response.data)
                        });
                    }).catch( err => {
                        console.log(err);
                    });  
                },
                handleAll:function () {
                    this.$all([
                        this.$createGet("/test"),
                        this.$createPost("/permission"),
                    ]).then(responses => {
                        this.$message({
                            type:"success",
                            message:"GET: /test ; POST: /permission ; RESULT: "+responses[0].data + "\n" +  JSON.stringify(responses[1].data)
                        });
                    }).catch( err => {
                        console.log(err);
                    })
                }
            }
        })
    });
})();