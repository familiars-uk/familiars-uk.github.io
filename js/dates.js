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
    var year  = date.getFullYear();
    var month = date.getMonth();

    var table = "";
    var datesThisMonth = 0;

    table += "<div id='calendar'>"
    table += "<table>";
    table += "<th colspan='2'>" + monthNames[month] + " " + year + "</th>";

    for (var day = 1; day <= daysInMonth(year, month); day++) {
        var daysDate = new Date(year, month, day);
        var dateString = year + "-" + zeroPad(month + 1) + "-" + zeroPad(day);
        var dayString  = dayNames[daysDate.getDay()];
        var gig = data[dateString];

        if (gig)
        {
            datesThisMonth += 1;

            table += "<tr>";
            table += "<td class='date' rowspan='2'>"
                     + dayString + " " + day + getOrdinalSuffix(day) + "</td>";
            table += "<td>" + gig.location + "</td>";
            table += "</tr>";
            table += "<tr>";
            table += "<td>" + gig.details + "</td>";
            table += "</tr>";
        }
    }

    if (0 == datesThisMonth) {
        table += "<tr>";
        table += "<td colspan='2'>No dates this month</td>";
        table += "</tr>";
    }

    table += "</table>";
    table += "</div>";

    return table;
}

function update(date, data) {
    $("#bck").off('click');
    $("#fwd").off('click');

    $("#dates").html(makeCalendar(date, data));

    var actualYear  = date.getFullYear();
    var actualMonth = date.getMonth();

    $("#bck").on('click', function() {
        update(new Date(actualYear, actualMonth - 1), data);
    });
    $("#fwd").on('click', function() {
        update(new Date(actualYear, actualMonth + 1), data);
    });
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
