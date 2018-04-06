/**
 * Created by toshiba on 2018/4/6.
 */
//$.ajax({
//  url: "/employee/checkRootLogin",
//  success: function(info){
//    console.log(info);
//    if( info.error ){
//      location.href = "login.html"
//    }
//  }
//})
//nprogress 事件设置
$(function(){

  NProgress.configure({ showSpinner: false });

  $( document ).ajaxStart(function(){
    NProgress.start();
  })

  $( document).ajaxStop(function(){
    setTimeout(function(){
      NProgress.done();
    },400)
  })
})

//分类切换

$(".classify").click(function(){
  $(this).next().stop().slideToggle();
})

//菜单显示隐藏

$(".menu_btn").click(function(){

$(".lt_aside").toggleClass("tohidden");
$(".lt_main").toggleClass("tohidden");
$(".main_top").toggleClass("tohidden");

})

//退出登录
$(".logout_btn").click(function(){

  $('#myModal').modal();

})
$(".btn_logout").click(function(){
  //alert(1)
  $.ajax({
    url: "/employee/employeeLogout",
    success: function(info){
      //console.log(info);
      if( info.success ){
        location.href = "login.html"
      }
    }
  })
})