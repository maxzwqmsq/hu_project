$(function() {
    var url = "http://120.27.215.48:8081/duifang/servlet/Question";
    var userid = localStorage.getItem("uid");
    var lables = [];
    //获取问题标签
    $.ajax({
        url: url,
        type: "post",
        data: "opt=wentibiaoqian",
        success: function(res, status) {
            console.log(res);
            for (var i = 0; i < res.data.length; i++) {
                $(".ques_label").append(`
                        <label class="label" id=${res.data[i].ids}>
                            <input type="checkbox" name="label" class="que-checkbox" value=${res.data[i].ids}>
                                <span class="que-font">${res.data[i].name}</span>
                        </label>
                    `);

                }
                //get label
                var labels = [];
                $('.que-checkbox').change(function(){
                    if ($(this).prop('checked') ==true) {
                        labels.push($(this).val());
                        var a = $(this).val()
                        $('#'+a+'').addClass('btn-selected')
                    }else if($(this).prop('checked') ==false){
                        var b = $(this).val()
                        var a = $(this).val()
                        labels.splice($.inArray(b,labels),1); 
                        $('#'+a+'').removeClass('btn-selected')
                    }
                    console.log(labels)
                })
        }
    });

    //获取问题及答案

    $.ajax({
        url: url,
        type: "post",
        data: "opt=selwentileibiao&userid=" + userid + "&auditing=1&type=1&page=0&row=10",
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
                        <img src="images/dfw.png" alt="" class="t1"> 
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