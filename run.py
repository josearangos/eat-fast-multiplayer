from app import app,socketio

if __name__ == "__main__":
    #socketio.run(app,host="192.168.1.121",port=8080)
    socketio.run(app)
    