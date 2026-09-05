import { useEffect, useState } from "react";

const API_URL = `${import.meta.env.VITE_API_URL}/todo`;

function Todo() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTodos() {
      try {
        const response = await fetch(API_URL, {
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            response.status === 401
              ? "Please sign in to load your todos"
              : data.message || "Could not load todos",
          );
        }

        setTodos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadTodos();
  }, []);

  async function addTodo(event) {
    event.preventDefault();

    if (!title.trim()) return;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, priority }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not create todo");
      }

      setTodos((currentTodos) => [data, ...currentTodos]);
      setTitle("");
      setPriority("medium");
      setError("");
    } catch (error) {
      setError(error.message);
    }
  }

  async function toggleTodo(todo) {
    try {
      const response = await fetch(`${API_URL}/${todo._id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !todo.completed }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not update note");

      setTodos((currentTodos) =>
        currentTodos.map((item) => item._id === data._id ? data : item),
      );
    } catch (error) {
      setError(error.message);
    }
  }

  async function deleteTodo(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Could not delete note");
      }

      setTodos((currentTodos) => currentTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      setError(error.message);
    }
  }

  const completedCount = todos.filter((todo) => todo.completed).length;
  const activeCount = todos.length - completedCount;
  const visibleTodos = todos
    .filter((todo) => {
      const matchesFilter = filter === "all" || (filter === "active" && !todo.completed) || (filter === "completed" && todo.completed);
      return matchesFilter && todo.title.toLowerCase().includes(search.toLowerCase());
    })
    .sort((first, second) => {
      if (sort === "priority") {
        const ranks = { high: 0, medium: 1, low: 2 };
        return ranks[first.priority] - ranks[second.priority];
      }
      return sort === "oldest"
        ? new Date(first.createdAt) - new Date(second.createdAt)
        : new Date(second.createdAt) - new Date(first.createdAt);
    });

  if (loading) return <p>Loading todos...</p>;

  return (
    <section className="dashboard-grid">
      <aside className="sidebar">
        <div className="stat-card">
          <div className="stat-label">Completion rate</div>
          <div className="stat-value">{todos.length ? Math.round((completedCount / todos.length) * 100) : 0}%</div>
          <div className="stat-label">{completedCount} of {todos.length} notes done</div>
        </div>
        <div className="filter-list">
          {[['all', 'All notes', todos.length], ['active', 'In progress', activeCount], ['completed', 'Completed', completedCount]].map(([value, label, count]) => (
            <button className={`filter-button ${filter === value ? "active" : ""}`} key={value} onClick={() => setFilter(value)}>
              {label}<span className="filter-count">{count}</span>
            </button>
          ))}
        </div>
      </aside>

      <div className="notes-panel">
        <div className="notes-toolbar">
          <input className="search-box" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search your notes..." />
          <select className="sort-select" value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort notes">
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="priority">By priority</option>
          </select>
        </div>

        <form className="note-form" onSubmit={addTodo}>
        <input
          className="note-input"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Capture a thought or next step..."
        />

        <select
          className="priority-select"
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button className="primary-button" type="submit">Add note</button>
        </form>

        {error && <p className="error-message">{error}</p>}

        <div className="notes-list">
          {visibleTodos.length ? visibleTodos.map((todo) => (
            <article className="note-card" key={todo._id}>
              <button className={`check-button ${todo.completed ? "checked" : ""}`} onClick={() => toggleTodo(todo)} aria-label={todo.completed ? "Mark note active" : "Mark note complete"}>
                {todo.completed ? "✓" : ""}
              </button>

              <div className="note-content">
                <div className={`note-title ${todo.completed ? "completed" : ""}`}>{todo.title}</div>
                <div className="note-meta">
                  <span className={`priority-${todo.priority}`}>{todo.priority}</span>
                  <span>{new Date(todo.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                </div>
              </div>

              <button className="delete-button" onClick={() => deleteTodo(todo._id)}>Remove</button>
            </article>
          )) : <div className="empty-state">{search ? "No notes match your search." : "Your page is clear. Add the first note above."}</div>}
        </div>
      </div>
    </section>
  );
}

export default Todo;