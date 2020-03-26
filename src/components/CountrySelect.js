import React, { Component } from 'react'

export class CountrySelect extends Component {
    
    state={
        countryCodes: ['CN', 'US', 'IT', 'DO', 'IL', 'ES'],
        countryNames: ['China', 'United States', 'Italy', 'Dominican Republic', 'Israel', 'Spain'],
        bool: false
    }

    // async componentDidMount(){        
    //     let res = await fetch('https://covid19.mathdro.id/api/countries');
    //     let data = await res.json();
        
    //     let codes = [];
    //     let names = [];
    //     for(let value of data.countries){
    //         if(value.iso2 !== undefined){
    //             codes.push(value.iso2)
    //             names.push(value.name);
    //         }
    //     }
    //     console.log(codes.length, names.length)
    //     this.setState({
    //         countryCodes: codes,
    //         countryNames: names
    //     })
    // }

    onChange= (e) => {
        console.log(e.target.value)
        // this.props.changeCountry(e.target.value);   
    }

    render() {
        return (
            <div>
                <select className="select select-default" onChange={this.onChange} >
                    {
                        this.state.countryCodes.length > 0 &&
                        this.state.countryCodes.map((code,i) => {
                        return <option value={code} key={code} >{this.state.countryNames[i]}</option>
                        })
                    }
                </select>
            </div>
        )
    }
}

export default CountrySelect
