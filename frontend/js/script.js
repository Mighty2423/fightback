const API_BASE = "http://54.92.184.220:3000"; // Update this if your EC2 IP changes

// Report form submission
if (window.location.pathname.includes("report_scam.html")) {
    const form = document.getElementById("scamReportForm");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const company = document.getElementById("company").value;
            const contact = document.getElementById("contact").value;
            const description = document.getElementById("description").value;

            const payload = {
                company_name: company,
                job_details: contact,
                description: description,
            };

            try {
                const res = await fetch(`${API_BASE}/report`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                });

                const data = await res.json();

                if (res.ok) {
                    alert("Report submitted successfully!");
                    form.reset();
                } else {
                    alert("Error: " + (data.error || "Failed to submit report."));
                }
            } catch (err) {
                console.error("Submit error:", err);
                alert("Something went wrong. Try again later.");
            }
        });
    }
}

// Scam database listing
if (window.location.pathname.includes("scam_database.html")) {
    const scamList = document.getElementById("scamList");
    const searchInput = document.getElementById("search");

    async function fetchScams(query = "") {
        try {
            const res = await fetch(`${API_BASE}/scams?search=${encodeURIComponent(query)}`);
            const data = await res.json();

            scamList.innerHTML = "";

            if (data.length === 0) {
                scamList.innerHTML = "<p>No scams found.</p>";
                return;
            }

            data.forEach((scam) => {
                const div = document.createElement("div");
                div.className = "scam-entry";
                div.innerHTML = `
          <h3>${scam.company_name}</h3>
          <p><strong>Details:</strong> ${scam.job_details || "N/A"}</p>
          <p><strong>Description:</strong> ${scam.description}</p>
        `;
                scamList.appendChild(div);
            });
        } catch (err) {
            scamList.innerHTML = "<p>Error loading scams.</p>";
            console.error("Fetch error:", err);
        }
    }

    // Load on page
    fetchScams();

    // Search logic
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            fetchScams(e.target.value);
        });
    }
}
