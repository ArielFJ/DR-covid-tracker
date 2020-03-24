import React, { Component } from 'react'

export class FormCovidCase extends Component {

    constructor(){
        super();
        this.state = {
            cases: -1
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    styleFunc(){
        return {
            background: 'rgba(0,0,0,.8)',
            width: '48%',
            height: '25rem',
            position: "absolute",
            top: '17.5%',
            left: '26%',
            zIndex:'1000',
            color: 'white',
        }
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.changeCase(this.state.cases);
        this.props.toggleCanAdd();
        this.props.toggleAdding();
    }

    handleCancel(){
        this.props.changeCase({});
        this.props.toggleAdding();
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div style={this.styleFunc()} >

                <form onSubmit={this.handleSubmit} className="ml-4 mt-4">
                    <h2>Add Covid-19 Case</h2>

                    <div className="form-group pr-5">
                        <label >Select the number of cases</label>
                        <input type="number" min="1" name="cases"  className="form-control" onChange={this.handleChange}/>
                    </div>

                    <button className="btn btn-success mt-4 mr-3" type="submit" >Save</button>
                    <button className="btn btn-danger mt-4" onClick={this.handleCancel}>Cancel</button>
                </form>
            </div>
        )
    }
}

export default FormCovidCase
