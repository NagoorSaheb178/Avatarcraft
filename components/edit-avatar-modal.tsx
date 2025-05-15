"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea" // Assuming you have a Textarea component
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select" // Assuming you use shadcn/ui Select
import { Upload } from "lucide-react" // Assuming you use lucide-react for icons

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

interface EditAvatarModalProps {
  isOpen: boolean
  onClose: () => void
  avatar: AvatarData // The avatar data to edit
  onUpdateAvatar: (updatedAvatar: AvatarData) => void // Function to call on update
}

export function EditAvatarModal({ isOpen, onClose, avatar, onUpdateAvatar }: EditAvatarModalProps) {
  // State for form fields, initialized with avatar data
  const [firstName, setFirstName] = useState(avatar.firstName)
  const [lastName, setLastName] = useState(avatar.lastName)
  const [email, setEmail] = useState(avatar.email)
  const [style, setStyle] = useState(avatar.type || "Professional") // Assuming 'type' maps to 'Style'
  const [description, setDescription] = useState(avatar.experience || "") // Assuming 'experience' maps to 'Description'
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null)
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string | null>(avatar.avatarUrl)

  // Update state when the avatar prop changes (e.g., modal opens with different avatar)
  useEffect(() => {
    if (avatar) {
      setFirstName(avatar.firstName)
      setLastName(avatar.lastName)
      setEmail(avatar.email)
      setStyle(avatar.type || "Professional")
      setDescription(avatar.experience || "")
      setProfilePhoto(null) // Reset file input
      setProfilePhotoPreview(avatar.avatarUrl)
    }
  }, [avatar])

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setProfilePhoto(file)
      setProfilePhotoPreview(URL.createObjectURL(file))
    }
  }

  const handlePhotoDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      setProfilePhoto(file)
      setProfilePhotoPreview(URL.createObjectURL(file))
    }
  }

  const handlePhotoClick = () => {
    document.getElementById("editProfilePhotoInput")?.click()
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Create the updated avatar object
    const updatedAvatar: AvatarData = {
      ...avatar, // Keep existing properties like id, createdAt, etc.
      firstName,
      lastName,
      email,
      avatarUrl: profilePhotoPreview, // Use the preview URL (could be original or new upload)
      type: style, // Map Style back to type
      experience: description, // Map Description back to experience
      // Add other fields if you included them in the form
    }
    onUpdateAvatar(updatedAvatar) // Call the update handler
    onClose() // Close the modal
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Avatar</DialogTitle>
          <DialogDescription>Update your AI-generated avatar settings.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
           {/* Avatar Name (Assuming this maps to first + last name or just first name) */}
           <div className="space-y-2">
            <Label htmlFor="avatarName">Avatar Name</Label>
            {/* You might want a single 'name' field or combine first/last */}
            {/* For now, let's use firstName as the primary 'Avatar Name' field */}
            <Input
              id="avatarName"
              value={firstName} // Using firstName for 'Avatar Name' as seen in screenshot
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter a name for your avatar"
            />
          </div>

          {/* Style */}
          <div className="space-y-2">
            <Label htmlFor="style">Style</Label>
            <Select value={style} onValueChange={setStyle}>
              <SelectTrigger id="style">
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Professional">Professional</SelectItem>
                <SelectItem value="Creative">Creative</SelectItem>
                <SelectItem value="Casual">Casual</SelectItem>
                <SelectItem value="New">New</SelectItem> {/* Include 'New' if it's a valid style */}
                {/* Add other style options as needed */}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe how you want your avatar to look"
            />
             <p className="text-sm text-gray-500 dark:text-gray-400">Brief description of how you'd like your avatar to appear. Include any specific features or characteristics.</p>
          </div>

          {/* Upload Reference Image */}
          <div className="space-y-2">
            <Label>Upload Reference Image (Optional)</Label>
            <div
              className="flex h-32 w-full cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-300 transition-colors hover:border-gray-400 bg-gray-50 relative"
              onClick={handlePhotoClick}
              onDrop={handlePhotoDrop}
              onDragOver={handleDragOver}
            >
              {profilePhotoPreview ? (
                // Use an img tag for the preview
                <img
                  src={profilePhotoPreview}
                  alt="Profile Preview"
                  className="h-full w-full object-cover rounded-md" // Added w-full for better fill
                />
              ) : (
                <div className="flex flex-col items-center space-y-2">
                  <Upload className="h-8 w-8 text-gray-400" />
                  <span className="text-sm text-gray-500">Upload a file or drag and drop</span>
                  <span className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</span>
                </div>
              )}
              <input
                id="editProfilePhotoInput" // Unique ID for edit modal
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </div>
          </div>


          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Update Avatar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
