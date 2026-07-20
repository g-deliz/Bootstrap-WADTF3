const prices = {
    "Classic Espresso": 3.99,
    "Vanilla Latte": 5.49,
    "Butter Croissant": 4.25
};

const menuItem = document.getElementById("menuItem");
const quantityInput = document.getElementById("quantity");
const totalDisplay = document.getElementById("orderTotal");

let quantity = 1;

function showToast(toastElement, toastMessage, message, type = "success") {
    toastElement.classList.remove("bg-success", "bg-danger");
    toastElement.classList.add(type === "success" ? "bg-success" : "bg-danger");
    toastMessage.textContent = message;

    const toast = new bootstrap.Toast(toastElement, {
        delay: 6000
    });

    toast.show();
}

function updateTotal() {
    const item = menuItem.value;
    const price = prices[item];
    totalDisplay.textContent =
        "$" + (price * quantity).toFixed(2);
}

document.querySelectorAll(".order-btn").forEach(button => {
    button.addEventListener("click", function () {
        menuItem.value = this.dataset.item;
        quantity = 1;
        quantityInput.value = quantity;
        updateTotal();
    });
});

menuItem.addEventListener("change", updateTotal);

document.getElementById("plusBtn").addEventListener("click", () => {
    quantity++;
    quantityInput.value = quantity;
    updateTotal();
});

document.getElementById("minusBtn").addEventListener("click", () => {
    if (quantity > 1) {
        quantity--;
        quantityInput.value = quantity;
        updateTotal();
    }
});

document.getElementById("placeOrder").addEventListener("click", () => {
    const customer = document.getElementById("customerName").value.trim();

if (customer === "") {
    const toastElement = document.getElementById("orderToast");
    const toastMessage = document.getElementById("toastMessage");
    toastElement.classList.remove("bg-success");
    toastElement.classList.add("bg-danger");
    toastMessage.textContent = "Please enter your name.";

const toast = new bootstrap.Toast(toastElement, {
    delay: 6000
});

toast.show();
    return;
    }

    const orderType =
        document.querySelector('input[name="orderType"]:checked').value;
    const toastElement = document.getElementById("orderToast");
    const toastMessage = document.getElementById("toastMessage");
    toastElement.classList.remove("bg-danger");
    toastElement.classList.add("bg-success");

    toastMessage.textContent =
        `Thank you, ${customer}! ` +
        `Your ${orderType.toLowerCase()} order for ${quantity} ` +
        `${menuItem.value}${quantity > 1 ? "s" : ""} has been received. ` +
        `Total: ${totalDisplay.textContent}`;

    const toast = new bootstrap.Toast(toastElement, {
        delay: 6000
    });

toast.show();
    document.getElementById("orderForm").reset();
    quantity = 1;
    quantityInput.value = 1;
    menuItem.value = "Classic Espresso";
    document.querySelector(
        'input[name="orderType"][value="Pickup"]'
    ).checked = true;
    updateTotal();
    const modal =
        bootstrap.Modal.getInstance(document.getElementById("orderModal"));
    modal.hide();
});
updateTotal();
