import { useState } from "react";
import { motion } from "motion/react";
import { postUser } from "../redux/thunks/postUser";
import { useDispatch } from "react-redux";
import axios from "axios";

const BACKEND_URL = "https://shop-backend-jg9e.onrender.com"; // ← change to your backend

// debouncer
let debounceTimer;
const debounce = (callback, delay = 700) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(callback, delay);
};

function Profile() {
  const dispatch = useDispatch();

  const [focusedField, setFocusedField] = useState(null);
  // const [isTyping, setIsTyping] = useState({});

  const [value, setValue] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [availability, setAvailability] = useState({
    usernameAvailable: null,
    emailAvailable: null,
    usernameChecking: false,
    emailChecking: false,
  });

  const handleFocus = (fieldName) => setFocusedField(fieldName);
  const handleBlur = () => setFocusedField(null);

  // -------------------------------------------------------------------
  // HANDLE INPUT CHANGE
  // -------------------------------------------------------------------
  const handleInputChange = (fieldName, inputValue) => {
    setValue((prev) => ({ ...prev, [fieldName]: inputValue }));

    setIsTyping((prev) => ({
      ...prev,
      [fieldName]: inputValue.length > 0,
    }));

    // USERNAME --------------------------------------------------------
    if (fieldName === "username") {
      if (inputValue.length < 3) {
        setErrors((prev) => ({
          ...prev,
          username: "Username must be at least 3 characters",
        }));
        setAvailability((prev) => ({
          ...prev,
          usernameAvailable: false,
        }));
        return;
      }

      setErrors((prev) => ({ ...prev, username: "" }));

      debounce(async () => {
        setAvailability((prev) => ({ ...prev, usernameChecking: true }));

        try {
          const { data } = await axios.post(
            `${BACKEND_URL}/api/users/check-availability`,
            { username: inputValue }
          );

          setAvailability((prev) => ({
            ...prev,
            usernameAvailable: data.usernameAvailable,
            usernameChecking: false,
          }));

          if (!data.usernameAvailable) {
            setErrors((prev) => ({
              ...prev,
              username: "Username already taken",
            }));
          }
        } catch (err) {
          console.error(err);
          setAvailability((prev) => ({
            ...prev,
            usernameChecking: false,
          }));
        }
      });
    }

    // EMAIL ------------------------------------------------------------
    if (fieldName === "email") {
      const valid = /\S+@\S+\.\S+/.test(inputValue);

      if (!valid) {
        setErrors((prev) => ({
          ...prev,
          email: "Invalid email format",
        }));
        setAvailability((prev) => ({
          ...prev,
          emailAvailable: false,
        }));
        return;
      }

      setErrors((prev) => ({ ...prev, email: "" }));

      debounce(async () => {
        setAvailability((prev) => ({ ...prev, emailChecking: true }));

        try {
          const { data } = await axios.post(
            `${BACKEND_URL}/api/users/check-availability`,
            { email: inputValue }
          );

          setAvailability((prev) => ({
            ...prev,
            emailAvailable: data.emailAvailable,
            emailChecking: false,
          }));

          if (!data.emailAvailable) {
            setErrors((prev) => ({
              ...prev,
              email: "Email already registered",
            }));
          }
        } catch (err) {
          console.error(err);
          setAvailability((prev) => ({
            ...prev,
            emailChecking: false,
          }));
        }
      });
    }

    // PASSWORD ---------------------------------------------------------
    if (fieldName === "password") {
      if (inputValue.length < 6) {
        setErrors((prev) => ({
          ...prev,
          password: "Password must be at least 6 characters",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          password: "",
        }));
      }
    }
  };

  // SUBMIT --------------------------------------------------------------
  const handleForm = async (e) => {
    e.preventDefault();
    await dispatch(postUser(value));
  };

  return (
    <>
      <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-purple-700 min-h-[100dvh] flex items-center justify-center p-4">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleForm}
          className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 w-full max-w-md flex flex-col items-center justify-center gap-6 rounded-2xl shadow-2xl border border-slate-700"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text p-2"
          >
            Sign in
          </motion.h2>

          {/* USERNAME FIELD */}
          <motion.div
            className="w-full flex flex-col gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label
              htmlFor="username"
              className="text-left text-lg font-semibold text-slate-300"
            >
              Username
            </label>

            <motion.input
              type="text"
              id="username"
              name="username"
              placeholder="type your username..."
              onFocus={() => handleFocus("username")}
              onBlur={handleBlur}
              onChange={(e) => handleInputChange("username", e.target.value)}
              value={value.username}
              required
              animate={
                focusedField === "username"
                  ? {
                      borderColor: "#06b6d4",
                      boxShadow: "0 0 20px rgba(6, 182, 212, 0.5)",
                      scale: 1.02,
                    }
                  : {
                      borderColor: "rgb(71, 85, 105)",
                      boxShadow: "0 0 0px rgba(6, 182, 212, 0)",
                      scale: 1,
                    }
              }
              transition={{ type: "spring", stiffness: 300 }}
              className="border-2 border-slate-600 rounded-lg p-3 bg-slate-800 text-white placeholder-slate-500 text-base focus:outline-none transition-all duration-300"
            />

            {errors.username && (
              <p className="text-red-400 text-sm">{errors.username}</p>
            )}

            {availability.usernameChecking && (
              <p className="text-blue-400 text-sm">Checking username...</p>
            )}
          </motion.div>

          {/* PASSWORD FIELD */}
          <motion.div
            className="w-full flex flex-col gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label
              htmlFor="password"
              className="text-left text-lg font-semibold text-slate-300"
            >
              Password
            </label>

            <motion.input
              type="password"
              id="password"
              name="password"
              placeholder="type your password..."
              onFocus={() => handleFocus("password")}
              onBlur={handleBlur}
              onChange={(e) => handleInputChange("password", e.target.value)}
              value={value.password}
              required
              animate={
                focusedField === "password"
                  ? {
                      borderColor: "#06b6d4",
                      boxShadow: "0 0 20px rgba(6, 182, 212, 0.5)",
                      scale: 1.02,
                    }
                  : {
                      borderColor: "rgb(71, 85, 105)",
                      boxShadow: "0 0 0px rgba(6, 182, 212, 0)",
                      scale: 1,
                    }
              }
              transition={{ type: "spring", stiffness: 300 }}
              className="border-2 border-slate-600 rounded-lg p-3 bg-slate-800 text-white placeholder-slate-500 text-base focus:outline-none transition-all duration-300"
            />

            {errors.password && (
              <p className="text-red-400 text-sm">{errors.password}</p>
            )}
          </motion.div>

          {/* EMAIL FIELD */}
          <motion.div
            className="w-full flex flex-col gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label
              htmlFor="email"
              className="text-left text-lg font-semibold text-slate-300"
            >
              Email
            </label>

            <motion.input
              type="email"
              id="email"
              name="email"
              placeholder="type your email..."
              onFocus={() => handleFocus("email")}
              onBlur={handleBlur}
              onChange={(e) => handleInputChange("email", e.target.value)}
              value={value.email}
              required
              animate={
                focusedField === "email"
                  ? {
                      borderColor: "#06b6d4",
                      boxShadow: "0 0 20px rgba(6, 182, 212, 0.5)",
                      scale: 1.02,
                    }
                  : {
                      borderColor: "rgb(71, 85, 105)",
                      boxShadow: "0 0 0px rgba(6, 182, 212, 0)",
                      scale: 1,
                    }
              }
              transition={{ type: "spring", stiffness: 300 }}
              className="border-2 border-slate-600 rounded-lg p-3 bg-slate-800 text-white placeholder-slate-500 text-base focus:outline-none transition-all duration-300"
            />

            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email}</p>
            )}

            {availability.emailChecking && (
              <p className="text-blue-400 text-sm">Checking email...</p>
            )}
          </motion.div>

          {/* SUBMIT */}
          <motion.button
            type="submit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(6, 182, 212, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg px-6 py-3 mt-4 transition-all duration-300 shadow-lg hover:from-cyan-400 hover:to-blue-500 active:shadow-inner"
          >
            Submit
          </motion.button>
        </motion.form>
      </div>
    </>
  );
}

export default Profile;
