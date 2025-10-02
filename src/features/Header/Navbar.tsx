import { Badge } from "@radix-ui/themes";
import { Link, useLocation } from "@tanstack/react-router";
import { useAtomValue } from "jotai";
import { agaveAgentStateAtom } from "../../api/agaveAtoms";
import Logo from "./Logo";
import styles from "./navbar.module.css";

export default function Navbar() {
  const location = useLocation();
  const agaveState = useAtomValue(agaveAgentStateAtom);

  const navItems = [
    { path: "/", label: "Overview" },
    { path: "/leaderSchedule", label: "Leader Schedule" },
    { path: "/gossip", label: "Gossip" },
    { path: "/slotDetails", label: "Slot Details" },
    { path: "/about", label: "About" },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContent}>
        {/* Logo Section */}
        <div className={styles.logoSection}>
          <Logo />
        </div>

        {/* Navigation Links */}
        <div className={styles.navLinks}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Status Section */}
        <div className={styles.statusSection}>
          <Badge
            variant="soft"
            color={agaveState.connected ? "green" : "red"}
            size="2"
          >
            {agaveState.connected ? "● Connected" : "○ Disconnected"}
          </Badge>
          {agaveState.version && (
            <Badge variant="outline" color="gray" size="1">
              v{agaveState.version}
            </Badge>
          )}
        </div>
      </div>
    </nav>
  );
}
