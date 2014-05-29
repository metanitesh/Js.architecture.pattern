var exports = this;

(function() {
	var mod = {};

	mod.create = function(includes) {
		var result = function() {
			this.init.apply(this, arguments);
		};

		result.fn = result.prototype;
		result.fn.init = function() {};

		result.proxy = function(func) {
			return $.proxy(func, this);
		};
		result.fn.proxy = result.proxy;

		result.include = function(obj) {
			$.extend(this.fn, obj);
		};
		result.extend = function(obj) {
			$.extend(this, obj);
		};

		result.include({
			eventSplitter: /^(\w+)\s*(.*)$/,

			delegateEvents: function() {
				for (var key in this.events) {
					var methodName = this.events[key];
					var method = this.proxy(this[methodName]);

					var match = key.match(this.eventSplitter);
					var eventName = match[1];
					var selector = match[2];

					if (selector === "") {
						this.el.bind(eventName, method);
					} else {
						this.el.delegate(selector, eventName, method);
					}

				}
			},

			$: function(selector) {
				return $(selector, this.el);
			},

			refereshElements: function() {
				for (var key in this.elements) {
					this[this.elements[key]] = this.$(key);
				}
			}
		})


		if (includes) result.include(includes);

		return result;
	};

	exports.Controller = mod;

})(jQuery);

$(function($) {
	var ToggleView = Controller.create({
		init: function(element) {
			this.el = $(element);
			this.refereshElements();
			this.searchForm.submit(this.proxy(this.search));
		},

		search: function() {

		},

		toggleClass: function(e) {
			this.view.toggleClass("over", e.data);
		},

		elements: {
			"form.searchForm": "searchForm",
			"form input[type=text]": "searchInput"
		},

		events: {
			"submit form": "submit"
		}

	});

	new ToggleView("view");
});