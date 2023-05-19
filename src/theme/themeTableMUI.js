import { createTheme } from '@mui/material/styles'

const taxTableTheme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #ddd',
            color: '#fff', // Cambiar el color de las celdas de datos
            fontFamily: 'Plus Jakarta Display',
          },
          '& .MuiDataGrid-columnHeaderTitleContainer': {
            color: '#56577A',
            fontWeight: 'bold',
            fontFamily: 'Plus Jakarta Display',
          },
          '& .MuiDataGrid-columnSeparator': {
            display: 'none',
          },
          '& .MuiDataGrid-columnHeader:focus': {
            outline: 'none',
          },
          '& .MuiDataGrid-columnHeader:focus-within': {
            outline: 'none',
          },
          '& .MuiDataGrid-checkboxInput': {
            color: '#fff',
          },
          '& .MuiDataGrid-footer': {
            color: '#fff',
          },
          '& .MuiDataGrid-colCellCheckbox': {
            color: '#fff',
          },
          '& .MuiDataGrid-sortIcon': {
            color: '#fff',
          },
          '& .MuiDataGrid-pages': {
            color: '#000', 
          },
          row: {
            paddingTop: '20px',
            paddingBottom: '20px',
          },
        },
        columnHeader: {
          '& .MuiDataGrid-columnHeaderMenuOpen .MuiDataGrid-menuIcon': {
            color: '#fff',
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#fff',
    },
    text: {
      primary: '#56577A',
    },
  },
})





export default taxTableTheme
