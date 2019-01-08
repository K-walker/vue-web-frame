var express = require('express');
var router = express.Router();
const uuidv4 = require('uuid/v4');
const mockjs = require('mockjs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '前端通用框架' });
});

router.get('/menus', function(req, res, next) {
  var data = {
		data:[
			{
				id:"0",
				name:"权限控制0",
				icon:"el-icon-star-off",
				url:"../../pages/permission/index.html"
			},
			{
				id:"2",
				name:"加解密",
				icon:"el-icon-star-off",
				url:"../../pages/encrypt/index.html"
			},
			{
				id:"9",
				name:"列表拖拽9",
				icon:"el-icon-star-off",
				url:"../../pages/list/index.html"
			},
			{
				id:"10",
				name:"表单",
				icon:"el-icon-star-off",
				children:[{
					id:"101",
					name:"自定义表单验证",
					url:"../../../pages/form/validate/index.html"
				},{
					id:"102",
					name:"表单弹框",
					url:"../../../pages/form/dialog/index.html",
				}]
			},
			{
				id:"12",
				name:"导航菜单",
				icon:"el-icon-star-off",
				url:"../../pages/menu/index.html"
			},
			{
				id:"1",
				name:"表格",
				icon:"el-icon-location",
				children:[{
					id:"3",
					name:"图表3",
					url:"../../pages/charts/index.html"
				},{
					id:"6",
					name:"表格分页6",
					url:"../../pages/table/pagination/index.html"
				},{
					id:"7",
					name:"表格编辑7",
					url:"../../pages/table/editable/index.html"
				},{
					id:"8",
					name:"表格拖拽8",
					url:"../../pages/table/draggable/index.html"
				},{
					id:"11",
					name:"动态生成多级表头",
					url:"../../pages/table/multheader/index.html"
				}]
			},
			{
				id:"4",
				name:"测试4",
				icon:"el-icon-star-off",
				children:[{
					id:'41',
					name:'二级菜单',
					children:[{
						id:'411',
						name:'三级菜单',
						url:"../../pages/test/index.html"
					}]
				}]
			}
		]
	};
	res.send(data);
});

router.get("/search" , function (req , res) {
	var data = mockjs.mock({
		"data|10":[{
			"value":"@name", 
			"address":"@city",
			"msg":'@cword(1,15)'
		}]
	})
	res.send(data);
})

router.post("/permission" , function (req , res) {
	res.send(["QUERY","DELETE","UPDATE"]);
});

router.put("/put" , function (req , res) {
	res.send(JSON.stringify(req.body));
})

router.get("/test" , function (req , res) {
	res.send("hello vue");
});

router.get("/list" , function (req , res) {
	var data = mockjs.mock({
		data:{
			"from|10":[{
				"id|+1":11,
				"uuid":function () {
					return uuidv4();
				},
				"text":"@title"
			}],
			"to|4":[{
				"id|+1":21,
				"uuid":function () {
					return uuidv4();
				},
				"text":"@title"
			}]
		}
	});
	res.send(data);
});

router.get("/pagination" , function (req , res) {
	var data = mockjs.mock({
		"data|256":[{
			"id|+1":1,
			"name":"@name",
			"age|10-30":30,
			"gender|1":[0,1],
			"address":"@province@city@county",
			"desc":"@cparagraph"
		}]
	});
	res.send(data);
})

router.get("/editable" , function (req , res) {
	var data = mockjs.mock({
		"data|10":[{
			"id|+1":1,
			"name":"@name",
			"birth":"@date",
			"desc":"@title",
			"address":"@province@city@county"
		}]
	});
	res.send(data);
}); 

module.exports = router;
