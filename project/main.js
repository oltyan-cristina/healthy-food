//OPEN & CLOSE CART
const cartIcon=document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{
   menu.classList.toggle('fa-times');
   navbar.classList.toggle('active');
}

window.onscroll = () =>{
    menu.classList.remove('fa-times');
   navbar.classList.remove("active");
}


cartIcon.addEventListener("click", () =>{
    cart.classList.add("active");
});

closeCart.addEventListener("click",()=>{
     cart.classList.remove("active");
});

//Start when the document is ready
if(document.readyState == "loading"){
    document.addEventListener('DOMContentLoaded', start);
}else{
    start();
}
 //*********START********
 function start(){
    addEvents();
 }

 //*************UPDATE & RERANDER******
 function update(){
    addEvents();
    updateTotal();
 }

 //********ADD EVENTS*******
 function addEvents(){
    //Remove items from cart
    let cartRemove_btns = document.querySelectorAll("#cart-remove");
    console.log(cartRemove_btns);
    cartRemove_btns.forEach(btn => {
        btn.addEventListener("click" , handle_removeCartItem);
    });

    //Change item quatity
    let cartQuatity_inputs = document.querySelectorAll('.cart-quantity');
    cartQuatity_inputs.forEach(input => {
       input.addEventListener("change", handle_changeItemQuantity);
    });

    //Add item to cart
    let addCart_btns = document.querySelectorAll(".add-cart");
    addCart_btns.forEach(btn =>{
      btn.addEventListener("click", handle_addCartItem);
    });


 }

 //******HANDLE EVENTS FUNCTION
 


 function handle_removeCartItem(){
    this.parentElement.remove();
    /*itemAdded = itemAdded.filter(
        el => 
        el.title != 
        this.parentElement.querySelector('.cart-product-title').innerHTML
        );
*/
    update();
 }

 function handle_changeItemQuantity(){
    if(isNaN(this.value) || this.value < 1){
        this.value = 1;
    }
    this.value = Math.floor(this.value); //to keep it integer

    update();
 }
 

 function handle_addCartItem(){

    let product = this.parentElement;
    let title = product.querySelector(".product-title").innerHTML;
    let price = product.querySelector(".product-price").innerHTML;
    let imgSrc = product.querySelector(".product-img").src;
    console.log(title, price, imgSrc);

    let newToAdd = {
        title,
        price,
        imgSrc,
    };
    

    //Add product to cart

    let cartBoxElement = CartBoxComponent(title,price,imgSrc);
    let newNode = document.createElement("div");
    newNode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newNode);

    update();
 }

 function updateTotal(){
    let cartBoxes = document.querySelectorAll('.cart-box');
    const totalElement = cart.querySelector('.total-price');
    let total = 0;
    cartBoxes.forEach(cartBox => {
         let priceElement = cartBox.querySelector('.cart-price');
         let price = parseFloat(priceElement.innerHTML.replace("$",""));
         let quantity = cartBox.querySelector(".cart-quantity").value;
         total += price * quantity;
    });

    //keep 2 digits after point
    total = total.toFixed(2);
    

    totalElement.innerHTML = total + "lei";

 }


 //********HTLM COMPONENTS********
 function CartBoxComponent(title,price,imgSrc){  
    return `
    <div class="cart-box">'
        <img src=${imgSrc} alt="" class="cart-img">
         <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
            </div>
        <!--remove cart-->
        <i class='bx bxs-trash-alt' id="cart-remove"></i>
        </div> ` ;
       
     update();               
 }


 function loader(){
   document.querySelector('.loader-container').classList.add('fade-out');

 }

 function fadeOut(){
   setInterval(loader, 3000);
 }

   window.onload = fadeOut;              