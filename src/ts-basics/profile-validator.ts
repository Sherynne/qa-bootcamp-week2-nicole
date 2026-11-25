
type UserProfile = {
    id: number;
    username: string;
    settings?: {
        notifications?: boolean;
    };
};


const user1: UserProfile = {
    id: 1,
    username: "Nicole",
    settings: {
        notifications: true
    }
};

const user2: UserProfile = {
    id: 2,
    username: "Alex"
};

const user3: UserProfile = {
    id: 3,
    username: "Mary",
    settings: {}
};


function isNotified(user: UserProfile): boolean {
    return user.settings?.notifications ?? false;
}

console.log("User 1:", isNotified(user1));
console.log("User 2:", isNotified(user2));
console.log("User 3:", isNotified(user3));