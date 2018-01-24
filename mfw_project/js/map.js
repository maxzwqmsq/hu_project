$(function () {
    var page = 0;
    var city = 340;
    var zhoubian = 2;
    var Qu = -1;//区域(包含周边)
    var S_minprice = -1;//价格
    var S_maxprice = -1;//价格
    var Huxing = -1;//户型
    var Z_minprice = -1;//总价
    var Z_maxprice = -1;//总价
    var Leixing = -1;//类型
    var Sell = -1;//售卖情况
    var Other = -1;//其他
    var jiage = false;
    var quyu = false;
    var huxing = false;
    var zongjia = false;
    var leixing = false;
    var shoumai = false;
    var qita = false;
    var jzlxid = -1;
    var bqid = -1;
    var flag=false;
    var jzflag=false;
    var url = "http://120.27.215.48:8081/duifang/servlet/Houses";
    var url1 = "http://120.27.215.48:8081/duifang/servlet/Houses";

    var loadHouse = false;
    var isRefresh = true;

    // 百度地图API功能
    var map = new BMap.Map("allmap");
    var point=(new BMap.Point(118.360038,32.311264));
    map.centerAndZoom(point, 15);
    map.addControl(new BMap.MapTypeControl());
    map.enableScrollWheelZoom(true);


    // 获取区域
    $.ajax({
        url: url1 + "?opt=shouhuoAddress&name=南京市",
        type: "post",
        success: function (res, status) {
            if (res.code === 200) {
                for (var i = 0; i < res.data.districtList.length; i++) {
                    $(".c-area").append("<li><a>" + res.data.districtList[i].disName + "</a></li>");
                }
                if (res.data.iszhoubian !== 0) {
                    $(".c-area").append("<li><a>南京周边</a></li>");
                    $(".c-area li").click(function () {
                        if ($(this).text() === "南京周边") {
                            $(".area-site").empty();
                            $(".area-site").append("<li><a href='#' class='active'>不限</a></li>");
                            for (var j = 0; j < res.data.zbAry.length; j++) {
                                $(".area-site").append("<li><a>" + res.data.zbAry[j].disName + "</a></li>");
                            }
                        } else {
                            $(".area-site").empty();
                        }
                    });
                }
            }
        }
    });
    // 获取价格(单价)
    $.ajax({
        url: url1 + "?opt=jiage&type=0",
        type: "post",
        success: function (res, status) {
            if (res.code === 200) {
                for (var i = 0; i < res.data.length; i++) {
                    $(".choice-content.c-price").append("<li><a>" + res.data[i].minprice + "-" + res.data[i].maxprice + "万</a></li>");
                }
            }
        }
    });
    // 获取户型
    $.ajax({
        url: url1 + "?opt=huxing",
        type: "post",
        success: function (res, status) {
            if (res.code === 200) {
                for (var i = 0; i < res.data.length; i++) {
                    $(".choice-content.c-huxing").append("<li><a>" + res.data[i].name + "</a></li>");
                }
            }
        }
    });
    //获取更多--总价、类型、售卖情况、其他
    $(".c-more>li").click(function () {
        $(".m-more").empty();
        var gd = $(this).children("a").html();
        if (gd === "不限") {
            $(".m-more").append("<li><a href='#' class='active'>不限</a></li>");
            $(".m-more").css({
                height: "auto"
            })
        } else if (gd === "总价") {
            $(".m-more").append("<li><a href='#' class='active'>不限</a></li>");
            $.ajax({
                url: url1 + "?opt=jiage&type=1",
                type: "post",
                success: function (res, status) {
                    if (res.code === 200) {
                        for (var i = 0; i < res.data.length; i++) {
                            $(".m-more").append("<li><a>" + res.data[i].minprice + "-" + res.data[i].maxprice + "万</a></li>");
                        }
                    }
                }
            });
            $(".m-more").css({
                height: "auto"
            })
        } else if (gd === "类型") {
            $(".m-more").append("<li><a href='#' class='active'>不限</a></li>");
            $.ajax({
                url: url1 + "?opt=jianzhuleixing",
                type: "post",
                success: function (res, status) {
                    if (res.code === 200) {
                        for (var i = 0; i < res.data.length; i++) {
                            $(".m-more").append("<li><a href='#'>" + res.data[i].name + "</a></li>");
                        }
                    }
                }
            });
            $(".m-more").css({
                height: "24rem"
            })
        } else if (gd === "售卖情况") {
            $(".m-more").append("<li><a href='#' class='active'>不限</a></li>");
            $(".m-more").append("<li><a href='#'>在售</a></li><li><a href='#'>代售</a></li><li><a href='#'>售罄</a></li>");
            $(".m-more").css({
                height: "auto"
            })
        } else {
            $(".m-more").css({
                height: "24rem"
            });
            $(".m-more").append("<li><a href='#' class='active'>不限</a></li>");
            $.ajax({
                url: url1 + "?opt=fangwubiaoqian",
                type: "post",
                success: function (res, status) {
                    if (res.code === 200) {
                        console.log(res);
                        for (var i = 0; i < res.data.length; i++) {
                            $(".m-more").append("<li><a>" + res.data[i].name + "</a></li>");
                        }
                    }
                }
            });
        }
    });

    //首页默认显示所有不限的样式
    $.ajax({
        url: url1 + "?opt=selectHouses&city="+city+"&zhoubian=2&type=1",
        type: "post",
        success: function (res, status) {
            if(res.code===200){
                console.log(res);
            }
            initHouseData(res);
        }
    });
    //筛选栏
    $(".tab-choice li.area").click(function () {
        if ($(".c-area").is(":hidden")) {
            $(".c-area").show().siblings("ul").hide();
            $(".area-site").show();
            $("div.mask").show();
        } else {
            $(".c-area").hide();
            $("div.mask").hide();
            $(".area-site").hide();
        }
    });
    $(".tab-choice li.price").click(function () {
        if ($(".choice-content.c-price").is(":hidden")) {
            $(".c-price").show().siblings("ul").hide();
            $("div.mask").show();
            $(".area-site").hide();
        } else {
            $(".c-price").hide();
            $("div.mask").hide();
        }
    });
    $(".tab-choice li.huxing").click(function () {
        if ($(".choice-content.c-huxing").is(":hidden")) {
            $(".c-huxing").show().siblings("ul").hide();
            $("div.mask").show();
            $(".area-site").hide();
        } else {
            $(".c-huxing").hide();
            $("div.mask").hide();
        }
    });
    $(".tab-choice li.more").click(function () {
        if ($(".c-more").is(":hidden")) {
            $(".c-more").show().siblings("ul").hide();
            $(".m-more").show();
            $("div.mask").show();
            $(".area-site").hide();
        } else {
            $(".c-more").hide();
            $("div.mask").hide();
        }
    });

    $(".choice-content").on("click", "li", function () {
        $(this).children("a").css({
            color: "#50abff",
            "border-bottom": "1px solid #50abff"
        }).parent("li").siblings("li").children("a").css({
            color: "black",
            "border-bottom": "none"
        });
        $(this).parent().slideUp();
        $(".mask").hide();
    });
    $(".c-more").on("click", "li", function () {
        $(this).children("a").css({
            color: "#50abff",
            "border-bottom": "1px solid #50abff"
        }).parent("li").siblings("li").children("a").css({
            color: "black",
            "border-bottom": "none"
        });
        if ($(this).text() === "不限") {
            $(this).parent().slideUp();
            $(".mask").hide();
        }
    });
    $(".c-more").on("click", "li", function () {
        $(".mask").hide();
    });
    $(".c-area").on("click", "li", function () {
        $(this).children("a").css({
            color: "#50abff",
            "border-bottom": "1px solid #50abff"
        }).parent("li").siblings("li").children("a").css({
            color: "black",
            "border-bottom": "none"
        });
        if ($(this).text() !== "南京周边") {
            $(this).parent().slideUp();
            $(".area-site").slideUp();
            $(".mask").hide();
        }
    });
    $(".area-site").on("click", "li", function () {
        $(this).children("a").css({
            color: "#50abff",
            "border-bottom": "1px solid #50abff"
        }).parent("li").siblings("li").children("a").css({
            color: "black",
            "border-bottom": "none"
        });
        $(this).parent().slideUp();
        $(".c-area").slideUp();
        $(".mask").hide();
    });
    $(".mask").click(function () {
        $(this).hide();
        $(".choice-content").hide();
        $(".c-more").hide();
        $(".c-area").hide();
        $(".area-site").hide();
    });
    //按区域进行楼盘筛选
    $(".c-area").on("click", "li", function () {
        var area = $(this).children("a").html();//获取点击的区域
        var areaid;
        if (area === "不限") {
            $(".tab-choice li.area").html("区域<i class='fa fa-caret-down'></i>");
            Qu = -1;
            quyu = false;
            page = 0;
            selectHouse();
        } else if (area === "南京周边") {
            $(".tab-choice li.area").html("区域<i class='fa fa-caret-down'></i>");
        } else {
            $(".tab-choice li.area").html(area);
            quyu = true;//你选了区域
            $.ajax({
                url: url1 + "?opt=shouhuoAddress&name=南京市",
                type: "post",
                success: function (res, status) {
                    if (res.code === 200) {
                        for (var i = 0; i < res.data.districtList.length; i++) {
                            if (area === res.data.districtList[i].disName) {
                                areaid = res.data.districtList[i].districtId;
                                Qu = areaid;//获取区域id
                                console.log("Qu:" + Qu);
                            }
                        }
                        page = 0;
                        selectHouse();
                    }
                }
            });
        }

    });
    $(".area-site").on("click", "li", function () {
        var zhoubian = $(this).text();
        console.log(zhoubian);
        if(zhoubian==="不限"){
            $(".tab-choice li.area").html("区域<i class='fa fa-caret-down'></i>");
        }else{
            $(".tab-choice li.area").html(zhoubian);
            $.ajax({
                url: url1 + "?opt=shouhuoAddress&name=南京市",
                type: "post",
                success: function (res, status) {
                    console.log(res);
                    for(var i=0;i<res.data.zbAry.length;i++){
                        if(zhoubian===res.data.zbAry[i].disName){
                            city=res.data.zbAry[i].districtId;
                            page = 0;
                            selectHouse();
                        }
                    }
                }
            });
        }


    });
    // 按价格进行楼盘筛选
    $(".c-price").on("click", "li", function () {
        var price = $(this).text();
        if (price === "不限") {
            $(".tab-choice li.price").html("价格<i class='fa fa-caret-down'></i>");
            S_maxprice = -1;
            S_minprice = -1;
            page = 0;
            selectHouse();
        } else {
            $("li.price").text($(this).text());
            var min_price = String(parseInt($(this).text()));
            var max_price;
            var priceid;
            jiage = true;//你选择了价格
            $.ajax({
                url: url1 + "?opt=jiage&type=0",
                type: "post",
                success: function (res, status) {
                    for (var i = 0; i < res.data.length; i++) {
                        if (min_price === res.data[i].minprice) {
                            max_price = res.data[i].maxprice;
                            S_maxprice = max_price;
                            S_minprice = min_price;
                        }
                    }
                    page = 0;
                    selectHouse();
                }
            })
        }

    });
    // 按户型进行楼盘筛选
    $(".c-huxing").on("click", "li", function () {
        var huxing = $(this).text();
        var huxingStr = $(this).children("a").html();
        var huxingid;
        if (huxing === "不限") {
            $(".tab-choice li.huxing").html("户型<i class='fa fa-caret-down'></i>");
            Huxing = -1;
            page = 0;
            selectHouse();
        } else {
            $("li.huxing").text($(this).text());
            huxing = true;//你选择了户型
            $.ajax({
                url: url1 + "?opt=huxing",
                type: "post",
                success: function (res, status) {
                    if (res.code === 200) {
                        for (var i = 0; i < res.data.length; i++) {
                            if (huxingStr === res.data[i].name) {
                                huxingid = res.data[i].ids;//获取户型id
                                Huxing = huxingid;
                                console.log(huxingid);
                            }
                        }
                        page = 0;
                        selectHouse();
                    }
                }
            })
        }

    });
    $(".c-more").on("click", "li", function () {
        var more = $(this).text();
        if (more === "不限") {
            $(".tab-choice li.more").html("更多<i class='fa fa-caret-down'></i>");
            Z_minprice = -1;
            Z_maxprice = -1;
            jzlxid = -1;
            Sell = -1;
            bqid = -1;
            page = 0;
            selectHouse();
        } else if (more === "总价") {
            $(".m-more").on("click", "li", function () {
                if ($(this).text() !== "不限") {
                    zongjia = true;
                    var min_price = String(parseInt($(this).text()));
                    var max_price;
                    $.ajax({
                        url: url1 + "?opt=jiage&type=1",
                        type: "post",
                        success: function (res, status) {
                            for (var i = 0; i < res.data.length; i++) {
                                if (min_price === res.data[i].minprice) {
                                    max_price = res.data[i].maxprice;
                                    Z_minprice = min_price;
                                    Z_maxprice = max_price;
                                }
                            }
                            page = 0;
                            selectHouse();
                        }
                    })
                } else {
                    Z_minprice = -1;
                    Z_maxprice = -1;
                }
            })
        } else if (more === "类型") {
            $(".m-more").on("click", "li", function () {
                if ($(this).text() !== "不限") {
                    leixing = true;
                    var jzlx = $(this).text();
                    $.ajax({
                        url: url1 + "?opt=jianzhuleixing",
                        type: "post",
                        success: function (res, status) {
                            for (var i = 0; i < res.data.length; i++) {
                                if (jzlx === res.data[i].name) {
                                    jzlxid = res.data[i].ids;
                                    Leixing = jzlxid;
                                    console.log(jzlxid);
                                }
                            }
                            page = 0;
                            selectHouse();
                        }
                    })
                } else {
                    jzlxid = -1;
                }

            })
        } else if (more === "售卖情况") {
            $(".m-more").on("click", "li", function () {
                if ($(this).text() !== "不限") {
                    shoumai = true;
                    if ($(this).text() === "代售") {
                        Sell = 1;
                    } else if ($(this).text() === "在售") {
                        Sell = 2;
                    } else {
                        Sell = 3;
                    }
                    page = 0;
                    selectHouse();
                } else {
                    Sell = -1;
                }
            })
        } else if (more === "其他") {
            $(".m-more").on("click", "li", function () {
                if ($(this).text() !== "不限") {
                    qita = true;
                    var bqname = $(this).text();
                    $.ajax({
                        url: url1 + "?opt=fangwubiaoqian",
                        type: "post",
                        success: function (res, status) {
                            for (var i = 0; i < res.data.length; i++) {
                                if (bqname === res.data[i].name) {
                                    bqid = res.data[i].ids;
                                    Other = bqid;
                                    console.log(bqid);
                                }
                            }
                            page = 0;
                            selectHouse();
                        }
                    })
                } else {
                    bqid = -1;
                }
            })
        }
    });
    $(".m-more").on("click", "li", function () {
        $(this).parent().slideUp();
        $(this).parent().parent().slideUp();
        var m_more = $(this).children("a").html();
        $(".tab-choice li.more").html(m_more);
    });


    function addMarker(point){
        var marker = new BMap.Marker(point);
        map.addOverlay(marker);
    }

    function initHouseData(res) {
        console.log("initHouseData被执行了");
        for (var i = 0; i < res.data.length; i++) {
            var p=new BMap.Point(parseFloat(res.data[i].longitude),parseFloat(res.data[i].latitude));
            addMarker(p);
        }

    }

    function selectHouse() {
        loadHouse = true;
        console.log("qu:" + Qu);
        console.log("s_min:" + S_minprice);
        console.log("s_max:" + S_maxprice);
        console.log("huxing:" + Huxing);
        console.log("z_min:" + Z_minprice);
        console.log("z_max:" + Z_maxprice);
        console.log("sell:" + Sell);
        console.log("leixing:" + Leixing);
        console.log("bqid:" + bqid);
        var requestData = "";
        var split = "&";
        var initData = -1;
        if (Qu !== initData) {
            requestData += "qu=" + Qu + split;
        }
        if (S_minprice !== initData) {
            requestData += "price_min_s=" + S_minprice + split;
        }
        if (S_maxprice !== initData) {
            requestData += "price_max_s=" + S_maxprice + split;
        }
        if (Huxing !== initData) {
            requestData += "typeid=" + Huxing + split;
        }
        if (Z_minprice !== initData) {
            requestData += "price_min=" + Z_minprice + split;
        }
        if (Z_maxprice !== initData) {
            requestData += "price_max=" + Z_maxprice + split;
        }
        if (Sell !== initData) {
            requestData += "status=" + Sell + split;
        }
        if (Leixing !== initData) {
            requestData += "building_types=" + Leixing + split;
        }
        if (bqid !== initData) {
            requestData += "lable=" + bqid;
        }
        // requestData += "page=" + page;
        $.ajax({
            url: url1 + "?opt=selectHouses&city="+city+"&zhoubian=2&type=1&" + requestData,
            type: 'post',
            success: function (res, status) {
                initHouseData(res);
                loadHouse = false;
                isRefresh = true;
                jzflag=true;
            }
        })
    }
});