;(function() {
    "use strict";

    require.config({
        baseUrl:"../../../js/",
        paths:{
            vue:"libs/vue",
            http:"libs/http",
            axios:"libs/axios",
            ELEMENT:"libs/elm-2.1.0",
        }
    }); 
    
    require(["vue" , "ELEMENT" , "http"] , function (Vue , ELEMENT , http) {
        ELEMENT.install(Vue);
        window.vm = new Vue({
            el:"#app",
            data:{
                dialogVisible:false,
                form:{
                    name:'aaa',
                    gender:1,
                    birth:null,
                    speciality:[1,2],
                    marry:1,
                    desc:'I am is good boy'
                }
            },
            created:function () {
                this.$on("onglobalsearch" , result => {
                    this.$message("当前页面监听到全局搜索事件:"+result.value);
                });
            },
            methods:{
                initForm:function () {
                    this.form.name = 'aaa' ;
                    this.form.gender = 1 ;
                    this.form.birth = null ;
                    this.form.speciality = [1,2] ;
                    this.form.marry = 1 ;
                    this.form.desc = 'I am is good boy' ;
                },
                onAdd:function () {
                    console.log(this.form)
                },
                onCancel:function () {
                    this.reset();
                    this.dialogVisible = false ;
                },
                handleClose:function (done) {
                    this.reset();
                    done();
                },
                reset:function () {
                   this.form.name = '' ;
                   this.form.gender = null ;
                   this.form.speciality = [] ;
                   this.form.marry = null ;
                   this.form.desc = '' ;
                }
            }
        })
    });

})()