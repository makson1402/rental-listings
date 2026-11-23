// Listing details page: shows one listing, its photos and the landlord's contact details.

const listingId = getQueryParam('id');

const detailsContainer = document.getElementById('listing-details');
const actions = document.getElementById('listing-actions');
const editLink = document.getElementById('edit-link');
const deleteButton = document.getElementById('delete-button');
const messageBox = document.getElementById('message');

async function loadListing() {
    if (!listingId) {
        showMessage(messageBox, 'No listing selected.', 'error');
        return;
    }
    try {
        const [listing, photos] = await Promise.all([
            apiRequest(`/listings/${listingId}`),
            apiRequest(`/listings/${listingId}/photos`)
        ]);
        renderListing(listing, photos);
    } catch (error) {
        showMessage(messageBox, error.message, 'error');
    }
}

function renderListing(listing, photos) {
    const owner = listing.owner;
    document.title = `${listing.city}, ${listing.address} – Rental Listings`;

    const gallery = photos.length > 0
        ? photos.map(photo => `<img src="${escapeHtml(photo.url)}" alt="Apartment photo">`).join('')
        : '<div class="no-photo">No photos yet</div>';

    detailsContainer.innerHTML = `
        <h1>${escapeHtml(listing.city)}, ${escapeHtml(listing.address)}</h1>
        <p class="price large">${listing.price} PLN / month</p>
        <div class="gallery">${gallery}</div>

        <div class="details-layout">
            <section class="panel">
                <h2>Details</h2>
                <ul class="facts">
                    <li><span>Rooms</span>${listing.rooms}</li>
                    <li><span>Area</span>${listing.area} m²</li>
                    <li><span>Parking</span>${listing.parking ? 'Yes' : 'No'}</li>
                </ul>
                <p class="description">${escapeHtml(listing.description)}</p>
            </section>

            <aside class="panel">
                <h2>Contact the landlord</h2>
                <p><strong>${escapeHtml(owner.firstName)} ${escapeHtml(owner.lastName)}</strong></p>
                <p>Phone: <a href="tel:${escapeHtml(owner.phone)}">${escapeHtml(owner.phone)}</a></p>
                <p>Email: <a href="mailto:${escapeHtml(owner.email)}">${escapeHtml(owner.email)}</a></p>
            </aside>
        </div>`;

    editLink.href = `listing-form.html?id=${listing.id}`;
    actions.hidden = false;
}

deleteButton.addEventListener('click', async () => {
    if (!confirm('Delete this listing? This cannot be undone.')) {
        return;
    }
    try {
        await apiRequest(`/listings/${listingId}`, { method: 'DELETE' });
        window.location.href = 'index.html';
    } catch (error) {
        showMessage(messageBox, error.message, 'error');
    }
});

loadListing();