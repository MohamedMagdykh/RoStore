
$(document).ready(function(){
    
                    
    anime.timeline({loop: false})
    .add({
        targets: '.ml15 .word',
        scale: [14,1],
        opacity: [0,1],
        easing: "easeOutCirc",
        duration: 1000,
        delay: (el, i) => 1000 * i
    })
    var textWrapper = document.querySelector('.ml2');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    
    anime.timeline({loop: false})
      .add({
        targets: '.ml2 .letter',
        scale: [4,1],
        opacity: [0,1],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 950,
        delay: (el, i) => 70*i
      })


   
    $('#carouselExampleIndicators').on('slide.bs.carousel', function (e) {
        $(".ml15,.ml151,.ml152").hide()
        setTimeout(() => {
           
            anime.timeline({loop: false})
            .add({
                targets: '.ml15 .word',
                scale: [14,1],
                opacity: [0,1],
                easing: "easeOutCirc",
                duration: 1000,
                delay: (el, i) => 1000 * i
            })
            anime.timeline({loop: false})
            .add({
                targets: '.ml151 .word',
                scale: [14,1],
                opacity: [0,1],
                easing: "easeOutCirc",
                duration: 1000,
                delay: (el, i) => 1000 * i
            })
            anime.timeline({loop: false})
            .add({
                targets: '.ml152 .word',
                scale: [14,1],
                opacity: [0,1],
                easing: "easeOutCirc",
                duration: 1000,
                delay: (el, i) => 1000 * i
            })
            $(".ml15,.ml151,.ml152").show(100)
            
        }, 2000);
     
        var textWrapper = document.querySelector('.ml2');
        textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
        
        anime.timeline({loop: false})
          .add({
            targets: '.ml2 .letter',
            scale: [4,1],
            opacity: [0,1],
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 950,
            delay: (el, i) => 70*i
          })
          var textWrapper = document.querySelector('.ml3');
        textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
        
        anime.timeline({loop: false})
          .add({
            targets: '.ml3 .letter',
            scale: [4,1],
            opacity: [0,1],
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 950,
            delay: (el, i) => 70*i
          })
          var textWrapper = document.querySelector('.ml4');
        textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
        
        anime.timeline({loop: false})
          .add({
            targets: '.ml4 .letter',
            scale: [4,1],
            opacity: [0,1],
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 950,
            delay: (el, i) => 70*i
          })
          
    });
 
        
   
    
    getProducts();




})



var productsData = []
function getProducts(){
    firebase.firestore().collection("products").get()
    .then(function(querySnapshot) {
        
        querySnapshot.forEach(function(doc) {
        productsData.push({"data":doc.data(),"id":doc.id})
      
    })
    
    productsData.sort(function(a,b){
           
        return b.data.date - a.data.date;
       
        
      });
      
      for (let i = 0; i < 10; i++) {
        if( productsData[i].data.typeProduct==$("#filterCate").val()){
            $(".center").append('<div class="mySlides" id="mySlides"><div style="padding-left: 2%;padding-right: 2%;" class="product-item"><div class="product-title"><a href="#">'+productsData[i].data.nameProduct+'</a><div class="ratting"></div></div><div class="product-image"><a href="product-detail.html"><img style="height: 420px;object-fit: contain;" src="'+productsData[i].data.photos[0]+'" alt="Product Image"></a><div class="product-action"><a id="'+productsData[i].id+'" class="addToCart"><i class="fa fa-cart-plus"></i></a><a id="'+productsData[i].id+'" class="addNewToWishList"><i class="fa fa-heart"></i></a> <a href="product-detail.html" class="goDetails" id="'+productsData[i].id+'"><i class="fa fa-info-circle" ></i></a></div></div><div class="product-price"><h3><span>$</span>'+productsData[i].data.price+'</h3>  <a class="btn" href=""><i class="fa fa-shopping-cart"></i>Buy Now</a></div></div></div>')

        }
        if($("#filterCate").val()=='All'){
            $(".center").append('<div class="mySlides" id="mySlides"><div style="padding-left: 2%;padding-right: 2%;" class="product-item"><div class="product-title"><a href="#">'+productsData[i].data.nameProduct+'</a><div class="ratting"></div></div><div class="product-image"><a href="product-detail.html"><img style="height: 420px;object-fit: contain;" src="'+productsData[i].data.photos[0]+'" alt="Product Image"></a><div class="product-action"><a id="'+productsData[i].id+'" class="addToCart"><i class="fa fa-cart-plus"></i></a><a id="'+productsData[i].id+'" class="addNewToWishList"><i class="fa fa-heart"></i></a> <a href="product-detail.html" class="goDetails" id="'+productsData[i].id+'"><i class="fa fa-info-circle" ></i></a></div></div><div class="product-price"><h3><span>$</span>'+productsData[i].data.price+'</h3>  <a class="btn" href=""><i class="fa fa-shopping-cart"></i>Buy Now</a></div></div></div>')


        }
        
        

      }
      if(localStorage.getItem("checkLog")=="false"){
        $(".addToCart").hide();
        $(".addNewToWishList").hide()
      
      }
      $(".goDetails").on("click",function productDetails(){
        location.href="product-detail.html"
        localStorage.setItem("id",$(this).attr('id')) 
    
                })
                $(".addNewToWishList").on("click",function(){
                  var comeid = $(this).attr('id')
                  var check = false
                 
                           
                   return  firebase.firestore().collection("wishList").get().then(
                       function(querySnapshot) 
                       {
               
                       
                           querySnapshot.forEach(function(doc) {
                               if(doc.data().idUser == localStorage.getItem("idUser") && comeid== doc.data().idProduct){
                                   check = true
                                 toastr.warning("This product has already been added")
                               }
                              
                                   
                   
                           })
                          
                               if(check == false){
                                   date = {
                                       idUser:localStorage.getItem("idUser"),
                                       idProduct:comeid,
                                       date:new Date()
                                   }
                                   firebase.firestore().collection("wishList").add(date)
                                   .then(function(docRef) {
                                       toastr.success("Added To Your Wish List")
                                       return;
                                       
                                   })
                                   .catch(function(error) {
                                       toastr.error("Send Message ", error);
                                   });
                                   

                               }
                           
               
                           
                       }),err=>
                       {
                       this.toastr.errorToastr(err.message)
                       }

                  
               
                   
               })
                $(".addToCart").on("click",function(){
                  
                  var comeid = $(this).attr('id')
                  var check = false
                  return  firebase.firestore().collection("CartList").get().then(
                      function(querySnapshot) 
                      {
                  
                      
                          querySnapshot.forEach(function(doc) {
                              
                              if(doc.data().idUser == localStorage.getItem("idUser") && comeid== doc.data().idProduct){
                                  check = true
                                toastr.warning("This product has already been added")
                              }
                              
                  
                          });
                          if(check == false){
                              data = {
                                  idUser:localStorage.getItem("idUser"),
                                  idProduct:comeid,
                                  date:new Date()
                              }
                              firebase.firestore().collection("CartList").add(data)
                              .then(function(docRef) {
                                  toastr.success("Added To Your Cart List")
                              })
                              .catch(function(error) {
                                  toastr.error("Send Message ", error);
                              });

                          }
                      
                      }),err=>
                      {
                        this.toastr.errorToastr(err.message)
                      }
       
                  
              })
                
                
                // if(executed == true){
                //     console.log("2")
                //     $('.center').slick('unslick');
                //     // $('.center').slick('refresh');
                //  }
               
                    // executed = true;
                    slickinitRecentProduct();
             
})




}
// var executed = false;

function slickinitRecentProduct(){

    $('.center').slick({
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 4,
        autoplay:true,
        speed: 1000,
        autoplaySpeed: 1000,
        
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '40px',
              slidesToShow: 3
            }
          },
          {
            breakpoint: 810,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '40px',
              slidesToShow: 2
            }
          }
          ,
          {
            breakpoint: 600,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '40px',
              slidesToShow: 1
            }
          }
        ]
      });
   
}
$("#filterCate").on("change",function (){
   

    $('.center').empty()
    $('.center').removeClass("slick-initialized")
    $('.center').removeClass("slick-slider")
    // console.log(productsData)
    productsData = [] 

    
        getProducts();
        
   
});


   
