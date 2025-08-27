// ========================================================================================
// QUOTES FUNCTION - Used to display random encouragement quotes
// ========================================================================================
function getQuote(n) {
    // Array containing all the inspirational quotes that can be displayed
    const quotes = [
        "“You are braver than you believe, stronger than you seem, and smarter than you think.” — A.A. Milne",
        "“Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.” — Christian D. Larson",
        "“Your present circumstances don’t determine where you can go; they merely determine where you start.” — Nido Qubein",
        "“Don’t let yesterday take up too much of today.” — Will Rogers",
        "“Mistakes are proof that you are trying.”",
        "“Comparison is the thief of joy.” — Theodore Roosevelt",
        "“You don’t have to be perfect to be amazing.”",
        "“Growth begins at the end of your comfort zone.”",
        "“Be gentle with yourself, you’re doing the best you can.”",
        "“Progress, not perfection.”",
        "“It’s okay to not have it all figured out yet.”",
        "“The only way out is through.” — Robert Frost",
        "“Small steps every day.”",
        "“You belong here. You matter.”",
        "“Keep going. Your future self will thank you.”",
        "“Self-doubt kills more dreams than failure ever will.”",
        "“Celebrate every small victory.”",
        "“Your voice matters.”",
        "“Be your own kind of beautiful.”",
        "“It’s not about being the best. It’s about being better than you were yesterday.”"
    ];

    // Check if a specific quote number (n) was requested and if it's valid
    // If not valid or not provided, return a random quote instead
    if (typeof n !== "number" || n < 0 || n >= quotes.length) {
        // Generate a random number between 0 and the length of quotes array
        const randomIndex = Math.floor(Math.random() * quotes.length);
        return quotes[randomIndex]; // Return the quote at the random position
    }
    return quotes[n]; // Return the specific quote requested
}


// ========================================================================================
// HOMEPAGE FUNCTIONALITY - Only runs when we're on the homepage
// ========================================================================================

// Check if the current page has the "home" class on the body tag
if (document.body.classList.contains("home")) {
    console.log("toast") // Debug message to console (you can see this in browser dev tools)

    // This function runs when the entire webpage has finished loading
    window.onload = function () {

        // TOAST CREATION & DISPLAY (A toast is a small popup notification)

        // Step 1: Create a container element to hold our toast notification
        const toastContainer = document.createElement('div'); // Creates a new <div> element
        toastContainer.id = 'toastContainer'; // Gives it an ID so we can find it later
        toastContainer.className = 'position-fixed bottom-0 end-0 p-3'; // Bootstrap classes for positioning
        toastContainer.style.zIndex = '11'; // Makes sure it appears above other content
        document.body.appendChild(toastContainer); // Adds the container to the webpage

        // Step 2: Get a random encouraging quote to show in the toast
        const randomQuote = getQuote(); // Calls our function above to get a random quote

        // Step 3: Create the HTML structure for our toast notification
        const toastHTML = `
        <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" 
             data-bs-autohide="true" data-bs-delay="5000">
            <div class="toast-header" style="background-color: var(--celadon);">
                <strong class="me-auto">Encouragement</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${randomQuote}
            </div>
        </div>
    `;
        // Note: ${randomQuote} inserts the quote we got earlier into the HTML

        // Step 4: Put the toast HTML inside our container
        toastContainer.innerHTML = toastHTML;

        // Step 5: Initialize Bootstrap's toast functionality and show it
        const toastElement = toastContainer.querySelector('.toast'); // Find the toast element
        const toast = new bootstrap.Toast(toastElement); // Create Bootstrap toast object
        toast.show(); // Display the toast notification
    }

    // ========================================================================================
    // FORM PAGE FUNCTIONALITY - Only runs when we're on the form page
    // ========================================================================================

} else if (document.body.classList.contains('form')) {

    // Initialize the Bootstrap modal (popup) that shows after form submission
    const modal = new bootstrap.Modal(document.getElementById('thankYouModal'));

    // ================================================================================
    // CHARACTER COUNTER - Shows how many characters user has typed
    // ================================================================================

    // Get references to the message input field and the counter display
    const messageInput = document.getElementById("message");
    const messageCounter = document.getElementById("messageCounter");

    // Add an event listener that runs every time the user types in the message field
    messageInput.addEventListener("input", function () {
        const currentLength = messageInput.value.length; // Count characters currently typed
        // Update the counter display to show current count / maximum allowed (500)
        messageCounter.textContent = `${currentLength} / 500 characters`;
    });

    // ================================================================================
    // MAIN FORM SUBMISSION HANDLER - This is the big one!
    // ================================================================================

    // Get a reference to our form element
    const form = document.getElementById('supportForm');

    // Add an event listener that runs when the form is submitted
    form.addEventListener('submit', function (e) {

        // PREVENT DEFAULT FORM SUBMISSION
        // This stops the browser from submitting the form normally
        // We want to validate it first with our custom JavaScript
        e.preventDefault();

        // RESET ANY PREVIOUS VALIDATION ERROR STYLING
        // Remove the red "invalid" styling from all form fields
        document.querySelectorAll('.is-invalid').forEach(el => {
            el.classList.remove('is-invalid');
        });

        // COLLECT ALL FORM DATA
        // Get the values from all form fields and clean them up
        const name = document.getElementById("name").value.trim(); // .trim() removes spaces from beginning/end
        const message = document.getElementById("message").value.trim();
        const journey = document.getElementById("journey").value.trim();
        const pledge = document.querySelectorAll('input[name="pledge"]:checked'); // Get all checked pledge boxes
        const feeling = document.querySelector('input[name="feeling"]:checked'); // Get selected feeling radio button
        const support = document.getElementById("supportTime").value; // Get selected dropdown value
        const anonymous = document.querySelector('input[name="anonymousToggle"]:checked'); // Get anonymous choice

        // VALIDATION TRACKER
        // We'll use this to keep track of whether the entire form is valid
        let isValid = true;

        // VALIDATE NAME FIELD
        // Name is optional, but if provided, it must be at least 2 characters
        if (name.length > 0 && name.length < 2) {
            document.getElementById('name').classList.add('is-invalid'); // Add red border/styling
            isValid = false; // Mark form as invalid
        }

        // VALIDATE MESSAGE FIELD (REQUIRED)
        // Message must be at least 5 characters long
        if (message.length < 5) {
            document.getElementById('message').classList.add('is-invalid');
            isValid = false;
        }

        // VALIDATE JOURNEY FIELD
        // Journey is optional, but if provided, must be at least 10 characters
        if (journey.length > 0 && journey.length < 10) {
            document.getElementById('journey').classList.add('is-invalid');
            isValid = false;
        }

        // VALIDATE PLEDGE CHECKBOXES (REQUIRED)
        // User must check all 4 pledge boxes
        if (pledge.length !== 4) {
            // Show error message for pledge section
            document.querySelector('fieldset > .invalid-feedback').style.display = 'block';
            isValid = false;
        }

        // VALIDATE FEELING RADIO BUTTONS (REQUIRED)
        // User must select how they're feeling
        if (!feeling) {
            // Add invalid styling to all feeling radio button containers
            document.querySelectorAll('[name="feeling"]').forEach(el => {
                el.closest('.form-check').classList.add('is-invalid');
            });
            isValid = false;
        }

        // VALIDATE SUPPORT DROPDOWN (REQUIRED)
        // User must select when they need support
        if (support === "" || support === "Select an option") {
            document.getElementById('supportTime').classList.add('is-invalid');
            isValid = false;
        }

        // VALIDATE ANONYMOUS TOGGLE (REQUIRED)
        // User must choose yes or no for anonymous posting
        if (!anonymous) {
            // Show error message for anonymous section
            document.querySelector('[name="anonymousToggle"]').closest('fieldset').querySelector('.invalid-feedback').style.display = 'block';
            isValid = false;
        }

        // FINAL FORM SUBMISSION OR ERROR DISPLAY
        // Only submit if all validawtion passed
        if (isValid) {
            form.submit(); // Submit the form to Google Apps Script
            modal.show(); // Show thank you popup
            this.reset(); // Clear all form fields
            messageCounter.textContent = `0 / 500 characters`; // Reset character counter
        }
        // If isValid is false, the form won't submit and user will see error styling
    });

    // ================================================================================
    // REAL-TIME VALIDATION - Remove error styling as user fixes problems
    // ================================================================================

    // NAME FIELD - Remove error styling when user types valid input
    document.getElementById('name').addEventListener('input', function () {
        // If name is either empty (allowed) or has 2+ characters, remove error styling
        if (this.value.trim().length >= 2 || this.value.trim().length === 0) {
            this.classList.remove('is-invalid');
        } else {
            this.classList.add('is-invalid'); // Keep showing error for 1 character names
        }
    });

    // MESSAGE FIELD - Remove error styling when user types enough characters
    document.getElementById('message').addEventListener('input', function () {
        if (this.value.trim().length >= 5) {
            this.classList.remove('is-invalid');
        }
        // Note: We don't add 'is-invalid' here because it's annoying to show errors while typing
    });

    // JOURNEY FIELD - Remove error styling when user types enough characters
    document.getElementById('journey').addEventListener('input', function () {
        // If journey is either empty (allowed) or has 10+ characters, remove error styling
        if (this.value.trim().length >= 10 || this.value.trim().length === 0) {
            this.classList.remove('is-invalid');
        } else {
            this.classList.add('is-invalid');
        }
    });

    // SUPPORT DROPDOWN - Remove error styling when user makes a selection
    document.getElementById('supportTime').addEventListener('change', function () {
        if (this.value !== "" && this.value !== "Select an option") {
            this.classList.remove('is-invalid');
        }
    });

    // PLEDGE CHECKBOXES - Hide error message when all 4 boxes are checked
    document.querySelectorAll('input[name="pledge"]').forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            // Count how many pledge boxes are currently checked
            const pledge = document.querySelectorAll('input[name="pledge"]:checked');
            if (pledge.length === 4) {
                // Hide the error message if all 4 are checked
                document.querySelector('fieldset > .invalid-feedback').style.display = 'none';
            }
        });
    });

    // FEELING RADIO BUTTONS - Remove error styling when user makes a selection
    document.querySelectorAll('input[name="feeling"]').forEach(radio => {
        radio.addEventListener('change', function () {
            // Remove error styling from all feeling options when any one is selected
            document.querySelectorAll('[name="feeling"]').forEach(el => {
                el.closest('.form-check').classList.remove('is-invalid');
            });
        });
    });

    // ANONYMOUS TOGGLE - Hide error message when user makes a selection
    document.querySelectorAll('input[name="anonymousToggle"]').forEach(radio => {
        radio.addEventListener('change', function () {
            // Check if user has made a choice
            const anonymous = document.querySelector('input[name="anonymousToggle"]:checked');
            if (anonymous) {
                // Hide the error message if a choice was made
                document.querySelector('[name="anonymousToggle"]').closest('fieldset').querySelector('.invalid-feedback').style.display = 'none';
            }
        });
    });
}

// ========================================================================================
// END OF FILE
// ========================================================================================

/* 
BEGINNER NOTES:

1. EVENT LISTENERS: These are functions that "listen" for specific events (like clicks, typing, form submission) and run code when those events happen.

2. QUERY SELECTORS: 
   - document.getElementById('name') - finds element with id="name"
   - document.querySelector('.class') - finds first element with that class
   - document.querySelectorAll('.class') - finds ALL elements with that class

3. VALIDATION LOGIC: We check each form field to make sure it meets our requirements before allowing the form to submit.

4. BOOTSTRAP INTEGRATION: We use Bootstrap classes like 'is-invalid' to show red error styling, and Bootstrap JavaScript for modals and toasts.

5. REAL-TIME FEEDBACK: The code provides immediate feedback as users type or make selections, making the form feel more responsive.

6. PREVENTDEFAULT: e.preventDefault() stops the browser's default behavior (like submitting a form) so we can handle it with our own code first.
*/