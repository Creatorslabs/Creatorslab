import Image from "next/image";

const page = () => {
  return (
    <div className="bg-[#161616]">
      <div className="w-11/12 mx-auto py-4 ">
        {/* navbar */}
        <nav className="h-20 flex justify-between items-center">
          <Image src="/images/logo.svg" alt="logo" width={200} height={100} />
          <div className="border border-[#3F3F3F] p-2 flex gap-1 rounded-xl w-80">
            <Image
              src="/images/search.svg"
              alt="search"
              height={20}
              width={20}
            />
            <input
              type="text"
              className="outline-none bg-transparent px-1 w-full"
              placeholder="Search projects, quests, creators"
            />
          </div>
          <div className="flex gap-6 items-center">
            <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#5d3fd1] to-[#03abff]">
              Post Task
            </button>
            <Image
              src="/images/profileImg.svg"
              alt="profile"
              width={50}
              height={50}
            />
          </div>
        </nav>
        {/* header navigation section */}
        <div className="flex justify-between items-center my-6">
          <div className="p-2 rounded-lg bg-[#242424]">
            <Image
              src="/images/back-arrow.svg"
              alt="back"
              width={20}
              height={20}
            />
          </div>
          <button className="border border-[#606060] rounded-lg px-4 py-2 bg-[#242424] text-white flex justify-center items-center gap-2">
            <Image src="/images/coin.svg" alt="coin" width={30} height={30} />
            Earn $CLS
          </button>
        </div>
        {/* details section */}
        <div className="flex gap-8">
          <div className="flex-[4] border-[0.5px] border-[#606060] p-8 rounded-xl">
            <div className="flex justify-between">
              <div className="relative">
                <Image
                  src="/images/dp.svg"
                  alt="profile"
                  height={50}
                  width={100}
                  className="z-0"
                />
                <div className="bg-white rounded-md p-1 w-fit flex right-0 -mt-6 z-10 absolute">
                  <Image
                    src="/images/camera.svg"
                    alt="camera"
                    height={20}
                    width={20}
                  />
                </div>
                <p className="my-2 text-xl">Barbie_xy</p>
                <button className="bg-[#2D2D2D] h-fit py-1 px-3 rounded-lg flex gap-2 items-center">
                  <Image
                    src="/images/verified.svg"
                    alt="verified"
                    height={20}
                    width={20}
                  />
                  <span className="text-sm">Verified</span>
                </button>
              </div>
              <button className="bg-[#222222] h-fit py-2 px-4 rounded-lg flex gap-2 items-center">
                <span>Invite Link</span>
                <div className="bg-white bg-opacity-10 rounded-lg w-8 h-8 flex items-center justify-center">
                  <Image
                    src="/images/copy.svg"
                    alt="copy"
                    height={20}
                    width={20}
                  />
                </div>
              </button>
            </div>
            <hr className="border-[#606060] my-8 border-t-[0.5px]" />
            <div className="mb-8">
              <p className="text-lg mb-2">Social Media Accounts</p>
              <div className="flex gap-6">
                <div className="flex justify-between items-center border-[#606060] border rounded-lg p-5 w-[320px]">
                  <div className="flex gap-3 items-center">
                    <Image
                      src="/images/x-icon.svg"
                      alt="x-icon"
                      height={30}
                      width={30}
                    />
                    babriexy
                  </div>
                  <button className="bg-[#272727] h-fit py-1 px-2 rounded-sm flex gap-2 items-center">
                    <span className="text-sm text-[#606060]">Linked</span>
                  </button>
                </div>
                <div className="flex justify-between items-center border-[#606060] border rounded-lg p-5 w-[320px]">
                  <div className="flex gap-3 items-center">
                    <Image
                      src="/images/discord.svg"
                      alt="discord"
                      height={35}
                      width={35}
                    />
                    Link Discord Account
                  </div>
                  <div className="p-3 rounded-lg bg-white">
                    <Image
                      src="/images/forward-arrow.svg"
                      alt="forward"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-lg mb-1">Email Address</p>
              <span className="text-[#787878] text-xs mb-2 block">
                Link your Email to get latest updates on Creatorslab
              </span>
              <div className="flex gap-6">
                <div className="flex justify-between items-center border-[#606060] border rounded-lg p-5 w-[320px]">
                  <div className="flex gap-3 items-center">
                    <Image
                      src="/images/email.svg"
                      alt="email"
                      height={30}
                      width={30}
                    />
                    babriexy@gmail.com
                  </div>
                  <button className="bg-[#272727] h-fit py-1 px-2 rounded-sm flex gap-2 items-center">
                    <span className="text-sm text-[#606060]">Linked</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-[2]">
            <div className="relative">
              <Image
                src="/images/walletcard.svg"
                alt="walletcard"
                width={425}
                height={220}
              />
              <div className="absolute top-0 p-8">
                <span className="text-sm text-[#606060]">Wallet Balance</span>
                <p className="text-3xl flex gap-8 items-center mt-3 mb-6">
                  $CLS 206.08
                  <Image
                    src="/images/eye.svg"
                    alt="eye"
                    width={20}
                    height={20}
                  />
                </p>
                <div className="flex gap-2">
                  <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#5d3fd1] to-[#03abff]">
                    Buy $CLS
                  </button>
                  <button className="px-6 py-2 rounded-lg bg-[#F4B30C]">
                    Claim $CLS
                  </button>
                </div>
              </div>
            </div>
            <div className="border-[0.5px] border-[#606060] p-6 rounded-xl mt-6">
              <p className="text-lg mb-2">My Rewards</p>
              <div className="flex flex-col gap-4">
                <div className="bg-[#222222] flex gap-3 items-center p-4 rounded-lg font-medium text-base">
                  <Image
                    src="/images/trophy.svg"
                    alt="trophy"
                    width={30}
                    height={30}
                  />
                  <Image
                    src="/images/superteam.svg"
                    alt="superteam"
                    width={30}
                    height={30}
                  />
                  <span>Task title here</span>
                  <p className="ml-auto flex items-center text-[#03ABFF] gap-2">
                    $CLS10
                    <Image
                      src="/images/coin.svg"
                      alt="coin"
                      width={15}
                      height={15}
                    />
                  </p>
                </div>
                <div className="bg-[#222222] flex gap-3 items-center p-4 rounded-lg font-medium text-base">
                  <Image
                    src="/images/trophy.svg"
                    alt="trophy"
                    width={30}
                    height={30}
                  />
                  <Image
                    src="/images/superteam.svg"
                    alt="superteam"
                    width={30}
                    height={30}
                  />
                  <span>Task title here</span>
                  <p className="ml-auto flex items-center text-[#03ABFF] gap-2">
                    $CLS10
                    <Image
                      src="/images/coin.svg"
                      alt="coin"
                      width={15}
                      height={15}
                    />
                  </p>
                </div>
                <div className="bg-[#222222] flex gap-3 items-center p-4 rounded-lg font-medium text-base">
                  <Image
                    src="/images/trophy.svg"
                    alt="trophy"
                    width={30}
                    height={30}
                  />
                  <Image
                    src="/images/superteam.svg"
                    alt="superteam"
                    width={30}
                    height={30}
                  />
                  <span>Task title here</span>
                  <p className="ml-auto flex items-center text-[#03ABFF] gap-2">
                    $CLS10
                    <Image
                      src="/images/coin.svg"
                      alt="coin"
                      width={15}
                      height={15}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
