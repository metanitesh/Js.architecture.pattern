Math.guid = function() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0,
			v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	}).toUpperCase();
};

var Model = {
	inherited: function() {},
	created: function() {
		this.records = {};
	},
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
		$.extend(this, obj);
		if (extended) extended(this);
	},

	include: function(obj) {
		var included = obj.include;
		$.extend(this.prototype, obj);
		if (included) included(this);
	}

};

Model.records = {};

Model.extend({
	find: function(id) {
		var record = this.records[id];
		if (!record){ throw("Unknow record");}
		return record.dup();
	},
	populate: function(values){
		this.records = {};

		for(var i=0, il=values.length; i<il; i++){
			var record = this.init(values[i]);
			record.newRecord = false;
			this.records[record.id] = record;
		}
	}
});

Model.include({
	newRecord: true,
	create: function() {
		if ( !this.id ) this.id = Math.guid();
		this.newRecord = false;
		this.parent.records[this.id] = this.dup();
	},
	destroy: function() {
		delete this.parent.records[this.id];
	},
	update: function() {
		this.parent.records[this.id] = this.dup();
	},
	save: function() {
		this.newRecord ? this.create() : this.update();
	},
	dup : function(){
		$.extend(false, {}, this);
	}
});



var Asset = Model.create();
console.log(Asset);
var asset = Asset.init();
console.log(asset)

// asset.name = "profile image";
// asset.id = 1;
// asset.save();

// var asset2 = Asset.init();

// asset2.name = "wife image";
// asset2.id = 2;
// asset2.save();