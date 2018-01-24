/**
 * Created by sanni on 2017/7/27.
 */
var common={
     path:"http://120.27.215.48:8082/duifang/servlet/UserServlet",
    // path:"http://192.168.12.193/qiche",

    /**
     * 发送验证码的操作
     * @param {string} sumSecond [总秒数]
     * @param {string} className [容器]
     * @return 无
     * */
    sendCode:function(sumSecond,className){
        setInterval(function(){
            $(className).text(sumSecond+'s');
            if(sumSecond>0){
                sumSecond--;
            }
        },1000);
    },
    /**检测手机号格式是否正确
     * [checkPhone]
     * @param  {string} phone  []
     * @return {boolean}       []
     */
    checkPhone:function(phone){
        if(!(/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(phone))){
            return false;
        }else{
            return true;
        }
    },

    /**
     * [ajaxPost post]
     * @param  {string} url [请求的地址]
     * @param  {object} dat [请求的主体]
     * @param  {function} fun [回调函数]
     */
    /**
     * 请求界面*/
    ajaxPost:function(url,dat,fun){
        $.ajax({
            url: this.path+url,
            type:'post',
            async: false,
            dataType:'json',
            data: dat,
            success: function(data){ //成功的回调函数的处理
                fun(data);
            },
            error:function(){
                // alert(this.errorData);
            }
        });
    },
}




