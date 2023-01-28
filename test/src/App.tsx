import { useState } from "react";
import RSWE from "rswe/dist";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-screen h-screen bg-sky-700">
      <RSWE />
    </div>
  );
}

export default App;
