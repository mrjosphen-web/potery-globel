'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  LogOut, 
  Settings, 
  Heart, 
  ChevronDown,
  Bookmark,
  Shield
} from 'lucide-react'
import Link from 'next/link'
import { useAuth } from './auth'
import toast from 'react-hot-toast'

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { user, logout } = useAuth()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!user) {
    return (
      <div className="hidden md:flex items-center gap-4">
        <Link
          href="/login"
          className="px-4 py-2 rounded-lg glass hover:bg-white/10 transition-colors"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
        >
          Register
        </Link>
      </div>
    )
  }

  const handleLogout = () => {
    logout()
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2 rounded-lg glass hover:bg-white/10 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <User className="w-4 h-4" />
        </div>
        <span className="hidden md:block">{user.name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence custom={undefined} onExitComplete={() => {}} exitBeforeEnter={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-64 glass-dark rounded-xl shadow-xl overflow-hidden z-50"
          >
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-400">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="p-2">
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </Link>

              <Link
                href="/favorites"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Heart className="w-4 h-4" />
                <span>Favorites</span>
              </Link>

              <Link
                href="/saved"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Bookmark className="w-4 h-4" />
                <span>Saved</span>
              </Link>

              {user.role === 'admin' && (
                <Link
                  href="/admin/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Shield className="w-4 h-4" />
                  <span>Admin Dashboard</span>
                </Link>
              )}

              <Link
                href="/settings"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Link>
            </div>

            <div className="p-2 border-t border-white/10">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}