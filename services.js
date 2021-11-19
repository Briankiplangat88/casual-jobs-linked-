// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";

// Import Cloud Firestore
import {
	getFirestore,
	collection,
	getDocs,
	query,
	where,
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";


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



/** Get Workers */

const getWorkers = async (className) => {
	let workersContainer = document.querySelector(`.${className}`);
	const capenters = []
	const workersQuery = query(collection(db, 'users'), where('expertise', '==', `${className}`));

	const querySnapshot = await getDocs(workersQuery);
	querySnapshot.forEach( async(doc) => {
		console.log(doc.data())
		let data = await doc.data()
		capenters.push(data)
		capenters.forEach((item) => {
			let workerCard = `<div class="cards"><div><img src=${item.avatar_url} alt="avatar_url" /><div><h2>${item.firstName} ${item.lastName} </h2><p><strong>Location : </strong>  ${item.location} </p><p><strong>Telephone : </strong> ${item.phone} </p><p><strong>Email : </strong> ${item.email} </p></div></div><p> ${item.tagline} </p></div>`;
			workersContainer.insertAdjacentHTML("afterbegin", workerCard);
		})
	});
}


// Get All Capenters 
getWorkers('capentry')

// Get All Painters 
getWorkers('painting')

// Get All Plumbers 
getWorkers('plumbing')

// Get All Masons
getWorkers('masonry')

// Get All Electrical Workers
getWorkers('electrical')

// Get All Welders
getWorkers('welding')














































