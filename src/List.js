import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ListComponent.css"; // Import the CSS file

const ListComponent = () => {
  const [popupInfo, setPopupInfo] = useState({});
  const [darkRedAreas, setDarkRedAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "https://api.jsonbin.io/v3/b/6747626bacd3cb34a8b000a2";
  const API_KEY = "$2b$10$UZ0nh9zAcCgQh0i.0U4BXOoTKmaLGLgq4sf5kFV.a0m8EXz6QWTua";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            "X-Master-Key": API_KEY,
          },
        });
        const data = response.data.record;
        setPopupInfo(data.popupInfo || {});
        setDarkRedAreas(data.areas.darkRed || []);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  // Filter out entries that appear in darkRed
  const filteredPopupInfo = Object.keys(popupInfo).filter(
    (key) => !darkRedAreas.includes(key)
  );

  return (
    <div className="list-container">
      <h2 className="list-title">Area Information</h2>
      <table className="list-table">
        <thead>
          <tr>
            <th>Domain Name</th>
            <th>Owner Name</th>
          </tr>
        </thead>
        <tbody>
          {filteredPopupInfo.map((key) => (
            <tr key={key}>
              <td>{popupInfo[key].domainName}</td>
              <td>{popupInfo[key].ownerName || "None"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListComponent;
