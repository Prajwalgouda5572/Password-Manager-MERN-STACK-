"use client"
import Navbar from "./components/Navbar";
import { useRef, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast, Bounce } from 'react-toastify';

export default function Home() {

  const ref = useRef()
  const passref = useRef()

  const [form, setform] = useState({ website: "", username: "", password: "" })
  const [passwordArray, setpasswordArray] = useState([])

  useEffect(() => {
    fetchdata()
  }, [])

  async function fetchdata(params) {
    let data = await fetch("http://localhost:5000/")
    let arr = await data.json();
    setpasswordArray([...arr])
  }


  function showpass(e) {
    e.preventDefault()
    if (ref.current.textContent === "visibility_off") {
      passref.current.type = "text"
      ref.current.textContent = "visibility"
    } else {
      ref.current.textContent = "visibility_off"
      passref.current.type = "password"
    }
  }

  function handlechange(e) {
    e.preventDefault()
    setform({ ...form, [e.target.name]: e.target.value })
  }

  async function handlesave(e) {

    if (form.username.length > 3 && form.password.length > 3) {
      e.preventDefault();
      let updated = { ...form, id: uuidv4() }

      const response = await fetch("http://localhost:5000/", {
        method: "POST", // Specify the HTTP method
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updated)
      });
      setpasswordArray([...passwordArray,updated])

      form.website = ""
      form.username = ""
      form.password = ""

      toast("Password saved successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    } else {
      toast("Password not saved", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    }
  }

  function handlecopy(text) {
    navigator.clipboard.writeText(text)
    toast("Copied to clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Bounce,
    });
  }

  async function deletepass(id) {

    const response = await fetch(`http://localhost:5000/${id}`, {
        method: "DELETE", // Specify the HTTP method
      });
      fetchdata();

    toast("Password Deleted", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Bounce,
    });
  }

  function editpass(item) {
    form.website = item.website
    form.username = item.username
    form.password = item.password
    deletepass(item.id);
  }

  return (

    <div className=" bg-blue-100 h-screen">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Navbar />
      <div className="heading flex justify-center pt-5">
        <div className="flex flex-col">
          <div className="flex justify-center">
            <span className=" text-3xl font-bold">Pass-</span>
            <span className="text-green-500 text-3xl font-bold">Manager</span>
          </div>
          <p className="">Your own Password Manager</p>
        </div>
      </div>
      <div className="inp flex flex-col items-center">
        <input type="text" name="website" value={form.website || ""} placeholder="Enter website url" className="bg-white border-2 border-green-500 w-3/4 my-5 px-4 rounded-2xl h-8" onChange={handlechange} />
        <div className="ml-4.5">
          <input type="text" name="username" value={form.username || ""} placeholder="Enter Username" className="bg-white border-2 border-green-500 w-210 px-4 mr-4 rounded-2xl h-8" onChange={handlechange} />
          <input type="password" name="password" value={form.password || ""} placeholder="Password" className="bg-white border-2 border-green-500 w-70 px-4 rounded-2xl h-8" ref={passref} onChange={handlechange} />
          <span className="material-symbols-outlined cursor-pointer -translate-x-8 translate-y-1" ref={ref} onClick={showpass}>visibility_off</span>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="save flex my-5 gap-2 bg-green-400 w-24 h-10 items-center rounded-2xl cursor-pointer justify-center hover:bg-green-500" onClick={handlesave}>
          <span className="material-symbols-outlined">save</span>
          <span>Save</span>
        </div>
      </div>
      <div className="mt-3">
        <span className="text-xl font-bold text-red-500 mx-46">Your Passwords</span>
      </div>
      {(passwordArray.length === 0) && <span className="mx-46 my-10 text-lg text-green-700">No Passwords to Display</span>}
      {(passwordArray.length != 0) && <div className="mx-46">
        <table className="table-auto w-full text-center mt-3 rounded-lg overflow-hidden">
          <thead className="">
            <tr className="bg-green-700 text-white h-9 items-center">
              <th className="w-130">Website url</th>
              <th>Username</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="bg-green-200 text-blue-700">
            {passwordArray.map(item => {
              return <tr className="h-8 border border-green-300 text-lg " key={item.id}>
                <td className="underline"><a href={item.website} target="_blank">{item.website}</a><span className="material-symbols-outlined text-[18px]! ml-3 translate-y-1.5 cursor-pointer" onClick={() => { handlecopy(item.website) }}>content_copy</span></td>
                <td className="">{item.username}<span className="material-symbols-outlined text-[18px]! ml-3 cursor-pointer" onClick={() => { handlecopy(item.username) }}>content_copy</span></td>
                <td className="">{"*".repeat(item.password.length)}<span className="material-symbols-outlined text-[18px]! ml-3 cursor-pointer" onClick={() => { handlecopy(item.password) }}>content_copy</span></td>
                <td>
                  <div>
                    <span className="material-symbols-outlined mr-4 cursor-pointer hover:bg-green-300" onClick={() => { editpass(item) }}>edit_square</span>
                    <span className="material-symbols-outlined cursor-pointer hover:bg-green-300" onClick={() => { deletepass(item.id) }}>delete</span>
                  </div>
                </td>
              </tr>
            })}

          </tbody>
        </table>
      </div>
      }

    </div>
  );
}
