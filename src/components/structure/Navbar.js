import React from "react"
import {Button, Navbar} from "react-bootstrap";
import {changeNick} from "../../actions/changeNick";
import {connect} from "react-redux";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

require("../../styles/Navbar.css")

class NavBar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            modalShow: false,
            newNick: ""
        }
    }

    componentDidMount() {
        if(this.props.oldNick==="user"){
            this.renderModal()
        }
    }

    handleSubmit = e => {
        e.preventDefault()
        this.setState({
            modalShow: false
        })
        this.props.changeNick(this.state.newNick)

    }

    handleChange = e => {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value});
    };

    renderModal = () => {
        this.setState({
            modalShow: true
        })
    }

    hideModal = e => {
        e.preventDefault()
        this.setState({
            modalShow: false
        })
    }

    render () {
        return (
            <div>
                <Navbar variant="dark" sticky="top" expand="md">
                    <div className="hello">
                        <span>Witaj&nbsp;</span>
                        <span id="nick">{this.props.oldNick}</span>
                        <span>!</span>
                        <Button
                            className="dialogBtn"
                            onClick={this.renderModal}
                            variant="secondary"
                        >
                            Zmień nick
                        </Button>
                    </div>
                    <div className="header">Web Board</div>
                </Navbar>
                <Dialog open={this.state.modalShow} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Zmień nick</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="newNick"
                            label="Podaj swój pseudonim"
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.newNick}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.hideModal} color="primary">
                            Anuluj
                        </Button>
                        <Button onClick={this.handleSubmit} disabled={this.state.newNick === ""} color="primary">
                            Zapisz
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
        changeNick: nick => dispatch(changeNick(nick))
    }
}

const mapStateToProps = state => {
    return {
        oldNick: state.nick
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);