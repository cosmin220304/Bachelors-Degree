import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import registerServiceWorker from "./registerServiceWorker"
import App from "./App"
import { UserContextWrapper } from "./utils/UseUserContext"
import './utils/InitFontAwesomeIcons'
import './public/index.css'

ReactDOM.render(
    <UserContextWrapper>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </UserContextWrapper>,
    document.getElementById("root"))

registerServiceWorker()

