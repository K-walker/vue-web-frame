/*!
 * Permission.js v1.0.0
 * (c) 2018 运行事业部
 * Released under the SPRING License.
 */
define(["http"] , function () {
      
    // 权限组件
    function PermissionCompFactory () {
      let PermissionComp = {
          render: function (h) {
              if(this.show) {
                  return this.$slots.default[0];
              } else {
                  return null;
              }
          }, 
          props:{ 
              action:{
                  type:String,
                  default:''
              }
          },
          data:function () {
              return {
                  show:false
              }
          },
          created:function () {
              this.$parent.$on("renderpermissioncomp" , this.load);
          },
          methods:{
              load:function () {
                  let actions = window.sessionStorage.getItem(window.location.href);
                  if(actions) {
                      this.get(JSON.parse(actions) , this.action);
                  }
              },
              get:function (actions , action) {
                  if(actions && actions.length > 0) {
                      this.show = actions.indexOf(action) != -1 ;
                  }
              }
          }
      } 
      return PermissionComp ;
  }
  
  // 权限组件实例
  function PermissionFactory () {
      let Permission = {
          data:{
              // 权限地址配置
              permissionConfig:{
                  url:"/permission",
                  params:{
                      username:"004928",
                      token:"123"
                  }
              }
          },
          components:{
              "permission":PermissionCompFactory()
          },
          mounted:function () {

              this.$post(this.permissionConfig.url , this.permissionConfig.params).then(response => {
                  if(response.status == 200) {
                      window.sessionStorage.setItem(window.location.href , JSON.stringify(response.data));
                  }
                  this.$emit("renderpermissioncomp");
              }).catch( e => {
                  console.error(e);
              })   
          }
      }
      return Permission ;
  }

  return PermissionFactory() ;
})


