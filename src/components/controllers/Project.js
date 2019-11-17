import React from 'react';
import ProjectView from '../views/ProjectView'
import { BoardService } from '../../services/BoardService';

class Project extends React.Component {
    constructor(props) {
        super(props)
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

    handleSubmit = data => {
        const background = data.background;
        const name = data.name;
        this.boardService.addBoard(background, name, this.projectReference);
    }

    handleEdit = data => {
        const name = data.name;
        const newBoard = data.newBoard;
        this.boardService.editBoard(name, newBoard, this.projectReference);
    }

    handleDelete = data => {
        const name = data.name;
        this.boardService.deleteBoard(name, this.projectReference);
    }

    render() {
        return (
            <div>
                <div className="name">Projekt <u>{this.props.name}</u></div>
                <ProjectView
                    boards={this.state.boards}
                    handleSubmit={this.handleSubmit}
                    handleEdit={this.handleEdit}
                    handleDelete={this.handleDelete}
                />
            </div>
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
                console.log('fetched board', data);
            });
            this.setState({
                boards: listOfFetchedBoards
            });
        });
    }
}

export default Project;