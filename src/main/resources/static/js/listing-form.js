// Listing form: creates a new listing, or edits an existing one (?id=...) and manages its photos.

const listingId = getQueryParam('id');
const isEditMode = listingId !== null;

const form = document.getElementById('listing-form');
const formTitle = document.getElementById('form-title');
const ownerField = document.getElementById('owner-field');
const ownerSelect = document.getElementById('owner');
const messageBox = document.getElementById('message');
const photosSection = document.getElementById('photos-section');
const photoList = document.getElementById('photo-list');
const photoForm = document.getElementById('photo-form');
const photoUrlInput = document.getElementById('photo-url');

async function init() {
    try {
        if (isEditMode) {
            await setUpEditMode();
        } else {
            await loadLandlords();
        }
    } catch (error) {
        showMessage(messageBox, error.message, 'error');
    }
}

async function setUpEditMode() {
    formTitle.textContent = 'Edit listing';
    ownerField.hidden = true;
    ownerSelect.required = false; // the owner cannot be changed
    photosSection.hidden = false;

    fillForm(await apiRequest(`/listings/${listingId}`));
    await loadPhotos();

    if (getQueryParam('created')) {
        showMessage(messageBox, 'Listing created. You can now add photos below.', 'success');
    }
}

/** Fills the landlord dropdown. Temporary until login is added. */
async function loadLandlords() {
    const landlords = await apiRequest('/users?role=LANDLORD');
    if (landlords.length === 0) {
        showMessage(messageBox, 'There are no landlords yet. Register a landlord account first.', 'error');
        return;
    }
    ownerSelect.innerHTML = landlords
        .map(landlord => `<option value="${landlord.id}">
            ${escapeHtml(landlord.firstName)} ${escapeHtml(landlord.lastName)} (${escapeHtml(landlord.email)})
        </option>`)
        .join('');
}

function fillForm(listing) {
    form.elements.city.value = listing.city;
    form.elements.address.value = listing.address;
    form.elements.rooms.value = listing.rooms;
    form.elements.area.value = listing.area;
    form.elements.price.value = listing.price;
    form.elements.parking.checked = listing.parking;
    form.elements.description.value = listing.description ?? '';
}

function readForm() {
    return {
        city: form.elements.city.value.trim(),
        address: form.elements.address.value.trim(),
        rooms: Number(form.elements.rooms.value),
        area: Number(form.elements.area.value),
        price: Number(form.elements.price.value),
        parking: form.elements.parking.checked,
        description: form.elements.description.value.trim()
    };
}

form.addEventListener('submit', async event => {
    event.preventDefault();
    try {
        if (isEditMode) {
            await apiRequest(`/listings/${listingId}`, {
                method: 'PUT',
                body: JSON.stringify(readForm())
            });
            showMessage(messageBox, 'Changes saved.', 'success');
        } else {
            const createdListing = await apiRequest(`/listings?ownerId=${ownerSelect.value}`, {
                method: 'POST',
                body: JSON.stringify(readForm())
            });
            // Continue on the edit page, where photos can be added
            window.location.href = `listing-form.html?id=${createdListing.id}&created=1`;
        }
    } catch (error) {
        showMessage(messageBox, error.message, 'error');
    }
});

// Photos

async function loadPhotos() {
    const photos = await apiRequest(`/listings/${listingId}/photos`);
    if (photos.length === 0) {
        photoList.innerHTML = '<p class="empty">No photos yet.</p>';
        return;
    }
    photoList.innerHTML = photos
        .map(photo => `
            <div class="photo-item">
                <img src="${escapeHtml(photo.url)}" alt="Apartment photo">
                <button type="button" class="button danger small" data-photo-id="${photo.id}">Remove</button>
            </div>`)
        .join('');
}

photoForm.addEventListener('submit', async event => {
    event.preventDefault();
    try {
        await apiRequest(`/listings/${listingId}/photos`, {
            method: 'POST',
            body: JSON.stringify({ url: photoUrlInput.value.trim() })
        });
        photoUrlInput.value = '';
        await loadPhotos();
    } catch (error) {
        showMessage(messageBox, error.message, 'error');
    }
});

// One listener for all "Remove" buttons, including ones added later
photoList.addEventListener('click', async event => {
    const photoId = event.target.dataset.photoId;
    if (!photoId) {
        return;
    }
    try {
        await apiRequest(`/listings/${listingId}/photos/${photoId}`, { method: 'DELETE' });
        await loadPhotos();
    } catch (error) {
        showMessage(messageBox, error.message, 'error');
    }
});

init();