"use client";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { MdContentCopy } from "react-icons/md";

const CopyButton: React.FC<{ link: string }> = ({ link }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={copyToClipboard}
      className="bg-white bg-opacity-10 rounded-lg w-8 h-8 flex items-center justify-center"
    >
      {copied ? <FaCheck /> : <MdContentCopy />}
    </button>
  );
};

export default CopyButton;
