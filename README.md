# Journal (2025)

<details>
  <summary><strong id="menu">Menu</strong></summary>

- [Description](#description)
- [Features](#features)
- [JavaScript](#javascript)
- [No JS](#no-js)
- [IndexedDB](#indexeddb)
- [Running the App from the Local File System]()
- [CSS](#css)
- [Accessibility](#accessibility)
- [Theme Toggling](#theme-toggling)
- [Testing and Compatibility](#testing-and-compatibility)
- [How to Run](#how-to-run)
- [Build & Deployment Setup for `/docs` Folder](#build--deployment-setup-for-docs-folder)

</details>

## Description

A private journal that runs entirely on your device, either via a local server or a remote host. All your entries are stored locally in your browser, so only you can access them.

[Journal (2025) Git Pages site](https://chrisnajman.github.io/journal-2025/)

> [!NOTE]
> This is an improved update of an [earlier journal project](https://github.com/chrisnajman/journal-with-local-storage).

[Back to menu](#menu)

---

## Features

- Create, edit, and delete journal entries locally in the browser
- Add titles, text, and optional images with descriptive alt text
- Lazy loading for images to improve performance
- Automatic preservation of line breaks in entry text
- Export all entries to a JSON backup file
- Fully accessible forms and interactive elements
- Light and dark theme toggling with local storage persistence
- Keyboard navigation and ARIA attributes for improved accessibility
- IndexedDB storage with graceful handling of storage quota limits
- Undo or cancel actions for entries and images before publishing

[Back to menu](#menu)

---

## How to Use

### Creating an Entry

Click the **Create Entry** button, then complete the following:

- **Add a title** (required)
- **Add an image** (optional)
  - Add a descriptive caption in the image description field (optional)
  - If you change your mind, click the **Remove image** button
- **Add text** (required)

#### Publishing an Entry

- Click the **Publish** button to save your entry.  
  Your entry will appear in the journal list immediately.

#### Cancelling an Entry

- Click the **Cancel** button to discard the current entry.  
  Any unsaved changes will be lost.

### Editing and Deleting Entries

#### Deleting Entries

> [!CAUTION]
> Deletion is permanent. Use caution.

##### Delete a Single Entry

- Click the **Delete entry** button on the entry you want to remove.
- A confirmation dialog will appear.
  - Click **OK** to confirm deletion
  - Click **Cancel** to abort deletion

##### Delete All Entries

- Click the **Delete all entries** button at the top of the page.
- A confirmation dialog will appear.
  - Click **OK** to delete all entries
  - Click **Cancel** to abort

##### Deleting the Image from an Entry

- Click **Delete image** within the entry editor.
- A confirmation dialog will appear.
  - Click **OK** to remove the image
  - Click **Cancel** to keep the image

#### Editing Entries

##### Editing the Title

- Click **Edit** on the entry.
- Update the title field.
- Click **Save** to apply changes.

##### Editing the Text

- Click **Edit** on the entry.
- Update the text field as desired.
- Click **Save** to apply changes.

### Text Formatting

#### Form Text Area

- Pressing **Enter** creates line breaks.
- Use line breaks to separate paragraphs or sections of your text.

#### Published Entry Text Area

- Line breaks made in the form are preserved when the entry is published.
- You can add additional line breaks when editing a published entry.

### A Note on Image Sizes

- You should aim to keep image sizes as small as possible to save on storage space.
- Very large images can be resized and optimised using free online software such as:
  - **[Photopea](https://www.photopea.com/)**, or
  - **[TinyPNG](https://tinypng.com/)** (excellent for image compression).
- Storage capacity in the browser is limited. For example, Chrome on Windows 11 allows roughly 140 MB for IndexedDB storage per origin.
- This means that if the images you upload are a couple of megabytes or more each, you could quickly approach the storage limit and may be unable to add more entries.
- For storage limits in other browsers, please consult their help or support sections.

### Where Entries Are Saved

- Entries are stored in **IndexedDB** on your device.
- To inspect stored data:
  1. Right-click on the page and select **Inspect**
  2. Go to **Application > Storage > IndexedDB > Journal > Entries**

#### Data Quota

If you exceed your browser’s storage quota:

- New entries may fail to save.
- You will see an alert notifying you that storage is full.
- Consider deleting older entries, removing large images, or exporting entries to JSON before continuing.

### Exporting Entries

- Click the **Export entries to JSON** button to download a `.json` backup of all your journal entries.
- This backup can be stored safely for your records.

### Limitations

- All entries are stored **locally on your machine**, so only you can access them.
- Text formatting is limited to **line breaks**.
- Bold, italic, or other formatting is not available.

### Data Security

All entries are saved locally in your browser's storage (IndexedDB), so only you can access them. Even when you use the app via a server, such as GitHub Pages, your data stays safely on your device and is never sent anywhere else.

[Back to menu](#menu)

---

## JavaScript

Built with **vanilla ES6 JavaScript**, focusing on modern syntax and browser APIs.

The JavaScript has been split into separate modules, improving code modularity:

- **index.js**: Initializes the app, sets up global modules (theme, sticky shadow, loader), and loads the journal form and display modules with existing entries from IndexedDB.
- **js-modules/**
  - **helpers/**
    - **sticky-shadow.js**: Adds a shadow to the header or footer when the page is scrolled.
    - **update-attributes.js**: Utility function to add, update, or remove multiple attributes on DOM elements.
  - **journal/**
    - **entry-display-helpers/**
      - **edit-entry.js**: Handles toggling contentEditable and button text when editing entry headings or text.
      - **index.js**: Exports all helper functions for entry display for easier imports.
      - **render-entry.js**: Renders a single journal entry in the list, including images and line breaks.
      - **sanitise-and-format-text.js**: Cleans pasted text and ensures Enter inserts `<br>` instead of divs.
      - **toggle-content-editable.js**: Toggles edit mode for text elements and updates the underlying data model.
      - **toggle-edit-button.js**: Switches button text between “Edit” and “Save” and updates its styling.
      - **update-delete-all-button.js**: Enables or disables the “Delete all entries” button based on the number of entries.
    - **entry-form-helpers/**
      - **alt-text.js**: Shows or hides the alt text input when adding an image.
      - **character-counter.js**: Updates the alt text character counter and warns when the limit is reached.
      - **enable-required-fields.js**: Sets required attributes on the entry form inputs.
      - **form-reset.js**: Resets form fields and counters after submission or cancellation.
      - **index.js**: Aggregates all entry form helper functions for easy import.
      - **placeholders.js**: Populates default placeholders and clears them on focus.
    - **export entries/**
      - **export-entries-button.js**: Manages the Export button’s state and triggers the JSON export process.
      - **export-entries-to-json.js**: Converts all entries (including images as base64) to a downloadable JSON file.
    - **storage/**
      - **handle-storage-error.js**: Handles errors from IndexedDB, including quota exceeded alerts.
      - **safe-db.js**: Wraps database operations in a try/catch with error handling.
      - **storage.js**: Provides functions to add, update, delete, and fetch entries from IndexedDB.
    - **entry-display.js**: Manages rendering the journal list, adding new entries, and handling click events (edit, delete, image removal).
    - **entry-form.js**: Manages the entry form UI, form submission, image upload, and integrates with storage and display modules.
  - **observers/**
    - **lazy-load-intersection-observer.js**: Uses Intersection Observer to lazy-load images as they come into view.
    - **page-header-resize-observer.js**: Observes the header size and updates `scroll-padding-top` for proper anchor/skip-link scrolling.
  - **loader.js**: Handles page load animations and loader display for long-running tasks like exporting entries.
  - **theme.js**: Manages theme toggling, applies the saved theme from localStorage, and ensures accessibility of the toggle button.

[Back to menu](#menu)

---

## No JS

- If JavaScript is disabled, a warning message is displayed and the entry form and all associated elements are hidden. Additionally, the loader animation and theme-toggler cease to function.
- The `no-js` class provides a simple fallback mechanism that lets you adjust styles and messages when JavaScript is unavailable.

[Back to menu](#menu)

---

## IndexedDB

For each project using **IndexedDB**:

- Make sure the database name is unique, e.g.

```javascript
// Journal project
const DB_NAME = "journal2025"

// To-Do list project
const DB_NAME = "toDoList"

// Photo gallery project
const DB_NAME = "photoGallery"
```

This will ensure that multiple projects hosted on **GitHub Pages** have separate data stores.

### Launching the project via **LiveServer** (VSCode)

A further step is required if your server is local. In the project root:

- Create a folder called `.vscode`. Inside this
- create a file called `settings.json`. Inside this, add the following code, e.g.

```json
{
  "liveServer.settings.port": 5501
}
```

- This will launch the project using port 5501.
- Use a **new port number** for each new project.

> [!NOTE]
> The default port for LiveServer is 5500. The safe range for custom ports is 5501–5999.

[Back to menu](#menu)

---

## Running the App from the Local File System

If you want to run the journal directly from your computer (without any servers or build tools), you only need the folder **journal-2025-local**.

To launch the app:

**1. Open your file browser**

- Windows: File Explorer
- macOS: Finder
- Linux: Files (Nautilus/Konqueror/etc.)

**2. Navigate into the `journal-2025-local` folder**

**3. Double-click `index.html`**

This opens the journal in your default web browser.  
No "Live Server", no terminal commands, no Node modules - it's completely standalone.

> [!NOTE]
> All entries are saved locally using **IndexedDB**, in a database named `journal2025local`.

> [!CAUTION]
> The full application logic is inside the minified file `journal-2025-local.js`.  
> Do **not** open this file in VSCode if you have auto-formatting enabled — VSCode will automatically unminify it and make the file much larger.  
> (There is no need to edit this file.)

[Back to menu](#menu)

---

## CSS

The CSS is split into modules and imported into `style.css`.

[Back to menu](#menu)

---

## Accessibility

- Fully operable via keyboard (tab navigation and Enter/Space interactions)
- Proper focus management with temporary visual highlighting for new entries
- All interactive elements have appropriate ARIA attributes (e.g., `role="status"`, `aria-live="polite"`, `aria-label`)
- Skip links and anchor targets scroll correctly even with a sticky header
- Form elements include required attributes and descriptive placeholders
- Loader messages are announced via ARIA live regions
- Confirmation dialogs for deletion actions ensure user awareness
- Image alt text is supported for images to maintain accessibility. (This is optional: if no text is supplied, and empty `alt` attribute is applied to the image.)

[Back to menu](#menu)

---

## Theme Toggling

The application includes a dark mode and light mode toggle:

- The current theme state is stored in **local storage** and applied automatically on page reload.
- Accessible buttons with appropriate ARIA attributes are used to improve usability.

> [!IMPORTANT]
> Remember to change `const LOCAL_STORAGE_PREFIX` in `js-modules/theme.js` to a unique identifier.

[Back to menu](#menu)

---

## Testing and Compatibility

The application has been tested on the following platforms and browsers:

- **Operating System**: Windows 11
- **Browsers**:
  - Google Chrome
  - Mozilla Firefox
  - Microsoft Edge

### Device View Testing

The layout and functionality have been verified in both browser and device simulation views to ensure responsiveness and usability.

[Back to menu](#menu)

---

## How to Run

1. Clone or download the repository to your local machine.
2. Open the project folder and start a simple HTTP server (e.g., using `Live Server` in VS Code or Python's `http.server` module).
3. Open the project in a modern browser (e.g., Chrome, Firefox, or Edge).

[Back to menu](#menu)

---

## Build & Deployment Setup for `/docs` Folder

If you want to deploy a minified version of this project to **GitHub Pages**, read on.

### 1. Install Required Packages

Run this once in your project root to install dev dependencies:

```bash
npm install
```

### 2. Run the full build process

> [!IMPORTANT]
> Any assets not described in `package.json` must be added. In the current project we don't have an `img` folder. If you create one and add images to it, you have to add this to `copy:assets`, e.g.

#### Current `package.json`

```
"copy:assets": "shx cp -r  site.webmanifest favicon.ico favicon-16x16.png favicon-32x32.png apple-touch-icon.png android-chrome-192x192.png android-chrome-512x512.png docs/",
```

#### Updated `package.json` with "img"

```
"copy:assets": "shx cp -r  img site.webmanifest favicon.ico favicon-16x16.png favicon-32x32.png apple-touch-icon.png android-chrome-192x192.png android-chrome-512x512.png docs/",
```

etc, etc.

Then in the terminal, run:

```bash
npm run build
```

### 3. Deploy to GitHub Pages

Once you've created a repository and pushed the files,

- go to `https://github.com/[your-name]/[your-project-name]/settings/pages`.
- Under "Build and deployment > Branch" make sure you set the branch to `main` and folder to `/docs`.
- Click "Save".

> [!NOTE]
> For a detailed description of the build process, configuration files and npm packages see my [GitHub Pages Optimised Build](https://github.com/chrisnajman/github-pages-optimised-build).

[Back to menu](#menu)
