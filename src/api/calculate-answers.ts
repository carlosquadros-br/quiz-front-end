import { Question } from "@/interface/questionData";
import axios from "axios";

export default function calculateResult(selectAnswers: any) {
  return axios.post<any>(
    "http://localhost:5000/calculate-result",
    selectAnswers
  );
}
