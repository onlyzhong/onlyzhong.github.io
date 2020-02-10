function myq(id) {
    return document.querySelector(id);
}
function myqAll(id) {
    return document.querySelectorAll(id);
}

var ulObj = myq("#rotate");          //div里面的ul
var spanObj = myqAll("span");       //全部的span
var liObj = ulObj.children;           //所有的li
var imgWidth = liObj[0].offsetWidth;//大背景的宽度
// var current = 0;                    
var index = 0;
for (var i = 0; i < spanObj.length; i++) {
    //循环遍历所有的span标签，为每个span设置排他事件
    spanObj[i].setAttribute("index", i);
    // 同事setAttribute接收索引值
    spanObj[i].onmouseover = function () {
        for (var j = 0; j < spanObj.length; j++) {
            spanObj[j].className = "resume";
        }
        index = this.getAttribute("index");
        this.className = "change";
        animate(ulObj, { "left": - imgWidth * index });
    };
}
spanObj[0].className = "change";
// 设置第一个span标签的背景为目标色
ulObj.appendChild(liObj[0].cloneNode(true));
//克隆一个li标签加添加到ul中
var timeId = setInterval(clickHandle, 2000);
// 调用定时器函数，执行右边按钮事件函数
myq('#bg').onmouseover = function () {
    //设置鼠标进入背景时显示两边按钮
    myq("#dvg").style.display = "block";
    clearInterval(timeId);
    //进入时清理定时器
};

myq('#bg').onmouseout = function () {
    //设置鼠标离开事件，两按钮隐藏
    myq("#dvg").style.display = "none";
    //重开定时器
    timeId = setInterval(clickHandle, 2000);
};
myq('#right').onclick = clickHandle;
function clickHandle() {
    //设置右边按钮事件
    if (index == liObj.length - 1) {
        // 如果index的值等于5，此时显示的是第六张图片，而让用户看到的是第一张图片
        //所以如果用户再次点击，则显示第二张图片
        index = 0;
        // 此时令索引等于0
        // 让ul回复到默认位置
        ulObj.style.left = 0 + "px";
    }
    //每点一下，使index加一
    index++;
    animate(ulObj, { "left": - imgWidth * index });
    // 调用函数移动ul
    if (index == liObj.length - 1) {
        // 当index等于5，说明是第六张图，也就是用户看到的第一张图，此时应该使第一个span变目标。第五个恢复
        spanObj[spanObj.length - 1].className = "resume";
        spanObj[0].className = "change";
    } else {
        for (var i = 0; i < spanObj.length; i++) {
            //排他
            spanObj[i].className = 'resume';
        }
        spanObj[index].className = "change";
    }
}
myq("#left").onclick = function () {
    //设置左边按钮事件
    if (index == 0) {
        // 当index等于0时
        index = 5;
        ulObj.style.left = -index * imgWidth + "px";
    }
    index--;
    animate(ulObj, { "left": - imgWidth * index });

    for (var i = 0; i < spanObj.length; i++) {
        spanObj[i].className = 'resume';
    }
    spanObj[index].className = 'change';
};
