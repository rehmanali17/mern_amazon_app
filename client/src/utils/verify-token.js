
export const verify_token = (history) =>{
    const token = localStorage.getItem('auth-token')
    if(token == null){
        history.push('/login')
    }
    return token
}