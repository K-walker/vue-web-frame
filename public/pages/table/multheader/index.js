;(function() {
    "use strict";

    require.config({
        baseUrl:"../../../js/",
        paths:{
            vue:"libs/vue",
            ELEMENT:"libs/elm-2.1.0"
        }
    }); 

    require(["vue" , "ELEMENT"] , function (Vue , ELEMENT) {
        ELEMENT.install(Vue);
        window.vm = new Vue({
            el:"#app",
            data: {
				tbData:[
					{
						id:1,
						name:'AAAA',
						tel:'12345678910',
						score:{
							// 理科
							science:[
								{id:11,subject:'数学',score:89,ranking:1},
								{id:12,subject:'物理',score:87,ranking:3},
								{id:13,subject:'化学',score:85,ranking:5}
							],
							// 文科
							arts:[
								{id:14,subject:'政治',score:83,ranking:7},
								{id:15,subject:'历史',score:81,ranking:9},
								{id:16,subject:'地理',score:79,ranking:11}
							]
						}
					},
					{
						id:2,
						name:'BBBB',
						tel:'12345678910',
						score:{
							// 理科
							science:[
								{id:11,subject:'数学',score:89,ranking:1},
								{id:12,subject:'物理',score:87,ranking:3},
								{id:13,subject:'化学',score:85,ranking:5}
							],
							// 文科
							arts:[
								{id:14,subject:'政治',score:83,ranking:7},
								{id:15,subject:'历史',score:81,ranking:9},
								{id:16,subject:'地理',score:79,ranking:11}
							]
						}
					}
				],
				tbHeader:[
					{id:3,title:'理科', prop:'science', children:[
						{id:31,title:'数学'},
						{id:32,title:'物理'},
						{id:33,title:'化学'}
					]},
					{id:4,title:'文科', prop:'arts', children:[
						{id:41,title:'政治'},
						{id:42,title:'历史'},
						{id:43,title:'地理'}
					]}
				]
			}
            
        })
    });

})()