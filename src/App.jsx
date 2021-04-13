import {  Route, Switch } from 'react-router-dom';
import Home from './Home';
import Recipe from './Recipe';

const App = (props) =>{
    return(
        <main>
        <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/recipe/:ID" component={Recipe} />
        </Switch>
    </main>
    )
}

export default App;