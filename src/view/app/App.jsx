import Router from "../../api/routes/Router";
import { Link } from "react-router-dom";

function App() {

  return (
    <div>
      <Link to='/white-taxes'><button>white-taxes</button></Link>
      <Link to='/'><button>home</button></Link>
      <Router />
    </div>
  );
}

export default App;
