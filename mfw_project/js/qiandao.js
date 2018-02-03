$(function () {
    var url="http://120.27.215.48:8081/duifang/servlet/Operation";//签到页面
    var token=localStorage.getItem("token");
    var hongbaojifen;
    var qdnum;
    var qdopt;
    // console.log(token);
    $.ajax({
       url:url,
       data:"opt=qiandao&token="+token,
        type:"post",
        success:function (res,status) {
           if(res.code===200){
               console.log(res);
               $(".jf span").text(res.data.jf);
               $(".receive_jf span").text(res.data.num);
               if(res.data.isqiandao===0){
                   $(".text_qd").text("未签到");//调用两个接口
                   hongbaojifen=res.data.hongbaojifen;
                   qdnum=res.data.num;
                   localStorage.setItem("qdnum",res.data.num);
                   $(".btn-qd").click(function () {
                        $.ajax({
                            url:url,
                            data:"opt=addsign&hongbaojifen="+hongbaojifen+"&num="+qdnum+"&token="+token,
                            type:"post",
                            success:function (res,status) {
                                console.log(res);
                                if(res.code===200){
                                    console.log("签到成功");
                                    $(".text_qd").text("已签到");
                                    qdopt=res.opt;
                                    $.ajax({
                                        url:url,
                                        data:"opt=selsign&token="+token,
                                        type:"post",
                                        success:function (res,status) {
                                            console.log(res);
                                            if(res.code===200){
                                                console.log("查询记录成功！");
                                                console.log(res.data.length);//本月签到时间数
                                                //显示日历弹框

                                            }
                                        }
                                    });
                                }else if(res.code===201){
                                    console.log("签到失败");
                                }else if(res.code===202){
                                    console.log("今日签到");
                                }
                            }
                        })
                   });
               }else if(res.data.isqiandao===1){
                   $(".text_qd").text("已签到");//调用一个接口

               }
                $(".text_day span").text(res.data.continuity_sign);
           }

        }
    });
});