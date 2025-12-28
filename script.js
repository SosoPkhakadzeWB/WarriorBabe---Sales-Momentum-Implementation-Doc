// WarriorBabe Sales Momentum Documentation - Main JavaScript

// DOM Elements
const searchBox = document.getElementById('searchBox');
const filterPills = document.querySelectorAll('.pill');
const sections = document.querySelectorAll('.section');
const noResults = document.getElementById('noResults');
const modal = document.getElementById('detailModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.querySelector('.modal-close');

// State
let activeFilter = 'all';
let searchTerm = '';

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    renderAllSections();
    setupEventListeners();
});

// Render all sections with data
function renderAllSections() {
    renderWorkflows();
    renderContactProperties();
    renderCallProperties();
    renderSpeedToLeadProperties();
    renderCustomObjects();
    renderPipelines();
    renderStaticLists();
    renderActiveLists();
    renderSmartViews();
    renderDashboards();
}

// Render Workflows
function renderWorkflows() {
    const grid = document.getElementById('workflows-grid');
    grid.innerHTML = documentationData.workflows.map(wf => createCard(wf, 'workflow')).join('');
}

// Render Contact Properties
function renderContactProperties() {
    const grid = document.getElementById('properties-grid');
    grid.innerHTML = documentationData.contactProperties.map(prop => createCard(prop, 'property')).join('');
}

// Render Call Properties
function renderCallProperties() {
    const grid = document.getElementById('call-properties-grid');
    grid.innerHTML = documentationData.callProperties.map(prop => createCard(prop, 'call-property')).join('');
}

// Render Speed to Lead Properties
function renderSpeedToLeadProperties() {
    const grid = document.getElementById('speed-to-lead-properties-grid');
    grid.innerHTML = documentationData.speedToLeadProperties.map(prop => createCard(prop, 'stl-property')).join('');
}

// Render Custom Objects
function renderCustomObjects() {
    const grid = document.getElementById('objects-grid');
    grid.innerHTML = documentationData.customObjects.map(obj => createCard(obj, 'object')).join('');
}

// Render Pipelines
function renderPipelines() {
    const grid = document.getElementById('pipelines-grid');
    grid.innerHTML = documentationData.pipelines.map(pipe => createCard(pipe, 'pipeline')).join('');
}

// Render Static Lists
function renderStaticLists() {
    const grid = document.getElementById('static-lists-grid');
    grid.innerHTML = documentationData.staticLists.map(list => createCard(list, 'list')).join('');
}

// Render Active Lists
function renderActiveLists() {
    const grid = document.getElementById('active-lists-grid');
    grid.innerHTML = documentationData.activeLists.map(list => createCard(list, 'list')).join('');
}

// Render Smart Views
function renderSmartViews() {
    const grid = document.getElementById('smart-views-grid');
    grid.innerHTML = documentationData.smartViews.map(view => createCard(view, 'view')).join('');
}

// Render Dashboards
function renderDashboards() {
    const grid = document.getElementById('dashboards-grid');
    grid.innerHTML = documentationData.dashboards.map(dash => createCard(dash, 'dashboard')).join('');
}

// Create card HTML
function createCard(item, type) {
    const statusBadge = getStatusBadge(item);
    const tags = getTags(item, type);
    
    return `
        <div class="card" data-type="${type}" data-id="${item.id}" onclick="showDetails('${item.id}', '${type}')">
            <div class="card-header">
                <div class="card-title">${item.name}</div>
                ${statusBadge}
            </div>
            <div class="card-meta">
                ${getMetaInfo(item, type)}
            </div>
            <div class="card-description">
                ${item.description || item.purpose}
            </div>
            ${tags}
        </div>
    `;
}

// Get status badge
function getStatusBadge(item) {
    if (item.status === 'on') {
        return '<span class="status-badge status-on">● ACTIVE</span>';
    } else if (item.status === 'off') {
        return '<span class="status-badge status-off">○ INACTIVE</span>';
    } else if (item.status === 'planned') {
        return '<span class="status-badge status-off">⏳ PLANNED</span>';
    } else if (item.type === 'Static') {
        return '<span class="status-badge status-static">📌 STATIC</span>';
    } else if (item.type === 'Active') {
        return '<span class="status-badge status-active">⚡ ACTIVE</span>';
    } else if (item.type === 'Smart View') {
        return '<span class="status-badge status-active">🎯 SMART VIEW</span>';
    }
    return '';
}

// Get meta information
function getMetaInfo(item, type) {
    let meta = [];
    
    if (item.objectType) {
        meta.push(`<div class="meta-item"><span class="meta-label">Object:</span> ${item.objectType}</div>`);
    }
    
    if (item.fieldType) {
        meta.push(`<div class="meta-item"><span class="meta-label">Type:</span> ${item.fieldType}</div>`);
    }
    
    if (item.group) {
        meta.push(`<div class="meta-item"><span class="meta-label">Group:</span> ${item.group}</div>`);
    }
    
    if (item.link) {
        meta.push(`<div class="meta-item"><span class="meta-label">🔗</span> <a href="${item.link}" target="_blank" onclick="event.stopPropagation()" style="color: #2563eb; text-decoration: underline;">Open in HubSpot</a></div>`);
    }
    
    if (item.count !== undefined) {
        const countDisplay = typeof item.count === 'number' ? item.count.toLocaleString() : item.count;
        meta.push(`<div class="meta-item"><span class="meta-label">Count:</span> ${countDisplay}</div>`);
    }
    
    return meta.join('');
}

// Get tags
function getTags(item, type) {
    if (!item.tags || item.tags.length === 0) return '';
    
    const tagHTML = item.tags.map(tag => `<span class="tag ${tag}">${tag}</span>`).join('');
    return `<div class="tags">${tagHTML}</div>`;
}

// Show details modal
function showDetails(id, type) {
    let item;
    
    switch(type) {
        case 'workflow':
            item = documentationData.workflows.find(w => w.id === id);
            break;
        case 'property':
            item = documentationData.contactProperties.find(p => p.id === id);
            break;
        case 'call-property':
            item = documentationData.callProperties.find(p => p.id === id);
            break;
        case 'stl-property':
            item = documentationData.speedToLeadProperties.find(p => p.id === id);
            break;
        case 'object':
            item = documentationData.customObjects.find(o => o.id === id);
            break;
        case 'pipeline':
            item = documentationData.pipelines.find(p => p.id === id);
            break;
        case 'list':
            item = [...documentationData.staticLists, ...documentationData.activeLists].find(l => l.id === id);
            break;
        case 'view':
            item = documentationData.smartViews.find(v => v.id === id);
            break;
        case 'dashboard':
            item = documentationData.dashboards.find(d => d.id === id);
            break;
    }
    
    if (!item) return;
    
    modalBody.innerHTML = createDetailView(item, type);
    modal.classList.add('show');
}

// Create detailed view
function createDetailView(item, type) {
    let html = `
        <h2>${item.name}</h2>
        ${getStatusBadge(item)}
        <div class="card-details" style="margin-top: 20px;">
    `;
    
    // Add all relevant details
    Object.keys(item).forEach(key => {
        if (['id', 'name', 'status', 'tags'].includes(key)) return;
        
        const value = item[key];
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            html += `<div class="detail-row">
                <span class="detail-label">${formatLabel(key)}:</span>
                <span class="detail-value">${formatObjectValue(value)}</span>
            </div>`;
        } else if (Array.isArray(value)) {
            html += `<div class="detail-row">
                <span class="detail-label">${formatLabel(key)}:</span>
                <span class="detail-value">${formatArrayValue(value)}</span>
            </div>`;
        } else if (value) {
            html += `<div class="detail-row">
                <span class="detail-label">${formatLabel(key)}:</span>
                <span class="detail-value">${value}</span>
            </div>`;
        }
    });
    
    html += `</div>`;
    
    if (item.tags && item.tags.length > 0) {
        html += `<div class="tags" style="margin-top: 20px;">
            ${item.tags.map(tag => `<span class="tag ${tag}">${tag}</span>`).join('')}
        </div>`;
    }
    
    return html;
}

// Format label
function formatLabel(key) {
    return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/_/g, ' ')
        .replace(/^./, str => str.toUpperCase())
        .trim();
}

// Format object value
function formatObjectValue(obj) {
    return Object.entries(obj)
        .map(([k, v]) => `<strong>${formatLabel(k)}:</strong> ${v}`)
        .join('<br>');
}

// Format array value
function formatArrayValue(arr) {
    return arr.map(item => {
        if (typeof item === 'object') {
            return formatObjectValue(item);
        }
        return `• ${item}`;
    }).join('<br>');
}

// Setup event listeners
function setupEventListeners() {
    // Search
    searchBox.addEventListener('input', (e) => {
        searchTerm = e.target.value.toLowerCase();
        filterContent();
    });
    
    // Filter pills
    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            activeFilter = pill.dataset.filter;
            filterContent();
        });
    });
    
    // Modal close
    modalClose.addEventListener('click', () => {
        modal.classList.remove('show');
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
}

// Filter content
function filterContent() {
    let visibleCount = 0;
    
    sections.forEach(section => {
        const category = section.dataset.category;
        const cards = section.querySelectorAll('.card');
        let sectionVisible = false;
        
        cards.forEach(card => {
            const cardType = card.dataset.type;
            const cardText = card.textContent.toLowerCase();
            
            // Check filter match
            let matchesFilter = activeFilter === 'all' || 
                              category === activeFilter ||
                              cardType === activeFilter;
            
            // Check search match
            let matchesSearch = searchTerm === '' || cardText.includes(searchTerm);
            
            if (matchesFilter && matchesSearch) {
                card.style.display = 'block';
                sectionVisible = true;
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show/hide section
        if (sectionVisible) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
    
    // Show/hide no results
    if (visibleCount === 0) {
        noResults.classList.add('show');
    } else {
        noResults.classList.remove('show');
    }
}

// Export for global access
window.showDetails = showDetails;