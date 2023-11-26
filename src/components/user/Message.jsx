import UserHead from "./uhead";

function Message(){
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let message = params.get('message');
    return(
        <>
        <UserHead/>
        <div className="h3 text-center mt-5">{message}</div>
        </>
    )
}
export default Message;