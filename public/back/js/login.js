/**
 * Created by toshiba on 2018/4/6.
 */

$(function(){

  $("#form").bootstrapValidator({
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      username: {
        validators: {
          notEmpty: {
            message: "用户名不能为空！"
          },
          stringLength: {
            min: 2,
            max: 12,
            message: "用户名必须在2到12位之间"
          },
          callback:{
            message: "用户名不存在"
          }

        }
      },
      password: {
        validators: {
          notEmpty: {
            message: "密码不能为空！"
          },
          stringLength: {
            min: 4,
            max: 12,
            message: "密码必须在4到12位之间"
          },
          callback: {
            message: "密码错误"
          }
        }
      }
    }
  });

})

$(function(){

  $("#form").on("success.form.bv",function(e){
    e.preventDefault();

    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      dataType:"json",
      data:$("#form").serialize(),
      success: function(info){
        //console.log(info);

        if( info.error === 1000 ){
          $("#form").data("bootstrapValidator").updateStatus("username", "INVALID", "callback")
        }

        if( info.error === 1001 ){
          $("#form").data("bootstrapValidator").updateStatus("password", "INVALID", "callback")
        }

        if( info.success ){
            location.href = "index.html"
        }

      }
    })



  })

  $("[type=reset]").click(function(){
    $("#form").data("bootstrapValidator").resetForm();
  })

})