$(function () {
    var url="http://120.27.215.48:8081/duifang/servlet/Question";
    var userid=localStorage.getItem("uid");
    var page=0;
    var arr=[];
   $.ajax({
        url:url,
       data:"opt=shouye&userid="+userid,
       type:"post",
       success:function (res,status) {
           console.log(res);
           if(res.data.rs_lb.length>0){
               for(var j=0;j<res.data.rs_lb.length;j++){
                   $(".swiper-container .swiper-wrapper").append("<div class='swiper-slide'><img onclick=window.open('"+res.data.rs_lb[j].url+"','_self') src='"+
                       res.data.rs_lb[j].pic_lp+"'></div>");
               }
           }
           var zx = res.data.jsonobj.zx;
           var zxcount = "";
           var zxval = "";
           if(zx.indexOf("万")>0){
              zxcount = zx.slice(-2);
              zxval = zx.replace("万次","");
              $(".zxcount").text(zxcount);
              $(".zx").text(zxval);
           }else{
              zxcount=zx.slice(-1);
              zxval = zx.replace("次","");
              $(".zxcount").text(zxcount);
              $(".zx").text(zxval);
           }
           var fw = res.data.jsonobj.fu;
           var fwcount = "";
           var fwval = "";
           if(fw.indexOf("万")>0){
              fwcount = fw.slice(-2);
              $(".fwcount").text(fwcount);
              fwval = fw.replace("万次","");
              $(".fw").text(fwval);
           }else{
              fwcount=fw.slice(-1);
              $(".fwcount").text(fwcount);
               fwval = fw.replace("次","");
              $(".fw").text(fwval);
           }
           var gw = res.data.jsonobj.jp;
           var gwcount = "";
           var gwval = "";
           if(gw.indexOf("万")>0){
              gwcount = gw.slice(-2);
              $(".gwcount").text(gwcount);
              gwval = gw.replace("万位","");
              $(".gw").text(gwval);
           }else{
               gwcount=gw.slice(-1);
              $(".gwcount").text(gwcount);
               gwval = gw.replace("位","");
              $(".gw").text(gwval);
           }
           if(res.data.rs_gg.length===0){
                $(".sy_adv").hide();
                $(".sy_part").hide();
           }else{
               $(".sy_adv img").attr("src",res.data.rs_gg[0].pic);
               $(".part_1 .mask").text(res.data.rs_fu[0].status);
              
               $(".part_1").css({
                   "background":"url("+res.data.rs_fu[0].pic+")",
                   "background-size":"cover"
               });
                //跳转
               $(".part_1").click(function () {
                  window.location.href=res.data.rs_fu[0].url; 
               });

               $(".fi .mask").text(res.data.rs_fu[1].status);
               $(".fi").css({
                   "background":"url("+res.data.rs_fu[1].pic+")",
                   "background-size":"cover"
               });
                //跳转
               $(".fi").click(function () {
                  window.location.href=res.data.rs_fu[1].url; 
               });
               $(".se .mask").text(res.data.rs_fu[2].status);
               $(".se").css({
                   "background":"url("+res.data.rs_fu[2].pic+")",
                   "background-size":"cover"
               });
               //跳转
               $(".se").click(function () {
                  window.location.href=res.data.rs_fu[2].url; 
               });
               $(".th .mask").text(res.data.rs_fu[3].status);
               $(".th").css({
                   "background":"url("+res.data.rs_fu[3].pic+")",
                   "background-size":"cover"
               });
                //跳转
               $(".th").click(function () {
                  window.location.href=res.data.rs_fu[3].url; 
               });
               $(".fo .mask").text(res.data.rs_fu[4].status);
               $(".fo").css({
                   "background":"url("+res.data.rs_fu[4].pic+")",
                   "background-size":"cover"
               });
                //跳转
               $(".fo").click(function () {
                  window.location.href=res.data.rs_fu[4].url; 
               });
           }
           //推荐楼盘
           $roomlist=$(".roomlist");
           for (var i = 0; i < res.data.rmlp.length; i++) {
               $roomlist.append("<li class='room_pic tag" + page + i + "'><img src='" + res.data.rmlp[i].pic + "'></li>");
               $roomlist.append("<li class='room_info tag" + page + i + "'><span class='room_title'>" + res.data.rmlp[i].title
                   + "</span><span class='junjia'>" + res.data.rmlp[i].unit_price
                   + "元/m2</span>"
                   + "<p class='room_label'><img src='images/dw.png' class='dw'><span class='shiqu'>"
                   + res.data.rmlp[i].address+"</span><p class='labelspan'><span class='label'></span><span class='label'></span><span class='label'></span></p>"
                   + "</p></li>"
               );
               console.log("楼盘id:" + res.data.rmlp[i].ids);
             /*  if (res.data.rmlp[i].status === "1") {
                   $(".tip").text("代售");
               } else if (res.data.rmlp[i].status === "2") {
                   $(".tip").text("在售");
               } else {
                   $(".tip").text("售罄");
               }*/

               //判断标签数量
               if (res.data.rmlp[i].label_list.length === 0) {
                   $(".label").eq(i * 3).html("");
                   $(".label").eq(i * 3 + 1).html("");
                   $(".label").eq(i * 3 + 2).html("");
               } else if (res.data.rmlp[i].label_list.length === 1) {
                   $(".label").eq(i * 3).html(res.data.rmlp[i].label_list[0].name);
                   $(".label").eq(i * 3).css({
                       "color": res.data.rmlp[i].label_list[0].color,
                       "border-color": res.data.rmlp[i].label_list[0].color
                   })
               } else {
                   $(".label").eq(i * 3).html(res.data.rmlp[i].label_list[0].name);
                   $(".label").eq(i * 3 + 1).html(res.data.rmlp[i].label_list[1].name);
                   $(".label").eq(i * 3).css({
                       "color": res.data.rmlp[i].label_list[0].color,
                       "border-color": res.data.rmlp[i].label_list[0].color
                   });
                   $(".label").eq(i * 3 + 1).css({
                       "color": res.data.rmlp[i].label_list[1].color,
                       "border-color": res.data.rmlp[i].label_list[1].color
                   })
               }

               var str = "tag" + page + i;
               arr.push({"tag": str, "id": res.data.rmlp[i].ids});
               $("." + str).click(function () {
                   var className = $(this)[0].className;
                   var arr2 = className.split(" ");
                   var lpid;
                   className = arr2[1];
                   console.log(className + "被点击了");
                   for (var j = 0; j < arr.length; j++) {
                       if (className === arr[j].tag) {
                           lpid = arr[j].id;
                           localStorage.setItem("lpid", lpid);
                       }
                   }
                   $(window).attr("location", "xiangqing.html");
               })

           }
       }
   });
});