$(function(){
    // 1 监听游戏规则点击 
    $("#rule").click(function(){
        // 区域淡入显示
        $("#rules").stop().fadeIn(100);
    });
    // 2 监听 关闭按钮的点击
    $(".close").click(function(){
        // 区域淡入显示
        $("#rules").stop().fadeOut(100);
    });
    // 3 监听开始游戏按钮
    $(".start").click(function(){
        //开始游戏消失
        $(this).stop().fadeOut(100);
        // 检测进度条按钮 调用进度条方法
        requestProgress();
        // 调用处理灰太狼出现动画方法
        StartwolfAnimate();
    });
    // 4 重新开始游戏按钮
    $(".restart").click(function(){
        // 结束页面 淡出
        $("#mask").stop().fadeOut(100);
        // 改变h1元素的值
        $("#number").html("0分");
        //进度条的方法
        requestProgress();
        // 调用灰太狼函数
        StartwolfAnimate();
    });
    // 检测进度条按钮 进度条方法
    function requestProgress(){
        // 初始值宽度设定
        $("#progress").css({width:180 + 'px'});
        // 开启定时器
        var timer = setInterval(function(){
            // 拿到进度条的宽度
            var progresswidth = $("#progress").width();
            // 执行进度条宽度缩减 每一秒 减 3 
            progresswidth -= 3;
            // 重新赋值进度条 加载动画
            $("#progress").animate({width:progresswidth + 'px'});
            // 判断进度条的值 
            if(progresswidth <= 0){
                // 清理定时器
                clearInterval(timer);
                // 赋值进度条
                progresswidth = 0;
                // 重新开始游戏界面显示
                $("#mask").stop().fadeIn(100);
                //停止灰太狼动画方法
                StopwolfAnimate();
                // 获取分数的值
                parseInt($("#number").text());
                // 赋值分数
                $("#current").text('当前分数为:' + parseInt($("#number").text())+ "分");
            }
        },1000);
    }
    // 处理灰太狼出现动画方法
    function StartwolfAnimate(){
        // 列出灰太狼图片 为一个数组
        var wolf_1 = ["./images/h0.png","./images/h1.png","./images/h2.png","./images/h3.png","./images/h4.png","./images/h5.png","./images/h6.png","./images/h7.png","./images/h8.png","./images/h9.png"];
        // 列出小灰灰图片 一个数组
        var wolf_2 = ["./images/x0.png","./images/x1.png","./images/x2.png","./images/x3.png","./images/x4.png","./images/x5.png","./images/x6.png","./images/x7.png","./images/x8.png","./images/x9.png"];
        // 定义一个数组 可能出现的位置
        var location = [
            {left:"100px",top:"115px"},
            {left:"20px",top:"160px"},
            {left:"190px",top:"142px"},
            {left:"105px",top:"193px"},
            {left:"19px",top:"221px"},
            {left:"202px",top:"212px"},
            {left:"120px",top:"275px"},
            {left:"30px",top:"295px"},
            {left:"209px",top:"297px"}
        ];
        // 创建一个图片标签 img
        var $wolfImg = $('<img class="wolf">'); 
        // 随机图片的位置 math.random 随机函数  math.round 四舍五入
        var random = Math.round(Math.random() * 8);
        // 图片设置定位
        $wolfImg.css({
            position:"absolute",
            left:location[random].left,
            top:location[random].top,
        });
        // 随机显示图片的内容 三元运算符 表达式 条件 ? 结果1 : 结果2;. var ceshi = (b == 5) ? true : false; console.log(ceshi); 0 为小灰灰 1为灰太狼
        var randomWolf = Math.round(Math.random()) == 0 ? wolf_1 : wolf_2;
        // 图片的初始值显示
        wolfIndex = 0;
        // 图片的结束值
        wolfEnd = 5;
        // 图片显示的内容 设置一个定时器 为方便调用 设置为全局变量
        wolfTime = setInterval(function(){
            // 判断 如果 初始值大于5 则删除图片 并且停止定时器
            if(wolfIndex > wolfEnd){
                // 删除图片
                $wolfImg.remove();
                // 停止定时器
                clearInterval(wolfTime);
                // 调用灰太狼出现函数
                StartwolfAnimate();
            }
            // 显示 第一张图片
            $wolfImg.attr("src",randomWolf[wolfIndex]);
            // ++  重新赋值
            wolfIndex++;
        },150);        
        // 图片的值 传到页面  
        $("#img").append($wolfImg);
        // 打击动画实现
        blowWolf($wolfImg);
    }
    // 停止灰太狼动画方法    
    function StopwolfAnimate(){
        // 删除 class 的图片
        $(".wolf").remove();
        // 清理定时器
        clearInterval(wolfTime);
    }
    // 打击动画方法
    function blowWolf(blow){
        // 传值 点击事件 one 只点击一次事件
        blow.one("click",function(){
          // 更改图片的值 
          wolfIndex = 5;
          wolfEnd = 9;    
          // 获取到当前图片的路径
          var src =  $(this).attr("src");
          // 进行判断 indexof 的方法 如果要检索的字符串值没有出现，则该方法返回 -1。 有则为1 true false
          var flag = src.indexOf("h") >= 0;
          // 分数进行判断
          if(flag){
            // 计算出 灰太狼的值 在赋值回去  $('#lbName').html(); 取值  $('h1').html('Hello'); //赋值
            $("#number").text(parseInt( $("#number").text()) + 10 + '分');
          }else{
            $("#number").text(parseInt($("#number").text()) - 10 + '分');
          }
        })
    }
})