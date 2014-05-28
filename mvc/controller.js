(function($){

	var mod = {};

	mod.load = function(func){
		$($.proxy(func, this));
	};

	mod.load(function(){
		this.view = $("#view");
	});

	mod.assertClick = function(e){

	};

	mod.load(function(){
		this.view.find(".asset").click($.proxy(this.assertClick, this))
	});

}(jQuery));
