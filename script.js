// Requires jQuery

var components = components || {};

jQuery(document).on('ready', function() {
	jQuery('[data-component="babi"]').each(function() {
		var babi = new components.Babi(this);
	});
});

components.Babi = function(el) {
	var self = this;
	self.el = jQuery(el);
	self.el.wrapInner('<div data-babi="content">');
	self.el.prepend(jQuery('<div data-babi="image"></div>'));
	self.image = self.el.find('[data-babi="image"]');
	self.parent = self.el.parent();
	self.breakpoints = [{
		type: 'mobile',
		width: 480
	}, {
		type: 'tablet',
		width: 800
	}];
	self.current = '';
	self.images = {};
	self.init();
};
components.Babi.prototype = {
	init: function() {
		var self = this;
		jQuery(window).on('resize.Babi', function() {
			self.resize();
		});
		self.resize();
	},
	resize: function() {
		var self = this;
		for (var i = 0; i < self.breakpoints.length; i++) {
			if (self.parent.width() <= self.breakpoints[i].width) {
				if (self.current != self.breakpoints[i].type) {
					self.setImage(self.breakpoints[i].type);
					return true;
				} else {
					return true;
				}
			}
		}
		if (self.current != 'default') {
			self.setImage('default');
		}
	},
	setImage: function(type) {
		var self = this;
		if (typeof self.images[type] == 'undefined') {
			self.loadImage(type, function() {
				self.showImage(type);
			});
		} else {
			self.showImage(type);
		}
	},
	showImage: function(type) {
		var self = this;
		var startingImage = self.image.css('background-image');
		self.image.css('background-image', 'url(' + self.images[type] + ')');
		self.current = type;
		if (startingImage == 'none') {
			self.image.css('opacity', 1);
		}
	},
	loadImage: function(type, callback) {
		var self = this;
		var url = self.el.data('babi-' + type);
		if (typeof url == 'undefined') url = self.el.data('babi-default');
		self.images[type] = url;
		var image = new Image();
		image.src = url;
		image.onload = callback;
	},
	destroy: function() {
		jQuery(window).off('.Babi');
	}
};
