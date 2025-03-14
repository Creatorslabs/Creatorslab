import { FaTwitter, FaYoutube, FaTiktok, FaFacebook, FaLink } from "react-icons/fa";

type Platform = "twitter" | "youtube" | "tiktok" | "facebook" | "referral";

interface PlatformIconProps {
  platform: Platform;
  className?: string;
}

const PlatformIcon: React.FC<PlatformIconProps> = ({ platform, className = "" }) => {
  const icons: Record<Platform, JSX.Element> = {
    twitter: <FaTwitter className={`text-blue-500 ${className}`} size={20}/>,
    youtube: <FaYoutube className={`text-red-500 ${className}`} size={20}/>,
    tiktok: <FaTiktok className={`text-black dark:text-white ${className}`} size={20}/>,
    facebook: <FaFacebook className={`text-blue-700 ${className}`} size={20}/>,
    referral: <FaLink className={`text-gray-500 ${className}`} size={20}/>,
  };

  return icons[platform] || null;
};

export default PlatformIcon;
