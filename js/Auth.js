$(document).ready(function () {

  $(".backgroundloader").show()
  setTimeout(() => {
      $(".backgroundloader").hide()
  }, 3000);
  

if(checkLog()==true){
  $("#LoginRegister").hide()
  $("#cartheart").show()
  numberWishList();
  numbercart();
  $("#btnRegister").hide()
  $("#btnLogin").hide()
  $("#wishlistCart").show()
  $("#buyCart").show()
  $("#dropdownNameUser").show()
  $("#dropdownNotification").show()





}
if(checkLog()==false){
  $("#LoginRegister").show()
  $("#cartheart").hide()
  $("#btnRegister").show()
  $("#btnLogin").show()
  $("#wishlistCart").hide()
  $("#buyCart").hide()
  $("#dropdownNameUser").hide()
  $("#dropdownNotification").hide()


}


})

    $(".btnSubmit").on('click',function validateFormRegister() {
      var fname = document.getElementById("fname");
  var lname = document.getElementById("lname");
  var phone = document.getElementById("phone");
  var mail = document.getElementById("mail");
  var password = document.getElementById("password");
  var repassword = document.getElementById("repassword");

  if (!fname.checkValidity()) {
    $("#fnameval").fadeIn(1000).text(fname.validationMessage)

  } 
  else{
      $("#fnameval").fadeOut()
  }

  if (!lname.checkValidity()) {
      $("#lnameval").fadeIn(1000).text(lname.validationMessage)
    } 
    else{
      $("#lnameval").fadeOut()
  }
    if (!mail.checkValidity()) {
      $("#mailval").fadeIn(1000).text(mail.validationMessage)
    } 
    else{
      $("#mailval").fadeOut()
  }
    if (!phone.checkValidity()) {
      $("#phoneval").fadeIn(1000).text(phone.validationMessage)
    } 
    else{
      $("#phoneval").fadeOut()
  }
    if (!password.checkValidity()) {
      $("#passwordval").fadeIn(1000).text(password.validationMessage)

    } 
    else{
      $("#passwordval").fadeOut()
  }
    if (!repassword.checkValidity()) {
      $("#repasswordval").fadeIn(1000).text(repassword.validationMessage)

    } 
    else{
      $("#repasswordval").fadeOut()
  } 
  if (repassword.value != password.value ) {
     
      toastr.error("Two Passwords Not Identical")

    } 

  if(lname.checkValidity() && lname.checkValidity() && mail.checkValidity() && phone.checkValidity() &&
   password.checkValidity() && repassword.checkValidity() && (repassword.value == password.value )) {

    Register(mail.value,password.value);
  }

    })
    
    function Register(mail,password){


 firebase.auth().createUserWithEmailAndPassword(mail, password).then(credential => {
  AddInfoUser(mail,password);

  return credential.user.updateProfile({
    displayName: document.getElementById("fname").value,
    phoneNumber: document.getElementById("phone").value
  })
  
    
 
   
  })
  
  .catch(function(error) {
      // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
   
      // toastr.error(error.message)
      // ...
    });

 
}
function login(mail,password){
    firebase.auth().signInWithEmailAndPassword(mail, password).then(credential => {
      VerificationLogIn();
      // console.log(checkFristLogin)
      toastr.success('LogIn') 
   
      if(checkFristLogin==false){
    
      setTimeout(() => {
        location.href = "my-account.html"
      }, 4000);
    }

      })
      
      .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
       
          toastr.error("Check Mail And Password Again")
          // ...
        });
}
function validateFormLogin() {
  var mailLog = document.getElementById("mailLog");
  var PassLog = document.getElementById("PasswordLog");
 
  if (!mailLog.checkValidity()) {
    $("#mailLogval").fadeIn(1000).text(PassLog.validationMessage)

  } 
  else{
    $("#mailLogval").fadeOut().text(PassLog.validationMessage)

  }
  if (!PassLog.checkValidity()) {
    $("#PasswordLogval").fadeIn(1000).text(PassLog.validationMessage)

  }
  else{
    $("#PasswordLogval").fadeOut().text(PassLog.validationMessage)

  }
  if(mailLog.checkValidity() && PassLog.checkValidity() ){
    // console.log(PassLog.value)
    login(mailLog.value,PassLog.value)


  }

 
}
function VerificationLogIn(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // console.log(user)
      localStorage.setItem('user', JSON.stringify(user)); 
      localStorage.setItem('UserLogMail', user.email);
      
       } else {
        //  console.log("1")
        localStorage.setItem('user', null);    }
  });
  setTimeout(() => {
    checkLog();
 
    // console.log(checkLog())
  }, 500);


}
 function checkLog() {
  
    const  user  =  localStorage.getItem('user')
  
    if(user!=null){
      // console.log("3")
      setTimeout(() => {
        
        getUsers();
      

      }, 1000);
      localStorage.setItem("checkLog",true)
      return true;
      
      
    }
    else{
      // console.log("4")
      localStorage.setItem("checkLog",false)
      return false;
    }
  
}


function LogOut(){
  firebase.auth().signOut().then(function() {
    localStorage.removeItem("user")
    localStorage.removeItem("UserLogMail")
    localStorage.removeItem("mailUser")
    localStorage.removeItem("phoneUser")
    localStorage.removeItem("nameUser")
    localStorage.removeItem("idUser")
    localStorage.removeItem("typeUser")
    localStorage.removeItem("orders")
    

    toastr.success('LogOut') 
    setTimeout(() => {
      location.href = "login.html"
      
    }, 1000);

  }).catch(function(error) {
    toastr.error(error.message)
  });

}
var checkFristLogin = false
function AddInfoUser(email,pass){
  
      var product = {
          "fristName": document.getElementById("fname").value,
          "lastName": document.getElementById("lname").value,
          "mail":email,
          "phone":document.getElementById("phone").value,
          "password":pass,
          "photos":null,
          "products":[],
          "date":new Date(),
          "type":"client",
          "order":[]
         
  
      }
      
      firebase.firestore().collection("users").add(product)
      .then(function(docRef) {
        checkFristLogin = true
       
          toastr.success("User Created")
         
          setTimeout(() => {  
            login(email,pass)
           }, 1000);

          
      })
      .catch(function(error) {
          toastr.error("Error Create User ", error);
      });
      

}

var usersData = []
var userLogInfo 
function getUsers(){
  firebase.firestore().collection("users")
  .onSnapshot(function(querySnapshot) {
      
      querySnapshot.forEach(function(doc) {

      // console.log(doc.id, " => ", doc.data());

      usersData.push({id:doc.id,data:doc.data()})
     
  });
  // console.log(usersData)
  for (let i = 0; i < usersData.length; i++) {
  //  console.log(localStorage.getItem("UserLogMail"))
  //  console.log(usersData[i].data.mail)
    if(usersData[i].data.mail==localStorage.getItem("UserLogMail")){
      userLogInfo = usersData[i].data
      localStorage.setItem("mailUser",usersData[i].data.mail)
      localStorage.setItem("phoneUser",usersData[i].data.phone)
      localStorage.setItem("fristName",usersData[i].data.fristName)
      localStorage.setItem("lastName",usersData[i].data.lastName)
      localStorage.setItem("nameUser",usersData[i].data.fristName + usersData[i].data.lastName )
      localStorage.setItem("idUser",usersData[i].id) 
      $("#showName").text(usersData[i].data.fristName)
      // console.log(usersData[i].data.type)
      localStorage.setItem("typeUser",usersData[i].data.type)
      if(checkFristLogin==true){
        setTimeout(() => {
          MessageCreateUser(usersData[i].id,usersData[i].data.fristName + usersData[i].data.lastName,usersData[i].data.mail);
          checkFristLogin = false
        }, 2000);
        
      }
    }
  }
  // console.log(userLogInfo)
}),err=>
{
  this.toastr.errorToastr(err.message)
}
}

function WelcomeMessage(id,name){

  var datareplay = {
      replay:"Welcome "+name+" We Hope You Good",
      idSender:id,
      date:new Date(),
      namereplay:"RoStore",
      subject:"Welcome Message",
      read:false,
      
  }
 
  firebase.firestore().collection("NotificationsReply").add(datareplay).then(function(querySnapshot) {
    location.href = "my-account.html"
      
  });

}
function MessageCreateUser(id,name,mail){
  var data = {
    idUser:id,
    emailUser:mail,
    nameUser:name,
    subject:"New User",
    message:"There is a new account created in RoStore by Name " + name, 
    read:false,
    date:new Date(),
} 
 
  firebase.firestore().collection("Notifications").add(data)
  .then(function(docRef) {
    WelcomeMessage(id,name)

  })
  .catch(function(error) {
      toastr.error("Send Message ", error);
  });

}
function numberWishList(){
  var productWishList = []
        
  return  firebase.firestore().collection("wishList").onSnapshot(
  function(querySnapshot) 
  {
    if(productWishList.length!=0){
      productWishList = []

    }
  
      querySnapshot.forEach(function(doc) {
          
              productWishList.push({id:doc.id,data:doc.data()})

      });
    
      for (let i = 0; i < productWishList.length; i++) {
          const {idUser,idProduct,date} = productWishList[i].data
  
          
          if(idUser == localStorage.getItem("idUser"))
          {
              // console.log("3")
              var productsDataWishList = []
              var LengthWishList=[]
              firebase.firestore().collection("products").onSnapshot(
                  function(querySnapshot)
                  {
                      productsDataWishList = []
          
                      querySnapshot.forEach(function(doc)
                       {
                         
                      // console.log(doc.id, " => ", doc.data());
                      
                       productsDataWishList.push({"data":doc.data(),"id":doc.id})
          
                      
                      
                      });
                      // console.log(productsDataWishList)
                      for (let j = 0; j < productsDataWishList.length; j++) {

                          if(idProduct==productsDataWishList[j].id && idUser == localStorage.getItem("idUser"))
                          {
                            LengthWishList.push(productsDataWishList[j].id)
                              
                            

                          }
                          
                      }
                      document.getElementById("numberWishList").innerHTML=`(${LengthWishList.length})`
                 }),err=>
                 {
                   this.toastr.errorToastr(err.message)
                 }
                 
   
          
          } 
      }
  }),err=>
  {
    this.toastr.errorToastr(err.message)
  }
}
function numbercart(){
  var productCart = []
        
  return  firebase.firestore().collection("CartList").onSnapshot(
  function(querySnapshot) 
  {
    if(productCart.length!=0){
      productCart = []

    }
  
      querySnapshot.forEach(function(doc) {
          
        productCart.push({id:doc.id,data:doc.data()})

      });
    
      for (let i = 0; i < productCart.length; i++) {
          const {idUser,idProduct,date} = productCart[i].data
  
          
          if(idUser == localStorage.getItem("idUser"))
          {
              // console.log("3")
              var productsDataCart = []
              var LengthCart=[]
              firebase.firestore().collection("products").onSnapshot(
                  function(querySnapshot)
                  {
                    productsDataCart = []
          
                      querySnapshot.forEach(function(doc)
                       {
                         
                      // console.log(doc.id, " => ", doc.data());
                      
                      productsDataCart.push({"data":doc.data(),"id":doc.id})
          
                      
                      
                      });
                      // console.log(productsDataWishList)
                      for (let j = 0; j < productsDataCart.length; j++) {

                          if(idProduct==productsDataCart[j].id && idUser == localStorage.getItem("idUser"))
                          {
                            LengthCart.push(productsDataCart[j].id)
                              
                            

                          }
                          
                      }
                      // console.log(LengthCart)
                      document.getElementById("buyCartNumber").innerHTML=`(${LengthCart.length})`
                 }),err=>
                 {
                   this.toastr.errorToastr(err.message)
                 }
                 
   
          
          } 
      }
  }),err=>
  {
    this.toastr.errorToastr(err.message)
  }
}
