document.addEventListener('DOMContentLoaded', function() {
    // Get metadata from injected JSON
    const metadataScript = document.getElementById('saturn-drift-metadata');
    if (!metadataScript) {
        console.log('[Saturn Drift Filter] No metadata found');
        return;
    }
    
    const metadata = JSON.parse(metadataScript.textContent);
    console.log('[Saturn Drift Filter] Metadata loaded:', metadata);
    
    // Wait for Elementor to finish rendering
    setTimeout(function() {
        initializeFilters(metadata);
    }, 500);
});

function initializeFilters(metadata) {
    // Get the gallery container
    const gallery = document.querySelector('.elementor-widget-image-gallery .gallery, .gallery');
    if (!gallery) {
        console.log('[Saturn Drift Filter] Gallery not found');
        return;
    }
    
    console.log('[Saturn Drift Filter] Gallery found');
    
    // Get all gallery items
    const galleryItems = Array.from(gallery.querySelectorAll('li, .gallery-item'));
    if (galleryItems.length === 0) {
        console.log('[Saturn Drift Filter] No gallery items found');
        return;
    }
    
    console.log('[Saturn Drift Filter] Found ' + galleryItems.length + ' gallery items');
    
    // Create filter UI
    const filterUI = createFilterUI(metadata);
    gallery.parentElement.insertBefore(filterUI, gallery);
    
    // Tag each gallery item with metadata
    tagGalleryItems(galleryItems, metadata);
    
    // Set up filter button listeners
    const filterBtns = document.querySelectorAll('#saturn-drift-filters .filter-btn');
    let activeLocation = 'all';
    let activeYear = 'all';
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            const group = this.closest('.filter-group');
            const isLocation = group.querySelector('.filter-label').textContent.includes('place');
            
            // Update active state
            group.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update filter state
            if (isLocation) {
                activeLocation = filter;
            } else {
                activeYear = filter;
            }
            
            // Apply filters
            applyFilters(galleryItems, activeLocation, activeYear);
        });
    });
    
    // Initial state - show all
    applyFilters(galleryItems, 'all', 'all');
}

function createFilterUI(metadata) {
    const locations = {};
    const yearsSet = new Set();
    
    // Build unique locations (only one button per location key)
    metadata.groups.forEach(group => {
        if (!locations[group.location]) {
            locations[group.location] = group.locationDisplay || group.location;
        }
        yearsSet.add(group.year);
    });
    
    const years = Array.from(yearsSet).sort();
    
    const container = document.createElement('div');
    container.id = 'saturn-drift-filters';
    container.className = 'gallery-filters';
    
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filters-container';
    
    // Location filter group
    const locGroup = document.createElement('div');
    locGroup.className = 'filter-group';
    locGroup.innerHTML = '<span class="filter-label">place:</span>';
    
    const allBtn = document.createElement('button');
    allBtn.className = 'filter-btn active';
    allBtn.setAttribute('data-filter', 'all');
    allBtn.textContent = 'all';
    locGroup.appendChild(allBtn);
    
    Object.entries(locations).forEach(([key, display]) => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.setAttribute('data-filter', key);
        btn.textContent = display;
        locGroup.appendChild(btn);
    });
    
    // Year filter group
    const yearGroup = document.createElement('div');
    yearGroup.className = 'filter-group';
    yearGroup.innerHTML = '<span class="filter-label">year:</span>';
    
    const allYearBtn = document.createElement('button');
    allYearBtn.className = 'filter-btn active';
    allYearBtn.setAttribute('data-filter', 'all');
    allYearBtn.textContent = 'all';
    yearGroup.appendChild(allYearBtn);
    
    years.forEach(year => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.setAttribute('data-filter', year);
        btn.textContent = year;
        yearGroup.appendChild(btn);
    });
    
    filterContainer.appendChild(locGroup);
    filterContainer.appendChild(yearGroup);
    container.appendChild(filterContainer);
    
    return container;
}

function tagGalleryItems(items, metadata) {
    items.forEach((item, index) => {
        const groupIndex = Math.floor(index / 3);
        if (groupIndex < metadata.groups.length) {
            const group = metadata.groups[groupIndex];
            item.setAttribute('data-location', group.location);
            item.setAttribute('data-year', group.year);
        }
    });
}

function applyFilters(items, location, year) {
    items.forEach(item => {
        const itemLoc = item.getAttribute('data-location');
        const itemYear = item.getAttribute('data-year');
        
        const locMatch = location === 'all' || itemLoc === location;
        const yearMatch = year === 'all' || itemYear === year;
        
        if (locMatch && yearMatch) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}
