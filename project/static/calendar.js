var calendar;

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'cs',
        firstDay: 1,
        displayEventTime: false,
        events: function (fetchInfo, successCallback, failureCallback) {
        fetch('/create_event')
            .then(response => response.json())
            .then(data => {
                var events = data.map(event => {
                    // create an event object from the data
                    return {
                        id: event.id,
                        title: event.title,
                        start: event.start_time,
                        end: event.end_time
                    };
                });
                successCallback(events);
            })
            .catch(error => {
                failureCallback(error);
            });
    }
    });

    calendar.render();
    setInterval(function () {
        updateCalendar();
    }, 300000)
});

function updateCalendar() {
    fetch('/get_events')
    .then(response => response.json())
    .then(data => {
        calendar.removeAllEvents();
        calendar.addEventSource(data);
        calendar.rerenderEvents();
    })
    .catch((error) => {
        console.error(error);
    });
}
