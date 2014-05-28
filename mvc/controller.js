var exports = this;

(function(){
	var mod = {};

	mod.create = function(include){
		var result = function(){
			this.init.apply(this, arguments);
		};

		result.fn = result.prototype;
		result.fn.init = function(){};

		result.proxy = function(func){ return $.proxy(func, this); };
		result.fn.proxy = result.proxy;

		result.include = function(obj) { $.extend(this.fn, obj);};
		result.extend = function(obj) { $.extend(this, obj);};
		
		if(includes) result.includes(includes);

		return result;
	};

	exports.Controller = mod;

})(jQuery);

$(function($){
	var toggleView = Controller.create({
		init: function(view){
			this.view = $(view);
			this.view.mouseover(this.proxy(this.toggleClass), true);
			this.view.mouseout(this.proxy(this.toggleClass), true);
		},

		toggleClass: function(e){
			this.view.toggleClass("over", e.data);
		}
	});

	new ToggleView("view");
});