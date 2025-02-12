"use client";

import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import styles from "./Header.module.scss";
import Link from "next/link";
import { Avatar, HStack, Box } from "@chakra-ui/react";

const Header = () => {
  const { user, setUser } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className={styles.header}>
      <h1>Adopt A Dog</h1>
      {user ? (
        <div>
          <button
            className={styles.dropdownButton}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <HStack>
              <Avatar.Icon
                name={`${user.firstName} ${user.lastName}`}
                // size="sm"
              />
              <Box>{user.firstName}</Box>
            </HStack>
          </button>
          {isDropdownOpen && (
            <div className={styles.dropdownContent}>
              <Link className={styles.dropdownLink} href="/dashboard">
                Dashboard
              </Link>
              <Link
                onClick={() => setUser(null)}
                className={styles.dropdownLink}
                href="/"
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </div>
  );
};

export default Header;
