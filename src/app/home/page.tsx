import { useUser } from "@/contexts/UserContext";
import SearchPage from "../search/page";
import LoginPage from "../login/page";

const Home: React.FC = () => {
  const { user } = useUser();
  const loggedInUser = user?.firstName && user?.lastName && user?.email;

  return <div>{loggedInUser ? <SearchPage /> : <LoginPage />}</div>;
};

export default Home;
