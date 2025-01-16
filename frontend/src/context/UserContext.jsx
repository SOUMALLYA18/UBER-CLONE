import React, { createContext, useState } from "react";

export const userDataContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    email: "",
    fullName: {
      firstName: "",
      lastName: "",
    },
  });
  return (
    <div>
      <userDataContext.Provider value={user}>
        {children}
      </userDataContext.Provider>
    </div>
  );
};

export default UserContext;
