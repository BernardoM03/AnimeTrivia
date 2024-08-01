import React from "react"
import {decode} from 'html-entities';

export default function Quiz(props) {
    const [questionData, setQuestionData] = React.useState([])
    const [selectedAnswers, setSelectedAnswers] = React.useState([])
    const [showCorrect, setShowCorrect] = React.useState(false)
    const [correctNum, setCorrectNum] = React.useState(0);
    //const [selectedAnswers, setSelectedAnswers] = React.useState(JSON.parse(localStorage.getItem("selectedAnswers")) || [])

    console.log("render state")

    React.useEffect(()=> {
        console.log("effect")
        fetch(`https://opentdb.com/api.php?amount=${props.numQuestions}&category=31`)
        .then(res => res.json())
        .then(data => setQuestionData(data))
    }, [])

    function handleChange(questionIndex, answer) {
        setSelectedAnswers(prevSelectedAnswers => ({
            ...prevSelectedAnswers,
            [questionIndex]: answer
        }))
        //localStorage.setItem("selectedAnswers", JSON.stringify(selectedAnswers))
    }

    let questionElements
    if (questionData.results) {
        questionElements = questionData.results.map(question => {
            const answersArr = [question.correct_answer, ...question.incorrect_answers].sort()
            return (
                <div key={question.question} className="question">
                    <p className="question--text">{decode(question.question)}</p>
                    <div className="question--answers">
                        {answersArr.map(answer => <button
                            key={answer}
                            onClick={() => handleChange(question.question, answer)}
                            className={`question--answer 
                                ${selectedAnswers[question.question] === answer ? 'selected' : ''} 
                                ${showCorrect && answer === question.correct_answer ? "correct" : ""} `}>
                        {decode(answer)}</button>)}
                    </div>
                </div>
        )})
    }

    function checkAnswers() {
        questionData.results.forEach(question => {
            if (question.correct_answer === selectedAnswers[question.question]) {
                setCorrectNum(prevNum => prevNum + 1);
            }
        })
        setShowCorrect(true);
        console.log(correctNum)
    }

    return (
        <div className="quiz">
            {questionElements}
            {
                showCorrect ?
                <div className="quiz--playagain">
                    <p>You Scored {correctNum}/{props.numQuestions} correct Answers</p>
                    <button className="quiz--btn" onClick={props.endQuiz}>Play Again</button>
                </div>
                : <button className="quiz--btn" onClick={checkAnswers}>Submit Quiz</button>
            }
        </div>
    );
}