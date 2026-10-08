let cart = [];

let wishlist = [];

let selectedProduct = {
    name: "",
    price: 0,
    category: "",
    description: "",
    image: ""
};


// ================= CART =================

function addToCart(name, price) {

    const existingProduct = cart.find(
        item => item.name === name
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    updateCart();

    alert(name + " added to cart!");
}


function updateCart() {

    let count = 0;
    let total = 0;

    cart.forEach(item => {

        count += item.quantity;

        total += item.price * item.quantity;

    });

    document.getElementById("cart-count").textContent = count;

    document.getElementById("cart-items").textContent = count;

    document.getElementById("cart-total").textContent = total;

    document.getElementById("cart-final-total").textContent = total;

}


function viewCart() {

    const details =
        document.getElementById("cart-details");

    const list =
        document.getElementById("cart-product-list");

    details.style.display = "block";


    if (cart.length === 0) {

        list.innerHTML =
            "<p>Your cart is empty.</p>";

        return;

    }


    list.innerHTML = "";


    cart.forEach(function(item, index) {

        const subtotal =
            item.price * item.quantity;


        const product =
            document.createElement("div");


        product.className = "cart-item";


        product.innerHTML = `

            <div>

                <strong>${item.name}</strong>

                <p>₹${item.price} each</p>

                <p>
                    Subtotal:
                    <strong>₹${subtotal}</strong>
                </p>

            </div>


            <div class="quantity-controls">

                <button onclick="decreaseQuantity(${index})">
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button onclick="increaseQuantity(${index})">
                    +
                </button>

            </div>


            <button onclick="removeFromCart(${index})">
                Remove
            </button>

        `;


        list.appendChild(product);

    });

}


function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();

    viewCart();

}


function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    updateCart();

    viewCart();

}


function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

    viewCart();

}


// ================= WISHLIST =================

function toggleWishlist(button, name, price) {

    const existingIndex =
        wishlist.findIndex(
            item => item.name === name
        );


    if (existingIndex === -1) {

        wishlist.push({
            name: name,
            price: price
        });

        button.textContent = "♥";

    } else {

        wishlist.splice(existingIndex, 1);

        button.textContent = "♡";

    }


    updateWishlist();

}


function updateWishlist() {

    const list =
        document.getElementById("wishlist-items");


    if (wishlist.length === 0) {

        list.innerHTML =
            "<p>No products added to wishlist yet.</p>";

        return;

    }


    list.innerHTML = "";


    wishlist.forEach(function(item, index) {

        const product =
            document.createElement("div");


        product.className = "wishlist-item";


        product.innerHTML = `

            <div>

                <strong>${item.name}</strong>

                <p>₹${item.price}</p>

            </div>

            <button onclick="removeFromWishlist(${index})">
                Remove
            </button>

        `;


        list.appendChild(product);

    });

}


function removeFromWishlist(index) {

    wishlist.splice(index, 1);

    updateWishlist();

}


// ================= FILTER =================

function filterProducts(category) {

    const products =
        document.querySelectorAll(".product-card");


    products.forEach(function(product) {

        if (
            category === "all" ||
            product.getAttribute("data-category") === category
        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

}


// ================= SEARCH =================

function searchProducts() {

    const text =
        document.getElementById("searchInput")
        .value
        .toLowerCase();


    const products =
        document.querySelectorAll(".product-card");


    products.forEach(function(product) {

        const name =
            product.getAttribute("data-name")
            .toLowerCase();


        if (name.includes(text)) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

}


// ================= PRODUCT DETAILS =================

function showProductDetails(
    name,
    price,
    category,
    description,
    image
) {

    document.getElementById("product-details")
        .style.display = "block";


    selectedProduct = {

        name: name,
        price: price,
        category: category,
        description: description,
        image: image

    };


    document.getElementById("details-name")
        .textContent = name;

    document.getElementById("details-price")
        .textContent = price;

    document.getElementById("details-category")
        .textContent = category;

    document.getElementById("details-description")
        .textContent = description;

    document.getElementById("details-image")
        .src = image;


    document.getElementById("product-details")
        .scrollIntoView({
            behavior: "smooth"
        });

}


function addDetailsProductToCart() {

    addToCart(
        selectedProduct.name,
        selectedProduct.price
    );

}


function addDetailsProductToWishlist() {

    const exists =
        wishlist.some(
            item => item.name === selectedProduct.name
        );


    if (!exists) {

        wishlist.push({

            name: selectedProduct.name,

            price: selectedProduct.price

        });

        updateWishlist();

        alert(
            selectedProduct.name +
            " added to wishlist!"
        );

    } else {

        alert(
            selectedProduct.name +
            " is already in your wishlist."
        );

    }

}


// ================= CHECKOUT =================

function openCheckout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty. Add a product first."
        );

        return;

    }


    let total = 0;


    cart.forEach(function(item) {

        total += item.price * item.quantity;

    });


    document.getElementById("checkout-total")
        .textContent = total;


    document.getElementById("checkout")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ================= PLACE ORDER =================

function placeOrder(event) {

    event.preventDefault();


    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }


    const orderId =
        "CW" +
        Math.floor(
            100000 + Math.random() * 900000
        );


    document.getElementById("order-id")
        .textContent = orderId;


    document.getElementById("order-confirmation")
        .style.display = "block";


    document.getElementById("order-confirmation")
        .scrollIntoView({
            behavior: "smooth"
        });


    cart = [];

    updateCart();

    document.getElementById("cart-product-list")
        .innerHTML =
        "<p>Your cart is empty.</p>";


    document.querySelector(
        ".checkout-section form"
    ).reset();

}


// ================= CHATBOT =================

function sendMessage() {

    const input =
        document.getElementById("user-message");


    const message =
        input.value.trim();


    if (message === "") {
        return;
    }


    const chatBox =
        document.getElementById("chat-box");


    const userMessage =
        document.createElement("p");


    userMessage.innerHTML =
        "<strong>You:</strong> " +
        message;


    chatBox.appendChild(userMessage);


    const lower =
        message.toLowerCase();


    let response =
        "I can help you with products, prices, cart and shopping.";


    if (
        lower.includes("clothes") ||
        lower.includes("clothing")
    ) {

        response =
            "We have Classic T-Shirt available for ₹599.";

    }

    else if (
        lower.includes("shoe") ||
        lower.includes("sneaker")
    ) {

        response =
            "We have Classic Sneakers available for ₹899.";

    }

    else if (
        lower.includes("headphone")
    ) {

        response =
            "Wireless Headphones are available for ₹1,499.";

    }

    else if (
        lower.includes("watch")
    ) {

        response =
            "Smart Watch is available for ₹1,999.";

    }

    else if (
        lower.includes("bag")
    ) {

        response =
            "Casual Handbag is ₹799 and Travel Backpack is ₹999.";

    }

    else if (
        lower.includes("cart")
    ) {

        response =
            "You can view your selected products in the shopping cart section.";

    }

    else if (
        lower.includes("hello") ||
        lower.includes("hi")
    ) {

        response =
            "Hello! Welcome to CartWise. How can I help you?";

    }


    const botMessage =
        document.createElement("p");


    botMessage.innerHTML =
        "<strong>Assistant:</strong> " +
        response;


    chatBox.appendChild(botMessage);


    input.value = "";


    chatBox.scrollTop =
        chatBox.scrollHeight;

}


function handleEnter(event) {

    if (event.key === "Enter") {

        sendMessage();

    }

}
