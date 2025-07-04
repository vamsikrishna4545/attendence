import React, { useState } from "react";
import "./App.css";

const STATUS_COLORS = {
  Present: { bg: "#e6fffa", text: "#38a169" },
  Absent: { bg: "#fff5f5", text: "#e53e3e" },
  Late: { bg: "#fffaf0", text: "#d69e2e" },
  "On Leave": { bg: "#ebf8ff", text: "#3182ce" }
};

const MONTHS = [
  { value: "apr", label: "Apr 2024" },
  { value: "may", label: "May 2024" }
];

const STATUSES = [
  { value: "all", label: "All" },
  { value: "present", label: "Present" },
  { value: "absent", label: "Absent" },
  { value: "late", label: "Late" },
  { value: "leave", label: "On Leave" }
];

const data = [
  { name: "John Smith", date: "04/01/2024", status: "Present", hours: 8.0 },
  { name: "Jane Doe", date: "04/01/2024", status: "Absent", hours: 0.0 },
  { name: "Michael Johnson", date: "04/01/2024", status: "On Leave", hours: 0.0 },
  { name: "Emily Davis", date: "04/02/2024", status: "Present", hours: 8.0 },
  { name: "Sarah Wilson", date: "04/02/2024", status: "Late", hours: 7.5 },
];

function App() {
  const [selectedMonth, setSelectedMonth] = useState(MONTHS[0].value);
  const [selectedStatus, setSelectedStatus] = useState(STATUSES[0].value);
  const [filteredData, setFilteredData] = useState(data);

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    filterData();
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    filterData();
  };

  const filterData = () => {
    let filtered = [...data];
    
    if (selectedMonth !== MONTHS[0].value) {
      const month = selectedMonth === "apr" ? "04" : "05";
      filtered = filtered.filter(item => item.date.startsWith(month));
    }

    if (selectedStatus !== STATUSES[0].value) {
      filtered = filtered.filter(item => item.status.toLowerCase() === selectedStatus);
    }

    setFilteredData(filtered);
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      filteredData.map(e => 
        `${e.name},${e.date},${e.status},${e.hours}`
      ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "attendance.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="container">
      <h1>ATTENDANCE TRACKING</h1>
      <h3>HRMS MODULE</h3>

      <div className="filter-group">
        {MONTHS.map(month => (
          <button
            key={month.value}
            className={`filter-btn ${selectedMonth === month.value ? 'active' : ''}`}
            onClick={() => handleMonthChange(month.value)}
          >
            {month.label}
          </button>
        ))}
      </div>

      <div className="filter-group">
        {STATUSES.map(status => (
          <button
            key={status.value}
            className={`filter-btn ${selectedStatus === status.value ? 'active' : ''}`}
            onClick={() => handleStatusChange(status.value)}
          >
            {status.label}
          </button>
        ))}
      </div>

      <button className="export-btn" onClick={handleExport}>
        Export to CSV
      </button>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th className="employee1">Employee</th>
              <th className="employee1">Date</th>
              <th className="status-column">Status</th>
              <th className="hours-column">Hours</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((record, index) => (
              <tr key={index}>
                <td>{record.name}</td>
                <td>{record.date}</td>
                <td>
                  <span 
                    className="status-badge"
                    style={{ 
                      backgroundColor: STATUS_COLORS[record.status].bg,
                      color: STATUS_COLORS[record.status].text
                    }}
                  >
                    {record.status}
                  </span>
                </td>
                <td>{record.hours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
