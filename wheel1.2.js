function wheel(wins, opts, run) {
    this.init(wins, opts, run);
    this.getWindow();
    this.createDiv();
    this.createList();
    this.createLinks();
    this.autoRun();
    this.onclickRun();
}

wheel.prototype = {
    init(wins, opts, run) {
        this.opts = opts;
        this.run = this.run;
        var wins = document.querySelector(wins);
        if (!(wins && wins.nodeType)) {
            console.log("找不到元素");
            return;
        }
        this.wins = wins;
        opts.imgs.push(opts.imgs[0]);
        opts.links.push(opts.links[0]);

        this.imgLength = opts.imgs.length + 1;
        if (this.imgLength == 0) {
            console.log("没有传入轮播内容");
        }
        this.imgSize = opts.imgSize;
        if (!(this.imgSize instanceof Array)) {
            console.error("尺寸类型错误");
        }
        if (this.imgSize.length == 0) {
            this.imgSize[0] = document.documentElement.clientWidth;
            this.imgSize[1] = 400;

        }
        if (this.imgSize.some(function(val) {
                return val == 0
            })) {
            for (var i = 0; i < this.imgSize.length; i++) {
                if (this.imgSize[i] == 0) {
                    this.imgSize[i] = 500;
                }
            }
        }
        var btnColor = opts.btnColor || "#ccc";
        var btnActive = opts.btnActive || "#000";
        var btnPos = opts.btnPos || ["center", "20"];
        this.time = 0;
        this.runStyle = run.runStyle;
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
    },
    getWindow() {
        this.style.cssText = "width:100%;height:" + this.imgSize[1] + "px;float:left;overflow:hidden;position:relative";
    },
    createDiv() {
        this.box = document.createElement("div");
        this.box.style.cssText = "width:" + this.imgLength * 100 + "%;height:100%;"
        this.wins.appendChild(box);
    },
    createList() {
        for (var i = 0; i < this.imgLength; i++) {

            var divList = document.createElement("div");
            divList.style.cssText = `float:left;width:${100/this.imgLength}%;height:100%;border:1px solid blue;background:${this.opts.imgColor[i]}`;

            var link = document.createElement("a");
            link.href = opts.links[i];
            link.style.cssText = "width:" + this.imgSize[0] + "px;height:" + this.imgSize[1] + "px;display:block;margin:auto;background:url(" + this.opts.imgs[1] + ") no-repeat 0 0"
            divList.appendChild(link);
            this.box.appendChild(divList);
        }
    },
    createLinks() {
        var btnBox = document.createElement("div");
        this.btnBox.style.cssText = "width:300px height:20px;position:absolute;left:0;right:0;margin:auto;bottom:" + this.btnPos[1] + "px;border:1px solid #ccc;"
        this.btns = [];
        for (var i = 0; i < this.imgLength - 1; i++) {
            var btn = document.createElement("div");
            var backgroundcolor = i == 0 ? btnActive : btnColor;
            btn.style.cssText = "width:10px;height:10px;background:" + backgroundcolor + ";border-radius:50%;margin:0 10px;cursor:pointer;float:left;";
            btnBox.appendChild(btn);
            this.btns.push(btn);
        }

        this.wins.appendChild(btnBox)
    },
    autoRun() {
        var winW = parseInt(getComputedStyle(this.wins, null).width);
        var num = 0;
        //自动轮播
        var move = function() {
            num++;
            if (num > this.btns.length - 1) {
                animate(box, { marginLeft: -num * winW }, 500, runStyle, function() { box.style.marginLeft = 0; });
                num = 0;
            } else {
                animate(box, { marginLeft: -num * winW }, 500, runStyle)
            }
            for (var i = 0; i < this.btns.length; i++) {
                this.btns[i].style.background = btnColor;
            }
            this.btns[num].style.background = btnActive;
        }
        this.t = setInterval(move, time);
    },
    onclickRun() {
        for (let i = 0; i < this.btns.length; i++) {
            this.btns[i].onclick = function() {
                num = i;
                animate(box, { marginLeft: -num * winW }, 500, runStyle);
                for (var j = 0; j < this.btns.length; j++) {
                    this.btns[j].style.background = btnColor;
                }
                this.btns[num].style.background = btnActive
            }
        }


        //鼠标移入移出
        this.wins.onmouseover = function() {
            clearInterval(this.t);
        }
        this.wins.onmouseout = function() {
            setInterval(move, 3000);
        }
    }
}