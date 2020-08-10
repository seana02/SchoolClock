function currentDate(){

        var date = new Date();

    //time
    {
        var hour = updateTime(date.getHours());
        var min = updateTime(date.getMinutes());
        var sec = updateTime(date.getSeconds());
        var am_pm = "AM";

        if(hour > 12){
            hour -= 12;
            am_pm = "PM";
        }
        if(hour == 0){
            hour = 12;
        }
       

    document.getElementById("clock").textContent = hour + " : " + min + " : " + sec + " " + am_pm;

    }

    //date
    {
        var day = updateDay(date.getDay());
        var month = date.getMonth() + 1;
        var num = date.getDate();
        var year = date.getFullYear();

        document.getElementById("date").textContent = day + ", " + month + "." + num + "." + year;
    }

    //school day number
    {
        const firstDay = new Date("8/17/2020");
        const lastDay = new Date("5/26/2021");

        var dayCount = 0;
        if(date >= firstDay && date <= lastDay){

            for(var d = new Date("8/17/2020"); d <= date; d.setDate(d.getDate() + 1)){
                if(d.getDay() != 0 && d.getDay() != 6 && !isHoliday(d)){
                    dayCount++;
                }
            }

        }

        var dayText = "Day " + dayCount;
        if(date.getDay() == 0 || date.getDay() == 6){
            dayText = "Weekend";
        }else if(isHoliday(date)){
            dayText = "Holiday";
        }

        document.getElementById("schoolDay").textContent = dayText;
    }


    var t = setTimeout(currentDate, 1000);
}

function updateTime(k){
    if(k<10){
        return "0" + k;
    }
    else{
        return k;
    }
}

function updateDay(k){
    switch(k){
        case 0:
            return "Sunday";
            break;
        case 1:
            return "Monday";
            break;
        case 2:
            return "Tuesday";
            break;
        case 3:
            return "Wednesday";
            break;
        case 4:
            return "Thursday";
            break;
        case 5:
            return "Friday";
            break;
        case 6:
            return "Saturday";
            break;

    }
}

function updateMonth(k){
    switch(k){
        case 1:
            return "Jan";
            break;
        case 2:
            return "Feb";
            break;
        case 3:
            return "Mar";
            break;
        case 4:
            return "Apr";
            break;
        case 5:
            return "May";
            break;
        case 6:
            return "Jun";
            break;
        case 7:
            return "Jul";
            break;
        case 8:
            return "Aug";
            break;
        case 9:
            return "Sep";
            break;
        case 10:
            return "Oct";
            break;
        case 11:
            return "Nov";
            break;
        case 12:
            return "Dec";
            break;
        default:
            return k;
            break;
    }
}

function isHoliday(d){
    var holidays = [
        new Date("9/7/2020"),
        new Date("11/11/2020"),
        new Date("11/23/2020"),
        new Date("11/24/2020"),
        new Date("11/25/2020"),
        new Date("11/26/2020"),
        new Date("11/27/2020"),
        new Date("12/23/2020"),
        new Date("12/24/2020"),
        new Date("12/25/2020"),
        new Date("12/26/2020"),
        new Date("12/27/2020"),
        new Date("12/28/2020"),
        new Date("12/29/2020"),
        new Date("12/30/2020"),
        new Date("12/31/2021"),
        new Date("1/1/2021"),
        new Date("1/2/2021"),
        new Date("1/3/2021"),
        new Date("1/4/2021"),
        new Date("1/18/2021"),
        new Date("2/15/2021"),
        new Date("3/29/2021"),
        new Date("3/30/2021"),
        new Date("3/31/2021"),
        new Date("4/1/2021"),
        new Date("4/2/2021")
    ];

    for(var i = 0; i<holidays.length; i++){
        if(holidays[i].getTime() == d.getTime())
            return true;
    }
    
    return false;

}

currentDate();