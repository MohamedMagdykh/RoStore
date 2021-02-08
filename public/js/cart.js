/* */
$(document).ready(function(){
    getCartList();
    $("#ShippingCost").text("$5")
    setTimeout(() => {
        $(".backgroundloader").hide()
    }, 2000);
})
var totalPrice = 0
var grandTotal=0
var shippingCost=5
var orderProduct = []
function getCartList()
{
    // console.log("1")
        var cartList = []
        var cartListLength = []
        
    return  firebase.firestore().collection("CartList").onSnapshot(
    function(querySnapshot) 
    {
    if(cartList.length !=0){
        cartList = []
        cartListLength = []
        $(".align-middle").empty();

    }
        totalPrice = 0
        grandTotal=0

        querySnapshot.forEach(function(doc) {
            
                cartList.push({id:doc.id,data:doc.data()})

        });
        cartList.sort(function(a,b){
                
            return b.data.date - a.data.date;
        
            
        });
        // console.log("2")
        cartList.reverse();
        for (let i = 0; i < cartList.length; i++) {
            const {idUser,idProduct,date} = cartList[i].data
    
            
            if(idUser == localStorage.getItem("idUser"))
            {
                // console.log("3")
                var productsDatacartList = []
                firebase.firestore().collection("products").onSnapshot(
                    function(querySnapshot)
                    {
                        productsDatacartList = []            
                        querySnapshot.forEach(function(doc)
                         {
                           
                        // console.log(doc.id, " => ", doc.data());
                        
                         productsDatacartList.push({"data":doc.data(),"id":doc.id})
            
                        
                        
                        });
                        // console.log(productsDatacartList)
                        
                        for (let j = 0; j < productsDatacartList.length; j++) {

                            const {nameProduct,describeProduct,typeProduct,color,photos,price,date} = productsDatacartList[j].data
                            if(idProduct==productsDatacartList[j].id && idUser == localStorage.getItem("idUser"))
                            {
                                var allPrice = price 
                                
                                  totalPrice = parseFloat(price) + totalPrice
                                  grandTotal=  totalPrice+ shippingCost 
                                  
                                  
                                  $("#subTotal").text("$"+totalPrice)
                                  $("#grandTotal").text(grandTotal)

                                  $("#location").on("change",function(){
                                    if($("#location").val() == "OutSide Cairo"){
                                        $("#ShippingCost").text("$10")
                                        shippingCost = 10
                                        grandTotal=  totalPrice+ shippingCost 
                                        $("#grandTotal").text(grandTotal)

                                       

                                    }
                                    if($("#location").val() == "Inside Cairo"){
                                        $("#ShippingCost").text("$5")
                                        shippingCost = 5
                                        grandTotal=  totalPrice+ shippingCost 
                                        $("#grandTotal").text(grandTotal)

                                    }
                                })
                                
                                
                               

                                cartListLength.push(idProduct)
                                
                                $(".align-middle").append(`
                                <tr>
                                <td>
                                    <div class="img">
                                        <a href="#"><img style="object-fit: contain;" src="${photos[0]}" alt="Image"></a>
                                        <p>${nameProduct}</p>
                                    </div>
                                </td>
                                <td>${price}$</td>
                                <td>   <div class="qty">
                                <button id="${cartList[i].id}" class="btn-minus"  onclick="this.parentNode.querySelector('input[type=number]').stepDown()"><i class="fa fa-minus"></i></button>
                                <input id="${cartList[i].id}amount" type="number" value="1" min="1">
                                <button id="${cartList[i].id}" " onclick="this.parentNode.querySelector('input[type=number]').stepUp()" class="btn-plus"><i class="fa fa-plus"></i></button>
                                </div></td>
                                <td id="${cartList[i].id}allPrice" >${allPrice}$</td>
                                <td id="${cartList[i].id}" class="deletecartList"><button><i class="fa fa-trash"></i></button></td>
                                </tr>

                                `)
                                
                                orderProduct.push({product:cartList[i],amount:document.getElementById(cartList[i].id+"amount").value})


                                $("#"+cartList[i].id+"amount").on("change",function(){
                                    
                                    allPriceLast = allPrice
                                    allPrice =  price * document.getElementById(cartList[i].id+"amount").value
                                    $("#"+cartList[i].id+"allPrice").text(allPrice+"$")
                                    totalPrice = parseFloat(allPrice) + totalPrice - price
                                    $("#subTotal").text("$"+totalPrice)
                                    grandTotal=  totalPrice+ shippingCost 
                                    $("#grandTotal").text(grandTotal)
                                    for (let k = 0; k < orderProduct.length; k++) {
                                        if( orderProduct[k].product.id==cartList[i].id){
                                            orderProduct[k].amount = document.getElementById(cartList[i].id+"amount").value
                                            

                                        }
                                    }
                                    
                                })

                                
                                $(".btn-minus,.btn-plus").on("click",function(){
                                    if(cartList[i].id==$(this).attr("id")){
                                    
                                    var allPriceLast = allPrice
                                    
                                    allPrice =  price * document.getElementById(cartList[i].id+"amount").value
                                    $("#"+cartList[i].id+"allPrice").text(allPrice+"$")
                                    totalPrice = parseFloat(allPrice) + totalPrice - parseFloat(allPriceLast)
                                    $("#subTotal").text("$"+totalPrice)
                                    grandTotal=  totalPrice+ shippingCost 
                                    $("#grandTotal").text(grandTotal)
                                    for (let k = 0; k < orderProduct.length; k++) {
                                        if( orderProduct[k].product.id==cartList[i].id){
                                            orderProduct[k].amount = document.getElementById(cartList[i].id+"amount").value
                                            

                                        }
                                    }
                                    
                                    }
                                    
                                })
                         
                              
                                
                                $(".deletecartList").one("click",function(){
                                    if(cartList[i].id==$(this).attr("id")){
                                    if (confirm('Are you sure ?'))
                                     {
                                        //  console.log($(this).attr("id"))
        
                                        firebase.firestore().collection("CartList").doc($(this).attr("id")).delete().then(function() {
                                            toastr.success("Deleted")
        
                                        }).catch(function(error) {
                                            console.error("Error removing document: ", error);
                                        })
                                    }
                                    else
                                    {
                                      console.log('cancel')
                                    }
                                }
        
                                })

                            }
                            
                        }
                        $("#CheckoutBtn").on("click",function(){
                            order = {
                                products:orderProduct,
                                supTotal:totalPrice,
                                ShippingCost:shippingCost,
                                GrandTotal:grandTotal
                            }
                            localStorage.setItem("orders",JSON.stringify(order))
                            setTimeout(() => {
                                location.href = "checkout.html"
                              }, 500);

                        })
                      
                        console.trace(cartListLength.length)
                        if (cartListLength.length == 0) {
                            $("#tabelCart").hide()
                            $("#pageCart").text("No Data Yet")
                            
                        }
                        
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

