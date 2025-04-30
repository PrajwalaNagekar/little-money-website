import { Navigate } from "react-router-dom";
const PrivateRouteBL=({children})=>{
    const token = localStorage.getItem("token");

    return token ? children : <Navigate to="/business-loan" />;
}
export default PrivateRouteBL;