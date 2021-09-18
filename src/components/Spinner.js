import React, { Component } from 'react'
import loading from '../spinner.gif'

export default class Spinner extends Component {
    render() {
        return (
            <div className="d-flex justify-content-center align-items-center my-5 py-5">
                <img src={loading} alt="loading" />
            </div>
        )
    }
}
