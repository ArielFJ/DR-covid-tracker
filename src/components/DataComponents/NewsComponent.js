import React, { Component } from 'react'
import News from './News';

import Loader from '../SpinKit/Loader';

export class NewsComponent extends Component {

    constructor(){
        super();
        this.state = {
            news: []
        }
        this.renderNews = this.renderNews.bind(this);
    }

    componentDidMount(){
        // let res = await fetch('https://thevirustracker.com/free-api?countryTotal=DO');
        // let data = await res.json();
        fetch('https://thevirustracker.com/free-api?countryTotal=DO')
            .then(result => result.json())
            .then(data => {
                this.setState({
                    news: data.countrynewsitems[0]
                });
            }, error => {
                console.log(error)
            });  
    }

    renderNews(){
        if(this.props.user){
            if(Object.keys(this.state.news).length > 0){
                let divs = [];
                let news = [];
                let counter = 0;
                for(let n of Object.keys(this.state.news).reverse()){
                    if(counter % 3 === 0){
                        divs.push(<div className="row ml-5" style={{width:'100%'}}>{news}</div>);
                        news = [];
                        counter = 0;
                    }
                    if(n !== 'stat'){
                        news.push(<News key={n} news={this.state.news[n]}  />)
                        counter++;
                    }
                }
                console.log(divs)
                return divs;
            }else{
                return <div className="text-center" style={{marginTop:'10rem'}}>
                            <Loader />
                        </div>
            }
        } else{
            return <div style={{
                minHeight:'45rem',
                paddingTop:'15rem'
                }}>
            <h1 className="display-4 ">You have to log in to see last news.</h1>
        </div>
        }
    }

    render() {
        
        return (
            <div className="container text-center mt-4" >                
                { this.renderNews() }                 
            </div>
        )
    }
}

export default NewsComponent
