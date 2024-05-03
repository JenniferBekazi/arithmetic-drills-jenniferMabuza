import React, { useState, useEffect } from 'react';
import './App.css';
import ErrorBoundary from './ErrorBoundary';
import catIcon from './assets/icons/butterfly.png';
import owlIcon from './assets/icons/owl.webp';
import crocodileIcon from './assets/icons/crocodile.png';
import tigerIcon from './assets/icons/tiger.png';
import tortoiseIcon from './assets/icons/tortoise.png';
import elephantIcon from './assets/icons/elephant.png';
import treeIcon from './assets/icons/tree.webp';



function App() {
  
  const totalQuestions = 10;
  const [currentProblem, setCurrentProblem] = useState(generateProblem());
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [problemCount, setProblemCount] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [gameOver, setGameOver] = useState(false);

  function generateProblem() {
    const operators = ['+', '-', '*', '/'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    let num1, num2;

    switch (operator) {
      case '+':
      case '-':
        num1 = Math.floor(Math.random() * 50) + 1;
        num2 = Math.floor(Math.random() * 50) + 1;
        break;
      case '*':
        num1 = Math.floor(Math.random() * 12) + 1;
        num2 = Math.floor(Math.random() * 12) + 1;
        break;
      case '/':
        num1 = Math.floor(Math.random() * 12) + 1;
        num2 = Math.floor(Math.random() * 11) + 1; // Ensure no division by zero
        break;
      default:
        num1 = 1;
        num2 = 1;
    }
    return { num1, operator, num2 };
  }


  function handleAnswer() {
    try {
        const correctAnswer = eval(`${currentProblem.num1} ${currentProblem.operator} ${currentProblem.num2}`);
        if (parseInt(userAnswer, 10) === correctAnswer) {
            setFeedback('Correct!');
            setScore(score + 1);
        } else {
            setFeedback('Wrong Answer!');
        }

        if (problemCount + 1 < totalQuestions) {
            setProblemCount(problemCount + 1);
            setCurrentProblem(generateProblem());
        } else {
            setGameOver(true);
        }
    } catch (error) {
        console.error("Error in handling the answer:", error);
        setFeedback("An error occurred while processing your answer. Please try again.");
    }
    setUserAnswer('');
}


  function restartGame() {
    setScore(0);
    setProblemCount(0);
    setFeedback('');
    setCurrentProblem(generateProblem());
    setGameOver(false);
  }
  function exitGame() {
   
    setUserAnswer('');
    setFeedback('Thank you for practicing! Click button START NEW GAME to start again or close this tab to exit.');
    setGameOver(true); // Ensure no further actions can be taken in the game
}


  useEffect(() => {
    if (gameOver) {
      setFeedback(`Game over! Your final score is ${score} out of ${totalQuestions}.`);
    }
  }, [gameOver, score]);

// In your return/render method:
return (
  <div className="App">
    <img src={catIcon} alt="Butterfly" className="Animal-icon" />
    <img src={owlIcon} alt="Owl" className="Animal1-icon" />
    <img src={crocodileIcon} alt="crocodile" className="Animal2-icon" />
    
    <h1>Arithmetic Drills for Kids</h1>
    <img src={tigerIcon} alt="tiger" className="Animal3-icon" />
    {!gameOver && (
      <div>
        <div className="problem">
          {`${currentProblem.num1} ${currentProblem.operator} ${currentProblem.num2}`}
        </div>
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          autoFocus
        />
        <button onClick={handleAnswer}>Submit</button>
        <div>{feedback}</div>
      </div>
    )}
    {!gameOver ? (
      <button onClick={restartGame}>Start New Game</button>
    ) : (
      <div>
        <div>{feedback}</div>
        <button onClick={restartGame}>Start New Game</button>
        <button onClick={exitGame}>Exit</button>
      </div>
    )}
     <img src={tortoiseIcon} alt="tortoise" className="Animal4-icon" />
     <img src={elephantIcon} alt="elephant" className="Animal5-icon" />
  </div>
);





}

export default App;
