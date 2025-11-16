UPDATED PROJECT MIGRATION CHECKLIST (for ChatGPT)

(This version includes my existing “Export entries to JSON” button and the render-entry.js image path issue.)

# 'Journal' PROJECT

This project is a personal journal web app.

It allows users to:

- Create new journal entries
- Add a title, date, text content, and an optional image
- Edit the title and text directly in-place
- Remove an attached image
- Delete individual entries
- Delete all entries (with confirmation)
- Lazy-load images for performance
- Export all entries to a downloadable JSON file

The project currently uses localStorage, but I want to fully migrate everything to IndexedDB, including images (stored as Blobs). The UI and existing behaviour must remain unchanged.

What follows is my full migration checklist.

Here is the full list of tasks I want you to complete:

## 'Journal' PROJECT MIGRATION CHECKLIST

### A. Storage Migration (LocalStorage → IndexedDB)

Remove all localStorage usage from the project entirely.
Implement a single IndexedDB database named: `journalDB`
Use one object store: `entries`

Every entry must be stored as an object with the following properties:

- id (string)
- date (string)
- heading (string)
- text (string)
- imageBlob (Blob or null)
- imageAlt (string)

Implement the following async CRUD operations:

- dbGetAllEntries()
- dbAddEntry()
- dbUpdateEntry()
- dbDeleteEntry()
- dbDeleteAllEntries()

All module imports/exports must remain consistent across the project.

### B. Image Handling (IMPORTANT)

When the user uploads an image:

- Read it as a Blob
- Store the Blob directly in IndexedDB
- Do NOT read or store the filename (e.g., "C:\\fakepath\\")
- Do NOT rely on a project-level /images folder

When rendering the entry:

- Create a Blob URL using URL.createObjectURL(blob)
- Use this Blob URL as the image source

#### Very important:

In the current render-entry.js, the image path is hardcoded as:

"data-src": `images/${entry.image}`,

This must be removed entirely.

After migration, the user should be able to select an image from anywhere on the local machine, and the stored Blob must be used instead of a file path.

The “Delete image” feature must:

- Remove the stored Blob
- Update the entry in IndexedDB
- Update the UI
- Continue to work with lazy-loading

### C. UI + Modules Integration

Integrate the new IndexedDB functions into:

- entry-form.js
- entry-display.js
- entry-display-helpers/\*

Ensure all existing behaviour continues to work:

- Create entry
- Display entry
- Edit heading
- Edit text
- Delete image
- Delete a journal entry
- Delete all entries (using the existing confirmation popup)
- Lazy loading
- Focus handling
- Hidden/show classes
- WCAG logic

No HTML changes are required except for the JSON export button already created (see `index.html`).

### D. Export to JSON

I already have this button in my HTML:

```html
<button
  id="export-entries"
  class="export-entries"
  disabled
>
  Export entries to JSON
</button>
```

Please use this exact button. Please note that this button is disabled by default. Please implement logic that:

- Removes 'disabled' attribute if number of stored entries is greater than zero.
- Sets 'disabled' attribute if all entries are deleted.

#### Existing JavaScript related to exporting JSON:

- `export-entries-to-json.js`
- `export-entries-button.js`.

#### Exporting to JSON logic

Implement export logic that:

-Fetches all entries from IndexedDB
-Converts image Blob → base64
-Wraps everything into a JSON structure
-Downloads a file called e.g. `JOURNAL_2025-entries-2025-11-14_07-22-29.json`

### E. Deliverables + Workflow

-Complete the migration in controlled, stable batches, not mixing steps.
-For each batch, produce full updated files, not fragments.
-Avoid introducing missing imports, missing exports, or inconsistent naming.
-After migration, perform a final cleanup pass to ensure everything works.

#### Files I will upload in the new thread

-index.html
-index.js
-All JavaScript modules under /js-modules/journal/
-The observer files
-CSS only if necessary (on request from ChatGPT)

**End of Checklist**

---

## Project Folder Structure

(Excluding non-essential files)

```
index.html
index.js
js-modules/
    └── journal/
        └── entry-display-helpers/
            ├── delete-all.js
            ├── delete-entry.js
            ├── edit-entry.js
            ├── index.js
            ├── remove-image.js
            ├── render-entry.js
            ├── sanitise-and-format-text.js
            ├── toggle-content-editable.js
            ├── toggle-edit-button.js
        └── entry-form-helpers/
            ├── alt-text.js
            ├── character-counter.js
            ├── enable-required-fields.js
            ├── form-reset.js
            ├── index.js
            └── placeholders.js
        ├── entry-display.js
        ├── entry-form.js
        ├── export-entries-button.js
        ├── export-entries-to-json.js
        ├── storage.js
    └── observers/
        ├── lazy-load-intersection-observer.js
```

I propose pasting the files in the order listed above. After each upload please respond with 'Next file' until uploads are complete.

Please do not start generating code until I ask you to! Rather, please carefully read the contents of each file and get back to me
with any outstanding questions.
