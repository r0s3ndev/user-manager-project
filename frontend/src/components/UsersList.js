import React, { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
function UsersList({data, deleteUser, editUser}) {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedUser, setSelectedUser] = useState(null);

  // const handleRemoveClick = (roleToRemove) => {
  //   setSelectedUser.assignedRoles(selectedUser.assignedRoles.filter((r) => r !== roleToRemove));
  // }

  const openModal = (data) => {
    console.log(data.id);
    setSelectedUser(data); 
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false); 
    setSelectedUser(null);
  };

    
  return (
  <div className='w-6/12 overflow-auto p-2'>
    <ul className="divide-y divide-gray-100">
      {data.map((data) => (
        <li key={data.id} className="hover:bg-slate-200 flex justify-between">
          <div className="">
              <p className="text-sm/6 font-semibold text-gray-900">{data.username}</p>
              <p className="truncate text-xs text-gray-500">{data.email}</p>
          </div>
          <div className="">
            {data.assignedRoles.map((role) => (
              <p key={role.name} className="text-xs text-gray-400">{role.name}</p>
            ))}
          </div>
          <div className=" sm:flex sm:flex-col sm:items-end">
            <button onClick={()=>openModal(data)} className=" text-xs font-semibold text-gray-600 hover:text-cyan-600" >edit</button>
            <button onClick={()=>deleteUser(data.id)} className=" text-xs text-gray-400 hover:text-rose-600" >remove</button>
          </div>
        </li>
      ))}
    </ul>
    
    {isModalOpen && selectedUser && (
        <Dialog open={isModalOpen} onClose={closeModal} className="relative z-50">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="w-full max-w-md bg-white rounded-lg p-6 shadow-md">
              <DialogTitle className="text-lg font-semibold text-gray-900">
                Edit User
              </DialogTitle>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder={selectedUser.username}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, username: e.target.value })
                    }
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder={selectedUser.email}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, email: e.target.value })
                    }
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  {/* <div className="flex items-center space-x-2 text-xs">
                    <select id="roles" className="outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" name="roles" onChange={handleSelectedRole}>
                      <option value="none" defaultChecked>NONE</option>
                      <option value="owner">OWNER</option>
                      <option value="operator">OPERATOR</option>
                      <option value="maintainer">MAINTAINER</option>
                      <option value="developer">DEVELOPER</option>
                      <option value="reporter">REPORTER</option>
                    </select>
                  </div> */}
                  
                  <div className="flex items-center text-xs my-2 gap-1">
                    {selectedUser.assignedRoles.map((r) => (
                      <div key={r.name} className="flex px-1.5 pb-0.5 gap-2 bg-indigo-300 text-white text-xs rounded-lg">
                       {/* <button onClick={()=> {handleRemoveClick(r)}} className="flex items-center justify-center text-indigo-500">x</button> */}
                       <p>{r.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={()=> editUser(selectedUser)}
                  className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700"
                >
                  Save
                </button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    


        {/* {data.map((data) => (
            <div key={data.id}>
                <button onClick={()=>deleteUser(data.id)}>x</button>
                <p> {data.username} </p>
                <p> {data.email} </p>
                {data.assignedRoles.map((role) => (
                    <p>{role.name}</p>
                ))}
            </div>
        ))} */}

  
        
  </div>

    
  )
}

export default UsersList