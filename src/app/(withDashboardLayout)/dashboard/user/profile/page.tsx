'use client'

import { useState } from 'react'
import { useGetSingleUserQuery, useUpdateMYProfileMutation } from '@/redux/features/user/userApi'
import Image from 'next/image'
import { format } from 'date-fns'
import { Pencil } from 'lucide-react'
import UpdateProfileModal from './Components/UpdateProfile'
import AutoFileUploader from '@/components/Forms/AutoFileUploader'

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data: profile, isLoading, isError } = useGetSingleUserQuery({})
  const [updateMYProfile, { isLoading: updating }] = useUpdateMYProfileMutation()

const fileUploadHandler = (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
   formData.append('data', JSON.stringify({}));
  updateMYProfile(formData)
}


  if (isLoading)
    return <div className="text-center p-6 text-lg">🔄 লোড হচ্ছে...</div>
  if (isError || !profile)
    return (
      <div className="text-center p-6 text-red-500">
        ❌ প্রোফাইল লোড করতে সমস্যা হয়েছে।
      </div>
    )

  const { name, email, role, status, profilePhoto, createdAt, needPasswordChange } = profile

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#c3e5f7] via-[#e6f3ff] to-[#ffffff] p-6">
        <div className="w-full max-w-5xl bg-white/50 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-8">
          <div className="grid md:grid-cols-3 gap-10 items-center">

            {/* Profile Photo + Upload */}
            <div className="flex flex-col items-center gap-6">
              <div className="relative group">
                <Image
                  src={profilePhoto}
                  alt="Profile Photo"
                  width={160}
                  height={160}
                  className="rounded-full border-4 border-white shadow-xl object-cover group-hover:brightness-110 transition duration-300"
                />

                {/* Pencil + FileUploader */}
                <div className="absolute bottom-2 right-2 z-10">
                  <AutoFileUploader
                    name="file"
                    label={
                      <div className="bg-blue-600 p-2 rounded-full shadow-md cursor-pointer hover:bg-blue-700 transition">
                        <Pencil size={16} color="white" />
                      </div>
                    }
                    onFileUpload={fileUploadHandler}
                    variant="icon"
                  />
                </div>
              </div>

              {/* Uploading Message */}
              {updating && (
                <p className="text-center text-sm text-gray-500 italic">⏳ Uploading...</p>
              )}
            </div>

            {/* Profile Info */}
            <div className="md:col-span-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 capitalize">{name}</h1>
                  <p className="text-gray-600 mt-1">{email}</p>
                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full shadow transition"
                >
                  ✏️ Update Profile
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                {[ 
                  { label: '👤 Role', value: role },
                  { label: '📌 Status', value: status },
                  {
                    label: '🔐 Password Change',
                    value: needPasswordChange ? '✅ Required' : '❌ Not Required',
                  },
                  {
                    label: '📅 Joined',
                    value: format(new Date(createdAt), 'PPP'),
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white/80 p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
                  >
                    <p className="text-sm text-gray-500 mb-1 font-medium">{item.label}</p>
                    <p className="text-lg font-semibold text-gray-800">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Update Modal */}
      {isModalOpen && (
        <UpdateProfileModal
          profile={profile}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  )
}

export default Profile
