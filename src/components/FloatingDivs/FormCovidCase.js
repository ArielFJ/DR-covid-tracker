import React, { Component } from 'react'

export class FormCovidCase extends Component {

    constructor() {
        super();
        this.state = {
            cases: -1
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.changeCase(this.state.cases);
        this.props.toggleCanAdd();
        this.props.toggleAdding();
    }

    

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="ml-4 mt-4">
                <h2>Add Covid-19 Case</h2>

                <div className="form-group pr-5">
                    <label >Select the number of cases</label>
                    <input type="number" min="1" name="cases" defaultValue="1" className="form-control" onChange={this.handleChange} />
                </div>

                <button className="btn btn-success mt-4 mr-3" type="submit" >Save</button>
            </form>
        )
    }
}

export default FormCovidCase
