import React, { Component } from 'react'

export class FormCovidCase extends Component {

    constructor(){
        super();
        this.state = {
            province: '',
            cases: -1
        }
        this.handleChange = this.handleChange.bind(this);
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
            paddingRight: '100px'
        }
    }

    handleSubmit(e){
        e.preventDefault();
        console.log()
        this.props.toggleAdding();
    }

    handleChange(e){
        console.log(e.target.name, e.target.value)
    }

    render() {
        return (
            <div style={this.styleFunc()} >

                <form onSubmit={this.handleSubmit} className="ml-4 mt-4">
                    <h2>Add Covid-19 Case</h2>
                    <div className="form-group">
                        <label>Type the province name where you clicked</label>
                        <input type="text" className="form-control mx-sm-1" nname="province" placeholder="Ex: Santiago" aria-describedby="emailHelp" />
                    </div>
                    <div className="form-group">
                        <label >Select the number of cases in that province</label>
                        <input type="number" min="1" name="cases"  className="form-control" />
                    </div>

                    <button className="btn btn-success mt-4 mr-4" type="submit" >Save</button>
                    <button className="btn btn-danger mt-4" onClick={this.props.toggleAdding}>Cancel</button>
                </form>
            </div>
        )
    }
}

export default FormCovidCase
