import React from 'react'
import Table from './Table.js'
import Graph from './Graph.js'

let activities = []
let parameters = []
let result = ''

export default class Field extends React.Component {

    constructor(props) {
        super(props);
        this.state = {userID: '', dateRegistration: '', dateLastActivity: ''};

        this.onChangeID = this.onChangeID.bind(this);
        this.onChangeReg = this.onChangeReg.bind(this);
        this.onChangeLast = this.onChangeLast.bind(this);
    }

    onChangeID = (e) => this.setState({userID: Math.round(e.target.value, 0)});
    onChangeReg = (e) => this.setState({dateRegistration: e.target.value})
    onChangeLast = (e) => this.setState({dateLastActivity: e.target.value})

    async componentDidMount() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        try {
            const response = await fetch('https://localhost:44303/main/all', requestOptions);
            const data = await response.json();

            if (response.ok) 
            {
                activities = data
                activities.forEach(activity => {
                    parameters.push(["User " + activity.userID, activity.daysByActivity])
                });

                this.setState({userID: '', dateRegistration: '', dateLastActivity: ''})
            }
            else {
                try {
                    alert(JSON.stringify(data.errors))
                }
                catch {
                    alert(data)
                }
            }
        }
        catch (ex) {
            alert("Отсутствует соединение с сервером")
        }
    }

    onCalc = async () => {
        if (parameters.length < 1) return;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(activities)
        };

        const response = await fetch('https://localhost:44303/main/retention/7', requestOptions);
        const data = await response.json(); 

        result = "Rolling Retention 7 day: " + data.result

        this.setState({userID: ''})
        
        document.getElementById("graph").className = "graph"
    }

    onSave = async () => {
        if (parseInt(this.state.userID) < 0 || this.state.userID.length < 1) {
            alert("Некорректный идентификатор")
            return;
        }

        if (this.state.dateRegistration.length < 1 || this.state.dateLastActivity.length < 1) {
            alert("Некорректная дата")
            return;
        }
          
        var same = activities.filter(activity => activity.userID === this.state.userID)

        if (same > 0) {
            alert("Некорректная дата")
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body:  JSON.stringify(this.state)
        };

        try {

            const response = await fetch('https://localhost:44303/main/saveone', requestOptions)
            const data = await response.json(); 
            
            if (response.ok) 
            {
                activities.push(data);
                parameters.push([data.userID, data.daysByActivity])
            }
            else
                alert(JSON.stringify(data.errors))

        } 
        catch (ex) {
            alert("Отсутствует соединение с сервером")
        }

        this.setState({userID: '', dateRegistration: '', dateLastActivity: ''})
    }

    render() {
        return (
            <div className="field">

                <div className="in">
                    <h1 className="field-title">Activities</h1>

                    <div className="input-place">
                        <input className="input-id" type="number" value={this.state.userID} onChange={this.onChangeID} placeholder = "UserID" />
                        <input className="input-reg" type="date" value={this.state.dateRegistration} onChange={this.onChangeReg} />
                        <input className="input-reg" type="date" value={this.state.dateLastActivity} onChange={this.onChangeLast} />
                        <button type="submit" className="input-btn" onClick={this.onSave}>Save</button>
                    </div>

                    <Table data={activities} />
                    
                    <div className="calculate-place">
                        <h3 className="retention">{result}</h3>
                        <button type="submit" className="calculate" onClick={this.onCalc}>Calculate</button>
                    </div>
                    
                    <div id="graph" className="graph-none">
                        <Graph data={parameters} />
                    </div>

                </div>  
            </div>
        )
    }
}