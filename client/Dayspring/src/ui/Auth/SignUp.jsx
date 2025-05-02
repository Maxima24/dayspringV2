import React from "react";
import { Form, useNavigate } from "react-router-dom";
import { redirect } from "react-router-dom";
import store from "../../store";
import { signUp } from "../../feautures/userSlice";
import { CreateUser } from "../../services/apiAuth";

const SignUpForm = () => {
  const navigate= useNavigate()
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-slate-950 to-slate-800 px-4 py-5 pb-24 overflow-auto ">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl space-y-6 mb-12 overflow-x-hidden mt-[10rem] ">
        <h2 className="text-center text-2xl font-bold text-white">Sign Up</h2>

        <Form method="post" className="space-y-4">
          <div>
            <label className="block text-sm text-white mb-1">Username</label>
            <input
              type="text"
              name="username"
              placeholder="yourusername"
              required
              className="w-full p-2 rounded-md bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <div>
            <label className="block text-sm text-white mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full p-2 rounded-md bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <div>
            <label className="block text-sm text-white mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="w-full p-2 rounded-md bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <div>
            <label className="block text-sm text-white mb-1">Role</label>
            <select
              name="role"
              required
              className="w-full p-2 rounded-md bg-white/20 text-stone-300 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <option value="">Select a role</option>
              <option value="GUEST">Guest</option>
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          
        </Form>
       
        <div className="flex items-center gap-2 text-white">
          <hr className="flex-grow border-white/30" />
          <span className="text-sm">or</span>
          <hr className="flex-grow border-white/30" />
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

  console.log("Form Data:", data);
    const user = await CreateUser(data)
  // Optionally call an API
  console.log(user)
  // const newUser = await CreateUser(data);

  // Dispatch to Redux
  store.dispatch(signUp(user));
  const state = store.getState()
  const username = state.user.data.username
  console.log(username)

  localStorage.setItem("token",user?.token)
  const roles = user.data.role
  
 
  // Redirect or return something
  return redirect(`/home/${roles}`); // change as needed}
}
export default SignUpForm;
