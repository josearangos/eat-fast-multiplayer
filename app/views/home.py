from flask import render_template
from flask_socketio import emit
from app import app, socketio

users = []
points = []
x_init = 10
y_init = 100

@app.route('/')
def home():
    #return render_template('home.html')
    #return render_template('test.html')
    return render_template('game.html')

@app.route('/index')
def index():
    return render_template('index.html')


@socketio.on('connect')
def connect():
    print("Usuario Conectado!!!")

@socketio.on('addUser')
def addUser(user):
    
    global x_init,y_init
    
    y_init = y_init + 25


    user["x_label"] = x_init
    user["y_label"] = y_init

    users.append(user)

    emit('users',users,broadcast=True)
   

@socketio.on("updateNosePosition")
def updateNosePosition(user):
    for i, usr in enumerate(users):
        if usr["id"] == user["id"]:
            x_label = usr["x_label"]
            y_label = usr["y_label"]
            user["x_label"] = x_label
            user["y_label"] = y_label
            users[i]=user
            break
    emit("users",users,broadcast=True)        

