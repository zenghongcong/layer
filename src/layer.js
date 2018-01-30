;(function(win){
	'use strict';
	
	//生成元素并设置属性
	function createElem(ele, option){
		var elem = document.createElement(ele);
		for(var k in option){
			elem.setAttribute(k, option[k]);
		}
		return elem;
	}
	
	//添加class
	function addClass(el, className){
		if (el.classList){
			el.classList.add(className);
		}else{
			el.className += ' ' + className;
		}
	}
	
	function close(id){
		return function(){
			addClass(layer.layers[id].elem, 'layer-close');
			setTimeout(function(){
				document.body.removeChild(layer.layers[id].elem);
				delete layer.layers[id];
			}, 200);
		}
	}
	
	function Layer(){
		if(!(this instanceof Layer)){
			return new Layer();
		}
		this.layers = {};
	}
	
	Layer.prototype = {
		constructor: Layer,
		popup: function(option){
			var id = Date.now(),
				layer = createElem('div', {class: 'ui-layer', style: 'z-index: '+ id +';'}),
				layerBtn = null,
				btn = null,
				html =
				'<div class="layer-head ui-clear">'+
					'<p>'+ option.title || '提示' +'</p>'+
					'<a class="close" href="javascript:;">'+
						'<img src="close.png" alt="关闭" />'+
					'</a>'+
				'</div>'+
				'<div class="layer-content">'+
					option.content+
				'</div>'+
				'<div class="layer-btn"></div>';
				
			this.layers[id] = { elem: layer };
			layer.innerHTML = html;
			document.body.appendChild(layer);
			layerBtn = layer.querySelector('.layer-btn');
			option.btns.forEach(function(item){
				btn = createElem('a', {style: item.style || '', href: 'javascript:;'});
				btn.innerText = item.text;
				btn.addEventListener('click', item.callback ? item.callback : close(id));
				layerBtn.appendChild(btn);
			});
			layer.querySelector('.close').addEventListener('click', close(id));
			addClass(layer, 'layer-show');
		}
	}
	
	win.layer = new Layer();
	
})(window);