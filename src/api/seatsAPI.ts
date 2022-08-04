import { getDatabase, ref, child, get, set } from "firebase/database";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../config/firebaseConfig";
import ISeat from "../types/ISeat";
import { ROW_NUMBER, SEAT_NUMBER } from "../services/constants";
import ISeatAPIResponse from "../types/ISeatAPIResponse";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

async function loadSeats(): Promise<ISeatAPIResponse> {
  let seats: ISeatAPIResponse = {};

  const snapshot = await get(child(ref(database), "seats/"));
  if (snapshot.exists()) {
    seats = await snapshot.val();
  } else {
    console.error("No data available");
  }
  return seats;
}

async function saveSeats(seats: ISeatAPIResponse) {
  const database = getDatabase();
  await set(ref(database, "seats/"), seats);
}

/**
 * Deletes everything in the db and initialize it over again.
 * Use with caution
 */
function initializeDB() {
  const seatsData = [];
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
    seatsData.push(row);
  }

  saveSeats({ isFull: false, data: seatsData });
}

export { loadSeats, saveSeats, initializeDB };
