// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";

// Import Firebase Auth
import {
	getAuth,
	signInWithEmailAndPassword,
	onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyA7a-vBlhLUeZXQ6TRyxvq8G6wraMKY3XI",
	authDomain: "casual-jobs.firebaseapp.com",
	projectId: "casual-jobs",
	storageBucket: "casual-jobs.appspot.com",
	messagingSenderId: "314608680658",
	appId: "1:314608680658:web:04f59fac5f8b527894b70b",
};

// Initialise Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

/** Login a User */
const form = document.querySelector(".login");

const login = async (email, password) => {
	try {
		const user = await signInWithEmailAndPassword(auth, email, password);
		console.log(user);
		localStorage.setItem("userId", user.user.uid);
		location.href = "localhost:5500/profile";
	} catch (error) {
		console.log(error);
	}
};

form.addEventListener("submit", (e) => {
	e.preventDefault();

	let email = document.querySelector("#email");
	let password = document.querySelector("#password");

	login(email.value, password.value);
	email.value = "";
	password.value = "";
});

function show() {
	document.getElementById("sbar").classList.toggle("active");
}
