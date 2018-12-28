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

function filterData(data, currentYear, currentMonth, currentDay)
{
    var result = {};

    for (var year in data)
    {
        if (year < currentYear)
            continue;
        else if (year > currentYear)
            result[year] = data[year];
        else
        {
            for (var month in data[year])
            {
                if (month < currentMonth)
                    continue;
                else if (month > currentMonth)
                    result[year][month] = data[year][month];
                else
                {
                    for (var day in data[year][month])
                    {
                        if (day < currentDay)
                            continue;
                        else
                        {
                            if (!(year in result))
                                result[year] = {};
                            if (!(month in result[year]))
                                result[year][month] = {};

                            result[month][day] = data[month][day];
                        }
                    }
                }
            }
        }
    }

    return result;
}

function makeCalendar(date, data) {
    var currentYear  = date.getFullYear();
    var currentMonth = date.getMonth();
    var currentDay   = date.getDate();

    filteredData = filterData(data, currentYear, currentMonth, currentDay);

    var html = "";

    html += "<div id='calendar'>"

    for (var year in filteredData)
    {
        html += "<h2>" + year + "</h2>";
        html += "<table>";

        for (var month in filteredData[year])
        {
            html += "<tr>";
            html += "<th colspan='2'>"
                    + monthNames[parseInt(month)]
                    + "</th>";
            html += "</tr>";

            for (var day in filteredData[year][month])
            {
                var gig       = filteredData[year][month][day];
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

        html += "<table>";
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
