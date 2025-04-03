import React, { useState, useEffect } from "react";
import "./MathCaptchaModal.css";

/**
 * Компонент модального окна с математической капчей
 * @param {Function} onSuccess - Функция, вызываемая при успешном решении капчи
 * @param {Function} onClose - Функция, вызываемая при закрытии модального окна
 */
const MathCaptchaModal = ({ onSuccess, onClose }) => {
  // Состояния для управления капчей
  const [question, setQuestion] = useState(""); // Текст математического примера
  const [answer, setAnswer] = useState(""); // Ответ пользователя
  const [correctAnswer, setCorrectAnswer] = useState(null); // Правильный ответ
  const [error, setError] = useState(false); // Флаг ошибки при неверном ответе

  /**
   * Генерирует случайное число от 0 до max
   * @param {number} max - Максимальное значение
   * @returns {number} Случайное число
   */
  const getRandomNumber = (max) => Math.floor(Math.random() * (max + 1));

  /**
   * Генерирует новый математический пример
   * Создает случайный пример сложения или вычитания с числами от 0 до 10
   */
  const generateQuestion = () => {
    const num1 = getRandomNumber(10);
    const num2 = getRandomNumber(10);
    const isAddition = Math.random() > 0.5;

    if (isAddition) {
      setQuestion(`${num1} + ${num2} = ?`);
      setCorrectAnswer(num1 + num2);
    } else {
      // Убедимся, что результат вычитания не будет отрицательным
      const larger = Math.max(num1, num2);
      const smaller = Math.min(num1, num2);
      setQuestion(`${larger} - ${smaller} = ?`);
      setCorrectAnswer(larger - smaller);
    }
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  /**
   * Обрабатывает отправку формы с ответом
   * Проверяет правильность ответа и вызывает соответствующие колбэки
   * @param {Event} e - Событие отправки формы
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const userAnswer = parseInt(answer, 10);

    if (userAnswer === correctAnswer) {
      onSuccess();
    } else {
      setError(true);
      setAnswer("");
      generateQuestion();
    }
  };

  return (
    <div className="math-captcha-overlay">
      <div className="math-captcha-modal">
        <h2>Solve the Example</h2>
        <form onSubmit={handleSubmit}>
          <div className="question">{question}</div>
          <input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter your answer"
            required
          />
          {error && (
            <div className="error">Wrong answer. Try a new example.</div>
          )}
          <div className="buttons">
            <button type="submit" className="button button-primary">
              Check
            </button>
            <button
              type="button"
              className="button button-danger"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MathCaptchaModal;
