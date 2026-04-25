import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo, useCallback } from "react";
import AuthHeader from "../../components/auth/AuthHeader.jsx";
import AuthFormWrapper from "../../components/auth/AuthFormWrapper.jsx";
import PasswordInput from "../../components/auth/PasswordInput.jsx";
import { AUTH_MODES } from "../../config/authConfig.js";
import { login, register } from "../../services/authService.js";
import { getRoleFromToken } from "../../utils/jwtDecode.js";

const AuthPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const mode = searchParams.get("mode");

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        rePassword: "",
        role: "University",
        rememberMe: false,
        code: "",
    });

    const [ui, setUi] = useState({
        showPassword: false,
        showRePassword: false,
    });

    useEffect(() => {
        if (!Object.values(AUTH_MODES).includes(mode)) {
            setSearchParams({ mode: AUTH_MODES.SIGNIN });
        }
    }, [mode, setSearchParams]);

    const switchMode = useCallback((newMode) => {
        setSearchParams({ mode: newMode });
    }, [setSearchParams]);

    const resetForm = useCallback(() => {
        setForm({
            username: "",
            email: "",
            password: "",
            rePassword: "",
            role: "University",
            rememberMe: false,
            code: "",
        });
        setUi({ showPassword: false, showRePassword: false });
    }, []);

    useEffect(() => {
        resetForm();
    }, [mode, resetForm]);

    const handleChange = useCallback((key, value) => {
        setForm(prev => ({ ...prev, [key]: value }));
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        switch (mode) {
            case AUTH_MODES.SIGNIN: {
                const result = await login(form.username, form.password);
                if (result.success) {
                    const role = getRoleFromToken()?.toUpperCase();
                    role === "ADMIN" ? switchMode(AUTH_MODES.REGISTER) : navigate("/");
                } else {
                    alert(result.message);
                }
                break;
            }

            case AUTH_MODES.REGISTER: {
                const result = await register(form.role, form.username, form.email, form.password);
                if (result.success) {
                    switchMode(AUTH_MODES.SIGNIN);
                } else {
                    alert(result.message);
                }
                break;
            }

            case AUTH_MODES.RESET: {
                if (form.password !== form.rePassword) return alert("Passwords do not match");
                switchMode(AUTH_MODES.SIGNIN);
                break;
            }

            case AUTH_MODES.FORGOT: {
                alert(`Reset code sent to ${form.email}`);
                break;
            }
        }
    }, [mode, form, navigate, switchMode]);

    const title = useMemo(() => {
        return ({
            [AUTH_MODES.SIGNIN]: "Sign In",
            [AUTH_MODES.REGISTER]: "Create Account",
            [AUTH_MODES.FORGOT]: "Forgot Password",
            [AUTH_MODES.RESET]: "Reset Password",
        }[mode] || "Auth");
    }, [mode]);

    return (
        <div className="min-h-screen bg-gray-50">
            <AuthHeader />

            <AuthFormWrapper>
                {mode !== AUTH_MODES.REGISTER && (
                    <h2 className="text-2xl mb-8 font-mono">{title}</h2>
                )}

                {mode === AUTH_MODES.REGISTER && (
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 gap-4">
                        <h2 className="text-2xl font-mono">{title}</h2>

                        <select
                            value={form.role}
                            onChange={(e) => handleChange("role", e.target.value)}
                            className="w-full sm:w-40 px-4 py-3 border border-gray-300 rounded"
                        >
                            <option value="University">University</option>
                            <option value="Company">Company</option>
                        </select>
                    </div>
                )}

                {(mode === AUTH_MODES.SIGNIN || mode === AUTH_MODES.REGISTER) && (
                    <input
                        value={form.username}
                        onChange={(e) => handleChange("username", e.target.value)}
                        placeholder="Username"
                        className="w-full px-4 py-3 border border-gray-300 rounded mb-5"
                    />
                )}

                {(mode !== AUTH_MODES.SIGNIN && mode !== AUTH_MODES.RESET) && (
                    <input
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="Email"
                        className="w-full px-4 py-3 border border-gray-300 rounded mb-5"
                    />
                )}

                {mode !== AUTH_MODES.FORGOT && (
                    <PasswordInput
                        value={form.password}
                        onChange={(e) => handleChange("password", e.target.value)}
                        show={ui.showPassword}
                        setShow={(v) => setUi(p => ({ ...p, showPassword: v }))}
                        placeholder="Password"
                    />
                )}

                {mode === AUTH_MODES.RESET && (
                    <PasswordInput
                        value={form.rePassword}
                        onChange={(e) => handleChange("rePassword", e.target.value)}
                        show={ui.showRePassword}
                        setShow={(v) => setUi(p => ({ ...p, showRePassword: v }))}
                        placeholder="Confirm Password"
                    />
                )}

                {mode === AUTH_MODES.SIGNIN && (
                    <div className="flex justify-between items-center mb-6 text-sm">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={form.rememberMe}
                                onChange={() => handleChange("rememberMe", !form.rememberMe)}
                            />
                            Remember me
                        </label>

                        <button onClick={() => switchMode(AUTH_MODES.FORGOT)} className="text-[#0A65CC]">
                            Forgot password?
                        </button>
                    </div>
                )}

                {mode === AUTH_MODES.FORGOT && (
                    <>
                        <button className="w-full py-3 mb-4 bg-[#0A65CC] text-white rounded">
                            Send Code →
                        </button>

                        <input
                            value={form.code}
                            onChange={(e) => handleChange("code", e.target.value)}
                            placeholder="Confirmation Code"
                            className="w-full px-4 py-3 mb-4 border border-gray-300 rounded"
                        />
                    </>
                )}

                <button
                    onClick={handleSubmit}
                    className="w-full py-3 bg-[#0A65CC] text-white rounded"
                >
                    {title} →
                </button>

                {mode === AUTH_MODES.REGISTER && (
                    <p className="text-sm text-center mt-6">
                        Already have an account?{" "}
                        <span onClick={() => switchMode(AUTH_MODES.SIGNIN)} className="text-[#0A65CC] cursor-pointer">
                            Sign In
                        </span>
                    </p>
                )}
            </AuthFormWrapper>
        </div>
    );
};

export default AuthPage;