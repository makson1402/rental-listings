// Registration page: creates a USER or LANDLORD account.

const registerForm = document.getElementById('register-form');
const messageBox = document.getElementById('message');

registerForm.addEventListener('submit', async event => {
    event.preventDefault();

    const newUser = {
        firstName: registerForm.elements.firstName.value.trim(),
        lastName: registerForm.elements.lastName.value.trim(),
        email: registerForm.elements.email.value.trim(),
        phone: registerForm.elements.phone.value.trim(),
        password: registerForm.elements.password.value,
        role: registerForm.elements.role.value
    };

    try {
        const createdUser = await apiRequest('/users', {
            method: 'POST',
            body: JSON.stringify(newUser)
        });
        registerForm.reset();
        showMessage(messageBox, `Account created for ${createdUser.email} (${createdUser.role}).`, 'success');
    } catch (error) {
        showMessage(messageBox, error.message, 'error');
    }
});