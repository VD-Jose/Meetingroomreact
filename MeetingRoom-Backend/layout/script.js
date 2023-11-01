document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "http://localhost:4001/bookings"; // Replace with your API endpoint

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector("tbody");
            // Loop through the API response data and create rows for each entry
            data.data.forEach(entry => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${entry.employeeName}</td>
                    <td>${entry.roomName}</td>
                    <td>${entry.date}</td>
                    <td>${entry.startTime}</td>
                    <td>${entry.endTime}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
});
