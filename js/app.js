const allProducts = document.querySelectorAll(".shop__product");
const addToCartBtns = document.querySelectorAll(".shop__product-btn");
const popup = document.querySelector(".popup");
const popupSummaryPrice = document.querySelector(".popup__order-summary");
const cartAmount = document.querySelector(".cart-amount");
const cartEmptyImg = document.querySelector(".shop__cart-img");
const cartEmptyText = document.querySelector(".shop__cart-text");
const cartOrderInfo = document.querySelector(".shop__cart-order-info");
const cartCarbonInfo = document.querySelector(".shop__cart-carbon-info");
const cartConfirmBtn = document.querySelector(".shop__confirm-btn");
const cartNewOrderBtn = document.querySelector(".popup__btn");
const overlay = document.querySelector(".overlay");

const cartUl = document.querySelector(".shop__cart-ul");
const popupUl = document.querySelector(".popup__ul");

let amountToggler;
let shopProduct;
let productText;
let productName;
let productPrice;
let priceFixed;
let amountNumber;
let cartQuantity;
let cartSummaryPrice;
let cartRemoveBtn;
let allCartItems;
let currentAmount;
let total;

const handleShop = (e) => {
	if (e.target.matches(".shop__product-btn")) {
		addToCart(e);
	} else if (e.target.matches(".shop__product-add-btn")) {
		increaseAmount(e);
	} else if (e.target.matches(".shop__cart-li-btn")) {
		removeFromCart(e);
	} else if (e.target.matches(".shop__product-remove-btn")) {
		decreaseAmount(e);
	}
};

const addToCart = (e) => {
	shopProduct = e.target.closest(".shop__product");

	amountToggler = shopProduct.querySelector(".shop__product-toggler");
	amountToggler.classList.remove("hidden");
	cartEmptyImg.classList.add("hidden");
	cartEmptyText.classList.add("hidden");
	amountNumber = amountToggler.querySelector(".shop__product-amount");
	productText = shopProduct.querySelector(".shop__product-text");
	productName = shopProduct.querySelector(".shop__product-name");
	productPrice = shopProduct.querySelector(".shop__product-price");
	currentAmount = parseInt(amountNumber.dataset.amount, 10);

	const imgSrc = shopProduct.querySelector("img").src;
	const cartLi = document.createElement("li");
	const cartBox = document.createElement("div");
	const cartProductName = document.createElement("p");
	cartQuantity = document.createElement("span");
	const cartBasicPrice = document.createElement("span");
	cartSummaryPrice = document.createElement("span");
	cartRemoveBtn = document.createElement("button");

	cartLi.classList.add("shop__cart-li");
	cartBox.classList.add("shop__cart-li-info");
	cartProductName.classList.add("shop__cart-li-product");
	cartQuantity.classList.add("shop__cart-li-quantity");
	cartBasicPrice.classList.add("shop__cart-li-basic");
	cartSummaryPrice.classList.add("shop__cart-li-price");
	cartRemoveBtn.classList.add("shop__cart-li-btn");

	cartConfirmBtn.classList.remove("hidden");
	cartCarbonInfo.classList.remove("hidden");
	cartOrderInfo.classList.remove("hidden");
	shopProduct.classList.add("active");

	priceFixed = parseFloat(productPrice.textContent.replace("$", ""));

	amountNumber.textContent = currentAmount;
	cartQuantity.textContent = `${currentAmount}x`;
	cartProductName.textContent = productName.textContent;
	cartBasicPrice.textContent = `@ $${priceFixed.toFixed(2)}`;
	cartSummaryPrice.textContent = `$${(priceFixed * currentAmount).toFixed(2)}`;
	cartRemoveBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
	cartUl.append(cartLi);
	cartLi.append(cartBox, cartRemoveBtn);
	cartBox.append(
		cartProductName,
		cartQuantity,
		cartBasicPrice,
		cartSummaryPrice
	);

	updateSummaryPrice();
	changeCartItemsCount();

	cartLi.dataset.imgSrc = imgSrc;
};

const changeCartItemsCount = () => {
	allCartItems = cartUl.querySelectorAll("li");
	if (allCartItems.length !== 0) {
		cartAmount.textContent = `(${allCartItems.length})`;
	} else {
		cartAmount.textContent = "(0)";
		cartEmptyImg.classList.remove("hidden");
		cartEmptyText.classList.remove("hidden");
	}
};

const increaseAmount = (e) => {
	const toggler = e.target.closest(".shop__product-toggler");
	const amountNumber = toggler.querySelector(".shop__product-amount");
	const shopProduct = e.target.closest(".shop__product");
	const productName = shopProduct.querySelector(
		".shop__product-name"
	).textContent;

	const cartItem = Array.from(cartUl.querySelectorAll(".shop__cart-li")).find(
		(item) =>
			item.querySelector(".shop__cart-li-product").textContent === productName
	);

	const cartQuantity = cartItem.querySelector(".shop__cart-li-quantity");
	const cartSummaryPrice = cartItem.querySelector(".shop__cart-li-price");
	const cartBasicPrice = parseFloat(
		cartItem
			.querySelector(".shop__cart-li-basic")
			.textContent.replace("@ $", "")
	);

	let currentAmount = parseInt(amountNumber.dataset.amount, 10);
	currentAmount++;
	amountNumber.dataset.amount = currentAmount;
	amountNumber.textContent = currentAmount;
	cartQuantity.textContent = `${currentAmount}x`;
	cartSummaryPrice.textContent = `$${(cartBasicPrice * currentAmount).toFixed(
		2
	)}`;

	updateSummaryPrice();
};

const decreaseAmount = (e) => {
	const toggler = e.target.closest(".shop__product-toggler");
	const amountNumber = toggler.querySelector(".shop__product-amount");
	const shopProduct = e.target.closest(".shop__product");
	const productName = shopProduct.querySelector(
		".shop__product-name"
	).textContent;
	const cartItem = Array.from(cartUl.querySelectorAll(".shop__cart-li")).find(
		(item) =>
			item.querySelector(".shop__cart-li-product").textContent === productName
	);

	const cartQuantity = cartItem.querySelector(".shop__cart-li-quantity");
	const cartSummaryPrice = cartItem.querySelector(".shop__cart-li-price");
	const cartBasicPrice = parseFloat(
		cartItem
			.querySelector(".shop__cart-li-basic")
			.textContent.replace("@ $", "")
	);
	let currentAmount = parseInt(amountNumber.dataset.amount, 10);

	if (currentAmount > 1) {
		currentAmount--;
	} else {
		currentAmount = 1;
	}

	amountNumber.dataset.amount = currentAmount;
	amountNumber.textContent = currentAmount;
	cartQuantity.textContent = `${currentAmount}x`;
	cartSummaryPrice.textContent = `$${(cartBasicPrice * currentAmount).toFixed(
		2
	)}`;

	updateSummaryPrice();
};

const removeFromCart = (e) => {
	const closestLi = e.target.closest("li");
	const closestLiFirstChild = closestLi.firstChild;
	const paragraphToMatch = closestLiFirstChild.firstChild;
	const matchProduct = Array.from(allProducts).find(
		(product) =>
			product.querySelector(".shop__product-name").textContent ===
			paragraphToMatch.textContent
	);

	const togglerToHide = matchProduct.querySelector(".shop__product-toggler");
	matchProduct.classList.remove("active");
	togglerToHide.classList.add("hidden");

	closestLi.remove();
	changeCartItemsCount();
	updateSummaryPrice();

	if (allCartItems.length === 0) {
		cartConfirmBtn.classList.add("hidden");
		cartCarbonInfo.classList.add("hidden");
		cartOrderInfo.classList.add("hidden");
	}
};

const updateSummaryPrice = () => {
	const orderSummary = document.querySelector(".shop__cart-order-summary");
	total = 0;

	const cartItems = cartUl.querySelectorAll(".shop__cart-li");

	cartItems.forEach((item) => {
		const quantity = parseInt(
			item
				.querySelector(".shop__cart-li-quantity")
				.textContent.replace("x", ""),
			10
		);
		const pricePerUnit = parseFloat(
			item.querySelector(".shop__cart-li-basic").textContent.replace("@ $", "")
		);
		total += quantity * pricePerUnit;
	});

	orderSummary.textContent = `$${total.toFixed(2)}`;
};

const restartPage = () => {
	location.reload();
};

const showPopup = () => {
	popup.classList.add("active");
	overlay.classList.add("active");

	for (item of allCartItems) {
		const imgSrc = item.dataset.imgSrc;

		const itemName = item.querySelector(".shop__cart-li-product");
		const itemQuantity = item.querySelector(".shop__cart-li-quantity");
		const itemBasic = item.querySelector(".shop__cart-li-basic");
		const itemSumPrice = item.querySelector(".shop__cart-li-price");

		const popupLi = document.createElement("li");
		const popupImg = document.createElement("img");
		const popupBox = document.createElement("div");
		const popupProductName = document.createElement("p");
		const popupProductQuantity = document.createElement("span");
		const popupProductBasicPrice = document.createElement("span");
		const popupProductSummaryPrice = document.createElement("span");

		popupLi.classList.add("popup__li");
		popupImg.classList.add("popup__li-img");
		popupBox.classList.add("popup__li-product-info");
		popupProductName.classList.add("popup__li-product-name");
		popupProductQuantity.classList.add("popup__li-product-quantity");
		popupProductBasicPrice.classList.add("popup__li-product-basic");
		popupProductSummaryPrice.classList.add("popup__li-price");

		popupImg.src = imgSrc;
		popupProductName.textContent = itemName.textContent;
		popupProductQuantity.textContent = itemQuantity.textContent;
		popupProductBasicPrice.textContent = itemBasic.textContent;
		popupProductSummaryPrice.textContent = itemSumPrice.textContent;
		popupSummaryPrice.textContent = `$${total.toFixed(2)}`;

		popupUl.append(popupLi);
		popupBox.append(
			popupProductName,
			popupProductQuantity,
			popupProductBasicPrice
		);
		popupLi.append(popupImg, popupBox, popupProductSummaryPrice);
	}
};

cartNewOrderBtn.addEventListener("click", restartPage);
cartConfirmBtn.addEventListener("click", showPopup);
cartUl.addEventListener("click", handleShop);
allProducts.forEach((product) => product.addEventListener("click", handleShop));
