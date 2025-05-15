"use client"

import { useState } from "react"
import Image from "next/image"
import { Edit, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { EditAvatarModal } from "@/components/edit-avatar-modal"

// Define the type for the avatar data expected by the modal
interface AvatarData {
  id: number
  firstName: string
  lastName: string
  email: string
  avatarUrl: string | null // Allow null for placeholder
  role?: string // Add back if needed for editing
  experience?: string // Add back if needed for editing
  skills?: string[] // Add back if needed for editing
  createdAt?: string // Add back if needed for editing
  type?: string // Add back if needed for editing
}


interface AvatarCardProps {
  id: number
  firstName: string
  lastName: string
  email: string
  avatarUrl: string // Changed from 'avatar' to 'avatarUrl' to match the prop name used in avatar-dashboard.tsx
  role?: string
  experience?: string
  skills?: string[]
  createdAt: string // Add this line
  type: string // Add this line
  onUpdateAvatar: (updatedAvatar: AvatarData) => void // Add this prop
}

export function AvatarCard({
  id,
  firstName,
  lastName,
  email,
  avatarUrl, // Changed from 'avatar'
  role,
  experience,
  skills,
  createdAt, // Add this prop
  type, // Add this prop
  onUpdateAvatar, // Destructure the new prop
}: AvatarCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Prepare the avatar data to pass to the modal
  const avatarDataForModal: AvatarData = {
    id,
    firstName,
    lastName,
    email,
    avatarUrl,
    role,
    experience,
    skills,
    createdAt,
    type,
  };


  return (
    <>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full bg-gradient-to-r from-purple-500 to-indigo-600"> {/* Background gradient */}
            <Image
              src={avatarUrl || "/placeholder.svg"}
              alt={`${firstName} ${lastName}`}
              fill
              className="object-cover opacity-90 transition-all duration-300 hover:scale-105 hover:opacity-100"
            />
             {/* Type Badge */}
             {type && (
              <span className={`absolute top-2 right-2 z-10 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                 ${type === 'Professional' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                   type === 'Creative' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' :
                   type === 'Casual' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                   'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' // Default or 'New' style
                 }`}
              >
                {type}
              </span>
            )}
             {/* Preview Button */}
             <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                <Button variant="secondary" size="sm" className="opacity-90 hover:opacity-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                    Preview
                </Button>
             </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{firstName} {lastName}</h3> {/* Name styling */}
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Created: {createdAt}</p> {/* Date styling */}
          {/* Add other details like role, experience, skills if needed */}
        </CardContent>

        <CardFooter className="border-t bg-gray-50 p-4 dark:bg-gray-800 flex justify-between items-center"> {/* Footer styling */}
           {/* Download Button */}
           <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"> {/* Download button styling */}
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 17V3"/><path d="m6 11 6 6 6-6"/><path d="M19 21H5"/></svg>
              Download
           </Button>
          <Button variant="outline" size="sm" onClick={() => setIsModalOpen(true)}> {/* Edit button styling */}
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </CardFooter>
      </Card>

      <EditAvatarModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        avatar={avatarDataForModal} // Pass the prepared avatar data
        onUpdateAvatar={onUpdateAvatar} // Pass the update handler
      />
    </>
  )
}
