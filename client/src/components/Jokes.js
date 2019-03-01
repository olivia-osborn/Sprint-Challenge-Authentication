import React from "react";
import axios from "axios";

class Jokes extends React.Component {
    state = {
        jokes: []
    }

    componentDidMount() {
        axios
            .get("http://localhost:3300/api/jokes")
            .then(res => {
                this.setState({jokes: res.data})
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <>
            {this.state.jokes.map(joke => {
                return <p>{joke}</p>
            })}
            </>
        )
    }
}

export default Jokes;