var oneProduct = {}
var id

$(document).ready(function(){
    if(localStorage.getItem("checkLog")=="false")
    {
        $("#addToCartDetails").hide();
        $("#buyProduct").hide()
        $(".reviews-submit").hide()
      
      }
    
    displayOneProduct();
    
});
function displayOneProduct(){
    // console.log(localStorage.getItem("id"))
    firebase.firestore().collection("products").doc(localStorage.getItem("id"))
    .get()
    .then(function(doc) {
        if (doc.exists) {
            oneProduct = doc.data()
            // console.log("Document data:", doc.data());
            for (let i = 0; i < oneProduct.photos.length; i++) {

                // console.log(document.getElementById("photosOfOneProduct"))
                
                $("#photosOfOneProduct").append('<div class="mySlides " id="mySlides"><img id="dispic" src='+oneProduct.photos[i]+' style="width:100%;height:350px;background-size: 100% 100%;object-fit: contain;"></div>')
                
                document.getElementById("next").click()
                if(oneProduct.photos.length!=0){
                    document.getElementById("next").style.display = 'block'
                    document.getElementById("prev").style.display = 'block'

                }
            }
              
                $("#ProductName").text(oneProduct.nameProduct)
                $("#headDescribtion").text(oneProduct.nameProduct + " Description")
                $("#textDescribtion").text(oneProduct.describeProduct)
                $("#buyProduct").on("click",function(){
                    var ShippingCost
                    var quantityOrder =$("#quantityOrder").val()
                    var person = prompt("Inside cairo", "yes");
                    if (person=="yes") {
                         ShippingCost = 5
                        
                    }
                    else{
                         ShippingCost = 10
                
                    }
                    var supTotal = parseFloat(oneProduct.price) * parseFloat(quantityOrder)
                    var GrandTotal = ShippingCost + supTotal
                  
                    // console.log(productsData[i].data)
                    order = {
                        products:[{amount:quantityOrder,product:{data:{idProduct:localStorage.getItem("id"),idUser:localStorage.getItem("idUser"),date:new Date()}}}],
                        supTotal:supTotal,
                        ShippingCost:ShippingCost,
                        GrandTotal:GrandTotal
                    }
                    localStorage.setItem("orders",JSON.stringify(order))
                    setTimeout(() => {
                        location.href = "checkout.html"
                      }, 500);
                
                }),err=>
                {
                  this.toastr.errorToastr(err.message)
                }

                $("#productprice").text("$"+oneProduct.price)
                for (let i = 0; i < oneProduct.color.length; i++) {
                    
                        
                        if(oneProduct.color[i].hasOwnProperty("red")){

                            $("#red").show()
                            $("#red2").click()
                            if(Array.isArray(oneProduct.color[i].red)){
                                $("#sizeshow").show()


                                if( $('#red2').is(":checked")){
                                    jQuery('[id^=btnsize]').remove()
                                    jQuery('[id^=btnAmount]').remove()
                                     for (let j = 0; j < oneProduct.color[i].red.length; j++) {
                                     
                                     
                                         $("#sizeProduct").append('<button type="button" id="btnsize" class="btn">'+oneProduct.color[i].red[j].size+'</button>')
                                         $("#quantityProduct").append('<button type="button" id="btnAmount" class="btn">'+oneProduct.color[i].red[j].amount+'</button>')

 
                                         
                                     }
                                 }
                                 
                            
                                 


                             }
                             if(!Array.isArray(oneProduct.color[i].red)){
                                jQuery('[id^=btnsize]').remove()
                                jQuery('[id^=btnAmount]').remove()
                                 
                                $("#quantityProduct").append('<button type="button" id="btnAmount" class="btn">'+oneProduct.color[i].red.amount+'</button>')

                            }
                            $("#red").click(function(){ 
                                jQuery('[id^=btnsize]').remove()
                                jQuery('[id^=btnAmount]').remove()

                                if(Array.isArray(oneProduct.color[i].red)){

                               
                                    for (let j = 0; j < oneProduct.color[i].red.length; j++) {
                                    
                                    
                                        $("#sizeProduct").append('<button type="button" id="btnsize" class="btn">'+oneProduct.color[i].red[j].size+'</button>')
                                        $("#quantityProduct").append('<button type="button" id="btnsize" class="btn">'+oneProduct.color[i].red[j].amount+'</button>')


                                        
                                    }
                                }
                                if(!Array.isArray(oneProduct.color[i].red)){
                                  
                                     
                                    $("#quantityProduct").append('<button type="button" id="btnAmount" class="btn">'+oneProduct.color[i].red.amount+'</button>')

                                }
                                
                           
                                


                            
                        })

                        }
                        if(oneProduct.color[i].hasOwnProperty("blue")){
                           
                            $("#blue").show()
                            $("#blue2").click()
                            if(Array.isArray(oneProduct.color[i].blue)){
                                $("#sizeshow").show()


                                if($('#blue2').is(":checked")){
                                    jQuery('[id^=btnsize]').remove()
                                    jQuery('[id^=btnAmount]').remove()

                                     for (let j = 0; j < oneProduct.color[i].blue.length; j++) {
                                     
                                     
                                         $("#sizeProduct").append('<button type="button" id="btnsize" class="btn">'+oneProduct.color[i].blue[j].size+'</button>')
                                         $("#quantityProduct").append('<button type="button" id="btnsize" class="btn">'+oneProduct.color[i].blue[j].amount+'</button>')

 
                                         
                                     }
                                 }
                                 
                            
                                 


                             }
                             if(!Array.isArray(oneProduct.color[i].blue)){
                                jQuery('[id^=btnsize]').remove()
                                jQuery('[id^=btnAmount]').remove()
                                 
                                $("#quantityProduct").append('<button type="button" id="btnAmount" class="btn">'+oneProduct.color[i].blue.amount+'</button>')

                            }
                            $("#blue").click(function(){ 
                                jQuery('[id^=btnsize]').remove()
                                jQuery('[id^=btnAmount]').remove()

                                if(Array.isArray(oneProduct.color[i].blue)){
                               
                                    for (let j = 0; j < oneProduct.color[i].blue.length; j++) {
                                    
                                    
                                        $("#sizeProduct").append('<button type="button" id="btnsize" class="btn">'+oneProduct.color[i].blue[j].size+'</button>')
                                        $("#quantityProduct").append('<button type="button" id="btnsize" class="btn">'+oneProduct.color[i].blue[j].amount+'</button>')


                                        
                                    }
                                }
                                if(!Array.isArray(oneProduct.color[i].blue)){
                                   
                                     
                                    $("#quantityProduct").append('<button type="button" id="btnAmount" class="btn">'+oneProduct.color[i].blue.amount+'</button>')

                                }
                                
                           
                                


                            
                        })
                        }
                        if(oneProduct.color[i].hasOwnProperty("white")){
                            
                            $("#white").show()
                            $("#white2").click()

                            if(Array.isArray(oneProduct.color[i].white)){
                                $("#sizeshow").show()

                                if( $('#white2').is(":checked")){
                                    jQuery('[id^=btnsize]').remove()
                                    jQuery('[id^=btnAmount]').remove()

                                     for (let j = 0; j < oneProduct.color[i].white.length; j++) {
                                     
                                     
                                         $("#sizeProduct").append('<button type="button" id="btnsize" class="btn">'+oneProduct.color[i].white[j].size+'</button>')
                                         $("#quantityProduct").append('<button type="button" id="btnsize" class="btn">'+oneProduct.color[i].white[j].amount+'</button>')

 
                                         
                                     }
                                 }
                                 
                            
                                 


                             }
                             if(!Array.isArray(oneProduct.color[i].white)){
                                jQuery('[id^=btnsize]').remove()
                                jQuery('[id^=btnAmount]').remove()
                                 
                                $("#quantityProduct").append('<button type="button" id="btnAmount" class="btn">'+oneProduct.color[i].white.amount+'</button>')

                            }
                            $("#white").click(function(){ 
                                jQuery('[id^=btnsize]').remove()
                                jQuery('[id^=btnAmount]').remove()

                                if(Array.isArray(oneProduct.color[i].white)){
                                    
                               
                                    for (let j = 0; j < oneProduct.color[i].white.length; j++) {
                                    
                                    
                                        $("#sizeProduct").append('<button type="button" id="btnsize" class="btn">'+oneProduct.color[i].white[j].size+'</button>')
                                        $("#quantityProduct").append('<button type="button" id="btnsize" class="btn">'+oneProduct.color[i].white[j].amount+'</button>')


                                        
                                    }
                                }
                                
                                if(!Array.isArray(oneProduct.color[i].white)){
                                    
                                     
                                    $("#quantityProduct").append('<button type="button" id="btnAmount" class="btn">'+oneProduct.color[i].white.amount+'</button>')

                                }
                                


                            
                        })
                            
                        }
                        if(oneProduct.color[i].hasOwnProperty("yellow")){
                            
                            $("#yellow").show()
                            $("#yellow2").click()
                            if(Array.isArray(oneProduct.color[i].yellow)){
                                $("#sizeshow").show()

                                if( $('#yellow2').is(":checked")){
                                    jQuery('[id^=btnsize]').remove()
                                    jQuery('[id^=btnAmount]').remove()
                                     for (let j = 0; j < oneProduct.color[i].yellow.length; j++) {
                                     
                                     
                                         $("#sizeProduct").append('<button type="button" id="btnsize" class="btn">'+oneProduct.color[i].yellow[j].size+'</button>')
                                         $("#quantityProduct").append('<button type="button" id="btnAmount" class="btn">'+oneProduct.color[i].yellow[j].amount+'</button>')

 
                                         
                                     }
                                 }
                                 
                            
                                 


                             }
                             if(!Array.isArray(oneProduct.color[i].yellow)){
                                jQuery('[id^=btnsize]').remove()
                                jQuery('[id^=btnAmount]').remove()
                                 
                                $("#quantityProduct").append('<button type="button" id="btnAmount" class="btn">'+oneProduct.color[i].yellow.amount+'</button>')

                            }
                           

                            $("#yellow").click(function(){ 
                                jQuery('[id^=btnsize]').remove()
                                jQuery('[id^=btnAmount]').remove()

                                if(Array.isArray(oneProduct.color[i].yellow)){
                               
                                    for (let j = 0; j < oneProduct.color[i].yellow.length; j++) {
                                    
                                    
                                        $("#sizeProduct").append('<button type="button" id="btnsize" class="btn">'+oneProduct.color[i].yellow[j].size+'</button>')
                                        $("#quantityProduct").append('<button type="button" id="btnsize" class="btn">'+oneProduct.color[i].yellow[j].amount+'</button>')


                                        
                                    }
                                }
                                if(!Array.isArray(oneProduct.color[i].yellow)){
                                  
                                     
                                    $("#quantityProduct").append('<button type="button" id="btnAmount" class="btn">'+oneProduct.color[i].yellow.amount+'</button>')

                                }
                           
                                


                            
                        })

                            
                        }
                        if(oneProduct.color[i].hasOwnProperty("green")){
                            
                            $("#green").show()
                            $("#green2").click()
                            
                            if(Array.isArray(oneProduct.color[i].green)){
                                $("#sizeshow").show()

                                if( $('#green2').is(":checked")){
                                    jQuery('[id^=btnsize]').remove()
                                    jQuery('[id^=btnAmount]').remove()
                                     for (let j = 0; j < oneProduct.color[i].green.length; j++) {
                                     
                                     
                                         $("#sizeProduct").append('<button type="button" id="btnsize" class="btn">'+oneProduct.color[i].green[j].size+'</button>')
                                         $("#quantityProduct").append('<button type="button" id="btnAmount" class="btn">'+oneProduct.color[i].green[j].amount+'</button>')

 
                                         
                                     }
                                 }
                                 
                            
                                 


                             }
                             if(!Array.isArray(oneProduct.color[i].green)){
                                jQuery('[id^=btnsize]').remove()
                                jQuery('[id^=btnAmount]').remove()
                                 
                                $("#quantityProduct").append('<button type="button" id="btnAmount" class="btn">'+oneProduct.color[i].green.amount+'</button>')

                            }
                            $("#green2").click(function(){ 
                                jQuery('[id^=btnsize]').remove()
                                jQuery('[id^=btnAmount]').remove()

                                if(Array.isArray(oneProduct.color[i].green)){
                               
                                    for (let j = 0; j < oneProduct.color[i].green.length; j++) {
                                    
                                    
                                        $("#sizeProduct").append('<button type="button" id="btnsize" class="btn">'+oneProduct.color[i].green[j].size+'</button>')
                                        $("#quantityProduct").append('<button type="button" id="btnsize" class="btn">'+oneProduct.color[i].green[j].amount+'</button>')


                                        
                                    }
                                }
                                if(!Array.isArray(oneProduct.color[i].green)){
                              
                                     
                                    $("#quantityProduct").append('<button type="button" id="btnAmount" class="btn">'+oneProduct.color[i].green.amount+'</button>')

                                }
                                
                           
                                


                            
                        })

                            
                            
                        }
                        if(oneProduct.color[i].hasOwnProperty("black")){
                            
                            $("#black").show()
                            $("#black2").click()
                            if(Array.isArray(oneProduct.color[i].black)){
                                $("#sizeshow").show()

                                if( $('#black2').is(":checked")){
                                    jQuery('[id^=btnsize]').remove()
                                    jQuery('[id^=btnAmount]').remove()
                                     for (let j = 0; j < oneProduct.color[i].black.length; j++) {
                                     
                                     
                                         $("#sizeProduct").append('<button type="button" id="btnsize" class="btn">'+oneProduct.color[i].black[j].size+'</button>')
                                         $("#quantityProduct").append('<button type="button" id="btnAmount" class="btn">'+oneProduct.color[i].black[j].amount+'</button>')

 
                                         
                                     }
                                 }
                                 
                            
                                 


                             }
                             if(!Array.isArray(oneProduct.color[i].black)){
                                jQuery('[id^=btnsize]').remove()
                                jQuery('[id^=btnAmount]').remove()
                                 
                                $("#quantityProduct").append('<button type="button" id="btnAmount" class="btn">'+oneProduct.color[i].black.amount+'</button>')

                            }
                            $("#black2").click(function(){ 
                                jQuery('[id^=btnsize]').remove()
                                jQuery('[id^=btnAmount]').remove()

                                if(Array.isArray(oneProduct.color[i].black)){
                               
                                    for (let j = 0; j < oneProduct.color[i].black.length; j++) {
                                    
                                    
                                        $("#sizeProduct").append('<button type="button" id="btnsize" class="btn">'+oneProduct.color[i].black[j].size+'</button>')
                                        $("#quantityProduct").append('<button type="button" id="btnsize" class="btn">'+oneProduct.color[i].black[j].amount+'</button>')


                                        
                                    }
                                }
                                if(!Array.isArray(oneProduct.color[i].black)){
                                   
                                     
                                    $("#quantityProduct").append('<button type="button" id="btnAmount" class="btn">'+oneProduct.color[i].black.amount+'</button>')

                                }
                                
                           
                                


                            
                        })

                        }
                        if(oneProduct.color[i].hasOwnProperty("gray")){
                           
                            $("#gray").show()
                            $("#gray2").click()

                            if(Array.isArray(oneProduct.color[i].gray)){
                                $("#sizeshow").show()

                                if( $('#gray2').is(":checked")){
                                    jQuery('[id^=btnsize]').remove()
                                    jQuery('[id^=btnAmount]').remove()
                                     for (let j = 0; j < oneProduct.color[i].gray.length; j++) {
                                     
                                     
                                         $("#sizeProduct").append('<button type="button" id="btnsize" class="btn">'+oneProduct.color[i].gray[j].size+'</button>')
                                         $("#quantityProduct").append('<button type="button" id="btnAmount" class="btn">'+oneProduct.color[i].gray[j].amount+'</button>')

 
                                         
                                     }
                                 }
                                 
                            
                                 


                             }
                             
                             if(!Array.isArray(oneProduct.color[i].gray)){
                                jQuery('[id^=btnsize]').remove()
                                jQuery('[id^=btnAmount]').remove()
                                 
                                $("#quantityProduct").append('<button type="button" id="btnAmount" class="btn">'+oneProduct.color[i].gray.amount+'</button>')

                            }
                            $("#gray2").click(function(){ 
                                jQuery('[id^=btnsize]').remove()
                                jQuery('[id^=btnAmount]').remove()

                                if(Array.isArray(oneProduct.color[i].gray)){
                               
                                    for (let j = 0; j < oneProduct.color[i].gray.length; j++) {
                                    
                                    
                                        $("#sizeProduct").append('<button type="button" id="btnsize" class="btn">'+oneProduct.color[i].gray[j].size+'</button>')
                                        $("#quantityProduct").append('<button type="button" id="btnsize" class="btn">'+oneProduct.color[i].gray[j].amount+'</button>')


                                        
                                    }
                                }
                                
                           
                                if(!Array.isArray(oneProduct.color[i].gray)){
                                   
                                     
                                    $("#quantityProduct").append('<button type="button" id="btnAmount" class="btn">'+oneProduct.color[i].gray.amount+'</button>')

                                }


                            
                        })

                            
                        }
                    
                    
                  
                    
                    
                }

           

        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    getReviewsProducts();

}

$("#btnReview").on("click",function addReviewProduct(){

    var rate = null
    if ($("#star1").is(":checked")) {
        rate = $("#star1").val()

    }
    if ($("#star2").is(":checked")) {
        rate = $("#star2").val()

    }
    if ($("#star3").is(":checked")) {
        rate = $("#star3").val()

    }
    if ($("#star4").is(":checked")) {
        rate = $("#star4").val()

    }
    if ($("#star5").is(":checked")) {
        rate = $("#star5").val()

    }
    console.log(document.getElementById("reviewText").value)
    var review = {
        "rate": rate,
        "review":document.getElementById("reviewText").value,
        "name":localStorage.getItem("nameUser"),
        "mail":localStorage.getItem("mailUser"),
        "idproduct":localStorage.getItem("id"),
        "date":new Date(),
       
    }

    firebase.firestore().collection("reviews").add(review)
    .then(function(docRef) {
        getReviewsProducts()
        $('.star').prop('checked', false);
        document.getElementById("reviewText").value = ""

       
     
    })
    .catch(function(error) {
        console.error("Error adding Product: ", error);
    });

})
var reviewsShow = []
function getReviewsProducts(){
    $("#reviewsAdded").empty()
    reviewsShow = []
    firebase.firestore().collection("reviews")
    .onSnapshot(function(querySnapshot) {
      
      querySnapshot.forEach(function(doc) {

        if (doc.data().idproduct == localStorage.getItem("id")) {

            reviewsShow.push({id:doc.id,data:doc.data()})
           

        }
     
   });
   document.getElementById("numberReviews").innerHTML= "Reviews"+"("+reviewsShow.length+")"
   reviewsShow.sort(function(a,b){
    return b.data.date - a.data.date;
   
  });
  reviewsShow.reverse();
   for (let i = 0; i < reviewsShow.length; i++) {
    var time = new Date(1970, 0, 1);
    time.setSeconds(reviewsShow[i].data.date.seconds);
    
        var formatdate = new Date(time),
            month = '' + (formatdate.getMonth() + 1),
            day = '' + formatdate.getDate(),
            year = formatdate.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
            // console.log([year, month, day].join('-'))
            
          
        
      
            $("#reviewsAdded").append('<div class="reviews-submitted"><div class="reviewer" id="reviewer">'+reviewsShow[i].data.name+'- <span>'+[year, month, day].join('-')+'</span></div><div class="ratting" id="'+reviewsShow[i].id+'"> </div><p id="showReviewer">'+reviewsShow[i].data.review+'</p></div>')
            for (let j = 0; j <reviewsShow[i].data.rate ; j++) {
                $("#"+reviewsShow[i].id+"").append('<i class="fa fa-star" id="fa-star"></i>')
                
            }
      
       
   }

   
    

  });
 }
 $("#addToCartDetails").on("click",function(){
    return  firebase.firestore().collection("CartList").onSnapshot(
        function(querySnapshot){
            var check = false
            var count = 0 
            var cartList = []
            

            querySnapshot.forEach(function(doc) {
            
                cartList.push({id:doc.id,data:doc.data()})
                // console.log(doc.data())
                // if(localStorage.getItem("idUser") == doc.data().idUser && localStorage.getItem("id") == doc.data().idProduct && check == false)
                // {
                //     toastr.warning("This product has already been added")
                //     check = true

                // }
                
                // if( check == false)
                // {
                //     check = true
                //     console.log("true")
                        
                //     data = {
                //         idUser:localStorage.getItem("idUser"),
                //         idProduct:localStorage.getItem("id"),
                //         date:new Date()
                //     }
                //     firebase.firestore().collection("CartList").add(data)
                //     .then(function(docRef) {
                //         toastr.success("Added To Your Cart List")

                //     })
                //     .catch(function(error) {
                //         toastr.error("Send Message ", error);
                //     });
                 
                   

                //     }

             
                 

                })
                for (let i = 0; i < cartList.length; i++) {
                    count++
                    if(localStorage.getItem("idUser") == cartList[i].data.idUser && localStorage.getItem("id") == cartList[i].data.idProduct )
                    {
                        setTimeout(() => {
                            location.href = "cart.html"
                            
                        }, 800);
                        toastr.success("Added To Your Cart List")
                        
                        check = true
    
                    }
                    if(count==cartList.length && check == false)
                    {
                        data = {
                            idUser:localStorage.getItem("idUser"),
                            idProduct:localStorage.getItem("id"),
                            date:new Date()
                        }
                        firebase.firestore().collection("CartList").add(data)
                        .then(function(docRef) {
                            
                            
                            setTimeout(() => {
                                location.href = "cart.html"
                                
                            }, 800);
    
                        })
                        .catch(function(error) {
                            toastr.error("Send Message ", error);
                        });
                    }
                  
                    
                }
                  
                      
            
                    
             
            

     

        }),err=>
        {
          this.toastr.errorToastr(err.message)
        }
     
 
    
})

///////slideoption///////
var slideIndex = 1;
// showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1} 
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; 
  }
  
  slides[slideIndex-1].style.display = "block"; 
  
}
