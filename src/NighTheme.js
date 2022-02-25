import React from "react";
import { createTheme } from '@material-ui/core/styles';
import theme from "./theme";

const NightTheme = createTheme({
    palette: {
        appBarBg: { backgroungColor: '#222 !imporant' },
        type: "dark",
        
    }
})


export default NightTheme