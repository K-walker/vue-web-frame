(function () {
    "use strict";
    require.config({
        baseUrl:"../../js/",
        paths:{
            vue:"libs/vue",
            http:"libs/http",
            axios:"libs/axios",
            ELEMENT:"libs/elm-2.1.0",
            CHVerticalMenuItem:"components/menu/ch-vertical-menu-item",
        }
    }); 
    
    require(["vue" , "ELEMENT" , "CHVerticalMenuItem" , "http"] , function (Vue , ELEMENT , CHVerticalMenuItem , Http ) {
        ELEMENT.install(Vue);
        Vue.component(CHVerticalMenuItem.name , CHVerticalMenuItem.template); 
        window.vm = new Vue({
            el:"#app",
            data:{
                searchWords:"",
                activeMenuId:"-1",
                isCollapse: false,
                tabs:[],
                activeTabId:"0",
                menus:[],  
                language:"zh-cn", 
                themeColor:"#2e323d" // 主题颜色
            },
            created:function () {
                var lang = localStorage.getItem('language');
                if(lang) {
                    this.language = lang ;
                }
            },
            mounted:function () {
                this.$get("/menus").then(response => { 
                    this.menus = response.data ;
                }).catch(e => {
                    console.log(e);
                })
            },
            methods:{
                onDropdownItemClick:function (command) {
                    switch (command) {
                        case 'message':
                        
                        break;
                        case 'setting':

                        break;
                        default:
                        this.language == command == 'zh-cn' ? 'en-us' : command ;
                        localStorage.setItem('language' , this.language);

                    }
                },
                handleCollapseMenu:function () {
                    this.isCollapse = !this.isCollapse;
                },
                onCHMenuClick:function (data) {
                    this.addTab(data);
                },
                clickTab:function (tab) {
                    this.activeMenuId = tab.$props.name;
                },
                removeTab:function (tabId) { 
                    let tabs = this.tabs;
                    let activeId = this.activeTabId;
                    if (activeId === tabId) {
                        tabs.forEach((tab, index) => {
                            if (tab.id === tabId) {
                                let nextTab = tabs[index + 1] || tabs[index - 1];
                                if (nextTab) {
                                    activeId = nextTab.id;
                                    this.activeMenuId = activeId ;
                                } else {
                                    activeId = "-1";
                                    this.activeMenuId = activeId ;
                                }
                            }
                        });
                    }
                    this.activeTabId = activeId;
                    this.tabs = tabs.filter(tab => tab.id !== tabId);
                },
                addTab:function (newTab) {
                    let tab = this.tabs.find( tab => tab.id === newTab.id);
                    if(tab) {
                        this.activeTabId = tab.id ;
                    } else if(newTab.id !== this.activeMenuId) {
                        newTab.url +="?"+new Date().getTime();
                        this.tabs.push(newTab);
                        this.activeTabId = newTab.id ;
                    } else {
                        this.activeTabId = newTab.id ;
                    }
                    this.activeMenuId = newTab.id ;
                },
                // 关键词搜索
                querySearch:function (queryString , cb) {
                    this.$get("/search").then( response => {
                       var results = queryString ? response.data.filter(this.createFilter(queryString)) : response.data;
                       cb(results);
                    }).catch( e => {
                        console.log(e);
                    });
                },
                // 过滤关键词
                createFilter:function (queryString) {
                    return function (item) {
                       return (item.value.toLowerCase().indexOf(queryString.toLowerCase()) != -1);
                    };
                },
                // 选择搜索后的结果
                handleSelect:function (item) {
                    this.sendGlobalEvent("onglobalsearch" , item);
                },
                sendGlobalEvent:function (eventName , params) {
                    let currentIframe = document.querySelector("iframe[name='"+this.activeMenuId+"']");
                    if(currentIframe && currentIframe.contentWindow && currentIframe.contentWindow.vm) {
                        currentIframe.contentWindow.vm.$emit(eventName , params);
                    }
                }
            }
        });
    })
})();

