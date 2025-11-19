# Journal (2025)

(In progress ...)

This app is a private journal that runs entirely on your device, either via a local server or a remote host. All your entries are stored locally in your browser, so only you can access them.

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

**Note:** Deletion is permanent. Use caution.

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
