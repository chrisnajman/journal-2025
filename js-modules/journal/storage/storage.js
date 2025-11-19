import { safeDB } from "./safe-db.js"

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
  return safeDB(async () => {
    const database = await openDB()
    const tx = database.transaction(STORE_NAME, "readwrite")
    tx.objectStore(STORE_NAME).put(entry)

    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
    })
  })
}

// Get all entries
export function dbGetAllEntries() {
  return safeDB(async () => {
    const database = await openDB()
    const tx = database.transaction(STORE_NAME, "readonly")
    const store = tx.objectStore(STORE_NAME)
    const request = store.getAll()

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  })
}

// Update existing entry
export function dbUpdateEntry(entry) {
  return dbAddEntry(entry)
}

// Delete entry
export function dbDeleteEntry(id) {
  return safeDB(async () => {
    const database = await openDB()
    const tx = database.transaction(STORE_NAME, "readwrite")
    tx.objectStore(STORE_NAME).delete(id)

    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
    })
  })
}

// Delete all entries
export function dbDeleteAllEntries() {
  return safeDB(async () => {
    const database = await openDB()
    const tx = database.transaction(STORE_NAME, "readwrite")
    tx.objectStore(STORE_NAME).clear()

    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
    })
  })
}

/**

  TESTING if 'handle-storage-error.js' launches the 'Quota exceeded' alert popup
  ------------------------------------------------------------------------------

  1. Comment out the 'live' code, above and uncomment:


  import { safeDB } from "../js-modules/journal/safe-db.js"

  const DB_NAME = "journal2025"
  const STORE_NAME = "entries"
  const DB_VERSION = 1

  let db

  // --- DEBUG QUOTA MODE ---
  const DEBUG_QUOTA_MODE = false // <-- set to true to force QUOTA errors

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
    return safeDB(async () => {
      if (DEBUG_QUOTA_MODE) {
        const quotaErr = new DOMException(
          "The quota has been exceeded (DEBUG QUOTA MODE)",
          "QuotaExceededError"
        )
        throw quotaErr
      }

      const database = await openDB()
      const tx = database.transaction(STORE_NAME, "readwrite")
      tx.objectStore(STORE_NAME).put(entry)

      return new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve()
        tx.onerror = () => reject(tx.error)
      })
    })
  }

  // Get all entries
  export function dbGetAllEntries() {
    return safeDB(async () => {
      const database = await openDB()
      const tx = database.transaction(STORE_NAME, "readonly")
      const store = tx.objectStore(STORE_NAME)
      const request = store.getAll()

      return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
      })
    })
  }

  // Update existing entry
  export function dbUpdateEntry(entry) {
    return dbAddEntry(entry)
  }

  // Delete entry
  export function dbDeleteEntry(id) {
    return safeDB(async () => {
      if (DEBUG_QUOTA_MODE) {
        const quotaErr = new DOMException(
          "The quota has been exceeded (DEBUG QUOTA MODE)",
          "QuotaExceededError"
        )
        throw quotaErr
      }

      const database = await openDB()
      const tx = database.transaction(STORE_NAME, "readwrite")
      tx.objectStore(STORE_NAME).delete(id)

      return new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve()
        tx.onerror = () => reject(tx.error)
      })
    })
  }

  // Delete all entries
  export function dbDeleteAllEntries() {
    return safeDB(async () => {
      if (DEBUG_QUOTA_MODE) {
        const quotaErr = new DOMException(
          "The quota has been exceeded (DEBUG QUOTA MODE)",
          "QuotaExceededError"
        )
        throw quotaErr
      }

      const database = await openDB()
      const tx = database.transaction(STORE_NAME, "readwrite")
      tx.objectStore(STORE_NAME).clear()

      return new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve()
        tx.onerror = () => reject(tx.error)
      })
    })
  }


  2. Then, in this section of the debug code:

  // --- DEBUG QUOTA MODE ---
  const DEBUG_QUOTA_MODE = false // <-- set to true to force QUOTA errors

  - Change 'false' to 'true'.

  This will trigger the popup after publishing any entry.

  Once you've confirmed that it works, reinstate the 'live' code (uncomment it), then either:

  - Comment out the debug code, or
  - delete it.

 */
