import { useAuth } from "./context/AuthContext";
import ToDo from "./ToDo";
import Header from "./components/Header";
function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return (
      <div>
        <Header />

        <h1>Welcome to Todo App</h1>

        <p>Login to get started and manage your todos.</p>

        <a href="/signin">Login</a>
        <a href="/signup">Create Account</a>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <h1>Welcome, {user.fullName}</h1>
      <ToDo />
    </div>
  );
}

export default Home;
