import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };

    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "city/cretaed":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.id),
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw Error("Type not found");
  }
}

function CitiesContextProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const BaseUrl = "https://651e6ce544a3a8aa476850d9.mockapi.io";
  useEffect(() => {
    async function fetchCities() {
      dispatch({
        type: "loading",
      });
      try {
        const res = await fetch(`${BaseUrl}/cities`);
        const initialData = await res.json();
        const data = initialData[0].cities;

        dispatch({
          type: "cities/loaded",
          payload: data,
        });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was and error loading data ....",
        });
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;
      dispatch({
        type: "loading",
      });
      try {
        const res = await fetch(`${BaseUrl}/cities/${id}`);
        const data = await res.json();
        dispatch({
          type: "city/loaded",
          payload: data,
        });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading cities ....",
        });
      }
    },
    [currentCity.id]
  );
  async function createCity(newCity) {
    dispatch({
      type: "loading",
    });
    try {
      const res = await fetch(`${BaseUrl}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCity),
      });
      const data = await res.json();
      dispatch({
        type: "city/cretaed",
        payload: data,
      });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating city ....",
      });
    }
  }
  async function deleteCity(id) {
    dispatch({
      type: "loading",
    });

    try {
      await fetch(`${BaseUrl}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({
        type: "city/deleted",
        id: id,
      });
    } catch {
      alert("Error");
    } finally {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting city ....",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        error,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error("Context Not Defined Here");
  return context;
}

export { CitiesContextProvider, useCities };
