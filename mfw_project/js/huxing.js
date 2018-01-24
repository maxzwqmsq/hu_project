$(function () {
    //思路：先调户型类型接口，返回所有户型、对应户型类型id
    //调楼盘户型列表接口，点那个户型传哪个id
    //楼盘id从localStorage里拿
    var url1="http://120.27.215.48:8081/duifang/servlet/Houses";
    var lpid=localStorage.getItem("lpid");
    var page=0;
    var arr=[];
    var hxlxid;
    var loadData = false;
    $.ajax({
        url:url1+"?opt=huxing",
        type:"post",
        success:function (res,status) {
            for(var i=0;i<res.data.length;i++){
                $(".in").append("<a href='#'>"+res.data[i].name+"</a>");
            }
        }
    });
     // getHXData();
    function getHXData(){
        loadData = true;
        $.ajax({
            url:url1+"?opt=loupanhuxing&id="+lpid+"&page="+page+"&row=10",
            type:"post",
            success:function (res,status) {
                console.log("户型个数:"+res.data.length);
                for(var i=0;i<res.data.length;i++){
                    $(".hx_show").append("<li class='hx"+page+i+"'><img src='"+res.data[i].pic+"'><p class='hx_name'>"
                        +res.data[i].shi+"室"+
                        res.data[i].ting+"厅"+
                        +res.data[i].wei+"卫"+
                        "<span class='mianji'>"+res.data[i].area
                        +"</span><span class='jiage'>"+
                        res.data[i].price+"万元/套</span></p><p class='hx_wz'>"+
                        "<span class='nn'>"
                        +res.data[i].name+res.data[i].price+"m2</span><span class='tag label"+i+"'></span>"+
                        "<span class='tag label"+i+"'>"+
                        "</span><span class='tag label"+i+"'>"+
                        "</span></p><a class='zs'><img src='images/在售.png'></a>"
                        +"</li>");
                    var str="label"+i;
                    if(res.data[i].lable.length===0){
                        $("."+str).hide();
                    }else if(res.data[i].lable.length===1){
                        $("."+str).eq(0).text(res.data[i].lable[0].name);
                        $("."+str).eq(0).css({
                            color:res.data[i].lable[0].color,
                            "border-color":res.data[i].lable[0].color
                        });
                        $("."+str).eq(1).hide();
                        $("."+str).eq(2).hide();
                    }else if(res.data[i].lable.length===2){
                        $("."+str).eq(0).text(res.data[i].lable[0].name);
                        $("."+str).eq(0).css({
                            color:res.data[i].lable[0].color,
                            "border-color":res.data[i].lable[0].color
                        });
                        $("."+str).eq(1).text(res.data[i].lable[1].name);
                        $("."+str).eq(1).css({
                            color:res.data[i].lable[0].color,
                            "border-color":res.data[i].lable[1].color
                        });
                        $("."+str).eq(2).hide();
                    }else{
                        $("."+str).eq(0).text(res.data[i].lable[0].name);
                        $("."+str).eq(0).css({
                            color:res.data[i].lable[0].color,
                            "border-color":res.data[i].lable[0].color
                        });
                        $("."+str).eq(1).text(res.data[i].lable[1].name);
                        $("."+str).eq(1).css({
                            color:res.data[i].lable[1].color,
                            "border-color":res.data[i].lable[1].color
                        });
                        $("."+str).eq(2).text(res.data[i].lable[2].name);
                        $("."+str).eq(2).css({
                            color:res.data[i].lable[2].color,
                            "border-color":res.data[i].lable[2].color
                        });
                    }
                    if(res.data[i].status==="1"){
                        $("a.zs").text("代售");
                    }else if(res.data[i].status==="2"){
                        $("a.zs").text("代售");
                    }else if(res.data[i].status==="3"){
                        $("a.zs").text("售罄");
                    }

                    var str1="hx"+page+i;
                    arr.push({"li":str1,"hxid":res.data[i].ids});
                    console.log(arr);
                    $(".hx_show li").click(function () {
                        var cname=$(this)[0].className;
                        console.log(cname);
                        for(var j=0;j<arr.length;j++){
                            if(cname===arr[j].li){
                                var hxid=arr[j].hxid;
                                localStorage.setItem("hxid",hxid);
                                $(window).attr("location","hxxq.html");
                            }
                        }
                    })
                }
                loadData = false;
            }
        });
    }


    //左滑导航样式
    $(".inner .in").on("click","a",function () {
        $(this).addClass("active").siblings("a").removeClass("active");
        var hxname=$(this).text();
        if(hxname==="全部"){
          $(".hx_show").empty();
            getHXData();
        }else{
            $(".hx_show").empty();
            $.ajax({
                url:url1+"?opt=huxing",
                type:"post",
                success:function (res,status) {
                    for(var i=0;i<res.data.length;i++){
                        if(hxname===res.data[i].name){
                            hxlxid=res.data[i].ids;
                            console.log("户型类型id:"+hxlxid);
                            $.ajax({
                                url:url1+"?opt=loupanhuxing&id="+lpid+"&type="+hxlxid+"&page="+page+"&row=10",
                                type:"post",
                                success:function (res,status) {
                                    console.log(res);
                                    $(".hx_show").empty();
                                    for(var i=0;i<res.data.length;i++){
                                        $(".hx_show").append("<li class='hx"+page+i+"'><img src='"+res.data[i].pic+"'><p class='hx_name'>"
                                            +res.data[i].shi+"室"+
                                            res.data[i].ting+"厅"+
                                            +res.data[i].wei+"卫"+
                                            "<span class='mianji'>"+res.data[i].area
                                            +"</span><span class='jiage'>"+
                                            res.data[i].price+"万元/套</span></p><p class='hx_wz'>"+
                                            "<span class='nn'>"
                                            +res.data[i].name+res.data[i].price+"m2</span><span class='tag label"+i+"'></span>"+
                                            "<span class='tag label"+i+"'>"+
                                            "</span><span class='tag label"+i+"'>"+
                                            "</span></p><a class='zs'><img src='images/在售.png'></a>"
                                            +"</li>");
                                        var str="label"+i;
                                        if(res.data[i].lable.length===0){
                                            $("."+str).hide();
                                        }else if(res.data[i].lable.length===1){
                                            $("."+str).eq(0).text(res.data[i].lable[0].name);
                                            $("."+str).eq(0).css({
                                                color:res.data[i].lable[0].color,
                                                "border-color":res.data[i].lable[0].color
                                            });
                                            $("."+str).eq(1).hide();
                                            $("."+str).eq(2).hide();
                                        }else if(res.data[i].lable.length===2){
                                            $("."+str).eq(0).text(res.data[i].lable[0].name);
                                            $("."+str).eq(0).css({
                                                color:res.data[i].lable[0].color,
                                                "border-color":res.data[i].lable[0].color
                                            });
                                            $("."+str).eq(1).text(res.data[i].lable[1].name);
                                            $("."+str).eq(1).css({
                                                color:res.data[i].lable[0].color,
                                                "border-color":res.data[i].lable[1].color
                                            });
                                            $("."+str).eq(2).hide();
                                        }else{
                                            $("."+str).eq(0).text(res.data[i].lable[0].name);
                                            $("."+str).eq(0).css({
                                                color:res.data[i].lable[0].color,
                                                "border-color":res.data[i].lable[0].color
                                            });
                                            $("."+str).eq(1).text(res.data[i].lable[1].name);
                                            $("."+str).eq(1).css({
                                                color:res.data[i].lable[1].color,
                                                "border-color":res.data[i].lable[1].color
                                            });
                                            $("."+str).eq(2).text(res.data[i].lable[2].name);
                                            $("."+str).eq(2).css({
                                                color:res.data[i].lable[2].color,
                                                "border-color":res.data[i].lable[2].color
                                            });
                                        }
                                        if(res.data[i].status==="1"){
                                            $("a.zs").text("代售");
                                        }else if(res.data[i].status==="2"){
                                            $("a.zs").text("代售");
                                        }else if(res.data[i].status==="3"){
                                            $("a.zs").text("售罄");
                                        }

                                        var str1="hx"+page+i;
                                        arr.push({"li":str1,"hxid":res.data[i].ids});
                                        console.log(arr);
                                        $(".hx_show li").click(function () {
                                            var cname=$(this)[0].className;
                                            console.log(cname);
                                            for(var j=0;j<arr.length;j++){
                                                if(cname===arr[j].li){
                                                    var hxid=arr[j].hxid;
                                                    localStorage.setItem("hxid",hxid);
                                                    $(window).attr("location","hxxq.html");
                                                }
                                            }
                                        })
                                    }
                                }
                            });
                        }
                    }
                }
            });
        }
    });

    $(window).scroll(function () {

        var scrollTop = $(this).scrollTop();//滚动高度
        var scrollHeight = $(".hx_show").height()+$(".nav").height()+$(".lead").height()+$(".wrapper").height()+35;//内容高度
        var windowHeight = $(this).height();//可见高度
        // console.log("滚动高度:"+scrollTop);
        // console.log("内容高度:"+scrollHeight);
        // console.log("可见高度:"+windowHeight);
        if (scrollTop + windowHeight >= scrollHeight) {
            // console.log("您已到达底部");
            // console.log("page:"+page);
            if(!loadData){
                page+=1;
                getHXData();
            }
            // flag=true;
        }
        $(".mask").css({
            "top":scrollTop
        })
    });

    //默认点击全部
    $(".in a").eq(0).trigger("click");
});