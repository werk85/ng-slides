function addCssRules(stylesheet, rules) {
	angular.forEach(rules, function(rule, selector) {
		var ruleString = '';

		angular.forEach(rule, function(value, property) {
			if (property.match(/transition.*/)) {
				ruleString += '-webkit-' + property + ': ' + value + '; ';
				ruleString += '-moz-' + property + ': ' + value + '; ';
				ruleString += '-o-' + property + ': ' + value + '; ';
				ruleString += '-webkit-transform: translateZ(0); ';
			}
			ruleString += property + ': ' + value + '; ';
		});
		addCssRule(stylesheet, selector, ruleString);
	});
}

function addCssRule(styleSheet, selector, rule) {
	if (styleSheet.insertRule) {
		styleSheet.insertRule(selector + '{' + rule + '}', styleSheet.cssRules.length);
	}
	else { /* IE */
		styleSheet.addRule(selector, rule, -1);
	}
}

angular.module('slides', [])

.run(function($window, $rootScope) {
	angular.element($window).bind('keydown', function(e) {
		switch (e.keyCode) {
			case 37:
				if ($rootScope.currentSlide > 1) {
					$rootScope.currentSlide--;
					$rootScope.$apply();
				}
				break;
			case 39:
				if ($rootScope.currentSlide < $rootScope.slideCount) {
					$rootScope.currentSlide++;
					$rootScope.$apply();
				}
				break;
		}
	});
})

.controller('SlideCtrl', function($scope, $location, $rootScope) {
	var oldHash = $location.hash();
	var oldCurrentSlide;

	$rootScope.slideCount = 0;
	$rootScope.currentSlide = 1;

	if ($location.hash()) {
		$rootScope.currentSlide = oldCurrentSlide = parseInt($location.hash(), 10);
	} else if ($scope.slideCount > 0) {
		$rootScope.currentSlide = oldCurrentSlide = 1;
	}

	$rootScope.$watch('currentSlide', function() {
		if (($location.hash() || 1) == $rootScope.currentSlide) return;

		if ($location.hash() != oldHash) {
			$rootScope.currentSlide = parseInt($location.hash(), 10) || 1;
		} else if ($rootScope.currentSlide != oldCurrentSlide){
			$location.hash(($rootScope.currentSlide > 1) ? $rootScope.currentSlide : '');
		}

		oldHash = $location.hash();
		oldCurrentSlide = $rootScope.currentSlide;
	}, true);

})

.directive('body', function() {
	return {
		restrict: 'E',
		link: function(scope, element, iAttrs, controller) {
			var styleSheet = document.styleSheets[0];

			addCssRules(styleSheet, {
				'body': {
					'overflow-x': 'hidden',
					'overflow-y': 'auto',
					'margin': 0,
					'padding': 0,
					'background-color': 'rgb(215, 215, 215)',
					'-webkit-font-smoothing': 'antialiased'
				},
				'slide': {
					'width': '860px',
					'min-height': '660px',
					'position': 'absolute',
					'top': '50%',
					'left': '50%',
					'margin-top': '-350px',
					'margin-left': '9000px',
					'padding': '20px 40px',


					'border': '1px solid rgba(0, 0, 0, .3)',
					'border-radius': '10px',
					'box-shadow': '0 2px 6px rgba(0, 0, 0, .1)',
					'background': 'url(img/logo.png) 750px 35px no-repeat',
					'background-size': '150px',
					'background-color': 'white',

					'white-space': 'pre-line',

					'font-family': "PTSansNarrowRegular, Arial, 'MS Trebuchet', sans-serif",
					'font-size': '25px',
					'color': 'rgb(102, 102, 102)',
					'text-shadow': '0 1px 1px rgba(0, 0, 0, .1)'
				},
				'slide.no-logo': {
					'background': 'white'
				},
				'.current': {
					'margin-left': '-450px',
					'transition': 'margin, 0.5s'
				},
				'.previous': {
					'margin-left': '-1450px',
					'transition': 'margin, 0.5s',
					'opacity': '30%'
				},
				'.next': {
					'margin-left': '550px',
					'transition': 'margin, 0.5s',
					'opacity': '30%'
				},
				'.past': {
					'margin-left': '-2450px',
					'transition': 'margin, 0.5s'
				},
				'.future': {
					'margin-left': '1550px',
					'transition': 'margin, 0.5s'
				},
				'#slideCounter': {
					'position': 'absolute',
					'top': '50%',
					'left': '50%',
					'width': '900px',
					'margin-top': '380px',
					'margin-left': '-450px',
					'text-align': 'center',
					'font-family': "PTSansNarrowBold, Arial, 'MS Trebuchet', sans-serif",
					'z-index': '-1'
				},

				'h1, h2, h3, h4': {
					'color': '#666',
					'font-weight': '500'
				},

				'h1': {
					'font-size': '60px',
					'line-height': '60px'
				},

				'h2': {
					'font-size': '50px',
					'line-height': '75px',
					'margin': '0',
					'padding': '0'
				},

				'h3': {
					'font-size': '40px',
					'line-height': '40px',
					'margin': '0',
					'padding': '0'
				},

				'h4': {
					'font-size': '36px',
					'line-height': '36px',
					'margin': '0',
					'padding': '0'
				},

				'h2.title' : {
					'padding': '0',
					'margin': '0',
					'color': '#000',
					'font-weight': '600'
				},

				'.no-title h1, .no-title h2, .no-title h3, .no-title h4': {
					'width': '100%',
					'text-align': 'center',
					'color': '#666'
				},

				'.no-title h1': {
					'color': '#333',
					'font-weight': '600'
				},


				'p, li, pre': {
					'font-size': '36px',
					'padding': '0',
					'margin': '0'
				},

				'pre': {
					'font-family': "PTSansNarrowRegular, Arial, 'MS Trebuchet', sans-serif"
				},

				'.center': {
					'width': '100%',
					'text-align': 'center'
				},

				'fieldset legend': {
					'margin': '20px',
					'padding': '10px'
				},


				'fieldset.example': {
					'margin-bottom': '20px'
				},


				'fieldset.example > div > p': {
					'font-size': '26px'
				},

				'fieldset.code': {
					'padding': '0'
				},

				'fieldset.code > div': {
					'font-size': '23px'
				},

				'fieldset.code .syntaxhighlighter': {
					'overflow': 'hidden !important'
				}

			});
		}
	};
})

.directive('slide', function($rootScope) {
	return {
		restrict: 'E',
		scope: {
			title: '@'
		},
		transclude: true,
		replace: false,
		template: '<h2 class="title">{{title}}</h2><div ng-transclude></div>',
		link: function(scope, element, attrs, controller) {
			var slideId = ++$rootScope.slideCount;
			var slideState;

			element.attr('slide-id', slideId);

			if (!scope.title) {
				element.addClass('no-title');
			}

			$rootScope.$watch('currentSlide', function() {
				if (slideState)
					element.removeClass(slideState);

				switch ($rootScope.currentSlide) {
					case (slideId + 1):
						slideState = 'previous';
						break;
					case (slideId):
						slideState = 'current';
						break;
					case (slideId - 1):
						slideState = 'next';
						break;
					default:
						slideState = ($rootScope.currentSlide > slideId) ? 'past' : 'future';
				}
				element.addClass(slideState);
			}, true);
		}
	};
})

///////////////////////////////////////////////

/* http://docs.angularjs.org/#!angular.widget */

.directive('pre', function($window) {
	return {
		restrict: 'E',
		link: function(scope, element, attr, controller) {
			function highlight(){
				SyntaxHighlighter.all();
			}

			if (element.hasClass('code')){
				// since we are emulating jQuery we need to defer it.
				var pre = element;
				var html = pre.html();
				var script = '';
				pre.html('');
				pre.css('display', 'block');
				pre.css('white-space', 'normal');
				pre.css('font-family', 'inherit');
				pre.css('font-size', 'inherit');

				html = html
					.replace(/===script===([\s\S]*)===\/script===/mg, function(_, code){
						script = code;
						return '###SCRIPT###';
					})
					.replace(/&lt;/mg, '<')
					.replace(/&gt;/mg, '>')
					.replace(/&amp;/mg, '&');

				// turns out that <script> tag is removed in .html()
				// so we have to code it as p:script and the rename it.
				var example = angular.element('<fieldset>')
					.addClass('example')
					.append('<legend>Output</legend>')
					.append(angular.element('<div>').html(html.replace('###SCRIPT###', '')));

				var code = angular.element('<fieldset>')
					.addClass('code')
					.append('<legend>Source</legend>')
					.append(angular.element('<pre>')
							.addClass('brush: js; html-script: true; toolbar: false;')
							.text(html.replace('###SCRIPT###', '<script>' + script + '</script>').replace(/&amp;/mg, '&')));

				pre.append(example);
				pre.append(code);

				$window.eval(script.replace(/&amp;/mg, '&'));
				if (document.fireEvent) {
					document.fireEvent('onload');
				} else {
					var evnt = document.createEvent('HTMLEvents');
					evnt.initEvent('load', true, false);
					document.dispatchEvent(evnt);
				}

				highlight();
			} else if (element.hasClass('code-only')){
				element.addClass('brush: js; toolbar: false;');
				highlight();
			} else if (element.hasClass('html-only')) {
				element.addClass('brush: html; toolbar: false;');
				highlight();
			}
		}
	};
})

;