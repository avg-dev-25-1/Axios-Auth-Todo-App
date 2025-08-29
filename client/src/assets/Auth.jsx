import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useCookies } from "react-cookie";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(5, "Minimum 5 characters are required")
    .required("Password is required"),
  confirmPassword: yup.string().when("isSignUp", {
    is: true,
    then: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref("password")], "Passwords must match"),
  }),
});

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const [cookie, setCookie, removeCookie] = useCookies(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      isSignUp: false,
    },
  });

  const onSubmit = async (data) => {
    const endpoint = isLogin ? "login" : "signup";
    try {
      const response = await axios.post(`http://localhost:5000/${endpoint}`, {
        email: data.email, //send the email (data.email) from input to backend(by matching request terms(req.body) in backend which id LHS(before ":") of expression email:data.email)
        password: data.password, //same explanation holds good
      });
      const result = response.data;

      if (result.detail && result.detail !== "Login successfull") {
        setError(result.detail);
        // console.log(`Logged in as ${result.email}`);
      } else {
        setCookie("Email", result.email); //this is same as response.data.email
        setCookie("AuthToken", result.token);
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.response?.data?.detail || "Request Failed");
      console.error("Auth error:", error);
    }
  };

  const viewLogin = (status) => {
    setIsLogin(status);
    setError(null);
  };

  const isSignUp = !isLogin;
  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>{isLogin ? "Please Log in" : "Please Sign up"}</h2>

          <input type="hidden" value={isSignUp} {...register("isSignUp")} />

          <input type="email" placeholder="email" {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}

          <input
            type="password"
            placeholder="password"
            {...register("password")}
          />
          {errors.password && <p>{errors.password.message}</p>}

          {!isLogin && (
            <>
              <input
                type="password"
                placeholder="confirm password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p>{errors.confirmPassword.message}</p>
              )}
            </>
          )}

          <input
            type="submit"
            className="create"
            value={isLogin ? "Log in" : "Sign up"}
          />
          {error && <p>{error}</p>}
        </form>

        <p className="auth-options">
          {isLogin ? "Don't have an account" : "Already have an account"}
          {}
          <span onClick={() => viewLogin(!isLogin)}>
            {isLogin ? "Sign up" : " Log in"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
