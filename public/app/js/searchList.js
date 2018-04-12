/**
 * Created by toshiba on 2018/4/11.
 */
$(function(){

  var page = 1;
  var pageSize = 10;
  var price;
  var num;

  var str = decodeURI(location.search.split("=")[1]);

  //点击搜索
  $(".lt_search input").val(str);

  $(".lt_search button").click(function(){
    str = $(".lt_search input").val();
    render();
  })

  //点击跳转
  $(".le_product").on("click","a",function(){
    var id = $(this).data("productid");
    console.log(id);
    location.href = "product.html?productId=" + id;
  })

  render();
  //渲染商品
  function render(){
    $(".le_product").html("<div class='box'></div>");
    setTimeout(function(){
      $.ajax({
        data: {proName: str, page:  page, pageSize: pageSize, price: price ,num: num},
        url: "/product/queryProduct",
        success: function(info){
          console.log(info);
          if( info.data.length === 0 ){
            $(".le_product").html("没有更多的商品信息")
          }else {
            $(".le_product").html(template("productTpl",info));
          }
        }
      })
    },1000)

  }

  //排序渲染
  $(".screen li").click(function(){

    $(this).addClass('current').siblings().removeClass("current");
    var $child = $(this).children("i");
    var idx = $(this).index();

    if( $child.hasClass("fa-angle-down") ){
      if( idx === 1 ){
        price = 1
        num = null;
      }else {
        num = 1;
        price = null;
      }

      $child.removeClass("fa-angle-down").addClass("fa-angle-up");
    }else {
      if( idx === 1 ){
        price = 2;
        num = null;
      }else {
        num = 2;
        price = null;
      }
      $child.removeClass("fa-angle-up").addClass("fa-angle-down");
    }
    console.log(num);
    render();

  })


})
