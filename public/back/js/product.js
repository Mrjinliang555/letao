/**
 * Created by toshiba on 2018/4/8.
 */
$(function(){
  //设置当前页
  var currentPage = 1 ;
  //设置每页条数
  var pageSzie = 4;
  //设置图片默认下标 （一共有三张图）
  var imgNum = 2;
  //设置图片容器
  var picArr = [];

  //渲染商品列表
  render();


  //切换上下架
  $(".main_content tbody").on("click",".upDown",function(){
    var id = $(this).parent().data("id");
    var statu = $(this).data("statu");
    $("#myUpdateModal").modal("show");
    //console.log(statu);
    $(".updateBtn").off("click").on("click",function(){
      $.ajax({
        url: "http://localhost/sql/updateProduct.php",
        data: {id:id,statu:statu},
        dataType: "jsonp",
        success: function(info){
          //console.log(info);
          if( info.success ){
            $("#myUpdateModal").modal("hide");
            render();
          }
        }
      })

    })

  })

  //显示模态框
  $("#addProduct").click(function(){
    $("#addModal").modal("show");
    $.ajax({
      url: "/category/querySecondCategoryPaging",
      data: {page: 1, pageSize: 100},
      success: function(info){
        //console.log(info);
        $(".dropdown-menu").html(template("secondTpl",info))
      }
    })
  });

  //二级分类选择事件
  $(".dropdown-menu").on("click","a",function(){
    var txt = $(this).text();
    var id = $(this).data("id");
    //console.log(id);
    $("#dropdownNm").text(txt);
    $("[name='brandId']").val(id);
    $("#form").data("bootstrapValidator").updateStatus("brandId","VALID");
  });


  //上传图片
  $("#fileBtn").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      var info = data.result;
      //console.log(info);
      picArr.unshift(info);
      $(".imgBox").prepend("<img src='"+info.picAddr+"' />");
      if( picArr.length > 3 ){
        picArr.pop();
        $(".imgBox img").last().remove();
      }
      if( picArr.length >= 3 ){
        $("#form").data("bootstrapValidator").updateStatus("imgUpload","VALID");
      }
    }
  });

  //渲染商品列表
  function render(){
    $.ajax({
      url: "/product/queryProductDetailList",
      data: {page: currentPage, pageSize: pageSzie},
      success: function(info){
        //console.log(info);
        $(".main_content tbody").html( template("productTpl",info) );

        //渲染分页
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:info.page,//当前页
          totalPages:Math.ceil(info.total/info.size),//总页数
          size:"small",//设置控件的大小，mini, small, normal,large
          onPageClicked:function(a, b, c,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render();
          }

        })


      }
    })


  };

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
    //3. 指定校验字段
    fields: {
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品价格"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品的尺码"
          },
          regexp: {
            regexp: /^[34]\d-\d{2}$/,
            message: '请输入正确的尺码格式：(32-46)'
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '请输入非零开头的数值'
          }
        }
      },
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择商品归属品牌"
          }
        }
      },
      imgUpload: {
        validators: {
          notEmpty: {
            message: "请上传三张图片"
          }
        }
      }
    },
  })

  //发送ajax添加商品
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    var info = $("#form").serialize();
    info += "&picName1="+picArr[0].picName+"&picAddr1="+picArr[0].picAddr;
    info += "&picName2="+picArr[1].picName+"&picAddr2="+picArr[1].picAddr;
    info += "&picName3="+picArr[2].picName+"&picAddr3="+picArr[2].picAddr;
    //console.log(info);
    //console.log(picArr);
    $.ajax({
      url: "/product/addProduct",
      type: "post",
      data: info,
      success: function(info){
        //console.log(info);
        if(info.success){
          currentPage = 1;
          render();
          $("#form").data("bootstrapValidator").resetForm(true);
          $(".imgBox img").remove();
          $("#dropdownNm").text("请选择二级分类");
          $("#addModal").modal("hide");
        }
      }
    })
  });

})