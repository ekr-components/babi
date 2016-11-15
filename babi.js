// Requires jQuery

var components = components || {};

jQuery(document).on('ready', function() {
	jQuery('[data-component="babi"]').each(function() {
		var babi = new components.Babi(this);
	});
});

components.Babi = function(el) {
	this.el = jQuery(el);
	this.el.wrapInner('<div data-babi="content">');
	this.el.prepend(jQuery('<div data-babi="image"></div>'));
	this.image = this.el.find('[data-babi="image"]');
	this.parent = this.el.parent();
	this.breakpoints = [{
		type: 'mobile',
		width: 480
	}, {
		type: 'tablet',
		width: 800
	}];
	this.current = '';
	this.images = {};
	this.init();
};
components.Babi.prototype = {
	init: function() {
		jQuery(window).on('resize.Babi', this.resize.bind(this));
		this.resize();
	},
	resize: function() {
		for (var i = 0; i < this.breakpoints.length; i++) {
			if (this.parent.width() <= this.breakpoints[i].width) {
				if (this.current != this.breakpoints[i].type) {
					this.setImage(this.breakpoints[i].type);
					return true;
				} else {
					return true;
				}
			}
		}
		if (this.current != 'default') {
			this.setImage('default');
		}
	},
	setImage: function(type) {
		if (typeof this.images[type] == 'undefined') {
			this.loadImage(type, function() {
				this.showImage(type);
			}.bind(this));
		} else {
			this.showImage(type);
		}
	},
	showImage: function(type) {
		var startingImage = this.image.css('background-image');
		this.image.css('background-image', 'url(' + this.images[type] + ')');
		this.current = type;
		if (startingImage == 'none') {
			this.image.css('opacity', 1);
		}
	},
	loadImage: function(type, callback) {
		var url = this.el.data('babi-' + type);
		if (typeof url == 'undefined') url = this.el.data('babi-default');
		this.images[type] = url;
		var image = new Image();
		image.src = url;
		image.onload = callback;
	},
	destroy: function() {
		jQuery(window).off('.Babi');
	}
};
