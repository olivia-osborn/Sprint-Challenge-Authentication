import React from "react";
import axios from "axios";

class Jokes extends React.Component {
    state = {
        jokes: []
    }

    componentDidMount() {
        const token = localStorage.getItem("jwt");
        const reqOptions = {
            headers: {
                authorization: token,
            }
        }
        axios
            .get("http://localhost:3300/api/jokes", reqOptions)
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
                return <p key={joke.id}>{joke.joke}</p>
            })}
            </>
        )
    }
}

export default Jokes;