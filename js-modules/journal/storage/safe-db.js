import { handleStorageError } from "./handle-storage-error.js"

/**
 * Runs an IndexedDB transaction function safely.
 * - Wraps all errors
 * - Routes quota/full errors to handler
 */
export async function safeDB(operation) {
  try {
    return await operation()
  } catch (err) {
    handleStorageError(err)
    throw err // still reject so calling code stops
  }
}
