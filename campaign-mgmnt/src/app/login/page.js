"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../lib/firebase.js";
import Image from "next/image.js";

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
        <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/login-img.svg"
                    alt="Background"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    className="opacity-50"
                />
            </div>
            <div className="relative z-10 p-6 bg-white rounded-md shadow-md">
                <h1 className="text-4xl font-bold mb-4">Welcome to Realm</h1>
                <p className="text-lg mb-4">Member login with Google-Signup.</p>
                <button className="rounded-3xl bg-blue-600 font-semibold p-3" onClick={handleLogin}>Login/Register</button>
            </div>
        </div>
    )
}