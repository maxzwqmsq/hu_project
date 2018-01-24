$(function () {
    //获取yuyueid
    var yuyueid=localStorage.getItem("yuyueid");
    var guwenid,fuwuxing,guwenpingjia,zhuanyexing,biaoqian="",bq,loupancontent=[];
    $.ajax({
        url:"http://120.27.215.48:8082/duifang/servlet/YuyueServlet",
        data:"opt=pingjialoupanlist&yuyueid="+yuyueid,
        type:"post",
        success:function (res,status) {
            console.log(res);
                //获取咨询师信息
                $(".people .photo img").attr("src",res.guwendata.guwenico);
                $(".info .name").text(res.guwendata.guwenname);
                $(".info .star").empty();
                $(".choose").empty();
                guwenid=res.guwendata.guwenid;
                for(var i=0;i<parseInt(res.guwendata.xingji);i++){
                    $(".info .star").append("<img src='star-on.png'>");
                }
                for(var j=0;j<res.yingxiangdata.length;j++){
                    $(".choose").append("<span id='"+res.yingxiangdata[j].ids+"'>"+res.yingxiangdata[j].name+"</span>");
                }
                $(".choose>span").click(function () {
                    $(this).toggleClass("choosed");
                    var lei=$(this).attr("class");
                    if(lei=="choosed"){
                        console.log($(this).attr("id"));
                        biaoqian+=$(this).attr("id")+",";
                        bq=biaoqian;
                        console.log("bq:"+bq);
                    }
                });
            var loupandata=res.loupandata;
            loupancontent=loupandata;
            for(var i=0;i<loupandata.length;i++){
                var loustr=`
                <div class="building" louid=${i} panid=${loupandata[i].loupanid}>
                    <div class="left">
                        <div class="title">${loupandata[i].loupantitle}</div>
                        <div class="picture">
                            <img src="${loupandata[i].loupanpic}" alt="">
                        </div>
                    </div>
                    <div class="right">
                        <div class="priceBox">
                            <div class="title">价格:</div>
                            <div id="price${loupandata[i].loupanid}"></div>
                            <input type="hidden" name="price">
                        </div>
                        <div class="modelBox  box">
                            <div class="title">户型:</div>
                            <div id="model${loupandata[i].loupanid}"></div>
                            <input type="hidden" name="model">
                        </div>
                        <div class="aroundBox  box">
                            <div class="title">周边配套:</div>
                            <div id="around${loupandata[i].loupanid}"></div>
                            <input type="hidden" name="around">
                        </div>
                        <div class="groundBox  box">
                            <div class="title">案场接待:</div>
                            <div id="ground${loupandata[i].loupanid}"></div>
                            <input type="hidden" name="ground">
                        </div>
                        </div>
                    </div>
                    <div class="reviewB">
                <textarea name="reviewB" louid=${i} placeholder="请输入您对楼盘的评价"></textarea>
            </div>
                `;
                $(".people").before(loustr);
                var price="price"+loupandata[i].loupanid;
                var model="model"+loupandata[i].loupanid;
                var around="around"+loupandata[i].loupanid;
                var ground="ground"+loupandata[i].loupanid;
                $("textarea").blur(function () {
                    for(var j=0;j<i;j++){
                        var pingjia=$(this).val();
                        if($(this).attr("louid")==j){
                            loupancontent[j].loupanpingjia=pingjia;
                            console.log(loupancontent);
                        }
                    }
                });
                $("#"+price).raty({
                    click:function (score,evt) {
                        console.log('ID: ' + $(this).attr('id') + "\nscore: " + score);
                        for(var j=0;j<i;j++){
                            if($(this).parents(".building").attr("louid")==j){
                                loupancontent[j].jiagexing=`${score}`;
                                var loupanid= $(this).parents(".building").attr("panid");
                                loupancontent[j].loupanid=loupanid;
                                loupancontent[j].yuyueid=yuyueid;
                            }
                        }
                    },
                });
                $("#"+model).raty({
                    click:function (score,evt) {
                        console.log('ID: ' + $(this).attr('id') + "\nscore: " + score);
                        $(this).next("input").val(score);
                        for(var j=0;j<i;j++){
                            if($(this).parents(".building").attr("louid")==j){
                                loupancontent[j].huxinxing=`${score}`;
                            }
                        }

                    },
                });
                $("#"+around).raty({
                    click:function (score,evt) {
                        console.log('ID: ' + $(this).attr('id') + "\nscore: " + score);
                        $(this).next("input").val(score);
                        for(var j=0;j<i;j++){
                            if($(this).parents(".building").attr("louid")==j){
                                loupancontent[j].zhoubianxing=`${score}`;

                            }
                        }
                    },
                });
                $("#"+ground).raty({
                    click:function (score,evt) {
                        console.log('ID: ' + $(this).attr('id') + "\nscore: " + score);
                        $(this).next("input").val(score);
                        for(var j=0;j<i;j++){
                            if($(this).parents(".building").attr("louid")==j){
                                loupancontent[j].anchangjiedaixing=`${score}`;
                            }
                        }
                    },
                });
            }

        }
    });
    $('#attitude').raty({
        click:function (score,evt) {
            console.log('ID: ' + $(this).attr('id') + "\nscore: " + score);
            $(this).next("input").val(score);
            fuwuxing=score;
        },
    });
    $('#degree').raty({
        click:function (score,evt) {
            console.log('ID: ' + $(this).attr('id') + "\nscore: " + score);
            $(this).next("input").val(score);
            zhuanyexing=score;
        },
    });
    $("#attitude").css("width","3rem");
    $("#degree").css("width","3rem");


    $(".submit").click(function () {
        guwenpingjia=$(".guwenBox>textarea").val();
        var datas="guwenid="+guwenid+"&fuwuxing="+fuwuxing+"&guwenpingjia="+guwenpingjia+"&zhuangyexing="+zhuanyexing+"&biaoqian="+biaoqian+"&yuyueid="+yuyueid+"&loupancontent="+JSON.stringify(loupancontent);
        console.log(datas)
        $.ajax({
            url:"http://120.27.215.48:8082/duifang/servlet/YuyueServlet",
            data:"opt=pingjia&"+datas,
            type:"post",
            success:function (res,data) {
                console.log(res);
                if(res.code=="200"){
                    location.href="review.html"
                }
            },
            fail:function (res) {
                console.log(res);
            }
        })
    })

});