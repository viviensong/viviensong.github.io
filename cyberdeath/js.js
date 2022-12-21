setInterval(function () {
  const show = document.querySelector('span[data-show]')
  const next = show.nextElementSibling || document.querySelector('span:first-child')
  const up = document.querySelector('span[data-up]')
  if (up) {
    up.removeAttribute('data-up')
  }
  show.removeAttribute('data-show')
  show.setAttribute('data-up', '')
  next.setAttribute('data-show', '')
}, 2000)


// 词云
window.onload = function() {
   $(document).ready(function() {
   if( ! $('#wordCloud').tagcanvas({
     textColour : "#fff",
     textFont: "SimHei",
     textHeight: 16,
     maxSpeed : 0.02,
     depth :2.8,
     noSelect : false,
     stretchX: 2,
     wheelZoom : false,
     initial : [0.02, 0.02],
     shuffleTags : 1.4,
     centreFunc: text,
     noMouse: false,
     outlineColour:"#cc54d0",
     outlineRadius:6,
      shadow: '#fff',
      shadowBlur: 0.6,

   })) {
     // TagCanvas failed to load
     $('#wordCloudContainer').hide();
   }
   // your other jQuery stuff here...
   function text(c, w, h, cx, cy) {
      c.setTransform(1, 0, 0, 1, 0, 0);
      c.translate('50%', '50%');
      c.globalAlpha = 1;
      c.fillStyle = '#8fd3e8';
      c.textAlign = 'center';
      c.textBaseline = 'alphabetic';
      c.font = '600 48px Khand';
      c.fillText('B站纪念up主', cx, cy+28);
    }
 });
};

// card
(function ($) {
	$.fn.countTo = function (options) {
		options = options || {};

		return $(this).each(function () {
			// set options for current element
			var settings = $.extend({}, $.fn.countTo.defaults, {
				from:            $(this).data('from'),
				to:              $(this).data('to'),
				speed:           $(this).data('speed'),
				refreshInterval: $(this).data('refresh-interval'),
				decimals:        $(this).data('decimals')
			}, options);

			// how many times to update the value, and how much to increment the value on each update
			var loops = Math.ceil(settings.speed / settings.refreshInterval),
				increment = (settings.to - settings.from) / loops;

			// references & variables that will change with each update
			var self = this,
				$self = $(this),
				loopCount = 0,
				value = settings.from,
				data = $self.data('countTo') || {};

			$self.data('countTo', data);

			// if an existing interval can be found, clear it first
			if (data.interval) {
				clearInterval(data.interval);
			}
			data.interval = setInterval(updateTimer, settings.refreshInterval);

			// initialize the element with the starting value
			render(value);

			function updateTimer() {
				value += increment;
				loopCount++;

				render(value);

				if (typeof(settings.onUpdate) == 'function') {
					settings.onUpdate.call(self, value);
				}

				if (loopCount >= loops) {
					// remove the interval
					$self.removeData('countTo');
					clearInterval(data.interval);
					value = settings.to;

					if (typeof(settings.onComplete) == 'function') {
						settings.onComplete.call(self, value);
					}
				}
			}

			function render(value) {
				var formattedValue = settings.formatter.call(self, value, settings);
				$self.html(formattedValue);
			}
		});
	};

	$.fn.countTo.defaults = {
		from: 0,               // the number the element should start at
		to: 0,                 // the number the element should end at
		speed: 1000,           // how long it should take to count between the target numbers
		refreshInterval: 100,  // how often the element should be updated
		decimals: 0,           // the number of decimal places to show
		formatter: formatter,  // handler for formatting the value before rendering
		onUpdate: null,        // callback method for every time the element is updated
		onComplete: null       // callback method for when the element finishes updating
	};

	function formatter(value, settings) {
		return value.toFixed(settings.decimals);
	}
}(jQuery));

jQuery(function ($) {
  // custom formatting example
  $('.count-number').data('countToOptions', {
	formatter: function (value, options) {
	  return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
	}
  });

  // start all the timers
  $('.timer').each(count);

  function count(options) {
	var $this = $(this);
	options = $.extend({}, options || {}, $this.data('countToOptions') || {});
	$this.countTo(options);
  }
});
