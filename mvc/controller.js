(function($, exports){
	var mod = function(includes){
		if(includes) this.includes(includes);
	};

	mod.fn = mod.prototype;

	mod.fn.proxy = function(func){
		return $.proxy(func);
	};

	mod.fn.load = function(func){
		$(this.proxy(func));
	};

	mod.fn.include = function(obj){
		$.extend(this, obj);
	};

	exports.Controller = mod;

})(jQuery, window);


(function($, Controller){

	var mod = new Controller();

	mod.toggleClass = function(e){
		this.view.toggleClass("over", e.data);
	};

	mod.load(function(){
		this.view = $("#view");
		this.view.mouseover(this.proxy(this.toggleClass), true);
		this.view.mouseout(this.proxy(this.toggleClass), false);
	});

})(jQuery, Controller);