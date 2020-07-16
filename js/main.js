//scroll Lib
function scrollAnimation(selector) {
    var _ = this;
    _.$notExecutedElementsArray = new Array();
    _.$executedElementsArray = new Array();

    if( $(selector).length > 0 ) {
        $(selector).each(function(index, item) {
            _.$notExecutedElementsArray.push(item);
        });
    }
};

scrollAnimation.prototype.init = function(transitionTiming, transitionFunc, transitionDelay, transformPosition) {
    var _ = this;

    if(_.$notExecutedElementsArray.length > 0) {
        $(window).on('scroll.clientMain', function(e) {
            if(_.$notExecutedElementsArray.length === 0) {
                $(window).off('scroll.clientMain');
            }
            _.animatingElements();
        });
    }
    _.$notExecutedElementsArray.forEach(function(item) {
        //방향에 따라 분기처리 예정
        $(item).css({
            'transition': 'all '+ transitionTiming + ' ' + transitionFunc + ' ' + transitionDelay,
            '-webkit-transform' : 'translateY('+transformPosition+'px)',
            '-moz-transform' : 'translateY('+transformPosition+'px)',
            '-ms-transform' : 'translateY('+transformPosition+'px)',
            '-o-transform' : 'translateY('+transformPosition+'px)',
            'transform' : 'translateY('+transformPosition+'px)',
        })
    })
};

scrollAnimation.prototype.animatingElements = function() {
    var _ = this;

    var showAnimate = function(element) {

        $(element).css({
            'opacity': 1,
            '-webkit-transform' : 'translateY('+0+'px)',
            '-moz-transform' : 'translateY('+0+'px)',
            '-ms-transform' : 'translateY('+0+'px)',
            '-o-transform' : 'translateY('+0+'px)',
            'transform' : 'translateY('+0+'px)',
        });
    };

    _.$notExecutedElementsArray.forEach(function(item) {
        if( $(item).offset().top <= ($(window).scrollTop() + $(window).height()) ) {
            showAnimate(item);
            _.$notExecutedElementsArray.splice(_.$notExecutedElementsArray.indexOf(item), 1);
            _.$executedElementsArray.push(item);
        }
    });
};

(function() {
    var main = (function() {
        var scorollAnimationManager = {
            timing: '0.5s',
            transitionFunc: 'ease-in-out',
            transitionDelay: '0.1s',
            scrollTransform: 50,
            attribute: {
                scroll: '[scroll-animaiton]',
            },
            init: function() {
                var _ = this;

                var scroller = new scrollAnimation(_.attribute.scroll);
                scroller.init(_.timing, _.transitionFunc, _.transitionDelay, _.scrollTransform);
            },
        }
        var init = function() {
            scorollAnimationManager.init();
        }
    
        return {
            init: init,
        };
    })();
    
    $(function() {
        main.init();
    });
})();
