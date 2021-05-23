console.log("constants.js loaded");

// skroutz 
const PRODUCT_AVAILABILITY = ["Άμεση παραλαβή / Παράδοση 1 έως 3 ημέρες", "Παράδοση 1 έως 3 ημέρες", "Παράδοση 4 έως 10 ημέρες", 
"Παράδοση έως 30 ημέρες", "Κατόπιν παραγγελίας", "Μη διαθέσιμο"];

// indexedDB
const DATABASE_NAME = "MyDatabase";

const STORE_TEST_PRODUCTS_NAME = "TestProducts";
const STORE_TEST_PRODUCTS_KEYPATH = "testProductId";

const STORE_TRACKED_PRODUCTS_NAME = "TrackedProducts";
const STORE_TRACKED_PRODUCTS_KEYPATH = "trackedProductId";

const STORE_TEST_SHOPPING_LISTS_NAME = "TestShoppingLists";
const STORE_TEST_SHOPPING_LISTS_KEYPATH = "testShoppingListId";

const STORE_SHOPPING_LISTS_NAME = "ShoppingLists";
const STORE_SHOPPING_LISTS_KEYPATH = "shoppingListId";

const STORE_USER_PREFS_NAME = "UserPrefs";
const USER_PREFS_KEY_MAIN = "user-prefs-main";

// shopping list preferences
const DEFAULT_MAX_AVAILABILITY = PRODUCT_AVAILABILITY[2];
const DEFAULT_PREFER_CASH_ON_DELIVERY = false;
const DEFAULT_MAX_CASH_ON_DELIVERY_COSTS = 5;
const DEFAULT_MAX_SHIPPING_COSTS = 10;
const DEFAULT_PRICE_INCREASE_TOLERANCE = 0.5;

// other preferences
const DEFAULT_USE_ENDLESS_SCROLLING = false;
const DEFAULT_SHOW_REVIEW_RELEVANT_PRICE = false;