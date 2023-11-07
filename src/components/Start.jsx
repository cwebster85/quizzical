import '../styles/Start.css'
import Quiz from '../components/Quiz'
import { useState } from 'react'

export default function Start() {
    const [redirect, setRedirect] = useState(null)
    // redirect using state
    function goToQuizPage() {
        setRedirect('Quiz')
    }

    return (
        <div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="158"
                height="141"
                viewBox="0 0 158 141"
                fill="none"
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    zIndex: -1
                }}
            >
                <path className="blob--top" d="M63.4095 81.3947C35.1213 50.8508 -2.68211 21.7816 1.17274 -19.6933C5.43941 -65.599 39.854 -105.359 82.4191 -123.133C122.797 -139.994 170.035 -130.256 205.822 -105.149C235.947 -84.0141 236.823 -43.8756 246.141 -8.27104C256.17 30.0508 282.521 70.8106 260.501 103.779C237.538 138.159 188.991 143.432 147.931 138.768C112.318 134.723 87.7505 107.677 63.4095 81.3947Z" fill="#FFFAD1"/>
            </svg>
            {redirect === 'Quiz' ? (
                <Quiz />
            ) 
            :
            (
            <div className='container'>
                <h1>Quizzical</h1>
                <h4>Click start to begin</h4>
                <button 
                    className='start-btn'
                    onClick={goToQuizPage} 
                >
                    Start
                </button>
            </div>
            )}
             <svg
                xmlns="http://www.w3.org/2000/svg"
                width="158"
                height="141"
                viewBox="0 0 158 141"
                fill="none"
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    zIndex: -1
                }}
            >
                <path className="blob--bottom" d="M-5.55191 4.90596C35.9614 1.77498 82.2425 -9.72149 112.306 19.1094C145.581 51.0203 155.282 102.703 142.701 147.081C130.767 189.18 93.7448 220.092 51.8208 232.476C16.5281 242.902 -15.4332 218.605 -49.1007 203.738C-85.3375 187.737 -133.641 182.993 -145.741 145.239C-158.358 105.868 -132.269 64.5881 -103.064 35.3528C-77.7328 9.99541 -41.2727 7.60006 -5.55191 4.90596Z" fill="#DEEBF8"/>
            </svg>
        </div> 
        )
    }
