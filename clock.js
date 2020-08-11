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

    //blue day vs orange day
    {
        //blue day
        if(dayCount%2==1){
            document.getElementById("altid").style.color = "#0055ff";
            document.getElementById("altid").textContent = "Blue Day";
            document.getElementById("schedule").style.borderColor = "#0055ff";
            document.getElementById("p1").textContent = "1st Period";
            document.getElementById("p2").textContent = "3rd Period";
            document.getElementById("p3").textContent = "5th Period";
        }
        //before first day
        else if(dayCount==0){
            document.getElementById("altid").style.color = "#0055ff";

            if(17-date.getDate()==1)
                var daysLeft = "1 Day Until School";
            else
                var daysLeft = (17-date.getDate()) + " Days Until School";

            document.getElementById("altid").textContent = "First Day is Blue Day\r\n" + daysLeft;
            document.getElementById("schedule").style.borderColor = "#0033ff";
            document.getElementById("p1").textContent = "1st Period";
            document.getElementById("p2").textContent = "3rd Period";
            document.getElementById("p3").textContent = "5th Period";
        }
        //orange day
        else{
            document.getElementById("altid").style.color = "orange";
            document.getElementById("altid").textContent = "Orange Day";
            document.getElementById("schedule").style.borderColor = "orange";
            document.getElementById("p1").textContent = "2nd Period";
            document.getElementById("p2").textContent = "4th Period";
            document.getElementById("p3").textContent = "6th Period";
        }
    }

    //white on current period
    {
        var r;
        //hr
        if(between(date, 8,10, 8,35))
            r = 0;
        else if(between(date, 8,45, 10,15))
            r = 1;
        else if(between(date, 10,25, 11,55))
            r = 2;
        else if(between(date, 11,55, 12,55))
            r = 3;
        else if(between(date, 12,55, 14,25))
            r = 4;
        else if(between(date, 14,35, 15,25))
            r = 5;
        else
            r = -1;

            for(var i=0; i<=5; i++){
                if(i == r)
                    document.getElementById("row" + r).style.color = "white";
                else
                    document.getElementById("row" + i).style.color = "#66ff99";
            }



    }


    var t = setTimeout(currentDate, 1000);
}

function between(d, h1,m1, h2,m2){
    var h = d.getHours();
    var m = d.getMinutes();
    if(h1 < h && h < h2)
        return true;
    if(h1 == h && m1 <= m)
        return true;
    if(h2 == h && m <= m2)
        return true;
    return false;
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