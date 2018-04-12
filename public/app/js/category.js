/**
 * Created by toshiba on 2018/4/9.
 */
$(function(){


  $.ajax({
    url: "/category/queryTopCategory",
    type: "get",
    success: function(info){
      //console.log(info);
      var id = info.rows[0].id;
      $(".main_left ul").html(template("firstTpl",info));
      render(id);
    }
  });


  $(".main_left ul").on("click","a",function(){
    var id = $(this).data("id");
    render(id)
    $(this).addClass("current").parent().siblings().children().removeClass("current");
  })


  function render(id){
    $.ajax({
      url: "/category/querySecondCategory",
      data: {id: id},
      success: function(info){
        console.log(info);
        $(".main_right ul").html(template("secondTpl",info));
      }
    })
  }


})