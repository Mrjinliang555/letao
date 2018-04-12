/**
 * Created by toshiba on 2018/4/11.
 */

$(function(){

  var productId = +decodeURI(location.search.split("=")[1]);
  console.log(productId);


  $.ajax({
    url: "/product/queryProductDetail",
    data: {id: productId},
    success: function(info){
      console.log(info);
      info.sizeArr = [];
      var arr = info.size.split("-");

      for( var i = +arr[0]; i <= arr[1]; i++ ){
        info.sizeArr.push(i);
      }

      $(".lt_main .info").on("click",".size span",function(){

        $(this).addClass("active").siblings().removeClass("active");

      })

      $(".mui-slider-group").html(template("imgTpl",info));
      $(".mui-slider-indicator").html(template("scroeTpl",info));
      $(".lt_main .info").html(template("infoTpl",info));

      var gallery = mui('.mui-slider');
      gallery.slider({
        interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
      });

    }
  })

})
