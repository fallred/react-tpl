export function loadMore(element, callback) {
    function _loadMore() {
        let clientHeight = element.clientHeight;
        let scrollTop = element.scrollTop;
        let scrollHeight = element.scrollHeight;
        if (clientHeight + scrollTop + 10 >= scrollHeight) {
            callback();
        }
    }
    element.addEventListener("scroll", debounce(_loadMore, 300));
}
export function debounce(fn, wait) {
    var timeout = null;
    return function () {
        if (timeout !== null) clearTimeout(timeout);
        timeout = setTimeout(fn, wait);
    };
}

export function downRefresh(element, callback) {
  let startY;
  let distance;
  let originalTop = element.offsetTop;
  let startTop;
  let $timer = null;
  element.addEventListener("touchstart", function (event) {
    if ($timer) clearInterval($timer);
    let touchMove = throttle(_touchMove, 30);
    if (element.scrollTop === 0) {
      startTop = element.offsetTop;
      startY = event.touches[0].pageY; 
      element.addEventListener("touchmove", touchMove);
      element.addEventListener("touchend", touchEnd);
    }

    function _touchMove(event) {
      let pageY = event.touches[0].pageY;
      if (pageY > startY) {
        distance = pageY - startY;
        element.style.top = startTop + distance + "px";
      } else {
        element.removeEventListener("touchmove", touchMove);
        element.removeEventListener("touchend", touchEnd);
      }
    }
    function touchEnd(_event) {
      element.removeEventListener("touchmove", touchMove);
      element.removeEventListener("touchend", touchEnd);
      if (distance > 30) {
        callback();
      }
      $timer = setInterval(() => {
         let currentTop = element.offsetTop;
         if (currentTop - originalTop >= 1) {
          element.style.top = currentTop - 1 + 'px';
         } else {
             $timer && clearInterval($timer)
             element.style.top = originalTop + 'px';
         }
       }, 16);
    }
  });
}

export function throttle(func, delay) {
  var prev = Date.now();
  return function () {
    var context = this;
    var args = arguments;
    var now = Date.now();
    if (now - prev >= delay) {
      func.apply(context, args);
      prev = now;
    }
  };
}