import Image from "next/image";

const page = () => {
  return (
    <div className="bg-[#161616] w-full max-w-[1440px] mx-auto">
      <div className="w-[88%] mx-auto py-4 min-h-screen">
        {/* header navigation section */}
        <div className="flex justify-between items-center my-6">
          <div className="p-3 rounded-lg bg-[#242424]">
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
          <div className="flex-[4]">
            <div className="relative">
              <Image
                src="/images/creator-bg.svg"
                alt="creator-bg"
                width={830}
                height={200}
                className="w-full"
              />
              <div className="absolute top-0 p-10 flex gap-8 items-center justify-between w-full">
                <div className="flex gap-8">
                  <div className="relative">
                    <Image
                      src="/images/dp.svg"
                      alt="profile"
                      width={136}
                      height={136}
                      className="z-0"
                    />
                    <div className="bg-white rounded-md p-1 w-fit flex right-2 -mt-6 z-10 absolute">
                      <Image
                        src="/images/camera.svg"
                        alt="camera"
                        height={20}
                        width={20}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <p className="text-xl my-0">Barbie_xy</p>
                    <button className="bg-[#2D2D2D] w-fit h-fit py-1 px-3 rounded-lg flex gap-2 items-center justify-center">
                      <Image
                        src="/images/verified.svg"
                        alt="verified"
                        height={20}
                        width={20}
                      />
                      <span className="text-sm">Verified</span>
                    </button>
                    <div className="lg:flex gap-2">
                      <div className="flex justify-between items-center border-[#606060] border rounded-lg py-2 px-4">
                        <div className="flex gap-3 items-center">
                          <Image
                            src="/images/x-icon.svg"
                            alt="x-icon"
                            height={30}
                            width={30}
                          />
                          babriexy
                        </div>
                      </div>
                      <div className="flex justify-between items-center border-[#606060] border rounded-lg py-2 px-4">
                        <div className="flex gap-3 items-center">
                          <Image
                            src="/images/discord.svg"
                            alt="discord"
                            height={30}
                            width={30}
                          />
                          babexy
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="bg-white bg-opacity-20 h-fit py-2 px-4 rounded-lg flex gap-2 items-center">
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
            </div>
            <div className="border-[#606060] border rounded-lg mt-8">
              <div className="flex justify-between items-center p-4">
                <p>All Tasks</p>
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
              </div>
              <table className="w-full text-center">
                <thead className="p-2">
                  <tr className="bg-[#222222]">
                    <td className="p-2">S/N</td>
                    <td className="p-2">Platform</td>
                    <td className="p-2">Amount to Earn</td>
                    <td className="p-2">Status</td>
                    <td className="p-2">Task Details</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-4">1</td>
                    <td className="p-4 flex items-center gap-2 justify-center">
                      <Image
                        src="/images/discord.svg"
                        alt="discord"
                        width={20}
                        height={20}
                      />
                      Discord
                    </td>
                    <td className="p-4">$CLS 0.5</td>
                    <td className="p-4 text-[#FFC107]">Ongoing</td>
                    <td className="p-4">
                      <button className="bg-[#03ABFF] bg-opacity-10 border border-[#03ABFF] text-[#03ABFF] py-1 px-8 rounded-md">
                        View
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4">1</td>
                    <td className="p-4 flex items-center gap-2 justify-center">
                      <Image
                        src="/images/discord.svg"
                        alt="discord"
                        width={20}
                        height={20}
                      />
                      Discord
                    </td>
                    <td className="p-4">$CLS 0.5</td>
                    <td className="p-4 text-[#FFC107]">Ongoing</td>
                    <td className="p-4">
                      <button className="bg-[#03ABFF] bg-opacity-10 border border-[#03ABFF] text-[#03ABFF] py-1 px-8 rounded-md">
                        View
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4">1</td>
                    <td className="p-4 flex items-center gap-2 justify-center">
                      <Image
                        src="/images/discord.svg"
                        alt="discord"
                        width={20}
                        height={20}
                      />
                      Discord
                    </td>
                    <td className="p-4">$CLS 0.5</td>
                    <td className="p-4 text-[#FFC107]">Ongoing</td>
                    <td className="p-4">
                      <button className="bg-[#03ABFF] bg-opacity-10 border border-[#03ABFF] text-[#03ABFF] py-1 px-8 rounded-md">
                        View
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4">1</td>
                    <td className="p-4 flex items-center gap-2 justify-center">
                      <Image
                        src="/images/discord.svg"
                        alt="discord"
                        width={20}
                        height={20}
                      />
                      Discord
                    </td>
                    <td className="p-4">$CLS 0.5</td>
                    <td className="p-4 text-[#FFC107]">Ongoing</td>
                    <td className="p-4">
                      <button className="bg-[#03ABFF] bg-opacity-10 border border-[#03ABFF] text-[#03ABFF] py-1 px-8 rounded-md">
                        View
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4">1</td>
                    <td className="p-4 flex items-center gap-2 justify-center">
                      <Image
                        src="/images/discord.svg"
                        alt="discord"
                        width={20}
                        height={20}
                      />
                      Discord
                    </td>
                    <td className="p-4">$CLS 0.5</td>
                    <td className="p-4 text-[#FFC107]">Ongoing</td>
                    <td className="p-4">
                      <button className="bg-[#03ABFF] bg-opacity-10 border border-[#03ABFF] text-[#03ABFF] py-1 px-8 rounded-md">
                        View
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex-[2]">
            <div className="relative">
              <Image
                src="/images/walletcard.svg"
                alt="walletcard"
                width={425}
                height={220}
                className="w-full h-full"
              />
              <div className="absolute top-0 p-8">
                <span className="text-[#606060]">Wallet Balance</span>
                <p className="text-4xl flex gap-8 items-center mt-3 mb-6">
                  $CLS 206.08
                  <Image
                    src="/images/eye.svg"
                    alt="eye"
                    width={20}
                    height={20}
                  />
                </p>
                <div className="flex gap-2 font-semibold text-base">
                  <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#5d3fd1] to-[#03abff]">
                    Buy $CLS
                  </button>
                  <button className="px-6 py-2 rounded-lg bg-[#F4B30C] text-black">
                    Claim $CLS
                  </button>
                </div>
              </div>
            </div>
            <div className="border-[0.5px] border-[#606060] p-8 rounded-xl mt-8">
              <div className="mb-8">
                <p className="text-lg mb-2">Social Media Accounts</p>
                <div className="flex flex-col gap-6">
                  <div className="flex justify-between items-center border-[#606060] border rounded-lg p-5">
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
                  <div className="flex justify-between items-center border-[#606060] border rounded-lg p-5 ">
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
                  <div className="flex justify-between items-center border-[#606060] border rounded-lg p-5 w-full">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
