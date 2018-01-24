$(function () {
//思路：户型id已得到。显示就行了。
    var userid="77";
    var hxid=localStorage.getItem("hxid");
    var url1="http://120.27.215.48:8081/duifang/servlet/Houses";
    $.ajax({
        url:url1+"?opt=huxingxiangqing&userid="+userid+"&id="+hxid,
        type:"post",
        success:function (res,status) {
            if(res.code===200){
                console.log(res);
                $(".hx_jiage .wan").text(res.data.json.price);
                //判断销售状态
                if(res.data.json.status==="1"){
                    $(".hx_zs").text("代售");
                }else if(res.data.json.status==="2"){
                    $(".hx_zs").text("在售");
                }else if(res.data.json.status==="3"){
                    $(".hx_zs").text("售罄");
                }else{
                    $(".hx_zs").text("");
                }
                //判断标签
                $hx_label=$(".hx_label");
                if(res.data.json.lable.length===0){
                    $hx_label.hide();
                }else if(res.data.json.lable.length===1){
                    $hx_label.eq(1).hide();
                    $hx_label.eq(2).hide();
                    $hx_label.eq(0).text(res.data.json.lable[0].name);
                    $hx_label.eq(0).css({
                        color:res.data.json.lable[0].color,
                        "border-color":res.data.json.lable[0].color
                    })
                }else if(res.data.json.lable.length===2){
                    $hx_label.eq(2).hide();
                    $hx_label.eq(0).text(res.data.json.lable[0].name);
                    $hx_label.eq(0).css({
                        color:res.data.json.lable[0].color,
                        "border-color":res.data.json.lable[0].color
                    });
                    $hx_label.eq(1).text(res.data.json.lable[1].name);
                    $hx_label.eq(1).css({
                        color:res.data.json.lable[1].color,
                        "border-color":res.data.json.lable[1].color
                    })
                }else if(res.data.json.lable.length===2){
                    $hx_label.eq(0).text(res.data.json.lable[0].name);
                    $hx_label.eq(0).css({
                        color:res.data.json.lable[0].color,
                        "border-color":res.data.json.lable[0].color
                    });
                    $hx_label.eq(1).text(res.data.json.lable[1].name);
                    $hx_label.eq(1).css({
                        color:res.data.json.lable[1].color,
                        "border-color":res.data.json.lable[1].color
                    });
                    $hx_label.eq(2).text(res.data.json.lable[2].name);
                    $hx_label.eq(2).css({
                        color:res.data.json.lable[2].color,
                        "border-color":res.data.json.lable[2].color
                    })
                }

                //面积和布局
                $(".hx_thir .shi").text(res.data.json.shi);
                $(".hx_thir .wei").text(res.data.json.wei);
                $(".hx_thir .ting").text(res.data.json.ting);
                $(".hx_thir .name").text(res.data.json.l_name);
                $(".hx_thir .mianji").text(res.data.json.area);

                //地址
                $(".hx_dz .dz").text(res.data.json.address);
                //户型详情
                var jsc=res.data.json.content;
                $(".js_content").text(jsc);
                $(".js_content")
            }
                $k_1=$(".k_1");
            for(var j=0;j<res.data.json_qtlist.length;j++){
                $k_1.eq(j).children("img").attr("src",res.data.json_qtlist[j].pic_lp);
                $k_1.eq(j).children(".shi").text(res.data.json_qtlist[j].shi);
                $k_1.eq(j).children(".ting").text(res.data.json_qtlist[j].ting);
                $k_1.eq(j).children(".wei").text(res.data.json_qtlist[j].wei);
                $k_1.eq(j).children(".m2").text(res.data.json_qtlist[j].area);
                $k_1.eq(j).children(".k_sj").children(".ww").text(res.data.json_qtlist[j].price);
                $k_1.eq(j).children(".k_sj").children(".dd").text(res.data.json_qtlist[j].address);

            }
            $k_1.eq(0).click(function () {
                localStorage.setItem("hxid",res.data.json_qtlist[0].ids);
                $(window).attr("location","hxxq.html");
            });
            $k_1.eq(1).click(function () {
                localStorage.setItem("hxid",res.data.json_qtlist[1].ids);
                $(window).attr("location","hxxq.html");
            });
            $k_1.eq(2).click(function () {
               localStorage.setItem("hxid",res.data.json_qtlist[2].ids);
                $(window).attr("location","hxxq.html");
            });
            $k_1.eq(3).click(function () {
                localStorage.setItem("hxid",res.data.json_qtlist[3].ids);
                $(window).attr("location","hxxq.html");
            });


            //轮播
            if(res.data.json_kxlist.length===0){
                $(".lunbo").empty();
                $(".lunbo").append("<img src='images/11.png' class='zhanwei'>");
            }else if(res.data.json_kxlist.length>0){
                for(var k=0;k<res.data.json_kxlist.length;k++){
                    $(".swiper-container .swiper-wrapper").append("<div class='swiper-slide'><img src='"+
                        res.data.json_kxlist[k].pic_lp+"'></div>");
                }
            }


        }
    })
});