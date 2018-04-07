/**
 * Created by toshiba on 2018/4/7.
 */
$(function(){

  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init($(".barBox")[0]);
  var dataNm = ["1月","2月","3月","4月","5月","6月"];
  var datas = [];
  dataNm.forEach(function(){
    datas.push(parseInt(Math.random()*8999)+ 1000);
  })
  // 指定图表的配置项和数据
  var option = {
    title: {
      text: '2017年注册人数'
    },
    tooltip: {},
    legend: {
      data:['人数']
    },
    xAxis: {
      data: dataNm
    },
    yAxis: {},
    series: [{
      name: '人数',
      type: 'bar',
      data: datas
    }]
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);


  var arr = ['耐克','阿迪','牛逼','李宁','酷奇'];
  var arr1 = [];
  arr.forEach(function(){
    arr1.push(parseInt(Math.random()*1400)+ 100);
  })
  // 基于准备好的dom，初始化echarts实例
  var myChart2 = echarts.init($(".pieBox")[0]);
    var option = {
      title : {
        text: '热门品牌销售',
        subtext: '2017年6月',
        x:'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: arr
      },
      series : [
        {
          name: '访问来源',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data:[
            {value:arr1[1], name:arr[1]},
            {value:arr1[2], name:arr[2]},
            {value:arr1[3], name:arr[3]},
            {value:arr1[4], name:arr[4]},
            {value:arr1[0], name:arr[0]}
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  // 使用刚指定的配置项和数据显示图表。
  myChart2.setOption(option);

})