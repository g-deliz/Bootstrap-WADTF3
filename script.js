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
        showToast(
            document.getElementById("orderToast"),
            document.getElementById("toastMessage"),
            "Please enter your name.",
            "danger"
        );
        return;
    }

    const orderType =
        document.querySelector('input[name="orderType"]:checked').value;

    showToast(
        document.getElementById("orderToast"),
        document.getElementById("toastMessage"),
        `Thank you, ${customer}! ` +
        `Your ${orderType.toLowerCase()} order for ${quantity} ` +
        `${menuItem.value}${quantity > 1 ? "s" : ""} has been received. ` +
        `Total: ${totalDisplay.textContent}`,
        "success"
    );

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

document.getElementById("reserveNow").addEventListener("click", () => {
    const name = document.getElementById("reservationName").value.trim();
    const email = document.getElementById("reservationEmail").value.trim();
    const guests = document.getElementById("reservationGuests").value;
    const date = document.getElementById("reservationDate").value;
    const time = document.getElementById("reservationTime").value;

    if (!name || !email || guests === "Select..." || !date || !time) {
        showToast(
            document.getElementById("reservationToast"),
            document.getElementById("reservationToastMessage"),
            "Please complete all reservation fields.",
            "danger"
        );
        return;
    }

    showToast(
        document.getElementById("reservationToast"),
        document.getElementById("reservationToastMessage"),
        `Thank you, ${name}! Your reservation for ${guests} guest${guests === "1" ? "" : "s"} on ${date} at ${time} has been received.`,
        "success"
    );

    document.getElementById("reservationForm").reset();
});

updateTotal();
