import React from 'react'

export default class Table extends React.Component {
    render() {
        return (
                <table className="table">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Registration</th>
                            <th>Last Activity</th>
                        </tr>
                    </thead>

                    <tbody>{
                        this.props.data.map(activity => { 
                            return <Rows userID={activity.userID} dateRegistration={activity.dateRegistration} dateLastActivity={activity.dateLastActivity} />})
                    }
                    </tbody>
                </table>
        )
    }
}

class Rows extends React.Component {
    
    render() {
        return <tr>
            <td>{this.props.userID}</td>
            <td>{this.props.dateRegistration}</td>
            <td>{this.props.dateLastActivity}</td>
        </tr>
    }
}