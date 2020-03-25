import React, { Component } from 'react'

export class News extends Component {

    styleFunc(){
        return {
            width: "18rem",
            marginRight: '2rem',
            marginBottom: '2rem'
        }
    }

    render() {
        return (
            <div class="card" style={this.styleFunc()}>
                <img class="card-img-top" src={this.props.news.image} alt={this.props.news.title} />
                <div class="card-body">
                    <p class="card-text">{this.props.news.time}</p>
                    <h5 class="card-title">{this.props.news.title}</h5>
                    <a href={this.props.news.url} target="blank" class="btn btn-primary">Read more</a>
                </div>
            </div>
        )
    }
}

export default News
