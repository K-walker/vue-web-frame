;(function (root , factory) {
    if(typeof exports === 'object') {
        module.exports = exports = factory();
    } else if(typeof define === 'function' && define.amd) {
        define([] , factory());
    } else {
        root.chHorizonalMenu = factory();
    }
})(this , function () {
    let chHorizonalMenu = {
        template:
        '<ul class="ch-horizonal-menu" :style="{backgroundColor:backgroundColor}">'+
            '<ch-horizonal-menu-item '+
                ':menus="data" '+
                ':active-text-color="activeTextColor"'+
                ':background-color="backgroundColor"'+
                ':activeId="activeId"'+
                '@item-click="itemClick">'+
            '</ch-horizonal-menu-item>'+
        '</ul>'
        ,
        props:{
            data:{
                type:Array , 
                default:function () {
                    return []
                }
            },
            backgroundColor:{
                type:String,
                default:'rgb(46, 50, 61)'
            },
            activeTextColor:{
                type:String,
                default:'rgb(255, 208, 75)'
            }
        },
        data:function () {
            return {
                activeId:null,
                submenuIds:[]
            }
        },
        methods:{
            itemClick:function (params) {
                this.activeId = params.id;
                this.removeActive();
                this.$emit('item-click' , params);
            },
            removeActive:function () {
                var _this = this ;
                var activeNodes = this.$el.getElementsByClassName('is_active');
                [].slice.call(activeNodes).forEach(function (el) {
                    el.className = el.className.replace(/ is_active/ , '');
                    el.style.color = '#fff';
                })
            }
        }
    }
    return {
        name:'ch-horizonal-menu',
        template:chHorizonalMenu
    }
})
