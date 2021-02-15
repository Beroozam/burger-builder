import axios from 'axios'

const instance = axios.create({
    baseURL:'https://react-my-burger-dcb36-default-rtdb.firebaseio.com/'
})

export default instance ;