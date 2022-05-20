import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

export default function BarChart() {

  // 创建一个ref以获取dom实例
  const domRef = useRef(null)
  const init = () => {
    const myChart = echarts.init(domRef.current as unknown as HTMLElement)
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

  useEffect(() => { init() }, [])

  return (
    <div>
      <div ref={domRef} style={{ width: 500, height: 400 }}></div>
    </div>
  )
}
