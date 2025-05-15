"use client" // Add this directive at the very top

import { useState } from "react" // Import useState for managing modal state
import { AvatarCard } from "@/components/avatar-card"
import { CreateAvatarModal } from "@/components/create-avatar-modal" // Assuming this is your modal component
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button" // Assuming you use shadcn/ui Button
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select" // Assuming you use shadcn/ui Select
import { ChevronLeft, ChevronRight } from "lucide-react" // Import icons for pagination

// Define the type for the avatar data
interface AvatarData {
  id: number
  firstName: string // Keep firstName for the card display
  lastName: string // Keep lastName for the card display
  email: string // Keep email for the card display (even if not in create modal)
  avatarUrl: string | null // Allow null for placeholder
  role?: string
  experience?: string // This will now come from the 'description' field in the modal
  skills?: string[]
  createdAt: string
  type: string // This will now come from the 'style' field in the modal
}


// Mock data for professional avatars - Updated to match screenshot details
const initialAvatars: AvatarData[] = [ // Add type annotation
  {
    id: 1,
    firstName: "Emma", // Changed from first_name
    lastName: "Johnson", // Changed from last_name
    email: "emma.johnson@company.com", // Changed email to match screenshot name
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1361&q=80", // Using a different image URL
    createdAt: "May 15, 2025", // Added creation date
    type: "Professional", // Added type badge
    // Removed role, experience, skills as they are not on the card in the screenshot
  },
  {
    id: 2,
    firstName: "Daniel", // Changed from Michael
    lastName: "Chen",
    email: "daniel.chen@company.com", // Changed email to match screenshot name
    avatarUrl: "https://vheer.com/_next/image?url=%2Fimages%2FlandingPages%2Fai_profile_picture_generator%2Fpreview_image_2.webp&w=1080&q=75", // Using a different image URL
    createdAt: "May 15, 2025",
    type: "Creative",
  },
  {
    id: 3,
    firstName: "Sarah", // Changed from Priya
    lastName: "Williams", // Changed from Patel
    email: "sarah.williams@company.com", // Changed email to match screenshot name
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80", // Using a different image URL
    createdAt: "May 15, 2025",
    type: "Casual",
  },
  // Add more mock data if needed
]

// Function to simulate fetching avatars (now just returns mock data)
function getAvatars() {
  return Promise.resolve(initialAvatars)
}

export default function AvatarDashboard() { // Changed to a client component to use useState
  const [avatars, setAvatars] = useState<AvatarData[]>(initialAvatars) // Manage avatars in state, add type
  const [modalOpen, setModalOpen] = useState(false) // State for create modal visibility

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9 // Set how many items per page you want

  // Calculate pagination values
  const totalAvatars = avatars.length
  const totalPages = Math.ceil(totalAvatars / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalAvatars)
  const paginatedAvatars = avatars.slice(startIndex, endIndex)

  // Function to handle adding a new candidate from the modal
  // Update the expected data structure from the modal
  const handleAddCandidate = (newCandidateData: { avatarName: string; style: string; description: string; profilePhotoPreview: string | null }) => {
    // Create a new candidate object with a unique ID and default values
    const newCandidate: AvatarData = { // Add type annotation
      id: totalAvatars + 1, // Simple unique ID generation based on current total
      firstName: newCandidateData.avatarName.split(' ')[0] || '', // Simple split for first name
      lastName: newCandidateData.avatarName.split(' ').slice(1).join(' ') || '', // Simple join for last name
      email: "", // Email is not collected in the new modal, default or handle as needed
      avatarUrl: newCandidateData.profilePhotoPreview || "/placeholder.svg", // Use uploaded photo or placeholder
      createdAt: new Date().toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' }), // Current date
      type: newCandidateData.style, // Use style from the modal
      experience: newCandidateData.description, // Use description from the modal
      // Add other fields if your AvatarCard uses them
    };
    setAvatars((prevAvatars) => [...prevAvatars, newCandidate]); // Add to state
    // Optional: Go to the last page when a new avatar is added
    // setCurrentPage(Math.ceil((totalAvatars + 1) / itemsPerPage));
    setModalOpen(false); // Close the modal
  };

  // Function to handle updating an existing avatar
  const handleUpdateAvatar = (updatedAvatar: AvatarData) => { // Add this function
    setAvatars((prevAvatars) =>
      prevAvatars.map((avatar) =>
        avatar.id === updatedAvatar.id ? updatedAvatar : avatar // Replace the old avatar with the updated one
      )
    );
  };


  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }


  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader />

      {/* Statistics Section */}
      <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Placeholder Stat Card 1 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Avatars</p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-1">{totalAvatars}</p> {/* Use totalAvatars */}
          </div>
          {/* Placeholder Icon */}
          <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
          </div>
        </div>
        {/* Placeholder Stat Card 2 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Generated This Month</p>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-1">12</p> {/* Mock value */}
          </div>
          {/* Placeholder Icon */}
          <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
          </div>
        </div>
         {/* Placeholder Stat Card 3 */}
         <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Available Credits</p>
            <p className="text-3xl font-bold text-teal-600 dark:text-teal-400 mt-1">24</p> {/* Mock value */}
          </div>
          {/* Placeholder Icon */}
          <div className="p-3 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
          </div>
        </div>
         {/* Placeholder Stat Card 4 */}
         <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Plan Status</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">Pro <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">Active</span></p> {/* Mock value */}
          </div>
          {/* Placeholder Icon */}
          <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
        </div>
      </section>


      <section className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Your AI Avatars</h2> {/* Updated title */}
          {/* Placeholder for Sorting Dropdown */}
          <Select defaultValue="recently-created">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recently-created">Recently Created</SelectItem>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {paginatedAvatars.length > 0 ? ( // Use paginatedAvatars here
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedAvatars.map((avatar) => ( // Map over paginatedAvatars
              <AvatarCard
                key={avatar.id}
                id={avatar.id}
                firstName={avatar.firstName} // Use firstName
                lastName={avatar.lastName} // Use lastName
                email={avatar.email}
                avatarUrl={avatar.avatarUrl} // Change prop name from 'avatar' to 'avatarUrl'
                createdAt={avatar.createdAt} // Pass creation date
                type={avatar.type} // Pass type
                onUpdateAvatar={handleUpdateAvatar} // Pass the update handler
                // Pass other props if needed by AvatarCard
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500 dark:text-gray-400">No avatars found. Create a new one to get started.</p>
          </div>
        )}

        {/* Pagination and Count */}
        {totalAvatars > 0 && ( // Only show pagination if there are avatars
          <div className="mt-8 flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {startIndex + 1} to {endIndex} of {totalAvatars} avatars
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {/* Placeholder for page numbers - currently just shows the current page */}
              <span className="px-4 py-2 border rounded-md text-sm font-medium bg-blue-500 text-white dark:bg-blue-600 dark:text-gray-100">
                {currentPage}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </section>

      {/* The CreateAvatarButton might need absolute/fixed positioning in CSS to match the screenshot */}
      <div className="fixed bottom-6 right-6 z-50"> {/* Example fixed positioning */}
         <Button onClick={() => setModalOpen(true)}> {/* Use shadcn Button */}
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            Create New Avatar
         </Button>
      </div>


      {/* Modal for creating new avatar */}
      <CreateAvatarModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddCandidate={handleAddCandidate} // Pass the handler to the modal
      />
    </div>
  )
}
