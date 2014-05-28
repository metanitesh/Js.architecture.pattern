Math.guid = function() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0,
			v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	}).toUpperCase();
};

var Model = {
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

Model.records = {};

Model.extend({
	find: function(id) {
		if (this.records[id]) {
			return this.records[id];
		}
		throw ("unknown record");
	}
});

Model.include({
	newRecord: true,
	create: function() {
		this.newRecord = false;
		this.parent.records[this.id] = this;
	},
	destroy: function() {
		delete this.parent.records[this.id];
	},
	update: function() {
		this.parent.records[this.id] = this;
	},
	save: function() {
		this.newRecord ? this.create() : this.update();
	}
});