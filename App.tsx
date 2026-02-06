import { useState } from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/HomePage";
import { StudentsPage } from "./pages/StudentsPage";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <BrowserRouter>
      <div className="app-shell">
        {/* Left Sidebar */}
        <aside className="sidebar">
          <div className="logo">
            🎓 <span>StudentHub</span>
          </div>

          {/* Search Bar */}
          <div className="search-bar">
            <input
              type="search"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search students"
            />
            <button
              type="button"
              onClick={() => {
                alert(`Searching for: ${searchTerm}`);
              }}
              aria-label="Search"
            >
              🔍
            </button>
          </div>

          <nav className="nav">
            <NavLink to="/" end className="nav-link">
              <span className="icon">🏠</span>
              <span>Home</span>
            </NavLink>

            <NavLink to="/students" className="nav-link">
              <span className="icon">👥</span>
              <span>Students</span>
            </NavLink>
          </nav>

          <div className="sidebar-footer">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2f/WWE_logo.svg"
              alt="WWE Logo"
              className="avatar"
            />
            <div>
              <strong>Admin</strong>
              <small>@studenthub</small>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/students"
              element={<StudentsPage searchTerm={searchTerm} />}
            />
          </Routes>
        </main>

        {/* Right Sidebar */}
        <aside className="rightbar">
          <div className="card">
            <h4>📌 About</h4>
            <p>Manage and explore student data in a clean dashboard.</p>
          </div>

          <div className="card highlight">
            <h4>✨ Tip</h4>
            <p>Click a student to view more details.</p>
          </div>
        </aside>
      </div>
    </BrowserRouter>
  );
}

export default App;
