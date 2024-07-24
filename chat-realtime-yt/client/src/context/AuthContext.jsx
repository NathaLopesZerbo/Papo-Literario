import {createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    // variáveis usadas 
    const [user, setUser] = useState(null);
    // register
    const [registerError, setRegisterError] = useState(null)
    const [isRegisterLoading, setIsRegisterLoading] = useState(false)
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: "",
    });
    // login
    const [loginError, setLoginError] = useState(null)
    const [isLoginLoading, setIsLoginLoading] = useState(false)
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: "",
    });

    // retirar a informação do local Storage
    useEffect(() => {
        const storedUser = localStorage.getItem("User");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    },[setUser]); // Adicionando setUser como dependência
    
     console.log("User", user)
   // console.log("loginInfo", loginInfo)

     // update do usuário
    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []);
    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info);
    }, []);
    // função para registrar o usuário no sistema
    const registerUser = useCallback(async (e) =>{
        // evitar a renderização da página
        e.preventDefault()
        // ativou o carregamento e limpou os erros
        setIsRegisterLoading(true)
        setRegisterError(null)
        // trecho da solicitação http do postRequest
        const response =  await postRequest(
            `${baseUrl}/users/register`, 
            JSON.stringify(registerInfo))
            // pausou o carregamento
            setIsRegisterLoading(false)
            // verificação de erros
        if (response.error) {
            return setRegisterError(response);
        }
        // guardou o item/info no local Storage
        localStorage.setItem("User", JSON.stringify(response))
        setUser(response)
    }, [registerInfo]
    );
    // função de login
    const loginUser = useCallback( async (e) => {
        // evitar a renderização da página
        e.preventDefault()
        // ativou o carregamento e limpou os erros
        setIsLoginLoading(true)
        setLoginError(null)
        // trecho da solicitação http do postRequest
        const response =  await postRequest(
            `${baseUrl}/users/login`, 
            JSON.stringify(loginInfo))
            // pausou o carregamento
            setIsLoginLoading(false)

        if (response.error) {
            return setLoginError(response)
        }

        localStorage.setItem("User", JSON.stringify(response))
        setUser(response)

        console.log(user)

    },[loginInfo]);


    // sistema de logout
    const logoutUser = useCallback(() =>{
        localStorage.removeItem("User");
        setUser(null)
    },[]);

    return (
        <AuthContext.Provider value={{
        user, 
        registerInfo,
         updateRegisterInfo, 
         registerUser, 
         registerError, 
         isRegisterLoading,
         logoutUser,
         loginUser,
         loginError,
         loginInfo,
         updateLoginInfo,
         isLoginLoading
        }}>
            {children}
        </AuthContext.Provider>
    );
};