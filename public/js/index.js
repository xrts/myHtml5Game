var queAndAns = {
    currentQues:0,//记录当前题目序号
    currentGrade:0,//记录当前分数
    allData:null,//题库
    init: function(){
        this.toMain();
    },
    //跳转到答题页
    toMain : function(){
        $('.rules').click(function(){
            $('.award').fadeIn();
        });
        $('.clsBtn').click(function(){
            $('.award').fadeOut();
        });
        $("#start").click(function(){
            queAndAns.myData();
            $(".start").hide();
            $(".main").fadeIn('fast',function(){

                queAndAns.timeOver();
                queAndAns.startTime();
            });

        });
    },
    //开启倒计时
    startTime : function(){
        $('#countdown18').ClassyCountdown({
            labels: false,
            theme: "flat-colors-black",
            end: 36,
            now: 0
        });

    },
    //动态写入题目
    inHtml : function(i,data){
        if(!data.bank[i]) return;
        var issueHtml= data.bank[i].question;
        var itemsHtml="<li>"+data.bank[i].option[0]+"</li><li>"+data.bank[i].option[1]+"</li> <li>"+data.bank[i].option[2]+"</li>" ;
        $("#issue").html(issueHtml);
        $("#items").html(itemsHtml);
        this.currentQues++;
        $("#currentNum").html(this.currentQues);
    },
    //请求到json数据
    myData : function(){
        var _this = this;
        $.getJSON("../data/mydata.json", "", function(data) {
            _this.inHtml(0,data);
            _this.clickOpt(data);
            _this.allData = data;
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
        },200);
    },
    //选择答案
    clickOpt :function(){
        $(".options li").on('click',queAndAns.allData,this.renderAndBind);
    },
    //渲染题目并绑定click
    renderAndBind:function(){
        $(".options li").unbind('click');
        queAndAns.changeStyle($(this), queAndAns.allData);
        if (queAndAns.currentQues < 10) {
            setTimeout(function () {
                $(".quesCon").fadeOut(100, function () {
                    queAndAns.inHtml(queAndAns.currentQues, queAndAns.allData);
                    $(this).fadeIn(500,function(){
                        $(".options li").on('click', queAndAns.renderAndBind);
                    });
                });
            }, 300)
        } else {
            setTimeout(function () {
                queAndAns.gameOver();
            }, 200)
        }
    },
    //计时
    timeOver :function(){
        var _this = this;
        setTimeout(function(){
            _this.gameOver();
        },35000)
    },
    //游戏结束后页面跳转并写入数据、分享
    gameOver :function (){
        $(".question").hide();
        $(".head").hide();
        $(".scores").fadeIn();
        $("#count").html(this.currentGrade);
        $("#grade").html(this.level().level);
        $("#level").html(this.level().level);
        $("#comments").html(this.level().comments);
        //分享页
        $('.toAwd').click(function(){
            $('.shareC').show();
        });
        $('.shareC').click(function(){
            $(this).fadeOut();
        });
    },
    //获得等级判断
    level : function(){
        if(this.currentGrade<4){
            return {level:'幼儿园小班',comments:'骚年，这个分数还敢回家？早被老爸打成屁股开花。'};
        }else if(this.currentGrade<6){
            return {level:'小学一年级',comments:'你离大学还有10年的距离'};
        }else if(this.currentGrade<8){
            return {level:'高中生',comments:'可惜，就差0.01分，你就实现人生巅峰'};
        }else{
            return {level:'大学生',comments:'恭喜你成功晋级“天之骄子”'};
        }
    }

};

