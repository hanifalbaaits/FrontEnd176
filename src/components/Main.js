import React from 'react'
import { Switch, Route} from 'react-router-dom'
import Login from '../components/Login'
import Dashboard from '../components/Dashboard'
import apiConfig from '../config/api.config.json'

const Main = () => {
    return(
        <main>
            <Switch>
                <Route exact path ='/' render={() => (
                    localStorage.getItem(apiConfig.LS.TOKEN) == null ?(
                        <Route exact path='/' component={Login} />
                    ) : (
                        <Dashboard/>
                    )
                )} 
                />
                <Dashboard/>
            </Switch>
        </main>
    )
}

export default Main