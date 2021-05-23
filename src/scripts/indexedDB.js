console.log("indexedDB.js loaded");

// returns open request for the database, manages database version increments
function openIndexedDB() {
  // This works on all devices/browsers, and uses IndexedDBShim as a final fallback 
  let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
  let openDB = indexedDB.open(DATABASE_NAME, 1);

  openDB.onerror = function(event) {
    console.error("IndexedDB open() request onError");
    console.error("Database error: " + event.target.errorCode);
    // todo
  }

  openDB.onupgradeneeded = function(event) {
    console.log("IndexedDB open() request onUpgradeNeeded");
    console.log("Old Version: " + event.oldVersion);
    console.log("New Version: " + event.newVersion);

    let db = {};
    db.result = openDB.result;
    if (event.oldVersion < 1) {
      // Version 1 is the first version of the database
      db.testProducts = db.result.createObjectStore(STORE_TEST_PRODUCTS_NAME);
      db.trackedProducts = db.result.createObjectStore(STORE_TRACKED_PRODUCTS_NAME);
      db.testShoppingLists = db.result.createObjectStore(STORE_TEST_SHOPPING_LISTS_NAME);
      db.shoppingLists = db.result.createObjectStore(STORE_SHOPPING_LISTS_NAME);
      db.userPrefs = db.result.createObjectStore(STORE_USER_PREFS_NAME);
    }
    // Version 2 of the database
    else if (event.oldVersion < 2) {
      // todo
    }
  }

  return openDB;
}

// returns db object for readwrite transactions on the 'objectStore'
function getStoreIndexedDB (openDB, objectStore, indexName) {
  let db = {};
  db.result = openDB.result;
  db.tx = db.result.transaction(objectStore, "readwrite");
  db.store = db.tx.objectStore(objectStore);
  //db.index = db.store.index(indexName);

  return db;
}

// put() one 'item' under 'key' in the given 'objectStore'
function putIndexedDB(objectStore, item, key) {
  let openDB = openIndexedDB();

  openDB.onsuccess = function() {
    let db = getStoreIndexedDB(openDB, objectStore);
    let putRequest = db.store.put(item, key);

    //console.log("The transaction that originated this request is " + db.tx);

    putRequest.onsuccess = function() {
      console.log("IndexedDB put() request onSuccess");
    }

    putRequest.onerror = function() {
      console.log("put request onError");
    }

  }

}

// get() one item that matches the 'key' in the given 'objectStore'
function getIndexedDB(objectStore, key, callback) {
  let openDB = openIndexedDB();

  openDB.onsuccess = function() {
    let db = getStoreIndexedDB(openDB, objectStore);
    let getRequest = db.store.get(key);

    getRequest.onsuccess = function() {
      console.log("IndexedDB get() request onSuccess");
      try { callback(getRequest.result.data); } catch { callback(); }
    }

    getRequest.onerror = function() {
      console.log("get request onError");
    }

  }

}

// get() all 'items' in the given 'objectStore' using a cursor
function getAllIndexedDB(objectStore, callback) {
  let openDB = openIndexedDB();

  openDB.onsuccess = function() {
    let db = getStoreIndexedDB(openDB, objectStore);
    let items = [];

    db.store.openCursor().onsuccess = function(event) {
      let cursor = event.target.result;

      if (cursor) {
        items.push(cursor.value);
        cursor.continue();
      } else {
        console.log("Retrieved all items from " + objectStore + " object store");
        try { callback(items); } catch { callback(); }
      }

    }

  }

}

// delete() item under 'key' in the given 'objectStore'
function deleteIndexedDB(objectStore, key) {
  let openDB = openIndexedDB();

  openDB.onsuccess = function() {
    let db = getStoreIndexedDB(openDB, objectStore);
    let deleteRequest = db.store.delete(key);

    deleteRequest.onsuccess = function() {
      console.log("IndexedDB delete() request onSuccess")
    }
    
  }

}