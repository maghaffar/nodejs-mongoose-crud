import React from "react";
import { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
const Table = () => {
  const {
    id,
    setId,
    setOpen,
    setSubmit,
    setIsUpdate,
    isDelete,
    setIsDelete,
    users,
    setUsers,
    setInitialState,
  } = useContext(UserContext);
  const handleOpen = () => {
    setOpen(true);
    setIsUpdate(false);
  };
  const fetchData = async (id) => {
    setId(id);

    var requestOptions = {
      method: "GET",
    };

    const response = await fetch(
      `http://localhost:5001/users/${id}`,
      requestOptions
    );
    const res = await response.json();
    const data = {
      name: res[0].name,
      username: res[0].username,
      email: res[0].email,
      phone: res[0].phone,
      website: res[0].website,
    };

    setInitialState(data);
    handleOpen();
    setSubmit(false);
    setIsUpdate(true);
  };
  const Delete = async (userId) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };
    await fetch(`http://localhost:5001/users/${userId}`, requestOptions);

    await GetUsers();
  };
  const GetUsers = async () => {
    var requestOptions = {
      method: "GET",
    };

    const response = await fetch(
      "http://localhost:5001/users/",
      requestOptions
    );
    const data = await response.json();
    setUsers(data);
  };
  useEffect(() => {
    GetUsers();
  }, []);
  return (
    <div className="flex flex-col justify-center mt-4">
      <div>
        <button
          onClick={handleOpen}
          className="bg-green-500 p-2 text-white rounded-md ml-2"
        >
          Add User
        </button>
      </div>
      <table className="table-auto m-2">
        <thead>
          <tr className="bg-gray-500 text-left">
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => {
            return (
              <tr key={u._id} className="bg-gray-300">
                <td>{u.name}</td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
                <td>{u.website}</td>
                <td>
                  <button
                    className="mr-2 p-2 text-white rounded-md bg-yellow-500 w-16"
                    onClick={() => fetchData(u._id)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  {isDelete && u._id == id ? (
                    <div>
                      <button
                        className="p-2 text-white rounded-md bg-red-500 w-16"
                        onClick={() => Delete(u._id)}
                      >
                        Ok
                      </button>
                      <button
                        className="p-2 text-white rounded-md bg-yellow-500 ml-2"
                        onClick={() => setIsDelete(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setIsDelete(true);
                        setId(u._id);
                      }}
                      className="p-2 text-white rounded-md bg-red-500"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
