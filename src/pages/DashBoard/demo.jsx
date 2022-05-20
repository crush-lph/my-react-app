import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';



const Demo = () => {

  const domRef = useRef()
  const chartInit = () => {

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(domRef.current);
    // 绘制图表
    myChart.setOption({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    });
  }

  useEffect(() => { chartInit() }, [])

  return (
    <div>
      <div ref={domRef} style={{ width: 500, height: 400 }}></div>
    </div>
  )
}

export default Demo;