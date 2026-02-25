'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, 
  BookOpen, 
  Image, 
  Video, 
  Info, 
  Mail, 
  User,
  Menu,
  X,
  Sparkles
} from 'lucide-react'
import { useAuth } from './auth'
import UserMenu from './usermenu'

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Poetry', path: '/poetry', icon: BookOpen },
  { name: 'Photos', path: '/photos', icon: Image },
  { name: 'Videos', path: '/videos', icon: Video },
  { name: 'About', path: '/about', icon: Info },
  { name: 'Contact', path: '/contact', icon: Mail },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user } = useAuth()
  const [showSecretAdmin, setShowSecretAdmin] = useState(false)
  const [secretCode, setSecretCode] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault()
        setShowSecretAdmin(true)
      }
    }
    
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  const handleSecretCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value
    setSecretCode(code)
    if (code === 'royaladmin123') {
      window.location.href = '/secret-admin'
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Royal Poetry
                </h1>
                <p className="text-xs text-gray-400">Universe</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300 group"
                >
                  <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>{item.name}</span>
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </Link>
              ))}
              
              {/* User Menu */}
              <UserMenu />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg glass hover:bg-white/10 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence custom={undefined} onExitComplete={() => {}} exitBeforeEnter={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-20 z-40 md:hidden"
          >
            <div className="container mx-auto px-4">
              <div className="glass-dark rounded-2xl p-6">
                <div className="space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.path}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors duration-300"
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                  
                  {/* User section in mobile */}
                  {user ? (
                    <div className="pt-4 border-t border-white/10">
                      <div className="flex items-center gap-3 p-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold">{user.name}</p>
                          <p className="text-sm text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="pt-4 border-t border-white/10 space-y-3">
                      <Link
                        href="/login"
                        onClick={() => setIsOpen(false)}
                        className="block w-full py-3 text-center glass rounded-lg hover:bg-white/10 transition-colors"
                      >
                        Login
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setIsOpen(false)}
                        className="block w-full py-3 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                      >
                        Register
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Secret Admin Trigger (Hidden) */}
      <AnimatePresence custom={undefined} onExitComplete={() => {}} exitBeforeEnter={false}>
        {showSecretAdmin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setShowSecretAdmin(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass p-8 rounded-2xl max-w-md w-full mx-4"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-4 text-center gradient-text">
                Admin Access
              </h3>
              <p className="text-gray-400 text-center mb-6">
                Enter admin code to continue
              </p>
              <input
                type="password"
                value={secretCode}
                onChange={handleSecretCode}
                placeholder="Enter secret code..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                autoFocus
              />
              <button
                onClick={() => setShowSecretAdmin(false)}
                className="w-full mt-4 py-3 glass rounded-lg hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}