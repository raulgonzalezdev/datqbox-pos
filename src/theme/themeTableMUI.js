import {  createTheme } from "@mui/material/styles";

const taxTableTheme = createTheme({
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            "& .MuiDataGrid-cell": {
              color: "#fff",
            },
            "& .MuiDataGrid-columnHeaderTitleContainer": {
              color: "#fff",
              fontWeight: "bold",
              fontFamily: "Plus Jakarta Display",
            },
            "& .MuiDataGrid-columnSeparator": {
              display: "none",
            },
            "& .MuiDataGrid-sortIcon": {
              color: "#fff",
            },
            "& .MuiDataGrid-columnHeader:focus": {
              outline: "none",
            },
            "& .MuiDataGrid-columnHeader:focus-within": {
              outline: "none",
            },
            "& .MuiDataGrid-checkboxInput": {
              color: "#fff",
            },
            "& .MuiDataGrid-footer": {
              color: "#fff",
            },
            "& .MuiDataGrid-colCellCheckbox": {
              color: "#fff",
            },
            "& .MuiDataGrid-pagination": {
                color: "#fff",
              },
          },
        },
      },
    },
    palette: {
      primary: {
        main: "#56577A",
      },
    },
  });
  export default taxTableTheme;