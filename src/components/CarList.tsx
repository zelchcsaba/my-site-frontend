import { useState } from "react";
import axios from "axios";
import { API_URL } from "../api/api";

type Car = {
  id: number;
  make: string;
  model: string;
  year: number;
};

interface Props {
   car:  Car;
   onRefresh: () => void;
};

export default function CarList(props : Readonly<Props>) {

  const [isEditing, setIsEditing] = useState(false);
  const [makeValue, setMakeValue] = useState<string>(props.car.make);
  const [modelValue, setModelValue] = useState<string>(props.car.model);
  const [yearValue, setYearValue] = useState<number>(props.car.year);

  const onClickButton = async () => {
    if (isEditing) {
    try {
    await axios.patch(
      `${API_URL}/cars/` + props.car.id,
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
    setIsEditing((prevState) => !prevState);
};

const onDeleteButton = async () => {
  try {
    await axios.delete(
      `${API_URL}/cars/` + props.car.id,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    props.onRefresh();
  }catch (error) {
    console.error("Hiba az autó törlésekor:", error);
  }
};

  return (
    <div>
      {!isEditing ? (
        <div className="flex flex-row bg-gray-100 p-4 rounded-md mb-2">
          <p className="mx-2 my-2">{makeValue}</p>
          <p className="mx-2 my-2">{modelValue}</p>
          <p className="mx-2 my-2">{yearValue}</p>
        </div>
      ) : (
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
        </div>
      )}
      <div className="mb-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          onClick= {onClickButton}
        >
          {isEditing ? "Mentés" : "Szerkesztés"}
        </button>

        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md"
          onClick= {onDeleteButton}
        >
          Törlés
        </button>
      </div>

    </div>
  );
}
