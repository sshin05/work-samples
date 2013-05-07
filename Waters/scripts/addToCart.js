function addToCart(openClose) {
	if (openClose) {
		document.getElementById('AddToCartWindow').style.visibility = 'visible';
		document.getElementById('AddToCartWindow').style.display = 'block';
	} else {
		document.getElementById('AddToCartWindow').style.visibility = 'hidden';
		document.getElementById('AddToCartWindow').style.display = 'none';
	}
}
