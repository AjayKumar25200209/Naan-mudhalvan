
function biriyaniadd() {
    biriyani=document.getElementById("biriyani");
    biriyaniprice=document.getElementById("biriyaniprice");
    price=150;
    biriyani.innerHTML=Number(biriyani.innerHTML)+1;
    biriyaniprice.innerHTML=Number(biriyaniprice.innerHTML)+price;
    totalprice=document.getElementById("totalprice");
    totalprice.innerHTML=Number(totalprice.innerHTML)+150;

    
}



function biriyaniminus() {
    biriyani=document.getElementById("biriyani");
    if (!Number(biriyani.innerHTML)==0){
        biriyaniprice=document.getElementById("biriyaniprice");
        biriyani.innerHTML=Number(biriyani.innerHTML)-1;
        price=150;
        biriyaniprice.innerHTML=Number(biriyaniprice.innerHTML)-price;
        totalprice=document.getElementById("totalprice");
        totalprice.innerHTML=Number(totalprice.innerHTML)-150;

    }
    else{
        
    }
    
    
}


function pizzaadd() {
    pizza=document.getElementById("pizza");
    pizzaprice=document.getElementById("pizzaprice");
    price=200;
    pizza.innerHTML=Number(pizza.innerHTML)+1;
    pizzaprice.innerHTML=Number(pizzaprice.innerHTML)+price;
    totalprice=document.getElementById("totalprice");
    totalprice.innerHTML=Number(totalprice.innerHTML)+200;

    
}



function pizzaminus() {
    pizza=document.getElementById("pizza");
    if (!Number(pizza.innerHTML)==0){
        pizzaprice=document.getElementById("pizzaprice");
        price=200;
        pizza.innerHTML=Number(pizza.innerHTML)-1;
        pizzaprice.innerHTML=Number(pizzaprice.innerHTML)-price;
        totalprice=document.getElementById("totalprice");
        totalprice.innerHTML=Number(totalprice.innerHTML)-200;

    }
    else{
        
    }
    
    
}

function shawarmaadd() {
    shawarma=document.getElementById("shawarma");
    shawarmaprice=document.getElementById("shawarmaprice");
    price=90;
    shawarma.innerHTML=Number(shawarma.innerHTML)+1;
    shawarmaprice.innerHTML=Number(shawarmaprice.innerHTML)+price;
    totalprice=document.getElementById("totalprice");
    totalprice.innerHTML=Number(totalprice.innerHTML)+90;

    
}



function shawarmaminus() {
    shawarma=document.getElementById("shawarma");
    if (!Number(shawarma.innerHTML)==0){
        shawarmaprice=document.getElementById("shawarmaprice");
        price=90;
        shawarma.innerHTML=Number(shawarma.innerHTML)-1;
        shawarmaprice.innerHTML=Number(shawarmaprice.innerHTML)-price;
        totalprice=document.getElementById("totalprice");
        totalprice.innerHTML=Number(totalprice.innerHTML)-90;

    }
    else{
        
    }
    
    
}


function friedriceadd() {
    friedrice=document.getElementById("friedrice");
    friedriceprice=document.getElementById("friedriceprice");
    price=120;
    friedrice.innerHTML=Number(friedrice.innerHTML)+1;
    friedriceprice.innerHTML=Number(friedriceprice.innerHTML)+price;
    totalprice=document.getElementById("totalprice");
    totalprice.innerHTML=Number(totalprice.innerHTML)+120;

    
}



function friedriceminus() {
    friedrice=document.getElementById("friedrice");
    if (!Number(friedrice.innerHTML)==0){
        friedriceprice=document.getElementById("friedriceprice");
        price=120;
        friedrice.innerHTML=Number(friedrice.innerHTML)-1;
        friedriceprice.innerHTML=Number(friedriceprice.innerHTML)-price;
        totalprice=document.getElementById("totalprice");
        totalprice.innerHTML=Number(totalprice.innerHTML)-120;

    }
    else{
        
    }
    
    
}

function placeorder() {
    totalprice=document.getElementById("totalprice");
    if(Number(totalprice.innerHTML)==0){
        alert("Please Order Something and then Click")
    }
    else{

        biriyani=document.getElementById("biriyani").innerHTML
        pizza=document.getElementById("pizza").innerHTML
        friedrice=document.getElementById("friedrice").innerHTML
        shawarma=document.getElementById("shawarma").innerHTML
        biriyaniprice=document.getElementById("biriyaniprice").innerHTML
        pizzaprice=document.getElementById("pizzaprice").innerHTML
        friedriceprice=document.getElementById("friedriceprice").innerHTML
        shawarmaprice=document.getElementById("shawarmaprice").innerHTML
        
        fetch('/place' ,{
            method:'POST',
            body:JSON.stringify({"biriyani":biriyani,"pizza":pizza,"shawarma":shawarma,"friedrice":friedrice,"biriyaniprice":biriyaniprice,"pizzaprice":pizzaprice,"friedriceprice":friedriceprice,"shawarmaprice":shawarmaprice,"totalprice":totalprice.innerHTML})
        })

        .then(res=>{
            if (res.ok){
                return res.text()
            }
            else{
                throw "something wrong"
            }
        })
        .then(data=>{
            console.log(data);
            if (data=="ok"){
                document.querySelector(".message").style.display="block";
                document.getElementById("msg").innerHTML="Your Order Had been Successfully Recevied and To know About Your Order Status Go to My Orders"
            }
            else{
                document.querySelector(".message").style.display="block";
                document.getElementById("msg").innerHTML="Please try again later after some time"
            }
        })
        .catch(error=>{
            document.querySelector(".message").style.display="block";
            document.getElementById("msg").innerHTML=error;

        })
        

    }


    
}

document.addEventListener("DOMContentLoaded",function(){
    document.getElementById("close").addEventListener("click", function(){
        document.querySelector(".message").style.display="none";
        document.getElementById("msg").innerHTML=""
        biriyani=document.getElementById("biriyani").innerHTML="0"
        pizza=document.getElementById("pizza").innerHTML="0"
        friedrice=document.getElementById("friedrice").innerHTML="0"
        shawarma=document.getElementById("shawarma").innerHTML="0"
        biriyaniprice=document.getElementById("biriyaniprice").innerHTML="0"
        pizzaprice=document.getElementById("pizzaprice").innerHTML="0"
        friedriceprice=document.getElementById("friedriceprice").innerHTML="0"
        shawarmaprice=document.getElementById("shawarmaprice").innerHTML="0"
        document.getElementById("totalprice").innerHTML="0"
    
    })

})
