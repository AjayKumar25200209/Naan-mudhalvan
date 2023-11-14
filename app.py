from flask import Flask,redirect,render_template,url_for,session,request
from datetime import datetime,timedelta
import mysql.connector
import json

mydb=mysql.connector.connect(
    host="localhost",
    user="root",
    password="Ajay@2002",
    database="mydatabase"
    
)
mycursor=mydb.cursor(dictionary=True)

app=Flask(__name__)
app.secret_key="Ajaykumar"
app.permanent_session_lifetime=timedelta(days=3)

@app.route('/',methods=["GET","POST"])
def index():
    
    return render_template("dashboard.html")

@app.route('/Home',methods=["GET","POST"])
def home():
    
    return render_template("dashboard.html")

@app.route('/Profile' , methods=["GET","POST"])
def profile():
    return render_template("profile.html")

@app.route('/place' , methods=['POST','GET'])
def place():
    if request.method=='POST':
        try:
            data=request.data.decode("utf-8")
            print(data)
            
            jdata=json.loads(data)
            date1=datetime.now()
            values=("test",jdata["biriyani"],jdata["pizza"],jdata["shawarma"],jdata["friedrice"],date1,"Active",jdata["totalprice"],jdata["biriyaniprice"],jdata["pizzaprice"],jdata["shawarmaprice"],jdata["friedriceprice"])
            mycursor.execute("insert into orders(owner,chickenbiriyani,pizza ,shawarma,friedrice,date,status,total,cbp,pp,sp,fp ) values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)" ,(values))
            mydb.commit()
            return "ok"
            
        except Exception as e:
            
            print(e)
            return e
        
    else:
        return redirect('Home')

if __name__=="__main__":
    app.run(debug=True) 