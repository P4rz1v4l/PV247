import * as React from 'react';
import {StateUserRecord} from '../../model/stateUser';
import {BeatLoader} from 'react-spinners';

interface IMenuHeader {
    inputNameShow: boolean;
    inputNameValue: string;
}

export interface IMenuHeaderStateProps {
    user: StateUserRecord;
    userChangingName: boolean;
    userChangingAvatar: boolean;
}

export interface IMenuHeaderDispatchToProps {
    userChangeNick: (nick: string) => void;
    userChangeAvatar: (data: File) => void;
}

export class MenuHeader extends React.PureComponent<IMenuHeaderStateProps & IMenuHeaderDispatchToProps, IMenuHeader> {
    private refFileInput: HTMLInputElement;

    constructor(props: IMenuHeaderStateProps & IMenuHeaderDispatchToProps) {
        super(props);

        this.state = {
            inputNameShow: false,
            inputNameValue: this.props.user.nick,
        };
    }

    toggleInputNameShow = (inputNameShow: boolean) => {
        this.setState((prevState) => ({...prevState, inputNameShow}));
    };

    onChangeInputName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputNameValue = event.target.value;

        this.setState(prevState => ({...prevState, inputNameValue}));
    };

    onSubmitInputName = (event: React.FormEvent) => {
        event.preventDefault();

        if (!(this.state.inputNameValue === this.props.user.nick)) {
            this.props.userChangeNick(this.state.inputNameValue);
        }
        this.toggleInputNameShow(false);
    };

    onClickToAvatar = () => {
        this.refFileInput.click();
    };

    onFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.files);

        if (event.target.files !== null) {
            this.props.userChangeAvatar(event.target.files[0]);
        }
    };

    render() {
        return (
            <div className="d-flex align-items-stretch justify-content-between header">
                <div>
                    {this.props.userChangingName ? <BeatLoader color={'#f15c70'} className={'loader'} /> : this.state.inputNameShow ? <form onSubmit={this.onSubmitInputName}><input value={this.state.inputNameValue} onChange={this.onChangeInputName}/></form> : <h1 onClick={() => {this.toggleInputNameShow(true); }}>{this.props.user.nick}</h1>}
                    <span>{this.props.user.get('email')}</span>
                </div>
                <div className="d-flex align-items-center">
                    <div className="avatar" onClick={this.onClickToAvatar}>
                        {this.props.userChangingAvatar ?
                            <BeatLoader color={'#f15c70'} className={'loader'} size={7} />
                            :
                            <img src={this.props.user.avatar !== '' ? this.props.user.avatar : 'media/img/avatar.png'} />
                        }
                        <input type="file" ref={(input: HTMLInputElement) => this.refFileInput = input} onChange={this.onFileSelect}/>
                    </div>
                </div>
            </div>
        );
    }
}
