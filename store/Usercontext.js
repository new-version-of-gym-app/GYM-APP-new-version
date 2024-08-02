import { createContext, useState } from "react";

export const Userctx = createContext({
  username: "",
  role: "",
  token: "",
  id: "",
  photo : "" , 
  email : "" ,
  phone : "" ,
  logout: () => {},
  addid: () => {},
  addtoken: () => {},
  addusername: () => {},
  addrole: () => {},
  addphoto : ()=>{} , 
  addemail : ()=>{} , 
  addphone : ()=>{}
});

function Userprovider({ children }) {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");
  const [photo , setPhoto] = useState("")
  const [id, setId] = useState("");
  const [email,setEmail] = useState("")
  const [phone,setPhone] = useState("")

  const addtoken = (tkn) => {
    setToken(tkn);
  };

  const addemail = (eml)=>{
    setEmail(eml)
  }


  const addusername = (name) => {
    setUsername(name);
  };

  const addrole = (role) => {
    setRole(role);
  };
 
  const addphoto = (pic)=>{
      setPhoto(pic)
  }
  const addid = (id) => {
    setId(id);
  };

  const addphone = (ph)=>{
    setPhone(ph)
  }
  const logout = () => {
    setToken("");
    setUsername("");
    setRole("");
    setId("");
  };

  const values = {
    username: username,
    role: role,
    token: token,
    id: id,
    photo : photo , 
    email : email ,
    phone : phone ,
    addemail : addemail ,
    addtoken: addtoken,
    logout: logout,
    addusername: addusername,
    addrole: addrole,
    addid: addid,
    addphoto :addphoto , 
    addphone : addphone
  };

  return <Userctx.Provider value={values}>
    {children}
  </Userctx.Provider>
}

export default Userprovider;