// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";

// Import Cloud Firestore
import {
	getFirestore,
	collection,
	addDoc,
	getDocs,
	query,
	where,
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";

// Import Cloud Storage
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-storage.js";

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

// Set up Database
const db = getFirestore(app);

// Submit Form Details
const form = document.querySelector(".profile-form");

/** Add User Data to a Database */ 

// Load Data to Firestore
// Add Data to Firebase Firestore
async function loadToFirestore(data) {
	try {
		const docRef = await addDoc(collection(db, "users"), data);
		console.log("Document written with ID", docRef.id);
	} catch (err) {
		console.error("Error adding document", err);
	}
}

function addUserProfile() {
	// Add Collect User Details
	let profilePic = document.querySelector("#profile-pic");
	let firstName = document.querySelector("#firstName");
	let lastName = document.querySelector("#lastName");
	let email = document.querySelector("#email");
	let phone = document.querySelector("#phone");
	let tagline = document.querySelector("#tagline");
	let expertise = document.querySelector("#expertise");

	// Image File
	let imgFile = profilePic.files[0];


	const storage = getStorage();

	const imageRef = ref(storage, "images/" + imgFile.name);

	let types = ["image/png", "image/jpeg", "image/jpg"];

	if (!types.includes(imgFile.type)) {
		alert("Please add a valid image");
	} else {
		const uploadTask = uploadBytesResumable(imageRef, imgFile);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log("Upload is " + progress + "% done");
				switch (snapshot.state) {
					case "paused":
						console.log("Upload is paused");
						break;
					case "running":
						console.log("Upload is running");
						break;
				}
			},
			(error) => {
				console.error(error.message);
			},
			() => {
				// Upload completed successfully, now we can get the download URL
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					let person = {
						firstName: firstName.value,
						lastName: lastName.value,
						email: email.value,
						phone: phone.value,
						expertise: expertise.value,
						tagline: tagline.value,
						avatar_url: downloadURL,
                        // userId:
					};
                    // console.log(person)
                    loadToFirestore(person)
				});
			}
		);
	}
}



form.addEventListener("submit", (e) => {
	e.preventDefault();

	addUserProfile();

	// firstName.value = "";
	// lastName.value = "";
	// email.value = "";
	// phone.value = "";
	// tagline.value = "";
});
