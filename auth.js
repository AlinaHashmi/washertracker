const auth0Client = new auth0.WebAuth({
    domain: "dev-hc6bsm76czyfw4zn.us.auth0.com",
    clientID: "0Hs6arU9txjQUYMwenzk0wCREWa11xDi",
    redirectUri: window.location.href,
    responseType: "token id_token",
    scope: "openid profile email"
});

function checkAuth() {
    const token = localStorage.getItem("auth_token");
    return token !== null;  
}


function login() {
    auth0Client.authorize();
}

function handleAuthCallback() {
    auth0Client.parseHash((err, authResult) => {
        if (authResult && authResult.idToken) {
            const email = authResult.idTokenPayload.email;
            if (email && email.endsWith("uga.edu")) {
                localStorage.setItem("auth_token", authResult.idToken);
                localStorage.setItem("user_email", email);
            } else {
                console.error("Unauthorized: Email must be from the uga.edu domain.");
                alert("Access restricted to UGA email addresses.");
            }
        } else if (err) {
            console.error("Authentication error:", err);
        }
    });
}

function requireAuth(event) {
    if (!checkAuth()) {
        event.preventDefault(); 
        alert("Please log with a valid UGA account");
        login(); 
    }
}

document.addEventListener("DOMContentLoaded", () => {
    handleAuthCallback(); // Handle authentication response
    document.querySelectorAll(".dorm_button").forEach(button => {
        button.addEventListener("click", requireAuth);
    });
});


