export const profiles = [
    {
        id: 0,
        fullName: "Julia Tyler",
        profilePhoto: "https://ik.imagekit.io/brk/kadin/74.jpg?tr=h-150,w-150,q-70",
    },
    {
        id: 1,
        fullName: "Michelle McDonald",
        profilePhoto: "https://ik.imagekit.io/brk/kadin/188.jpg?tr=h-150,w-150,q-70",
    },
    {
        id: 2,
        fullName: "John Doe",
        profilePhoto: "https://ik.imagekit.io/brk/erkek/98.jpg?tr=h-150,w-150,q-70",
    },
    {
        id: 3,
        fullName: "Joe Winston",
        profilePhoto: "https://ik.imagekit.io/brk/erkek/59.jpg?tr=h-150,w-150,q-70",
    },
    {
        id: 4,
        fullName: "Marie Carry",
        profilePhoto: "https://ik.imagekit.io/brk/kadin/152.jpg?tr=h-150,w-150,q-70",
    },
    {
        id: 5,
        fullName: "Michael Fendler",
        profilePhoto: "https://ik.imagekit.io/brk/erkek/51.jpg?tr=h-150,w-150,q-70",
    },
    {
        id: 6,
        fullName: "Mary John",
        profilePhoto: "https://ik.imagekit.io/brk/kadin/49.jpg?tr=h-150,w-150,q-70",
    },
];

export const tasks = [
    {
        id: 0,
        title: "Make a new page for payment.",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        priority: 1, // Öncelik
        status: 1, // 1 başladı, devam ediyor | 2 bitti | 0 henüz başlamadı
        createdAt: "02/01/2020 9:46",
        updatedAt: "02/01/2020 9:46",
        startedAt: "02/01/2020 9:46",
        goalFinishDate: "10/01/2020 9:46",
        finishedAt: null,
        userId: 0,
    },
    {
        id: 1,
        title: "Research React hooks for state management.",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        priority: 0,
        status: 2,
        createdAt: "02/01/2020 9:46",
        updatedAt: "02/01/2020 9:46",
        startedAt: "02/01/2020 9:46",
        goalFinishDate: "10/01/2020 9:46",
        finishedAt: "02/01/2020 9:46",
        userId: 0,
    },
    {
        id: 2,
        title: "Design a page for listing bakery products top and bottom.",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        priority: 2,
        status: 1,
        createdAt: "02/01/2020 9:46",
        updatedAt: "02/01/2020 9:46",
        startedAt: "02/01/2020 9:46",
        goalFinishDate: "10/01/2020 9:46",
        finishedAt: null,
        userId: 1,
    },
    {
        id: 3,
        title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        priority: 1,
        status: 0,
        createdAt: "02/01/2020 9:46",
        updatedAt: "02/01/2020 9:46",
        startedAt: "02/01/2020 9:46",
        goalFinishDate: "10/01/2020 9:46",
        finishedAt: null,
        userId: 2,
    },
    {
        id: 4,
        title: "Quisque dapibus pretium ullamcorper. Interdum.",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        priority: 1,
        status: 2,
        createdAt: "02/01/2020 9:46",
        updatedAt: "02/01/2020 9:46",
        startedAt: "02/01/2020 9:46",
        goalFinishDate: "10/01/2020 9:46",
        finishedAt: "02/01/2020 9:46",
        userId: 3,
    },
];

export const teams = [
    {
        id: 0,
        name: "E-ticaret projeleri takımı",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        members: [
            {
                id: 0,
                role: "Scrum Master",
            },
            {
                id: 1,
                role: "Takım Lideri"
            },
            {
                id: 2,
                role: "Geliştirici"
            },
            {
                id: 3,
                role: "Geliştirici"
            },
            {
                id: 4,
                role: "Geliştirici"
            },
            {
                id: 5,
                role: "Geliştirici"
            },
            {
                id: 6,
                role: "Geliştirici"
            },
        ]
    },
    {
        id: 1,
        name: "Android mobil uygulama takımı",
        description: "Quisque dapibus pretium ullamcorper.",
        members: [{
            id: 0,
            role: "Scrum Master",
        },
            {
                id: 1,
                role: "Takım Lideri"
            },
            {
                id: 2,
                role: "Geliştirici"
            },
            {
                id: 3,
                role: "Geliştirici"
            },
            {
                id: 4,
                role: "Geliştirici"
            },
            {
                id: 5,
                role: "Geliştirici"
            },
            {
                id: 6,
                role: "Geliştirici"
            },]
    },
    {
        id: 2,
        name: "iOS mobil uygulama takımı",
        description: "Ut enim ad minim veniam.",
        members: [{
            id: 0,
            role: "Scrum Master",
        },
            {
                id: 1,
                role: "Takım Lideri"
            },
            {
                id: 2,
                role: "Geliştirici"
            },
            {
                id: 3,
                role: "Geliştirici"
            },
            {
                id: 4,
                role: "Geliştirici"
            },
            {
                id: 5,
                role: "Geliştirici"
            },
            {
                id: 6,
                role: "Geliştirici"
            },]
    },
    {
        id: 3,
        name: "Django uygulama takımı",
        description: null,
        members: [{
            id: 0,
            role: "Scrum Master",
        },
            {
                id: 1,
                role: "Takım Lideri"
            },
            {
                id: 2,
                role: "Geliştirici"
            },
            {
                id: 3,
                role: "Geliştirici"
            },
            {
                id: 4,
                role: "Geliştirici"
            },
            {
                id: 5,
                role: "Geliştirici"
            },
            {
                id: 6,
                role: "Geliştirici"
            },]
    },
    {
        id: 4,
        name: "Express.js uygulama takımı",
        description: "Excepteur sint occaecat cupidatat non proident.",
        members: [{
            id: 0,
            role: "Scrum Master",
        },
            {
                id: 1,
                role: "Takım Lideri"
            },
            {
                id: 2,
                role: "Geliştirici"
            },
            {
                id: 3,
                role: "Geliştirici"
            },
            {
                id: 4,
                role: "Geliştirici"
            },
            {
                id: 5,
                role: "Geliştirici"
            },
            {
                id: 6,
                role: "Geliştirici"
            },]
    },
    {
        id: 5,
        name: "E-ticaret projeleri takımı",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        members: [{
            id: 0,
            role: "Scrum Master",
        },
            {
                id: 1,
                role: "Takım Lideri"
            },
            {
                id: 2,
                role: "Geliştirici"
            },
            {
                id: 3,
                role: "Geliştirici"
            },
            {
                id: 4,
                role: "Geliştirici"
            },
            {
                id: 5,
                role: "Geliştirici"
            },
            {
                id: 6,
                role: "Geliştirici"
            },]
    },
    {
        id: 6,
        name: "Android mobil uygulama takımı",
        description: "Quisque dapibus pretium ullamcorper.",
        members: [{
            id: 0,
            role: "Scrum Master",
        },
            {
                id: 1,
                role: "Takım Lideri"
            },
            {
                id: 2,
                role: "Geliştirici"
            },
            {
                id: 3,
                role: "Geliştirici"
            },
            {
                id: 4,
                role: "Geliştirici"
            },
            {
                id: 5,
                role: "Geliştirici"
            },
            {
                id: 6,
                role: "Geliştirici"
            },]
    },
];

export const priorities = [
    {
        name: "Yüksek Öncelikli",
        value: 1
    },
    {
        name: "Orta Öncelikli",
        value: 0
    },
    {
        name: "Düşük Öncelikli",
        value: 2
    },
];

export const newTeamMembers = [
    {
        userID: "asdasdasd",
        role: "Scrum Master",
    },
    {
        userID: "asdasdasdqwe",
        role: "Scrum Master",
    },
    {
        userID: "asdasdasdqweqwe",
        role: "Scrum Master",
    },
    {
        userID: "asdasdasdqweqweqwe",
        role: "Scrum Master",
    },
];

export const roles = [
    {
        id: 1,
        name: "Ürün Sahibi",
    },
    {
        id: 2,
        name: "Scrum Master",
    },
    {
        id: 3,
        name: "Geliştirici",
    },
];