import React from "react";
import UserModal from "./modal";
import Table from "./table";
import { UserContext } from "../UserContext";
import { useState } from "react";
const Main = () => {
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const [submit, setSubmit] = useState(true);
  const [isUpdate, setIsUpdate] = useState(true);
  const [isDelete, setIsDelete] = useState(false);
  const [users, setUsers] = useState([]);
  const [initialState, setInitialState] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
  });

  const value = {
    id,
    setId,
    open,
    setOpen,
    submit,
    setSubmit,
    isUpdate,
    setIsUpdate,
    isDelete,
    setIsDelete,
    users,
    setUsers,
    initialState,
    setInitialState,
  };
  return (
    <div>
      <UserContext.Provider value={value}>
        <div>
          <UserModal />
        </div>
        <div>
          <Table />
        </div>
      </UserContext.Provider>
    </div>
  );
};

export default Main;
