import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const clickme = async () => {
    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      if (!tab || !tab.id) {
        console.error("No active tab found.");
        return;
      }

      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          console.log("Injecting dark mode styles...");

          // document.body.style.backgroundColor = "#121212"; // Dark background
          document.body.style.color = "#ffffff"; // White text

          // Style all divs that are direct children of body
          const divs = document.querySelectorAll("div");
          console.log(`Found ${divs.length} divs.`);
          divs.forEach((div) => {
            const divElement = div as HTMLDivElement;
            divElement.style.color = "#ffffff"; // White text
          });

          const inputs = document.querySelectorAll("input");
          console.log(`Found ${inputs.length} input fields.`);
          inputs.forEach((input) => {
            (input as HTMLInputElement).style.backgroundColor = "#333333";
            input.style.color = "#ffffff";

            input.style.backgroundColor = "#121212";
            input.style.border = "1px solid #666";
          });

          // Check if the color is gray
          const isGray = (rgb: string) => {
            const match = rgb.match(/^rgb\((\d+), (\d+), (\d+)\)$/);
            if (match) {
              const r = parseInt(match[1]);
              const g = parseInt(match[2]);
              const b = parseInt(match[3]);
              // Check if the RGB values are close to each other (gray color)
              return r === g && g === b;
            }
            return false;
          };

          // Apply styles to all elements
          const allElements = document.querySelectorAll("*");
          console.log(`Found ${allElements.length} elements.`);
          allElements.forEach((element) => {
            const computedStyle = window.getComputedStyle(element);
            const genericElement = element as HTMLElement;

            if (computedStyle.backgroundColor === "rgb(255, 255, 255)") {
              genericElement.style.backgroundColor = "rgb(0, 0, 0)";
            }

            // Change gray text to white
            if (isGray(computedStyle.color)) {
              genericElement.style.color = "rgb(255, 255, 255)";
            }

            // Change black text to white
            if (computedStyle.color === "rgb(0, 0, 0)") {
              genericElement.style.color = "rgb(255, 255, 255)";
            }
            if (genericElement.tagName === "H1") {
              genericElement.style.color = "rgb(255, 255, 255)"; // Change color of h1 to white
            }
            if (
              genericElement.tagName === "P" ||
              genericElement.tagName === "SPAN"
            ) {
              genericElement.style.color = "rgb(255, 255, 255)"; // Change color of h1 to white
            }
          });
        },
      });
    } catch (error) {
      console.error("Error executing script:", error);
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + TypeScript</h1>
      <div className="card">
        <button onClick={clickme}>Enable Dark Mode</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
