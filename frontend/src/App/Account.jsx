import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faSignOutAlt, faHome } from '@fortawesome/free-solid-svg-icons'
import '../styles/Header.css'
import header from "../Groupomania_Logos/icon-left-font.png"
import { Link, useHistory } from "react-router-dom"
import Axios from 'axios'
import { useState } from 'react'

export function Account() {

    const [userInfo, setUserInfo] = useState({ firstName: "", lastName: "", email: "", password: "", isAdmin: "", avatar: "" })
    const [loaded, setLoaded] = useState(false)
    const history = useHistory();

    const SubmitLogout = function (e) {
        e.preventDefault()
        localStorage.getItem('token');
    }
    const SubmitAccount = function (e) {
        e.preventDefault()

    }

    const token = localStorage.getItem('token');

    if (!loaded) {
        const user = Axios({
            method: "get",
            url: "http://localhost:3000/api/auth/account",
            headers: {
                Authorization: "Bearer " + token
            }
        })

        console.log(user);
        user.then((result) => {
            setUserInfo(result.data)
            setLoaded(true)
        });
    }
    function deletId() {
        Axios({
            method: "delete",
            url: "http://localhost:3000/api/auth/delete",
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(function (response) {
            console.log(response);
            localStorage.removeItem('token');
            history.push("/main");
            document.location.reload();
        })
    }

    return (
        <div>
            <div className="headers">
                <div className="d-flex justify-content-between m-5">
                    <div className="h1 center dflex">
                        <img className="header" src={header} height={350} width={350} alt="logoGroupomania" />
                    </div>
                    <div className="iconRight m-5">
                        <ul className="nav">
                            <Link to="/post">
                                <li className="nav0">
                                    <button type="submit"
                                        value="post"
                                        onClick={() => history.push('/post')}
                                    >
                                        <FontAwesomeIcon className="iconUser" icon={faHome} />
                                    </button>
                                </li>
                            </Link>
                            <Link to="/Account">
                                <li className="nav1" onClick={SubmitAccount}>
                                    <button type="submit" value="ACCOUNT" onClick={() => history.push('/account')} >
                                        <FontAwesomeIcon className="iconUser" icon={faUserCircle} />
                                    </button>
                                </li>
                            </Link>
                            <Link to="/main">
                                <li className="nav2" onClick={SubmitLogout}>
                                    <button type="submit"
                                        value="LOGOUT"
                                        onClick={() => history.push('/main')}
                                    >
                                        <FontAwesomeIcon className="iconUser" icon={faSignOutAlt} />
                                    </button>
                                </li>
                            </Link>
                        </ul>
                    </div>
                </div>
            </div>
            <div>
                <div className="welcome profil">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Email : {userInfo.email}</li>
                        <li className="list-group-item">lastname : {userInfo.lastName}</li>
                        <li className="list-group-item">firstname : {userInfo.firstName}</li>
                        <li className="list-group-item">Admin : {userInfo.isAdmin}</li>
                        <li className="list-group-item">Avatar : {userInfo.avatar}</li>
                    </ul>
                    <div className="card-body">
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={deletId}
                        >
                            Supprimer le compte
                        </button>
                        <button
                            type="button"
                            className="m-4 btn btn-primary"
                        >
                            Modifier le compte
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
