"use client";

import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import styles from "./Header.module.scss";
import Link from "next/link";

const Header = () => {
  const { user, setUser } = useUser();
  const firstName = user?.firstName;
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  //TODO: Make user load before this page renders
  return (
    <div className={styles.header}>
      <h1>Adopt A Dog</h1>
      {user?.firstName ? (
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
              <button onClick={() => setUser(null)}>
                <Link className={styles.dropdownLink} href="/">
                  Logout
                </Link>
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default Header;
