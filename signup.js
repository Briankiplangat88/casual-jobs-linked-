// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";

// Import Firebase Auth
import {
	getAuth,
	createUserWithEmailAndPassword,
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

const auth = getAuth()

/** Create a User */
const form = document.querySelector('.signup');

const addUser = async (email, password) => {
	try {
		const user = await createUserWithEmailAndPassword(auth, email, password);
		console.log(user.user.uid);
		localStorage.setItem('userId',user.user.uid);
		location.href = 'localhost:5500/profile'
	} catch (error) {
		console.log(error);
		alert(error.message)
	}
};

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let email = document.querySelector('#email');
    let password = document.querySelector('#password');
    let confirmPassword = document.querySelector('#confirmPassword');

	console.log(password.value)
	console.log(confirmPassword.value)

    if(password.value !== confirmPassword.value){
        alert("Passwords don't match");
    } else {
        addUser(email.value,password.value);
    }

	email.value = ""
	password.value = ""
	confirmPassword.value = ""
})




function show() {
	document.getElementById("sbar").classList.toggle("active");
}
