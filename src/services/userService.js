import axios from 'axios'


class UserService {

    getUsers() {
        return axios.get('https://jsonplaceholder.typicode.com/users')
    }

    newUser(data) {
        return axios.post('https://jsonplaceholder.typicode.com/users',data)
    }
}

export default UserService;
