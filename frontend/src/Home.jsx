import { useAuth } from "./context/AuthContext";
import { Link } from "react-router-dom";
import ToDo from "./ToDo";
import Header from "./components/Header";
function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return <main className="landing"><p>Loading your workspace...</p></main>;
  }

  if (!user) {
    return (
      <div className="app-shell">
        <Header />
        <main className="landing">
          <div className="landing-content">
            <span className="eyebrow">A quieter place to think</span>
            <h1>Make room for the ideas that matter.</h1>
            <p>Capture your daily notes, keep small promises to yourself, and move through your work with intention.</p>
            <Link className="primary-link" to="/signup">Create your workspace</Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Header />
      <main className="workspace">
        <div className="workspace-heading">
          <div>
            <span className="eyebrow">Your personal workspace</span>
            <h1 className="page-title">Good to see you, {user.fullName.split(" ")[0]}.</h1>
          </div>
          <span className="date-label">{new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}</span>
        </div>
        <ToDo />
      </main>
    </div>
  );
}

export default Home;
