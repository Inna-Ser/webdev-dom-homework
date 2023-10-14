export function getCurrentDate(currentDate) {
    currentDate = new Date(currentDate);
    let date = currentDate.getDate();
    let montch = currentDate.getMonth();
    let year = currentDate.getFullYear();
    let hours = currentDate.getHours();
    let minute = currentDate.getMinutes();
    if (date < 10) {
        date = "0" + date;
    }
    if (montch < 10) {
        montch = "0" + montch;
    }
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minute < 10) {
        minute = "0" + minute;
    }
    const yearForm = toString(year).split('').push([2], [3]);
    const comDate = date + "." + montch + "." + yearForm + " " + hours + ":" + minute;
    return comDate;
}

