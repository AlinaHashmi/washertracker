const auth0Client = new auth0.WebAuth({
    domain: "dev-hc6bsm76czyfw4zn.us.auth0.com",
    clientID: "0Hs6arU9txjQUYMwenzk0wCREWa11xDi",
    redirectUri: window.location.href,
    responseType: "token id_token",
    scope: "openid profile email"
});

// Function to check authentication
function checkAuth() {
    const token = localStorage.getItem("auth_token");
    return token !== null;  // User is authenticated if token exists
}

// Function to log in the user
function login() {
    auth0Client.authorize();
}

// Function to handle authentication callback
function handleAuthCallback() {
    auth0Client.parseHash((err, authResult) => {
        if (authResult && authResult.idToken) {
            localStorage.setItem("auth_token", authResult.idToken);
            localStorage.setItem("user_email", authResult.idTokenPayload.email);
        } else if (err) {
            console.error("Authentication error:", err);
        }
    });
}

// Function to check auth before allowing dorm selection
function requireAuth(event) {
    if (!checkAuth()) {
        event.preventDefault(); // Stop the link from opening
        alert("Please log in first!");
        login(); // Redirect to login page
    }
}

// Attach event listeners to dorm buttons
document.addEventListener("DOMContentLoaded", () => {
    handleAuthCallback(); // Handle authentication response
    document.querySelectorAll(".dorm_button").forEach(button => {
        button.addEventListener("click", requireAuth);
    });
});


