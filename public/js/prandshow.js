var sponserData = []

$(document).ready(function(){
    showSponser();

} )
function showSponser(){
    firebase.firestore().collection("Sponser").get()
    .then(function(querySnapshot) {
        
        querySnapshot.forEach(function(doc) {
       
        sponserData.push({"data":doc.data(),"id":doc.id})

       
       
    });
   for (let i = 0; i < sponserData.length; i++) {
         const {Logo,NameCompany,dateFrom,dateTo }=sponserData[i].data
   

    $("#brand-slider").append(`<div class="brand-item" style="margin-left: 0.2%;margin-right: 0.2%;"><img src="${Logo}" style="width:150px;height:80px;" alt=""></div>`)
    
}
sponser();
$(".slick-arrow").remove()
}).catch(function error(){
    toaster.error("Faild Refresh Page And Try Again")
    

})

}
function sponser(){
    $(function() {
     
       $('.slider').slick({
         speed: 3000,
         autoplay: true,
         autoplaySpeed: 0,
         cssEase: 'linear',
         slidesToShow: 4,
         slidesToScroll: 1,
         variableWidth: true,
         infinite: true,
         dots: false,
         prevArrow: false,
         nextArrow: false
         
       });
     });
}