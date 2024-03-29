import axios, {AxiosResponse} from "axios";




const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': "cbbe7914-4c94-4add-beb6-34a7a29cf3e9"
    }


});

export const UsersApi = {
    getUsers: (pageSize: number = 100, currentPage: number = 1) => {
        return instance.get(`users?count=${pageSize}&page=${currentPage}`).then(response => response.data)
    },

    getFriends: (pageSize: number = 100, currentPage: number = 1) => {
        return instance.get(`users?friend=true&count=${pageSize}&page=${currentPage}`).then(response => response.data)
    },

    followUser: (id: number) => {
        return instance.post(`/follow/${id}`).then(response => response.data)
    },

    unFollowUser: (id: number) => {
        return instance.delete(`/follow/${id}`).then(response => response.data)
    },
    getUserProfile: (userId: number) => {
        console.warn("method deprecated, please use ProfileApi.getUserProfile")
        return ProfileApi.getUserProfile(userId)
    },
}

export const ProfileApi = {
    getUserProfile: (userId: number) => {
        if(userId != null)
        return instance.get(`profile/${userId}`).then(response => response.data)
        return new Promise((resolve)=>{})
    },
    getUserStatus: (userId: number) => {
        if(userId != null)
        return instance.get(`profile/status/${userId}`).then(response => response.data)
        return new Promise((resolve)=>{})

    },
    updateStatus: (status:string) => {
        return instance.put(`profile/status/`, {status})
    }
}

export const AuthApi = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email:string,password:string,rememberMe:boolean = false,captcha?:string){
        return instance.post(`auth/login`,{email,password,rememberMe,captcha})
    },
    logout(){
        return instance.delete(`auth/login`)
    },
}

export const securityApi = {
    getCaptchaUrl(){
        return instance.get(`security/get-captcha-url`)
    }
}





// UsersApi.getFriends(100,1).then(r=>r.data)






