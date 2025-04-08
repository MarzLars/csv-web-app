document.getElementById('csvFileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const csvData = e.target.result;
            const parsedData = parseCSV(csvData);
            populateTable(parsedData);
        };
        reader.readAsText(file);
    }
});

function parseCSV(csvData) {
    const delimiter = csvData.includes(';') ? ';' : ',';
    const lines = csvData.split('\n');
    const headers = lines[0].split(delimiter);
    const data = lines.slice(1).map(line => {
        const values = line.split(delimiter);
        const obj = {};
        headers.forEach((header, index) => {
            obj[header] = values[index];
        });
        return obj;
    });
    return data;
}

function populateTable(data) {
    const tableHeader = document.getElementById('csvTableHeader');
    const tableBody = document.getElementById('csvTableBody');

    // Clear existing table content
    tableHeader.innerHTML = '';
    tableBody.innerHTML = '';

    // Populate table header
    const headers = Object.keys(data[0]);
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        tableHeader.appendChild(th);
    });

    // Populate table body
    data.forEach(row => {
        const tr = document.createElement('tr');
        headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = row[header];
            td.classList.add('fit-text'); // Add CSS class to make the text fit the boxes better
            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
    });
}
