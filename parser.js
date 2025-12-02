function csvJSON(csv) {
  const lines = csv.split('\n')
  const result = []
  const headers = lines[0].split(';')

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i])
      continue
    const obj = {}
    const currentline = lines[i].split(';')

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j]
    }
    result.push(obj)
  }
  return result
}


function generateTable(data) {
  if (!data || data.length === 0) return "No data available.";
  const table = document.createElement('table');
  const headerRow = document.createElement('tr');
  const keys = Object.keys(data[0]);

  keys.forEach(key => {
    const th = document.createElement('th');
    th.textContent = key.charAt(0).toUpperCase() + key.slice(1);
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  data.forEach(item => {
    const row = document.createElement('tr');
    keys.forEach(key => {
      const td = document.createElement('td');
      td.textContent = item[key] || "";
      row.appendChild(td);
    });
    table.appendChild(row);
  });
  return table;
}

const csvUrl = chrome.runtime.getURL("videos.csv");

fetch(csvUrl)
  .then(res => res.text())
  .then(csvText => {
    const data = csvJSON(csvText);
    const table = generateTable(data);
    document.getElementById('table-container').appendChild(table);
  });