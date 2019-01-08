/**
 * http 模块
 */
define(["vue","axios"] , function (Vue , axios) {
       
    // axios.defaults.baseURL="http://192.168.9.165:8080";
    
    // 设置拦截器    
    axios.interceptors.request.use( config => {
        // 以表单的方式提交，解决跨域问题
        config.headers = {
            "Content-Type":"application/x-www-form-urlencoded",
        }
        // 转换请求参数
        config.transformRequest = [data => {
            if(data || data == "") return "";
            var param = [];
            for(key in data) {
                param.push(key+'='+data[key]);
            }
            return param.join("&");
        }]
        return config ;
    })

    /**
     * get 请求
     * @param {String} url 
     * @param {Object} params 
     */
    Vue.prototype.$get = function (url , params) {
        return new Promise( (resolve , reject) => {
            axios.get(url , params).then(response => {
                resolve(response.data);
            }).catch( err => {
                reject(err);
                handleError(err);
            })
        })
    }

    /**
     * put 请求
     * @param {*} url 
     * @param {*} params 
     */
    Vue.prototype.$put = function (url , params) {
        return new Promise( (resolve , reject) => {
            axios.put(url , params).then(response => {
                resolve(response.data);
            }).catch( err => {
                reject(err);
                handleError(err);
            })
        })
    }
    
    /**
     * post 请求
     * @param {String} url 
     * @param {Object} params 
     */
    Vue.prototype.$post = function (url , params) {
        return new Promise( (resolve , reject) => {
            axios.post(url , params).then(response => {
                resolve(response);
            }).catch( err => {
                reject(err);
                handleError(err);
            })
        })
    }

    /**
     * 并发请求
     * @param {Array} requests 
     */
    Vue.prototype.$all = function (requests) {
        return new Promise( ( resolve , reject) => {
            axios.all(requests).then(axios.spread( (acct , perms) => {
                resolve([acct , perms])
            })).catch( err => {
                reject(err);
                handleError(err);
            })
        });
    }
    
    /**
     * 创建get请求
     */
    Vue.prototype.$createGet = function (url , params) {
        return axios.get(url , params);
    }

    /**
     * 创建post请求
     */
    Vue.prototype.$createPost = function (url , params) {
        return axios.post(url , params);
    }

    /**
     * 提示错误信息
     * @param {*} err 
     */
    function handleError (err) {
        new Vue().$message({
            showClose: true,
            duration:5000,
            message: JSON.stringify(err),
            type: 'error'
        });
    }
    
    Vue.prototype.$axios = axios ;

})