/* */
$(document).ready(function(){
    getWishList();
    setTimeout(() => {
        $(".backgroundloader").hide()
    }, 2000);

})
function getWishList()
{
    // console.log("1")
        var wishList = []
        
    return  firebase.firestore().collection("wishList").onSnapshot(
    function(querySnapshot) 
    {
    if(wishList.length !=0){
        wishList = []
        $(".align-middle").empty();

    }
    
        querySnapshot.forEach(function(doc) {
            
                wishList.push({id:doc.id,data:doc.data()})

        });
        wishList.sort(function(a,b){
                
            return b.data.date - a.data.date;
        
            
        });
        // console.log("2")
        wishList.reverse();
        for (let i = 0; i < wishList.length; i++) {
            const {idUser,idProduct,date} = wishList[i].data
    
            
            if(idUser == localStorage.getItem("idUser"))
            {
                // console.log("3")
                var productsDataWishList = []
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

                            const {nameProduct,describeProduct,typeProduct,color,photos,price,date} = productsDataWishList[j].data
                            if(idProduct==productsDataWishList[j].id && idUser == localStorage.getItem("idUser"))
                            {
                          
                                
                                $(".align-middle").append(`
                                <tr>
                                <td>
                                    <div class="img">
                                        <a href="#"><img style="object-fit: contain;" src="${photos[0]}" alt="Image"></a>
                                        <p>${nameProduct}</p>
                                    </div>
                                </td>
                                <td>${price}$</td>
                              
                                <td><button id="${wishList[i].id}" class="btn-cart">Add to Cart</button></td>
                                <td id="${wishList[i].id}" class="deleteWishList"><button><i class="fa fa-trash"></i></button></td>
                                </tr>

                                `)
                                $(".btn-cart").on("click",function(){
                                    var comeid = $(this).attr('id')
                                    var check = false
                                    var idWishList = comeid
                                    return  firebase.firestore().collection("CartList").get().then(
                                        function(querySnapshot) 
                                        {
                                    
                                        
                                            querySnapshot.forEach(function(doc) {
                                                
                                                if(doc.data().idUser == localStorage.getItem("idUser") && idProduct == doc.data().idProduct){
                                                    check = true
                                                    firebase.firestore().collection("wishList").doc(idWishList).delete().then(function() {
                                                        toastr.success("Added To Your Cart List")
                                                        
                                                    }).catch(function(error) {
                                                        console.error("Error removing document: ", error);
                                                    })
                                                }
                                                
                                    
                                            });
                                            if(check == false){
                                                if((wishList[i].id)==comeid){
                                                    var date = {
                                                         idUser:idUser,
                                                         idProduct:idProduct,
                                                         date:new Date()
                                                     }
                                                     
                                                     // console.log(date)
                                                     firebase.firestore().collection("CartList").add(date)
                                                     .then(function(docRef) {
                                                         firebase.firestore().collection("wishList").doc(idWishList).delete().then(function() {
                                                             toastr.success("Added To Your Cart List")
                                                             
                                                         }).catch(function(error) {
                                                             console.error("Error removing document: ", error);
                                                         })
             
                                                         
                                                     })
                                                     .catch(function(error) {
                                                         console.error("Send Message ", error);
                                                     });
                                                     
                                                 }
            
                                            }
                                        
                                        }),err=>
                                        {
                                          this.toastr.errorToastr(err.message)
                                        }
                         
                                    
                                })
           
                                
                                $(".deleteWishList").on("click",function(){
                                    if((wishList[i].id)==$(this).attr("id")){
                                    if (confirm('Are you sure ?'))
                                     {
                                        //  console.log($(this).attr("id"))
        
                                        firebase.firestore().collection("wishList").doc($(this).attr("id")).delete().then(function() {
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