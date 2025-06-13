import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const initialState = {
    isLoading: false,
    cities: [],
    currentCity: {},
    error: "",
  };
  function reducer(state, action) {
    switch (action.type) {
      case "loaded":
        return { ...state, isLoading: true };
      case "cities/loaded":
        return { ...state, isLoading: false, cities: action.payload };
      case "city/loaded":
        return { ...state, isLoading: false, currentCity: action.payload };
      case "city/created":return{...state , isLoading:false, cities:[...state.cities,action.payload], currentCity: action.payload};
      case "city/deleted": return{ ...state , isLoading:false , cities:state.cities.filter((city) => city.id !== action.payload), currentCity:{}}
      case "rejected":
        return { ...state, isLoading: false, error: action.payload };
    }
  }
  const [{ isLoading, cities, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loaded" });
      try {
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({ type: "rejected", payload: "Error fetching cities" });
      }
    }

    fetchCities();
  }, []);

  async function getCity(id) {
    if (currentCity.id === Number(id)) return; // If the city is already loaded, do nothing
    dispatch({ type: "loaded" });
    try {
      const response = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await response.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({ type: "rejected", payload: "Error fetching cities" });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "loaded" });
    try {
      const response = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({type:'rejected',payload:"Error in creating city"});
    } 
  }

  async function deleteCity(id) {
    dispatch({ type: "loaded" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, { method: "DELETE" });
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({ type: "rejected", payload: "Error deleting city" });
    } 
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
        error
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (!context) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
}
// eslint-disable-next-line react-refresh/only-export-components
export { CitiesProvider, useCities };
