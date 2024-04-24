function validate() {
    let form = document.getElementById('registerForm')
    let usernameInput = document.getElementById('username')
    let passwordInput = document.getElementById('password')
    let confirmPasswordInput = document.getElementById('confirm-password')
    let emailInput = document.getElementById('email')
    let validDiv = document.getElementById('valid')
    let isCompanyCheckbox = document.getElementById('company')
    let companyFieldset = document.getElementById('companyInfo')
    let companyNumberInput = document.getElementById('companyNumber')
    let submitButton = document.getElementById('submit')

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        validateUsername();
        validatePassword();
        validateEmail();
        validateCompanyNumber();

        validDiv.style.display = isFormValid() ? "block" : "none";
    });

    isCompanyCheckbox.addEventListener("change", function () {
        companyFieldset.style.display = this.checked ? "block" : "none";
    });

    function validateUsername() {
        const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
        if (!usernameRegex.test(usernameInput.value)) {
            applyErrorStyle(usernameInput);
        } else {
            removeErrorStyle(usernameInput);
        }
    }

    function validatePassword() {
        const passwordRegex = /^\w{5,15}$/;
        if (!passwordRegex.test(passwordInput.value)) {
            applyErrorStyle(passwordInput);
        } else {
            removeErrorStyle(passwordInput);
        }
        if (passwordInput.value !== confirmPasswordInput.value) {
            applyErrorStyle(confirmPasswordInput);
        } else {
            removeErrorStyle(confirmPasswordInput);
        }
    }

    function validateEmail() {
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(emailInput.value)) {
            applyErrorStyle(emailInput);
        } else {
            removeErrorStyle(emailInput);
        }
    }

    function validateCompanyNumber() {
        if (isCompanyCheckbox.checked) {
            const companyNumber = parseInt(companyNumberInput.value);
            if (isNaN(companyNumber) || companyNumber < 1000 || companyNumber > 9999) {
                applyErrorStyle(companyNumberInput);
            } else {
                removeErrorStyle(companyNumberInput);
            }
        }
    }

    function applyErrorStyle(element) {
        element.style.borderColor = "red";
    }

    function removeErrorStyle(element) {
        element.style.borderColor = "initial";
    }

    function isFormValid() {
        return [...form.elements].every(element => {
            return !element.required || element.value.trim() !== "" && element.style.borderColor !== "red";
        });
    }
};