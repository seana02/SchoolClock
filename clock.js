function currentDate(){

    var date = new Date();



    if(date.getSeconds()%2==0)
        document.getElementById("flash").style.color = "yellow";
    else 
        document.getElementById("flash").style.color = "#aaffdd";

    //time
    {
        var hour = updateTime(date.getHours());
        var min = updateTime(date.getMinutes());
        var sec = updateTime(date.getSeconds());
        var am_pm = "AM";

        if(hour >= 12){
            hour -= 12;
            am_pm = "PM";
        }
        if(hour == 0){
            hour = 12;
        }
       
    document.getElementById("clock").textContent = hour + " : " + min + " : " + sec + " " + am_pm;
    document.title = hour + ":" + min + ":" + sec + " " + am_pm;

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
        document.getElementById("message").textContent = 180-dayCount + " Days Left";
        
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

            
            if(between(date, 15,15, 23,59)){
                document.getElementById("altid").style.color = "orange";
                document.getElementById("altid").textContent = "Tomorrow is Orange Day";
            }
            if(date.getDay()==0 || date.getDay()==6 || isHoliday(date)){
                document.getElementById("altid").style.color = "orange";
                document.getElementById("altid").textContent = "Next is Orange Day";
            }
            
        }
        //orange day
        else{
            document.getElementById("altid").style.color = "orange";
            document.getElementById("altid").textContent = "Orange Day";
            document.getElementById("schedule").style.borderColor = "orange";
            document.getElementById("p1").textContent = "2nd Period";
            document.getElementById("p2").textContent = "4th Period";
            document.getElementById("p3").textContent = "6th Period";

            
            if(between(date, 15,25, 23,59)){
                document.getElementById("altid").style.color = "#0055ff";
                document.getElementById("altid").textContent = "Tomorrow is Blue Day";
            }
            if(date.getDay()==0 || date.getDay()==6 || isHoliday(date)){
                document.getElementById("altid").style.color = "#0055ff";
                document.getElementById("altid").textContent = "Next is Blue Day";
            }
        }
    }

    

    //white on current period
    {
        var r;
        //hr
        if(between(date, 8,0, 8,10))
            r = -0.5;
        else if(between(date, 8,10, 8,30))
            r = 0;
        else if(between(date, 8,30, 8,40))
            r = 0.5;
        else if(between(date, 8,40, 10,10))
            r = 1;
        else if(between(date, 10,10, 10,20))
            r = 1.5;
        else if(between(date, 10,20, 11,50))
            r = 2;
        else if(between(date, 11,50, 11,55))
            r=3.5;
        else if(between(date, 11,55, 14,10))
            r = 4;
        else if(between(date, 14,10, 14,20))
            r = 4.5;
        else if(between(date, 14,20, 15,15))
            r = 5;
        else
            r = -1;

            for(var i=0; i<=5; i++){
                if(i == r)
                    document.getElementById("row" + r).style.color = "white";
                else if(r+0.5 == i){
                    if(date.getSeconds()%2==0)
                        document.getElementById("row" + (r+0.5)).style.color = "yellow";
                    if(date.getSeconds()%2==1)
                        document.getElementById("row" + (r+0.5)).style.color = "#aaffdd";
                }
                else
                    document.getElementById("row" + i).style.color = "#66ff99";
            }


            //color lunch period
            if(between(date, 11,55, 12,25) || between(date, 12,30, 13,00) || between(date, 13,05, 13,35) || between(date, 13,40, 14,10)){
                document.getElementById("row3").style.color = "white";
            }
            else if(between(date, 11,50, 11,55) || between(date, 12,25, 12,30) || between(date, 13,00, 13,05) || between(date, 13,35, 13,40)){
                if(date.getSeconds()%2==0)
                    document.getElementById("row3").style.color = "yellow";
                if(date.getSeconds()%2==1)
                    document.getElementById("row3").style.color = "#aaffdd";
            }



    }

    
    //change lunch display
    {

        if(between(date, 12,25, 13,00)){
            document.getElementById("lunch").textContent = "Lunch B";
            document.getElementById("time3").textContent = "12:30 - 1:00";
        }
        else if(between(date, 13,00, 13,35)){
            document.getElementById("lunch").textContent = "Lunch C";
            document.getElementById("time3").textContent = "1:05 - 1:35";
        }
        else if(between(date, 13,35, 14,10)){
            document.getElementById("lunch").textContent = "Lunch D";
            document.getElementById("time3").textContent = "1:40 - 2:10";
        }
        else{
            document.getElementById("lunch").textContent = "Lunch A";
            document.getElementById("time3").textContent = "11:55 - 12:25";
        }
    }


    //Hard-Coded Date Labels
    {
        
        
        if(date.getMonth()==11 && date.getDate()==22){
            document.getElementById("message").textContent = "LAST DAAYYY!!!";
        }
        
        if(date.getMonth()==11 && date.getDate()<=21){
            document.getElementById("message").textContent = (23 - date.getDate()) + " Days until Winter Break";
        }

        if(((date.getMonth()==11 && date.getDate()==21) || (date.getMonth()==1 && date.getDate()==2) || (date.getMonth()==2 && date.getDate()==15) || (date.getMonth()==3 && date.getDate()==14) || (date.getMonth()==4 && date.getDate()==20)) && between(date, 15,25, 23,59)){
            document.getElementById("altid").textContent = "Tomorrow is Early Release";
        }
        
        //early release scheduling
        //Dec22, Feb3, Mar16, Apr15, May21
        if((date.getMonth()==11 && date.getDate()==22) || (date.getMonth()==11 && date.getDate()==21 && between(date, 15,25, 23,59))){
            document.getElementById("time0").textContent = "8:10 - 9:00";
            document.getElementById("p0").textContent = "2nd Period";
            document.getElementById("time1").textContent = "9:05 - 9:55";
            document.getElementById("p1").textContent = "4th Period";
            document.getElementById("time2").textContent = "10:00 - 10:50";
            document.getElementById("p2").textContent = "6th Period";
            document.getElementById("time4").textContent = "10:55 - 12-55";
            document.getElementById("p3").textContent = "HR";
            document.getElementById("time5").textContent = "Happy";
            document.getElementById("p7").textContent = "Winter Break";
            
            document.getElementById("time3").textContent = "";
            document.getElementById("lunch").textContent = "";
            
            /*
            //change lunch display
            {

                if(between(date, 11,20 , 11,49)){
                    document.getElementById("lunch").textContent = "Lunch B (10th)";
                    document.getElementById("time3").textContent = "11:24 - 11:49";
                }
                else if(between(date, 11,49 , 12,18)){
                    document.getElementById("lunch").textContent = "Lunch C (11th)";
                    document.getElementById("time3").textContent = "11:53 - 12:18";
                }
                else if(between(date, 12,22 , 12,47)){
                    document.getElementById("lunch").textContent = "Lunch D (12th)";
                    document.getElementById("time3").textContent = "12:22 - 12:47";
                }
                else{
                    document.getElementById("lunch").textContent = "Lunch A (9th)";
                    document.getElementById("time3").textContent = "10:55 - 11:20";
                }
            }
            */
            
             //white on current period
            {
                var r;
                //hr
                if(between(date, 8,0, 8,10))
                    r = -0.5;
                else if(between(date, 8,10, 9,0))
                    r = 0;
                else if(between(date, 9,0 , 9,05))
                    r = 0.5;
                else if(between(date, 9,05 , 9,55))
                    r = 1;
                else if(between(date, 9,55 , 10,0))
                    r = 1.5;
                else if(between(date, 10,0 , 10,50))
                    r = 2;
                else if(between(date, 10,50 , 10,55))
                    r=3.5;
                else if(between(date, 10,55 , 12,47))
                    r = 4;
                else if(between(date, 12,47 , 12,52))
                    r = 4.5;
                else if(between(date, 12,52 , 12,55))
                    r = 5;
                else
                    r = -1;

                    for(var i=0; i<=5; i++){
                        if(i == r)
                            document.getElementById("row" + r).style.color = "white";
                        else if(r+0.5 == i){
                            if(date.getSeconds()%2==0)
                                document.getElementById("row" + (r+0.5)).style.color = "yellow";
                            if(date.getSeconds()%2==1)
                                document.getElementById("row" + (r+0.5)).style.color = "#aaffdd";
                        }
                        else
                            document.getElementById("row" + i).style.color = "#66ff99";
                    }


                    /*
                    //color lunch period
                    if(between(date, 10,55 , 11,20) || between(date, 11,24 , 11,49) || between(date, 11,53 , 12,18) || between(date, 12,22 , 12,47)){
                        document.getElementById("row3").style.color = "white";
                    }
                    else if(between(date, 10,50 , 10,55) || between(date, 11,20 , 11,24) || between(date, 11,49 , 11,53) || between(date, 12,18 , 12,22)){
                        if(date.getSeconds()%2==0)
                            document.getElementById("row3").style.color = "yellow";
                        if(date.getSeconds()%2==1)
                            document.getElementById("row3").style.color = "#aaffdd";
                    }
                    */


            }
            
        }//end early release scheduling for 12/22
        
        if(date.getMonth()==0 && date.getDate()<=15){
            document.getElementById("message").textContent = "All virtual until Jan 19th";
        }
        
        //virtual scheduling for 12/18-12/21
        if((date.getMonth()==11 && ((date.getDate()>=18 && date.getDate()<=20) || (date.getDate()==21 && date.getHours()<=15))) || (date.getMonth()==0 && date.getDate()<=15)){
            document.getElementById("time0").textContent = "8:10 - 8:35";
            document.getElementById("time1").textContent = "8:45 - 10:15";
            document.getElementById("time2").textContent = "10:25 - 11:55";
            document.getElementById("time3").textContent = "11:55 - 12:55";
            document.getElementById("lunch").textContent = "Lunch";
            document.getElementById("time4").textContent = "12:55 - 2:25";
            document.getElementById("time5").textContent = "2:35 - 3:25";
            
            
             //white on current period
            {
                var r;
                //hr
                if(between(date, 8,0, 8,10))
                    r = -0.5;
                else if(between(date, 8,10, 8,35))
                    r = 0;
                else if(between(date, 8,35 , 8,45))
                    r = 0.5;
                else if(between(date, 8,45 , 10,15))
                    r = 1;
                else if(between(date, 10,15 , 10,25))
                    r = 1.5;
                else if(between(date, 10,25 , 11,55))
                    r = 2;
                else if(between(date, 11,55 , 12,55))
                    r = 3;
                else if(between(date, 12,55 , 14,25))
                    r = 4;
                else if(between(date, 14,25 , 14,35))
                    r = 4.5;
                else if(between(date, 14,35 , 15,25))
                    r = 5;
                else
                    r = -1;

                    for(var i=0; i<=5; i++){
                        if(i == r)
                            document.getElementById("row" + r).style.color = "white";
                        else if(r+0.5 == i){
                            if(date.getSeconds()%2==0)
                                document.getElementById("row" + (r+0.5)).style.color = "yellow";
                            if(date.getSeconds()%2==1)
                                document.getElementById("row" + (r+0.5)).style.color = "#aaffdd";
                        }
                        else
                            document.getElementById("row" + i).style.color = "#66ff99";
                    }


            }
            
        }//end virtual schedule for 12/18-12/21
        

        if(date.getMonth()==11 && date.getDate()==25){
            document.getElementById("message").textContent = "Merry Christmas!!";

            var time = document.getElementsByClassName("time");
            for(var i=0; i<time.length; i++){
                time[i].style.color = "red";
            }

            var period = document.getElementsByClassName("period");
            for(var i=0; i<period.length; i++){
                period[i].style.color = "white";
            }

            if(date.getSeconds()%3==0){
                document.getElementById("clock").style.color = "red";
            }
            else if(date.getSeconds()%3==1){
                document.getElementById("clock").style.color = "white";
            }
            else{
                document.getElementById("clock").style.color = "#1FD537";
            }
            
            if(date.getMonth()==8 && date.getDate()==23){
                document.getElementById("clock").style.color = "#F8ABBA";
            }
        }
        
        

    }




    var t = setTimeout(currentDate, 1000);
}

function between(d, h1,m1, h2,m2){
    var h = d.getHours();
    var m = d.getMinutes();

    if(h1==h2 && h==h1){
        if(m1 <= m && m < m2)
            return true;
        return false;
    }   

    if(h1 < h && h < h2)
        return true;
    if(h1 == h && m1 <= m)
        return true;
    if(h2 == h && m < m2)
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
        new Date("10/12/2020"),
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
        new Date("12/31/2020"),
        new Date("1/1/2021"),
        new Date("1/2/2021"),
        new Date("1/3/2021"),
        new Date("1/4/2021"),
        new Date("1/5/2021"),
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
