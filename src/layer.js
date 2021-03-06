;(function(win){
	'use strict';
	
	var px = 0,
		py = 0,
		moveElem = null;
	
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
	
	//停止冒泡
	function stopBubble(e){
		e = e || win.event;
		if(e.stopPropagation) {
		    e.stopPropagation();
		} else {
		    e.cancelBubble = true;
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
	
	function setPosition(elem, top, left){
		if(!top || !left){
			top = (win.innerHeight - elem.offsetHeight)/2;
			left = (win.innerWidth - elem.offsetWidth)/2;
		}
		elem.style.top = top + 'px';
		elem.style.left = left + 'px';
	}
	
	function getNumberOfStyle(elem, style){
		return parseFloat(getComputedStyle(elem)[style]);
	}
	
	function Layer(){
		if(!(this instanceof Layer)){
			return new Layer();
		}
		this.layers = {};
		this.moveMask = null;
		this.zindex = 9999;
	}
	
	function bindEvent(id){
		var item = layer.layers[id].elem,
			layerHead = item.querySelector('.layer-head'),
			layerClose = item.querySelector('.close');
			
		layerClose.addEventListener('click', close(id));
		
		layerClose.addEventListener('mousedown', stopBubble);
		
		layerHead.addEventListener('mousedown', function(e){
			layer.moveMask.style.display = 'block';
			moveElem = this.parentNode;
			px = e.clientX;
			py = e.clientY;
		});
	}
	
	function createMoveMask(){
		var moveMask = createElem('div', {class: 'ui-mask'});
		layer.moveMask = moveMask;
		layer.moveMask.addEventListener('mousemove', function(e){
			var top = getNumberOfStyle(moveElem, 'top') + e.clientY - py,
				left = getNumberOfStyle(moveElem, 'left') + e.clientX - px;
			setPosition(moveElem, top, left);
			px = e.clientX;
			py = e.clientY;
		});
		layer.moveMask.addEventListener('mouseup', function(e){
			this.style.display = 'none';
		});
		document.body.appendChild(moveMask);
	}
	
	Layer.prototype = {
		constructor: Layer,
		popup: function(option){
			var id = this.zindex,
				item = createElem('div', {class: 'ui-layer', style: 'z-index: '+ id +';'}),
				layerBtn = null,
				btn = null,
				html =
				'<div class="layer-head no-select ui-clear">'+
					'<p>'+ (option.title || '提示') +'</p>'+
					'<a class="close" href="javascript:;">'+
						'<img src="close.png" alt="关闭" />'+
					'</a>'+
				'</div>'+
				'<div class="layer-content">'+
					option.content+
				'</div>'+
				'<div class="layer-btn"></div>';
				
			this.layers[id] = { elem: item };
			item.innerHTML = html;
			document.body.appendChild(item);
			
			layerBtn = item.querySelector('.layer-btn');
			
			option.btns.forEach(function(item){
				btn = createElem('a', {style: item.style || '', href: 'javascript:;'});
				btn.innerText = item.text;
				btn.addEventListener('click', item.callback ? function(){ item.callback(id) } : close(id));
				layerBtn.appendChild(btn);
			});
			
			setPosition(item);
			addClass(item, 'layer-show');
			!this.moveMask && createMoveMask();
			bindEvent(id);
			this.zindex += 1;
		},
		close: function(id){
			close(id)();
		},
		closeAll: function(){
			for(var k in layer.layers){
				this.close(k);
			}
		}
	}
	
	win.addEventListener('resize', function(e){
		var layers = layer.layers;
		if(JSON.stringify(layers) != '{}'){
			for(var k in layers){
				setPosition(layers[k].elem);
			}
		}
	});
	
	win.layer = new Layer();
	
})(window);
