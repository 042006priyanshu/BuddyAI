 const loginForm = document.querySelector('.form-box.login');
const registerForm = document.querySelector('.form-box.register');
const registerLink = document.querySelector('.register-link');
const loginLink = document.querySelector('.login-link');

registerLink.addEventListener('click', (e) => {
  e.preventDefault();
  loginForm.classList.remove('active');
  registerForm.classList.add('active');
});

loginLink.addEventListener('click', (e) => {
  e.preventDefault();
  registerForm.classList.remove('active');
  loginForm.classList.add('active');
});

// ✅ Login Button Function
const loginBtn = document.getElementById('login-btn');
loginBtn.addEventListener('click', loginUser);

function loginUser(event) {
  event.preventDefault(); // not needed but safe
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (email === "buddy" && password === "buddy") {
    window.location.href = "index1.html";
  } else {
    alert("Invalid email or password");
  }
}

  // Handle Register Button
  const registerBtn = document.getElementById("register-btn");
  registerBtn.addEventListener("click", registerUser);

  function registerUser() {
    const username = document.getElementById("reg-username").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("reg-password").value.trim();

    if (!username || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    // Optional: email format check
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Optional: Save or process data here
    alert("Registered successfully!");

    // Redirect to home or login
    window.location.href = "index.html";
  }

