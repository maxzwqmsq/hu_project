$(function () {
    $.ajax({
        url:"http://120.27.215.48:8082/duifang/servlet/YuyueServlet",
        data:"opt=yiwancheng&uid=115",
        type:"post",
        success:function (res,status) {
            console.log(res);
            for(var i=0;i<res.data.length;i++){

                var yuyuetime=res.data[i].yuyuetime;
                var date=yuyuetime.substr(0,10);
                console.log(date);

                var str=`
                <div class="list">
                    <div class="listBox">
                        <div class="left">
                            <img src="${res.data[i].loupanpic}" alt="">
                        </div>
                        <div class="middle">
                            <div class="mTop" href="">
                                <span class="time">${date}</span>
                                <span class="title">${res.data[i].loupanname}</span>
                            </div>
                            <div class="mMiddle">
                                <span class="images">
                                    <img src="image/address.png" alt="">
                                </span>
                                <span class="add">地址:</span>
                                <span class="address">${res.data[i].address}</span>
                            </div>
                        </div>
                    </div>
                </div>
                `
                $(str).appendTo($(".lists"));
            }
        }
    })
})