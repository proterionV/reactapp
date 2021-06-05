import React from 'react';

export default class Menu extends React.Component {

    onShow = () => {
        document.getElementById("lis").className="show"
    }

    render() {
        return (
            <div className="menu">

                <div id="switch" className="off">
                    <button className="slider">Projects</button>
                </div>

                {/* <div id="lis" className="hide">
                    <li>Add Project</li>
                </div> */}

                <div>
                    <button className="btn-menu">Account</button>
                </div>

                <div>
                    <button className="btn-menu">Support</button>
                </div>

            </div>
        )
    }
}