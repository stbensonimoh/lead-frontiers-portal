"use strict";
// interface HTMLInputEvent extends Event {
//     target: HTMLInputElement & EventTarget;
// }
// Load Particle.js
// @ts-ignore
particlesJS.load("particles-js", "scripts/particles.json", () => {
    console.log("callback - particles.js config loaded");
});
// Add intl-tel-input
// @ts-ignore
window.intlTelInputGlobals.loadUtils("scripts/utils.js");
var input = document.querySelector("#phone");
//@ts-ignore
window.intlTelInput(input, {
    initialCountry: "ng",
    separateDialCode: true,
    hiddenInput: "full_phone",
    utilsScript: "scripts/utils.js"
});
document.addEventListener("DOMContentLoaded", (e) => {
    // Add the current year to the footer credit
    let date = new Date();
    const year = date.getFullYear();
    let yearContent = document.querySelector("#year");
    yearContent.innerHTML = year;
    // Change the typed value of the first letter to uppercase for input fields and lowercase for email fields
    //@ts-ignore
    document.querySelector("#firstName").onchange = (e) => {
        //@ts-ignore
        let val = document.querySelector("#firstName").value;
        const regexp = /\b[a-z]/g;
        val = val.charAt(0).toUpperCase() + val.substr(1);
    };
    //@ts-ignore
    document.querySelector("#lastName").onchange = (e) => {
        //@ts-ignore
        let val = document.querySelector("#lastName").value;
        const regexp = /\b[a-z]/g;
        val = val.charAt(0).toUpperCase() + val.substr(1);
    };
    //@ts-ignore
    document.querySelector("#email").onchange = (e) => {
        //@ts-ignore
        let val = document.querySelector("#email").value;
        const regexp = /\b[a-z]/g;
        val = val.toLowerCase();
        // const emaildata = new FormData();
        // emaildata.append("email", val);
        // initiate a fetch call
        // fetch("http://localhost:3000/checkuser", {
        //     method: "post",
        //     body: emaildata
        // })
        //     .then(response => {
        //     return response.json();
        // })
        //     .then(data => {
        //     console.log(data);
        //     //@ts-ignore
        //     if (data === "user_exists") {
        //         //@ts-ignore
        //         swal("Already Registered", "You have already registered for the conference.", "warning");
        //         setTimeout(() => {
        //             // @ts-ignore
        //             window.location = "https://awlo.org/awlc/inviteafriend";
        //         }, 3000);
        //     }
        //     else if (data === "no_user") {
        //         // window.location.href = data;
        //         console.log("no user");
        //     }
        //     else {
        //         window.location.href = data;
        //     }
        // })
        //     .catch(err => {
        //     console.log(`e don happen ${err}`);
        // });
    };
    const form = document.querySelector("form");
    // On Form Submit
    form.addEventListener("submit", e => {
        let forms = document.getElementsByClassName("needs-validation");
        // Check to see if form has validation errors
        let validation = Array.prototype.filter.call(forms, (form) => {
            if (form.checkValidity() === false) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add("was-validated");
        });

        // If form doesn't have validation errors
        if (form.checkValidity() === true) {
            e.preventDefault();
            // change the button color and add the loading class
            document.querySelector("button").classList.remove("btn-danger");
            document.querySelector("button").classList.add("btn-primary");
            document.querySelector("button").innerHTML =
                'Loading <span class="spinner"></span><i class="fa fa-spinner fa-spin"></i></span>';
            //@ts-ignore
            const formdata = new FormData(form);
            // Options
            const options = {
                method: 'POST',
                body: formdata
            }
            // initiate a fetch call
            fetch("scripts/processor.php", options)
                .then(response => {
                return response.json();
            })
                .then(data => {
                // console.log(data);
                //@ts-ignore
                if (data === "success") {
                    //@ts-ignore
                    swal("Application Successful, Please Proceed To Payment Page", "Your application was successful, Please Proceed To Payment Page .", "success, Please Proceed To Payment Page");
                    setTimeout(() => {
                        // @ts-ignore
                        window.location = "https://paystack.com/pay/leadfrontierpartners";
                    }, 3000);
                }
            })
                .catch(error => {
                console.log("The Request Failed", error);
            });
        }
    });
});
