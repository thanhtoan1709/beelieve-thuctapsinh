import React from "react";
import ReactDOM from 'react-dom';
import Sidebar from '../Components/SideBar/SideBar.jsx';
import Product from './Product/Products.jsx';
import WeatherForecast from '../Components/WeatherForecast/WeatherForecast.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

ReactDOM.render(<WeatherForecast />, document.getElementById('root'));

const Home = () => {
    return (
        <div className="container-fluid">
            
            <div className="row">
                {/* <!-- Sidebar Column --> */}
                <div className="col-2">
                <div className=" p-0 " >
                    {/* <!-- Sidebar Content Here --> */}
                    <Sidebar />
                </div>
                </div>
                {/* <!-- Products Column --> */}
                <div className="col-10">
                <div className=" p-0">
                    {/* <!-- Sidebar Content Here --> */}
                    <WeatherForecast />
                </div>
                <div className=" p-1">
                    {/* <!-- Products Content Here --> */}
                    <Product />
                </div>
                </div>
            </div>
            </div>
    )
}


export default Home


