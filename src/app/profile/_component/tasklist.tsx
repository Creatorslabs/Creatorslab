import React from "react";
import myImageLoader from "@/actions/image/loader";
import Image from "next/image";

interface ICreator {
  _id: string;
  username: string;
}

export interface ITask {
  _id: string;
  type: "like" | "follow" | "comment" | "repost" | "quote";
  platform: "twitter" | "youtube" | "tiktok" | "facebook";
  target: string;
  rewardPoints: number;
  creator: ICreator;
}

export interface IParticipatedTask {
  id: string;
  type: "like" | "follow" | "comment" | "repost" | "quote";
  platform: "twitter" | "youtube" | "tiktok" | "facebook";
  target: string;
  rewardPoints: number;
  creator: ICreator;
  status: "pending" | "completed" | "claimed";
}

interface TaskListProps {
  tasks: IParticipatedTask[] | null;
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  if (!tasks) {
    return (
      <div className="w-full dark:text-white text-center p-3">
        You have not Participated in any task yet!
      </div>
    );
  }

  // Filter out only "completed" and "claimed" tasks
  const filteredTasks = tasks.filter(
    (task) => task.status === "completed" || task.status === "claimed"
  );

  // Sort tasks: "completed" first, then "claimed"
  const sortedTasks = filteredTasks.sort((a, b) => {
    if (a.status === "completed" && b.status !== "completed") return -1;
    if (a.status !== "completed" && b.status === "completed") return 1;
    return 0;
  });

  if (sortedTasks.length === 0) {
    return (
      <div className="w-full dark:text-white text-center p-3">
        You have no completed task yet!
      </div>
    );
  }

  console.log("Sorted task:", sortedTasks);

  // Generate a title for each task based on its type, platform, and creator
  const generateTaskTitle = (task: IParticipatedTask) => {
    const { type, platform, creator } = task;
    const platformMap = {
      twitter: "Twitter",
      youtube: "YouTube",
      tiktok: "TikTok",
      facebook: "Facebook",
    };
    const typeMap = {
      like: "Like",
      follow: "Follow",
      comment: "Comment",
      repost: "Repost",
      quote: "Quote",
    };
    return `${typeMap[type]} ${creator.username}'s ${platformMap[platform]} ${
      type === "follow" ? "account" : "post"
    }`;
  };

  return (
    <div className="flex flex-col gap-4">
      {sortedTasks.map((participatedTask: IParticipatedTask) => {
        const task = participatedTask;
        const title = generateTaskTitle(task);

        return (
          <div
            className="bg-[#222222] flex gap-3  items-center p-4 rounded-lg font-medium text-xs min-w-[300px]"
            key={task.id}
          >
            <Image
              loader={myImageLoader}
              quality={75}
              src="/images/trophy.svg"
              alt="trophy"
              width={30}
              height={30}
            />
            <Image
              loader={myImageLoader}
              quality={75}
              src="/images/superteam.svg"
              alt="superteam"
              width={30}
              height={30}
            />
            <p className="min-w-fit">{title}</p>
            <p className="ml-auto flex items-center text-[#03ABFF] gap-2">
              $CLS {task.rewardPoints}
              <Image
                loader={myImageLoader}
                quality={75}
                src="/images/coin.svg"
                alt="coin"
                width={15}
                height={15}
              />
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
