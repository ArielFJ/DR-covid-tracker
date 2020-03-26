import React, { Component } from 'react'

export class Footer extends Component {
    render() {
        return (
            
            <footer id="sticky-footer" className="py-4 bg-white text-black-50 ">
                <div className="container text-center">
                <p> &copy; {new Date().getFullYear()} Copyright - <a href="https://github.com/ArielFJ" target="blank" >ArielFJ</a></p>
                </div>
            </footer>
            
        )
    }
}

export default Footer
