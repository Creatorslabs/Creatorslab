import Link from "next/link";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";

const TaskCard = ({ task }) => {
  return (
    <Link
      href={`/tasks/${task._id}`}
      className="w-full flex-1 shadow-md p-2 pb-0 rounded-lg dark:border-[#FFFFFF]"
    >
      <div className="relative">
        <Image
          src="/images/landing-page/Rectangle 3.png"
          width={300}
          height={250}
          alt="image"
          className="w-full rounded-md"
        />
        <Image
          src="/images/user01.jpeg"
          width={10}
          height={10}
          alt="image"
          className="w-10 h-10 absolute right-0 -bottom-4 rounded-full"
        />
      </div>
      <div className="flex flex-col py-3 gap-2">
        <h3 className="font-syne text-xl">
         {task.title}
        </h3>
        <p className="text-sm text-gray-500">
          {task.description.slice(0, 20)}...
        </p>
        <div className="flex justify-between">
          <div className="flex flex-row gap-1 rounded-md bg-[#5D3FD1] text-white py-1 px-2 text-sm items-center whitespace-no-wrap">
            {task.rewardPoints} $CLS
            <Image src="/images/coin.svg" width={20} height={20} alt="CLS coin image" />
          </div>
          <div className="flex flex-row gap-1 rounded-md bg-[#222222] text-white px-2 text-sm items-center">
            <FaHeart /> {task.participants.length} of {task.maxParticipants} Joined
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TaskCard;
