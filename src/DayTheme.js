import React from "react";
import { createTheme } from '@material-ui/core/styles';
import theme from "./theme";

const DayTheme = createTheme({
    palette: {
        appBarBg: { backgroungColor: '#fff !imporant' },
    },
})


export default DayTheme