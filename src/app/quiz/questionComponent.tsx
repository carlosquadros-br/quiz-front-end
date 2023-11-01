"use client";
import { Question } from "@/interface/questionData";
import { FunctionComponent, useEffect, useState } from "react";

interface QuestionComponentProps {
    question?: Question;
    checked: boolean;
    onClick: (choice: { id: number; text: string; is_correct: boolean; }, id: number) => void ;
}

export const QuestionComponent: FunctionComponent<QuestionComponentProps> = ({ question, onClick}: QuestionComponentProps) => {
   
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number>();

    const onAnswerSelected = (choice: { id: number; text: string; is_correct: boolean; }, index: number): void => {
        setSelectedAnswerIndex(choice.id);
        if(!question || question == undefined)
            return;
        onClick(choice, question.id);
    }
    
    useEffect(() => {
        if(question?.choice_selected){
            setSelectedAnswerIndex(question.choice_selected.id);
        }
    }, [])

    if(!question) {
        return (<div>Não á pergunta</div>)
    }
    
    return (
        <div className="flex flex-col w-full">
            <h3 className="font-mono text-3xl text-black">{question.question_text}</h3>
            {question.choices.map((choice, index)=> {
                return (
                <li 
                key={choice.id} 
                onClick={() => onAnswerSelected(choice, index)}
                className={
                    selectedAnswerIndex === choice.id ?  
                    "li-selected": ""
                    }>
                    <span className="font-mono text-2xl mx-auto">{choice.text}</span>
                </li>
            )
            })}
        </div>
    )
}