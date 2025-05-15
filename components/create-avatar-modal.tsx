"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea" // Assuming you have a Textarea component
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select" // Assuming you use shadcn/ui Select
import { Upload } from "lucide-react" // Assuming you use lucide-react for icons

interface CreateAvatarModalProps {
  isOpen: boolean
  onClose: () => void
  // Update the expected data structure to match the new form fields
  onAddCandidate: (candidateData: { avatarName: string; style: string; description: string; profilePhotoPreview: string | null }) => void
}

export function CreateAvatarModal({ isOpen, onClose, onAddCandidate }: CreateAvatarModalProps) {
  // State for form fields
  const [avatarName, setAvatarName] = useState("") // State for Avatar Name
  const [style, setStyle] = useState("Professional") // State for Style, default to Professional
  const [description, setDescription] = useState("") // State for Description
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null)
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string | null>(null)

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
    document.getElementById("profilePhotoInput")?.click()
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Call the onAddCandidate prop with the collected data
    onAddCandidate({
      avatarName, // Pass Avatar Name
      style, // Pass Style
      description, // Pass Description
      profilePhotoPreview, // Pass the preview URL
    })
    // Reset form fields
    setAvatarName("")
    setStyle("Professional") // Reset style to default
    setDescription("")
    setProfilePhoto(null)
    setProfilePhotoPreview(null)
    onClose() // Close the modal after adding
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* The sm:max-w-[425px] class controls the width, height is determined by content */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Avatar</DialogTitle> {/* Updated Title */}
          <DialogDescription>Create a new AI-generated avatar based on your preferences. Choose a style and provide some details.</DialogDescription> {/* Updated Description */}
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4"> {/* space-y-4 adds vertical spacing */}
          {/* Avatar Name */}
          <div className="space-y-2"> {/* space-y-2 adds spacing between label and input */}
            <Label htmlFor="avatarName">Avatar Name</Label>
            <Input
              id="avatarName"
              value={avatarName}
              onChange={(e) => setAvatarName(e.target.value)}
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
                <img
                  src={profilePhotoPreview}
                  alt="Profile Preview"
                  className="h-full w-full object-cover rounded-md"
                />
              ) : (
                <div className="flex flex-col items-center space-y-2">
                  <Upload className="h-8 w-8 text-gray-400" />
                  <span className="text-sm text-gray-500">Upload a file or drag and drop</span>
                  <span className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</span>
                </div>
              )}
              <input
                id="profilePhotoInput"
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
            <Button type="submit">Create Avatar</Button> {/* Updated Button Text */}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
