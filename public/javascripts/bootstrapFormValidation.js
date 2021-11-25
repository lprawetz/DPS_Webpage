(function () {
    'use strict'

    // Fetch all Forms for the Bootstrap-Validation.
    const forms = document.querySelectorAll('.validated-form')

    // Loop over them and prevent submission if not valid.
    Array.from(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()