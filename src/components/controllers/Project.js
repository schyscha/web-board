import React from 'react';
import ProjectView from '../views/ProjectView'
import {BoardService} from '../../services/BoardService';

class Project extends React.Component {
    constructor(props) {
        super(props);
        this.projectReference = this.props.projectReference;
        this.name = this.props.name;
        this.boardService = new BoardService();
        this.state = {
            boards: []
        }
    }

    componentDidMount() {
        this.setDatabaseListener();
    }

    handleSubmit = (boardName, boardBackground) => {
        const background = boardBackground;
        const name = boardName;
        this.boardService.addBoard(background, name, this.projectReference);
    };

    handleEdit = (name, newName, newBackground) => {
        this.boardService.editBoard(name, newName, newBackground, this.projectReference);
    };

    handleDelete = boardName => {
        const name = boardName;
        this.boardService.deleteBoard(name, this.projectReference);
    };

    render() {
        return (
            <ProjectView
                boards={this.state.boards}
                handleSubmit={this.handleSubmit}
                handleEdit={this.handleEdit}
                handleDelete={this.handleDelete}
            />
        )
    }

    setDatabaseListener() {
        this.boardService.boardRef(this.projectReference).onSnapshot(data => {
            const listOfFetchedBoards = [];
            data.docs.forEach(doc => {
                const boardReference = doc.ref;
                const data = doc.data();
                data['ref'] = boardReference;
                listOfFetchedBoards.push(data);
            });
            this.setState({
                boards: listOfFetchedBoards
            });
        });
    }
}

export default Project;
