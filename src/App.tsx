import React from "react";

import FileExplorer from "./components/FileExplorer";

function App() {
  return (
    <>
      <div className="max-w-md mx-auto flex p-6 bg-gray-100 my-8 rounded-lg shadow-xl">
        <div className="ml-6 pt-1 mb-4">
          <h1 className="text-2xl text-red-700 leading-tight">
            Tailwind and Create React App
          </h1>
        </div>
      </div>
      <FileExplorer />
    </>
  );
}

export default App;
