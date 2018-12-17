import * as React from 'react';

import './login.scss';
import {BeatLoader} from 'react-spinners';
import {ErrorsListContainer} from '../../containers/errorsList';

interface ILoginPageState {
    inputValue: string;
}

interface ILoginPageProps {
    userLogin: (mail: string) => void;
    userLoginProcess: boolean;
}

export class LoginPage extends React.PureComponent<ILoginPageProps, ILoginPageState> {
    constructor(props: ILoginPageProps) {
        super(props);
        this.state = {
            inputValue: '',
        };
    }

    updateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;

        this.setState(() => ({inputValue}));
    };

    send = (event: React.FormEvent) => {
        event.preventDefault();

        this.props.userLogin(this.state.inputValue);
    };

    render() {
        const disabled = this.props.userLoginProcess || !this.state.inputValue.trim().length || !this.state.inputValue.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

        return (
            <div id="login" className="container-fluid">


                <div className="row">
                    <div className="col-6 align-self-center logo">
                        <img src="media/img/logo.png" alt="logo" />
                    </div>

                    <div className="col-6">
                        <nav className="navbar navbar-default">
                            <ul className="nav navbar-nav d-flex flex-row">
                                <li className="nav-item">
                                    <a className="nav-link" href="#about">About</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#partners">Partners</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#references">References</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>


                <div id="about" className="row">
                    <div className="col-6">
                        <img src="media/img/clouds.png" className="img-clouds" />
                            <div className="d-flex justify-content-end land-img">
                                <img src="media/img/human1.png" />
                                <img src="media/img/human2.png" />
                                <img src="media/img/human3.png" />
                                <img src="media/img/human4.png" />
                            </div>
                            <img src="media/img/gound.png" className="img-ground" />
                    </div>

                    <div className="col-5">
                        <div className="row">
                            <div className="col-12">
                                <h1>Chat the hell<br />out of you</h1>
                                <p>And your device too! Phone, tablet or computer? Doesn’t matter. Anytime, anywhere,
                                    free, forever! Message your ex how happy you are now, tell your boss you are not
                                    going to show up again, and much more, we got your back!</p>
                            </div>
                            <div className="col-12 input-form">
                                <form onSubmit={this.send}>
                                    <input value={this.state.inputValue} onChange={this.updateInput} type="email" placeholder="Enter your email" inputMode="email" />
                                    <button type="submit" disabled={disabled}>{this.props.userLoginProcess ? <BeatLoader color={'#383566'} className={'loader'} /> : 'LOG IN'}</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-1" />
                </div>


                <div id="partners" className="row">
                    <div className="col-12">
                        <h4>Thousands of happy companies, including:</h4>
                    </div>
                    <div className="col-12 text-center">
                        <img src="media/img/logo-k.png" alt="logo-kentico" />
                        <img src="media/img/logo-m.png" alt="logo-muni" />
                    </div>
                </div>


                <div id="references" className="row">
                    <div className="col-6 d-flex align-items-center flex-row-reverse">
                        <img src="media/img/ref-l.png" className="ref-l" />
                        <div className="ref-text">
                            <h2>A life changing experience</h2>
                            <p>/ &nbsp;Two PV247 students</p>
                        </div>
                        <img src="media/img/ref-r.png" className="ref-r" />
                    </div>
                    <div className="col-6 ref-img">
                        <img src="media/img/ref-img.png" />
                    </div>
                </div>


                <div id="benefits" className="row">
                    <div className="col-3" />
                    <div className="col-6 d-flex justify-content-center">
                        <div className="row benefit-text">
                            <div className="col-4">
                                <h2>1</h2>
                                <p>Ok that’s all. Please scroll up and log yourself in.</p>
                            </div>
                            <div className="col-4">
                                <h2>2</h2>
                                <p>C’mon...it’s just a school project. Isn’t this enough for a login page?</p>
                            </div>
                            <div className="col-4">
                                <h2>3</h2>
                                <p>Pleease just scroll up and log in. How hard can it be?</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3" />
                </div>


                <ErrorsListContainer />
            </div>
        );
    }
}
