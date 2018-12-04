// ToDo: Map to Record
import { Map, List } from 'immutable';

export const initialState = Map({
    app: Map({
        actualChannelId: '',
        channelLoading: true
    }),
    user: Map({
        isLogged: false,
        mail: 'borokoso@gmail.com',
        name: 'Boria'
    }),
    channels: List([]),
    messages: List([
        Map({
            id: '1',
            author: 'Boria',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?',
            likes: 2
        }),
        Map({
            id: '2',
            author: 'John',
            text: 'Quo lorem deserunt ex, quo iudicabit vituperata scriptorem ex!!!',
            likes: -3
        })
    ]),
});
