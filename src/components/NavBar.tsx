import { NavLink } from "react-router-dom";

const links = [
  { href: "/", label: "Overview" },
  { href: "/approvals", label: "Approvals" },
  { href: "/incidents", label: "Incidents" },
  { href: "/reissue", label: "Reissue" },
  { href: "/governance", label: "Governance" },
];

function NavBar() {
  return (
    <nav className="card nav">
      {links.map((link) => (
        <NavLink
          key={link.href}
          to={link.href}
          className={({ isActive }) => (isActive ? "active" : undefined)}
          end={link.href === "/"}
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}

export default NavBar;
