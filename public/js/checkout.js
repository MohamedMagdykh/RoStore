
$(document).ready(function(){
    if(JSON.parse(localStorage.getItem("orders"))==null){
        location.href="product-list.html"

    }
    ordersList();

});
var dataOrderList = JSON.parse(localStorage.getItem("orders"))

function ordersList(){
    // console.log(dataOrderList)
    
    // var dataOrderList = JSON.parse(localStorage.getItem("orders"))
    // console.log(dataOrderList)
   
       firebase.firestore().collection("products").onSnapshot(function(querySnapshot) {
           var dataForNotificationCompany = []
           querySnapshot.forEach(function(doc) {
            for (let i = 0; i < dataOrderList.products.length; i++)
             {
                var {product:{id,data:{idUser,idProduct,date}},amount} = dataOrderList.products[i]
                if(doc.id == idProduct && idUser == localStorage.getItem("idUser") )
                {

                    var priceProdcuts = parseFloat(doc.data().price) * parseFloat(amount)
                    $(`<p id="productName">${amount} ${doc.data().nameProduct}<span id="productPrice">${priceProdcuts}</span></p>`).insertAfter(".Cart-Total")
                    dataForNotificationCompany.push({id:doc.data().infoOwner.id,type:doc.data().infoOwner.type,name:doc.data().infoOwner.name,productname:doc.data().nameProduct,mail:doc.data().infoOwner.mail})



                }
             }


           });
           localStorage.setItem("dataForNotificationCompany",JSON.stringify(dataForNotificationCompany))
           
           
          
       });
       $("#sub-total").text(dataOrderList.supTotal)
       $("#ship-cost").text(dataOrderList.ShippingCost)
       $("#Grandtotal").text(dataOrderList.GrandTotal)
       $("#nameUser").text("Name: "+localStorage.getItem("nameUser"))
       $("#E-mail").text("Mail: "+localStorage.getItem("mailUser"))
       $("#mobile").text("Phone: "+localStorage.getItem("phoneUser"))

   
}
$("#addOrder").on('click',function ValidateAddress(){
    
    const address = document.getElementById("address")
    const zipCode = document.getElementById("zipCode")

if (!address.checkValidity()) {
$("#addressVal").fadeIn(1000).text(address.validationMessage)

} 
else{
$("#addressVal").fadeOut().text(address.validationMessage)

}
if (!zipCode.checkValidity()) {
    $("#zipCodeVal").fadeIn(1000).text(zipCode.validationMessage)
    
    } 
    else{
    $("#zipCodeVal").fadeOut().text(zipCode.validationMessage)
    
    }
    
   
            if(zipCode.checkValidity() && address.checkValidity()){
            addOrder();

            }


})
function addOrder() 
{
    for (let i = 0; i < dataOrderList.products.length; i++) {
        dataOrderList.products[i] = {amount:dataOrderList.products[i].amount,product:dataOrderList.products[i].product,process:false}
        
        
    }
    
 
    var data = 
    {
        address:document.getElementById("address").value,
        zipCode:document.getElementById("zipCode").value,
        date:new Date(),
        orders:dataOrderList.products,
        idUser:localStorage.getItem("idUser"),
        nameCustomer:localStorage.getItem("nameUser"),
        phoneCustomer:localStorage.getItem("phoneUser")


       
    }
    firebase.firestore().collection("orders").add(data).then(function(docRef) {
        removeCartList();
        localStorage.removeItem("orders")
        
       
        
 
        
    }).then(function(){
        orderUserMessage();
    })

    .catch(function(error) {
        console.error("Error adding Product: ", error);
    });
}
function removeCartList()
{

    return  firebase.firestore().collection("CartList").onSnapshot(
    function(querySnapshot) 
    {
 
        querySnapshot.forEach(function(doc) {
            if(localStorage.getItem("idUser")== doc.data().idUser){
   
                firebase.firestore().collection("CartList").doc(doc.id).delete().then(function() {
                    
               

                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
            
        }
            

        })
    
   
    }),err=>
    {
        console.errorToastr(err.message)
    }
    

}

function orderUserMessage(){

    var datareplay = {
        replay:"Hi "+localStorage.getItem("nameUser")+" we will contact you soon for your order  ",
        idSender:localStorage.getItem("idUser"),
        date:new Date(),
        namereplay:"RoStore",
        subject:"Order Message",
        read:false,
    }
   
    firebase.firestore().collection("NotificationsReply").add(datareplay).then(function(querySnapshot) {
      
        orderCompanyMessage();
        orderCompanyClientMessage();
        if(localStorage.getItem("typeUser")=="admin") 
        {
            orderUserAdminMessage();
        }
       
    });
}

    function orderUserAdminMessage(){

        var datareplay = {
            message:"Hi "+localStorage.getItem("nameUser")+" we will contact you soon for your order  ",
            idUser:localStorage.getItem("idUser"),
            date:new Date(),
            nameUser:"RoStore",
            subject:"Order Message",
            read:false,
        }
       
        firebase.firestore().collection("Notifications").add(datareplay).then(function(querySnapshot) {
          
           
        });
  
  }
  function orderCompanyMessage(){
    var dataForNotificationCompany= JSON.parse(localStorage.getItem("dataForNotificationCompany"))

for (let i = 0; i < dataForNotificationCompany.length; i++) {
    if(dataForNotificationCompany[i].type == "admin"){
    var datareplay = {
        message:"Hi "+dataForNotificationCompany[i].name+" you have new orders for your product "+dataForNotificationCompany[i].productname+" go to requst order to complete process  ",
        idUser:dataForNotificationCompany[i].id,
        date:new Date(),
        nameUser:"RoStore",
        subject:"Requsts For Orders",
        read:false,
        emailUser:dataForNotificationCompany[i].mail
    }
   
    firebase.firestore().collection("Notifications").add(datareplay).then(function(querySnapshot) {
        
    });
    

setTimeout(() => {
    location.href="my-account.html"
    localStorage.setItem("checkGoToRequstOrder","true")
}, 1500);
}
}
  }
  function orderCompanyClientMessage(){
    var dataForNotificationCompany= JSON.parse(localStorage.getItem("dataForNotificationCompany"))

for (let i = 0; i < dataForNotificationCompany.length; i++) {

    console.log(dataForNotificationCompany[i])
    if(dataForNotificationCompany[i].type == "company"){
    var datareplay = {
        replay:"Hi "+dataForNotificationCompany[i].name+" you have new orders for your product "+dataForNotificationCompany[i].productname+" go to requst order to complete process  ",
        idSender:dataForNotificationCompany[i].id,
        date:new Date(),
        namereplay:"RoStore",
        subject:"Requsts For Orders",
        read:false,
    }
   
    firebase.firestore().collection("NotificationsReply").add(datareplay).then(function(querySnapshot) {
        
    });
    

setTimeout(() => {
    location.href="my-account.html"
    localStorage.setItem("checkGoToRequstOrder","true")
}, 2000);
}
}

  
  }
