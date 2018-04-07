/**
 * Created by toshiba on 2018/4/7.
 */
$(function(){

  //设置当前页面
  var currentPage = 1;
  //设置每页条数
  var pageSize = 6;

  render();


  //数据渲染
  function render(){
    $.ajax({
      url: "/user/queryUser",
      data: {page:currentPage,pageSize:pageSize},
      success: function(info){
        console.log(info);

        $(".main_content tbody").html( template("userTpl",info) );

        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          itemTexts: function(  type, page, current ){
            switch (type) {

              case "first":
                return "首页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "末页";
              case "page":
                return page;

            }
          },
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(a, b, c,page){
            currentPage = page;
            render();
          }

        })

      }
    })
  }
})