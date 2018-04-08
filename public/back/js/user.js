/**
 * Created by toshiba on 2018/4/7.
 */
$(function(){

  //设置当前页面
  var currentPage = 1;
  //设置每页条数
  var pageSize = 6;

  render();

  //点击禁用切换
  $(".main_content tbody").on("click",".btn",function(){
    $("#sureModal").modal("show");
    var id = $(this).parent().data("id");
    //反着来
    var isDelete = $(this).hasClass("btn-danger")?0:1;
    $(".sureBtn").data("id",id).data("isDelete",isDelete);
    //console.log(isDelete);

  })

  //发送ajax修改
  $(".sureBtn").click(function(){
    var id = $(this).data("id");
    var isDelete = $(this).data("isDelete");
    console.log(id, isDelete);
    $.ajax({
        url: "/user/updateUser",
        type: "post",
        data:{id:id,isDelete:isDelete},
        success: function(info){
          //console.log(info);
          if( info.success ){
            $("#sureModal").modal("hide");
            render();
          }
        }
    })
  })


  //数据渲染
  function render(){
    $.ajax({
      url: "/user/queryUser",
      data: {page:currentPage,pageSize:pageSize},
      success: function(info){
        //console.log(info);

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