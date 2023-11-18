from flask import Flask,redirect,render_template,url_for,session,request
from datetime import datetime,timedelta
import mysql.connector
import json

mydb=mysql.connector.connect(
    host="localhost",
    user="root",
    password="Ajay@2002",
    database="mydatabase",
    
)
mycursor=mydb.cursor(dictionary=True)

app=Flask(__name__)
app.secret_key="Ajaykumar"
app.permanent_session_lifetime=timedelta(days=3)


@app.route('/',methods=["GET","POST"])
def index():
    
    return render_template("login.html")

@app.route('/Home',methods=["GET","POST"])
def home():
    if request.method=='GET':
        if session.get("email") :
            return render_template("dashboard.html")
        else:
            return redirect('/Login')
    else:
        return "access denied"
            
    
    

@app.route('/Profile' , methods=["GET","POST"])
def profile():
        if session.get('email'):
            mycursor.execute("select * from userinfo where uemail=%s" , (session['email'],)) 
            result=mycursor.fetchone()
            
            return render_template("profile.html" , result=result)
        else:
            return redirect('/Login')

@app.route('/My_Orders' , methods=["GET","POST"])
def myorders():
    if request.method=='GET':
        if session.get('email'):
            try:
                mycursor.execute("select * from orders where owner=%s" ,(session['email'],))
                orders=mycursor.fetchall()
                return render_template("myorders.html" , orders=orders)
            except Exception as e:
                Error="please try again"
                print(e)
                return render_template("myorders.html" , Error=Error)
        else:
            return redirect('/Login')
    else:
        return redirect("/Login")

@app.route('/Login' , methods=["GET","POST"])
def login():
    if request.method=='POST':
        data=request.data.decode("utf-8")
        jdata=json.loads(data)
        mycursor.execute("select * from userinfo where uemail=%s and upass=%s" ,(jdata["email"],jdata["password"]))
        result=mycursor.fetchone()
        if result:
            session["email"]=jdata["email"]
            session["phone"]=jdata["phone"]
            session.permanent=True
            
            return "ok"
        else:
            msg="wrong password or wrong email"
            return msg
    else:
        if session.get("email"):
            return redirect('/Home')
        else:
            return render_template("login.html")
                

@app.route('/signup' , methods=["GET","POST"])
def signup():
    if request.method=='POST':
        data=request.data.decode("utf-8")
        jdata=json.loads(data)
        username=jdata["username"]
        phone=jdata["phone"]
        mycursor.execute("select * from userinfo where uemail=%s or unumber=%s " ,(jdata["email"],phone))
        result=mycursor.fetchall()
        if result:
            return "this Email or phone number already taken"
        else:
            try:
                print(jdata)
                
                values=(jdata["username"] , jdata["email"], jdata["phone"], jdata["password"], jdata["address"] )
                mycursor.execute("INSERT INTO userinfo (uname, uemail, unumber, upass, uaddress) VALUES (%s, %s, %s, %s, %s)", (values))
                mydb.commit()
                session["email"]=jdata["email"]
                session["username"]=jdata["username"]
                session["phone"]=jdata["phone"]
                session.permanent=True

                return "ok"
            except Exception as e:
                print(e)
                return f"{e}"
    else:
        if session.get("email"):
            return redirect(url_for("home"))
        else:
            return render_template("signup.html")

@app.route('/place' , methods=['POST','GET'])
def place():
    if request.method=='POST':
        try:
            data=request.data.decode("utf-8")
            print(data)
            
            jdata=json.loads(data)
            date1=datetime.now()
            values=(session["email"],jdata["biriyani"],jdata["pizza"],jdata["shawarma"],jdata["friedrice"],date1,"Active",jdata["totalprice"],jdata["biriyaniprice"],jdata["pizzaprice"],jdata["shawarmaprice"],jdata["friedriceprice"])
            mycursor.execute("insert into orders(owner,chickenbiriyani,pizza ,shawarma,friedrice,date,status,total,cbp,pp,sp,fp ) values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)" ,(values))
            mydb.commit()
            return "ok"
            
        except Exception as e:
            
            print(e)
            return e
        
    else:
        return redirect('Home')
 
@app.route('/logout' , methods=['POST','GET'])
def logout():   
    session["email"]=None
    session["username"]=None
    session["phone"]=None
    return redirect('/Login')


if __name__=="__main__":
    app.run(debug=True) 