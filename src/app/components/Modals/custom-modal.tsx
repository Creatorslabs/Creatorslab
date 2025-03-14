import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const CustomModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex justify-center items-center z-50">
  <div
    className="relative w-[400px] p-6 rounded-lg shadow-lg max-md:w-full max-md:h-full max-md:rounded-none max-md:top-0 
    absolute bg-white dark:bg-[#101214] transition-all overflow-hidden z-20
    before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,_#5D3FD1_20%,_transparent_40%)]"
    onClick={(e) => e.stopPropagation()}
  >
    {/* Close Button */}
    <button
      className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 z-30"
      onClick={onClose}
    >
      ✖
    </button>

    {/* Modal Content */}
    <div className="mt-4 text-black dark:text-white relative z-30">{children}</div>
  </div>
</div>
  );
};

export default CustomModal;
