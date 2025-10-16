import Button from "../components/ui/Button";

function TestPage() {
    return (
        <>
            <div className="container">
                <h1 style={{ color: "var(--color-primary)" }}>Primary primary</h1>
                <p style={{ color: "var(--color-text-primary)" }}>
                    This is a test page to display primary, secondary, accent, and neutral colors.
                </p>

                <div className="color-row">
                    <div style={{ backgroundColor: "var(--color-primary-lightest)" }}>Lightest</div>
                    <div style={{ backgroundColor: "var(--color-primary-lighter)" }}>Lighter</div>
                    <div style={{ backgroundColor: "var(--color-primary-light)" }}>Light</div>
                    <div style={{ backgroundColor: "var(--color-primary)" }}>Primary</div>
                    <div style={{ backgroundColor: "var(--color-primary-dark)" }}>Dark</div>
                    <div style={{ backgroundColor: "var(--color-primary-darker)" }}>Darker</div>
                    <div style={{ backgroundColor: "var(--color-primary-darkest)" }}>Darkest</div>
                </div>

                <div className="color-row">
                    <div style={{ backgroundColor: "var(--color-secondary)" }}>Secondary</div>
                    <div style={{ backgroundColor: "var(--color-accent)" }}>Accent</div>
                </div>

                <Button>
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

export default TestPage;
