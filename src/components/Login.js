import React, { useContext } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const token = await user.getIdToken();  
    
            console.log("Token received:", token);  
    
            localStorage.setItem("token", token); 
    
            setUser({ id: user.uid, email: user.email, name: user.displayName });
            navigate("/home");
        } catch (error) {
            console.error("Login Failed:", error);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.heading}>Welcome Back!</h1>
                <p style={styles.subheading}>Please sign in to continue.</p>
                <button onClick={handleLogin} style={styles.loginButton}>
                    Login via Google
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f7fc",
        fontFamily: "'Roboto', sans-serif",
    },
    card: {
        backgroundColor: "#ffffff",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        width: "100%",
        maxWidth: "400px",
        border: "1px solid #e0e0e0",
    },
    heading: {
        fontSize: "2.5rem",
        color: "#333333",
        marginBottom: "10px",
    },
    subheading: {
        fontSize: "1.2rem",
        color: "#777777",
        marginBottom: "30px",
    },
    loginButton: {
        backgroundColor: "#4285F4", 
        color: "#ffffff",
        fontSize: "1.1rem",
        padding: "12px 24px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        width: "100%",
        transition: "0.3s",
    },
};

export default Login;
