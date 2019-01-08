;(function (root, factory) {
	if (typeof exports === "object") {
        // CommonJS
		module.exports = exports = factory(require('./crypto-js.min') , require('./jsencrypt'));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["libs/crypto-js.min",'libs/jsencrypt'], factory);
	}
	else {
		// Global (browser)
		root.CrypTool = factory(CryptoJS , JSEncrypt);
	}
}(this, function (CryptoJS , JSEncrypt) {

    /**
     *  默认随机生成一个16位长度16进制的key
     *  由于前端AES采用补0算法，而java补0算法只支持16位长度key
     */
    function generatorKey (len) {
        var key = '';
        len = len || 16 ; 
        for(var i = 0 ; i < len ; i ++) {
            var num = Math.ceil(Math.random() * 15); 
            if(num > 9) num = String.fromCharCode(55 + num); 
            key += num ;
        }
        return key.toLowerCase() ;
    }
    
    return {
        // HASH 
        MD5:function (str) {
            return CryptoJS.MD5(str).toString();
        },
        SHA512:function (str) {
            return CryptoJS.SHA512(str).toString(); 
        },
        SHA256:function (str) {  
            return CryptoJS.SHA256(str).toString(); 
        },   
        // 对称加解密 AES , DES 
        // AES 采用补0的算法 参考资料: 
        AES:{
            encrypt:function (str , key) {  
               var k  = CryptoJS.enc.Latin1.parse(key);
               var iv   = CryptoJS.enc.Latin1.parse(key);
               var encrypted = CryptoJS.AES.encrypt(str,k,{
                   iv:iv,
                   mode:CryptoJS.mode.CBC,
                   padding:CryptoJS.pad.ZeroPadding
                });
                return encrypted.toString();
            },
            decrypt:function (encryptStr , key) {

                var k  = CryptoJS.enc.Latin1.parse(key);
                var iv   = CryptoJS.enc.Latin1.parse(key);

                var decrypted = CryptoJS.AES.decrypt(encryptStr,k,{
                    iv:iv,
                    mode:CryptoJS.mode.CBC,
                    padding:CryptoJS.pad.ZeroPadding
                });
                return decrypted.toString(CryptoJS.enc.Utf8);
            },
            getKey:function (len) {
                return generatorKey(len);
            }
        },
        DES:{
            encrypt:function (str , key) {
                var k  = CryptoJS.enc.Utf8.parse(key); 
                var encrypted = CryptoJS.DES.encrypt(str ,k,{
                    mode:CryptoJS.mode.ECB,
                    padding:CryptoJS.pad.Pkcs7
                });
                return encrypted.toString() ;
            },
            decrypt:function (str , key) {
                var k  = CryptoJS.enc.Utf8.parse(key); 
                var decrypted = CryptoJS.DES.decrypt(str ,k,{
                    mode:CryptoJS.mode.ECB,
                    padding:CryptoJS.pad.Pkcs7
                });
                return decrypted.toString(CryptoJS.enc.Utf8);
            },
            getKey:function (len) {
                return generatorKey(len);
            }
        },

        // 转编码
        Base64:{
            encode:function (str) {
                var words = CryptoJS.enc.Utf8.parse(str);
                return CryptoJS.enc.Base64.stringify(words).toString();
            },
            decode:function (encodeStr) {
                return CryptoJS.enc.Base64.parse(encodeStr).toString(CryptoJS.enc.Utf8);
            }
        },
        Hex:{
            encode:function (strNumber) {
                var words = CryptoJS.enc.Utf8.parse(strNumber);
                return CryptoJS.enc.Hex.stringify(words).toString();
            },
            decode:function (hexStr) {
                var words  = CryptoJS.enc.Hex.parse(hexStr);
                return CryptoJS.enc.Utf8.stringify(words);
            }
        },

        // RSA
        RSA:{
            encrypt:function (str , key) {
                var jsEncrypt = new JSEncrypt.JSEncrypt();
                jsEncrypt.setPublicKey(key);
                return jsEncrypt.encrypt(str);
            },
            decrypt:function (str , key) {
                var jsEncrypt = new JSEncrypt.JSEncrypt();
                jsEncrypt.setPrivateKey(key);
                return jsEncrypt.decrypt(str);
            },
            sign:function (str) {
                return new JSEncrypt.JSEncrypt().sign(str , CryptoJS.MD5, "md5");
            },
            verify:function (str , signature) {
                return new JSEncrypt.JSEncrypt().verify(str , signature , CryptoJS.MD5);
            },
            getKey:function (cb) {
                return new JSEncrypt.JSEncrypt().getKey(cb);
            }
        }
    }

}));