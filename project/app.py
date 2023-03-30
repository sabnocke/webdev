from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


# noinspection PyUnresolvedReferences
@app.route('/')
def web_route():
    return render_template('home.html')


@app.route('/create_event', methods=['POST'])
def create_event():
    data = request.get_json()
    print(data)
    return jsonify({
        "message": "Event created successfully.",
        "status": 200
    })


@app.route('/get_events', methods=['GET'])
def get_events():
    # load from database
    events = []
    formatted_events = []
    for event in events:
        formatted_event = {
            'title': event.title,
            'start': event.start_time.isoformat(),
            'end': event.end_time.isoformat(),
            'color': event.color
        }
        formatted_events.append(formatted_event)
        # I am not sure if this will work
    return jsonify(formatted_events)

tst: int = 1

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
