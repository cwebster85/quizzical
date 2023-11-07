import { useEffect, useState } from "react";
import Start from '../components/Start';
import '../styles/Quiz.css';
import he from 'he';

function decodeHTMLEntities(obj) {
  if (typeof obj !== 'object') {
    return obj;
  }

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'string') {
        obj[key] = he.decode(obj[key]);
      } else if (typeof obj[key] === 'object') {
        obj[key] = decodeHTMLEntities(obj[key]);
      }
    }
  }

  return obj;
}

function shuffleArray(array) {
  const shuffledArray = [...array];

  // Fisher-Yates shuffle algorithm
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

function ensureTrueFirst(array) {
  const copiedArray = [...array];

  copiedArray.sort((a, b) => {
    if (a === "True") return -1;
    if (b === "True") return 1;
    return 0;
  });

  return copiedArray;
}

export default function Quiz() {
  const [redirect, setRedirect] = useState(null);
  const [data, setData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  function goBack() {
    setRedirect('Start');
  }

  useEffect(() => {
    async function fetchTriviaQuestions() {
      try {
        const response = await fetch('https://opentdb.com/api.php?amount=5');

        if (!response.ok) {
          throw Error('Failed to fetch data');
        }

        const fetchedData = await response.json();
        const cleanedData = decodeHTMLEntities(fetchedData);

        setData(cleanedData);

        const cleanedQuestions = cleanedData.results.map(question => {
          const answers = shuffleArray([...question.incorrect_answers, question.correct_answer]);
          return {
            ...question,
            answers: ensureTrueFirst(answers),
          };
        });

        setQuestions(cleanedQuestions);
        setSelectedAnswers(Array(cleanedQuestions.length).fill(null));
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
    }

    fetchTriviaQuestions();
  }, []);

  const handleAnswerSelection = (answer, answerIndex, questionIndex) => {
    if (!showResults) {
      const newSelectedAnswers = [...selectedAnswers];
      newSelectedAnswers[questionIndex] = answer;
      setSelectedAnswers(newSelectedAnswers);
    }
  };
  

  const handleSubmit = () => {
    setSubmitted(true);
  
    // Calculate the number of correct answers
    const correctAnswers = questions.filter((question, index) => {
      return selectedAnswers[index] === question.correct_answer;
    });
  
    setCorrectAnswersCount(correctAnswers.length);
  
    setShowResults(true);
  };
  

  return (
    <div>
      {redirect === "Start" ? (
        <Start />
      ) : (
        <div className="container">
          <ul>
            {questions.map((question, questionIndex) => (
              <li key={questionIndex}
                  className='questions'
              >
                {question.question}
                <ul>
                  {question.answers.map((answer, answerIndex) => (
                    <button
                      key={answerIndex}
                      onClick={() => handleAnswerSelection(answer, answerIndex, questionIndex)}
                      className={(() => {
                        if (submitted) {
                          if (answer === question.correct_answer) {
                            return 'correct-answer';
                          } else if (selectedAnswers[questionIndex] !== answer) {
                            // console.log(selectedAnswers)
                            return 'disabled-answer';
                          } else {
                            return 'base-answer';
                          }
                        } else {
                          if (selectedAnswers[questionIndex] === answer) {
                            return 'selected-answer'; } 
                          // else if (selectedAnswers[questionIndex] !== answer) {
                          //     // console.log(selectedAnswers)
                          //     return 'disabled-answer';
                          // } 
                          else {
                            return 'base-answer';
                          }
                        }
                      })()}
                      disabled={submitted}
                    >
                      {answer}
                  </button>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          {showResults ? (
            <div className="result--output">
              <p className="answer--count">{`You got ${correctAnswersCount} out of ${questions.length}!`}</p>
              <button 
                className="bottom-btn play--again"
                onClick={goBack}
              >
                Play Again
              </button>
            </div>
          ) : (
            <button
              className="bottom-btn"
              onClick={handleSubmit}
              >
                Check Answers
              </button>
          )}
        </div>
      )}
    </div>
  );
}
