// App.jsx
import "./index.css";
import Button from "./components/ui/Button";

function App() {
  return (
    <>
      <div className="container">
        <h1 style={{ color: "var(--color-brown)" }}>Primary Brown</h1>
        <p style={{ color: "var(--color-text-primary)" }}>
          This is a test page to display primary, secondary, accent, and neutral colors.
        </p>

        <div className="color-row">
          <div style={{ backgroundColor: "var(--color-brown-lightest)" }}>Lightest</div>
          <div style={{ backgroundColor: "var(--color-brown-lighter)" }}>Lighter</div>
          <div style={{ backgroundColor: "var(--color-brown-light)" }}>Light</div>
          <div style={{ backgroundColor: "var(--color-brown)" }}>Primary</div>
          <div style={{ backgroundColor: "var(--color-brown-dark)" }}>Dark</div>
          <div style={{ backgroundColor: "var(--color-brown-darker)" }}>Darker</div>
          <div style={{ backgroundColor: "var(--color-brown-darkest)" }}>Darkest</div>
        </div>

        <div className="color-row">
          <div style={{ backgroundColor: "var(--color-secondary)" }}>Secondary</div>
          <div style={{ backgroundColor: "var(--color-accent)" }}>Accent</div>
        </div>

        <Button color="secondary">
          Play
        </Button>
        <div className="color-row">
          <div style={{ backgroundColor: "var(--color-neutral-light)" }}>Neutral Light</div>
          <div style={{ backgroundColor: "var(--color-neutral)" }}>Neutral</div>
          <div style={{ backgroundColor: "var(--color-neutral-dark)" }}>Neutral Dark</div>
        </div>
      </div>
    </>
  );
}

export default App;
