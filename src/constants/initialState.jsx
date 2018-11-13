import { Map, List } from 'immutable';

export const initialState = Map({
  app: Map({
    actualChannelId: "wejkfewn"
  }),
  user: Map({
    id: "fejn212",
    mail: "borokoso@gmail.com",
    name: "Boria"
  }),
  channels: List([
    Map({
      id: "wejkfewn",
      name: "NullNull",
      description: "Lorem ipsum dolor sit amet, sed ea wisi eius. Quo lorem deserunt ex, quo iudicabit vituperata scriptorem ex.",
      owner: "boria",
      users: List(["Peter", "John", "Boria"])
    }),
    Map({
      id: "wejkfewneqw",
      name: "Noname",
      description: "Esi eius. Quo lorem deserunt ex, quo iudicabit vituperata scriptorem ex.",
      owner: "John",
      users: List(["boria", "John"])
    })
  ]),
  messages: List([
    Map({
      id: "1",
      author: "Boria",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?",
      likes: 2
    }),
    Map({
      id: "2",
      author: "John",
      text: "Quo lorem deserunt ex, quo iudicabit vituperata scriptorem ex!!!",
      likes: -3
    })
  ]),
});
