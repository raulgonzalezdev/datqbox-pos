import React, { useState } from 'react'
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateField } from '@mui/x-date-pickers/DateField'
import { ThemeProvider } from '@mui/material/styles'
import taxDateTheme from 'theme/themeDateMUI'

const CustomDateField = ({ valuedate }) => {
    const [selectedDate, setSelectedDate] = useState(dayjs(valuedate))

    const handleDateChange = (date) => {
        setSelectedDate(date)
    }

    return (
        <ThemeProvider theme={taxDateTheme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField 
                    value={selectedDate} 
                    onChange={handleDateChange}
                />
            </LocalizationProvider>
        </ThemeProvider>
    )
}

export default CustomDateField
