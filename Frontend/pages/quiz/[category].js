import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Timer80s from '../../components/Timer80s';
import QuestionCard from '../../components/QuestionCard';
import axios from 'axios';

export default function QuizPage() {
  const router = useRouter();
  const { category } = router.query;
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [timeUpFlag, setTimeUpFlag] = useState(false);

  useEffect(() => {
    if (!category) return;
    axios.post('/api/quiz/start', { categoryId: category, numQuestions: 10 })
      .then(res => setQuestions(res.data.map(q => ({
        ...q,
        options: q.options
      }))));
  }, [category]);

  const handleAnswer = async (qid, idx) => {
    const res = await axios.post('/api/quiz/answer', { questionId: qid, selectedOptionIndex: idx });
    return res.data;
  };

  const nextQuestion = () => {
    setTimeUpFlag(false);
    setCurrent(prev => prev + 1);
  };

  if (!questions.length) return <p>Carregando questões…</p>;
  if (current >= questions.length) return <p>Quiz concluído!</p>;

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl">Pergunta {current + 1}/{questions.length}</h2>
        <Timer80s onTimeUp={() => setTimeUpFlag(true)} />
      </div>

      <QuestionCard
        question={questions[current]}
        onAnswer={handleAnswer}
        timeUp={timeUpFlag}
      />

      {timeUpFlag || /* se respondeu */ false ? (
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={nextQuestion}
        >
          Seguinte
        </button>
      ) : null}
    </div>
  );
}
