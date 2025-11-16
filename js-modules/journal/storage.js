// js-modules/journal/storage.js
const DB_NAME = "journal2025"
const STORE_NAME = "entries"
const DB_VERSION = 1

let db

function openDB() {
  return new Promise((resolve, reject) => {
    if (db) return resolve(db)
    const request = indexedDB.open(DB_NAME, DB_VERSION)
    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      db = request.result
      resolve(db)
    }
    request.onupgradeneeded = (e) => {
      const database = e.target.result
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, { keyPath: "id" })
      }
    }
  })
}

// Add an entry
export function dbAddEntry(entry) {
  return new Promise(async (resolve, reject) => {
    try {
      const database = await openDB()
      const tx = database.transaction(STORE_NAME, "readwrite")
      tx.objectStore(STORE_NAME).put(entry)
      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
    } catch (err) {
      reject(err)
    }
  })
}

// Get all entries
export function dbGetAllEntries() {
  return new Promise(async (resolve, reject) => {
    try {
      const database = await openDB()
      const tx = database.transaction(STORE_NAME, "readonly")
      const store = tx.objectStore(STORE_NAME)
      const request = store.getAll()
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    } catch (err) {
      reject(err)
    }
  })
}

// Update existing entry
export function dbUpdateEntry(entry) {
  return dbAddEntry(entry) // same as put
}

// Delete entry
export function dbDeleteEntry(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const database = await openDB()
      const tx = database.transaction(STORE_NAME, "readwrite")
      tx.objectStore(STORE_NAME).delete(id)
      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
    } catch (err) {
      reject(err)
    }
  })
}

// Delete all entries
export function dbDeleteAllEntries() {
  return new Promise(async (resolve, reject) => {
    try {
      const database = await openDB()
      const tx = database.transaction(STORE_NAME, "readwrite")
      tx.objectStore(STORE_NAME).clear()
      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
    } catch (err) {
      reject(err)
    }
  })
}
