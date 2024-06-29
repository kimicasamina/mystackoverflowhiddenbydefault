const initialValue = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
}

const userReducer = (user = initialValue, action) => {
    switch (action.type) {
        case "SET_CREDENTIALS":
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
            return {
                userInfo: action.payload
            }

        case "DELETE_CREDENTIALS":
            localStorage.removeItem('userInfo')
            return null

        default:
            return user
    }
}

export default userReducer