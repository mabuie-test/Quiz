import { useState } from 'react';

export default function QuestionCard({ question, onAnswer, timeUp }) {
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const handleSelect = idx => {
    setSelected(idx);
    onAnswer(question._id, idx).then(res => {
      setFeedback(res);
    });
  };

  return (
    <div className="p-4 border rounded">
      <p className="mb-3">{question.text}</p>
      <ul>
        {question.options.map((opt, i) => (
          <li key={i}>
            <button
              className={`block w-full my-1 p-2 border ${selected===i?'bg-gray-200':''}`}
              disabled={feedback !== null}
              onClick={() => handleSelect(i)}
            >
              {opt}
            </button>
          </li>
        ))}
      </ul>
      {feedback && (
        <div className={`mt-3 p-2 ${feedback.correct? 'bg-green-100':'bg-red-100'}`}>
          {feedback.correct ? 'Correto!' : 'Incorreto.'}
          <p className="mt-1 italic">{feedback.explanation}</p>
        </div>
      )}
      {timeUp && !feedback && (
        <p className="mt-2 text-red-600">Tempo esgotado! {/** pode chamar onAnswer com null **/}</p>
      )}
    </div>
  );
}
