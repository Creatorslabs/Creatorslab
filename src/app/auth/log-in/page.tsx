'use client'
import React, { FC } from 'react'
import floatingBall from '../../../../public/images/float1.png'
import floatingball2 from '../../../../public/images/float2.png'
import logo from '../../logo.svg'
import Link from 'next/link'
import Image from 'next/image'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import '@solana/wallet-adapter-react-ui/styles.css';
import { useWallet } from '@solana/wallet-adapter-react'
import { ContextProvider } from '@/src/contexts/ContextProvider'

const LogIn: FC = () => {
  const { connected } = useWallet();
  return (
    <>
      <ContextProvider>
        <div className='w-[100vw] h-[100vh] flex items-center justify-between'>
          <div className='w-2/4  h-full'>
          <div className='my-10 w-[60%] mx-auto'>
            <nav className='flex items-center justify-between py-6'>
              <Link href={'/'}>
                <Image src={logo} alt='' width={150} height={200}/>
              </Link>

              <div>
                <span className='text-[#606060]'>New to CreatorsLab?</span>
                <Link href={'/auth/sign-up'} className='mx-4 border p-4 rounded-lg border-[#606060]'>Create an account</Link>
                
              </div>
            </nav>

            <div className='my-[100px]'>
              <form action="" className='border border-[#606060] rounded-lg w-full m-auto p-8 bg-[#3f3f3f]/10 backdrop-filter backdrop-blur-sm z-40'>
                <h2 className='font-syne font-bold text-xl'>Log in to CreatorsLab</h2>
                <p className='text-sm text-[#606060]'>Welcome back.</p>
                <label className="block my-4">Log in with Wallet</label>
                <WalletMultiButton className='text-red-500 w-full'>connect</WalletMultiButton>
                <div className='flex items-center justify-between my-4'>
                  <div className=' w-[40%] border border-[#606060] '></div>
                  <span>OR</span>
                  <div className=' w-[40%] border border-[#606060] '></div>
                </div>
                <label className="block my-4">Log in with social accounts</label>
                <div className='mb-20'>
                  <button className='p-3 rounded mr-4 w-[150px] bg-gradient-to-r from-[#5d3fd1] to-[#191919]'>Twitter</button>
                  <button className='p-3 rounded mr-4 w-[150px] bg-gradient-to-r from-[#5d3fd1] to-[#191919]'>Discord</button>
                  <button className='p-3 rounded mr-4 w-[150px] bg-gradient-to-r from-[#5d3fd1] to-[#191919]'>Email</button>
                </div>
              </form>
            </div>
          </div>
        
          </div>
          <div className='w-2/4  h-full bg-[url(/images/signin-upbg.png)] bg-cover bg-no-repeat relative z-[-9999]'>
            <Image src={floatingball2} alt='' width={400} height={400} className='absolute top-0 right-0 scale-x-[-1]'/>
            <Image src={floatingBall} alt='' width={800} height={800} className='absolute bottom-0 left-[-300px] z-[-999]'/>
          </div>
        </div>
      </ContextProvider>
      
    </>
    
  )
}

export default LogIn