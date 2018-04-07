/**
 * Created by toshiba on 2018/4/7.
 */
$(function(){

//设置当前页
  var currentPage = 1 ;
//设置每页条数
  var pageSize = 4;

  render();
  //显示添加分类的模态框
  $("#addCategory").click(function(){
    $("#addModal").modal("show");
    //渲染一级分类
    $.ajax({
      tyep: "get",
      url: "/category/queryTopCategoryPaging",
      data: {page:1,pageSize:100},
      success: function(info){
        console.log(info);
        //渲染一级菜单模版
        $(".dropdown-menu").html(template("firstTpl",info))
      }
    })
  });

  //一级分类选择事件
  $(".dropdown-menu").on("click","a",function(){
    var id = $(this).data("id");
    var txt = $(this).text();
    //console.log(id);
    $("#dropdownNm").text(txt);
    $("[name='categoryId']").val(id);
    $("#form").data("bootstrapValidator").updateStatus("categoryId","VALID");
  });

  //图片上传插件
  $("#fileBtn").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      console.log(data);
      if( data ){
        var url = data.result.picAddr;
        $(".imgBox img")[0].src = url;
        $("[name='brandLogo']").val(url);
        $("#form").data("bootstrapValidator").updateStatus("brandLogo","VALID");
      }
    }
  });

  //表单验证
  $("#form").bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [],
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类名"
          }
        }
      },
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请选择图片"
          }
        }
      }

    }
  })

  //添加数据到服务器
  $("#form").on('success.form.bv',function(e){
    e.preventDefault();
    var datas = $("#form").serialize();
    //console.log(datas);
    $.ajax({
      url: "/category/addSecondCategory",
      type: "post",
      data: datas,
      success: function(info){
        //console.log(info);
        if(info.success){
          $("#addModal").modal("hide");
          $("#form").data("bootstrapValidator").resetForm(true);
          $("#dropdownNm").text("请选择一级分类");
          $(".imgBox img")[0].src = "images/none.png";
          currentPage = 1;
          render();
        }
      }
    })

  })



//二级分类渲染
function render(){
  $.ajax({
    url: "/category/querySecondCategoryPaging",
    data: {page:currentPage,pageSize:pageSize},
    success: function(info){
      //console.log(info);

      //渲染模版
      $(".main_content tbody").html( template("secondTpl",info) );
      //渲染分页
      $("#pagintor").bootstrapPaginator({
        bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
        currentPage:info.page,//当前页
        totalPages:Math.ceil(info.total/info.size),//总页数
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
        },//设置中文
        size:"small",//设置控件的大小，mini, small, normal,large
        onPageClicked:function(a, b,c,page){
          //为按钮绑定点击事件 page:当前点击的按钮值
          currentPage = page;
          render();
        }

      })

    }
  })
}
})