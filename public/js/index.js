var queAndAns = {
    currentQues:0,//记录当前题目序号
    currentGrade:0,//记录当前分数
    init: function(){
        this.toMain();
        this.timeOver();
    },
    //跳转到答题页
    toMain : function(){
        var _this = this;
        $("#start").click(function(){
            $(".start").hide();
            $(".main").show();
            _this.startTime();
        });
        this.myData();
    },
    //开启倒计时
    startTime : function(){
        $(document).ready(function() {
            $('#countdown18').ClassyCountdown({
                labels: false,
                theme: "flat-colors-black",
                end: 36,
                now: 0,
            });
        });
    },
    //动态写入题目
    inHtml : function(i,data){
        var issueHtml= data.bank[i].question;
        var itemsHtml="<li>"+data.bank[i].option[0]+"</li><li>"+data.bank[i].option[1]+"</li> <li>"+data.bank[i].option[2]+"</li>" ;
        $("#issue").html(issueHtml);
        $("#items").html(itemsHtml);
        this.currentQues++;
    },
    //初始答题页
    initHtml : function(data){
        this.inHtml(0,data);
    },
    //请求到json数据
    myData : function(){
        var _this = this;
        $.getJSON("../data/mydata.json", "", function(data) {
            _this.initHtml(data);
            _this.clickOpt(data);
        })
    },
    //答题效果样式
    changeStyle : function(arg,data){
        var _this = this;
        arg.addClass('current');
        setTimeout(function(){
            var i = arg.index();
            var answer = data.bank[_this.currentQues-1].answer;
            if(answer===i){
                _this.currentGrade++;
                arg.removeClass('current').addClass('yes');
            }else {
                arg.removeClass('current').addClass('no');
            }
        },300);
    },
    //选择答案跳转
    clickOpt :function(data){
        var _this = this;
        $(".options").on('click','li',function(){
            _this.changeStyle($(this),data);
            if(_this.currentQues<10){
                setTimeout(function(){
                    $(".quesCon").fadeOut('fast',function(){
                        _this.inHtml(_this.currentQues,data);
                        $(this).fadeIn('fast');
                    });
                },800)
            }else{
                setTimeout(function(){
                     _this.gameOver();
                },800)
            }
        })
    },
    timeOver :function(){
        var _this = this;
        setTimeout(function(){
            _this.gameOver();
        },35000)
    },
    //游戏结束后页面跳转并写入数据
    gameOver :function (){
        $(".question").hide();
        $(".over").show();
        $("#count").html(this.currentGrade);
        $("#grade").html(this.level());
        $("#level").html(this.level());
    },
    //获得等级判断
    level : function(){
        if(this.currentGrade<4){
            return "小学生";
        }else if(this.currentGrade<6){
            return "初中生";
        }else if(this.currentGrade<8){
            return "高中生";
        }else{
            return "大学生";
        }
    }

};

