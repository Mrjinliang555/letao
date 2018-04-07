/**
 * Created by toshiba on 2018/4/7.
 */

$(function(){

  //设置当前页
  var currentPage = 1;
  //设置每页条数
  var pageSize = 6;

  render();

  //添加分类模态框显示
  $("#addCategory").click(function(){
    $("#addModal").modal("show");
  })


  //表单验证
  $("#form").bootstrapValidator({
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: "分类名不能为空"
          }
        }
      }
    }
  })

  //表单提交
  $("#form").on("success.form.bv",function( e ){
    e.preventDefault();
    $.ajax({
      url: "/category/addTopCategory",
      type: "post",
      data: $("#form").serialize(),
      success: function(info){
        //console.log(info);
        if( info.success ){

          $("#addModal").modal("hide");
          $("#form").data("bootstrapValidator").resetForm(true);
          currentPage = 1;
          render();
        }
      }
    })

  })

  //渲染分类
  function render(){
    $.ajax({
      url: "/category/queryTopCategoryPaging",
      data: {page:currentPage,pageSize:pageSize},
      success: function(info){
        //console.log(info);

        $(".main_content tbody").html( template("firstTpl",info) )

        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page,//当前页
          totalPages: Math.ceil(info.total / info.size),//总页数
          size:"small",//设置控件的大小，mini, small, normal,large
          //设置控件的中文字体
          itemTexts: function( type, page){
            switch (type){
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
          onPageClicked: function(a, b, c, page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render();
          }
        });


      }
    })
  }
})