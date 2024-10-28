"use client";


import { loginWithEmail, loginWithGoogle } from "@/lib/db/authUtils/authFunctions";
import { saveToLocalStorage } from "@/lib/utils/localstoage";
import { AuthContext } from "@/providers/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { toast } from "sonner";
export default function useAuth() {
  const {Auth,setAuth}=useContext(AuthContext)
  const [loggingIn, setLoggingIn] = useState(false);
  const router = useRouter();
  const loginWithE = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    const email = e.target.email_signin.value;
    const password = e.target.password_signin.value;
    
    try {
      const resp = await loginWithEmail({ email, password });
      saveToLocalStorage("user_profile", resp);
      setAuth(resp);
      toast.success("Logged in successfully", {
        //success toast style
        position: "top-right",
        style: {
          background: "#038654",
          color: "#fff",
        },
        duration: 3000,
      });
      router.push("/chat");
    } catch (err) {
      toast.error(err.message, {
        //error toast style
        position: "top-right",
        style: {
          background: "#C8497F",
          color: "#fff",
        },
      });
    } finally {
      setLoggingIn(false);
    }
  };
  // log out function to log the user out of google and set the profile array to null
  const loginWithG = useGoogleLogin({
    onSuccess: (codeResponse) => {
      
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${codeResponse.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then(async (res) => {
          setLoggingIn(true);

          const resp = await loginWithGoogle({
            email: res.data.email,
            name: res.data.name,
            id: res.data.id,
          });
           saveToLocalStorage("user_profile", resp);
          setAuth(resp);
          setLoggingIn(false);
          toast.success("Logged in successfully", {
            //success toast style
            position: "top-right",
            style: {
              background: "#038654",
              color: "#fff",
            },
          });
          router.push("/chat");
          
        })
        .catch((err) => {
          
          toast.error(err.message, {
            //error toast style
            position: "top-right",
            style: {
              background: "#C8497F",
              color: "#fff",
            },
          });
        });
    },
    onError: (error) => console.log("Login Failed:", error),
  });
  return {loginWithG,loginWithE,loggingIn, Auth,setAuth };
}
