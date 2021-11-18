// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";

// Import Cloud Firestore
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";


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
const db = getFirestore(app)

async function addData(){
  let worker = {
    firstName: 'Charles',
    lastName: 'Babbage',
    location: 'London',
    field: 'capentry',
    phone_no: '0712345678',
    email: 'charlie@gmail.com',
    tagline: "I invented carpentry"
  }

  try {
    const docRef = await addDoc(collection(db, 'casuals'), worker);
    console.log('Document written with ID', docRef.id)
  }catch(err) {
    console.error('Error adding document', err)
  }
}

// addData();

async function getData(){
  const casuals = [];
  const querySnapshot = await getDocs(collection(db, 'casuals'))
  querySnapshot.forEach(doc => casuals.push(doc.data()))
  console.log(casuals)
}

// getData()

// console.log(getData())
// const casuals = getData()
// console.log(casuals)

































/* Add Cards to a Container */
let workersContainer = document.querySelector(".casual-workers");

let workerCard = `<div class="cards"><div><img src="" alt="avatar_url" /><div><h2>Omondi Timon</h2><p><strong>Location : </strong> Nairobi</p><p><strong>Telephone : </strong> 0712345678</p><p><strong>Email : </strong> jdoe@example.com</p></div></div><p>Quality and Satisfaction beyond your expectations</p></div>`;

let workersArr = [1, 2, 3, 4, 5, 6];

workersArr.forEach((ele, ind) => {
	workersContainer.insertAdjacentHTML("afterbegin", workerCard);
});
