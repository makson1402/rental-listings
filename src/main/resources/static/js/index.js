// Listings page: shows all listings and filters them by city.

const filterForm = document.getElementById('filter-form');
const cityInput = document.getElementById('city');
const clearFilterButton = document.getElementById('clear-filter');
const listingsContainer = document.getElementById('listings');
const messageBox = document.getElementById('message');

filterForm.addEventListener('submit', event => {
    event.preventDefault();
    loadListings(cityInput.value.trim());
});

clearFilterButton.addEventListener('click', () => {
    cityInput.value = '';
    loadListings('');
});

async function loadListings(city) {
    const query = city ? `?city=${encodeURIComponent(city)}` : '';
    try {
        const listings = await apiRequest(`/listings${query}`);
        await renderListings(listings);
        messageBox.hidden = true;
    } catch (error) {
        showMessage(messageBox, error.message, 'error');
    }
}

async function renderListings(listings) {
    if (listings.length === 0) {
        listingsContainer.innerHTML = '<p class="empty">No listings found.</p>';
        return;
    }
    const cards = await Promise.all(listings.map(createListingCard));
    listingsContainer.innerHTML = cards.join('');
}

/** Builds the HTML of one listing card, using the first photo as the cover. */
async function createListingCard(listing) {
    const photos = await apiRequest(`/listings/${listing.id}/photos`);
    const cover = photos.length > 0
        ? `<img src="${escapeHtml(photos[0].url)}" alt="Apartment photo">`
        : '<div class="no-photo">No photo</div>';

    return `
        <a class="card" href="listing.html?id=${listing.id}">
            ${cover}
            <div class="card-body">
                <p class="price">${listing.price} PLN / month</p>
                <h3>${escapeHtml(listing.city)}, ${escapeHtml(listing.address)}</h3>
                <p class="details">
                    ${listing.rooms} rooms · ${listing.area} m²${listing.parking ? ' · parking' : ''}
                </p>
            </div>
        </a>`;
}

loadListings('');