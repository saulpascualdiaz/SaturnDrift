# Saturn Drift Gallery Filter - Installation Guide

## Overview
This system adds **location** and **year** filtering to your gallery while keeping the 3-image groups intact.

## Files Created

1. **saturn-drift-gallery-filter.php** - The main plugin file
2. **gallery-filter.js** - The filtering logic
3. **gallery-filter.css** - The filter UI styling
4. **gallery-groups-metadata.json** - Your image groups metadata

---

## Installation Steps

### Step 1: Upload Files via Hostinger File Manager

1. Go to **Hostinger hPanel** → **Websites** → **Tools** → **File Manager**
2. Navigate to `public_html/wp-content/plugins/`
3. Create a **new folder** called `saturn-drift-gallery-filter`
4. Upload these 4 files into that folder:
   - `saturn-drift-gallery-filter.php`
   - `gallery-filter.js`
   - `gallery-filter.css`
   - `gallery-groups-metadata.json`

The folder structure should look like:
```
public_html/
└── wp-content/
    └── plugins/
        └── saturn-drift-gallery-filter/
            ├── saturn-drift-gallery-filter.php
            ├── gallery-filter.js
            ├── gallery-filter.css
            └── gallery-groups-metadata.json
```

### Step 2: Activate the Plugin

1. Go to your **WordPress Admin Dashboard** (saturndrift.com/wp-admin)
2. Go to **Plugins** in the left menu
3. Find **"Saturn Drift Gallery Filter"**
4. Click **"Activate"**

### Step 3: Test It

1. Visit **saturndrift.com/gallery**
2. You should see a filter row above the gallery with **"place"** and **"year"** buttons
3. Click on a location or year to filter

---

## How It Works

### The Metadata Structure

Each group of 3 images has this data:
```json
{
  "id": "group-1",
  "title": "cocytus / continuum / caldera",
  "date": "2026-02",
  "year": "2026",
  "location": "hokkaido",
  "country": "jp",
  "images": [...]
}
```

### What Each Field Means

- **id**: Unique identifier for the group (group-1, group-2, etc.)
- **location**: Where the photos were taken (used for filtering)
- **year**: When they were taken (used for filtering)
- **date**: More specific date (YYYY-MM)
- **country**: Country code (jp, kr, etc.)
- **images**: Array of the 3 images in this group

---

## Editing Metadata

To add or update metadata for your groups, edit the `gallery-groups-metadata.json` file.

### Example: Adding a True Group

Open the JSON file and update it like this:

```json
{
  "id": "group-1",
  "title": "hokkaido winter",
  "date": "2026-02",
  "year": "2026",
  "location": "hokkaido",
  "country": "jp",
  "images": [
    {
      "title": "cocytus",
      "location": "登別"
    },
    {
      "title": "continuum",
      "location": "洞爺湖"
    },
    {
      "title": "caldera",
      "location": "洞爺湖"
    }
  ]
}
```

**To update:**
1. Go to **File Manager**
2. Navigate to `plugins/saturn-drift-gallery-filter/`
3. Right-click `gallery-groups-metadata.json`
4. Click **"Edit"**
5. Update the location, year, and titles
6. **Save**

---

## Customization

### Change Filter Button Colors

Edit `gallery-filter.css` and modify these colors:

```css
.filter-btn.active {
    background-color: #a389d4;  /* Change this color */
    color: #ffffff;
    border-color: #a389d4;
}
```

### Change Filter Position

The filter appears at the top of the gallery page. To move it, edit `saturn-drift-gallery-filter.php` and change:
```php
add_action('wp_footer', array($this, 'inject_filter_ui'));
```

---

## Troubleshooting

### Filters don't appear
- **Check:** Is the plugin activated? (WordPress Admin → Plugins)
- **Check:** Are you on the gallery page? (The filter only appears on `/gallery`)

### Filters don't work
- **Check:** Is `gallery-groups-metadata.json` in the same folder as the PHP file?
- **Check:** Is the JSON file valid? (No syntax errors)
- **Browser console:** Open DevTools (F12) and check for errors

### Style doesn't match
- The CSS is minimal on purpose. You can edit `gallery-filter.css` to match your design better.

---

## Next Steps (After Testing)

1. **Update all 9 groups** with correct metadata
2. **Add more fields** to metadata if needed (mood, season, color tags, etc.)
3. **Expand filtering** to include those new fields

---

## Questions?

This is a learning project! Feel free to modify the files and experiment. All the code is vanilla HTML/CSS/JS—no heavy frameworks.

Happy filtering! 📷
