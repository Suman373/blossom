export default useAuth = ()=>{
    if(localStorage.getItem(JSON.parse('blossomUserObj'))){
        return localStorage.getItem(JSON.parse('blossomUserObj'));
    }
}