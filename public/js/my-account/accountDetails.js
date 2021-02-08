$(document).ready(function () {
  if (localStorage.getItem("checkGoToRequstOrder")=="false") {
        
        
    $("#account-nav").click()
}

    const getDataUser = new Promise((resolve, reject) => {
      resolve
      (
        $("#fristName").text("FristName : "+localStorage.getItem("fristName")),
        $("#lastName").text("LastName : "+localStorage.getItem("lastName")),
        $("#phone").text("Phone : "+ localStorage.getItem("phoneUser")),
        $("#mail").text("Mail : "+localStorage.getItem("mailUser")),
        $("#type").text( "Type : "+localStorage.getItem("typeUser"))
      )
  
      reject(error)
     
  })
  getDataUser.then(res =>
    {
      setTimeout(() =>
      {
   
       $("#account-nav").click()

        
        
      }, 1500);
    })
    
})
/////////////////fristname////////////////////////

var modalFristName = document.getElementById("myModalFristName");

// Get the button that opens the modal
var btnFristName = document.getElementById("btnFristName");

// Get the <span> element that closes the modal
var span1 = document.getElementById("closeFrist");

// When the user clicks on the button, open the modal 
btnFristName.onclick = function() {
  modalFristName.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span1.onclick = function() {
    console.log()
  modalFristName.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalFristName) {
    modalFristName.style.display = "none";
  }
}
/////////////////lastname////////////////////////

var modalLastName = document.getElementById("myModalLastName");

// Get the button that opens the modal
var btnLastName = document.getElementById("btnLastName");

// Get the <span> element that closes the modal
var span2 = document.getElementById("closeLast");

// When the user clicks on the button, open the modal 
btnLastName.onclick = function() {
    modalLastName.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span2.onclick = function() {
    modalLastName.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalLastName) {
    modalLastName.style.display = "none";
  }
}
/////////////////phone////////////////////////

var modalPhone = document.getElementById("myModalPhone");

// Get the button that opens the modal
var btnPhone = document.getElementById("btnPhone");

// Get the <span> element that closes the modal
var span3 = document.getElementById("closePhone");

// When the user clicks on the button, open the modal 
btnPhone.onclick = function() {
    modalPhone.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span3.onclick = function() {
    modalPhone.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalPhone) {
    modalPhone.style.display = "none";
  }
}
$("#btnFristNameUpdate").on("click",function(){
    var value = $("#fristNameInput").val()
    
    firebase.firestore().collection("users").doc(localStorage.getItem("idUser")).update({fristName:value}).then(
        function(){
            span1.click();
            $("#fristName").text("FristName : "+value)
            $("#fristNameInput").val("") 
            
         
        });
})
$("#btnLastNameUpdate").on("click",function(){
    var value = $("#LastNameInput").val()
    
    firebase.firestore().collection("users").doc(localStorage.getItem("idUser")).update({lastName:value}).then(
        function(){
            span2.click();
            $("#lastName").text("LastName : "+ value)
            $("#LastNameInput").val("") 

            
         
        });
})
$("#btnPhoneUpdate").on("click",function(){
    var value = $("#PhoneInput").val()
    
    firebase.firestore().collection("users").doc(localStorage.getItem("idUser")).update({phone:value}).then(
        function(){
            span3.click();
            $("#phone").text("Phone : "+value )
            $("#PhoneInput").val("") 
            
         
        });
})
