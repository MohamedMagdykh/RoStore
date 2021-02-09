//////design///////
$("#dashboard-nav").on("click",function(){
    $(".bi-chevron-right").toggleClass("rotate");
      
})


$(".tabActive").on("click",function(){
    $(".tabActive").removeClass("active")
})

function sponsor(evt, option) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace("active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(option).style.display = "block";
    evt.currentTarget.className += " active";
  }
  $(document).ready(function(){
    $('#datepicker').datepicker({
        uiLibrary: 'bootstrap4'
    });
    $('#datepicker2').datepicker({
        uiLibrary: 'bootstrap4'
    });
    if (localStorage.getItem("typeUser")=="admin") {
        showSponser();
        getUsers();
        // console.log(localStorage.getItem("typeUser"))
        $("#dashboard-nav").show();
        
    }

   
  })

   function addSponsre(){
       if(files2.length ==urlFiles2.length && urlFiles2.length!=0 ){
       
       var info = {
           "Logo":urlFiles2,
           "NameCompany":document.getElementById("nameCompany").value,
           "dateFrom":new Date(document.getElementById("datepicker").value),
           "dateTo":new Date(document.getElementById("datepicker2").value),
       }
        
       firebase.firestore().collection("Sponser").add(info)
       .then(function(docRef) {
        document.getElementById("nameCompany").value = null
        document.getElementById("datepicker").value = null
        document.getElementById("datepicker2").value = null
        files2 = []
        urlFiles2 =[]
        document.getElementById("selectLogo").value = null
        document.getElementById("logodownloadbar").style.display='none'
        document.getElementById('imgSponsor').innerHTML='No Logo'
        $('.myLogo').remove();
        $('#noImgSponsor').show();


        
           toastr.success("Sponser Added")
           setTimeout(() => {
            
                sponserData =[]
                $("#dataSponserShow").empty()

                showSponser();

            
               $("#showAllSponser").click()
               
           }, 500);
          
           
       })
       .catch(function(error) {
           console.error("Error adding Sponser: ", error);
       });
    }
    else{
        toastr.warning("LOGO NOT DOWNLOAD YET")
    }
  }

  var files2 = [];
  var urlFiles2 =[]
  selectFileButton2= document.getElementById("selectLogo")
  addFileButton2= document.getElementById("addLogo")

  selectFileButton2.addEventListener('change', function selectLogo(e){ 
    files2 = e.target.files
    addFileButton2.style.backgroundColor="#007bff"
    addFileButton2.style.borderColor="#007bff;"
    addFileButton2.removeAttribute("disabled")
    document.getElementById('imgSponsor').innerHTML='You Select Logo'
});

var fullDirectory2 = "/logos";

addFileButton2.addEventListener('click', function UploadLogo(){ 

   
    for (var i = 0; i < files2.length; i++) {
        var logoFile =files2[i];
        

        uploadLogoAsPromise(logoFile);
        
    }
});


function uploadLogoAsPromise (imageFile) {
              
    $( "#addLogo" ).prop( "disabled", true );
    

var storageRef = firebase.storage().ref(fullDirectory2+"/"+imageFile.name);

//Upload file
var task = storageRef.put(imageFile);

//Update progress bar
task.on('state_changed',
function progress(snapshot){
    var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
    addFileButton2.style.marginLeft="28px"
    document.getElementById("logodownloadbar").style.display = 'inline'
    document.getElementById("logodownload").textContent = math.floor(percentage)+ "%"
    document.getElementById("logodownload").style.width = percentage + "%"
},

function error(err){
    toaster.error("Faild Refresh Page And Try Again")
    

},
function complete(){
    var downloadURL = task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        // console.log("File available at", downloadURL);
        urlFiles2.push(downloadURL)
        // console.log(urlFiles2)

      })
    
      
},

);

}
function readURLForDisplayLogo(input) {
    if (document.contains(document.getElementById("myLogo"))) {
        
        $('.myLogo').remove();
        
 }

if (input.files) {


    for (var i = 0; i < input.files.length; i++) {
    var reader = new FileReader();
    
    reader.onload = function(event) {
       
        $($.parseHTML('<div class="myLogo" id="myLogo"><img id="dispic" src='+event.target.result+' style="width:300px;height:300px;background-size: 100% 100% object-fit: contain;"></div>')).appendTo('#logoShow');
        
    }
    
    reader.readAsDataURL(input.files[i]); // convert to base64 string
  }


    
}

    
 
  }
  
  $("#selectLogo").change(function displayPics() {
    $('#noImgSponsor').hide();
 
    readURLForDisplayLogo(this);
    
  });

$("#btnAddSponser").on('click',function ValidateAddSponser(){
    
    var Logo = document.getElementById("selectLogo")
    var nameCompany = document.getElementById("nameCompany")
    var datepicker = document.getElementById("datepicker")
    var datepicker2 = document.getElementById("datepicker2")

if (!Logo.checkValidity()) {
$("#imgSponsorVal").fadeIn(1000).text(Logo.validationMessage)

} 
else{
$("#imgSponsorVal").fadeOut().text(Logo.validationMessage)

}
if (!nameCompany.checkValidity()) {
    $("#nameCompanyVal").fadeIn(1000).text(nameCompany.validationMessage)
    
    } 
    else{
    $("#nameCompanyVal").fadeOut().text(nameCompany.validationMessage)
    
    }
    if (!datepicker.checkValidity()) {
    $("#datepickerVal").fadeIn(1000).text(datepicker.validationMessage)
    
    } 
    else{
    $("#datepickerVal").fadeOut().text(datepicker.validationMessage)
    
    }
    if (!datepicker2.checkValidity()) {
        $("#datepicker2Val").fadeIn(1000).text(datepicker2.validationMessage)
        
        } 
        else{
        $("#datepicker2Val").fadeOut().text(datepicker2.validationMessage)
        
        }
    
        
            if(Logo.checkValidity() &&  datepicker.checkValidity() && datepicker2.checkValidity() && nameCompany.checkValidity()){
                addSponsre();

            }


})

var sponserData = []
function showSponser(){
    firebase.firestore().collection("Sponser").get()
    .then(function(querySnapshot) {
        
        querySnapshot.forEach(function(doc) {

        // console.log(doc.id, " => ", doc.data());
       
        sponserData.push({"data":doc.data(),"id":doc.id})

       
       
    });
   for (let i = 0; i < sponserData.length; i++) {
         const {Logo,NameCompany,dateFrom,dateTo }=sponserData[i].data
         var time = new Date(1970, 0, 1);
        time.setSeconds(dateFrom.seconds);
    
        var formatdate = new Date(time),
            month = '' + (formatdate.getMonth() + 1),
            day = '' + formatdate.getDate(),
            year = formatdate.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

            var time2 = new Date(1970, 0, 1);
        time2.setSeconds(dateTo.seconds);
    
        var formatdate2 = new Date(time2),
            month2 = '' + (formatdate2.getMonth() + 1),
            day2 = '' + formatdate2.getDate(),
            year2 = formatdate2.getFullYear();
    
        if (month2.length < 2) 
            month2 = '0' + month2;
        if (day2.length < 2) 
            day2 = '0' + day2;
         
    $("#dataSponserShow").append(
    `
    <tr>
    <td id="numberSponser">${i+1}</td>
    <td id="nameCompany">${NameCompany}</td>
    <td id="dateFrom">${[year, month, day].join('-')}</td>
    <td id="dateTo">${[year2, month2, day2].join('-')}</td>
    <td><button id="${sponserData[i].id}" class="btn btnDeleteLogo">Delete</button></td>
    </tr>
    `)
    $("#brand-slider").append(`<div class="brand-item"><img src="${Logo}" alt=""></div>`)
    
}
$(".btnDeleteLogo").on("click",function (){
   
    if (confirm('Are you sure ?')) {
     
        firebase.firestore().collection("Sponser").doc($(this).attr("id")).delete().then(function() {
            toastr.success("Sponser successfully deleted!");

            setTimeout(() => {
                sponserData =[]
                $("#dataSponserShow").empty()

                showSponser();

            }, 500);

        }).catch(function(error) {
            console.error("Error removing document: ", error);
        })
    }else
    {
      console.log('cancel')
    }
})

    // console.log(sponserData)
}).catch(function error(){
    toaster.error("Faild Refresh Page And Try Again")
    

})

}

$("#sponsor-nav").on("click",function(){
       $("#showAllSponser").css({
           "background":"#20b7ff",
           "color":"white"

       })
 

        $("#showAllSponser").click()

        

    
})
$("#AddSponserIcon").on("click",function(){


    $("#showAllSponser").css({
        "background-color": "rgb(240, 240, 240)",
        "color":"black"

    })
  
 
})

$("#showAllSponser").on("click",function(){

$("#showAllSponser").css({
    "background":"#20b7ff",
    "color":"white"
})

})
$("#showAllSponser").mouseenter( function(){
    $("#showAllSponser").css({
        "background":"#20b7ff",
        "color":"white"

    })

} ).mouseleave( function(){
    $("#showAllSponser").css({
        "background-color": "rgb(240, 240, 240)",
        "color":"black"

    })

} );

function getUsers(){
    var ALLusersData = []
    firebase.firestore().collection("users")
    .onSnapshot(function(querySnapshot) {
        
        ALLusersData = []
        $("#usersDataShow").empty()

        querySnapshot.forEach(function(doc) {
  
            ALLusersData.push({id:doc.id,data:doc.data()})
       
    });
   
    for (let i = 0; i < ALLusersData.length; i++) {
        const {date,fristName,lastName,mail,type }=ALLusersData[i].data
        var time = new Date(1970, 0, 1);
       time.setSeconds(date.seconds);
   
       var formatdate = new Date(time),
           month = '' + (formatdate.getMonth() + 1),
           day = '' + formatdate.getDate(),
           year = formatdate.getFullYear();
   
       if (month.length < 2) 
           month = '0' + month;
       if (day.length < 2) 
           day = '0' + day;

   
          
        if (type=="admin") {
            var change = ``
        }
        if (type=="company") {
            var change = `<button id="${ALLusersData[i].id}" value="client" class="btn updateAccount">change to client </button>`
        }
        if (type=="client") {
            var change = `<button id="${ALLusersData[i].id}" value="company" class="btn updateAccount">change to company </button>`
        }
   $("#usersDataShow").append(`
   <tr>
   <td id="numberUser">${i+1}</td>
   <td id="nameUser">${mail}</td>
   <td id="dateUser">${[year, month, day].join('-')}</td>
   <td id="nameUser">${type}</td>
   <td>${change}</td>
   </tr>
   `)
   $(".updateAccount").on("click",function(){
    if ($(this).attr("id")==ALLusersData[i].id) {
        

        
        firebase.firestore().collection("users").doc(ALLusersData[i].id).update({type:$("#"+$(this).attr("id")).val()}).then(
            function(){
                if ($(".updateAccount").val()=="company") {
                    var message = `Hi ${fristName} your Account change to client`
                }
                if ($(".updateAccount").val()=="client") {
                    var message = `Hi ${fristName} your Account change to company now you can add your products`
                    
                }
                var datareplay = {
                    replay:message,
                    idSender:ALLusersData[i].id,
                    date:new Date(),
                    namereplay:"RoStore",
                    subject:"Change Account Message",
                    read:false,
                }
               
               
                firebase.firestore().collection("NotificationsReply").add(datareplay).then(function(querySnapshot) {
                    toastr.success("Done")
                   
                });
             
            }
        )


    }
   })
   


    }
    
  }),err=>
  {
    this.toastr.errorToastr(err.message)
  }
  }
//   import * as admin from "firebase-admin";
// function test(){

//          admin.initializeApp();
//          admin.auth()
//   .getUser('uxrZlWQIVCXPr9MM46ViXrlt6uv1')
//   .then((userRecord) => {
//     // See the UserRecord reference doc for the contents of userRecord.
//     console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
//   })
//   .catch((error) => {
//     console.log('Error fetching user data:', error);
//   });
// }