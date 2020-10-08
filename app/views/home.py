from flask import render_template
from flask_socketio import emit
from app import app, socketio
import random


users = []
points = []
x_init = 10
y_init = 100
n_balls = 8




def generate_circles(n_balls,width,height):
    circles_info = []
    random.seed(30)
    for i in range(n_balls):
        x = random.uniform(1,width)
        y = random.uniform(1,height / 3)
        d = random.randint(20,150)
        cc = [ random.randint(0,255),random.randint(0,255),255]
        s = random.randint(1,3)
        circles_info.append({"s":s,"cc":cc,"y":y,"x":x,"d":d})
        
    return circles_info

@app.route('/')
def home():
    return render_template('game.html')


@socketio.on('connect')
def connect():
    print("Usuario Conectado!!!")
    global  n_balls
    circles_info = generate_circles(n_balls,1100,900)
    emit('circles',circles_info)

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



