document
  .getElementById("downloadPdfButton")
  .addEventListener("click", function () {
    // Create a new jsPDF instance
    const pdf = new jsPDF();

    // Get the content of the order summary
    const orderSummaryContent =
      document.getElementById("orderSummary").innerHTML;

    // Add the order summary content to the PDF
    pdf.fromHTML(orderSummaryContent, 15, 15, {
      width: 180,
    });

    // Save the PDF with a filename
    pdf.save("order_summary.pdf");
  });

let form = document.getElementById("orderForm");
let addButton = document.getElementById("addButton");
let emptyCartButton = document.getElementById("emptyCartButton");
let calculateTotalButton = document.getElementById("calculateTotalButton");
let placeOrderButton = document.getElementById("placeOrderButton");
let removeLastItemButton = document.getElementById("removeLastItemButton");
let orderSummary = document.getElementById("orderSummary");
let summaryItems = document.getElementById("summaryItems");
let totalPriceSpan = document.getElementById("totalPrice");
let componentSelect = form.component;
let quantityInput = form.quantity;
let shippingSelect = form.shipping;

// Define the prices for each item
const itemPrices = {
  cpu: 150,
  gpu: 300,
  ram: 80,
  storage: 100,
  motherboard: 120,
  "power-supply": 50,
  case: 70,
  monitor: 200,
  keyboard: 30,
  mouse: 20,
  headphones: 40,
  speakers: 60,
};

let selectedItems = [];

addButton.addEventListener("click", function () {
  const component = componentSelect.value;
  const quantity = parseInt(quantityInput.value);
  const price = itemPrices[component] || 0;

  if (quantity > 0) {
    selectedItems.push({ component, quantity, price });

    const itemSummary = `<p>${quantity} x ${component} - $${price.toFixed(
      2
    )} each</p>`;
    summaryItems.innerHTML += itemSummary;
  }
});

emptyCartButton.addEventListener("click", function () {
  selectedItems = [];
  summaryItems.innerHTML = "";
  totalPriceSpan.textContent = "$0.00";
});

calculateTotalButton.addEventListener("click", function () {
  let totalCost = 0;

  selectedItems.forEach((item) => {
    totalCost += item.price * item.quantity;
  });

  const shippingCost =
    totalCost > 0 ? (shippingSelect.value === "express" ? 20 : 0) : 0;
  totalCost += shippingCost;

  totalPriceSpan.textContent = `$${totalCost.toFixed(2)}`;
});

placeOrderButton.addEventListener("click", function () {
  if (selectedItems.length > 0) {
    alert("Order placed successfully!");
  } else {
    alert("No items added to the order.");
  }
});

removeLastItemButton.addEventListener("click", function () {
  if (selectedItems.length > 0) {
    selectedItems.pop();
    updateSummary();
  }
});

function updateSummary() {
  summaryItems.innerHTML = "";
  selectedItems.forEach((item) => {
    const itemSummary = `<p>${item.quantity} x ${
      item.component
    } - $${item.price.toFixed(2)} each</p>`;
    summaryItems.innerHTML += itemSummary;
  });
  calculateTotalButton.click();
}
