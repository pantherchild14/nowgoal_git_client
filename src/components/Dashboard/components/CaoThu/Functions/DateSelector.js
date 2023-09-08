import React, { useState } from "react";

const DateSelector = ({ selectedDate, onSelectDate }) => {
    const currentDate = new Date();
    const dateOptions = [];
    for (let i = 0; i < 3; i++) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() + i);
        dateOptions.push(date.toISOString().split('T')[0]);
    }

    const handleDateChange = (event) => {
        const newDate = event.target.value;
        onSelectDate(newDate);
    };

    return (
        <div>
            <label htmlFor="dateInput">Chọn ngày:</label>
            <select id="dateInput" value={selectedDate} onChange={handleDateChange}>
                {dateOptions.map((date, index) => (
                    <option key={index} value={date}>
                        {formatDate(date)}
                    </option>
                ))}
            </select>
        </div>
    );
};

const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${year}-${month}-${day}`;
};

export default DateSelector;
