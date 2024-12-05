import axios from "axios";
import MainPage from "./components/MainPage";
import { useEffect, useState } from "react";
import UsersList from "./components/UsersList";


function App() {
  const [usersData, setUsersData] = useState([]);

  useEffect(()=>{
    getAllUser();
  },[]);

  const addUser = (user, email, role) => {
    if(user === "" || email === ""){
      console.error("Invalid forn. Field cannot be empty");
      //popup error
      return;
    } 
    const userObj = {
      username: user,
      email: email,
      assignedRoles: role
    }
    axios.post("http://localhost:8080/", userObj)
    .then((res) => {
      setUsersData((prevUsers) => [...prevUsers, res.data]);
    })
    .catch((e) => {
      console.error("Error adding user:", e);
    });
  }

  const getAllUser = () => {
    axios.get("http://localhost:8080/")
    .then((res) => {
      const data = res.data;
      console.log(data);
      setUsersData(data);
    }).catch((e) => {
      console.log("Error fetching users", e);
    })

  }

  const editUser = (selectedUser) => {
    console.log(selectedUser);
    const body = {
      "username": selectedUser.username,
      "email": selectedUser.email
    }
    axios.put(`http://localhost:8080/${selectedUser.id}`, body)
    .then((res) => {
      console.log(res)
    })
    .catch((e) => {
      console.error(`Error while updating user with ID ${selectedUser.id}`, e);
    })

  }

  const deleteUser = (id) => {
    axios.delete(`http://localhost:8080/${id}`)
    .then(() => {
      setUsersData((prevUsers) => prevUsers.filter((user) => user.id !== id));
    })
    .catch((e) => {
      console.error("Error deleting user:", e);
    });
  }


  return (
    <>  
      <div className="container m-auto">
        <h1 className="font-mono tracking-wide uppercase text-indigo-500 text-6xl"> User Management </h1>
      </div>
      <div className="container flex flex-row w-full h-80 mx-auto  border-y-4">
        <MainPage addUser={addUser}/>
        <UsersList data={usersData} deleteUser={deleteUser} editUser={editUser} />
      </div>
    </>
  );
}

export default App;
