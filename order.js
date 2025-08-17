// Order functionality
let cart = [];
let total = 0;

// Add event listeners to all add buttons
document.addEventListener('DOMContentLoaded', function() {
    const addButtons = document.querySelectorAll('.add-btn');
    const cartItemsContainer = document.querySelector('.cart-items');
    const placeOrderBtn = document.querySelector('.place-order-btn');
    
    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            const dishItem = this.closest('.dish-item');
            const dishName = dishItem.querySelector('h3').textContent;
            const priceText = dishItem.querySelector('.price').textContent;
            const price = parseFloat(priceText.replace('$', ''));
            
            // Add item to cart
            const existingItem = cart.find(item => item.name === dishName);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    name: dishName,
                    price: price,
                    quantity: 1
                });
            }
            
            updateCartDisplay();
            updateTotal();
        });
    });
    
    function updateCartDisplay() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        } else {
            cartItemsContainer.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="item-info">
                        <span class="item-name">${item.name}</span>
                        <span class="item-price">$${item.price.toFixed(2)} x ${item.quantity}</span>
                    </div>
                    <button class="remove-btn" onclick="removeItem('${item.name}')">Remove</button>
                </div>
            `).join('');
        }
    }
    
    function updateTotal() {
        total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        placeOrderBtn.textContent = `Place Order - $${total.toFixed(2)}`;
    }
    
    // Make removeItem function global
    window.removeItem = function(itemName) {
        cart = cart.filter(item => item.name !== itemName);
        updateCartDisplay();
        updateTotal();
    };
    
    // Handle form submission
    const deliveryForm = document.querySelector('.delivery-form');
    deliveryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (cart.length === 0) {
            alert('Please add items to your cart before placing an order.');
            return;
        }
        
        // Get form data
        const formData = new FormData(this);
        const orderData = {
            items: cart,
            total: total,
            customerInfo: {
                fullName: formData.get('fullName'),
                phoneNumber: formData.get('phoneNumber'),
                emailAddress: formData.get('emailAddress'),
                deliveryAddress: formData.get('deliveryAddress'),
                specialRequests: formData.get('specialRequests')
            }
        };
        
        // Simulate order placement
        alert(`Order placed successfully! Total: $${total.toFixed(2)}\nWe'll contact you shortly to confirm your order.`);
        
        // Reset form and cart
        cart = [];
        total = 0;
        this.reset();
        updateCartDisplay();
        updateTotal();
    });
});
