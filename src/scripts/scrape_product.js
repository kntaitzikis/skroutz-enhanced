console.log("scrape_product.js loaded");

function getProductDetails() {
    let id = document.querySelector("[itemprop=sku]").getAttribute("content");
    let name = document.querySelector(".page-title").innerText;
    let rating = document.querySelector("[itemprop=ratingValue]").innerText;
    let description = document.querySelector(".description").firstChild.innerText;
    let url = window.location.href;
    let imgUrl = document.querySelector(".sku-image").firstChild.src;
    return new Product(id, name, rating, description, url, imgUrl, getStoreListings());
}

function getStoreListings() {
    let storeListings = [];
    let prices = document.querySelector("#prices").getElementsByTagName("li");
    for (let i=0; i < prices.length; i++) {
        let storeId = prices[i].getAttribute("id");
        let storeName = prices[i].querySelector(".shop-name").innerText;
        let storeRating = prices[i].querySelector(".rating").getAttribute("title");
        let description = null; //todo
        let storeUrl = null; //todo
        let storeLocation = prices[i].querySelector(".location-tab").innerText;
        let store = new Store(storeId, storeName, storeRating, description, storeUrl, storeLocation);

        let availability = prices[i].querySelector(".availability").innerText;
        let price = prices[i].querySelector(".dominant-price").innerText;
        let extraCosts = prices[i].querySelector(".price-content-shop");
        let shippingCosts = extraCosts.getElementsByClassName("extra-cost")[0].firstChild.innerText;
        let payOnDelivery = extraCosts.getElementsByClassName("extra-cost")[1].firstChild.innerText;
        storeListings.push(new StoreListing(store, availability, price, shippingCosts, 
            payOnDelivery));
    }
    return storeListings;
}