import React , {useState} from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";
// 8c8aebfde56c4fd088bc56e61fa751ba
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () =>  {

    const [progress, setProgress] = useState(0);

    const apiKey = process.env.REACT_APP_NEWS_API;

	const setThisProgress = (progress)=>{
		setProgress(progress + 1);
	};


    return (
        <>
            <Router>
                <Navbar />
                <LoadingBar color="#f11946" progress={progress} />
                <Switch>
                    <Route exact path="/">
                        <News apiKey={apiKey}  setProgress={setThisProgress} 
                            key="general"
                            pageSize={9}
                            country="in"
                            category="general"
                        />
                    </Route>
                    <Route exact path="/business">
                        <News apiKey={apiKey}  setProgress={setThisProgress} 
                            key="business"
                            pageSize={9}
                            country="in"
                            category="business"
                        />
                    </Route>
                    <Route exact path="/entertainment">
                        <News apiKey={apiKey}  setProgress={setThisProgress} 
                            key="entertainment"
                            pageSize={9}
                            country="in"
                            category="entertainment"
                        />
                    </Route>
                    <Route exact path="/health">
                        <News apiKey={apiKey}  setProgress={setThisProgress} 
                            key="health"
                            pageSize={9}
                            country="in"
                            category="health"
                        />
                    </Route>
                    <Route exact path="/science">
                        <News apiKey={apiKey}  setProgress={setThisProgress} 
                            key="science"
                            pageSize={9}
                            country="in"
                            category="science"
                        />
                    </Route>
                    <Route exact path="/sports">
                        <News apiKey={apiKey}  setProgress={setThisProgress} 
                            key="sports"
                            pageSize={9}
                            country="in"
                            category="sports"
                        />
                    </Route>
                    <Route exact path="/technology">
                        <News apiKey={apiKey}  setProgress={setThisProgress} 
                            key="technology"
                            pageSize={9}
                            country="in"
                            category="technology"
                        />
                    </Route>
                </Switch>
            </Router>
        </>
    );
    
}

export default App;