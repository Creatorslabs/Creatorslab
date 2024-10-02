import Image from 'next/image';
import React from 'react';
import imgIcon from '../../../../../public/images/imgIcon.svg'

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#161616] p-6 rounded-lg w-[450px]">
        <h2 className="text-lg font-bold mb-4 font-syne">Let's create your task</h2>
        <span className='text-[#606060] text-sm'>Enter the information about your task</span>
        <form>
            <div className='flex items-center justify-between my-4'>
                <div>
                    <p>Upload Imaage</p>
                    <span className='text-[#606060] text-sm'>This will serve as thumbnail for your task</span>
                </div>

                <div className='border p-2 rounded-lg border-[#606060]'>
                    <Image src={imgIcon} alt='' width={30} height={30}/>
                </div>
                
            </div>
          <label className="block mb-2">
            Title:
            <input type="text" className="w-full p-2 rounded" />
          </label>
          <label className="block mb-2">
            Social Platform:
            <select className="w-full p-2 rounded">
              <option value="Twitter">Twitter</option>
              <option value="Facebook">Facebook</option>
              {/* Add more options as needed */}
            </select>
          </label>
          <label className="block mb-2">
            Engagement Type:
            <select className="w-full p-2 rounded">
              <option value="Like">Like</option>
              <option value="Retweet">Retweet</option>
              {/* Add more options as needed */}
            </select>
          </label>
          <label className="block mb-2">
            Rate Needed:
            <input type="number" className="w-full p-2 rounded" />
          </label>
          <label className="block mb-2">
            Task Description:
            <textarea className="w-full p-2 rounded" rows={4}></textarea>
          </label>
          <label className="block mb-2">
            Task Link:
            <input type="url" className="w-full p-2 rounded" />
          </label>
        </form>
        <div className="flex justify-between mt-4">
          <button className="bg-gray-600 p-2 rounded" onClick={onClose}>Cancel</button>
          <button className="bg-blue-600 p-2 rounded">Post Task</button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
