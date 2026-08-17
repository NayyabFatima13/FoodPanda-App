import { useEffect, useState } from "react";

function useLocalStorage(key, initialValue) {

  console.log("🔥 useLocalStorage is running");

  const [value, setValue] = useState(() => {

    const savedValue = localStorage.getItem(key);

    console.log("Saved value:", savedValue);

    if (savedValue === null) {
      return initialValue;
    }

    try {
      return JSON.parse(savedValue);
    } catch (error) {
      console.log("Invalid localStorage value");
      return initialValue;
    }

  });


  useEffect(() => {

    console.log("Saving to localStorage:", value);

    localStorage.setItem(
      key,
      JSON.stringify(value)
    );

  }, [key, value]);


  return [value, setValue];
}

export default useLocalStorage;