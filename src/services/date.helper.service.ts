
import moment from 'moment';
export function newStringDate() {
    process.env.TIMEZONE;
    let options = { hour12: false, timeZone: "UTC" };
    //var myDate = new Date().toLocaleString(process.env.LOCATION, options) // your date object
    var date = new Date();
    var myDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
    return myDate;
}

export function dateToLocal(date: Date) {
    var myDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    return myDate;
}
