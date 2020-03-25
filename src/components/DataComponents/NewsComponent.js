import React, { Component } from 'react'
import News from './News';

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
        if(Object.keys(this.state.news).length > 0){
            // const news =  Object.keys(this.state.news).map((key, i) => {
            //     console.log(this.state.news[key])
            //     return <News key={i} news={this.state.news[key]}  />
            // });

            let divs = [];
            let news = [];
            let counter = 0;
            for(let n of Object.keys(this.state.news).reverse()){
                if(counter % 3 === 0){
                    divs.push(<div className="row ml-4" style={{width:'100%'}}>{news}</div>);
                    // divs.push(news);
                    news = [];
                    counter = 0;
                }
                if(n !== 'stat'){
                    news.push(<News key={n} news={this.state.news[n]}  />)
                    // news.push(n)
                    counter++;
                }
            }
            console.log(divs)
            return divs;


            // let news = [];
            // for(let n of Object.keys(this.state.news)){
            //     if(n !== 'stat'){
            //         news.push(<News key={n} news={this.state.news[n]}  />)
            //     }
            // }
            // console.log(news)
            // return news.reverse();
        }else{
            return <h1 className="display-4" >Loading...</h1>
        }
    }

    render() {
        
        return (
            <div className="container text-center mt-4" >
                <ul>
                { this.renderNews() } 
                
                </ul>
            </div>
        )
    }
}

export default NewsComponent
