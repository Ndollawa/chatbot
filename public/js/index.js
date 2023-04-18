
    var $messages = $('.messages-content'), d, h, m, i = 0;
 
$(document).ready(function(){
 
  
  'use strict';
$messages.mCustomScrollbar();

// const socket = io('http://localhost:3000');
getRestaurantItems();

// $(document).on('submit',"#message-form", function(){

// })

$('#message-form').submit(function(e) {
  e.preventDefault();
  insertMessage();
});
$(document).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
})
})

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function setDate(){
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
}

function insertMessage() {
  msg = $('.message-input').val();
  const addToCart =$.trim($('#addToCart').val()) 
 let type = '';
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  setDate();
  $('.message-input').val(null);
  updateScrollbar();
  // setTimeout(function() {
    if(addToCart.length > 0){
     option = {type:'addToCart',msg,cartItems:addToCart}
    }else{
      option = {type:'options',msg}
    }

  // }, 1000 + (Math.random() * 20) * 100);

  $.ajax({
    url:'/chat',
    method:'POST',
    data:{option},
    success:function(data){
      console.log(data) 
      const {message,restaurantItems,options} = data;
      if(message){
 
        setTimeout(() => {
           msg = message+'<br/><br/>';
          serverMessage(msg);
          }, 500);
      }
      
      if(restaurantItems){
        setTimeout(() => {
        msg =`Please Make your order <br/>
        <table><br/>
        <tr align="center">Available Menu</tr>
        <thead><tr><th>S/N</th><th>Item</th><th>Price</th></tr></thead>
        <tbody>`;
      Object.values(restaurantItems)?.forEach(item => {
      msg += `<tr><td>${item.value}</td><td>${item.label}</td><td>${item.price}</td></tr>`;
      });
        msg +=`</tbody></table></br>`; 
      
          serverMessage(msg);
          },3000); 
      }
       if(options){
        
                setTimeout(() => {
                    msg =`Please Choose and option..<br/>`;
                  Object.values(options)?.forEach(option => {
                  msg += `<div><span>${option.value} :</span><span>${option.label}</span></div>`;
                  }); 
                    serverMessage(msg);
                    }, 4000);
      }
    }
  })
}
function getRestaurantItems(){
 
  $.ajax({
    url:'/restaurant',
    method:'GET',
    success:function(data){
      const {message, options, restaurantItems} = data;
console.log(data)
let msg;
if(message){
 
  setTimeout(() => {
     msg = message+'<br/><br/>';
    serverMessage(msg);
    }, 500);
}

if(restaurantItems){
  setTimeout(() => {
  msg =`Please Make your order <br/>
  <table><br/>
  <tr align="center">Available Menu</tr>
  <thead><tr><th>S/N</th><th>Item</th><th>Price</th></tr></thead>
  <tbody>`;
Object.values(restaurantItems)?.forEach(item => {
msg += `<tr><td>${item.value}</td><td>${item.label}</td><td>${item.price}</td></tr>`;
});
  msg +=`</tbody></table></br>`; 

    serverMessage(msg);
    },3000); 
}
 if(options){
  
          setTimeout(() => {
              msg =`Please Choose and option..<br/>`;
            Object.values(options)?.forEach(option => {
            msg += `<div><span>${option.value} :</span><span>${option.label}</span></div>`;
            }); 
              serverMessage(msg);
              }, 4000);
}
}
  })
}


function serverMessage(message) {
  // if ($('.message-input').val() != '') {
  //   return false;
  // }
  $('<div class="message loading new"><figure class="avatar"><img src="https://avatars.githubusercontent.com/u/60238828?s=40&v=4" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();

  setTimeout(function() {
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="https://avatars.githubusercontent.com/u/60238828?s=40&v=4" /></figure>' + message + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
  }, 1000 + (Math.random() * 20) * 100);

}






                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  


