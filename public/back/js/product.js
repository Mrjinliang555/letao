/**
 * Created by toshiba on 2018/4/8.
 */
$(function(){
  //设置当前页
  var currentPage = 1 ;
  //设置每页条数
  var pageSzie = 4;
  //设置图片默认下标 （一共有三张图）
  var imgNum = 0;

  //渲染商品列表
  render();

  //显示模态框
  $("#addProduct").click(function(){
    $("#addModal").modal("show");
    $.ajax({
      url: "/category/querySecondCategoryPaging",
      data: {page: 1, pageSize: 100},
      success: function(info){
        console.log(info);
        $(".dropdown-menu").html(template("secondTpl",info))
      }
    })
  });

  //二级分类选择事件
  $(".dropdown-menu").on("click","a",function(){
    var txt = $(this).text();
    var id = $(this).data("id");
    console.log(id);
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
      console.log(data);
      var url = data.result.picAddr;
      var imgNm = data.result.picName
      $(".imgBox img")[imgNum].src = url;
      $(".picAddrBox input")[imgNum].value = url;
      $(".picNameBox input")[imgNum].value = imgNm;
      imgNum++;
      if( imgNum >= 3){
        imgNum = 0;
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
            message: "不能为空"
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "不能为空"
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "不能为空"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "不能为空"
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: "不能为空"
          }
        }
      },
      statu: {
        validators: {
          notEmpty: {
            message: "不能为空"
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: "不能为空"
          }
        }
      },
      brandId: {
        validators: {
          notEmpty: {
            message: "不能为空"
          }
        }
      },
    //  picName1: {
    //    validators: {
    //      notEmpty: {
    //        message: "不能为空"
    //      }
    //    }
    //  },
    //  picAddr1: {
    //    validators: {
    //      notEmpty: {
    //        message: "不能为空"
    //      }
    //    }
    //  },
    //  picName2: {
    //    validators: {
    //      notEmpty: {
    //        message: "不能为空"
    //      }
    //    }
    //  },
    //  picAddr2: {
    //    validators: {
    //      notEmpty: {
    //        message: "不能为空"
    //      }
    //    }
    //  },
    //  picName3: {
    //    validators: {
    //      notEmpty: {
    //        message: "不能为空"
    //      }
    //    }
    //  },
    //  picAddr3: {
    //    validators: {
    //      notEmpty: {
    //        message: "不能为空"
    //      }
    //    }
    //  }
    },
  })

  //发送ajax添加商品
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    var info = $("#form").serialize();
    console.log(info);
    $.ajax({
      url: "/product/addProduct",
      type: "post",
      data: info,
      success: function(info){
        console.log(info);
        currentPage = 1;
        render();
        $("#form").data("bootstrapValidator").resetForm(true);
        $(".imgBox img").attr("src","");
        $("#dropdownNm").text("请选择二级分类");
      }
    })
  });

  //var myJsonP = {
  //  callback: null,
  //  send: function(){
  //    var time = new Date() / 1;
  //    var back = "callback" + time;
  //    var htmlStr= "function "+back+"(info){console.log(info)}"
  //    var script1 = document.createElement("script");
  //    script1.innerHTML = htmlStr;
  //    $(script1).appendTo("body");
  //    var data = url+"?callback="+back;
  //    var script = document.createElement("script");
  //    script.src= data;
  //    $(script).appendTo("body");
  //    $(script).remove();
  //  }
  //}

  //跨域函数 jsonpCallback
})