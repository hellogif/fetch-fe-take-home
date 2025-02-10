"use client";

import styles from "./styles.module.scss";
import useLogin from "@/hooks/useLogin";

const LoginPage: React.FC = () => {
  // const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);
  const { login, loading, error } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    login(formData);
  };

  if (loading) {
    <div>Loading...</div>;
  }

  if (error) <div>Error: {error}</div>;

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor="firstName" className={styles.label}>
        First Name
        <input
          id="firstName"
          name="firstName"
          className={styles.input}
          type="text"
        />
      </label>

      <label htmlFor="lastName" className={styles.label}>
        Last Name
        <input
          id="lastName"
          name="lastName"
          className={styles.input}
          type="text"
        />
      </label>

      <label htmlFor="email" className={styles.label}>
        Email
        <input id="email" name="email" className={styles.input} type="email" />
      </label>

      <button type="submit" className={styles.button}>
        LOGIN
      </button>
    </form>
  );
};

export default LoginPage;
