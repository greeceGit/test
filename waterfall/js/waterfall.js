var oParent = document.getElementById("main");
var boxArr = document.querySelectorAll(".box");
var bw = document.querySelector("#bigwindow img");
var bg = document.getElementById("bg");
var close = document.getElementById("popImage_close");
window.onload = function() {
    waterfall("main", "box");
    var imgs = {
        "data": [{
            "src": "1.jpg"
        }, {
            "src": "2.jpg"
        }, {
            "src": "3.jpg"
        }, {
            "src": "4.jpg"
        }, {
            "src": "5.jpg"
        }, {
            "src": "6.jpg"
        }, {
            "src": "7.jpg"
        }, {
            "src": "8.jpg"
        }, {
            "src": "9.jpg"
        }]
    };
    bigger();
    bw.onclick = function() {
        bw.style.display = "none";
        bg.style.display = "none";
        close.style.display = "none";
    };
    close.onclick = function() {
        bw.style.display = "none";
        bg.style.display = "none";
        close.style.display = "none";
    };
    window.onscroll = function() {
        //  alert(ifScroll());
        if (ifScroll()) {
            for (var j = 0; j < imgs.data.length; j++) {
                var newbox = document.createElement("div");
                newbox.className = "box";
                oParent.appendChild(newbox);
                var newpic = document.createElement("div");
                newpic.className = "picture";
                newbox.appendChild(newpic);
                var newimg = document.createElement("img");
                newimg.src = "img/" + imgs.data[j].src;
                newpic.appendChild(newimg);
            }
            waterfall("main", "box");
            bigger();
        }
    };
};

function bigger() {
    var imgArr = document.querySelectorAll(".picture img");


    for (var i = 0; i < imgArr.length; i++) {
        imgArr[i].onclick = function() {
            var st = document.documentElement.scrollTop;
            var wh = document.documentElement.clientHeight;
            var ww = document.documentElement.clientWidth;
            var wnew = this.width * 3;
            var hnew = this.height * 3;
            var mtop = wh / 2 - wnew / 2 + st + 30;
            var mleft = ww / 2 - hnew / 2 - 80;
            //  var bigpic=document.createElement("img");
            bw.src = this.src;
            //  bw.appendChild(bigpic);
            bw.style.cssText = "width:" + this.width * 3 + "px;height:" + this.height * 3 + "px;top:" + mtop + "px;left:" + mleft + "px;";
            bw.style.display = "block";
            bg.style.display = "block";
            close.style.cssText = "display:block;top:" + (mtop - 12) + "px;left:" + (mleft + wnew - 5) + "px;";
        };
    }
}

function waterfall(parent, box) {
    var boxArr = document.querySelectorAll(".box");
    var boxW = boxArr[0].offsetWidth;
    var cols = Math.floor(document.documentElement.clientWidth / boxW);
    oParent.style.cssText = "width:" + boxW * cols + "px;margin:0 auto;";

    var heights = [];
    for (var i = 0; i < boxArr.length; i++) {
        if (i < cols) {
            heights.push(boxArr[i].offsetHeight);
        } else {
            var minH = Math.min.apply(null, heights);
            var index = getIndex(heights, minH);
            boxArr[i].style.position = "absolute";
            boxArr[i].style.top = minH + "px";
            boxArr[i].style.left = boxArr[i].offsetWidth * index + "px";
            heights[index] += boxArr[i].offsetHeight;
        }
    }

}

function getIndex(array, value) {
    for (var i = 0; i < array.length; i++) {
        if (value == array[i]) {
            return i;
        }
    }
    return -1;
}

function ifScroll() {
    var lastBox = boxArr[boxArr.length - 1];
    var lastheight = lastBox.offsetTop + Math.floor(lastBox.offsetHeight / 2);
    var scrolltop = document.body.scrollTop || document.documentElement.scrollTop;
    var windowheight = document.body.clientHeight || document.documentElement.clientHeight;
    var scrollheight = scrolltop + windowheight;
    //  alert(lastheight+";;;"+scrollheight);
    return (lastheight < scrollheight) ? true : false;
}
