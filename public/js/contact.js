

$(document).ready(function () {
    if(localStorage.getItem("typeUser")=="admin"){
        getNotifications();
        $("#contact").hide()
        $("#contactAdmin").show()

    }
   
    if(localStorage.getItem("checkLog")=="false"){
     
      $("#btnSendMessage").hide();
      $("#messageLog").show();
      
      }
      if(localStorage.getItem("checkLog")=="true"){
    
        $("#btnSendMessage").show();
        $("#messageLog").hide();
        
        }
      
    
    if(localStorage.getItem("typeUser")!="admin"){
        replyNotification();        
    }
    
   ///////maping/////////

//    moveMapToBerlin(map);

   
})



$("#btnSendMessage").on('click',function ValidateSendMessage(){
    var name = document.getElementById("nameContact")
    var Subject = document.getElementById("SubjectContact")
    var Message = document.getElementById("MessageContact")
    

    if (!name.checkValidity()) {
    $("#nameContactVal").fadeIn(1000).text(name.validationMessage)

    } 
    else{
        $("#nameContactVal").fadeOut().text(name.validationMessage)
        
        }
    if (!Subject.checkValidity()) {
    $("#SubjectContactVal").fadeIn(1000).text(Subject.validationMessage)

    } 
    else{
        $("#SubjectContactVal").fadeOut().text(Subject.validationMessage)
        
        }
    if (!Message.checkValidity()) {
        $("#MessageContactVal").fadeIn(1000).text(Message.validationMessage)
        
        } 
        else{
            $("#MessageContactVal").fadeOut().text(Message.validationMessage)
            
            }
            if(name.checkValidity() &&  Subject.checkValidity() && Message.checkValidity()){

                addSendMessage();

            }
});

function addSendMessage(){
    var data = {
        idUser:localStorage.getItem("idUser"),
        emailUser:localStorage.getItem("mailUser"),
        nameUser:$("#nameContact").val(),
        subject:$("#SubjectContact").val(),
        message:$("#MessageContact").val(),
        read:false,
        date:new Date(),
    } 
    firebase.firestore().collection("Notifications").add(data)
    .then(function(docRef) {
      
      
        toastr.success("Message Send")
        document.getElementById("nameContact").value = null
        document.getElementById("SubjectContact").value = null
        document.getElementById("MessageContact").value = null
       
    })
    .catch(function(error) {
        toastr.error("Send Message ", error);
    });
}

function getNotifications(){
    var NotificationsNotRead = []
    var allNotifications = []
    return  firebase.firestore().collection("Notifications").onSnapshot(
  function(querySnapshot) {
   
      if(allNotifications.length!=0){
        allNotifications = []
        NotificationsNotRead=[]
        $(".notification-item").remove()       
      }
      querySnapshot.forEach(function(doc) {
      
          allNotifications.push({id:doc.id,data:doc.data()})

  });
  allNotifications.sort(function(a,b){
           
    return b.data.date - a.data.date;
   
    
  });
  allNotifications.reverse();
    var dateshow= {"num":0,"char":""}
  for (let i = 0; i < allNotifications.length; i++) {
    var {idUser,emailUser,nameUser,subject,message,read,date,reply}= allNotifications[i].data
    var date1 = new Date();
    var finaldate = date1.getTime() - date.toDate().getTime()
    
  
 
   
    if(finaldate/1000>1)
    {
        var s = finaldate/1000
         dateshow.num=s
        dateshow.char="s"

        if(s/60>1)
        {
            
            var m = s/60
            dateshow.num=m
            dateshow.char="m"
                if(m/60>1)
            { 
                var h = m/60
                dateshow.num=h
                dateshow.char="h"
                    if(h/24>1)
                    {
                        var d = h/24
                        dateshow.num=d
                        dateshow.char="d"
                        if(d/7>1)
                        {
                            var w = d/7
                            dateshow.num=w
                            dateshow.char="w"
                            if(w/4>1)
                            {
                                    var month = w/4
                                dateshow.num=month
                                dateshow.char="month"
                                if(month/12>1)
                                {
                                    var y = month/12
                                    dateshow.num=y
                                    dateshow.char="y"
                                }

                        

                            }
                        }
                    }
            }  
        }  
  

    }
    dateshow.num = Math.floor(dateshow.num)
    date= {num:dateshow.num,char:dateshow.char }
    if(localStorage.getItem("typeUser")=="admin"){
        $("#footerModel").show()

  
    if(read==false){
        $(` <div class="notification-item" style="position:relative;" id="${allNotifications[i].id}" onclick="document.getElementById('id01').style.display='block'">
        <h4 class="item-title">${nameUser}</h4>
        <span style="font-family: Krungthep;">${subject}:</span>
        <p class="item-info" style="margin: 0 auto 4vh auto;display: -webkit-box;
        -webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;">${message}</p>
        <span style="position: absolute;right: 5px;bottom: 5px;color: rgb(126, 123, 123);">${date.num}${date.char}</span>
      </div>`).insertAfter($("#divider"))
     
        NotificationsNotRead.push(allNotifications[i])

    }
    if(read==true){
        $(` <div class="notification-item" style="position:relative;" style="background:#edeff1;" id="${allNotifications[i].id}" onclick="document.getElementById('id01').style.display='block'">
        <h4 class="item-title">${nameUser}</h4>
        <span style="font-family: Krungthep;">${subject}:</span>
        <p class="item-info" style="margin: 0 auto 4vh auto;display: -webkit-box;
        -webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;">${message}</p>
        <span style="position: absolute;right: 5px;bottom: 5px;color: rgb(126, 123, 123);">${date.num}${date.char}</span>
      </div>`).insertAfter($("#divider"))
    }

   
    
$(".notification-item").on("click",function (){
      
    firebase.firestore().collection("Notifications").doc($(this).attr('id')).update({read:true})
  
 if(allNotifications.length!=0){

    if($(this).attr('id') == allNotifications[i].id){
       
        $(".namesender").text( "From: "+ allNotifications[i].data.nameUser)
        $(".subjectDisplay").text(allNotifications[i].data.subject)
        $(".messageDisplay").text(allNotifications[i].data.message)
      
        if(localStorage.getItem("typeUser")=="admin" && $(this).attr('id') == allNotifications[i].id ){
          var  idDelete = $(this).attr('id')
          $("#deleteNotification").one("click",function()
          {
              firebase.firestore().collection("Notifications").doc(idDelete).delete().then(function() {
                  document.getElementById('id01').style.display='none'
                  
      
              }).catch(function(error) {
                  console.error("Error removing document: ", error);
              })
      
           })
        
        $("#replayNotificationBtn").one("click",function(){

            var datareplay = {
                replay:$("#replayNotification").val(),
                idSender:idUser,
                date:new Date(),
                namereplay:"RoStore",
                subject:"Replay On You",
                read:false,
                idAdmin:localStorage.getItem("idUser"),
                yourRequst:{
                    mysubject:allNotifications[i].data.subject,
                    myMessage:allNotifications[i].data.message

                }
            }
           
            firebase.firestore().collection("NotificationsReply").add(datareplay).then(function(querySnapshot) {
                toastr.success("Your Reply Added")
                document.getElementById("replayNotification").value=null
                document.getElementById('id01').style.display='none'
            });
         
        });
      
    
      
 
    
    }

    }
}


})
}


  }

 


   if(NotificationsNotRead.length==0){
       $("#numberNotifications").hide()
       
   }
   if(NotificationsNotRead.length!=0){
   
    document.getElementById("numberNotifications").innerHTML= NotificationsNotRead.length
    $("#numberNotifications").show()

   }

 }),err=>
 {
   this.toastr.errorToastr(err.message)
 }

}



var allNotificationsReply = []
var NotificationsReplyNotRead = []
function replyNotification(){
  
  


    return firebase.firestore().collection("NotificationsReply")
    .onSnapshot((querySnapshot) => {
        if(allNotificationsReply.length!=0){
            allNotificationsReply = []
            NotificationsReplyNotRead=[]
            $(".notification-item").remove()
    
        }
        
        querySnapshot.forEach((doc) => {
           
            allNotificationsReply.push({id:doc.id,data:doc.data()})

            // console.log("Docs data: ", doc.data());

          })
  
         
   allNotificationsReply.sort(function(a,b){
    return b.data.date - a.data.date;
  });
  allNotificationsReply.reverse();
  for (let i = 0; i < allNotificationsReply.length; i++) {
   

      var {replay,idSender,date,namereplay,subject,read,idAdmin,yourRequst}=allNotificationsReply[i].data
      var date2 = new Date();
      var finaldate2 = date2.getTime() - date.toDate().getTime()
      var dateshow2= {"num":0,"char":""}
            if(finaldate2/1000>1)
            {
                var s2 = finaldate2/1000
                dateshow2.num=s2
                dateshow2.char="s"
        
                if(s2/60>1)
                {
                    
                    var m2 = s2/60
                    dateshow2.num=m2
                    dateshow2.char="m"
                        if(m2/60>1)
                    { 
                        var h2 = m2/60
                        dateshow2.num=h2
                        dateshow2.char="h"
                            if(h2/24>1)
                            {
                                var d2 = h2/24
                                dateshow2.num=d2
                                dateshow2.char="d"
                                if(d2/7>1)
                                {
                                    var w2 = d2/7
                                    dateshow2.num=w2
                                    dateshow2.char="w"
                                    if(w2/4>1)
                                    {
                                            var month2 = w2/24
                                        dateshow2.num=month2
                                        dateshow2.char="month"
                                        if(month2/12>1)
                                        {
                                            var y2 = month2/12
                                            dateshow2.num=y2
                                            dateshow2.char="y"
                                        }
        
                                
        
                                    }
                                }
                            }
                    }  
                    
            
        
            }
        }
        dateshow2.num = Math.floor(dateshow2.num)
        var date3= {num:dateshow2.num,char:dateshow2.char }
       
      if(idSender == localStorage.getItem("idUser") ){
        
         

        if(read==false){
  
            
              $(` <div class="notification-item" style="position:relative;" id="${allNotificationsReply[i].id}" onclick="document.getElementById('id01').style.display='block'">
              <h4 class="item-title">${namereplay}</h4>
              <span style="font-family: Krungthep;">${subject}:</span>
              <p class="item-info" style="margin: 0 auto 4vh auto;display: -webkit-box;
              -webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;">${replay}</p>
              <span style="position: absolute;right: 5px;bottom: 5px;color: rgb(126, 123, 123);">${date3.num}${date3.char}</span>
            </div>`).insertAfter($("#divider"))
            
            NotificationsReplyNotRead.push(allNotificationsReply[i].data)
      
          }
          if(read==true){
              
              $(`
              
               <div class="notification-item" style="position:relative;" style="background:#edeff1;" id="${allNotificationsReply[i].id}" onclick="document.getElementById('id01').style.display='block'">
              <h4 class="item-title">${namereplay}</h4>
              <span style="font-family: Krungthep;">${subject}:</span>
              <p class="item-info" style="margin: 0 auto 4vh auto;display: -webkit-box;
              -webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;">${replay}</p>
              <span style="position: absolute;right: 5px;bottom: 5px;color: rgb(126, 123, 123);">${date3.num}${date3.char}</span>
              
            </div>`).insertAfter($("#divider"))
          }
          $(".notification-item").on("click",function (){
            firebase.firestore().collection("NotificationsReply").doc($(this).attr('id')).update({read:true})
            if(allNotificationsReply.length!=0){
            if($(this).attr('id') == allNotificationsReply[i].id){
                // $(".mySubject").text(`${yourRequst.mysubject}`+":")
                var idDeletee = $(this).attr('id')
                if(yourRequst != undefined && yourRequst != "undefined" && yourRequst != null && yourRequst != "null"){
                    $(".sended").show()
                    $(".Mymessage").text(`${yourRequst.myMessage}`)   
                }
                 
            $(".namesender").text( "From: "+ `${namereplay}`)
            $(".subjectDisplay").text(`${subject}`+":")
            $(".messageDisplay").text(`${replay}`)
            $("#deleteNotification").on("click",function(){
                firebase.firestore().collection("NotificationsReply").doc(idDeletee).delete().then(function() {
                    document.getElementById('id01').style.display='none'


                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                })

            })

         
           
        }
    }
            
   

          });

      }
      
      
  }
  
  if(NotificationsReplyNotRead.length==0){
    $("#numberNotifications").hide()
    
}
if(NotificationsReplyNotRead.length!=0){

 document.getElementById("numberNotifications").innerHTML= NotificationsReplyNotRead.length
 $("#numberNotifications").show()
}
})
,err=>
       {
         this.toastr.errorToastr(err.message)
       }
}

  

  