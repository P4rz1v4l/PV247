interface IApp {
    readonly actualChannelId: string;
}

interface IUser {
    id: string;
    mail: string;
    name: string;
}

interface IAppState {
    app: IApp;
    user: IUser;
}

export interface IState {
    state: IAppState;
}
