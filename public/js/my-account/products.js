

var allColorSelect = []
var files = [];
var urlFiles = []
addFileButton= document.getElementById("addphotos")
selectFileButton= document.getElementById("selectPhotos")

$(document).ready(function(){
    var TypeProduct = $(".TypeProduct")
    TypeProduct.on('change',function(){
        if(TypeProduct.val()=="Clothes"){
            $(".product-clothes-color").slideDown()
            $(".product-other-color").slideUp()
        }
        else{
            $(".product-clothes-color").slideUp()
            $(".product-other-color").slideDown()
        }
    })
    colorsClothes();
    if (localStorage.getItem("typeUser")!="client") {
        getMyProducts();
        $("#product-nav").show()          
    }
    
    setTimeout(() => {
        
        
  
   
        var show_per_page = 5;
        var number_of_items = document.getElementById("dataProductShow").childElementCount
        var number_of_pages = Math.ceil(number_of_items / show_per_page);
    
        $('#pagination').append('<div style="margin-top: 2%;margin-bottom: 1%; display: inline-table;" class=controls></div><input id=current_page type=hidden><input id=show_per_page type=hidden>');
        $('#current_page').val(0);
        $('#show_per_page').val(show_per_page);
    
        var navigation_html = '<a class="prevv" onclick="previous()">Prev</a>';
        var current_link = 0;
        while (number_of_pages > current_link) {
            navigation_html += '<a class="page" onclick="go_to_page(' + current_link + ')" longdesc="' + current_link + '">' + (current_link + 1) + '</a>';
            current_link++;
        }
        navigation_html += '<a class="nextt" style="color:black" onclick="next()">Next</a>';
    
        $('.controls').html(navigation_html);
        $('.controls .page:first').addClass('active');
    
        $('#dataProductShow').children().hide();
        $('#dataProductShow').children().slice(0, show_per_page).show();
    }, 5000);
    
})

$("#AddProduct").on('click',function ValidateAddProduct(){
    
    const productName = document.getElementById("ProductName")
    
    
    const DescriptionDescription = document.getElementById("DescriptionDescription")
    const TypeProduct = document.getElementById("TypeProduct")
    const PriceProduct = document.getElementById("PriceProduct")

if (!productName.checkValidity()) {
$("#ProductNameVal").fadeIn(1000).text(productName.validationMessage)

} 
else{
$("#ProductNameVal").fadeOut().text(productName.validationMessage)

}
if (!DescriptionDescription.checkValidity()) {
    $("#DescriptionDescriptionVal").fadeIn(1000).text(DescriptionDescription.validationMessage)
    
    } 
    else{
    $("#DescriptionDescriptionVal").fadeOut().text(DescriptionDescription.validationMessage)
    
    }
    
   
       
        

        if(TypeProduct.value=='Select Type Of Product'){
            
            $("#TypeProductVal").fadeIn(1000).text("Select Type Of Product")
        }
        
        
        else{
        $("#TypeProductVal").fadeOut().text(TypeProduct.validationMessage)
        
        }
        if (!PriceProduct.checkValidity()) {
            $("#PriceProductVal").fadeIn(1000).text(PriceProduct.validationMessage)
            
            } 
            else{
            $("#PriceProductVal").fadeOut().text(PriceProduct.validationMessage)
            
            }
            if(PriceProduct.checkValidity() && TypeProduct.value!='Select Type Of Product' && DescriptionDescription.checkValidity() && productName.checkValidity()){
                AddProduct();

            }


})

function AddProduct(){

    if (files.length==urlFiles.length){
        var product = {
            "nameProduct": document.getElementById("ProductName").value,
            "describeProduct": document.getElementById("DescriptionDescription").value,
            "typeProduct":document.getElementById("TypeProduct").value,
            "color":allColorSelect,
            "photos":urlFiles,
            "price":document.getElementById("PriceProduct").value,
            "date":new Date(),
            "infoOwner":{
                "phone":localStorage.getItem("phoneUser"),
                "name":localStorage.getItem("nameUser"),
                "mail":localStorage.getItem("mailUser"),
                "id":localStorage.getItem("mailUser"),
                "type":localStorage.getItem("typeUser")


            }
    
        }
        
        firebase.firestore().collection("products").add(product)
        .then(function(docRef) {
            toastr.success("Product Added")
            setTimeout(() => {
                location.href="product-list.html"
            }, 1000);
            

            
        })
        .catch(function(error) {
            console.error("Error adding Product: ", error);
        });
        

    }
    else{
        toastr.warning("Wait Until Upload Photos")
    }
 


}

function colorsClothes(){
    var red = []
    var blue = []
    var black = []
    var white = []
    var green = []
    var yellow = []
    var  gray = []
   
   
    $("#addred").on("click",function(){
        if ($('#red').is(":checked")  )
        {
            if($("#redSize").val() != "")
            {
                if($("#redAmount").val()  != "")
                {
                    red.push({"size":$("#redSize").val(),"amount":$("#redAmount").val()})
                    $("#redSize").val("") 
                    $("#redAmount").val("") 
                 
                    displayRed()
                    
                      
                   
                    

                }
                else{
                    toastr.warning("Enter Amount Of Red Color")


                }
            
               
            }
            else{
                toastr.warning("Enter Size Of Red Color")

            }
          
        }
        else{
            toastr.warning("Select Red Color Frist")
        }
    })
    function displayRed(){
        document.getElementById("showSelectSizeRed").innerHTML = ""
        document.getElementById("showSelectAmountRed").innerHTML = ""

        
        red.forEach(element => {
            
           
            document.getElementById("showSelectSizeRed").innerHTML +=  "size: "+ element.size + "<br>"
            document.getElementById("showSelectAmountRed").innerHTML +=   element.amount +"&#160; Piece &#160; &ensp; "+'   <i  class="fa fa fa-trash del "></i>' + "<br>"
            var allFaTrash =  document.querySelectorAll('.del'); 
            allFaTrash.forEach(element => {
                        
                element.addEventListener('click',  function checkIndex(event){
                   
                   red.splice(Array.from(allFaTrash).indexOf(event.target),1);
                  
                  
                   displayRed()
                  
            
                  });
            })
          
        }); 
    }
    

       
                   
    
    $("#addblue").on("click",function(){
        if ($('#blue').is(":checked")  )
        {
            if($("#blueSize").val() != "")
            {
                if($("#blueAmount").val()  != "")
                {
                    blue.push({"size":$("#blueSize").val(),"amount":$("#blueAmount").val()})
                    $("#blueSize").val("") 
                    $("#blueAmount").val("") 
                    displayBlue()

                }
                else{
                    toastr.warning("Enter Amount Of Blue Color")


                }
            
               
            }
            else{
                toastr.warning("Enter Size Of Blue Color")

            }
          
        }
        else{
            toastr.warning("Select Blue Color Frist")
        }
    })
    function displayBlue(){
        document.getElementById("showSelectSizeBlue").innerHTML = ""
        document.getElementById("showSelectAmountBlue").innerHTML = ""

        
        blue.forEach(element => {
            
           
            document.getElementById("showSelectSizeBlue").innerHTML +=  "size: "+ element.size + "<br>"
            document.getElementById("showSelectAmountBlue").innerHTML +=   element.amount +"&#160; Piece &#160; &ensp; "+'   <i  class="fa fa fa-trash delblue "></i>' + "<br>"
            var allFaTrashBlue =  document.querySelectorAll('.delblue'); 
            allFaTrashBlue.forEach(element => {
                        
                element.addEventListener('click',  function checkIndex(event){
                   
                    blue.splice(Array.from(allFaTrashBlue).indexOf(event.target),1);
                  
                  
                   displayBlue();
                  
            
                  });
            })
          
        }); 
    }
    $("#addblack").on("click",function(){
        if ($('#black').is(":checked")  )
        {
            if($("#blackSize").val() != "")
            {
                if($("#blackAmount").val()  != "")
                {
                    black.push({"size":$("#blackSize").val(),"amount":$("#blackAmount").val()})
                    $("#blackSize").val("") 
                    $("#blackAmount").val("") 
                    displayBlack();

                }
                else{
                    toastr.warning("Enter Amount Of Black Color")


                }
            
               
            }
            else{
                toastr.warning("Enter Size Of Black Color")

            }
          
        }
        else{
            toastr.warning("Select Black Color Frist")
        }
    })
    function displayBlack(){
        document.getElementById("showSelectSizeBlack").innerHTML = ""
        document.getElementById("showSelectAmountBlack").innerHTML = ""

        
        black.forEach(element => {
            
           
            document.getElementById("showSelectSizeBlack").innerHTML +=  "size: "+ element.size + "<br>"
            document.getElementById("showSelectAmountBlack").innerHTML +=   element.amount +"&#160; Piece &#160; &ensp; "+'   <i  class="fa fa fa-trash delblack "></i>' + "<br>"
            var allFaTrashBlack =  document.querySelectorAll('.delblack'); 
            allFaTrashBlack.forEach(element => {
                        
                element.addEventListener('click',  function checkIndex(event){
                   
                    black.splice(Array.from(allFaTrashBlack).indexOf(event.target),1);
                  
                  
                   displayBlack();
                  
            
                  });
            })
          
        }); 
    }
    $("#addwhite").on("click",function(){
        if ($('#white').is(":checked")  )
        {
            if($("#whiteSize").val() != "")
            {
                if($("#whiteAmount").val()  != "")
                {
                    white.push({"size":$("#whiteSize").val(),"amount":$("#whiteAmount").val()})
                    $("#whiteSize").val("") 
                    $("#whiteAmount").val("") 
                    displayWhite();

                }
                else{
                    toastr.warning("Enter Amount Of White Color")


                }
            
               
            }
            else{
                toastr.warning("Enter Size Of   White Color")

            }
          
        }
        else{
            toastr.warning("Select White Color Frist")
        }
    })
    function displayWhite(){
        document.getElementById("showSelectSizeWhite").innerHTML = ""
        document.getElementById("showSelectAmountWhite").innerHTML = ""

        
        white.forEach(element => {
            
           
            document.getElementById("showSelectSizeWhite").innerHTML +=  "size: "+ element.size + "<br>"
            document.getElementById("showSelectAmountWhite").innerHTML +=   element.amount +"&#160; Piece &#160; &ensp; "+'   <i  class="fa fa fa-trash delwhite "></i>' + "<br>"
            var allFaTrashWhite =  document.querySelectorAll('.delwhite'); 
            allFaTrashWhite.forEach(element => {
                        
                element.addEventListener('click',  function checkIndex(event){
                   
                    white.splice(Array.from(allFaTrashWhite).indexOf(event.target),1);
                  
                  
                   displayWhite();
                  
            
                  });
            })
          
        }); 
    }
    $("#addgreen").on("click",function(){
        if ($('#green').is(":checked")  )
        {
            if($("#greenSize").val() != "")
            {
                if($("#greenAmount").val()  != "")
                {
                    green.push({"size":$("#greenSize").val(),"amount":$("#greenAmount").val()})
                    $("#greenSize").val("") 
                    $("#greenAmount").val("") 
                    displaygreen();;

                }
                else{
                    toastr.warning("Enter Amount Of Green Color")


                }
            
               
            }
            else{
                toastr.warning("Enter Size Of   Green Color")

            }
          
        }
        else{
            toastr.warning("Select Green Color Frist")
        }
    })
    function displaygreen(){
        document.getElementById("showSelectSizeGreen").innerHTML = ""
        document.getElementById("showSelectAmountGreen").innerHTML = ""

        
        green.forEach(element => {
            
           
            document.getElementById("showSelectSizeGreen").innerHTML +=  "size: "+ element.size + "<br>"
            document.getElementById("showSelectAmountGreen").innerHTML +=   element.amount +"&#160; Piece &#160; &ensp; "+'   <i  class="fa fa fa-trash delgreen "></i>' + "<br>"
            var allFaTrashGreen=  document.querySelectorAll('.delgreen'); 
            allFaTrashGreen.forEach(element => {
                        
                element.addEventListener('click',  function checkIndex(event){
                   
                    green.splice(Array.from(allFaTrashGreen).indexOf(event.target),1);
                  
                  
                   displaygreen();
                  
            
                  });
            })
          
        }); 
    }
    $("#addyellow").on("click",function(){
        if ($('#yellow').is(":checked")  )
        {
            if($("#yellowSize").val() != "")
            {
                if($("#yellowAmount").val()  != "")
                {
                    yellow.push({"size":$("#yellowSize").val(),"amount":$("#yellowAmount").val()})
                    $("#yellowSize").val("") 
                    $("#yellowAmount").val("") 
                    displayyellow();

                }
                else{
                    toastr.warning("Enter Amount Of Yellow Color")


                }
            
               
            }
            else{
                toastr.warning("Enter Size Of   Yellow Color")

            }
          
        }
        else{
            toastr.warning("Select Yellow Color Frist")
        }
    })
    function displayyellow(){
        document.getElementById("showSelectSizeYellow").innerHTML = ""
        document.getElementById("showSelectAmountYellow").innerHTML = ""

        
        yellow.forEach(element => {
            
           
            document.getElementById("showSelectSizeYellow").innerHTML +=  "size: "+ element.size + "<br>"
            document.getElementById("showSelectAmountYellow").innerHTML +=   element.amount +"&#160; Piece &#160; &ensp; "+'   <i  class="fa fa fa-trash delyellow "></i>' + "<br>"
            var allFaTrashYellow=  document.querySelectorAll('.delyellow'); 
            allFaTrashYellow.forEach(element => {
                        
                element.addEventListener('click',  function checkIndex(event){
                   
                    yellow.splice(Array.from(allFaTrashYellow).indexOf(event.target),1);
                  
                  
                   displayyellow();
                  
            
                  });
            })
          
        }); 
    }
    $("#addgray").on("click",function(){
        if ($('#gray').is(":checked")  )
        {
            if($("#graySize").val() != "")
            {
                if($("#grayAmount").val()  != "")
                {
                    gray.push({"size":$("#graySize").val(),"amount":$("#grayAmount").val()})
                    $("#graySize").val("") 
                    $("#grayAmount").val("") 
                    displaygray();
                    

                }
                else{
                    toastr.warning("Enter Amount Of Gray Color")


                }
            
               
            }
            else{
                toastr.warning("Enter Size Of   Gray Color")

            }
          
        }
        else{
            toastr.warning("Select Gray Color Frist")
        }
    })
    function displaygray(){
        document.getElementById("showSelectSizeGray").innerHTML = ""
        document.getElementById("showSelectAmountGray").innerHTML = ""

        
        gray.forEach(element => {
            
           
            document.getElementById("showSelectSizeGray").innerHTML +=  "size: "+ element.size + "<br>"
            document.getElementById("showSelectAmountGray").innerHTML +=   element.amount +"&#160; Piece &#160; &ensp; "+'   <i  class="fa fa fa-trash delgray "></i>' + "<br>"
            var allFaTrashGray=  document.querySelectorAll('.delgray'); 
            allFaTrashGray.forEach(element => {
                        
                element.addEventListener('click',  function checkIndex(event){
                   
                    gray.splice(Array.from(allFaTrashGray).indexOf(event.target),1);
                  
                  
                   displaygray();
                  
            
                  });
            })
          
        }); 
    }
    $("#addcolorsClothes").on("click",function(){
        if ($('#red').is(":checked") ){
            allColorSelect.push({"red":red})
        }
        if ($('#blue').is(":checked")  ){
            allColorSelect.push({"blue":blue})
        }
        if ($('#black').is(":checked")  ){
            allColorSelect.push({"black":black})
        }
        if ($('#white').is(":checked")  ){
            allColorSelect.push({"white":white})
        }
        if ($('#green').is(":checked")  ){
            allColorSelect.push({"green":green})
        }
        if ($('#yellow').is(":checked")  ){
            allColorSelect.push({"yellow":yellow})
        }
        if ($('#gray').is(":checked")  ){
            allColorSelect.push({"gray":gray})
        }
        setTimeout(() => {
            document.getElementById("product-clothes-color").style.display="none"
        }, 500);
        
    })
    $("#addcolorsOther").on("click",function(){
        if ($('#red2').is(":checked") ){
            allColorSelect.push({"red":{"color":"red","amount":$("#redOther").val()}})
        }
        if ($('#blue2').is(":checked")  ){
            allColorSelect.push({"blue":{"color":"blue","amount":$("#blueOther").val()}})
        }
        if ($('#black2').is(":checked")  ){
            allColorSelect.push({"black":{"color":"black","amount":$("#blackOther").val()}})
        }
        if ($('#white2').is(":checked")  ){
            allColorSelect.push({"white":{"color":"white","amount":$("#whiteOther").val()}})
        }
        if ($('#green2').is(":checked")  ){
            allColorSelect.push({"green":{"color":"green","amount":$("#greenOther").val()}})
        }
        if ($('#yellow2').is(":checked")  ){
            allColorSelect.push({"yellow":{"color":"yellow","amount":$("#yellowOther").val()}})
        }
        if ($('#gray2').is(":checked")  ){
            allColorSelect.push({"gray":{"color":"gray","amount":$("#grayOther").val()}})
        }
        setTimeout(() => {
            // console.log(allColorSelect)
            document.getElementById("product-other-color").style.display="none"
        }, 500);
        
    })
    $(".clear").on("click",function(){
        
        if (!$('#red').is(":checked") ){
            red = []
            displayRed();
        }
        if (!$('#blue').is(":checked")  ){
            blue = []
            displayBlue();
        }
        if (!$('#black').is(":checked")  ){
            black = []
            displayBlack();
        }
        if (!$('#white').is(":checked")  ){
            white = []
            displayWhite();
        }
        if (!$('#green').is(":checked")  ){
            green = []
            displaygreen();
        }
        if (!$('#yellow').is(":checked")  ){
            yellow = []
            displayyellow();
        }
        if (!$('#gray').is(":checked")  ){
            gray = []
            displaygray();
        }
       
        
    })

}



selectFileButton.addEventListener('change', function selectImage(e){ 
 
    files = e.target.files
    addFileButton.style.backgroundColor="#007bff"
    addFileButton.style.borderColor="#007bff;"
    addFileButton.removeAttribute("disabled")
    document.getElementById('imgInp').innerHTML='You Select Some Images'
});

addFileButton.addEventListener('click', function UploadSomeImage(){ 

   
    for (var i = 0; i < files.length; i++) {
        var imageFile =files[i];
        

        uploadImageAsPromise(imageFile);
        
    }
});
var fullDirectory = "/productPhotos";
//Handle waiting to upload each file using promise
function uploadImageAsPromise (imageFile) {
              
                $( "#addphotos" ).prop( "disabled", true );
                
    
        var storageRef = firebase.storage().ref(fullDirectory+"/"+imageFile.name);

        //Upload file
        var task = storageRef.put(imageFile);

        //Update progress bar
        task.on('state_changed',
            function progress(snapshot){
                var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;

                addFileButton.style.marginLeft="28px"
                
                
                
                document.getElementById("photosdownloadbar").style.display = 'inline'
                document.getElementById("photosdownload").textContent = math.floor(percentage)+ "%"
                document.getElementById("photosdownload").style.width = percentage + "%"
                
              
                
            },

            function error(err){
                toaster.error("Faild Refresh Page And Try Again")
                

            },
            function complete(){
                var downloadURL = task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    // console.log("File available at", downloadURL);
                    urlFiles.push(downloadURL)
                    // console.log(urlFiles)

                  })
                
                
                
            },
           
        );
    
}


    function readURLForDisplayPics(input) {
        if (document.contains(document.getElementById("mySlides"))) {
            
            $('.mySlides').remove();
            
     }
 
    if (input.files) {
        document.getElementById("next").style.display = 'block'
        document.getElementById("prev").style.display = 'block'

        for (var i = 0; i < input.files.length; i++) {
        var reader = new FileReader();
        
        reader.onload = function(event) {
            
           
            $($.parseHTML('<div class="mySlides " id="mySlides"><img id="dispic" src='+event.target.result+' style="width:100%;height:350px;background-size: 100% 100% object-fit: contain;"></div>')).appendTo('.slideshow');
            document.getElementById("next").click()
            
   
        }
        
        
        reader.readAsDataURL(input.files[i]); // convert to base64 string
      }


        
}

        
     
      }
      
      $("#selectPhotos").change(function displayPics() {
     
        readURLForDisplayPics(this);
        
      });
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
var productsData =[]
var productsDataLength =[]
    function getMyProducts(){
        firebase.firestore().collection("products").
        onSnapshot(function(querySnapshot) 
        {
            var numerProduct = 1
            productsData =[]
            productsDataLength =[]
            $("#dataProductShow").empty()

            querySnapshot.forEach(function(doc) {
            productsData.push({"data":doc.data(),"id":doc.id})
           
        });
        productsData.sort(function(a,b)
        {
          return b.data.date - a.data.date;
        });


        for (let i = 0; i < productsData.length; i++) {
            if(localStorage.getItem("mailUser")==productsData[i].data.infoOwner.mail)
        {

            var time = new Date(1970, 0, 1);
                            
            var date = new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short',day:'numeric'}).format(time.setSeconds(productsData[i].data.date.seconds))
            
            productsDataLength.push(productsData[i].id)
            $("#dataProductShow").append(`
            <tr>
                 <td>${numerProduct}</td>
                 <td>${productsData[i].data.nameProduct}</td>
                 <td>$${productsData[i].data.price}</td>
                 <td>${date}</td>
                 <td><button id="${productsData[i].id}" class="btn viewProduct">View</button></td>
                 <td><button id="${productsData[i].id}" class="btn deleteProduct">Delete</button></td>
             </tr>

           `)
           numerProduct = numerProduct + 1
           $(".viewProduct").on("click",function()
           {
            location.href="product-detail.html"
            localStorage.setItem("id",$(this).attr('id')) 
           })
           $(".deleteProduct").on("click",function()
           {
             if($(this).attr("id")==productsData[i].id){
            if (confirm('Are you sure ?')) {
     
                firebase.firestore().collection("products").doc($(this).attr("id")).delete().then(function() {
                    toastr.success("Product successfully deleted!");
                    getMyProducts();

        
        
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                })
            }else
            {
              console.log('cancel')
            }
           }
            
            
           })

          

        }
        
           
            
        }
      
        if (productsDataLength.length == 0) {
            $("#tableProduct").hide
            $("#allProduct").text("No Product Yet")
            
        }
    });

    }
    $("#product-nav").on("click",function (){
        $("#showAllProduct").css({
            "background":"#20b7ff",
            "color":"white"
 
        })
        $("#showAllProduct").click()

    })
    $("#AddProductIcon").on("click",function(){


        $("#showAllProduct").css({
            "background-color": "rgb(240, 240, 240)",
            "color":"black"
    
        })
      
     
    })
    
    $("#showAllProduct").on("click",function(){
    
    $("#showAllProduct").css({
        "background":"#20b7ff",
        "color":"white"
    })
    
    })
    $("#showAllProduct").mouseenter( function(){
        $("#showAllProduct").css({
            "background":"#20b7ff",
            "color":"white"
    
        })
    
    } ).mouseleave( function(){
        $("#showAllProduct").css({
            "background-color": "rgb(240, 240, 240)",
            "color":"black"
    
        })
    
    } );

    function go_to_page(page_num) {
        var show_per_page = parseInt($('#show_per_page').val(), 0);
    
        start_from = page_num * show_per_page;
    
        end_on = start_from + show_per_page;
    
        $('#dataProductShow').children().hide().slice(start_from, end_on).show();
    
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