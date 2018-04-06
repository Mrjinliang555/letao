/**
 * Created by toshiba on 2018/4/6.
 */

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