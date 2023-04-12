const express = require('express'); 
const cookieParser = require('cookie-parser');
const socketio = require('socket.io'); 
const path = require('path');
const session = require('express-session')
// const MongoStore = require('connect-mongo') ;
const http = require('http'); 
const socketIO = require('socket.io'); 
const { format } = require('date-fns');
const uuidv4 = require('uuid').v4;
// Create the app 
const app = express(); 
// Initialize the session 
app.use(session({
secret: '3b05eb10ceaa45305262c4231375158e02190395ebd12fb6d207671cf34c95d800d24b572e948a60bb8b06981220185ba61ddd485733b2653f4b754b397a85c7', 
resave: false, 
saveUninitialized: true,
// cookie:{secure:true,httpOnly:true}
 }));
 // Create the server , secure:true
 const server = http.createServer(app); 
 // Create the Socket.io connection 
 const io = socketIO(server);
//  io.use(function(socket, next) {
//     var handshake = socket.request;
//     next();
//   });
app.use(express.urlencoded({extended:true}));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());
//set view engine to ejs
// app.set("view engine",'ejs');
app.use(express.static(path.join(__dirname, '/public')));
///routes

  
 // Set up chatbot routing 
app.get('/', (req, res) => {
     let session = req.session;
     // Check to see if a user session exists 
// const sessionId = req.cookies.sessionId;
const restaurantItems = [ {value: '1', label: 'Fried Chicken', price: "₦50.00"}, {value: '2', label: 'Fish and Chips', price: "₦10.00"}, {value: '3', label: 'Pizza', price: "₦3.000"}, {value: '4', label: 'Burger', price: "₦30.00"} ];
io.on('connection', (socket) => { 
    const orderOperations = ()=>{
// Send user the initial options 
socket.on('user-join',(data)=>{
     setTimeout(() => {
           socket.emit('message', { type: 'options', options: [ {value: '1', label: 'Place an order'}, {value: '99', label: 'Checkout order'}, {value: '98', label: 'See order history'}, {value: '97', label: 'See current order'}, {value: '0', label: 'Cancel order'} ] }); 
     }, 500);
   
})

// Handle requests for options 
socket.on('option', (option) => {
     // Handle the request for "Place an order" 
     if(option.type === 'addToCart'){

 if (!session.order) { session.order = option.cartItems; } else {
      session.order += ', ' + option.cartItems; } 
 // Store the order history in the user session
 const order = session.order.split(',');
 const dateTime = format(new Date(), 'yyyy-MM-dd\tHH:mm:ss');
let placedOrders = restaurantItems.map(item=>{
     if(order.includes(item.value)) return item
})
placedOrders= [...placedOrders,{dateTime}]
// console.log(placedOrders)
  if (!session.history) { 
     session.history =  [placedOrders];
} else {
      session.history = [...session.history, placedOrders] } 
      // Respond to the user
      let orderResult;
       Object.values(placedOrders).map((value,i)=>{
          // console.log(value)
          if(value?.label !== undefined && i !== (Object.values(placedOrders).length-1)){
      orderResult +=`<li>${value?.label} - ${value?.price}</li>`}})
      socket.emit('message', { type: 'text', message: `You have ordered<br/><ol>${orderResult}</ol><br/>Date - ${dateTime} ` });
       // Send the user back the options 
       setTimeout(() => {
           socket.emit('message', { type: 'options', options: [ {value: '1', label: 'Place an order'}, {value: '99', label: 'Checkout order'}, {value: '98', label: 'See order history'}, {value: '97', label: 'See current order'}, {value: '0', label: 'Cancel order'} ] });
     
       }, 500);
   

     }
     switch(option.msg){
case '1':
     // Send a list of items from the restaurant 
socket.emit('message', { type: 'list', items:restaurantItems });
setTimeout(() => {
socket.emit('message', { type: 'text', message: 'To add to your cart choose and item.\n To and more than one item separate option number with a comma. @example: 1,2,3...<br/><input class="" name="addToCart" id="addToCart" placeholder="Please enter in your order.." style="padding:2px;"/><br/> ' }); 
      
}, 500);
break;
 // Handle the request for "Checkout order"
case '99':
     // Check if no order has been placed 
if (!session.order) { 
    // No order has been placed 
    socket.emit('message', { type: 'text', message: 'No order to place' });
 } else {
         // Place the order 
    socket.emit('message', { type: 'text', message: 'Order placed' }); 
} 
break;
     // Handle the request for "See order history" 
 case '98':
         // Check if any orders have been placed 
    if (!session.history) {
         // No orders have been placed 
    socket.emit('message', { type: 'text', message: 'No order history' });
 } else { 
        // Show the order history 
     let msg;
       msg +=`Your Order History <br/>
        <table>
        <tr align="center">History</tr>
        <thead><tr><th>S/N</th><th>Item</th><th>Price</th></tr></thead>
        <tbody>`;
        console.log(session.history)
        const history = Object.values(session.history);
 const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
 history.map((order)=>{
  return Object.values(order).map((item,i)=>{
          if(item && i !== (Object.values(order).length-1)){
      return (`<tr><td>${item.value}</td><td>${item.label}</td><td>${item.price}</td></tr>`);
          }else{
               return (`<tr>${item.dateTime}</tr>`)
          }
})
 })
  
        msg +=`${history}</tbody></table>`; 
        socket.emit('message', { type: 'text', message: msg }); 
     
} 
break;
         // Handle the request for "See current order"
 case '97':
             // Check if any orders have been placed 
        if (session.order === null || !session.order) {
             // No orders have been placed 
        socket.emit('message', { type: 'text', message: 'No current order' });
     } else { 
            // Show the current order 
            const order = session.order.split(',');
            const dateTime = format(new Date(), 'yyyy-MM-dd\tHH:mm:ss');
           let placedOrders = restaurantItems.map(item=>{
                if(order.includes(item.value)) return item
           })
           placedOrders= [...placedOrders,{dateTime}]
           let orderResult;
                   Object.values(placedOrders).map((value,i)=>{
                     if(value?.label !== undefined && i !== (Object.values(placedOrders).length-1)){
                orderResult +=`<li>${value?.label} - ${value?.price}</li>`}})
                     console.log(orderResult)
                 socket.emit('message', { type: 'text', message: `Your current order<br/><ol>${orderResult}</ol><br/>Date - ${dateTime} ` });
              
    } 
    break;
         // Handle the request for "Cancel order"
         case '0':
             // Check if any orders have been placed 
        if (!session.order || session.order === null) {
             // No orders have been placed 
        socket.emit('message', { type: 'text', message: 'No order to cancel' }); } else {
            // Cancel the order 
             session.order = null; 
        socket.emit('message', { type: 'text', message: 'Order cancelled' }); } 
        break;
    default:
     socket.emit('message', { type: 'text', message: 'sorry you entered an invalid option' });  
     setTimeout(() => {
          socket.emit('message', { type: 'options', options: [ {value: '1', label: 'Place an order'}, {value: '99', label: 'Checkout order'}, {value: '98', label: 'See order history'}, {value: '97', label: 'See current order'}, {value: '0', label: 'Cancel order'} ] });
          
         }, 500);
    break;
        
     }
          
     }); 
     
       
     }

const sessionId = socket.request.session
// console.log(sessionId)
// console.log(`User connected from ${socket.session.device}`);
 if (session && session.user) {
    //  Store the user session in a variable 
let user = session.user; 
// console.log(user)
//   Initialize the chatroom 
  let chatbot = { users: [], conversations: [] }; 
  // Track all active users 
   if (session.user) { 
    // The user is already logged in, so add them to the chatbot 
    chatbot.users.push(session.user); 
    socket.emit('message', { type: 'text', message: `Welcome to the to Nd's Restuarant , ${session.user.userId}!` }); } 
    socket.on('message', (data) => { 
        // Broadcast the incoming message to all users in the chatbot 
        io.sockets.emit('message', data); 
        // Store the conversation in the chatbot 
        chatbot.conversations.push(data); }); 
              orderOperations();
          
        
//     console.log(socket.id)

}else{
       // Check to see if a user session exists 
const sessionId = req.cookies.sessionId;
session.user = {
    deviceId: req.headers['user-agent'],
    sessionId,
    userIP:req.ip,
    userID: uuidv4(),
//     order:[],
//     history:[]

}
// session.order = {}
// session.history = {}
 
     socket.emit('message',{type:'greetings', message: 'Hello Welcome to Nd\'s Restaurant'});
  
    orderOperations();
  

}


     });
    res.sendFile(__dirname + '/views/index.html');
    });
         // Listen on port 3000
         const port = process.env.PORT || 3000; server.listen(port, () => { console.log(`Server listening on port ${port}`); });
