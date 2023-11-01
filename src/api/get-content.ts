import { Question } from "@/interface/questionData";
import axios from "axios";

export default function getContent() {
  return axios.get<Question[]>("http://localhost:5000/content");
}
