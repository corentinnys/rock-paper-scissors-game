import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { useState } from "react";

function App() {

    const [score, setScore] = useState(0);
    const [player, setPlayer] = useState(null);
    const [house, setHouse] = useState(null);
    const [thinking, setThinking] = useState(false)
    const [result, setResult] = useState(null)

    const play = (choice) => {
        setPlayer(choice);
        setThinking(true);
        setResult(null);

        const choices = ["rock", "paper", "scissors"];

        setTimeout(() => {
            const random = choices[Math.floor(Math.random() * 3)];
            setHouse(random);
            setThinking(false);

            // logique du résultat
            if (choice === random) {
                setResult("draw");
            }
            else if (
                (choice === "rock" && random === "scissors") ||
                (choice === "scissors" && random === "paper") ||
                (choice === "paper" && random === "rock")
            ) {
                setResult("win");
                setScore(prev => prev + 1);
            }
            else {
                setResult("lose");
            }

        }, 1500);
    };

    return (
        <div className="container">

            <div className="row">
                <div className="col-2"></div>

                <div className="col-8 border mt-5 p-3 rounded-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <img src="/images/logo.svg" alt="logo" />

                        <div className="p-2 bg-white d-flex flex-column justify-content-center align-items-center rounded-3">
                            score
                            <span className="fs-1">{score}</span>
                        </div>
                    </div>
                </div>

                <div className="col-2"></div>
            </div>

            {player === null ? (
                <div className="game col-8 d-flex justify-content-center align-items-center">
                    <div
                        style={{
                            backgroundImage: "url(/images/bg-triangle.svg)",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            width: "400px",
                            height: "400px",
                            position: "relative",
                            left: "200px",
                            top: "100px",
                        }}
                    >
                        <div
                            className="bg-primary d-flex justify-content-center align-items-center rounded-circle"
                            style={{ width: "170px", height: "170px" }}
                        >
                            <img
                                src="/images/icon-rock.svg"
                                alt="rock"
                                onClick={() => play("rock")}
                            />
                        </div>

                        <div
                            className="bg-warning d-flex justify-content-center align-items-center rounded-circle paper"
                            style={{ width: "170px", height: "170px" }}
                        >
                            <img
                                src="/images/icon-paper.svg"
                                alt="paper"
                                onClick={() => play("paper")}
                            />
                        </div>

                        <div
                            className="bg-danger d-flex justify-content-center align-items-center rounded-circle scissors"
                            style={{ width: "170px", height: "170px" }}
                        >
                            <img
                                src="/images/icon-scissors.svg"
                                alt="scissors"
                                onClick={() => play("scissors")}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="d-flex justify-content-center align-items-center gap-5 mt-4">

                    <div className="text-center">
                        <h4>YOU PICKED</h4>
                        <img
                            src={`/images/icon-${player}.svg`}
                            alt={player}
                            style={{ width: "120px" }}
                        />
                    </div>

                    {result && (
                        <div className="text-center">
                            {result === "win" && <h2 className="text-success">YOU WIN 🎉</h2>}
                            {result === "lose" && <h2 className="text-danger">YOU LOSE 😢</h2>}
                            {result === "draw" && <h2 className="text-warning">DRAW 🤝</h2>}

                            <button
                                className="btn btn-dark mt-3"
                                onClick={() => {
                                    setPlayer(null);
                                    setHouse(null);
                                    setResult(null);
                                    setThinking(false);
                                }}
                            >
                                PLAY AGAIN
                            </button>
                        </div>
                    )}

                    <div className="text-center">
                        <h4>THE HOUSE PICKED</h4>
                        {house && (
                        <img
                            src={`/images/icon-${house}.svg`}
                            alt={house}
                            style={{ width: "120px" }}
                        />
                        )}
                    </div>

                </div>
            )}

        </div>
    );
}

export default App;