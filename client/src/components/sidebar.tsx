import { Link, useLocation } from "wouter";

interface SidebarProps {}

export default function Sidebar({}: SidebarProps) {
  const [location] = useLocation();

  return (
    <div className="sidebar">
      <div className="logo">
        <i className="fas fa-heart"></i>
        <span>Healthcare</span>
      </div>
      <ul className="nav-menu">
        <li className="nav-item">
          <Link href="/" className={`nav-link ${location === "/" ? "active" : ""}`}>
            <i className="fas fa-home"></i>
            Home
          </Link>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="fas fa-user"></i>
            Profile
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="fas fa-cog"></i>
            Settings
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            <i className="fas fa-question-circle"></i>
            Support
          </a>
        </li>
      </ul>
    </div>
  );
}
