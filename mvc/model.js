ar Model = {
	inherited: function() {},
	created: function() {},
	prototype: {
		init: function() {}
	},
	create: function() {
		var object = Object.create(this);
		object.parent = this;
		object.prototype = object.fn = Object.create(this.prototype);

		object.created();
		this.inherited(object);
		return object;
	},
	init: function() {
		var instance = Object.create(this.prototype);
		instance.parent = this;
		instance.init.apply(instance, arguments);
		return instance;
	},
	extend: function(obj) {
		var extended = obj.extend;
		for (var prop in obj) {
			if (obj.hasOwnProperty(prop)) {
				this[prop] = obj[prop];
			}
		}
		if (extended) extended(this);
	},

	include: function(obj) {
		var included = obj.include;
		for (var prop in obj) {
			if (obj.hasOwnProperty(prop)) {
				this.prototype[prop] = obj[prop];
			}
		}
		if (included) included(this);
	}

};