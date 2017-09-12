var monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

function zeroPad(value) {
    return ("0" + value).slice(-2);
}

function makeCalendar(year, month, data) {
    var table = "";
    var datesThisMonth = 0;

    table += "<div id='calendar'>"
    table += "<table>";
    table += "<th colspan='2'>" + monthNames[month] + " " + year + "</th>";

    for (var day = 1; day <= daysInMonth(year, month); day++) {
        var dateString = year + "-" + zeroPad(month + 1) + "-" + zeroPad(day);
        var details = data[dateString];

        if (details)
        {
            datesThisMonth += 1;

            table += "<tr>";
            table += "<td class='date'>" + day + "</td>";
            table += "<td>" + details + "</td>";
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

function update(year, month, data) {
    var date        = new Date(year, month);
    var actualYear  = date.getFullYear();
    var actualMonth = date.getMonth();

    $("#bck").off('click');
    $("#fwd").off('click');

    $("#dates").html(makeCalendar(actualYear, actualMonth, data));

    $("#bck").on('click', function() {
        update(actualYear, actualMonth - 1, data);
    });
    $("#fwd").on('click', function() {
        update(actualYear, actualMonth + 1, data);
    });
}

$(document).ready(function() {
    $("#dates").html("loading...");

    var date  = new Date();
    var year  = date.getFullYear();
    var month = date.getMonth();

    $.ajax({
        url: "data/dates.json",
        method: "GET",
        dataType: "json",
        success: function(data) {
            update(year, month, data);
        }
    });
});
