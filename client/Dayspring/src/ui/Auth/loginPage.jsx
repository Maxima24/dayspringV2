import React from "react";
import { Form, Navigate, redirect, useActionData, useNavigate } from "react-router-dom";
import { LoginUser } from "../../services/apiAuth";
import { loginUser } from "../../feautures/userSlice"; // Replace with your actual login function
import store from "../../store";
import { useSelector } from "react-redux";


const LoginForm = () => {
  const actionData = useActionData()
  const navigate = useNavigate(); // Used to show error messages returned from the action

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 to-slate-800 px-4">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white/10 backdrop-blur-md p-3 sm:p-8 rounded-2xl mt-[6rem]">
        <h2 className="text-center text-2xl font-bold text-white">Log In</h2>

        <Form method="POST" className="space-y-4">
          <div>
            <label className="block text-sm text-white mb-1">Email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full p-2 rounded-md bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <div>
            <label className="block text-sm text-white mb-1">Password</label>
            <input
              name="password"
              type="password"
              
              placeholder="••••••••"
              className="w-full p-2 rounded-md bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          {actionData?.error && (
            <p className="text-red-400 text-sm mt-1">{actionData.error}</p>
          )}
            <div className="flex items-center justify-center gap-4 ">
            <button type="button"
              onClick={()=> 
              navigate("/newuser/signup") 
              }
            className="w-fit px-12 py-2 rounded-md bg-cyan-500 hover:bg-cyan-600 text-white font-semibold"
          >
            Sign Up
          </button>
          <button
            type="submit"
            className="w-fit  py-2 px-12  rounded-md bg-cyan-500 hover:bg-cyan-600 text-white font-semibold"
          >
            Log In
          </button>
            </div>
        
        </Form>

        <div className="flex items-center gap-2 text-white mb-4 mt-4">
          <hr className="flex-grow border-white/30" />
          <span className="text-sm">or</span>
          <hr className="flex-grow border-white/30 " />
        </div>

        <button
          onClick={() => alert("Google Login Placeholder")}
          className="w-full py-2 rounded-md border border-white/30 hover:bg-white/10 text-white font-medium flex items-center justify-center gap-2"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export async function action({ request }) {
 
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log("Login Data:", data);
  

  try {
   
    const user = await LoginUser(data);
    
    store.dispatch(loginUser(user.data))
    const state = store.getState()
    const username = state.user.username

  // const username = state.user.data.username
  console.log(state)
    console.log(user)
    // Call your backend API
    console.log("Logged in:", user);
 
    localStorage.setItem("token",user?.token)
    
    // Do something with user like saving in localStorage or redirecting
    const role = user.data.role

    console.log(role)
    return redirect(`/home/${role}/${username}`)
    // Redirect or return something
   ;
  } catch (err) {
    console.log(err)
    return { error: "Invalid email or password." };
  }
}

export default LoginForm;
