var $messages = $('.messages-content'),
    d, h, m,
    i = 0;

$(window).load(function() {
  $messages.mCustomScrollbar();
});
    
$(document).ready(function(){
  'use strict';

// const socket = io('http://localhost:3000');



$('#message-form').submit(function(e) {
  e.preventDefault();
  insertMessage();
});
$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
})
})

  socket = io('https://chabot-ne92.onrender.com:1000',{withCredentials: true});
  socket.emit('user-join',io);
  socket.on('message',(data)=>{
  let msg ='';
  switch (data.type) {
    case "options":
        msg +=`Please Choose and option..<br/>`
        data.options?.forEach(option => {
        msg += `<div><span>${option.value} :</span><span>${option.label}</span></div>`;
        }); 
      break;
    case "list":
       msg +=`Please Make your order <br/>
   <table>
   <tr align="center">Available Menu</tr>
   <thead><tr><th>S/N</th><th>Item</th><th>Price</th></tr></thead>
   <tbody>`
data.items?.forEach(item => {
 msg += `<tr><td>${item.value}</td><td>${item.label}</td><td>${item.price}</td></tr>`;
});
   msg +=`</tbody></table>`; 
      break;
    case "greetings":
      msg = data.message;
      break;
    case "text":
      msg = data.message;
      break;
  
    default:
      msg = "Opps! sorry and  error occured";
      break;
  }
 setTimeout(() => {
  
 serverMessage(msg);
 }, 500);
});

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
  console.log(addToCart)
 let type = '';
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  setDate();
  $('.message-input').val(null);
  updateScrollbar();
  setTimeout(function() {
    if(addToCart.length > 0){
      socket.emit('option',({type:'addToCart',msg,cartItems:addToCart}));
    }else{
      socket.emit('option',({type:"options",msg}));

    }

  }, 1000 + (Math.random() * 20) * 100);
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






                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  


