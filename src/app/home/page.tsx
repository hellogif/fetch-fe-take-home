"use client";

import { useUser } from "@/contexts/UserContext";
import SearchPage from "../search/page";
import LoginPage from "../login/page";

const Home: React.FC = () => {
  const { user } = useUser();
  const loggedInUser = user?.firstName && user?.lastName && user?.email;

  return (
    <div>
      {loggedInUser ? (
        // <div>
        //   <h2>Enter Your Location</h2>
        //   <label>
        //     Zip Code:
        //     <input type="text" pattern="[0-9]{5}" />
        //   </label>
        //   <label>
        //     City:
        //     <input type="text" />
        //   </label>
        //   <label>
        //     State:
        //     <input type="text" />
        //   </label>
        // </div>
        <SearchPage />
      ) : (
        <LoginPage />
      )}
    </div>
  );
};

export default Home;
