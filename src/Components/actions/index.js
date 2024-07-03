import emissions from "../apis/Emissions";
import axios from "axios";

export const fetchEmissions = () => async (dispatch) => {
  const response = await emissions.get("/emissions");
  dispatch({ type: "FETCH_EMISSIONS", payload: response.data });
  console.log(response.data);
};
