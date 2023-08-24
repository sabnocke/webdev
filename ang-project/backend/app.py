from pathlib import Path
from pprint import pprint
from flask import Flask, request, send_from_directory, jsonify
from flask_cors import CORS

app = Flask(__name__, static_url_path="")
app.static_folder = "../frontend/src/"
CORS(app)


@app.route("/", defaults={"path": ""})
def serve():
    direc = Path(app.static_folder) if app.static_folder else None
    return (
        send_from_directory(direc, "main.tsx")
        if direc
        else "Static folder not configured"
    )


@app.route("/api/return", methods=["POST"])
def handle_data():
    data = request.get_json()
    pprint(data)
    return jsonify({"message": "Data received"})


@app.route("/api/receive", methods=["GET"])
def give_data():
    data = "Hello!"
    response = {"method": "get", "data": data}
    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True, host="localhost", port=5000)
