const ExportExcel = require('js-export-excel')

interface Ioption {
  fileName?: string;
  datas?: Idata[]
}

type Idata = {
  sheetData: any[]
  sheetName?: string;
  sheetFilter?: any[]
  sheetHeader?: string[]
  columnWidths?: number[]
}

// @params name 表格的名字  data 是表格数据和各项配置 
// @desc 导出excel
// @access public
type TexportXls = (name: string, data: Idata[]) => void

const exportXls: TexportXls = (name: string, data: Idata[]): void => {
  const option: Ioption = {}
  option.fileName = name
  option.datas = [...data]

  var toExcel = new ExportExcel(option); //new
  toExcel.saveExcel(); //保存
}


export default exportXls