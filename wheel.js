/* 无缝轮播
 win 要放入的窗口
 option json 轮播图实现的选项
 
    img
    links
    imgColor
    imgSize
    .....
    */
function wheel(win, opts, run) {
    //参数初始化
    var wins = document.querySelector(win);
    if (wins && wins.nodeType != 1) {
        console.error("找不到元素");
        return;
    }
    //添加末尾轮播图片信息
    opts.imgs.push(opts.imgs[0]);
    opts.links.push(opts.links[0]);
    opts.imgColor.push(opts.imgColor[0]);



    // console.log(opts.imgs);
    var imgLength = opts.imgs.length;
    if (imgLength == 0) {
        console.error("没有传入轮播内容");
        return;
    }
    var imgSize = opts.imgSize;
    if (!(imgSize instanceof Array)) {
        console.error("尺寸类型错误");

    }
    if (imgSize.length == 0) {
        imgSize[0] = document.documentElement.clientWidth;
        imgSize[1] = 400;
    }
    if (imgSize.some(function(val) { return val == 0; })) {
        for (var i = 0; i < 2; i++) {
            if (imgSize[i] == 0) {
                imgSize[i] = 500;
            }
        }
    }
    var btnColor = opts.btnColor || "#ccc";
    var btnActive = opts.btnActive || "#000";
    var btnPos = opts.btnPos || ["center", "20"];
    run.time = 0;
    run.runStyle = run.runStyle;
    if (runStyle == "Tween.Quad.easeIn") {
        this.runStyle = Tween.Quad.easeIn;
    } else if (run.runStyle == "Tween.Quad.easeOut") {
        this.runStyle = Tween.Quad.easeOut;
    } else {
        this.runStyle = Tween.Linear;
    }
    if (this.run.time) {
        this.time = run.time * 1000;
    } else {
        this.time = 3000;
    }
    this.eachTime = 0;
    if (this.run.eachTime) {
        this.eachTime = run.eachTime * 1000;
    } else {
        this.eachTime = 300;
    }

    wins.style.cssText = "width:100%;height:" + imgSize[1] + "px;position:relative;";
    //wins子节点box
    var box = document.createElement("div");
    box.style.cssText = "width:" + imgLength * 100 + "%;height:100%;";
    wins.appendChild(box);
    //创建每一个轮播图
    // box子节点divList

    for (var i = 0; i < imgLength; i++) {
        var divList = document.createElement("div");
        divList.style.cssText = `float:left;width:${100/imgLength}%;height:100%;background:${opts.imgColor[i]}`;
        box.appendChild(divList);
        //divList子节点link
        var link = document.createElement("a");
        link.href = opts.links[0];
        link.style.cssText = "width:" + imgSize[0] + "px;height:" + imgSize[1] + "px;display:block;margin:auto;background:url(" + opts.imgs[i] + ") no-repeat 0 0"
        divList.appendChild(link);
    }


    //按钮
    var btnBox = document.createElement("div");
    btnBox.style.cssText = "width:300px;height:20px;position:absolute;left:0;right:0;bottom:" + btnPos[1] + "px;margin:auto;"

    for (var i = 0; i < imgLength - 1; i++) {
        var bgcolor = i == 0 ? btnActive : btnColor;
        var btn = document.createElement("div");
        btn.style.cssText = "width:50px;height:10px;background:" + bgcolor + ";margin:5px 25px;float:left"
        btnBox.appendChild(btn);

    }
    wins.appendChild(btnBox);

    //轮播设置
    var wins = document.getElementsByClassName("window")[0];
    var box = document.getElementsByClassName("box")[0];
    var btns = document.querySelectorAll(".btns li");


    //如何获得窗口的大小
    //console.log(window.innerWidth);
    var winW = parseInt(getComputedStyle(wins, null).width);
    var num = 0;
    //自动轮播
    var move = function() {
        num++;
        if (num > btns.length - 1) {
            animate(box, { marginLeft: -num * winW }, 500, runStyle, function() { box.style.marginLeft = 0; });
            num = 0;
        } else {
            animate(box, { marginLeft: -num * winW }, 500, runStyle)
        }
        for (var i = 0; i < btns.length; i++) {
            btns[i].style.background = btnColor;
        }
        btns[num].style.background = btnActive;
    }
    var t = setInterval(move, time);

    //手动
    for (let i = 0; i < btns.length; i++) {
        btns[i].onclick = function() {
            num = i;
            animate(box, { marginLeft: -num * winW }, 500, runStyle);
            for (var j = 0; j < btns.length; j++) {
                btns[j].style.background = btnColor;
            }
            btns[num].style.background = btnActive
        }
    }


    //鼠标移入移出
    wins.onmouseover = function() {
        clearInterval(t);
    }
    wins.onmouseout = function() {
        setInterval(move, 3000);
    }
}