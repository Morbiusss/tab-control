import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";


const AppScreen = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    useEffect(() => {
        console.log("AppScreen mounted");

        const checkActiveTab = async () => {
            const token = localStorage.getItem("token");
            const appId = state.app._id;

            try {
                const response = await axios.post("http://localhost:5000/api/tab-check", {
                    appId: appId,
                    userId: token,
                });

                if (response.data.active) {
                    setAlertVisible(true);
                    setAlertMessage(response.data.message);
                }
            } catch (error) {
                console.error("Error checking active tab:", error);
            }
        };

        checkActiveTab();
    }, [state.app._id]);

    const handleLogoutOtherTab = async () => {
        const token = localStorage.getItem("token");
        await axios.post("http://localhost:5000/api/logout-other", {
            appId: state.app._id,
            userId: token,
        });

        setAlertVisible(false);
        navigate("/home");
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.heading}>{state.app.app_name}</h1>
                <p style={styles.subHeading}>App ID: {state.app._id}</p>

                {alertVisible && (
                    <div style={styles.alertBox}>
                        <p style={styles.alertMessage}>{alertMessage}</p>
                        <div style={styles.alertButtons}>
                            <button onClick={handleLogoutOtherTab} style={styles.alertButton}>
                                Log out of the other tab
                            </button>
                            <button
                                onClick={() => navigate("/home")}
                                style={{ ...styles.alertButton, backgroundColor: "#ccc" }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
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
        backgroundColor: "#f1f1f1",
        fontFamily: "'Roboto', sans-serif",
        padding: "20px",
    },
    card: {
        backgroundColor: "#ffffff",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "600px",
        textAlign: "center",
        border: "1px solid #f1f1f1",
        transition: "box-shadow 0.3s ease",
    },
    heading: {
        fontSize: "2rem",
        color: "#333",
        marginBottom: "10px",
        fontWeight: "600",
    },
    subHeading: {
        fontSize: "1.1rem",
        color: "#666",
        marginBottom: "25px",
    },
    alertBox: {
        backgroundColor: "#fffbcc",
        padding: "20px",
        borderRadius: "8px",
        border: "1px solid #ffeb3b",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
    },
    alertMessage: {
        fontSize: "1.1rem",
        color: "#d19e00",
        marginBottom: "20px",
    },
    alertButtons: {
        display: "flex",
        justifyContent: "center",
        gap: "15px",
    },
    alertButton: {
        padding: "12px 24px",
        fontSize: "1rem",
        borderRadius: "6px",
        border: "none",
        color: "#fff",
        cursor: "pointer",
        width: "160px",
        transition: "background-color 0.3s, transform 0.3s",
    },
};

export default AppScreen;
