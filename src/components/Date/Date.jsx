import format from "date-fns/format";
import React, { useState } from "react";
import brLocale from "date-fns/locale/pt-BR";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker } from "@material-ui/pickers";
import { createTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import './Date.scss'
import { lime, red } from "@material-ui/core/colors";

class LocalizedUtils extends DateFnsUtils {
    getDatePickerHeaderText(date) {
        return format(date, "d MMMM yyyy", { locale: this.locale });
    }
}

const defaultMaterialTheme = createTheme({
    palette: {
        primary: {
            main: '#7e1037',
        }
    }
});

export default function DateFnsLocalizationExample() {
    const [selectedDate, handleDateChange] = useState(new Date());

    console.log(selectedDate)

    return (
        <MuiPickersUtilsProvider utils={LocalizedUtils} locale={brLocale}>
            <ThemeProvider theme={defaultMaterialTheme}>
                <DatePicker
                    format=" dd MMMM yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    cancelLabel="Cancelar"
                />
            </ThemeProvider>

        </MuiPickersUtilsProvider>
    );
}

