import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AuthHeader from "../../components/auth/AuthHeader.jsx";
import AuthFormWrapper from "../../components/auth/AuthFormWrapper.jsx";
import PasswordInput from "../../components/auth/PasswordInput.jsx";
import { AUTH_MODES, DEFAULT_MODE } from "../../config/authConfig.js";
import { login, register } from "../../services/authService.js";
import { getRoleFromToken } from "../../utils/jwtDecode.js";

const AuthPage = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const mode = searchParams.get("mode") || DEFAULT_MODE;

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [role, setRole] = useState("University");
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);
    const [code, setCode] = useState("");

    useEffect(() => {
        if (!Object.values(AUTH_MODES).includes(mode)) {
            setSearchParams({ mode: DEFAULT_MODE });
        }
    }, [mode, setSearchParams]);

    const switchMode = (newMode) => {
        setSearchParams({ mode: newMode });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        switch (mode) {

            case AUTH_MODES.SIGNIN: {
                const result = await login(username, password);
                if (result.success) {
                    const userRole = getRoleFromToken().toUpperCase();
                    if (userRole === "ADMIN") {
                        switchMode(AUTH_MODES.REGISTER_ADMIN);
                    }
                    else {
                        navigate("/")
                    }
                } else {
                    alert(result.message);
                }
                break;
            }

            case AUTH_MODES.REGISTER_ADMIN:
                {
                    const result = await register(role, username, email, password);
                    if (result.success) {
                        alert("Registration successful");
                        switchMode(AUTH_MODES.SIGNIN);
                    } else {
                        alert(result.message);
                    }
                    break;
                }

            case AUTH_MODES.REGISTER_STUDENT: {
                const result = await register('STUDENT', username, email, password);
                if (result.success) {
                    alert("Registration successful");
                    switchMode(AUTH_MODES.SIGNIN);
                } else {
                    alert(result.message);
                }
                break;
            }

            case AUTH_MODES.RESET: {
                if (password !== rePassword) {
                    alert("Passwords do not match");
                    return;
                }
                alert("Password successfully reset!");
                switchMode(AUTH_MODES.SIGNIN);
                break;
            }

            case AUTH_MODES.FORGOT: {
                alert(`Reset code sent to ${email}`);
                break;
            }

            default:
                break;
        }
    };

    const handleForgotPassword = (e) => {
        e.preventDefault();
        alert(`Reset code sent to ${email}`);
    };

    const handleVerifyCode = (e) => {
        e.preventDefault();
        alert(`Code ${code} verified`);
        switchMode(AUTH_MODES.RESET);
    };

    const getTitle = () => {
        switch (mode) {
            case AUTH_MODES.SIGNIN: return "Sign In";
            case AUTH_MODES.REGISTER_ADMIN: return "Create Account";
            case AUTH_MODES.REGISTER_STUDENT: return "Create Student";
            case AUTH_MODES.FORGOT: return "Forgot Password";
            case AUTH_MODES.RESET: return "Reset Password";
            default: return "Auth";
        }
    };


    const resetForm = () => {
        setUsername("");
        setEmail("");
        setPassword("");
        setRePassword("");
        setCode("");
        setRememberMe(false);
        setShowPassword(false);
        setShowRePassword(false);
    };

    useEffect(() => {
        resetForm();
    }, [mode]);

    return (
        <div className="min-h-screen bg-gray-50">
            <AuthHeader />

            <AuthFormWrapper>

                {mode !== AUTH_MODES.REGISTER_ADMIN && (

                    <h2 className="text-2xl mb-8 font-mono">{getTitle()}</h2>
                )}

                {mode === AUTH_MODES.REGISTER_ADMIN && (
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 gap-4">
                        <h2 className="text-2xl font-mono">{getTitle()}</h2>

                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full sm:w-40 px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0A65CC] transition"
                        >
                            <option value="University">University</option>
                            <option value="Company">Company</option>
                        </select>
                    </div>
                )}

                {(mode === AUTH_MODES.SIGNIN ||
                    mode === AUTH_MODES.REGISTER_ADMIN ||
                    mode === AUTH_MODES.REGISTER_STUDENT) && (
                        <div className="mb-5">
                            <input
                                type="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#0A65CC]"
                            />
                        </div>
                    )}

                {(mode !== AUTH_MODES.SIGNIN &&
                    mode !== AUTH_MODES.RESET) && (
                        <div className="mb-5">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-[#0A65CC]"
                            />
                        </div>
                    )}

                {(mode !== AUTH_MODES.FORGOT) && (
                    <PasswordInput
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        show={showPassword}
                        setShow={setShowPassword}
                    />
                )}

                {mode === AUTH_MODES.RESET && (
                    <PasswordInput
                        value={rePassword}
                        onChange={(e) => setRePassword(e.target.value)}
                        placeholder="Confirm Password"
                        show={showRePassword}
                        setShow={setShowRePassword}
                    />
                )}

                {mode === AUTH_MODES.SIGNIN && (
                    <div className="flex justify-between items-center mb-6 text-sm">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                                className="w-4 h-4 accent-[#0A65CC]"
                            />
                            <span className="text-gray-600">Remember me</span>
                        </label>

                        <button
                            type="button"
                            onClick={() => switchMode(AUTH_MODES.FORGOT)}
                            className="text-[#0A65CC] hover:underline"
                        >
                            Forgot password?
                        </button>
                    </div>
                )}

                {mode === AUTH_MODES.FORGOT && (
                    <>
                        <button
                            onClick={handleForgotPassword}
                            className="w-full py-3 mb-4 bg-[#0A65CC] text-white rounded hover:bg-[#084fa3]"
                        >
                            Send Code →
                        </button>

                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Confirmation Code"
                            className="w-full px-4 py-3 mb-4 border border-gray-300 rounded focus:ring-2 focus:ring-[#0A65CC]"
                        />

                        <button
                            onClick={handleVerifyCode}
                            className="w-full py-3 bg-[#0A65CC] text-white rounded hover:bg-[#084fa3]"
                        >
                            Verify Code →
                        </button>
                    </>
                )}

                {mode !== AUTH_MODES.FORGOT && (
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full py-3 bg-[#0A65CC] text-white rounded hover:bg-[#084fa3] transition font-mono"
                    >
                        {getTitle()} →
                    </button>
                )}

                {(mode === AUTH_MODES.REGISTER_ADMIN ||
                    mode === AUTH_MODES.REGISTER_STUDENT) && (
                        <p className="text-sm text-center mt-6 text-gray-600">
                            Already have an account?{" "}
                            <span
                                onClick={() => switchMode(AUTH_MODES.SIGNIN)}
                                className="text-[#0A65CC] cursor-pointer hover:underline"
                            >
                                Sign In
                            </span>
                        </p>
                    )}

            </AuthFormWrapper>
        </div>
    );
};

export default AuthPage;