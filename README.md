# layer
---
原生js弹出层组件
---
## 兼容性
ie9,ie9+,chrome,firefox,safari
## 使用

```js
layer.popup({
	title: '弹窗',
	content: '<p>确定删除？</p>',
	btns: [
		{
			text: '确定',
			style: 'background:#1E9FFF;color:#fff;',
			callback: function(id){
				//id: 弹窗id
				console.log(id);
			}
		},
		{
			text: '取消'
		}
	]
});

layer.close(id); //删除单个弹窗

layer.closeAll(); //删除所有弹窗
```
## 参数

| Parameter       | Description      | Type           | Default      |
|-----------------|------------------|----------------|--------------|
| title   		  | 标题         	     | String         | '提示'       |
| content   	  | 内容                         | html String    | none         |
| btns  		  | 按钮列表                  | Array          | none         |



