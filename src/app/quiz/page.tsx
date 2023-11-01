"use client";
import getContent from "@/api/get-content"
import { Question } from "@/interface/questionData";
import { useEffect, useState } from "react";
import { QuestionComponent } from "./questionComponent";
import { useRouter } from "next/router";
import Link from "next/link";
import calculateResult from "@/api/calculate-answers";

export default function Page() {


    const [content,setContent] =  useState<Question[]>([]);
    const [activeQuestion, setActiveQuestion ] = useState(0);
    const [checked, setChecked] = useState(false);
    const [isAllQuestionsAnswered, setIsAllQuestionAnswered] = useState(false);
    const [finishQuiz, setFinishQuiz] = useState(false);

    useEffect(() => {
        getContentData();
    }, [])

    const  getContentData = async ( ) => {
        const content = await getContent();
        setContent(content.data);
    }

    const handleNextQuestion = () => {
        if (activeQuestion < content.length - 1) {
            setActiveQuestion(activeQuestion + 1);
        }
        console.log(content);
    }

    const handlePreviousQuestion = () => {
        if (activeQuestion > 0) {
            setActiveQuestion(activeQuestion - 1);
        }
        console.log(content);
    }

    const handleOnSelectedAnswer = (choice: any,index: any) :void => {
        content[activeQuestion].choice_selected = choice;
        setChecked(true);
        setIsAllQuestionAnswered(isAllQuestionsAnsweredFunc());
    }

    const questionsBalls = () => {
        return content.map((question, index) => {
            let styleBall = question.choice_selected ? ' bg-green-500 ': ' bg-white ';
            if(index == activeQuestion){
                styleBall = ' bg-blue-500 ';
            } 
            return (<div key={index} 
                className={"w-10 h-10 rounded-full" + styleBall}/>)
        })
    }

    const isAllQuestionsAnsweredFunc = () => {
        return content.every((question)=>  question.choice_selected);
    }

    const onFinishQuiz = () => {
        calculateResultFunc();
        // setFinishQuiz(true);
    }

    const calculateResultFunc = () => {
        const answers = content.map((question, index) => {
            return {
                id:question.id,
                choice_selected: question.choice_selected
            }
        })
        calculateResult(answers);
    }

    return (
    <div className="min-w-fit flex min-h-screen flex-col items-center justify-center p-24 gap-5">
        { !finishQuiz ? (
            <div>
                <div className="flex flex-row justify-center gap-2">
                    { questionsBalls() }
                </div>   
                <h1 className="text-6xl text-white">Pergunta {activeQuestion + 1}/{content.length }</h1>
                <div className="w-full bg-white p-10 border rounded-2xl flex flex-col items-center justify-center gap-5">
                    <QuestionComponent key={activeQuestion} onClick={handleOnSelectedAnswer} question={content[activeQuestion]} checked={checked}></QuestionComponent>
                <div className="w-full flow-root content-around">
                    <button onClick={handlePreviousQuestion} type="button" className=" disabled:opacity-25 float-left bg-cyan-300 border-cyan-700 border rounded-2xl p-2 ">Voltar</button>
                    <button onClick={handleNextQuestion} type="button" disabled={!checked} className="disabled:opacity-25 float-right bg-cyan-300 border-cyan-700 border rounded-2xl p-2 ">Proxima pergunta</button>
                </div>
                </div>
                <div className="w-full flow-root content-end">
                    <button onClick={onFinishQuiz} type="button" disabled={!isAllQuestionsAnswered} className="disabled:opacity-25 float-right bg-green-300 border-green-700 border rounded-2xl p-2 ">Finalizar</button>
                </div>
             </div>   
        ) : (
            <div className="w-full bg-white p-10 border rounded-2xl flex flex-col items-center justify-center gap-5">
                <h1 className="text-xl"> Sua pontuação </h1>
                <p className="font-bold">Questões acertadas : { '1/3'}</p>
                <p>Pontuação: {'20 pontos'}</p>
                <div className=" w-full flex flex-row justify-center">
                    <button type="button" disabled={!isAllQuestionsAnswered} className="disabled:opacity-25 float-right bg-green-300 border-green-700 border rounded-2xl p-2 "><Link href={'/'}>Reiniciar</Link></button>
                </div>
            </div>
        )
        }
    </div>
    )
}