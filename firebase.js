import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

// --- 1. Firebase Configuration ---
const firebaseConfig = {
  apiKey: "AIzaSyAECOmsUEXlgjS-9zGfV7RgD0P33PE84XY",
  authDomain: "study-ai-dash.firebaseapp.com",
  projectId: "study-ai-dash",
  storageBucket: "study-ai-dash.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abc123def456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// --- 2. Auth Functions ---

/**
 * Creates a new user account
 */
export const signup = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return { user: userCredential.user, error: null };
    } catch (error) {
        console.error("Signup Error:", error.message);
        return { user: null, error: error.message };
    }
};

/**
 * Logs in an existing user
 */
export const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { user: userCredential.user, error: null };
    } catch (error) {
        console.error("Login Error:", error.message);
        return { user: null, error: error.message };
    }
};

/**
 * Logs the user out
 */
export const logout = async () => {
    try {
        await signOut(auth);
        console.log("User signed out successfully");
    } catch (error) {
        console.error("Logout Error:", error.message);
    }
};

/**
 * Observer for Auth State 
 * Useful for updating the UI when a user logs in/out
 */
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is authenticated:", user.uid);
        // Update your UI (e.g., hide login button, show dashboard)
    } else {
        console.log("No user signed in.");
        // Redirect to login or show login button
    }
});
