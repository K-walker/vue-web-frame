;(function (root , factory) {
    if(typeof exports === 'object') {
        module.exports = exports = factory();
    } else if(typeof define === 'function' && define.amd) {
        define([] , factory());
    } else {
        root.chVerticalMenuItem = factory();
    }
})(this , function () {
    var chVerticalMenuItem = {
        template:
        '<div class="ch-menu-wrapper">'+
            '<template v-for="menu in data">'+

                '<el-menu-item v-if="!menu.children" :index="menu.id" @click="handleMenuItem(menu)"> '+
                    '<i v-if="menu.icon" :class="menu.icon"></i>'+
                    '<span slot="title">{{menu.name}}</span>'+
                '</el-menu-item>'+
            
                '<el-submenu v-else :index="menu.id">'+
                    '<template slot="title">'+
                        '<i v-if="menu.icon" :class="menu.icon"></i>'+
                        '<span>{{menu.name}}</span>'+
                    '</template>'+
                    '<ch-vertical-menu-item :data="menu.children" @item-click="onMenuClick"></ch-vertical-menu-item>'+
                '</el-submenu>'+
            '</template>'+
        '</div> ',
        props:{
            data:{
                type:Array,
                default:function () {
                    return [] ;
                }
            }
        },
        methods:{
            handleMenuItem:function (menu) { 
                this.$emit("item-click" , menu);
            },
            onMenuClick:function (menu) {
                this.$emit("item-click" , menu);
            }
        }
    }
    return {
        name:'ch-vertical-menu-item',
        template:chVerticalMenuItem
    }
})