import axios from "axios";

const kata = axios.create({
  baseURL: "https://front-end-kata.brighthr.workers.dev/api",
});

export default kata;
