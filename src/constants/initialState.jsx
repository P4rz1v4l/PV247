import { Map, List } from 'immutable';

export const initialState = {
  app: {
    actualChannelId: "wejkfewn"
  },
  user: {
    id: "fejn212",
    mail: "borokoso@gmail.com",
    name: "Boria"
  },
  channels: [
    {
      id: "wejkfewn",
      name: "NullNull",
      description: "Lorem ipsum dolor sit amet, sed ea wisi eius. Quo lorem deserunt ex, quo iudicabit vituperata scriptorem ex.",
      owner: "boria",
      users: ["Peter", "John", "Boria"]
    },
    {
      id: "wejkfewneqw",
      name: "Noname",
      description: "Esi eius. Quo lorem deserunt ex, quo iudicabit vituperata scriptorem ex.",
      owner: "John",
      users: ["boria", "John"]
    }
  ],
  messages: [
    {
      id: "1",
      author: "Boria",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?",
      likes: 2,
    },
    {
      id: "2",
      author: "John",
      text: "Quo lorem deserunt ex, quo iudicabit vituperata scriptorem ex!!!",
      likes: -3,
    },
  ],
};
