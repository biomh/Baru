import axios from 'axios'
import cookies from 'universal-cookie'

const cookie = new cookies();


export const onLoginClick = (user, pass) => {
    return dispatch => {
        axios.get("http://localhost:1996/users", {
            params: {
                username: user,
                password: pass
            }
        }).then(res => {
            if (user === '' || pass === '') {
                dispatch({
                    type: "AUTH_EMPTY",
                    payload: 'please fill the form'
                })
            }else if (res.data.length > 0) {
                console.log(res.data[0]);

                const { id, username } = res.data[0]

                dispatch({
                    type: "SUCCEED",
                    payload: { id: id, username: username }
                })
                cookie.set('stillLogin', username, {path:'/'})

            } else {
                dispatch({
                    type: "AUTH_ERROR",
                    payload: "Username or Password is incorrect"
                })
            }
        }).catch(err => {
            console.log("System Error");

        })
    }
}
export const onSignupClick = (user, emaill, pass) => {
    return dispatch => {
        axios.get("http://localhost:1996/users", {
            params: {
                username: user
            }
        }).then(res => {
            if (user === '' || emaill === '' || pass === '') {
                dispatch({
                    type: "AUTH_EMPTY",
                    payload: 'please fill the form'
                })
            } else if (res.data.length === 0) {
                axios.post("http://localhost:1996/users", {
                    username: user,
                    email: emaill,
                    password: pass
                }).then(res => {
                    console.log("Registrasi Berhasil");
                    dispatch({
                        type: "REGISTER_SUCCESS",
                        payload: `Register Success, please login to continue!`
                    })
                })
            } else {
                dispatch({
                    type: "AUTH_ERROR",
                    payload: 'username has been taken'
                })
            }
        })

    }
}
export const afterError = () => {
    return {
        type: "AFTER_ERROR"
    }
}
export const afterTwoSeconds = () => {
    return dispatch => {
        setTimeout(() => {
            dispatch(afterError())
        }, 2000)
    }
}
export const onLogoutUsers = () =>{
    cookie.remove('stillLogin')
        return{
            type: 'LOGOUT_USER'
        }

}
export const keepLogin = (user) =>{
    return dispatch =>{
        axios.get("http://localhost:1996/users", {
            params: {
                username:user
            }

        }).then(res => {
            if(res.data.length > 0){
                dispatch({
                    type: 'SUCCEED',
                    payload: {username: user}
                })
            }
        })
    }
}
export const addProduct = (name,desc,price,pict) => {
    return dispatch =>{
        axios.post("http://localhost:1996/product", {
            name : name,
            desc : desc,
            price: price,
            pict : pict
        }).then(res => {
            console.log("berhasil menambahkan");
            const { name,desc,price,pict } = res.data[0]
            dispatch({
                type: "ADD_SUCCESS",
                payload: { name,desc,price,pict }
            })
        })
    }
}
