import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { UserContextWrapper } from './utils/UseUserContext'
import App from './App'
import './utils/InitFontAwesomeIcons'
import './public/index.css'

ReactDOM.render(
    <UserContextWrapper>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </UserContextWrapper>,
    document.getElementById('root'))


serviceWorkerRegistration.register()
