import React, { useState } from 'react';
import { HR } from 'flowbite-react';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { FaCircleCheck } from 'react-icons/fa6';
import ImageUploader from '../../image-upload';
import { User } from '@privy-io/react-auth';
import { clipBeforeLastColon } from '@/actions/clip-privy-id';
import myImageLoader from '../../../../../actions/image/loader';
import Image from "next/image"
interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User| null;
}

const PLATFORMS = ['twitter', 'youtube', 'tiktok', 'facebook', 'referral'] as const;

const ENGAGEMENT_TYPES = {
  twitter: ['Like', 'Retweet', 'Follow', 'Comment'],
  youtube: ['Subscribe', 'Like', 'Comment'],
  tiktok: ['Follow', 'Like', 'Comment'],
  facebook: ['Like', 'Comment', 'Share'],
  referral: ['Referral']
} as const;

const ALL_ENGAGEMENT_TYPES = Object.values(ENGAGEMENT_TYPES).flat() as readonly string[];

const taskSchema = z.object({
  image: z.union([
    z.instanceof(File),
    z.string().url('Invalid image URL'),
    z.string().max(0),
    z.undefined()
  ]).optional(),
  
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title must be a string"
  }).min(3, 'Title must be at least 3 characters')
    .max(100, 'Title cannot exceed 100 characters')
    .trim(),
  
  description: z.string({
    required_error: "Description is required",
    invalid_type_error: "Description must be a string"
  }).min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description cannot exceed 1000 characters')
    .trim(),
  
  platform: z.enum(PLATFORMS, {
    errorMap: () => ({ message: 'Please select a valid platform' })
  }),
  engagementType: z.string().refine(
    (val) => ALL_ENGAGEMENT_TYPES.includes(val),
    {
      message: 'Please select a valid engagement type'
    }
  ),
  
  rewardPoints: z.coerce.number({
    required_error: "Reward points are required",
    invalid_type_error: "Reward points must be a number"
  }).int('Reward points must be a whole number')
    .min(1, 'Reward points must be at least 1')
    .max(10000, 'Reward points cannot exceed 10,000'),
  
  maxParticipants: z.coerce.number({
    required_error: "Maximum participants is required",
    invalid_type_error: "Maximum participants must be a number"
  }).int('Maximum participants must be a whole number')
    .min(1, 'At least 1 participant is required')
    .max(100000, 'Maximum participants cannot exceed 100,000'),
  
  expiration: z.string({
    required_error: "Expiration date is required",
    invalid_type_error: "Expiration date must be a string"
  }).refine((val) => !isNaN(Date.parse(val)), 'Please enter a valid date')
    .refine((val) => new Date(val) > new Date(), 'Expiration date must be in the future'),
  
  taskLink: z.string({
    required_error: "Task link is required",
    invalid_type_error: "Task link must be a string"
  }).url('Please enter a valid URL')
    .refine(url => /^https?:\/\//.test(url), 'URL must begin with http:// or https://'),
});

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, user }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    image: '',
    title: '',
    description: '',
    platform: '',
    engagementType: '',
    rewardPoints: '',
    maxParticipants: '',
    expiration: '',
    taskLink: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleImageUpload = (imageUrl) => {
    setFormData(prev => ({ ...prev, image: imageUrl }));
  };

   const validateStep = () => {
    let stepSchema;
    switch (step) {
      case 1:
        stepSchema = taskSchema.pick({ image: true, title: true, description: true });
        break;
      case 2:
        stepSchema = taskSchema.pick({ platform: true, engagementType: true });
        break;
      case 3:
        stepSchema = taskSchema.pick({ rewardPoints: true, maxParticipants: true, expiration: true, taskLink: true });
        break;
      default:
        stepSchema = taskSchema;
    }
    const result = stepSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) {
          newErrors[err.path[0]] = err.message;
        }
      });
      setErrors(newErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleNext = () => {
    if (validateStep()) setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => prev - 1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    if (!user) return

  setLoading(true);
  setSuccess(false);

  try {
    const payload = {
      creatorId: clipBeforeLastColon(user.id),
      image: formData.image,
      title: formData.title,
      description: formData.description,
      type: formData.engagementType.toLowerCase(),
      platform: formData.platform.toLowerCase(),
      target: formData.taskLink,
      rewardPoints: formData.rewardPoints,
      maxParticipants: formData.maxParticipants,
      expiration: formData.expiration,
    };

    const response = await fetch('/api/tasks/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Failed to create task');

    setSuccess(true);
    toast.success('Task created successfully!');
    setTimeout(handleClose, 2000);
  } catch (error: any) {
    console.error(error);
    toast.error(error.message);
  } finally {
    setLoading(false);
  }
};


  const handleClose = () => {
    setFormData({
      image: '',
      title: '',
      description: '',
      platform: '',
      engagementType: '',
      rewardPoints: '',
      maxParticipants: '',
      expiration: '',
      taskLink: '',
    });
    setErrors({});
    setStep(1);
    onClose();
  };

  

  const platformEngagementTypes: Record<string, string[]> = {
    twitter: ['Like', 'Retweet', 'Follow', 'Comment'],
    youtube: ['Subscribe', 'Like', 'Comment'],
    tiktok: ['Follow', 'Like', 'Comment'],
    facebook: ['Like', 'Comment', 'Share'],
    referral: ["Referral"]
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 dark:bg-[#101214] dark:text-white border-gray-600">
       <div className="bg-[#F7F8F9] dark:bg-[#242424] dark:text-white py-3 px-6 rounded-lg w-full max-w-lg relative border-gray-600 shadow-lg max-md:w-full max-md:h-full max-md:rounded-none max-md:top-0 overflow-y-scroll">
        {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[200px] p-6 rounded-xl bg-white dark:bg-[#101214] shadow-md">
              {success ? (
                <div className="h-20 w-20 rounded-full bg-green-500 flex items-center justify-center text-white transition-all duration-300">
                  <FaCircleCheck size={40} />
                </div>
              ) : (
                <div className="h-20 w-20 relative">
                  <div className="absolute inset-0 rounded-full border-4 border-gray-300 dark:border-gray-600"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 animate-spin"></div>
                </div>
              )}
            
              <p className="mt-6 text-lg font-semibold text-gray-700 dark:text-gray-100 tracking-wide">
                {success ? "Success!" : "Creating..."}
              </p>
            </div>
          ) : (
            <>
              <button className="absolute top-2 right-4 text-gray-600 dark:text-gray-400 text-xl" onClick={handleClose}>&times;</button>
              {step !== 4 && (
                <>
                <h2 className="text-lg font-bold mb-4 font-syne">Create Your Task</h2>
                <span className='text-gray-600 dark:text-gray-400 text-sm'>Enter the information about your task</span></>
        )}

        <HR />

        
        {step === 1 && (
          <div>
            <div className="flex w-full items-center justify-center flex-col">

                  <label className="block text-sm font-medium mb-1">Task Image</label>
                  <ImageUploader onImageUpload={handleImageUpload} />
                  {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}

            </div>
            <label className="block my-4">
              Title:
              <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-2 rounded border border-gray-600 bg-inherit" required />
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </label>
            <label className="block my-4">
              Description:
              <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 rounded border border-gray-600 bg-inherit" rows={4} required></textarea>
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </label>
          </div>
        )}

        {step === 2 && (
          <div>
          <label className="block my-4 text-gray-800 dark:text-gray-200">
            Social Platform:
            <select
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              required
              className="w-full p-2 mt-1 rounded border border-gray-300 dark:border-gray-600 bg-[#F7F8F9] dark:bg-[#242424] text-gray-900 dark:text-gray-100"
            >
              <option value="">Select Platform</option>
              {Object.keys(platformEngagementTypes).map((platform) => (
                <option key={platform} value={platform}>{platform}</option>
              ))}
            </select>
            {errors.platform && (
              <p className="text-red-500 text-sm mt-1">{errors.platform}</p>
            )}
          </label>
        
          <label className="block my-4 text-gray-800 dark:text-gray-200">
            Engagement Type:
            <select
              name="engagementType"
              value={formData.engagementType}
              onChange={handleChange}
              required
              className="w-full p-2 mt-1 rounded border border-gray-300 dark:border-gray-600  bg-[#F7F8F9] dark:bg-[#242424] text-gray-900 dark:text-gray-100"
            >
              <option value="">Select Engagement Type</option>
              {(platformEngagementTypes[formData.platform] || []).map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.engagementType && (
              <p className="text-red-500 text-sm mt-1">{errors.engagementType}</p>
            )}
          </label>
        </div>
        
        )}

        {step === 3 && (
          <div>
            <label className="block my-4">
              Reward Points:
              <input type="number" name="rewardPoints" value={formData.rewardPoints} onChange={handleChange} className="w-full p-2 rounded border border-gray-600 bg-inherit" required />
              {errors.rewardPoints && <p className="text-red-500 text-sm">{errors.rewardPoints}</p>}
            </label>
            <label className="block my-4">
              Max Participants:
              <input type="number" name="maxParticipants" value={formData.maxParticipants} onChange={handleChange} className="w-full p-2 rounded border border-gray-600 bg-inherit" required />
              {errors.maxParticipants && <p className="text-red-500 text-sm">{errors.maxParticipants}</p>}
            </label>
            <label className="block my-4">
              Expiration Date:
              <input type="date" name="expiration" value={formData.expiration} onChange={handleChange} className="w-full p-2 rounded border border-gray-600 bg-inherit" required />
              {errors.expiration && <p className="text-red-500 text-sm">{errors.expiration}</p>}
            </label>
            <label className="block my-4">
              Task Link:
              <input type="url" name="taskLink" value={formData.taskLink} onChange={handleChange} className="w-full p-2 rounded border border-gray-600 bg-inherit" required />
              {errors.taskLink && <p className="text-red-500 text-sm">{errors.taskLink}</p>}
            </label>
          </div>
        )}

        {step === 4 && 
          (
            <div>
            <h2 className="text-2xl font-semibold mb-6">Review Your Task</h2>
      
            {formData.image && (
                <div className="mb-6">
                  <p className="text-sm font-medium mb-2">Image Preview</p>
                  <div className="relative group inline-block">
                    {/* Thumbnail */}
                    <Image
                      loader={myImageLoader}
                      quality={75}
                      width={64}
                      height={64}
                      src={formData.image}
                      alt="Thumbnail"
                      className="rounded-md border border-gray-300 dark:border-gray-600 cursor-pointer object-cover w-16 h-16"
                    />

                    {/* Hover Preview */}
                    <div className="absolute z-50 hidden group-hover:flex top-0 left-20 p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 shadow-xl transition-all duration-200">
                      <Image
                        loader={myImageLoader}
                        src={formData.image}
                        alt="Full Preview"
                        width={300}
                        height={200}
                        className="rounded-md object-contain max-w-sm"
                      />
                    </div>
                  </div>
                </div>
              )}
      
      <div className="space-y-3">
  {/* Title - full width */}
  <div>
    <p className="text-sm font-medium">Title</p>
    <p className="text-lg font-semibold">{formData.title || '—'}</p>
  </div>

  {/* Description - full width */}
  <div>
    <p className="text-sm font-medium">Description</p>
    <p className="text-lg">{formData.description || '—'}</p>
  </div>

  {/* Paired fields in two-column grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <p className="text-sm font-medium">Platform</p>
      <p className="text-lg">{formData.platform || '—'}</p>
    </div>

    <div>
      <p className="text-sm font-medium">Engagement Type</p>
      <p className="text-lg">{formData.engagementType || '—'}</p>
    </div>

    <div>
      <p className="text-sm font-medium">Reward Points</p>
      <p className="text-lg">{formData.rewardPoints || '—'}</p>
    </div>

    <div>
      <p className="text-sm font-medium">Max Participants</p>
      <p className="text-lg">{formData.maxParticipants || '—'}</p>
    </div>

    <div>
      <p className="text-sm font-medium">Expiration</p>
      <p className="text-lg">{formData.expiration || '—'}</p>
    </div>

    <div>
      <p className="text-sm font-medium">Task Link</p>
      <a
        href={formData.taskLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 underline break-all"
      >
        {formData.taskLink || '—'}
      </a>
    </div>
  </div>
</div>

          </div>
          )
        }              

        <HR />

        <div className="flex justify-between mt-4">
          {step > 1 && <button className="bg-gray-600 p-2 rounded" onClick={handleBack}>Back</button>}
          {step < 4 && <button className="bg-blue-600 p-2 rounded" onClick={handleNext}>Next</button>}
          {step === 4 && <button className="bg-green-600 p-2 rounded" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Task'}
          </button>}
        </div>
            </>
          )}
      </div>
    </div>
  );
};

export default TaskModal;