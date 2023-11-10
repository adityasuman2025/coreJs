const NAME_REGEX = /^[a-zA-Z0-9 ]*$/;
const USERNAME_REGEX = /^[a-zA-Z0-9_-]*$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9]{10}$/;

function validateName(name) {
    return NAME_REGEX.test(name);
}

function validateUsername(name) {
    return USERNAME_REGEX.test(name);
}

function validateEmail(email) {
    return EMAIL_REGEX.test(email);
}

function validatePhone(number) {
    return PHONE_REGEX.test(number);
}

function validationReturn(errors) {
    return errors.length ? { success: false, errors } : { success: true };
}

function formValidation(formData) {
    const { name: nameVal, username: usernameVal, email: emailVal, phone: phoneVal, password: passwordVal, confirmPassword: confirmPasswordVal } = formData || {};

    const name = (nameVal || "").trim();
    const username = (usernameVal || "").trim();
    const email = (emailVal || "").trim();
    const phone = (phoneVal || "").trim();
    const password = (passwordVal || "").trim();
    const confirmPassword = (confirmPasswordVal || "").trim();

    const errors = [];

    if (!name || !username || !email || !phone || !password || !confirmPassword) {
        errors.push({ type: "general", msg: "Please fill all the details" });

        return validationReturn(errors);
    }

    if (password !== confirmPassword) {
        errors.push({ type: "password", msg: "Password do not match" });
    }

    if (!validateName(name)) {
        errors.push({ type: "name", msg: "Enter a valid name" });
    }

    if (!validateUsername(username)) {
        errors.push({ type: "username", msg: "Enter a valid username" });
    }

    if (!validateEmail(email)) {
        errors.push({ type: "email", msg: "Enter a valid email" });
    }

    if (!validatePhone(phone)) {
        errors.push({ type: "phone", msg: "Enter a valid phone number" });
    }


    return validationReturn(errors);
}


const formData = {
    name: "Aditya Suman",
    username: "aditya_suman-2025",
    email: "adityasuman202@gmail.com",
    phone: "7424947945",
    password: "aditya@123",
    confirmPassword: "aditya@123",
}
console.log(formValidation(formData))