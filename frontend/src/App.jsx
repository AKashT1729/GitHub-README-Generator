import { useState } from "react";
import "./App.css";
import InputForm from "./components/InputForm";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <div className={`${darkMode ? "dark" : ""}`}>
        <main className="text-gray-800 dark:text-white dark:bg-gray-800 w-dvw h-dvh">
          <div className="bg-white dark:bg-gray-900 w-full justify-center">
            <div className="absolute top-4 right-4 flex items-center">
              <label htmlFor="dark-toggle" className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="dark-mode"
                    id="dark-toggle"
                    className="sr-only"
                    onChange={toggleDarkMode}
                  />
                  {/* Toggle background */}
                  <div className="block w-14 h-8 rounded-full bg-gray-400 dark:bg-gray-700"></div>
                  {/* Dot */}
                  <div
                    className={`dot absolute left-1 top-1 w-6 h-6 rounded-full transition transform ${
                      darkMode ? "translate-x-6 bg-gray-200" : "bg-gray-800"
                    }`}
                  ></div>
                </div>
                
              </label>
            </div>
          </div>
          <InputForm />
        </main>
      </div>
    </>
  );
}

export default App;
