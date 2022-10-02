import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeContainer from "./containers/Home";
import HandleRedirectContainer from "./containers/HandleRedirect";
import Darkmode from "@ysms/ts-darkmode";

function App() {
  // This creates a dark mode toggle button on your web.
  const darkmode = new Darkmode({ content: "🌓", buttonDarkColor: "#fff", buttonLightColor: "#141414" });
  darkmode.activeDark();
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomeContainer />
        </Route>
        <Route exact path="/:shortId">
          <HandleRedirectContainer />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
