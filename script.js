document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("registrationForm").onsubmit = function(event) {
        event.preventDefault();
        if (validateForm()) {
            if (validateOTP()) {
                alert('Registration Successful!');
            } else {
                alert("Invalid OTP.");
            }
        }
    };

    window.sendOTP = function sendOTP() {
        var email = document.getElementById("email").value;
        if (email.trim() === '') {
            alert("Please enter your email address.");
            return;
        }

        var otp = Math.floor(100000 + Math.random() * 900000);
        sessionStorage.setItem('otp', otp);

        var templateParams = {
            to_email: email,
            otp: otp
        };

        emailjs.send("service_qkytrfq", "template_nlqtv8h", templateParams)
            .then(function(response) {
                alert("OTP sent successfully to your email!");
                document.getElementById("otp-section").style.display = 'block'; // Show OTP input section
            }, function(error) {
                alert("Failed to send OTP.");
            });
    }

    function validateForm() {
        var firstname = document.getElementById("firstname").value;
        var lastname = document.getElementById("lastname").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
        var gender = document.getElementById("gender").value;
        var dob = document.getElementById("dob").value;
        var address = document.getElementById("address").value;
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^(?!123|234|345|456|567|678|789)\d{10}$/;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const namePattern = /^[A-Za-z]+$/;  

        if (!firstname || !lastname || !email || !phone || !gender || !dob || !address || !username || !password) {
            alert('Please fill out all fields.');
            return false;
        } else if (!namePattern.test(firstname)) {
            alert('First name must contain only letters and cannot include spaces or special characters.');
            return false;
        } else if (!namePattern.test(lastname)) {
            alert('Last name must contain only letters and cannot include spaces or special characters.');
            return false;
        } else if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            return false;
        } else if (!phonePattern.test(phone)) {
            alert('Please enter a valid phone number with 10 digits that does not start with sequential numbers like 123.');
            return false;
        } else if (username.length < 5) {
            alert('Username must be at least 5 characters long.');
            return false;
        } else if (!passwordPattern.test(password)) {
            alert('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.');
            return false;
        }
        return true;
    }

    function validateOTP() {
        var formOtp = document.getElementById("otp").value;
        var storedOtp = sessionStorage.getItem('otp');
        return formOtp == storedOtp;
    }
});
