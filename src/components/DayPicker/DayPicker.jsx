import format from "date-fns/format";
import React, { useState } from "react";
import brLocale from "date-fns/locale/pt-BR";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker } from "@material-ui/pickers";
import { createTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import './DayPicker.scss'

class LocalizedUtils extends DateFnsUtils {
    getDatePickerHeaderText(date) {
        return format(date, "dd MMMM yyyy", { locale: this.locale });
    }
}

const defaultMaterialTheme = createTheme({
    palette: {
        primary: {
            main: '#7e1037',
        }
    }
});

export default function DateFnsLocalizationExample(props) {
    return (
        <MuiPickersUtilsProvider utils={LocalizedUtils} locale={brLocale}>
            <ThemeProvider theme={defaultMaterialTheme}>
                <DatePicker
                    format=" dd MMMM yyyy"
                    value={props.date}
                    onChange={props.setDate}
                    cancelLabel="Cancelar"
                />
            </ThemeProvider>

        </MuiPickersUtilsProvider>
    );
}


