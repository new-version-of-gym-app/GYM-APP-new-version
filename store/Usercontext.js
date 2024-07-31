import { createContext, useState } from "react";

export const Userctx = createContext({
  username: "",
  role: "",
  token: "",
  id: "",
  logout: () => {},
  addid: () => {},
  addtoken: () => {},
  addusername: () => {},
  addrole: () => {},
});

function Userprovider({ children }) {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");
  const [id, setId] = useState("");

  const addtoken = (tkn) => {
    setToken(tkn);
  };
  const addusername = (name) => {
    setUsername(name);
  };

  const addrole = (role) => {
    setRole(role);
  };

  const addid = (id) => {
    setId(id);
  };
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
    addtoken: addtoken,
    logout: logout,
    addusername: addusername,
    addrole: addrole,
    addid: addid,
  };

  return <Userctx.Provider value={values}>
    {children}
  </Userctx.Provider>
}

export default Userprovider;