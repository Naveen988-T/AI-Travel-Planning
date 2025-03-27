

import { useGoogleLogin } from '@react-oauth/google';
import React from 'react'

function Header() {
    const login = useGoogleLogin({
        onSuccess: codeResponse => console.log(codeResponse),
        onError : erroe => console.log(erroe)
      });
    return (
        <div className="flex items-center justify-between px-2 py-1">
            <img src='/logo.svg' />
            {/* <div className="text-xl font-bold">
                <button className="bg-black text-white px-2 py-1 rounded-lg" onClick={login}> Sign In </button>
            </div> */}
        </div>
    )
}

export default Header
