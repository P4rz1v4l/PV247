import * as React from 'react';
import './createCahnnelForm.scss';
import {BeatLoader} from 'react-spinners';

interface ICreateCahnnelFormState {
    chnameValue: string;
    chdescValue: string;
}

export interface ICreateCahnnelFormStateToProps {
    channelCreating: boolean;
}

export interface ICreateCahnnelFormDispetchToProps {
    toggleChannelCreate: (inCreateChannel: boolean) => void;
    channelCreate: (name: string, description: string) => void;
}

export class CreateCahnnelForm extends React.PureComponent<ICreateCahnnelFormDispetchToProps & ICreateCahnnelFormStateToProps, ICreateCahnnelFormState> {
    constructor(props: ICreateCahnnelFormDispetchToProps & ICreateCahnnelFormStateToProps) {
        super(props);

        this.state = {
            chnameValue: '',
            chdescValue: '',
        };
    }

    onChangeChname = (event: React.ChangeEvent<HTMLInputElement>) => {
        const chnameValue = event.target.value;
        this.setState((prevState) => ({...prevState, chnameValue}) );
    };

    onChangeChdesc = (event: React.ChangeEvent<HTMLInputElement>) => {
        const chdescValue = event.target.value;
        this.setState((prevState) => ({...prevState, chdescValue}) );
    };

    send = (event: React.FormEvent) => {
        event.preventDefault();

        this.props.channelCreate(this.state.chnameValue, this.state.chdescValue);
    };

    cancel = (event: React.MouseEvent) => {
        event.preventDefault();

        this.setState(() => ({chnameValue: '', chdescValue: ''}));
        this.props.toggleChannelCreate(false);
    };

    render(): JSX.Element {
        const disabled = !this.state.chdescValue.trim().length || !this.state.chnameValue.trim().length;

        return (
            <div className="row">
                <div className="col-2" />
                <div className="col-8">
                    <div className="row content">


                        <div className="col-12 col-lg-7 create-form">
                            <h2>CREATE</h2>
                            <form onSubmit={this.send}>
                                <label htmlFor="chname">Name</label>
                                <input type="text" id="chname" placeholder="Name of your channel" value={this.state.chnameValue} onChange={this.onChangeChname} />

                                <label htmlFor="chdesc">Description</label>
                                <input type="text" id="chdesc" placeholder="What’s purpose of this channel?"  value={this.state.chdescValue} onChange={this.onChangeChdesc} />

                                <div className="button-box">
                                    <button type="button" className="button1" onClick={this.cancel}>CANCEL</button>
                                    <button type="submit" className="button2" disabled={disabled}>{this.props.channelCreating ? <BeatLoader color={'#383566'} className={'loader'} /> : 'CREATE CHANNEL'}</button>
                                </div>
                            </form>
                        </div>

                        <div className="col-1 d-none d-lg-block" />
                        <div className="col-4 d-none d-lg-block">
                            <img src="media/img/human_join.png"/>
                        </div>

                    </div>
                </div>
                <div className="col-2" />
            </div>
        );
    }
}
