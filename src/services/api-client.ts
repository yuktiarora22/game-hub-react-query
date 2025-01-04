import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "ab89863021cd403385388bc3891f41da",
  },
});
