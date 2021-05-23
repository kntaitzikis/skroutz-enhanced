console.log("constructors.js loaded");

function Product(id, name, rating, description, url, imgUrl, storeListings) {
    this.id = id;
    this.name = name;
    this.rating = rating;
    this.description = description;
    this.url = url;
    this.imgUrl = imgUrl;
    this.storeListings = storeListings;
}

// returns the stores in which the product is available
Product.prototype.getStores = function() {
    let stores = [];
    for (let l of this.storeListings) {
        stores.push(l.store);
    }
    return stores;
};

Product.prototype.logToConsole = function() {
    console.log("-Product info-");
    console.log("id: " + this.id);
    console.log("name: " + this.name);
    console.log("rating: " + this.rating);
    console.log("description: " + this.description);
    console.log("url: " + this.url);
    console.log("imgUrl: " + this.imgUrl);
    for (let listing of this.storeListings) {
        listing.logToConsole();
    }
};

function TrackedProduct(product) {
    this.product = product;
    this.trackedSince = Date.now();
    this.lastUpdated = this.trackedSince;
}

TrackedProduct.prototype.logToConsole = function() {
    console.log("-Tracked product-");
    this.product.logToConsole();
    console.log("trackedSince: " + this.trackedSince);
    console.log("lastUpdated: " + this.lastUpdated);
};

function Store(id, name, rating, description, url, location) {
    this.id = id;
    this.name = name;
    this.rating = rating;
    this.description = description;
    this.url = url;
    this.location = location;
}

Store.prototype.logToConsole = function() {
    console.log("-Store info-")
    console.log("id: " + this.id);
    console.log("name: " + this.name);
    console.log("rating: " + this.rating);
    console.log("description: " + this.description);
    console.log("url: " + this.url);
    console.log("location: " + this.location);
};

function StoreListing(store, availability, price, shippingCosts, payOnDelivery) {
    this.store = store;
    this.availability = availability;
    this.price = price;
    this.shippingCosts = shippingCosts;
    this.payOnDelivery = payOnDelivery;
}

StoreListing.prototype.logToConsole = function() {
    this.store.logToConsole();
    console.log("-Store listing-");
    console.log("availability: " + this.availability);
    console.log("price: " + this.price);
    console.log("shippingCosts: " + this.shippingCosts);
    console.log("payOnDelivery: " + this.payOnDelivery);
};

// 'listPrefs' represents specific preferences for a particular list separate from the global listPrefs in userPrefs, defaults to global listPrefs if null 
function ShoppingList(id, name, products, listPrefs) {
    this.id = id;
    this.name = name;
    this.createdAt = Date.now();
    this.lastUpdated = this.createdAt;
    this.products = products;
    if (!this.products) this.products = [];
    this.listPrefs = listPrefs;
}

// returns an array of stores that sell all products in the shopping list
ShoppingList.prototype.getOptimalStores = function() {
    let optimalStores = [];

    for (let i=0; i<this.products.length; i++) {
        const p = this.products[i];
        if (i===0) {
            optimalStores = p.getStores();
        } else {
            optimalStores = optimalStores.filter(function(o1) {
                return p.getStores().some(function(o2) {
                    return o1.id === o2.id;
                });
            });
        }
    }

    return optimalStores;
};

ShoppingList.prototype.logToConsole = function(logProducts) {
    console.log("-Shopping list-");
    console.log("id: " + this.id);
    console.log("name: " + this.name);
    console.log("createdAt: " + this.createdAt);
    console.log("lastUpdated: " + this.lastUpdated);
    if (this.listPrefs) this.listPrefs.logToConsole();
    if (logProducts && this.products.length > 0) {
        console.log("-Shopping list products-");
        for (let p of this.products) {
            p.logToConsole();
        }
    }
};

function UserPrefs(shoppingListPrefs, useEndlessScrolling, showReviewRelevantPrice) {
    this.shoppingListPrefs = shoppingListPrefs;
    this.useEndlessScrolling = useEndlessScrolling;
    this.showReviewRelevantPrice = showReviewRelevantPrice;
    // todo
}

// 'priceIncreaseTolerance' represents how much the user is willing to pay over the lowest summed cost of a particular shopping list
// e.g. a shopping list with a lowest possible cost of 100€ and a priceIncreaseTolerance of 0.5 (50%) will only recommend stores that don't exceed a total cost of 150€ for that list
function ShoppingListPrefs(maxAvailability, preferCashOnDelivery, maxCashOnDeliveryCosts, maxShippingCosts, priceIncreaseTolerance) {
    this.maxAvailability = maxAvailability;
    this.preferCashOnDelivery = preferCashOnDelivery;
    this.maxCashOnDeliveryCosts = maxCashOnDeliveryCosts;
    this.maxShippingCosts = maxShippingCosts;
    this.priceIncreaseTolerance = priceIncreaseTolerance;
    // todo
}

ShoppingListPrefs.prototype.logToConsole = function() {
    console.log("-Shopping list prefs-");
    console.log("maxAvailability: " + this.maxAvailability);
    console.log("preferCashOnDelivery: " + this.preferCashOnDelivery);
    console.log("maxCashOnDeliveryCosts: " + this.maxCashOnDeliveryCosts);
    console.log("maxShippingCosts: " + this.maxShippingCosts);
    console.log("priceIncreaseTolerance: " + this.priceIncreaseTolerance);
};

function Category(id, name) {
    // todo
}