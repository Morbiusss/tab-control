import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
    const [applications, setApplications] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const token = localStorage.getItem("token");
                const { data } = await axios.get("http://localhost:5000/api/applications", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setApplications(data);
            } catch (error) {
                console.error("Error fetching applications:", error);
            }
        };

        fetchApplications();
    }, []);

    const filteredApps = useMemo(() => {
        return applications.filter((app) =>
            app.app_name.toLowerCase().includes(search.toLowerCase())
        );
    }, [applications, search]);

    useEffect(() => {
        console.log("Home component rendered");
    });

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.heading}>Applications</h1>
                <input
                    type="text"
                    placeholder="Search applications..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={styles.searchInput}
                />
                <ul style={styles.appList}>
    {filteredApps.map((app) => (
        <a
            key={app.id}
            href={`/app/${app.id}`}
            style={{ textDecoration: "none" }}
            onClick={(e) => {
                e.preventDefault();
                console.log("Navigating to app:", app.id);
                navigate(`/app/${app.id}`, { state: { app } });
            }}
        >
            <li style={styles.appItem}>
                {app.app_name}
            </li>
        </a>
    ))}
</ul>

            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f7fc",
        fontFamily: "'Roboto', sans-serif",
        padding: "20px",
    },
    card: {
        backgroundColor: "#ffffff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "600px",
        textAlign: "center",
        border: "1px solid #e0e0e0",
    },
    heading: {
        fontSize: "2.5rem",
        color: "#333333",
        marginBottom: "20px",
    },
    searchInput: {
        width: "100%",
        padding: "10px",
        fontSize: "1rem",
        marginBottom: "20px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        boxSizing: "border-box",
    },
    appList: {
        listStyleType: "none",
        padding: "0",
        margin: "0",
    },
    appItem: {
        cursor: "pointer",
        padding: "12px",
        margin: "10px 0",
        backgroundColor: "#f7f8fa",
        borderRadius: "8px",
        transition: "background-color 0.3s",
        textAlign: "left",
        fontSize: "1.1rem",
        color: "#333333",
    },
};

export default Home;
