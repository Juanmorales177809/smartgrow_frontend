import React, { Fragment } from "react";
import './HomeStyles.css'
import textos from './homejson.json'
import 'bootstrap/dist/css/bootstrap.min.css';





function HomePage() {
    
    return (
        <Fragment>
            
            <hr class="linea"></hr>
            <div className="container">
            <h2 class="te">
                {textos.Titulo}
            </h2>
            </div>
            <div className="row">

            </div>
            <hr class="linea line0"></hr>
            <div class="row row0">
            </div>
            <div className="container">
            <div class="mi-h2">
                {textos.Resumen}
            </div>
            </div>
        </Fragment>

    )
}
export default HomePage;