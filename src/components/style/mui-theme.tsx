import { ThemeProvider, createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
      secondary:{
          main:"#39ff14"
      }
    },
});