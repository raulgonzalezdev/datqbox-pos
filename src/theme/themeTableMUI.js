import { createTheme } from "@mui/material/styles";

const taxTableTheme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #ddd',
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
          '& .MuiDataGrid-pagination': {
            color: '#fff',
          },
          '& .MuiDataGrid-menuIcon': {
            color: '#fff',
          },
          '& .MuiDataGrid-sortIcon': {
            color: '#fff',
          },
          "& .MuiDataGrid-footer": {
            color: "#fff", // color del texto de la paginación
          },
          "& .MuiDataGrid-pages": {
            color: "#fff", // color de los números de la paginación
          },
          row: {
            paddingTop: '20px',
            paddingBottom: '20px',
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#56577A",
    },
    text: {
      primary: "#fff",
    },
  },
});

export default taxTableTheme;
