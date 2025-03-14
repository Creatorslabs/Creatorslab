import Image from 'next/image';
import Link from 'next/link';

const ResponsiveBackgroundSection = () => {
  return (
    <div className="relative m-6 md:m-8 rounded-md overflow-hidden">
      {/* Background Image Container with proper aspect ratio */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="/images/landing-page/Frame 44.png"
            alt="creator-background"
            fill
            className="object-contain md:object-cover"
            style={{
              objectPosition: 'center'
            }}
                      loading="lazy"
          />
        </div>
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#5D3FD1] via-[#03ABFF] to-[#F4B30C] opacity-80 mix-blend-multiply"></div>
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Text Content */}
        <div className="flex flex-col gap-3 w-full md:w-[50%] items-start justify-center text-white">
          <h3 className="text-2xl md:text-3xl font-syne font-bold">
            Earn, Engage and Expand with Creatorslab.
          </h3>
          <p className="text-sm md:text-base">
            We are building more than just a platform, we&apos;re creating a decentralized social network where builders and content creators thrive.
          </p>
          <p className="text-sm md:text-base">
            Expand your reach, grow your influence, and connect with a global Web3 community that values engagement.
          </p>
          <Link href="/tasks" className="mt-2 p-3 rounded-md bg-white bg-opacity-20 hover:bg-opacity-30 transition-all">
            Become a member
          </Link>
        </div>
        
        {/* Image on right */}
        <div className="w-full md:w-auto flex justify-center md:justify-end">
          <Image
            src="/images/landing-page/Group 11.png"
            width={220}
            height={180}
            alt="coin sack"
            className="w-[180px] md:w-[220px] h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default ResponsiveBackgroundSection;