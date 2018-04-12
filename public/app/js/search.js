/**
 * Created by toshiba on 2018/4/10.
 */
$(function(){


  //点击清空历史
  $(".le_history").on("click","#delBtn",function(){
    mui.confirm('你是否要清空所有的历史记录', '温馨提示', ['取消', '确认'], function(e){
      if( e.index === 1 ){
        localStorage.removeItem("history");
        console.log(1);
        render();
      }
    })
  })

  //点击搜索
  $(".lt_search button").click(function(){

    var txt = $(".lt_search input").val();

    if( txt.trim().length === 0 ){
      mui.toast('请输入搜索关键字',{ duration:'long', type:'div' });
      $(".lt_search input").val("");
      return false;
    }

    var arr = getHistory();

    if( arr.indexOf(txt) != -1 ){
      var num = arr.indexOf(txt);
      arr.splice(num,1);
    }

    arr.unshift(txt);

    if( arr.length > 10 ){
      arr.pop();
    }

    setHistory(arr);

    $(".lt_search input").val("");

    render();

    location.href = "searchList.html?key=" + txt;


  });

  //删除单条
   $(".le_history").on("click",".closeBtn",function(){

     var idx = $(this).parents("li").index();

     console.log(idx);

     var arr = getHistory();

     arr.splice(idx,1);

     setHistory(arr);

     render();

   });

  //历史记录点击事件
  $(".le_history").on("click",".historyBtn",function(){
      var txt = $(this).children("span").text();
      console.log(txt);
      location.href = "searchList.html?key=" + txt;
  })

  //渲染搜索列表
  render();
  function render(){
    var arr = getHistory();
    if ( arr.length === 0 ){
      $(".le_history").html("<p>没有历史记录</p>");
    }else {
      $(".le_history").html(template("historyTpl",{rows: arr}));
    }
  }


  //获取本地搜索记录
  function getHistory(){
    var arr = localStorage.getItem("history") || "[]";
    var info = JSON.parse(arr);
    return info;
  }

  //设置本地搜索记录
  function setHistory( info ){
    var str = JSON.stringify(info);
    localStorage.setItem("history",str);
  }
})