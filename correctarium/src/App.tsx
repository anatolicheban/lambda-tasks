import React, { useRef, useState, useEffect } from "react";
import { languages } from "./data/data";
import { Lang } from "./models/models";
import { getDeadline } from "./utils/getDeadline";
import { useGetResults } from "./hooks/useGetResults";

function App() {
  const [textFile, setTextFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [language, setLanguage] = useState<Lang>("UA");
  const langTitle = languages.find((item) => item.value === language)?.title;

  const { price, time, deadline } = useGetResults({
    lang: language,
    mimetype: "none",
    chars: text.length,
    date: new Date().toISOString(),
  });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (e.target !== buttonRef.current) {
        setIsDropdownOpen(false);
      }
    };
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, []);

  const inputBtnHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    inputRef.current?.click();
  };

  const fileInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles as ArrayLike<File>);
    setTextFile(selectedFilesArray[0]);
  };
  return (
    <div className="container">
      <h1 className="title">Замовити редагування</h1>
      <div className="order">
        <div className="order__form">
          <div className="order__text">
            {!text.length && (
              <label htmlFor="text-input" className="order__text-placeholder">
                Введіть текст або <button onClick={inputBtnHandler}>завантажте файл</button>
              </label>
            )}
            <textarea
              id="text-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              autoComplete="off"
            ></textarea>
            <input
              onChange={fileInputHandler}
              ref={inputRef}
              type={"file"}
              accept=".docx, .doc, .rtf"
              style={{ display: "none" }}
            />
          </div>
          <h3 className="title">Оберіть мову</h3>
          <div className="order__lang">
            <button ref={buttonRef} onClick={() => setIsDropdownOpen((prev) => !prev)}>
              {langTitle}
            </button>
            {isDropdownOpen && (
              <ul>
                {languages.map((item) => (
                  <li key={item.value}>
                    <button onClick={() => setLanguage(item.value)}>{item.title}</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="order__result">
          <div className="order__result-box">
            <h3>Ціна - {price} грн</h3>
            <h2>Час - {time} г.</h2>
            <h4>Строк до:</h4>
            <h3>{deadline}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
