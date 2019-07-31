import axios from 'axios'


class UserService {

    baseUrl="http://localhost:8080";

    getUsers() {
        return axios.get(`${this.baseUrl}/users`)
    }

    getUser(id) {
        return axios.get(`${this.baseUrl}/user/${id}`)
    }

    updateUser(user) {
        return axios.put(`${this.baseUrl}/user/${user.id}`,user)
    }

    deleteUser(id) {
        return axios.delete(`${this.baseUrl}/user/${id}`)
    }

    uploadPicture(idUser,file) {
        var bodyFormData = new FormData();
        bodyFormData.append('picture', file);
        return axios({
            method: 'post',
            url: `${this.baseUrl}/user/${idUser}/picture`,
            data: bodyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        });
    }

    newUser(data) {
        return axios.post(`${this.baseUrl}/users`,data)
    }
}

export default UserService;
