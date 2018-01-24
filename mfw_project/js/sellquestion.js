$(function() {
    var url = "http://120.27.215.48:8081/duifang/servlet/Question";
    var userid = localStorage.getItem("uid");
    var lable;
    //获取问题标签
    $.ajax({
        url: url,
        type: "post",
        data: "opt=wentibiaoqian",
        success: function(res, status) {
            console.log(res);
            for (var i = 0; i < res.data.length; i++) {
                $(".ques_label").append(`<span class="label">${res.data[i].name}</span>`);
            }

        }
    });

    //获取问题及答案
    $.ajax({
        url: url,
        type: "post",
        data: "opt=selwentileibiao&userid=" + userid + "&type=1&page=0&row=10",
        success: function(res, status) {
            console.log(res);
            for (var i = 0; i < res.data.length; i++) {
                var str = res.data[i].createtime.split(" ", 1);
                $(".ques_body").append(`
                    <li class="wt">
                    <p class="wen"><img src="images/ask.png">
                    <span>${res.data[i].title}</span>
                    </p>
                    <p class="read">
                    <span>
                    <img src="images/read.png">${res.data[i].see}
                    </span>
                    <span>${str}</span>
                    <span class="label"></span>
                    <span class="label"></span>
                    <span class="label"></span>
                    </p>
                    <ul class="daan">
                        <li>
                        <img src="images/answer.png" alt=""><span class="s1">共<span class="hh">${res.data[i].json_hd1.length}</span>条回答</span>
                        <p class="p2">
                        <img src="${res.data[i].json_hd1[0].pic}" alt="" class="t1">
                        <span>${res.data[i].json_hd1[0].name}</span>
                        <span class="tt">${res.data[i].json_hd1[0].time}</span>                  
</p>
<p class="p3">
    ${res.data[i].json_hd1[0].content}
</p>
</li>
                    </ul>
                    </li>
                `);

            }
        }
    })
});