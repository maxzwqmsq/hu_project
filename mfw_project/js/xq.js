$(function () {
    var url="http://120.27.215.48:8081/duifang/servlet/Houses";
    var lpid=localStorage.getItem("lpid");
    $.ajax({
        url:url+"?opt=loupaninfo&id="+lpid,
        type:"post",
        success:function (res,status) {
            if(res.code===200){
                console.log(res);
                var content=res.data.content;
                var str="<br style='content: &quot;;' />";
                html=res.data.content.substring(content.indexOf("<body>")+6,content.indexOf("</body>"));
                html=html.replace(str,"<br>");
                $(".lp_xq").html(html);
            }
        }
    })
});