import React from "react"
import Start from "./components/Start"
import Quiz from "./components/Quiz"

export default function App() {
    const [start, setStart] = React.useState(false)
    const [numQuestions, setNumQuestions] = React.useState(5)

    function handleChange(event) {
        const {value} = event.target
        setNumQuestions(value);
    }

    function startQuiz() {
        setStart(true)
    }

    function endQuiz() {
        setStart(false);
        console.log("clicked")
    }

    return (
        <main className="quiz-container">
            {
                start ?
                <Quiz numQuestions={numQuestions} endQuiz={endQuiz}/>
                : <Start startQuiz={startQuiz} handleChange={handleChange}/>
            }
        </main>
    )
}