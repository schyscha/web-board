import React from "react"
import {Button, Navbar} from "react-bootstrap";
import {changeNick} from "../../actions/changeNick";
import {connect} from "react-redux";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

require("../../styles/Navbar.css");

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            newNick: ""
        }
    }

    componentDidMount() {
        if (this.props.oldNick === "user") {
            this.renderModal()
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({
            modalShow: false
        });
        this.props.changeNick(this.state.newNick)
    };

    handleChange = e => {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value});
    };

    renderModal = () => {
        this.setState({
            modalShow: true,
            newNick: this.props.oldNick
        })
    };

    hideModal = e => {
        e.preventDefault();
        this.setState({
            modalShow: false
        })
    };

    showHelp = () => {
        this.setState({
            infoShow: true,
        })
    };

    hideHelp = () => {
        this.setState({
            infoShow: false,
        })
    };

    render() {
        return (
            <div>
                <Navbar variant="dark" sticky="top" expand="md">
                    <div className="hello">
                        <span>Witaj&nbsp;</span>
                        <span id="nick">{this.props.oldNick}</span>
                        <span>!</span>


                        <Button
                            className="nick-change"
                            onClick={this.renderModal}
                            variant="secondary"
                        >
                            Zmień nick
                        </Button>


                    </div>
                    <div className="header">Web Board</div>
                    <Button
                        className="info-button"
                        onClick={this.showHelp}
                        variant="secondary"
                    >
                        Informacje
                    </Button>
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
                <Dialog open={this.state.infoShow} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Webowy Board do zarządzania projektami -
                        informacje</DialogTitle>
                    <DialogContent>
                        <p className="info">&nbsp;&nbsp;&nbsp;&nbsp;
                            Aplikacja daje możliwość tworzenia oraz edytowania tablic projektowych (boardów). Może
                            zostać wykorzystana w zarządzaniu projektem, za jej pomocą można przypisywać zadania w
                            zespole oraz aktualizować i podglądać postępy pracy w czasie rzeczywistym.
                        </p>
                        <p className="info">&nbsp;&nbsp;&nbsp;&nbsp;
                            Podstawową pracy z aplikacją jest <b>projekt</b>. Aby dodać projekt należy użyć przycisku
                            “nowy projekt” w dolnej części ekranu. Każdy projekt po utworzeniu można usuwać oraz
                            edytować, tj. zmieniać nazwę lub kolor tła. Odpowiednie, służące temu przyciski znajdują się
                            po prawej stronie belki projektu.
                        </p>
                        <p className="info">&nbsp;&nbsp;&nbsp;&nbsp;
                            Do jednego projektu można jednocześnie znajdować się wiele <b>board</b>’ów, które opisują
                            różne aspekty projektu. Dodawanie, usuwanie oraz edytowanie board’ów dla konkretnego
                            projektów przebiega w sposób analogiczny jak w przypadku całych projektów.
                        </p>
                        <p className="info">&nbsp;&nbsp;&nbsp;&nbsp;
                            Każdy board składa się z <b>kolumn</b>. Po raz kolejny zasady zarządzania kolumnami w
                            board’zie są analogiczne, jak zasady zarządzania board’ami w projekcie, z tą różnicą, że
                            kolejność kolumn na board’zie można zmieniać. Każda kolumna reprezentuje konkretny stan w
                            jakim mogą znajdować się zadania (taski). Np. jeśli zadanie znajdujące się w kolumnie o
                            nazwie “in progress” oznacza to, że jest w tym momencie rozwijane. Zadania można przerzucać
                            pomiędzy kolumnami, w ten sposób odzwierciedlając postępy w projekcie.
                        </p>
                        <p className="info">&nbsp;&nbsp;&nbsp;&nbsp;
                            Do każdego <b>zadania</b> można przypisać odpowiedzialnego za nie członka zespołu. Ponadto,
                            dla zadania można oszacować przewidywany czas jego wykonania, oraz logować aktualny czas na
                            nie poświęcony. Wszystkie te wartości można ustawić podczas tworzenia taska, jak również
                            później podczas jego edycji za pomocą przycisku znajdującego się na belce danego zadania.
                            Obok znajduje się również przycisk służący do jego usunięcia.
                        </p>
                        <p className="info">&nbsp;&nbsp;&nbsp;&nbsp;
                            Istotną częścią każdego zadania są <b>komentarze</b>. Komentarze mogą być pisane przez
                            członków zespołu, dzięki czemu w wygodny sposób można prowadzić dyskusje na temat związany z
                            konkretnym zadaniem. Każdy komentarz podpisywany jest nickiem użytkownika, który widnieje
                            na pasku nawigacyjnym w górnym lewym rogu strony.
                        </p>
                        <p className="info">&nbsp;&nbsp;&nbsp;&nbsp;
                            Aby zmienić aktualny <b>nick</b> na nowy, należy kliknąć przycisk “zmień nick” znajdujący
                            się po jego prawej stronie. W prawej części paska nawigacyjnego znajduje się przycisk
                            służący do wyświetlania niniejszej <b>pomoc</b>y. W dolnej części strony znajduje się ogólny
                            <b> czat</b>, za pomocą którego wszyscy użytkownicy mogą prowadzić wspólną konwersację na
                            tematy związane z projektem.
                        </p>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.hideHelp} color="primary">
                            Ok
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
};

const mapStateToProps = state => {
    return {
        oldNick: state.nick
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);