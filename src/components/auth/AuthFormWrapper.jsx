import React from 'react';

const AuthFormWrapper = ({ children }) => {
    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <form className="w-full max-w-md p-8">
                {children}
            </form>
        </div>
    );
};

export default AuthFormWrapper;