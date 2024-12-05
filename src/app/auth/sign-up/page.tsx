'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC, useState } from 'react'
import logo from '../../logo.svg'


const SignUp : FC = () => {
  // const [email, setEmail] = useState('');
  // const [otp, setOtp] = useState('');
  // const [stage, setStage] = useState(1);

  //   const sendOtp = async () => {
  //     const response = await fetch('/api/auth/sendOtp', {
  //         method: 'POST',
  //         headers: {
  //             'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ email }),
  //     });

  //     if (response.ok) {
  //         setStage(2); // Move to OTP verification stage
  //     } else {
  //         alert('Failed to send OTP');
  //     }
  // };

  // const verifyOtp = async () => {
  //     const response = await fetch('/api/auth/verifyOtp', {
  //         method: 'POST',
  //         headers: {
  //             'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ email, otp }),
  //     });

  //     if (response.ok) {
  //         alert('OTP Verified!');
  //     } else {
  //         alert('Invalid OTP');
  //     }
  // };
 
  return (
    <>
      <div className=' w-[100vw] h-[100vh] py-[100px] bg-gradient-to-b from-[#161616]/70 via-[#5d3fd1]/15 to-[#03abff]/15'>
        <div className=' w-3/4 mx-auto'>
          <nav className='flex items-center justify-between py-6'>
            <Link href={'/'}>
              <Image src={logo} alt='' width={150} height={200}/>
            </Link>

            <div>
              <span className='text-[#606060]'>Already have an account?</span>
              <Link href={'/auth/log-in'} className='mx-4 border p-4 rounded-lg border-[#606060]'>Log in</Link>
              
            </div>
          </nav>
          
          <div className='my-[100px]'>
            <form action="" className='border border-[#606060] rounded-lg w-[500px] m-auto p-8 bg-[#3f3f3f]/10 backdrop-filter backdrop-blur-sm'>
              <h2 className='font-syne font-bold text-xl'>Welcome to CreatorsLab</h2>
              <p className='text-sm text-[#606060]'>Join the global community of content creators and earn.</p>

              {/* {stage === 1 ? ( */}
                <>
                  <label className="block my-4">
                    Email address
                    <input type="text" className="w-full p-3 rounded border border-[#606060] bg-inherit my-2 text-[#606060]" placeholder='address@email.com'/>
                  </label>
                  <button 
                    className="w-full p-3 rounded border border-[#606060] bg-inherit my-2" 
                    // onClick={sendOtp}
                    >Continue with email</button>
                  <p className='text-xs text-[#606060] my-2'>By continuing, you agree to our <span className='font-bold text-white'>Terms of Service</span> and <span className='font-bold text-white'>Privacy Policy</span></p>
                </>  
              {/* ) : ( */}
                {/* <>
                  <label className="block my-4">
                    Enter O.T.P
                    <input type="text" className="w-full p-3 rounded border border-[#606060] bg-inherit my-2 text-[#606060]" placeholder='address@email.com'/>
                  </label>
                  <button 
                    className="w-full p-3 rounded border border-[#606060] bg-inherit my-2" 
                    // onClick={verifyOtp}
                    >Continue with email</button>
                  <p className='text-xs text-[#606060] my-2'>By continuing, you agree to our <span className='font-bold text-white'>Terms of Service</span> and <span className='font-bold text-white'>Privacy Policy</span></p>
                </> */}
              {/* )} */}
              </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp