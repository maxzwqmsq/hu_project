$(function () {
    var url="http://120.27.215.48:8081/duifang/servlet/UserServlet";
    var userid=localStorage.getItem("uid");
    if(userid===null){
        $(".his_result").empty();
    }else{
        $.ajax({
            url:url,
            type:"post",
            data:"opt=hotsou&userid="+userid,
            success:function (res,status) {
                console.log(res);
                for(var i=0;i<res.data.lishi.length;i++){
                    $(".his_result").append(`<span class="serach-lishi">
                    ${res.data.lishi[i].content}
                    </span>`);
                }
                $(".serach-lishi").click(function () {
                    var lishidata = $(this).text();
                    $(".serachval").val(lishidata);
                    $(".serachval").css("padding-left", "-100px;")
                 });
            }
        });
    }

    

    $(".delete").click(function () {
            $(".his_result").empty();
            var token=localStorage.getItem("token");
            var url="http://120.27.215.48:8081/duifang/servlet/Operation";
            $.ajax({
                url:url,
                data:"opt=dellishi&token="+token,
                type:"post",
                success:function (res,status) {
                    if(res.code===200){
                        console.log("清除搜索历史成功");
                    }
                }
            })
        });

       
       
         //search
        $(".po_img").click(function(){
            $(".da_result").empty();
            var searchval = $(".serachval").val();
            if(searchval){
                
                $.ajax({
                        url:"http://120.27.215.48:8081/duifang/servlet/Question",
                        type:"post",
                        data:"opt=sousuo&userid="+userid+"&name="+searchval+"&page=0&row=10",
                        success:function (res,status) {
                            console.log(res);
                            var cityids = [];
                            for(var i=0;i<res.data.length;i++){
                                $(".da_result").append(`<span class="search-list" id="${res.data[i].ids}"><span class="type">
                                    【${res.data[i].type}】</span><span class="title">${res.data[i].title}</span><hr></span>`);
                            }

                            $('.search-list').click(function(){
                                var id = $ (this).attr ("id")
                                localStorage.setItem("lpid", id); 
                                $(window).attr("location", "xiangqing.html");
                            })

                            
                        }
                });
            }else{
                alert("请输入搜索内容。")
            }

        })

   
   

});