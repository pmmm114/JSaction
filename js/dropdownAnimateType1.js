function animationStop() {
	this.queue = null;
}

var flag = new animationStop();

(function (win, $) {
	// "use strict";

	var defDrop = {
		trigger: "#trigger",
		dropdownBox: ".dropdown",
		dropdownInner: {
			el: ".dropdown li",
			options: {
				opacity: 1,
				margin: 0
			}
		},
		secondDepth: {
			el: ".dropdown__anchor",
			selector: "data-menu"
		}
	};

	// 드롭다운 효과1
	var dropdownType1 = {
		init: function () {
			// 현재 객체는 _로 명시
			var _ = this;

			_.bindEvents();
		},
		bindEvents: function () {
			var _ = this,
				$document = $(document);

			$document.on("click", defDrop.trigger, $.proxy(_.openDropdownBox, _));
		},
		initDropdownInner: function () {
			$dropdownInner = $(defDrop.dropdownInner.el);
			$dropdownBox = $(defDrop.dropdownBox);

			$dropdownInner.removeAttr('style');
			console.log("before box");
			$dropdownBox.removeAttr('style').css('display', 'none');
		},
		checkDropdownStyle: function () {
			$dropdownBox = $(defDrop.dropdownBox);

			if ($dropdownBox.css("display") == "none") return true;
			else return false;
		},
		fadeInDropdownInner: function (index) {
			var _ = this;
			$dropdownInner = $(defDrop.dropdownInner.el);

			if (flag.queue === false) {
				$dropdownInner.css(defDrop.dropdownInner.default);
				return false;
			} else {
				$dropdownInner
					.eq(index)
					.animate(defDrop.dropdownInner.options, 100, function () {
						if (index < 7) {
							$.proxy(_.fadeInDropdownInner, _)(index + 1);
						}
					});
			}
		},
		openDropdownBox: function () {
			var _ = this,
				$dropdownBox = $(defDrop.dropdownBox);


			if (_.checkDropdownStyle()) {
				flag.queue = true;
				$dropdownBox.slideDown(100, $.proxy(_.fadeInDropdownInner, _)(0));
			} else {
				flag.queue = false;
				$dropdownInner.stop();
				$dropdownBox.clearQueue().slideUp(200, function () {
					console.log("init Inner");
					_.initDropdownInner();
				});
			}
		}
	};

	var dropdownSecondDepth = {
		init: function () {
			var _ = this;

			_.bindEvents();
		},
		bindEvents: function () {
			var _ = this;
			$document = $(document);

			$document.on("click", defDrop.secondDepth.el, function () {
				console.log("go to second depth");
				$(defDrop.dropdownBox).animate({
					margin: "0 0 0 -100%"
				}, 1000);

			})

		}

	};

	var init = function () {
		dropdownType1.init();
		dropdownSecondDepth.init();
	};

	$(function () {
		init();
	});
})(window, window.jQuery);