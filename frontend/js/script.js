document.addEventListener("DOMContentLoaded", () => {
    const scamForm = document.getElementById("scamReportForm");
    const scamList = document.getElementById("scamList");
    const searchInput = document.getElementById("search");

    // Load scams from local storage
    function loadFromLocalStorage() {
        const storedScams = JSON.parse(localStorage.getItem("scams")) || [];
        storedScams.forEach(({ company, contact, description }) => {
            addScamEntry(company, contact, description);
        });
    }

    // Save scams to local storage
    function saveToLocalStorage() {
        const scams = [...document.querySelectorAll(".scam-entry")].map(entry => ({
            company: entry.querySelector("h3").textContent,
            contact: entry.querySelector("p strong").nextSibling.nodeValue.trim(),
            description: entry.querySelector("p:last-child").textContent.replace("Description: ", "").trim()
        }));
        localStorage.setItem("scams", JSON.stringify(scams));
    }

    // Add a scam entry to the list
    function addScamEntry(company, contact, description) {
        // Prevent duplicate entries
        if ([...scamList.children].some(entry => entry.querySelector("h3").textContent === company)) {
            alert("This scam has already been reported.");
            return;
        }

        const scamEntry = document.createElement("div");
        scamEntry.classList.add("scam-entry");
        scamEntry.innerHTML = `
            <h3>${company}</h3>
            <p><strong>Contact:</strong> ${contact || "N/A"}</p>
            <p><strong>Description:</strong> ${description}</p>
            <button class="delete-btn">Delete</button>
        `;

        scamList.appendChild(scamEntry);
        saveToLocalStorage(); // Save after adding
    }

    // Handle form submission
    scamForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const company = document.getElementById("company").value.trim();
        const contact = document.getElementById("contact").value.trim();
        const description = document.getElementById("description").value.trim();

        if (!company || !description) {
            alert("Please fill out all required fields.");
            return;
        }

        addScamEntry(company, contact, description);
        scamForm.reset();
    });

    // Search filter for scam database
    searchInput.addEventListener("input", () => {
        const filter = searchInput.value.toLowerCase();
        const scams = document.querySelectorAll(".scam-entry");
        
        scams.forEach((scam) => {
            const companyName = scam.querySelector("h3").textContent.toLowerCase();
            scam.style.display = companyName.includes(filter) ? "block" : "none";
        });
    });

    // Delete scam entry
    scamList.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-btn")) {
            event.target.parentElement.remove();
            saveToLocalStorage(); // Update storage after deletion
        }
    });

    // Load existing scams when the page loads
    loadFromLocalStorage();
});
