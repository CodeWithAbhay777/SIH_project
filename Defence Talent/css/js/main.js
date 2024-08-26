document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let userType = document.getElementById('userType').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    // Placeholder for actual authentication logic
    alert(`Logging in as ${userType} with email: ${email}`);
});

document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let userType = document.getElementById('userType').value;
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    // Placeholder for actual sign-up logic
    alert(`Signing up as ${userType} with name: ${name} and email: ${email}`);
});
