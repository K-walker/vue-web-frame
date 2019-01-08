;(function (root , factory) {
    if(typeof exports === 'object') {
        module.exports = exports = factory();
    } else if(typeof define === 'function' && define.amd) {
        define([] , factory());
    } else {
        root.chHorizonalMenuItem = factory();
    }
})(this , function () {
    let chHorizonalMenuItem = {
        template:
        '<div>'+
            '<template v-for = "menu in menus">'+
                '<li v-if="menu.children && menu.children.length" '+
                    '@mouseenter="onMouseEnter($event , menu.id)"'+
                    '@mouseleave="onMouseLeave($event)"'+
                    'class="ch-horizonal-menu-item ch-horizonal-submenu">'+
                    '<div class="ch-horizonal-submenu__title">'+
                        '<span>{{menu.name}}</span>'+
                        '<i :class=\'[ floor == 1 ? "el-icon-arrow-down" : "el-icon-arrow-right", "ch-horizonal-submenu__icon-arrow"]\'></i>'+
                    '</div>'+
                    '<div class="ch-horizonal-submenu_inner" v-show="current_id == menu.id">'+
                        '<ul class="ch-horizonal-menu__inner" '+
                            ':style="{backgroundColor:backgroundColor}">'+
                            '<ch-horizonal-menu-item '+
                                ':menus="menu.children" '+
                                ':active-text-color="activeTextColor"'+
                                ':background-color="backgroundColor"'+
                                ':activeId="activeId"'+
                                ':level="floor" '+
                                '@item-click="itemClick">'+
                            '</ch-horizonal-menu-item>'+
                        '</ul>'+
                    '</div>'+
                '</li>'+
                '<li v-else '+
                    ':style="{color:activeId == menu.id ? activeTextColor :\'#fff\' }"'+
                    'class="ch-horizonal-menu-item"'+
                    '@click="itemClick(menu , $event)">{{menu.name}}</li>'+
            '</template>'+
        '</div>'
        ,
        props:{
            menus:{
                type: Array,
                default: function () {
                    return [];
                }
            },
            level:{
                type: Number,
                default:0
            },
            activeId:{
                type:[Number , String],
                default:''
            },
            activeTextColor:String,
            backgroundColor:String
        },
        data:function () {
            return {
                show:false,
                floor:this.level,
                timeId:0,
                current_id:-1,
                isActive:false
            }
        },
        created:function () {
            this.floor++;
        },
        methods:{
            onMouseEnter:function (event , id) {
                clearTimeout(this.timeId);
                this.current_id = id ;
                this.$nextTick(function () {
                    if(this.floor > 1) {
                        var innerMenu = event.target.querySelector('.ch-horizonal-menu__inner');
                        var innerMenuItem = event.target.querySelector('.ch-horizonal-menu-item');
                        innerMenu.style.left = (innerMenuItem.offsetWidth - 20 + 5) + 'px';
                        innerMenu.style.top  = (-innerMenuItem.offsetHeight) + 'px';
                    }
                })
            },
            onMouseLeave:function (event) {
                this.timeId = setTimeout(function () {
                    this.current_id = -1 ;
                }.bind(this) , 200)
            },
            itemClick:function (menu , event) {
                this.current_id = -1 ;
                this.$emit('item-click' , menu);
                if(event) this.setParentNodeActive(event.target.parentNode , 'ch-horizonal-submenu');
            },
            setParentNodeActive:function (el , cls) {
                var classList = el.className.split(' ');
                if(classList.indexOf('ch-horizonal-menu') == -1) {
                    if(classList.indexOf(cls) != -1) {
                        el.style.color = this.activeTextColor;
                        el.className = el.className.concat(' is_active');
                    }
                    this.setParentNodeActive(el.parentNode , cls);
                }
            }
        }
    }
    return {
        name:'ch-horizonal-menu-item',
        template:chHorizonalMenuItem
    }
})
