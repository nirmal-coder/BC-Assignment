import "./App.css";
import Inbox from "../src/Pages/Inbox";

function App() {
  let lastWidth = window.innerWidth;

  window.addEventListener("resize", () => {
    const currentWidth = window.innerWidth;

    if (currentWidth !== lastWidth) {
      lastWidth = currentWidth;
      window.location.reload();
    }
  });
  return <Inbox />;
}

export default App;
