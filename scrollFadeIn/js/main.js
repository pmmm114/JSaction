//scroll Lib
function scrollAnimation(selector) {
    var _ = this;

    _.$elementNodeList = document.querySelectorAll('[scroll-animation]');
};

scrollAnimation.prototype.init = function(transitionTiming, transitionFunc, transitionDelay, transformPosition) {
    var _ = this;

    var IOoptions = {
        'threshold' : 0.7
    };

    var IOcallback = function(entries) {
        console.log(entries[0].target);

        entries[0].target.style.opacity = 1;
        entries[0].target.style.transform = 'translate(0, 0)';
        entries[0].target.style.webkitTransform = 'translate(0, 0)';
        entries[0].target.style.mozTransform = 'translate(0, 0)';
        entries[0].target.style.msTransform = 'translate(0, 0)';
        entries[0].target.style.oTransform = 'translate(0, 0)';
    };

    var observer = new IntersectionObserver(IOcallback, IOoptions);

    _.$elementNodeList.forEach(function(item) {
        var animationType, animationDirection = null;

        animationType = item.getAttribute('scroll-animation');
        animationDirection = item.getAttribute('animation-direction');

        //css transition 초기화
        item.style.transition = 'all';
        item.style.transitionDelay = transitionDelay;
        item.style.transitionDuration = transitionTiming;
        item.style.transitionTimingFunction = transitionFunc;

        if(animationType === 'horizontal') {
            item.style.transform = 'translate('+(animationDirection === 'LTR' ? -transformPosition : transformPosition)+'px, 0)';
            item.style.webkitTransform = 'translate('+(animationDirection === 'LTR' ? -transformPosition : transformPosition)+'px, 0)';
            item.style.mozTransform = 'translate('+(animationDirection === 'LTR' ? -transformPosition : transformPosition)+'px, 0)';
            item.style.msTransform = 'translate('+(animationDirection === 'LTR' ? -transformPosition : transformPosition)+'px, 0)';
            item.style.oTransform = 'translate('+(animationDirection === 'LTR' ? -transformPosition : transformPosition)+'px, 0)';
        } else {
            item.style.transform = 'translate(0, '+(animationDirection === 'TTB' ? -transformPosition : transformPosition)+'px)';
            item.style.webkitTransform = 'translate(0, '+(animationDirection === 'TTB' ? -transformPosition : transformPosition)+'px)';
            item.style.mozTransform = 'translate(0, '+(animationDirection === 'TTB' ? -transformPosition : transformPosition)+'px)';
            item.style.msTransform = 'translate(0, '+(animationDirection === 'TTB' ? -transformPosition : transformPosition)+'px)';
            item.style.oTransform = 'translate(0, '+(animationDirection === 'TTB' ? -transformPosition : transformPosition)+'px)';
        }

        observer.observe(item);
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
    
    window.addEventListener("DOMContentLoaded", function() {
        main.init();
    });
})();
