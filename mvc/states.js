var Events = {
	bind: function(){
		if( !this.o ) this.o = $({});
		this.o.bind.apply(this.o, arguments);
	},

	trigger: function(){
		if( !this.o ) this.o = $({});
		this.o.trigger.apply(this.o, arguments);
	}
};


var StateMachine = function(){};

$.extend(StateMachine.fn, Events);

StateMachine.fn.add = function(controller){
	this.bind("change", function(e, current){
		if(controller == current){
			controller.activate();
		}else{
			controller.deactivate();
		}
	});

	controller.active = $.proxy(function(){
		this.trigger("change", controller);
	}, this);
};

var con1 = {
	activate: function(){},
	deactivate: function(){}
};

var con2 = {
	activate: function(){},
	deactivate: function(){}
};

var sm = new StateMachine();
sm.add(con1);
sm.add(con2);

con1.active();
