import { useState } from "react";
import axios from "axios";
import { API_URL } from "../api/api";

interface Props {
   onRefresh: () => void;
};

export default function CarAdd(props: Readonly<Props>) {

      const [makeValue, setMakeValue] = useState<string>("");
      const [modelValue, setModelValue] = useState<string>("");
      const [yearValue, setYearValue] = useState<number>(2000);

    const addCar = async () => {

    try {
        await axios.post(
        `${API_URL}/cars/`,
        {
            make: makeValue,
            model: modelValue,
            year: yearValue
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        );
        props.onRefresh();

    }catch (error) {
      console.error("Hiba az autó frissítésekor:", error);
    }
  }

    return (
        <div className="flex flex-row bg-gray-100 p-4 rounded-md mb-2">
        <input
          value={makeValue}
          className="border rounded-md p-2 mr-2"
          onChange={(e) => setMakeValue(e.target.value)}
        />

        <input
          value={modelValue}
          className="border rounded-md p-2 mr-2"
          onChange={(e) => setModelValue(e.target.value)}
        />

        <input
          value={yearValue}
          className="border rounded-md p-2 mr-2"
          onChange={(e) => setYearValue(Number(e.target.value))}
        />
        <button
            onClick={addCar}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            Felvesz
          </button>
        </div>
    );
}