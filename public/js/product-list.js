



var productsData = []

var id
$(document).ready(function(){
   
    const getgetProductsFun = new Promise((resolve, reject) => {
        resolve(getProducts())
    
        reject(error)
       
    })
    
    getgetProductsFun.then(res => {
        setTimeout(() => {
            var show_per_page = 9;
            var number_of_items = document.getElementById("cardproduct2").childElementCount
            var number_of_pages = Math.ceil(number_of_items / show_per_page);
        
            $('#pagination').append('<div class=controls></div><input id=current_page type=hidden><input id=show_per_page type=hidden>')
            $('#current_page').val(0);
            $('#show_per_page').val(show_per_page);
        
            var navigation_html = '<a class="prev" onclick="previous()">Prev</a>';
            var current_link = 0;
            while (number_of_pages > current_link) {
                navigation_html += '<a class="page" onclick="go_to_page(' + current_link + ')" longdesc="' + current_link + '">' + (current_link + 1) + '</a>';
                current_link++;
            }
            navigation_html += '<a class="next" onclick="next()">Next</a>';
        
            $('.controls').html(navigation_html);
            $('.controls .page:first').addClass('active');
        
            $('#cardproduct2').children().css('display', 'none');
            $('#cardproduct2').children().slice(0, show_per_page).css('display', 'block');
            
            
          }, 4000);
    
    }).catch(err => {
        console.log(err)
    })
  
    
    // setTimeout(() => {
    //     $(".backgroundloader").hide()
    // }, 4000);
 
    

    

    
});

    function getProducts(){
        firebase.firestore().collection("products").onSnapshot
        (function(querySnapshot) {
            
            querySnapshot.forEach(function(doc) {

            // console.log(doc.id, " => ", doc.data());
           
            productsData.push({"data":doc.data(),"id":doc.id})

           
           
        });
        
       
    
        
       
        productsData.sort(function(a,b){
           
            return b.data.date - a.data.date;
           
            
          });
        //   productsData.reverse();

        for (let i = 0; i < productsData.length; i++) {
            // console.log(productsData[i].data.date)
            
            if( productsData[i].data.typeProduct==$("#filterCate").val()){
               

                if($("#filterPrice").val()=='All'){
                    
                        
                    if(productsData[i].data.nameProduct.toUpperCase().includes( $("#search").val().toUpperCase())){

                        $("#cardproduct2").append('<div class="col-md-4 col-sm-6 cardproduct" id="cardproduct"><div class="product-item"><div class="product-title"><a href="#" id="ProductName">'+ productsData[i].data.nameProduct+'</a> </div><div class="product-image"><a  ><img style="height: 420px;object-fit: contain;" src="'+ productsData[i].data.photos[0]+'" alt="Product Image"></a><div class="product-action"><a class="addToCart" id="'+productsData[i].id+'"><i class="fa fa-cart-plus"></i></a><a  class="addToWishList"  id="'+productsData[i].id+'"><i class="fa fa-heart"></i></a><a href="#" class="goDetails" id="'+productsData[i].id+'"><i class="fa fa-info-circle" ></i></a></div></div><div class="product-price"><h3><span>$</span>'+ productsData[i].data.price+'</h3><a class="btn " id="'+productsData[i].id+'buy"><i class="fa fa-shopping-cart"></i>Buy Now</a></div></div></div>')


                    }
                    
                    
    
                
            }
            if($("#filterPrice").val()=='$1 to $500'){
                if(1<= productsData[i].data.price&& productsData[i].data.price<=500){
                    // console.log( productsData[i].data.price)
                    if(productsData[i].data.nameProduct.toUpperCase().includes( $("#search").val().toUpperCase())){

                        $("#cardproduct2").append('<div class="col-md-4 col-sm-6 cardproduct" id="cardproduct"><div class="product-item"><div class="product-title"><a href="#" id="ProductName">'+ productsData[i].data.nameProduct+'</a> </div><div class="product-image"><a  ><img style="height: 420px;object-fit: contain;" src="'+ productsData[i].data.photos[0]+'" alt="Product Image"></a><div class="product-action"><a class="addToCart" id="'+productsData[i].id+'"><i class="fa fa-cart-plus"></i></a><a  class="addToWishList"  id="'+productsData[i].id+'"><i class="fa fa-heart"></i></a><a href="#" class="goDetails" id="'+productsData[i].id+'"><i class="fa fa-info-circle" ></i></a></div></div><div class="product-price"><h3><span>$</span>'+ productsData[i].data.price+'</h3><a class="btn " id="'+productsData[i].id+'buy"><i class="fa fa-shopping-cart"></i>Buy Now</a></div></div></div>')


                    }    
                }
            }
            if($("#filterPrice").val()=='$501 to $1000'){
                if(501<= productsData[i].data.price&& productsData[i].data.price<=1000){
                    if(productsData[i].data.nameProduct.toUpperCase().includes( $("#search").val().toUpperCase())){

                        $("#cardproduct2").append('<div class="col-md-4 col-sm-6 cardproduct" id="cardproduct"><div class="product-item"><div class="product-title"><a href="#" id="ProductName">'+ productsData[i].data.nameProduct+'</a> </div><div class="product-image"><a  ><img style="height: 420px;object-fit: contain;" src="'+ productsData[i].data.photos[0]+'" alt="Product Image"></a><div class="product-action"><a class="addToCart" id="'+productsData[i].id+'"><i class="fa fa-cart-plus"></i></a><a  class="addToWishList"  id="'+productsData[i].id+'"><i class="fa fa-heart"></i></a><a href="#" class="goDetails" id="'+productsData[i].id+'"><i class="fa fa-info-circle" ></i></a></div></div><div class="product-price"><h3><span>$</span>'+ productsData[i].data.price+'</h3><a class="btn " id="'+productsData[i].id+'buy"><i class="fa fa-shopping-cart"></i>Buy Now</a></div></div></div>')


                    }    
                }
            }
            if($("#filterPrice").val()=='more than 1000'){
                if(1001<= productsData[i].data.price){
                    if(productsData[i].data.nameProduct.toUpperCase().includes( $("#search").val().toUpperCase())){

                        $("#cardproduct2").append('<div class="col-md-4 col-sm-6 cardproduct" id="cardproduct"><div class="product-item"><div class="product-title"><a href="#" id="ProductName">'+ productsData[i].data.nameProduct+'</a> </div><div class="product-image"><a  ><img style="height: 420px;object-fit: contain;" src="'+ productsData[i].data.photos[0]+'" alt="Product Image"></a><div class="product-action"><a class="addToCart" id="'+productsData[i].id+'"><i class="fa fa-cart-plus"></i></a><a  class="addToWishList"  id="'+productsData[i].id+'"><i class="fa fa-heart"></i></a><a href="#" class="goDetails" id="'+productsData[i].id+'"><i class="fa fa-info-circle" ></i></a></div></div><div class="product-price"><h3><span>$</span>'+ productsData[i].data.price+'</h3><a class="btn " id="'+productsData[i].id+'buy"><i class="fa fa-shopping-cart"></i>Buy Now</a></div></div></div>')


                    }    
                }
            }

            }
            if($("#filterCate").val()=='All'){
                if($("#filterPrice").val()=='All'){
                    
                    

                        if(productsData[i].data.nameProduct.toUpperCase().includes( $("#search").val().toUpperCase())){

                            $("#cardproduct2").append('<div class="col-md-4 col-sm-6 cardproduct" id="cardproduct"><div class="product-item"><div class="product-title"><a href="#" id="ProductName">'+ productsData[i].data.nameProduct+'</a> </div><div class="product-image"><a  ><img style="height: 420px;object-fit: contain;" src="'+ productsData[i].data.photos[0]+'" alt="Product Image"></a><div class="product-action"><a class="addToCart" id="'+productsData[i].id+'"><i class="fa fa-cart-plus"></i></a><a  class="addToWishList"  id="'+productsData[i].id+'"><i class="fa fa-heart"></i></a><a href="#" class="goDetails" id="'+productsData[i].id+'"><i class="fa fa-info-circle" ></i></a></div></div><div class="product-price"><h3><span>$</span>'+ productsData[i].data.price+'</h3><a class="btn " id="'+productsData[i].id+'buy"><i class="fa fa-shopping-cart"></i>Buy Now</a></div></div></div>')


                        }
                        
                    
                         
                    
                }
                if($("#filterPrice").val()=='$1 to $500'){
                    if(1<= productsData[i].data.price&& productsData[i].data.price<=500){
                        // console.log( productsData[i].data.price)
                        if(productsData[i].data.nameProduct.toUpperCase().includes( $("#search").val().toUpperCase())){

                            $("#cardproduct2").append('<div class="col-md-4 col-sm-6 cardproduct" id="cardproduct"><div class="product-item"><div class="product-title"><a href="#" id="ProductName">'+ productsData[i].data.nameProduct+'</a> </div><div class="product-image"><a  ><img style="height: 420px;object-fit: contain;" src="'+ productsData[i].data.photos[0]+'" alt="Product Image"></a><div class="product-action"><a class="addToCart" id="'+productsData[i].id+'"><i class="fa fa-cart-plus"></i></a><a  class="addToWishList"  id="'+productsData[i].id+'"><i class="fa fa-heart"></i></a><a href="#" class="goDetails" id="'+productsData[i].id+'"><i class="fa fa-info-circle" ></i></a></div></div><div class="product-price"><h3><span>$</span>'+ productsData[i].data.price+'</h3><a class="btn " id="'+productsData[i].id+'buy"><i class="fa fa-shopping-cart"></i>Buy Now</a></div></div></div>')


                        }        
                    }
                }
                if($("#filterPrice").val()=='$501 to $1000'){
                    if(501<= productsData[i].data.price&& productsData[i].data.price<=1000){
                        if(productsData[i].data.nameProduct.toUpperCase().includes( $("#search").val().toUpperCase())){

                            $("#cardproduct2").append('<div class="col-md-4 col-sm-6 cardproduct" id="cardproduct"><div class="product-item"><div class="product-title"><a href="#" id="ProductName">'+ productsData[i].data.nameProduct+'</a> </div><div class="product-image"><a  ><img style="height: 420px;object-fit: contain;" src="'+ productsData[i].data.photos[0]+'" alt="Product Image"></a><div class="product-action"><a class="addToCart" id="'+productsData[i].id+'"><i class="fa fa-cart-plus"></i></a><a  class="addToWishList"  id="'+productsData[i].id+'"><i class="fa fa-heart"></i></a><a href="#" class="goDetails" id="'+productsData[i].id+'"><i class="fa fa-info-circle" ></i></a></div></div><div class="product-price"><h3><span>$</span>'+ productsData[i].data.price+'</h3><a class="btn " id="'+productsData[i].id+'buy"><i class="fa fa-shopping-cart"></i>Buy Now</a></div></div></div>')


                        }        
                    }
                }
                if($("#filterPrice").val()=='more than 1000'){
                    if(1001<= productsData[i].data.price){
                        if(productsData[i].data.nameProduct.toUpperCase().includes( $("#search").val().toUpperCase())){

                            $("#cardproduct2").append('<div class="col-md-4 col-sm-6 cardproduct" id="cardproduct"><div class="product-item"><div class="product-title"><a href="#" id="ProductName">'+ productsData[i].data.nameProduct+'</a> </div><div class="product-image"><a  ><img style="height: 420px;object-fit: contain;" src="'+ productsData[i].data.photos[0]+'" alt="Product Image"></a><div class="product-action"><a class="addToCart" id="'+productsData[i].id+'"><i class="fa fa-cart-plus"></i></a><a class="addToWishList" id="'+productsData[i].id+'"><i class="fa fa-heart"></i></a><a href="#" class="goDetails" id="'+productsData[i].id+'"><i class="fa fa-info-circle" ></i></a></div></div><div class="product-price"><h3><span>$</span>'+ productsData[i].data.price+'</h3><a class="btn " id="'+productsData[i].id+'buy"><i class="fa fa-shopping-cart"></i>Buy Now</a></div></div></div>')


                        }        
                    }
                }
               
                // $('<div class="col-md-4 col-sm-6 cardproduct" id="cardproduct"><div class="product-item"><div class="product-title"><a href="#" id="ProductName">'+ productsData[i].data.nameProduct+'</a> </div><div class="product-image"><a  ><img style="height: 420px;object-fit: contain;" src="'+ productsData[i].data.photos[0]+'" alt="Product Image"></a><div class="product-action"><a class="addToCart" id="'+productsData[i].id+'"><i class="fa fa-cart-plus"></i></a><a  class="addToWishList"  id="'+productsData[i].id+'"><i class="fa fa-heart"></i></a><a href="#"><i class="fa fa-info-circle" class="goDetails" id="'+productsData[i].id+'"></i></a></div></div><div class="product-price"><h3><span>$</span>'+ productsData[i].data.price+'</h3><a class="btn " id="'+productsData[i].id+'buy"><i class="fa fa-shopping-cart"></i>Buy Now</a></div></div></div>').insertAfter("#filters")

            }
            if(localStorage.getItem("checkLog")=="false"){
                $(".addToCart").hide();
                $(".addToWishList").hide()

            }
            $("#"+productsData[i].id+"buy").on("click",function(){
                if(localStorage.getItem("checkLog")!="false"){

                var ShippingCost

                var person = prompt("Inside cairo", "yes");
                if (person=="yes") {
                     ShippingCost = 5
                    
                }
                else{
                     ShippingCost = 10

                }
                var GrandTotal = ShippingCost + parseFloat(productsData[i].data.price)
              
                // console.log(productsData[i].data)
                order = {
                    products:[{amount:"1",product:{data:{idProduct:productsData[i].id,idUser:localStorage.getItem("idUser"),date:new Date()}}}],
                    supTotal:productsData[i].data.price,
                    ShippingCost:ShippingCost,
                    GrandTotal:GrandTotal
                }
                localStorage.setItem("orders",JSON.stringify(order))
                setTimeout(() => {
                    location.href = "checkout.html"
                  }, 500);
                }
                if(localStorage.getItem("checkLog")=="false")
                {
                    location.href = "login.html"

                }
    
            }),err=>
            {
              this.toastr.errorToastr(err.message)
            }
          

        }
        
        
        
        
        
  
        $(".goDetails").one("click",function productDetails(){
            // console.log( $(this).attr('id'))
            location.href="product-detail.html"
           localStorage.setItem("id",$(this).attr('id')) 

                
                    })

                    $(".addToWishList").on("click",function(){
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

                  
      });

      
      
    }
    $("#filterCate,#filterPrice").on("change",function (){
        // jQuery('[id^=cardproduct]').remove()
        $('#cardproduct2').empty()
                productsData = [] 
                $('#pagination').empty()
              getProducts();
              setTimeout(() => {
        
        
                var show_per_page = 9;
                var number_of_items = document.getElementById("cardproduct2").childElementCount
                var number_of_pages = Math.ceil(number_of_items / show_per_page);
            
                $('#pagination').append('<div class=controls></div><input id=current_page type=hidden><input id=show_per_page type=hidden>');
                $('#current_page').val(0);
                $('#show_per_page').val(show_per_page);
            
                var navigation_html = '<a class="prev" onclick="previous()">Prev</a>';
                var current_link = 0;
                while (number_of_pages > current_link) {
                    navigation_html += '<a class="page" onclick="go_to_page(' + current_link + ')" longdesc="' + current_link + '">' + (current_link + 1) + '</a>';
                    current_link++;
                }
                navigation_html += '<a class="next" onclick="next()">Next</a>';
            
                $('.controls').html(navigation_html);
                $('.controls .page:first').addClass('active');
            
                $('#cardproduct2').children().css('display', 'none');
                $('#cardproduct2').children().slice(0, show_per_page).css('display', 'block');
            }, 1500);
         
        
    })
    $("#search").on("keyup",function (){
        $('#cardproduct2').empty()
        
                productsData = [] 
                $('#pagination').empty()
               
                getProducts();


        setTimeout(() => {
            
        
            $('#pagination').empty()
            var show_per_page = 9;
            var number_of_items = document.getElementById("cardproduct2").childElementCount
            var number_of_pages = Math.ceil(number_of_items / show_per_page);
        
            $('#pagination').append('<div class=controls></div><input id=current_page type=hidden><input id=show_per_page type=hidden>');
            $('#current_page').val(0);
            $('#show_per_page').val(show_per_page);
        
            var navigation_html = '<a class="prev" onclick="previous()">Prev</a>';
            var current_link = 0;
            while (number_of_pages > current_link) {
                navigation_html += '<a class="page" onclick="go_to_page(' + current_link + ')" longdesc="' + current_link + '">' + (current_link + 1) + '</a>';
                current_link++;
            }
            navigation_html += '<a class="next" onclick="next()">Next</a>';
        
            $('.controls').html(navigation_html);
            $('.controls .page:first').addClass('active');
        
            $('#cardproduct2').children().css('display', 'none');
            $('#cardproduct2').children().slice(0, show_per_page).css('display', 'block');
        }, 1500);
       
        
    })
   
  

    
    
    
    function go_to_page(page_num) {
        var show_per_page = parseInt($('#show_per_page').val(), 0);
    
        start_from = page_num * show_per_page;
    
        end_on = start_from + show_per_page;
    
        $('#cardproduct2').children().css('display', 'none').slice(start_from, end_on).css('display', 'block');
    
        $('.page[longdesc=' + page_num + ']').addClass('active').siblings('.active').removeClass('active');
    
        $('#current_page').val(page_num);
    }
    
    
    
    function previous() {
    
        new_page = parseInt($('#current_page').val(), 0) - 1;
        //if there is an item before the current active link run the function
        if ($('.active').prev('.page').length == true) {
            go_to_page(new_page);
        }
    
    }
    
    function next() {
        new_page = parseInt($('#current_page').val(), 0) + 1;
        //if there is an item after the current active link run the function
        if ($('.active').next('.page').length == true) {
            go_to_page(new_page);
        }
    
    }
    
