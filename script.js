document.addEventListener("DOMContentLoaded", () => {
    const scamForm = document.getElementById("scamReportForm");
    const scamList = document.getElementById("scamList");
    const searchInput = document.getElementById("search");

    // Handle form submission
    scamForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const company = document.getElementById("company").value;
        const contact = document.getElementById("contact").value;
        const description = document.getElementById("description").value;

        if (company.trim() === "" || description.trim() === "") {
            alert("Please fill out all required fields.");
            return;
        }

        const scamEntry = document.createElement("div");
        scamEntry.classList.add("scam-entry");
        scamEntry.innerHTML = `
            <h3>${company}</h3>
            <p><strong>Contact:</strong> ${contact}</p>
            <p><strong>Description:</strong> ${description}</p>
        `;

        scamList.appendChild(scamEntry);

        // Clear form fields
        scamForm.reset();
    });

    // Search filter for scam database
    searchInput.addEventListener("input", () => {
        const filter = searchInput.value.toLowerCase();
        const scams = document.querySelectorAll(".scam-entry");
        
        scams.forEach((scam) => {
            const companyName = scam.querySelector("h3").textContent.toLowerCase();
            if (companyName.includes(filter)) {
                scam.style.display = "block";
            } else {
                scam.style.display = "none";
            }
        });
    });
});
