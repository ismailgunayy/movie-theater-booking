import { getDatabase, ref, child, get, set } from "firebase/database";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import ISeatLayout from "../types/ISeatLayout";
import ISeat from "../types/ISeat";
import { ROW_NUMBER, SEAT_NUMBER } from "../constants";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

async function loadSeats(): Promise<ISeatLayout> {
  let data: ISeatLayout = [];

  const snapshot = await get(child(ref(db), "seats/"));
  if (snapshot.exists()) {
    data = await snapshot.val();
  } else {
    console.error("No data available");
  }
  return data;
}

function saveSeats(seats: ISeatLayout) {
  const db = getDatabase();
  set(ref(db, "seats/"), seats);
}

function createSeats() {
  const seats = [];
  for (let i = 1; i <= ROW_NUMBER; i++) {
    const row = [];
    const letter = String.fromCharCode(65 + i - 1); // Starting from 'A'
    for (let j = 1; j <= SEAT_NUMBER; j++) {
      const newSeat: ISeat = {
        name: `${letter}${j}`,
        isFull: false,
        isSelected: false,
      };
      row.push(newSeat);
    }
    seats.push(row);
  }
  return seats;
}

export { loadSeats, saveSeats, createSeats };
