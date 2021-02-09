$(document).ready(function(){
    if(localStorage.getItem("fromLogin")=="true")
    {
        setTimeout(() => {
            if (!localStorage.getItem('foo')) { 
                localStorage.setItem('foo', 'no reload') 
                location.reload() 
              } else {
                localStorage.removeItem('foo') 
              }
            
        }, 2000);
        localStorage.removeItem("fromLogin")
    }
  
    if (localStorage.getItem("typeUser")!="client") {
          
        $("#requstOrders-nav").show()  
    }
    getOrders();  

    


setTimeout(() => {
    if (localStorage.getItem("checkGoToRequstOrder")=="false") {
        
        
        $("#account-nav").click()
    }
    
    if (localStorage.getItem("checkGoToRequstOrder")=="true") {
        
        
        $("#orders-nav").click()
        getOrders();  
        setTimeout(() => {
            if (!localStorage.getItem('foo')) { 
                localStorage.setItem('foo', 'no reload') 
                location.reload() 
              } else {
                localStorage.removeItem('foo') 
              }
              setTimeout(() => {
                localStorage.setItem("checkGoToRequstOrder",false)
                  
              }, 2000);
            
        }, 1500);

    }
    
}, 2000);
 

    setTimeout(() => {
        
        
  
   
        var show_per_pageRequstOrder = 5;
        var number_of_itemsRequstOrder = document.getElementById("tbodyRequstOrder").childElementCount
        var number_of_itemsRequstOrder = Math.ceil(number_of_itemsRequstOrder / show_per_pageRequstOrder);
    
        $('#paginationRequstOrder').append('<div style="margin-top: 2%;margin-bottom: 1%; display: inline-table;" class=controlsRequstOrder></div><input id=RequstOrdercurrent_page type=hidden><input id=show_per_pageRequstOrder type=hidden>');
        $('#RequstOrdercurrent_page').val(0);
        $('#show_per_pageRequstOrder').val(show_per_pageRequstOrder);
    
        var navigation_htmlRequstOrder = '<a class="prevvv" onclick="previousRequstOrder()">Prev</a>';
        var current_linkRequstOrder = 0;
        while (number_of_itemsRequstOrder > current_linkRequstOrder) {
            navigation_htmlRequstOrder += '<a class="pageRequstOrder" onclick="go_to_pageRequstOrder(' + current_linkRequstOrder + ')" longdesc="' + current_linkRequstOrder + '">' + (current_linkRequstOrder + 1) + '</a>';
            current_linkRequstOrder++;
        }
        navigation_htmlRequstOrder += '<a class="nexttt" style="color:black" onclick="nextRequstOrder()">Next</a>';
    
        $('.controlsRequstOrder').html(navigation_htmlRequstOrder);
        $('.controlsRequstOrder .pageRequstOrder:first').addClass('active');
    
        $('#tbodyRequstOrder').children().hide();
        $('#tbodyRequstOrder').children().slice(0, show_per_pageRequstOrder).show();

    },5000);
    setTimeout(() => {
        
        
  
   
        var show_per_pageOrder = 5;
        var number_of_itemsOrder = document.getElementById("tbodyMyOrder").childElementCount
        var number_of_itemsOrder = Math.ceil(number_of_itemsOrder / show_per_pageOrder);
    
        $('#paginationOrder').append('<div style="margin-top: 2%;margin-bottom: 1%; display: inline-table;" class=controlsOrder></div><input id=Ordercurrent_page type=hidden><input id=show_per_pageOrder type=hidden>');
        $('#Ordercurrent_page').val(0);
        $('#show_per_pageOrder').val(show_per_pageOrder);
    
        var navigation_htmlOrder = '<a class="prevvv" onclick="previousOrder()">Prev</a>';
        var current_linkOrder = 0;
        while (number_of_itemsOrder > current_linkOrder) {
            navigation_htmlOrder += '<a class="pageOrder" onclick="go_to_pageOrder(' + current_linkOrder + ')" longdesc="' + current_linkOrder + '">' + (current_linkOrder + 1) + '</a>';
            current_linkOrder++;
        }
        navigation_htmlOrder += '<a class="nexttt" style="color:black" onclick="nextOrder()">Next</a>';
    
        $('.controlsOrder').html(navigation_htmlOrder);
        $('.controlsOrder .pageOrder:first').addClass('active');
    
        $('#tbodyMyOrder').children().hide();
        $('#tbodyMyOrder').children().slice(0, show_per_pageOrder).show();
    },5000);
    
});

var orders = []
var ordershow = []
var orderRequstshow = []
function getOrders()
{
    firebase.firestore().collection("orders").onSnapshot(function(querySnapshot)
    {
        // console.log("1")
        localStorage.setItem("showOrder",false)
        localStorage.setItem("RequstshowOrder",false)
        orders = []
        ordershow = []
        orderRequstshow = []
        $("#tbodyMyOrder").empty()
        $("#tbodyRequstOrder").empty()
        querySnapshot.forEach(function(doc)
         {
             
                orders.push({"data":doc.data(),"id":doc.id})

             
            
           
            
         })
       

         
             orders.sort(function(a,b)
             {
               return b.data.date - a.data.date;
             });
         for (let i = 0; i < orders.length; i++)
        {
            
                firebase.firestore().collection("products").onSnapshot(function(querySnapshot)
                {
                    // console.log("2")
                    querySnapshot.forEach(function(doc)
                     {
                        for (let k = 0; k < orders[i].data.orders.length; k++)
                        {
                            
                            if(localStorage.getItem("idUser") == orders[i].data.orders[k].product.data.idUser && orders[i].data.orders[k].product.data.idProduct == doc.id )
                            {
                                
                                var price = parseFloat(doc.data().price) * parseFloat(orders[i].data.orders[k].amount)
                               
                                var time = new Date(1970, 0, 1);
                                
                                var date = new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short',day:'numeric'}).format(time.setSeconds(orders[i].data.date.seconds))
                                ordershow.push(doc.data())
                                // console.log(ordershow)
                                if(ordershow.length!=0)
                                {
                                    // console.log("3")
                                    localStorage.setItem("showOrder",true)

                                }
                                var status 
                                if (orders[i].data.orders[k].process == true) {
                                    status = '<td style="color: green;font-family: Beirut;">Approved</td>'
                                }
                                if (orders[i].data.orders[k].process == false) {
                                    status = '<td style="color: rgb(255, 82, 4);font-family: Beirut;">Wating</td>'
                                }
                                $("#tbodyMyOrder").append(`
                                           <tr>
                                                <td>
                                                 <div class="img">
                                                  <a href="#"><img style="object-fit: contain;width:50px;height:75px" src="${doc.data().photos[0]}" alt="Image"></a>
                                                 </div>
                                                </td>
                                                <td>${orders[i].data.orders[k].amount} ${doc.data().nameProduct}</td>
                                                <td>${date}</td>
                                                <td>$${price}</td>
                                                ${status}
                                            </tr>

                                `)

                                

                            }
                            if ( orders[i].data.orders[k].product.data.idProduct == doc.id && localStorage.getItem("mailUser") == doc.data().infoOwner.mail ) {
                                var price = parseFloat(doc.data().price) * parseFloat(orders[i].data.orders[k].amount)
                               
                                var time = new Date(1970, 0, 1);
                                
                                var date = new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short',day:'numeric'}).format(time.setSeconds(orders[i].data.date.seconds))
                                var status 
                                if (orders[i].data.orders[k].process == false) {
                                    status = `<td><button id="${orders[i].data.orders[k].product.data.idProduct}" style="color:white;border: 1px solid red;background:red;" class="btn ${orders[i].id}">Excute</button></td>`
                                }
                                if (orders[i].data.orders[k].process == true) {
                                    status = `<td><button  style="color:white;border: 1px solid green;background:green;" class="btn ">Done</button></td>`
                                }
                                orderRequstshow.push(doc.id)
                                if(orderRequstshow.length!=0)
                                {
                                    localStorage.setItem("RequstshowOrder",true)

                                }
                                $("#tbodyRequstOrder").append(`
                                           <tr>
                                                <td>
                                                 <div class="img">
                                                  <a href="#"><img style="object-fit: contain;width:50px;height:75px" src="${doc.data().photos[0]}" alt="Image"></a>
                                                 </div>
                                                </td>
                                                <td>${orders[i].data.orders[k].amount} ${doc.data().nameProduct}</td>
                                                <td>${date}</td>
                                                <td>$${price}</td>
                                                <td>${orders[i].data.address}</td>
                                                <td>${orders[i].data.phoneCustomer}</td>
                                                <td>${orders[i].data.nameCustomer}</td>
                                                ${status}
                                            </tr>
                                `)
                                $("."+orders[i].id).on("click",function(){
                                    
                                    if ($(this).attr("id")==orders[i].data.orders[k].product.data.idProduct) {

                                        orders[i].data.orders[k].process = true
                                        firebase.firestore().collection("orders").doc(orders[i].id).update({orders:orders[i].data.orders}).then(
                                            function(){
                                                
                                                var datareplay =
                                                 {
                                                    replay:"Hi your order "+doc.data().nameProduct+" will Arrival in week we contact you on your phone after week to give you your order",
                                                    idSender:orders[i].data.orders[k].product.data.idUser,
                                                    date:new Date(),
                                                    namereplay:"RoStore",
                                                    subject:"Arrival Order Message",
                                                    read:false,
                                                 }
                                                 
                                                // var datareplayAdmin = {
                                                //     message:"Hi your order "+doc.data().nameProduct+" will Arrival in week we contact you on your phone after week to give you your order",
                                                //     idUser:orders[i].data.orders[k].product.data.idUser,
                                                //     date:new Date(),
                                                //     nameUser:"RoStore",
                                                //     subject:"Arrival Order Message",
                                                //     read:false,
                                                // }
                                              
                                                    firebase.firestore().collection("NotificationsReply").add(datareplay).then(function(querySnapshot) {
                                                        toastr.success("Done")
                                                    
                                                    });
                                                
                                              
                                         
                                            }
                                        )


                                    }
                                })

                            }


                        }
                        
                       
                                                
                     })
                    
               
                     
                    });
                 
                    
            
            
          

           
            
        }
        
     
        

        
    })
    setTimeout(() => {
    //    console.log(localStorage.getItem("showOrder")) 
        if (localStorage.getItem("showOrder") == "false") {
            $("#userOrder").hide()
            $("#noUserOrder").show()
            localStorage.removeItem("showOrder")
            
        }
       //  console.log(orderRequstshow.length)
        if (localStorage.getItem("RequstshowOrder") == "false") {
            
            $("#companyOrder").hide()
            $("#nocompanyOrder").show()
            localStorage.removeItem("RequstshowOrder")
           
       }
       if (localStorage.getItem("showOrder") == "true") {

        $("#userOrder").show()
        $("#noUserOrder").hide()
        localStorage.removeItem("showOrder")
        
    }

    if (localStorage.getItem("RequstshowOrder") == "true") {
        $("#nocompanyOrder").hide()
        $("#companyOrder").show()
        localStorage.removeItem("RequstshowOrder")
       
    }
        
    }, 500);


}



function go_to_pageRequstOrder(page_num) {
    var show_per_pageRequstOrder = parseInt($('#show_per_pageRequstOrder').val(), 0);

    start_from = page_num * show_per_pageRequstOrder;

    end_on = start_from + show_per_pageRequstOrder;

    $('#tbodyRequstOrder').children().hide().slice(start_from, end_on).show();

    $('.pageRequstOrder[longdesc=' + page_num + ']').addClass('active').siblings('.active').removeClass('active');

    $('#RequstOrdercurrent_page').val(page_num);
}



function previousRequstOrder() {

    RequstOrdernew_page = parseInt($('#RequstOrdercurrent_page').val(), 0) - 1;
    //if there is an item before the current active link run the function
    if ($('.active').prev('.pageRequstOrder').length == true) {
        go_to_pageRequstOrder(RequstOrdernew_page);
    }

}

function nextRequstOrder() {
    RequstOrdernew_page = parseInt($('#RequstOrdercurrent_page').val(), 0) + 1;
    //if there is an item after the current active link run the function
    if ($('.active').next('.pageRequstOrder').length == true) {
        go_to_pageRequstOrder(RequstOrdernew_page);
    }

}
function go_to_pageOrder(page_num) {
    var show_per_pageOrder = parseInt($('#show_per_pageOrder').val(), 0);

    start_from = page_num * show_per_pageOrder;

    end_on = start_from + show_per_pageOrder;

    $('#tbodyMyOrder').children().hide().slice(start_from, end_on).show();

    $('.pageOrder[longdesc=' + page_num + ']').addClass('active').siblings('.active').removeClass('active');

    $('#Ordercurrent_page').val(page_num);
}



function previousOrder() {

    Ordernew_page = parseInt($('#Ordercurrent_page').val(), 0) - 1;
    //if there is an item before the current active link run the function
    if ($('.active').prev('.pageOrder').length == true) {
        go_to_pageOrder(Ordernew_page);
    }

}

function nextOrder() {
    Ordernew_page = parseInt($('#Ordercurrent_page').val(), 0) + 1;
    //if there is an item after the current active link run the function
    if ($('.active').next('.pageOrder').length == true) {
        go_to_pageOrder(Ordernew_page);
    }

}