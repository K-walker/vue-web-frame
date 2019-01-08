;(function() {
    "use strict";

    require.config({
        baseUrl:"../../../js/",
        paths:{
            vue:"libs/vue",
            http:"libs/http",
            axios:"libs/axios",
            ELEMENT:"libs/elm-2.1.0"
        }
    }); 

    require(["vue" , "ELEMENT" , "http"] , function (Vue , ELEMENT , http) {
        ELEMENT.install(Vue);
        window.vm = new Vue({
            el:"#app",
            data:{
                ruleForm: {
                    pass: '',
                    checkPass: '',
                    age: ''
                },
                rules: {
                    pass: [
                      { validator: function (rule,value,callback) {
                        if (value === '') {
                            callback(new Error('请输入密码'));
                        } else {
                          if (vm.ruleForm.checkPass !== '') {
                            vm.$refs.ruleForm.validateField('checkPass');
                          }
                          callback();
                        }
                      } , trigger: 'blur' , required:true}
                    ],
                    checkPass: [
                      { validator: function (rule,value,callback) {
                        if (value === '') {
                            callback(new Error('请再次输入密码'));
                        } else if (value !== vm.ruleForm.pass) {
                            callback(new Error('两次输入密码不一致!'));
                        } else {
                            callback();
                        }
                      }, trigger: 'blur', required:true}
                    ],
                    age: [
                      { validator: function (rule,value,callback) {
                        if (!value) {
                            return callback(new Error('年龄不能为空'));
                        }
                        setTimeout(() => {
                            if (!Number.isInteger(value)) {
                                callback(new Error('请输入数字值'));
                            } else {
                                if (value < 18) {
                                    callback(new Error('必须年满18岁'));
                                } else {
                                    callback();
                                }
                            }
                        }, 1000);
                      }, trigger: 'blur', required:true}
                    ]
                  }
            },
            created:function () {
                this.$on("onglobalsearch" , result => {
                    this.$message("当前页面监听到全局搜索事件:"+result.value);
                });
            },
            methods:{
                submitForm:function (formName) {
                    this.$refs[formName].validate((valid) => {
                      if (valid) {
                        this.$message({
                            type:"success",
                            message:"表单验证通过!"
                        });
                      } else {
                        this.$message({
                            type:"error",
                            message:"表单验证失败!"
                        });
                        return false;
                      }
                    });
                },
                resetForm:function (formName) {
                  this.$refs[formName].resetFields();
                }
            }
        })
    });

})()