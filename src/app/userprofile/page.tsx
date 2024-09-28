import Image from "next/image";

const page = () => {
  return (
    <div className="w-11/12 mx-auto py-4">
      {/* navbar */}
      <nav className="h-20 flex justify-between items-center">
        <Image src="/images/logo.svg" alt="logo" width={200} height={100} />
        <div className="border border-[#3F3F3F] p-2 flex gap-1 rounded-xl w-80">
          <Image src="/images/search.svg" alt="search" height={20} width={20} />
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
        <button className="border border-[#03ABFF] rounded-lg px-6 py-2 bg-opacity-10 bg-[#03ABFF] text-[#03ABFF]">
          Earn SCLS
        </button>
      </div>
      {/* details section */}
      <div className="flex gap-8">
        <div className="flex-[4] border border-[#606060] p-8 rounded-xl">
          <div className="flex justify-between">
            <div>
                <Image src="/images/dp.svg" alt="profile" height={50} width={100} />
                <div>
                <Image src="/images/camera.svg" alt="camera" height={20} width={50} />
                </div>
            </div>
          </div>
        </div>
        <div className="flex-[2] border border-[#606060] p-8 rounded-xl">
            
        </div>
      </div>
    </div>
  );
};

export default page;
