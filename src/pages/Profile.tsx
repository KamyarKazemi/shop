import { useState } from "react";
import { motion } from "motion/react";
import { postUser } from "../redux/thunks/postUser";
import { useDispatch } from "react-redux";

function Profile() {
  const dispatch = useDispatch();

  const [focusedField, setFocusedField] = useState(null);
  const [isTyping, setIsTyping] = useState({});
  const [value, setVaule] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleInputChange = (fieldName, inputValue) => {
    // Update the form values
    setVaule((prev) => ({
      ...prev,
      [fieldName]: inputValue,
    }));

    // Track if field is being typed
    setIsTyping((prev) => ({
      ...prev,
      [fieldName]: inputValue.length > 0,
    }));
  };

  const handleForm = async (e) => {
    e.preventDefault();
    const userInfo = value;
    await dispatch(postUser(userInfo));
  };

  return (
    <>
      <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-purple-700 min-h-[100dvh] flex items-center justify-center p-4">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={() => handleForm()}
          className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 w-full max-w-md flex flex-col items-center justify-center gap-6 rounded-2xl shadow-2xl border border-slate-700"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text"
          >
            Profile
          </motion.h2>

          {/* Username Field */}
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
            {isTyping.username && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100%" }}
                exit={{ opacity: 0, width: 0 }}
                className="h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
              />
            )}
          </motion.div>

          {/* Password Field */}
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
              name="password"
              id="password"
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
            {isTyping.password && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100%" }}
                exit={{ opacity: 0, width: 0 }}
                className="h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
              />
            )}
          </motion.div>

          {/* email */}

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
              email
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
            {isTyping.email && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100%" }}
                exit={{ opacity: 0, width: 0 }}
                className="h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
              />
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            typeof="submit"
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
