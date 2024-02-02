const useAuth = ()=>{
    if(JSON.parse(localStorage.getItem('blossomUserObj'))){
        return JSON.parse(localStorage.getItem('blossomUserObj'));
    }else return null;
}
export default useAuth;