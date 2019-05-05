interface IUser {
    userID: number
    facebookID: number
    googleID: number
    username: string
    age: number
    country: string
    gender: number
    karma: number
    userGames: number
    activeSearches: number
    languages: number
}

interface IActiveSearch {
    activeSearchID: number
    server: string
    searchType: string
    active: boolean
    maxPlayers: number
    joinedUsers: number
    parameters: number
}