import React, { useRef, useState, useEffect } from 'react'
import { FaRegCopy } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef()
    const passref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passswordArray, setpassswordArray] = useState([])


    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        setpassswordArray(passwords)
        console.log(passwords)
    }


    useEffect(() => {
        getPasswords()

    }, [])

    const savePassword = async () => {
        
        // localStorage.setItem("passwords", JSON.stringify([...passswordArray, { ...form, id: uuidv4() }]))
        
        await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"}, body: JSON.stringify({id:form.id}) })
        
        setpassswordArray([...passswordArray,{...form, id: uuidv4() }])
        await fetch("http://localhost:3000/",{method:"POST",headers:{"Content-Type":"application/json"}, body: JSON.stringify({ ...form,id:uuidv4() }) })


        setform({ site: "", username: "", password: "" })
        toast.success('Password saved!!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        navigator.clipboard.writeText(text)
    }


    const showPassword = () => {
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passref.current.type = "password"
        } else {
            ref.current.src = "icons/eyecross.png"
            passref.current.type = "text"
        }
    }

    const handleEdit = (id) => {
        setform({...passswordArray.filter(i => i.id === id)[0], id:id})
        setpassswordArray(passswordArray.filter(item => item.id !== id))
    }

    const handleDelete =  async(id) => {
        let confirmation = confirm("Are you sure you want to delete this?!")
        if (confirmation) {
            setpassswordArray(passswordArray.filter(item => item.id !== id))
            // localStorage.setItem("passwords", JSON.stringify(passswordArray.filter(item => item.id !== id)))
            let res= await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"}, body: JSON.stringify({id}) })
        }
    }



    return (

        <div className='md:w-1/2 mx-auto md:container bg-green-200 text-green-400 mt-6 rounded-xl shadow-2xl md:p-5 p-2'>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <h1 className='text-center text-3xl mb-4 font-bold text-green-700'>SafePass: Your Secure Password Vault</h1>
            <input onChange={handleChange} value={form.site} placeholder='Enter website URL' type="text" className='w-full inputBox' name='site' />
            <div className='flex md:flex-row flex-col md:gap-4'>
                <input onChange={handleChange} value={form.username} placeholder='Username' type="text" className='inputBox md:w-2/3' name='username' />
                <div className='relative md:w-1/3'>
                    <input ref={passref} onChange={handleChange} value={form.password} placeholder='Password' className='inputBox w-full relative' name='password' type='password' />
                    <img src="icons/eye.png" ref={ref} onClick={showPassword} className='absolute top-5 right-3 cursor-pointer' width={20} alt="" />
                </div>
            </div>
            <div className='flex items-center justify-center'>
                <button onClick={savePassword} className='my-3 font-extralightathin text-lg text-black bg-green-500 px-8 py-2 rounded-full border-green-800 border-2 hover:bg-green-600 disabled:bg-green-300 disabled:text-white disabled:border-white' disabled={form.site === "" || form.username === "" || form.password === ""}>Save</button>
            </div>
            <div className="passwords my-3">
                <h2 className='text-2xl font-bold my-3 text-black'>Your Password</h2>
                {passswordArray.length === 0 && <div>No Passwords to show</div>}
                {passswordArray.length !== 0 && <table className="table-auto w-full text-center border-separate border-spacing-y-4">
                    <thead className='bg-green-950 shadow-xl'>
                        <tr>
                            <th className='py-3 md:p-3'>Website</th>
                            <th className='py-3 md:p-3'>Username</th>
                            <th className='py-3 md:p-3'>Password</th>
                            <th className='py-3 md:p-3'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='text-black'>
                        {passswordArray.map((item, index) => {
                            return <tr key={index} className='bg-green-100 shadow-xl'>
                                <td className=' py-3 md:p-3 flex items-center justify-center gap-2'><a href={item.site.startsWith('http') ? item.site : `https://${item.site}`} className='break-all hover:text-green-600 break-words' target='_blank'>{item.site}</a> <FaRegCopy onClick={() => copyText(item.site)} className='cursor-pointer min-w-4' /></td>
                                <td className='py-3 md:p-3 break-all'><div className='flex justify-center items-center gap-2'><span className=''>{item.username}</span> <FaRegCopy onClick={() => copyText(item.username)} className='cursor-pointer min-w-4' /></div></td>
                                <td className='py-3 md:p-3 break-all'><div className='flex justify-center items-center gap-2'><span className=''>{"•".repeat(item.password.length)}</span> <FaRegCopy onClick={() => copyText(item.password)} className='cursor-pointer min-w-4' /></div></td>
                                <td className='py-3 md:p-3'><div className='flex justify-center items-center gap-2'><CiEdit onClick={() => { handleEdit(item.id) }} className='cursor-pointer hover:text-green-600 text-xl min-w-4' /><MdDeleteOutline onClick={() => { handleDelete(item.id) }} className='cursor-pointer hover:text-green-600 text-xl min-w-4' /></div></td>
                            </tr>
                        })}

                    </tbody>
                </table>}
            </div>
        </div>
    )
}

export default Manager
