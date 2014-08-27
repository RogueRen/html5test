/**
 * Created by Ren on 14-8-23.
 */
//小球半径
var r = 5;
//小球直径
var z = r * 2 + 1;
//时钟左侧坐标
var mleft = 100;
//时钟顶部坐标
var mtop = 100;
//动画小球随机颜色
var ballcolor = ["#ff0000", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#ff00ff", "#f39800", "#00b7ee", "#fff799", "#7f2d00"];
//动画小球数组
var balllist = [];
//全局时间，用作比对前后时间，生成小球动画
var dseconds = 0;
window.onload = function () {

    var canvasW = 1024;
    var canvasH = 768;
    var canvas = document.getElementById("time");
    if (canvas.getContext("2d")) {
        var context = canvas.getContext("2d");
        canvas.height = canvasH;
        canvas.width = canvasW;
        var mydate = new Date();
        dseconds = checkTime(mydate.getHours()) + ":" + checkTime(mydate.getMinutes()) + ":" + checkTime(mydate.getSeconds());
        setInterval(function () {
            rander(context);
            update(context);
        }, 50);
    } else {
        alert("您的浏览器不支持canvas！");
    }


}
//变化小球数组，动画轨迹
var updateball = function (ctxt) {
    for (i in balllist) {
        i = parseInt(i);
        balllist[i].x += balllist[i].vx;
        balllist[i].y += balllist[i].vy;
        balllist[i].vy += balllist[i].g;
        if (balllist[i].y >= ctxt.canvas.height - r) {
            balllist[i].y = ctxt.canvas.height - r;
            balllist[i].vy = -balllist[i].vy * (0.55 + Math.random() / 10);
        }
//        如果小球超出屏幕范围则删除
        if (balllist[i].x >= ctxt.canvas.width || balllist[i].x <= 0) {
            balllist.splice(i, 1);
        }
    }
}
//生成小球对象装入数组
var randerball = function (x, y, num, ctxt) {
    for (var j = 0; j < digit[num].length; j++) {
        for (var k = 0; k < digit[num][j].length; k++) {
            var zx = x + z * k;
            var zy = y + z * j;
            if (digit[num][j][k] == 1) {
                var ballobj = {
                    x: zx,
                    y: zy,
                    g: random(1, 3),
                    color: ballcolor[random(0, 9)],
                    vx: random(-3, 6),
                    vy: -6
                };
                balllist.push(ballobj);
            }
        }
    }
}
//根据时间变化生成小球
var update = function (ctxt) {
    var mydate = new Date();
    var strdate = checkTime(mydate.getHours()) + ":" + checkTime(mydate.getMinutes()) + ":" + checkTime(mydate.getSeconds());
    if (dseconds != strdate) {
        for (var i in strdate) {
            i = parseInt(i);
            var len = i + 1;
            var str = strdate.substring(i, len);
            var str2 = dseconds.substring(i, len);
            if (str == ":") {
                str = 10;
            } else {
                str = parseInt(str);
            }
            if (str != str2 && str != 10) {
                randerball(mleft + z * 8 * i, mtop, str, ctxt);
            }
        }
        dseconds = strdate;
    }
    updateball(ctxt);
}
//格式化时间字符串
function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    }
    return i
}
//获取范围内的随机数
function random(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}
var rander = function (ctxt) {
//    清除画布
    ctxt.clearRect(0, 0, ctxt.canvas.width, ctxt.canvas.height);
//    循环时间字符串
    var strdate = dseconds;
    for (var i in strdate) {
        i = parseInt(i);
        var len = i + 1;
        var str = strdate.substring(i, len);
        if (str == ":") {
            str = 10;
        } else {
            str = parseInt(str);
        }
        randerDigit(mleft + z * 8 * i, mtop, str, ctxt);
    }
//    初始化彩色小球
    for (var i in balllist) {
        i = parseInt(i);
        ballobj = balllist[i];
        ctxt.beginPath();
        ctxt.arc(ballobj.x, ballobj.y, r, 0, 2 * Math.PI);
        ctxt.fillStyle = ballobj.color;
        ctxt.closePath();
        ctxt.fill();
    }
}
//循环时钟阵点
var randerDigit = function (x, y, num, ctxt) {
    for (var j = 0; j < digit[num].length; j++) {
        for (var k = 0; k < digit[num][j].length; k++) {
            var zx = x + z * k;
            var zy = y + z * j;
            if (digit[num][j][k] == 1) {
                randerArc(zx, zy, r, ctxt);
            }
        }
    }
}
//画时钟数字阵点小球
var randerArc = function (x, y, r, ctxt) {
    ctxt.beginPath();
    ctxt.arc(x, y, r, 0, 2 * Math.PI);
    ctxt.fillStyle = "rgb(0,102,153)";
    ctxt.strokeStyle = "#ffffff";
    ctxt.closePath();
    ctxt.fill();
    ctxt.stroke();
}