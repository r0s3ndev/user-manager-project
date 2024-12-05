import React, { useState } from 'react'

function MainPage({addUser}) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRoles] = useState([]);


    const handleSubmit = (e) => {
        e.preventDefault();
        addUser(username, email, role);

        setUsername("");
        setEmail("");
        setRoles([]);
    }

    const handleSelectedRole = (e) => {
      console.log(e);
      if(e.target.value === "none"){
        setRoles([]);
      } else {
        if(role.includes(e.target.value)){
          console.log("already selected!");
        } else {
          setRoles([...role, e.target.value]);
        }
      }
    }

    const handleRemoveClick = (roleToRemove) => {
      setRoles(role.filter((r) => r !== roleToRemove));
    }

  return (
    <div className='w-6/12 m-auto'>
      <form>
        <div className=" flex space-x-2 text-xs">
          {/* first row */}
          <div className="flex items-center">
            <label htmlFor="user">username</label>
            <input type="text" className="outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" id="user" name="user" value={username} onChange={(e) => setUsername(e.target.value)}/> <br/>
          </div>

          <div className="flex items-center ">
            <label htmlFor="email">email</label>
            <input type="text" className="outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/> <br/>
          </div>

          {/* second row */}
          <div className="flex items-center space-x-2 text-xs">
            <select id="roles" className="outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" name="roles" onChange={handleSelectedRole}>
              <option value="none" defaultChecked>NONE</option>
              <option value="owner">OWNER</option>
              <option value="operator">OPERATOR</option>
              <option value="maintainer">MAINTAINER</option>
              <option value="developer">DEVELOPER</option>
              <option value="reporter">REPORTER</option>
            </select>
          </div>

          <div>
            <button onClick={handleSubmit} className="bg-rose-500 px-2 text-center text-xs font-semibold text-white shadow-sm hover:bg-rose-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"> 
              &#8594; 
            </button>
          </div>
        </div>

        <div className="flex items-center text-xs my-2 gap-1">
          <label htmlFor="cars">selected role:</label>
          {role.map((r) => (
            <div key={r} className="flex px-1.5 pb-0.5 gap-2 bg-indigo-300 text-white text-xs rounded-lg">
              <button onClick={()=> handleRemoveClick(r)} className="flex items-center justify-center text-indigo-500">x</button> 
              {r}
            </div>
          ))}
        </div>
           
      </form>
    </div>
  )
}

export default MainPage