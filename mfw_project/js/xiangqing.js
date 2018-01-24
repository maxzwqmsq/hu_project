$(function () {
    var userid="77";
   var lpid=localStorage.getItem("lpid");
   console.log("lpid:"+lpid);
   url1="http://120.27.215.48:8081/duifang/servlet/Houses";
   $.ajax({
       url:url1+"?opt=loupanxinxi&id="+lpid+"&userid="+userid,
       type:"post",
       success:function (res,status) {
           console.log(res);
           //存储图片、价格、名字
           localStorage.setItem("img1",res.data.JSONxiaoxi.ban_pic);
           localStorage.setItem("price1",res.data.JSONxiaoxi.unit_price);
           localStorage.setItem("title1",res.data.JSONxiaoxi.title);

          $(".lp_name span").eq(0).text(res.data.JSONxiaoxi.title);
           if(res.data.JSONxiaoxi.status==="1"){
                $(".lp_name").eq(1).text("代售");
           }else if(res.data.JSONxiaoxi.status==="2"){
               $(".lp_name").eq(1).text("在售");
           }else if(res.data.JSONxiaoxi.status==="3"){
               $(".lp_name").eq(1).text("售罄");
           }
            if(res.data.JSONxiaoxi.zx==="1"){
               $(".lp_name").eq(1).text("精装");
           }else if(res.data.JSONxiaoxi.status==="2"){
               $(".lp_name").eq(1).text("毛坯");
           }else if(res.data.JSONxiaoxi.status==="3"){
               $(".lp_name").eq(1).text("简装");
           }
            $(".lp_price").text(res.data.JSONxiaoxi.unit_price+"元/m2");
           $("span.dz").text(res.data.JSONxiaoxi.address);
           $(".sltime").text(res.data.JSONxiaoxi.start_time);
           // $("span.junjia").text(res.data.JSONxiaoxi.selling_price);
           $(".lp_content").text(res.data.JSONxiaoxi.content);
           //楼盘动态--广告
           if(res.data.JSONxiaoxi.pic_adv.length===0){
               $(".lp_adv").hide();
           }else{
               $(".lp_adv").css({
                   "background":"url('"+res.data.JSONxiaoxi.pic_adv+"')",
                   "background-size":"100%"
               });
           }
            if(res.data.jsondp_list.length>0){
                //添加点评信息!!!写了
                console.log("有点评");
                for(var k=0;k<res.data.jsondp_list.length;k++){
                    $("ul.dp_xiangqing").append("<li class='dp_tx_1'><img class='tx' src='"+
                    res.data.jsondp_list[k].pic_dp+"'><a class='dp_name_1'>"+
                        res.data.jsondp_list[k].name+"<img src='images/图层23.png'></a><span class='pj'>"
                        +"<img src='images/评价5星.png'></span><p class='dp_content_1'>"+
                        res.data.jsondp_list[k].content+"<a class='zhankai'>展开全部</a>"
                        +"<div class='pic'><img src='"+res.data.jsondp_list[k].pic1+"'><img src='"+
                        res.data.jsondp_list[k].pic2+"'><img src='"+
                        res.data.jsondp_list[k].pic3+"'></div><span class='dp_rq'>"+
                        res.data.jsondp_list[k].time+"</span><img src='images/点赞.png'><span class='dz_rs'>"+
                        res.data.jsondp_list[k].point+"</span></p>"
                        +"</li>")
                }
            }else if(res.data.jsondp_list.length===0){
                console.log("没有点评");
                $dp_xiangqing=$("ul.dp_xiangqing");
                $dp_xiangqing.empty();
                $dp_xiangqing.text("暂无");
            }
            var quid=res.data.JSONxiaoxi.quid;
            console.log("区域id:"+quid);
            var lxid=res.data.JSONxiaoxi.bul_type;
           $duibi_li=$(".duibi li");
            $.ajax({
                url:url1+"?opt=loupanduibi&area="+quid,
                type:"post",
                success:function (res,status) {
                    console.log("楼盘对比返回结果");
                    console.log(res);
                    for(var i=0;i<res.data.length;i++){
                        $duibi_li.eq(i).children("img").attr("src",res.data[i].pic);
                        $duibi_li.eq(i).children("p").eq(0).text(res.data[i].title);
                        $duibi_li.eq(i).children("p").eq(1).text(res.data[i].unit_price+"元/m2");
                        if(res.data[i].label_list.length===0){
                            $(".duibi li").eq(i).children(".zs_span").hide();
                        }else if(res.data[i].label_list.length===1){
                            $duibi_li.eq(i).children(".zs_span").eq(1).hide();
                            $duibi_li.eq(i).children(".zs_span").eq(0).css({
                                "color":res.data[i].label_list[0].color,
                                "border-color":res.data[i].label_list[0].color
                            });
                            $duibi_li.eq(i).children(".zs_span").eq(0).text(res.data[i].label_list[0].name);
                        }else if(res.data[i].label_list.length===2){
                            $(".duibi li ").eq(i).children(".zs_span").eq(0).css({
                                "color":res.data[i].label_list[0].color,
                                "border-color":res.data[i].label_list[0].color
                            });
                            $(".duibi li ").eq(i).children(".zs_span").eq(0).text(res.data[i].label_list[0].name);
                            $(".duibi li ").eq(i).children(".zs_span").eq(1).css({
                                "color":res.data[i].label_list[1].color,
                                "border-color":res.data[i].label_list[1].color
                            });
                            $(".duibi li ").eq(i).children(".zs_span").eq(1).text(res.data[i].label_list[1].name);
                        }
                        if(res.data[i].status==="1"){
                            $(".duibi li").eq(i).children(".zaishou").children(".zs").text("代售");
                        }else if(res.data[i].status==="2"){
                            $(".duibi li").eq(i).children(".zaishou").children(".zs").text("在售");
                        }else{
                            $duibi_li.eq(i).children(".zaishou").children(".zs").text("售罄");
                        }

                        //----点击获取楼盘id
                        $duibi_li.eq(0).click(function () {
                            var lpid1=res.data[0].ids;
                            localStorage.setItem("lpid",lpid1);
                            $(window).attr("location","xiangqing.html");
                        });
                        $duibi_li.eq(1).click(function () {
                            var lpid1=res.data[1].ids;
                            localStorage.setItem("lpid",lpid1);
                            $(window).attr("location","xiangqing.html");
                        });
                        $duibi_li.eq(2).click(function () {
                            var lpid1=res.data[2].ids;
                            localStorage.setItem("lpid",lpid1);
                            $(window).attr("location","xiangqing.html");
                        });
                    }
                }
            });

           $(".lp_duibi a").eq(0).click(function () {
               $.ajax({
                   url:url1+"?opt=loupanduibi&area="+quid,
                   type:"post",
                   success:function (res,status) {
                       console.log("楼盘对比返回结果");
                       console.log(res);
                       for(var i=0;i<res.data.length;i++){
                           $duibi_li.eq(i).children("img").attr("src",res.data[i].pic);
                           $duibi_li.eq(i).children("p").eq(0).text(res.data[i].title);
                           $duibi_li.eq(i).children("p").eq(1).text(res.data[i].unit_price+"元/m2");
                           console.log(res.data[i].label_list.length);
                           if(res.data[i].label_list.length===0){
                               $(".duibi li").eq(i).children(".zs_span").css({
                                   "color":"transparent",
                                   "border-color":"transparent"
                               });
                           }else if(res.data[i].label_list.length===1){
                               $duibi_li.eq(i).children(".zs_span").eq(1).css({
                                   "color":"transparent",
                                   "border-color":"transparent"
                               });
                               $duibi_li.eq(i).children(".zs_span").eq(0).css({
                                   "color":res.data[i].label_list[0].color,
                                   "border-color":res.data[i].label_list[0].color
                               });
                               $duibi_li.eq(i).children(".zs_span").eq(0).text(res.data[i].label_list[0].name);
                           }else if(res.data[i].label_list.length===2){
                               $duibi_li.eq(i).children(".zs_span").eq(0).css({
                                   "color":res.data[i].label_list[0].color,
                                   "border-color":res.data[i].label_list[0].color
                               });
                               $duibi_li.eq(i).children(".zs_span").eq(0).text(res.data[i].label_list[0].name);
                               $duibi_li.eq(i).children(".zs_span").eq(1).css({
                                   "color":res.data[i].label_list[1].color,
                                   "border-color":res.data[i].label_list[1].color
                               });
                               $duibi_li.eq(i).children(".zs_span").eq(1).text(res.data[i].label_list[1].name);
                           }

                       }
                   }
               });
               $(this).css({
                   "color":"#4faafd",
                   "border-bottom":".1rem solid #4faafd"
               }).siblings("a").css({
                   "color":"black",
                   "border-bottom":".1rem solid #dcdcdc"
               });
           });
           $(".lp_duibi a").eq(1).click(function () {
               $(this).css({
                   "color":"#4faafd",
                  "border-bottom":".1rem solid #4faafd"
               }).siblings("a").css({
                   "color":"black",
                   "border-bottom":".1rem solid #dcdcdc"
               });
               $.ajax({
                   url:url1+"?opt=loupanduibi&building_types="+lxid,
                   type:"post",
                   success:function (res,status) {
                       console.log("楼盘对比返回结果");
                       for(var i=0;i<res.data.length;i++){
                           $(".duibi li").eq(i).children("img").attr("src",res.data[i].pic);
                           $(".duibi li").eq(i).children("p").eq(0).text(res.data[i].title);
                           $(".duibi li").eq(i).children("p").eq(1).text(res.data[i].unit_price+"元/m2");
                           if(res.data[i].label_list.length===0){
                               $(".duibi li").eq(i).children(".zs_span").css({
                                   "color":"transparent",
                                   "border-color":"transparent"
                               });
                           }else if(res.data[i].label_list.length===1){
                               $(".duibi li ").eq(i).children(".zs_span").eq(1).css({
                                   "color":"transparent",
                                   "border-color":"transparent"
                               });
                               $(".duibi li ").eq(i).children(".zs_span").eq(0).css({
                                   "color":res.data[i].label_list[0].color,
                                   "border-color":res.data[i].label_list[0].color
                               });
                               $(".duibi li ").eq(i).children(".zs_span").eq(0).text(res.data[i].label_list[0].name);
                           }else if(res.data[i].label_list.length===2){
                               $(".duibi li ").eq(i).children(".zs_span").eq(0).css({
                                   "color":res.data[i].label_list[0].color,
                                   "border-color":res.data[i].label_list[0].color
                               });
                               $(".duibi li ").eq(i).children(".zs_span").eq(0).text(res.data[i].label_list[0].name);
                               $(".duibi li ").eq(i).children(".zs_span").eq(1).css({
                                   "color":res.data[i].label_list[1].color,
                                   "border-color":res.data[i].label_list[1].color
                               });
                               $(".duibi li ").eq(i).children(".zs_span").eq(1).text(res.data[i].label_list[1].name);
                           }

                           //----点击获取楼盘id
                           $duibi_li.eq(0).click(function () {
                               var lpid1=res.data[0].ids;
                               localStorage.setItem("lpid",lpid1);
                               $(window).attr("location","xiangqing.html");
                           });
                           $duibi_li.eq(1).click(function () {
                               var lpid1=res.data[1].ids;
                               localStorage.setItem("lpid",lpid1);
                               $(window).attr("location","xiangqing.html");
                           });
                           $duibi_li.eq(2).click(function () {
                               var lpid1=res.data[2].ids;
                               localStorage.setItem("lpid",lpid1);
                               $(window).attr("location","xiangqing.html");
                           });
                       }
                   }
               })
           });


           //楼盘信息
            $(".ld_info img").eq(0).attr("src",res.data.JSONxiaoxi.ban_pic);

            //轮播
           if(res.data.json_kxlist.length===0){
               $(".lunbo").empty();
               $(".lunbo").append("<img src='images/11.png' class='zhanwei'>");
           }else if(res.data.json_kxlist.length>0){
               for(var j=0;j<res.data.json_kxlist.length;j++){
                   $(".swiper-container .swiper-wrapper").append("<div class='swiper-slide'><img src='"+
                       res.data.json_kxlist[j].pic_lp+"'></div>");
               }
           }

           //周边设施
           $zbsheshi=$(".lp_zhoubian a");
           $zbsheshi.eq(0).click(function () {
                localStorage.setItem("longitude",res.data.JSONxiaoxi.longitude);
                localStorage.setItem("latitude",res.data.JSONxiaoxi.latitude);
                $(window).attr("location","transport.html");
           });
           $zbsheshi.eq(1).click(function () {
               localStorage.setItem("longitude",res.data.JSONxiaoxi.longitude);
               localStorage.setItem("latitude",res.data.JSONxiaoxi.latitude);
               $(window).attr("location","school.html");
           });
           $zbsheshi.eq(2).click(function () {
               localStorage.setItem("longitude",res.data.JSONxiaoxi.longitude);
               localStorage.setItem("latitude",res.data.JSONxiaoxi.latitude);
               $(window).attr("location","hospital.html");
           });
           $zbsheshi.eq(3).click(function () {
               localStorage.setItem("longitude",res.data.JSONxiaoxi.longitude);
               localStorage.setItem("latitude",res.data.JSONxiaoxi.latitude);
               $(window).attr("location","shopping.html");
           });
           
           //路线
           $(".lp_inform .road").click(function () {
               localStorage.setItem("longitude",res.data.JSONxiaoxi.longitude);
               localStorage.setItem("latitude",res.data.JSONxiaoxi.latitude);
               localStorage.setItem("region",res.data.JSONxiaoxi.shi);
               localStorage.setItem("title",res.data.JSONxiaoxi.title);
               localStorage.setItem("dizhi",res.data.JSONxiaoxi.address);
               $(window).attr("location","road.html");
           });


           //楼栋信息
           $info_li=$(".info_li li");
           console.log("坐标个数:"+res.data.ban.length);
           if(res.data.ban.length===0){
               $info_li.eq(0).children("span").text("");
               $info_li.eq(1).children("span").text("");
               $info_li.eq(2).children("span").text("");
               $info_li.eq(3).children("span").text("");
               $info_li.eq(4).children("span").text("");
               $info_li.eq(5).children("span").text("");
           }else{
               $info_li.eq(0).children("span").text(res.data.ban[0].unit_number);
               $info_li.eq(1).children("span").text(res.data.ban[0].ladder);
               $info_li.eq(2).children("span").text(res.data.ban[0].floor);
               $info_li.eq(3).children("span").text(res.data.ban[0].households);
               $info_li.eq(4).children("span").text(res.data.ban[0].opentime.split(" ",1));
               $info_li.eq(5).children("span").text(res.data.ban[0].otherhousetime.split(" ",1));
               for(var t=0;t<res.data.ban.length;t++){
                   $(".ld_info").append("<div class='lpdd'></div>");
                   console.log("left:"+parseInt(res.data.ban[t].x*(359/res.data.JSONxiaoxi.wide)));
                   console.log("top:"+parseInt(res.data.ban[t].y*(240/res.data.JSONxiaoxi.high)));
                   $(".lpdd").eq(t).text(res.data.ban[t].name);
                   $(".lpdd").eq(t).css({
                       "left":parseInt(res.data.ban[t].x*(359/res.data.JSONxiaoxi.wide))-54+"px",
                       "top":parseInt(res.data.ban[t].y*(240/res.data.JSONxiaoxi.high))-60+"px"
                   });
                   /*$(".lpdd").eq(t).click(function () {
                       $info_li.eq(0).children("span").text(res.data.ban[t].unit_number+"个单元");
                       $info_li.eq(1).children("span").text(res.data.ban[t].ladder);
                       $info_li.eq(2).children("span").text(res.data.ban[t].floor+"层");
                       $info_li.eq(3).children("span").text(res.data.ban[t].households);
                       $info_li.eq(4).children("span").text(res.data.ban[t].opentime.split(" ",1));
                       $info_li.eq(5).children("span").text(res.data.ban[t].otherhousetime.split(" ",1));
                   })*/
                   (function (t) {
                       $(".lpdd").eq(t).click(function () {
                           $info_li.eq(0).children("span").text(res.data.ban[t].unit_number+"个单元");
                           $info_li.eq(1).children("span").text(res.data.ban[t].ladder);
                           $info_li.eq(2).children("span").text(res.data.ban[t].floor+"层");
                           $info_li.eq(3).children("span").text(res.data.ban[t].households);
                           $info_li.eq(4).children("span").text(res.data.ban[t].opentime.split(" ",1));
                           $info_li.eq(5).children("span").text(res.data.ban[t].otherhousetime.split(" ",1));
                       })
                   })(t);
               }
           }

           //问答
           if(res.data.json_cxwt.id_cxwt){
                console.log("有问题");
                $(".wenti").append("<li class='wen'><img src='images/问.png'><span class='wt'>"+
                    res.data.json_cxwt.title+"</span><img src='images/collect.png' class='xx'><p class='see'>"
                    +"<span><img src='images/查看_jammy.png' class='k'>"+res.data.json_cxwt.see
                    +"<span class='rq'>"+res.data.json_cxwt.createtime.split(" ",1)+"</span><span class='df'>"+
                    res.data.json_cxwt.l_name+"</span>"
                    +"</p>"
                    +"</li>");

               if(res.data.json_cxwt.count_hd>0){
                   $(".huida .fi span").text("共"+res.data.json_cxwt.count_hd+"条回答");
                for(var p=0;p<res.data.json_cxwt.count_hd;p++){
                    $(".huida").append("<li class='c'><img src='"+res.data.json_cxwt.pic+"'><span>"+
                        res.data.json_cxwt.uname+"<br>"+res.data.json_cxwt.createtimes.split(" ",1)+"</span>"
                        +"<p>"+res.data.json_cxwt.content
                        +"</p></li>");
                }
               }

           }else{
               console.log("没有问题");
                $(".wenti").empty();
                $(".huida").empty();
                $(".huida").css({background:"none","padding-top":"0"});
                $(".huida").html("暂无");
           }


       }
   });

});