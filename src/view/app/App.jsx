import Router from "../../routes/Router";
import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <Link to="/white-taxes">
        <button>white-taxes</button>
      </Link>
      <Link to="/profile">
        <button>Profile</button>
      </Link>
      <Router />
    </div>
  );
}

export default App;
