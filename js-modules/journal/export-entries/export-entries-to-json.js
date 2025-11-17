import { dbGetAllEntries } from "../storage.js"

/** Pad a number to 2 digits */
function pad(num) {
  return String(num).padStart(2, "0")
}

/** Generate UTC date & time strings for filename */
function utcTimestampParts(now) {
  return {
    dateString: `${now.getUTCFullYear()}-${pad(now.getUTCMonth() + 1)}-${pad(
      now.getUTCDate()
    )}`,
    timeString: `${pad(now.getUTCHours())}-${pad(now.getUTCMinutes())}-${pad(
      now.getUTCSeconds()
    )}`,
  }
}

/** Convert a Blob to base64 string (without data: prefix) */
async function blobToBase64(blob) {
  if (!blob) return null
  const buffer = await blob.arrayBuffer()
  let binary = ""
  const bytes = new Uint8Array(buffer)
  const len = bytes.byteLength
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

/** Export all journal entries to a JSON file */
export default async function exportEntriesToJSON(
  baseKey = "JOURNAL_2025-entries"
) {
  let entries
  try {
    entries = await dbGetAllEntries()
  } catch (err) {
    alert("Failed to read entries from the database")
    console.error(err)
    return
  }

  if (!Array.isArray(entries) || entries.length === 0) {
    alert("No entries to export")
    return
  }

  // Convert Blobs to base64 for export
  const entriesForExport = []
  for (const e of entries) {
    const copy = {
      id: e.id,
      date: e.date,
      heading: e.heading,
      text: e.text,
      imageAlt: e.imageAlt || "",
      edited: e.edited || false,
    }

    if (e.imageBlob) {
      try {
        const base64 = await blobToBase64(e.imageBlob)
        copy.image = {
          mime: e.imageType || "application/octet-stream",
          data: base64,
        }
      } catch (err) {
        console.warn(`Failed to convert image for entry ${e.id}:`, err)
        copy.image = null
      }
    } else {
      copy.image = null
    }

    entriesForExport.push(copy)
  }

  const data = JSON.stringify(entriesForExport, null, 2)
  const now = new Date()
  const { dateString, timeString } = utcTimestampParts(now)

  const blob = new Blob([data], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `${baseKey}-${dateString}_${timeString}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
