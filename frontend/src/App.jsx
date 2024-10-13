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
      <div className={`${darkMode && "dark"} `}>
        <main className="text-gray-800 dark:text-white dark:bg-gray-800 w-dvw h-dvh">
          <div className= "bg-white dark:bg-gray-900 w-full justify-center">
            <div className="absolute top-4 right-4 flex items-center">
              <label htmlFor="dark-toggle" className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="dark-mode"
                    id="dark-toggle"
                    className="checkbox hidden"
                    onChange={toggleDarkMode}
                  />
                  <div className="block border-[1px] dark:border-white border-gray-900 w-14 h-8 rounded-full"></div>
                  <div className="dot absolute left-1 top-1 dark:bg-white bg-gray-800 w-6 h-6 rounded-full transition"></div>
                </div>
                <div className="ml-3 dark:text-white text-gray-900 font-medium">
                  Dark Mode
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
