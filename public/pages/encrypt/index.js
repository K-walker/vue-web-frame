;(function() {
    "use strict";
    
    require.config({
        baseUrl:"../../js/",
        paths:{
            vue:"libs/vue",
            ELEMENT:"libs/elm-2.1.0",
            crypto:"libs/cryptool",
        }
    }); 

    require(["vue" , "ELEMENT" , "crypto"] , function (Vue , ELEMENT , Crypto) {
        ELEMENT.install(Vue);
        window.vm = new Vue({
            el:"#app",
            data:{
                message:"测试源代码abcd",
                aeskey:"",
                rsakey:{
                    publicKey:'',
                    privateKey:''
                },
                encryptStr:"",
                decryptStr:"", 
            },
            created:function () {
                this.aeskey = Crypto.AES.getKey();
                var RSAKEY = Crypto.RSA.getKey();
                this.rsakey.publicKey = RSAKEY.getPublicBaseKeyB64();
                this.rsakey.privateKey = RSAKEY.getPrivateBaseKeyB64();
                this.$on("onglobalsearch" , result => {
                    this.$message("当前页面监听到全局搜索事件:"+result.value);
                });
            },
            methods:{
                // HASH 算法
                handleMD5:function () { 
                    this.encryptStr = Crypto.MD5(this.message);
                },

                handleSHA512:function () {
                    this.encryptStr = Crypto.SHA512(this.message);
                },
                handleSHA256:function () {
                    this.encryptStr = Crypto.SHA256(this.message)
                },

                // 对称加密 AES
                handleAESEncrypt:function () {
                    this.decryptStr = ''; 
                    this.encryptStr = Crypto.AES.encrypt(this.message , this.aeskey);
                },
                handleAESDecrypt:function () {
                    this.decryptStr = Crypto.AES.decrypt(this.encryptStr , this.aeskey);
                },

                // DES
                handleDESEncrypt:function () {
                    this.decryptStr = ''; 
                    this.encryptStr = Crypto.DES.encrypt(this.message , this.aeskey);
                },
                handleDESDecrypt:function () {
                    this.decryptStr = Crypto.DES.decrypt(this.encryptStr, this.aeskey);
                },
                
                // RSA
                handleRSAEncrypt:function () {
                    this.decryptStr = '' ;
                    this.encryptStr = Crypto.RSA.encrypt(this.message ,  this.rsakey.publicKey);
                },
                handleRSADecrypt:function () {
                    this.decryptStr = Crypto.RSA.decrypt(this.encryptStr , this.rsakey.privateKey);
                },

                // 转码
                handleStrToBase64:function () {
                    this.decryptStr = ''; 
                    this.encryptStr = Crypto.Base64.encode(this.message);
                },
                handleBase64ToStr:function () {
                    this.decryptStr = Crypto.Base64.decode(this.encryptStr);
                },

                handleStrToHex:function () {
                    this.decryptStr = ''; 
                    this.encryptStr = Crypto.Hex.encode(this.message);
                },
                handleHexToStr:function () {
                    this.decryptStr = Crypto.Hex.decode(this.encryptStr);
                }
            }
        })
    });

})()