import React from 'react';
import HomeView from '../views/HomeView'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            projects: []
        }
    }

    componentDidMount() {
        //TODO: sciagniecie listy projektow z bazy
    }

    render() {
        return (
            <HomeView projects={this.state.projects}/>
        )
    }

}

export default Home;