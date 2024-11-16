"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../lib/firebase.js";

export default function LoginPage() {
    const handleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            // try loin with Google
            await signInWithPopup(auth, provider);
            // redirect to dashboard if successful
            window.location.href = "/dashboard";
        } catch (error) {
            console.error("Login failed: ", error);
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleLogin}>Login with Google</button>
        </div>
    )
}