$(function () {
    //获取当前时间
    function p(s) {
        return s < 10 ? '0' + s: s;
    }
    var myDate = new Date();
    var year=myDate.getFullYear();  //获取当前年
    var month=myDate.getMonth()+1;  //获取当前月
    var date=myDate.getDate();      //获取当前日
    var h=myDate.getHours();       //获取当前小时数(0-23)
    var m=myDate.getMinutes();     //获取当前分钟数(0-59)
    var s=myDate.getSeconds();
    var now=year+'-'+p(month)+"-"+p(date)+" "+p(h)+':'+p(m)+":"+p(s);

    var uid=localStorage.getItem("uid");
    //获取列表数据
    $.ajax({
        url:"http://120.27.215.48:8082/duifang/servlet/YuyueServlet",
        data:"opt=weiwanchengxingcheng&uid="+uid,
        type:"post",
        success:function (res,status) {
            console.log(res);
            //列表循环
            for(var i=0;i<res.data.length;i++){
                var yuyuetime = res.data[i].yuyuetime;
                var time=yuyuetime.substr(0,10);
                var state=res.data[i].zhuangtai;
                if(state=="0"||state=="1"||state=="2"){
                    var yuyueStr=`
                        <a class="appoint" data-toggle="modal">
                            <span class="images">
                                <img src="image/cancel.png" alt="">
                            </span>
                            <span>取消预约</span>
                        </a>
                    `
                }else if(state=="4"){
                    //计算时间差
                    var newTime=res.data[i].pipeishijian.replace(/\-/g, "/");
                    var d1 = new Date(newTime);
                    var d2 = new Date(now);
                    var date3=d2.getTime()-d1.getTime();
                    var leave1=date3%(24*3600*1000);
                    var hours=Math.floor(leave1/(3600*1000));
                    var leave2=leave1%(3600*1000);
                    var minutes=Math.floor(leave2/(60*1000));
                    var staStr=`
                    <div class="mMiddle">
                        <span class="images">
                            <img src="image/pipei.png" alt="">
                        </span>
                        <span class="load">匹配中</span>
                    </div>
                    <div class="mBottom">
                        <span class="images">
                            <img src="image/time.png" alt="">
                        </span>
                        <span>已匹配${hours}小时${minutes}分</span>
                        <span class="cuidan">点击催单</span>
                    </div>
                    `
                    var yuyueStr=`
                        <a class="appoint" data-toggle="modal">
                            <span class="images">
                                <img src="image/cancel.png" alt="">
                            </span>
                            <span>取消预约</span>
                        </a>
                    `
                }else if(state=="5"){
                    var staStr=`
                    <div class="mMiddle">
                        <span class="images">
                            <img src="image/server.png" alt="">
                        </span>
                        <span class="server">待服务</span>
                    </div>
                    `
                }else if(state=="6"){
                    var staStr=`
                    <div class="mMiddle">
                        <span class="images">
                            <img src="image/server.png" alt="">
                        </span>
                        <span class="server">服务中</span>
                    </div>
                    `
                }else if(state=="7"){
                    var staStr=`
                    <div class="mMiddle">
                        <span class="images">
                            <img src="image/wait.png" alt="">
                        </span>
                        <span class="ping">去评论</span>
                    </div>
                    `
                }
                var doc=`
<div class="list">
    <div class="listBox" yuyue="${res.data[i].yuyueid}">
        <div class="left">
            <img src="${res.data[i].loupanpic}" alt="">
        </div>
        <div class="middle">
            <div class="mTop" data-toggle="modal">
                <span class="time">${time}</span>
                <span class="title">${res.data[i].loupanname}</span>
            </div>
            ${staStr?staStr:""}
        </div>
        <div class="right">
            ${yuyueStr?yuyueStr:""}
            <a class="connect" href="tel:${res.data[i].guwenphone}">
                <span class="images">
                    <img src="image/phone.png" alt="">
                </span>
                <span>联系咨询</span>
            </a>
        </div>
    </div>
</div>
`


                $(doc).appendTo($(".lists"));
            }
            //评论
            $(".ping").click(function () {
                var yuyueid=$(this).parents(".listBox").attr("yuyue");
                localStorage.setItem("yuyueid",yuyueid);
                location.href="./review.html";

            })
            //催单
            $(".cuidan").click(function () {
                var these=$(this);
                var neirong=$(this).html();
                if(neirong=="已催单"){
                    return false;
                }else {
                    var yuyueid=$(this).parents(".listBox").attr("yuyue");
                    $.ajax({
                        url:"http://120.27.215.48:8082/duifang/servlet/YuyueServlet",
                        data:"opt=cuidan&yuyueid="+yuyueid,
                        type:"post",
                        success:function (res,status) {
                            console.log(res);
                            if(res.code==200){
                                these.html("已催单");
                            }
                        }
                    })
                }
            })
            //取消预约
            $(".appoint").click(function () {
                var these=$(this);
                var yuyueid=$(this).parents(".listBox").attr("yuyue");
                // console.log(yuyueid);
                these.attr("data-target","#delete");
                $.ajax({
                    url:"http://120.27.215.48:8082/duifang/servlet/YuyueServlet",
                    data:"opt=quxiaoyuyue&yuyueid="+yuyueid,
                    type:"post",
                    success:function (res,status) {
                        console.log(res);
                    }
                })
            })
            // 获取模态框详情数据
            $(".mTop").click(function () {
                var these=$(this);
                var yuyueid=$(this).parents(".listBox").attr("yuyue");
                these.attr("data-target","#detail");
                $.ajax({
                    url:"http://120.27.215.48:8082/duifang/servlet/YuyueServlet",
                    data:"opt=weiwanchengxiangqing&yuyueid="+yuyueid,
                    type:"post",
                    success:function (res,status) {
                        console.log(res);
                        var yuyuetimes=res.data.yuyuetime;
                        var date=yuyuetimes.substr(0,10);
                        var times=yuyuetimes.substr(12,16);
                        var detailStr=`
                        <p class="content">${date}</p>
                        <p class="content">${times}</p>
                        <p class="content">预约地点:${res.data.yuyuedidian}</p>
                        <p class="content">联系方式:${res.data.guwenphone}</p>
                        <p class="content">预约人数:${res.data.yuyuerenshu}人</p>
                    `;

                        $(".modal-body").html("");
                        $(detailStr).appendTo($("#detail .modal-body"));
                        return;
                    }
                })
            })

        }
    })
})