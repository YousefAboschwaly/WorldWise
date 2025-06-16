import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext()

function AuthProvider({children}){
const initialState = {
  user:{},
  isAuthenticated:false,

}
function reducer(state, action) {
  switch(action.type){
    case 'login':return {...state , user:action.payload,isAuthenticated:true}
    case 'logout':return {...state , user:null,isAuthenticated:false}
    default:{
      throw new Error(`Unhandled action type: ${action.type}`);
    }

  }
}
function login(email , password){
  if(email === 'jonas@jonas.io' && password === 'jonas'){
    dispatch({type:'login',payload:{email , password}})}
}

function logout(){}
const [{user , isAuthenticated}, dispatch] = useReducer(reducer,initialState)


  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

 function useAuth(){
  const context =useContext(AuthContext)
  if(!context){
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return AuthContext
}
// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };