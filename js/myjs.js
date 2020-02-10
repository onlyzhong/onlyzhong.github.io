




//设置元素的文本内容
// element 任意元素
// text 任意文本内容
function setInnerText(element, text) {
    if (typeof (element.textContent) == "undefined") {
        element.innerText = text;
    } else {
        element.textContent = text;
    }
}



//获取文本内容
// element 任意元素
// 任意元素的文本内容
function getInnerText(element) {
    if (typeof (element.textContent) == "undefined") {
        return element.innerText;
    } else {
        return element.textContent;
    }
}



//获取父级元素的第一个子元素
//如果浏览器支持element.getFirstElement，则直接返回
//如果不支持，获取第一个子节点，判断是否为子元素
//如果不是，则将该节点的下一个兄弟元素返回
function getFirstElement(element) {
    if (element.getFirstElement) {
        return element.getFirstElement;
    } else {
        var node = element.fristChild;
        if (node && node.nodeType != 1) {
            node = node.nextSibling;
        }
        return node;
    }
}




//获取父级元素的最后一子元素
//如果浏览器支持element.getLastElement，则直接返回
//如果不支持，获取最后一个子节点，判断是否为子元素
//如果不是，则将该节点的上一个兄弟元素返回
function getLastElement(element) {
    if (element.getLastElement) {
        return element.getLastElement;
    } else {
        var node = element.lastChild;
        if (node && node.nodeType != 1) {
            node = node.previousSibling;
        }
        return node;
    }
}




//获取某个元素的前一个兄弟元素
//如果浏览器支持element.getPreviousElementSibling，则直接返回
//否则一直获取该元素的上一个兄弟节点，直到获取的是元素节点，返回
function getPreviousElement(element) {
    if (element.getPreviousElementSibling) {
        return element.getPreviousElementSibling;
    } else {
        var node = element.previousSibling;
        while (node && node.nodeType != 1) {
            node.node.previousSibling;
        }
        return node;
    }
}



//获取某元素的后一个兄元素
//如果浏览器支持element.nextElementSibling，则直接返回
//否则一直获取该元素的下一个兄弟节点，直到获取的是元素节点，返回
function getNextElement(element) {
    if (element.nextElementSibling) {
        return element.nextElementSibling;
    } else {
        var node = element.nextSibling;
        while (node && node.nodeType != 1) {
            node = node.nextSibling;
        }
        return node;
    }
}


//获取某个元素的所有兄弟元素
//原理类似上边
function getSiblings(element) {
    if (!element) return;
    var elements = [];
    var ele = element.previousSibling;
    while (ele) {
        if (ele.nodeType === 1) {
            elements.push(ele);
        }
        ele = ele.previousSibling;
    }
    ele = element.nextSibling;
    while (ele) {
        if (ele.nodeType === 1) {
            elements.push(ele);
        }
        ele = ele.nextSibling;
    }
    return elements;
}





//为一个元素板绑定事件（或者叫监听事件）
function addEventListener(element, type, fn) {
    if (element.addEventListener) {
        element.addEventListener(type, fn, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + type, fn);
    } else {
        element["on" + type] = fn;
    }
}




//为一个元素解绑事件
function removeEventListener(element, type, fnName) {
    if (element.removeEventListener) {
        return element.removeEventListener(type, fnName, false);
    } else if (element.detachEvent) {
        return element.detachEvent("on" + type, fnName);
    } else {
        element["on" + type] = null;
    }
}


//获取的是页面向上或者向左卷曲出去的距离的值,返回的是对象
function getScroll() {
    return {
        top: window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0,
        left: window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft || 0
    };
}




//获取任意元素的任意属性
function getStyle(element, attr) {

    return window.getComputedStyle ? window.getComputedStyle(element, null)[attr] : element.currentStyle[attr] || 0;
}



//缓动动画函数
function animate(element, json, fn) {
    clearInterval(element.timeId);
    element.timeId = setInterval(function () {
        var flag = true;
        for (var attr in json) {
            if (attr == "opacity") {
                var current = getStyle(element, attr) * 100;
                var target = json[attr] * 100;
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                element.style[attr] = current / 100;
            } else if (attr == "zIndex") {
                element.style[attr] = json[attr];
            } else {
                var current = parseInt(getStyle(element, attr));
                var target = json[attr];
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                element.style[attr] = current + "px";
            }
            if (current != target) {
                flag = false;
            }

        }
        if (flag) {
            clearInterval(element.timeId);
            if (fn) {
                fn();
            }
        }
    }, 20);
}


//匀速动画函数
function move(element, json, fn) {
    clearInterval(element.timeId);
    element.timeId = setInterval(function () {
        var flag = true;
        for (var attr in json) {
            if (attr == "opacity") {
                var current = getStyle(element, attr) * 100;
                var target = json[attr];
                var step = 10;
                step = (target - current) > 0 ? step : -step;
                current += step;
                if (Math.abs(target - current) > Math.abs(step)) {
                    element.style[attr] = current / 100;
                } else {
                    element.style[attr] = target / 100;
                }
            } else if (attr == "zIndex") {
                element.style[sttr] = json[attr];
            } else {
                var current = parseInt(getStyle(element, attr));
                var target = json[attr];
                var step = 10;
                step = (target - current > 0) ? step : -step;
                current += step;
                if (Math.ceil(target - current) > Math.floor(step)) {
                    element.style[attr] = current + "px";
                }
                else {
                    element.style[attr] = target + "px";
                }
            }
            if (current != target) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(timeId);
            if (fn) {
                fn();
            }
        }
    }, 20);
}