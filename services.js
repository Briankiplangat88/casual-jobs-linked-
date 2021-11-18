// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";

// Import Cloud Firestore
import {
	getFirestore,
	collection,
	addDoc,
	getDocs,
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

// Add Collect User Details
let firstName = document.querySelector("#firstName");
let lastName = document.querySelector("#lastName");
let email = document.querySelector("#email");
let phone = document.querySelector("#phone");
let tagline = document.querySelector("#tagline");
let expertise = document.querySelector('#expertise')

// User Profile Pic
let profilePic = document.querySelector("#profile-pic");

// Submit Form Details
const form = document.querySelector(".profile-form");

// Upload Image to Firebase Storage
function addProfileToStorage(file) {
	let imgUrl = "";

	const storage = getStorage();

	const imageRef = ref(storage, "images/" + file.name);

	let types = ["image/png", "image/jpeg", "image/jpg"];

	if (!types.includes(file.type)) {
		alert("Please Add a valid image");
	} else {
		const uploadTask = uploadBytesResumable(imageRef, file);

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
					i;
				});
			}
		);
	}

	return imgUrl;
}

// Add Data to Firebase Firestore
async function addUserProfile(data) {
	try {
		const docRef = await addDoc(collection(db, "users"), data);
		console.log("Document written with ID", docRef.id);
	} catch (err) {
		console.error("Error adding document", err);
	}
}

form.addEventListener("submit", (e) => {
	e.preventDefault();

	// let imageFile = profilePic.files[0];

	// let avatar_url = addProfileToStorage(imageFile);

	let person = {
		firstName: firstName.value,
		lastName: lastName.value,
		email: email.value,
		phone: phone.value,
    expertise: expertise.value,
		tagline: tagline.value,
		// avatar_url,
	};


  addUserProfile(person);

  firstName.value = ""
  lastName.value = "";
  email.value = "";
  phone.value = ""
  tagline.value = "";
});






































































// async function addData(){
//   let worker = {
//     firstName: 'Charles',
//     lastName: 'Babbage',
//     location: 'London',
//     field: 'capentry',
//     phone_no: '0712345678',
//     email: 'charlie@gmail.com',
//     tagline: "I invented carpentry"
//   }

//
// }

// addData();

// async function getData(){
//   const casuals = [];
//   const querySnapshot = await getDocs(collection(db, 'casuals'))
//   querySnapshot.forEach(doc => casuals.push(doc.data()))
//   console.log(casuals)
// }

// getData()

// console.log(getData())
// const casuals = getData()
// console.log(casuals)

/* Add Cards to a Container */
// let workersContainer = document.querySelector(".casual-workers");

let workerCard = `<div class="cards"><div><img src="" alt="avatar_url" /><div><h2>Omondi Timon</h2><p><strong>Location : </strong> Nairobi</p><p><strong>Telephone : </strong> 0712345678</p><p><strong>Email : </strong> jdoe@example.com</p></div></div><p>Quality and Satisfaction beyond your expectations</p></div>`;

// let workersArr = [1, 2, 3, 4, 5, 6];

// workersArr.forEach((ele, ind) => {
// 	workersContainer.insertAdjacentHTML("afterbegin", workerCard);
// });
