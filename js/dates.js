var monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

var dayNames = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
]

function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

function getOrdinalSuffix(day) {
    switch(day) {
        case 1:
        case 21:
        case 31:
            return "st";
        case 2:
        case 22:
            return "nd";
        case 3:
        case 23:
            return "rd";
        default:
            return "th";
    }
}

function zeroPad(value) {
    return ("0" + value).slice(-2);
}

function makeCalendar(date, data) {
    var currentYear  = date.getFullYear();
    var currentMonth = date.getMonth();
    var currentDay   = date.getDate();

    var html = "";

    html += "<div id='calendar'>"

    for (var year in data)
    {
        if (year >= currentYear)
        {
            html += "<h2>" + year + "</h2>";
            html += "<table>";

            for (var month in data[year])
            {
                if (month >= currentMonth || year > currentYear)
                {
                    html += "<tr>";
                    html += "<th colspan='2'>"
                            + monthNames[parseInt(month)]
                            + "</th>";
                    html += "</tr>";

                    for (var day in data[year][month])
                    {
                        if (day >= currentDay)
                        {
                            var gig       = data[year][month][day];
                            var daysDate  = new Date(year, month, day);
                            var dayString = dayNames[daysDate.getDay()];

                            html += "<tr>";
                            html += "<td class='date' rowspan='2'>"
                                     + dayString + " "
                                     + day + getOrdinalSuffix(parseInt(day))
                                     + "</td>";
                            html += "<td>" + gig.location + "</td>";
                            html += "</tr>";
                            html += "<tr>";
                            html += "<td>" + gig.details + "</td>";
                            html += "</tr>";
                        }
                    }

                }
            }

            html += "<table>";
        }
    }

    html += "</div>";

    return html
}

function update(date, data) {
    $("#dates").html(makeCalendar(date, data));
}

$(document).ready(function() {
    $("#dates").html("loading...");

    $.ajax({
        url: "data/dates.json",
        method: "GET",
        dataType: "json",
        success: function(data) {
            update(new Date(), data);
        }
    });
});
