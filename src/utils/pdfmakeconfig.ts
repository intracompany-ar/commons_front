// Lo tuve que hacer porque me daba error al hacer esto en useFetchDatatable pdfMake.vfs = pdfFonts.vfs
import * as _pdfMake from 'pdfmake/build/pdfmake'
import * as _pdfFonts from 'pdfmake/build/vfs_fonts'

const pdfMake: any = (_pdfMake as any).default || _pdfMake
pdfMake.vfs = (_pdfFonts as any).vfs

export default pdfMake