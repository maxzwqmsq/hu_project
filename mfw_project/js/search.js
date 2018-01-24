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
                    $(".his_result").append(`<span>
                    ${res.data.lishi[i].content}
                    </span>`);
                }
            }
        });
    }
});