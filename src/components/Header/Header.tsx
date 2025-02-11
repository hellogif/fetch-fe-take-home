"use client";

import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import styles from "./Header.module.scss";

const Header = () => {
  const { user } = useUser();
  const firstName = user?.firstName || "";
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  return (
    <div className={styles.header}>
      <h1>Adopt A Dog</h1>
      {user ? (
        <div>
          <button
            className={styles.dropdownButton}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {firstName}
          </button>
          {isDropdownOpen ? (
            <div className={styles.dropdownContent}>
              <a className={styles.dropdownLink} href="/dashboard">
                Dashboard
              </a>
              <a className={styles.dropdownLink} href="/logout">
                Logout
              </a>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default Header;
