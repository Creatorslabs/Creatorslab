import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import back from '../../../../public/images/back-arrow.svg'
import serif from '../../../../public/images/serif.png'
import creator from '../../../../public/images/user03.jpeg'
import coin from '../../../../public/images/coin.svg'
import lock from '../../../../public/images/lock.svg'
import checked from '../../../../public/images/checked.svg'
import link from '../../../../public/images/link.svg'
import X from '../../../../public/images/X.svg'
import telegram from '../../../../public/images/telegram.svg'
import discord from '../../../../public/images/discord.svg'
import paper from '../../../../public/images/thxjoin.svg'



const page = () => {
  return (
    <div className='w-[80%] m-auto'>
        <div className='flex items-center justify-start my-6'>
            <div className='p-3 rounded-lg bg-[#242424]'>
                <Link href={'/'}>
                 <Image src={back} alt='' width={20} height={20} />
                </Link>
            </div> 
        </div>
        <div className='w-full  m-auto flex items-start justify-between'>
            <div className='w-[60%] p-10 bg-[#1c1c1c] rounded-xl'>
                <div className='w-[80%] mx-auto'>
                    <div className='rounded-xl w-full bg-[url(/images/taskbg.jpeg)] bg-no-repeat bg-cover p-4'>
                        <div className='rounded-xl '>
                             <Image src={serif} alt='' width={80} height={80} />
                        </div>
                        <h2 className='mt-6 text-xl font-bold tracking-widest'>Follow CEO Abayaomi Chukwudi on X</h2>  
                    </div>
                    <div className='my-4 border border-[#606060] rounded-xl flex items-center justify-between px-6 py-4'>
                        <div>
                            <p className='mb-2 text-[#606060]'>Creator</p>
                            <div className='flex items-center justify-between w-[150px]'>
                              <Image src={creator} alt='' width={50} height={50} className='rounded-[50%] h-[50px] w-[50px] mb-2'/>
                              <p className='font-bold text-lg'>Barbie_xy</p>
                            </div>
                        </div>

                        <div>
                            <button className=' px-6 py-2 bg-[#222222] rounded-lg'>Follow</button>
                        </div>   
                    </div>

                    <div className='border border-[#606060] px-6 py-4 flex items-center justify-between rounded-lg bg-[#5D3FD126]'>
                        <p className='text-[#5d3fd1] font-bold'>Ending In <span>12</span>h : <span>40</span>m : <span>24</span>s</p>
                        <button className='px-2 py-2 bg-gradient-to-br from-[#5d3fd1] to-[#03abff] rounded-lg flex items-center justify-between'>
                            <Image src={lock} alt='' width={20} height={20}  className='pr-1'/>
                            $CLS 10
                            <Image src={coin} alt='' width={20} height={20} className='pl-1'/>
                        </button>
                    </div>

                    <div className='my-4'>
                        <p className='mb-10 w-[480px]'>Follow TH CEO Abayomi Chukwudi on X! If you are already following Abayomi, simply complete the quest again to claim the $CLS.</p>
                        <p className='mb-10 w-[480px]'>To learn more: <a href="" className='text-[#2aabee]'>https://www.CreatorsLab?node-id=80-586&node-type=frame&t=Myuuav</a></p>
                    </div>

                    <div className='border border-[#606060] px-6 py-4 flex items-center justify-between rounded-lg'>
                        <div className='flex items-center justify-between w-[50%]'>
                            <Image src={checked} alt='' width={40} height={40} />
                            <p>Follow <a href="" className='text-[#2aabee]'>CEO Abayomi Chukwudi</a> on X</p>
                        </div>
                        <button className='px-2 py-2 bg-[#222222] rounded-lg'>Link & Verify</button>
                    </div>

                    <div className='my-4 border border-[#606060] rounded-lg p-4'>
                        <div className='m-auto w-[90%]'>
                            <p className='mb-2 font-bold'>Visit link</p> 
                            <div className='border border-[#606060] flex items-center justify-between p-2 rounded-lg'>
                                    <a href="">/CreatorsLab?node-id=80-586&Myuuav8cuClSt0FM-0</a>
                                    <div className='border border-[#606060] rounded-lg py-2 px-4 bg-[#222222]'>
                                        <Image src={link} alt='' width={30} height={30} />
                                    </div>
                            </div>
                            <p className='mt-4 mb-2 font-bold'>Connect your X</p>
                            <button className=' flex items-center justify-center p-2 rounded-lg w-full bg-white text-black font-bold'>
                                <Image src={X} alt='' width={30} height={30} className='mr-4' />
                                Connect Twitter
                            </button>

                            <p className='mt-4 mb-2 font-bold'>Connect your Telegram</p>
                            <button className='flex items-center justify-center p-2 rounded-lg w-full bg-gradient-to-tr from-[#2aabee] to-[#229ed9] font-bold'>
                                <Image src={telegram} alt='' width={30} height={30} className='mr-4' />
                                Connect Telegram
                            </button>
                        </div>
                    </div>
                    <div className='flex justify-end items-center'>
                        <button className='px-20 py-4 bg-[#222222] text-[#606060] rounded-lg'>Complete</button>
                    </div>
                </div>
            </div>
            <div className='w-[35%]  bg-[#1c1c1c] p-6 rounded-xl'>
                <div className='border border-[#606060] px-6 py-4 rounded-lg bg-[#5D3FD126]'>
                   <h2>Other tasks from TH</h2>
                   <p className='text-[#787878]'>Get started with more task to earn more $CLS</p>
                   <p>0 / 3</p>
                   <input type="range" name="" id="" className='w-[full]' />
                </div>

                <div className='my-4 border border-[#606060] rounded-xl flex items-center justify-between px-6 py-4'>
                    <div>
                        <p className='mb-2'>Follow CEO Abayomi Chukwudi on X</p>
                        <div className='flex items-center justify-between w-[150px]'>
                            <Image src={X} alt='' width={50} height={50} className='rounded-xl h-[50px] w-[50px] mb-2 bg-white p-2'/>
                        </div>
                    </div>

                    <div>
                        <button className=' px-6 py-2 bg-gradient-to-br from-[#5d3fd1] to-[#03abff] rounded-lg flex items-center justify-between'>
                            $CLS 10
                            <Image src={coin} alt='' width={20} height={20} className='pl-1'/>
                        </button>
                    </div>   
                </div>

                <div className='my-4 border border-[#606060] rounded-xl flex items-center justify-between px-6 py-4'>
                    <div>
                        <p className='mb-2'>Join the  TH community Discord server</p>
                        <div className='flex items-center justify-between w-[150px]'>
                            <Image src={discord} alt='' width={50} height={50} className='rounded-xl h-[50px] w-[50px] mb-2 '/>
                        </div>
                    </div>

                    <div>
                        <button className=' px-6 py-2 bg-[#222222] rounded-lg flex items-center justify-between'>
                            $CLS 15
                            <Image src={coin} alt='' width={20} height={20} className='pl-1'/>
                        </button>
                    </div>   
                </div>

                <div className='my-4 border border-[#606060] rounded-xl flex items-center justify-between px-6 py-4'>
                    <div>
                        <p className='mb-2'>Sign up for THX</p>
                        <div className='flex items-center justify-between w-[150px]'>
                            <Image src={paper} alt='' width={50} height={50} className='rounded-xl h-[50px] w-[50px] mb-2 '/>
                        </div>
                    </div>

                    <div>
                        <button className=' px-6 py-2 bg-[#222222] rounded-lg flex items-center justify-between'>
                            $CLS 15
                            <Image src={coin} alt='' width={20} height={20} className='pl-1'/>
                        </button>
                    </div>   
                </div>
            </div>
        </div>
    </div>
  )
}

export default page