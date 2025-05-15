"use client"

import { useState } from "react"
import { UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CreateAvatarModal } from "@/components/create-avatar-modal"

export function CreateAvatarButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button
        className="fixed bottom-6 right-6 shadow-lg transition-transform duration-300 hover:scale-105 md:bottom-8 md:right-8"
        size="lg"
        onClick={() => setIsModalOpen(true)}
      >
        <UserPlus className="mr-2 h-5 w-5" />
        Add New Candidate
      </Button>

      <CreateAvatarModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
