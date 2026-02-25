'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Heart, 
  BookOpen, 
  Calendar, 
  User, 
  ChevronRight,
  Bookmark,
  Share2
} from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface PoetryCardProps {
  post: {
    _id: string
    title: string
    content: string
    category: string
    author: string
    likes: number
    createdAt: string
    tags?: string[]
  }
}

export default function PoetryCard({ post }: PoetryCardProps) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [likes, setLikes] = useState(post.likes)

  const handleLike = async () => {
    try {
      // API call to like post
      setLiked(!liked)
      setLikes(prev => liked ? prev - 1 : prev + 1)
      
      if (!liked) {
        toast.success('Added to favorites')
      }
    } catch (error) {
      toast.error('Failed to like post')
    }
  }

  const handleSave = () => {
    setSaved(!saved)
    toast.success(saved ? 'Removed from saved' : 'Saved to collection')
  }

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/poetry/${post._id}`)
    toast.success('Link copied to clipboard')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      love: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      nature: 'bg-green-500/20 text-green-400 border-green-500/30',
      philosophy: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      life: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      spiritual: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      other: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
    return colors[category] || colors.other
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group glass rounded-2xl p-6 hover:bg-white/5 transition-all duration-300"
    >
      {/* Category */}
      <div className="flex items-center justify-between mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(post.category)}`}>
          {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
        </span>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleLike}
            className={`p-2 rounded-lg transition-colors ${
              liked 
                ? 'bg-red-500/20 text-red-400' 
                : 'hover:bg-white/10 text-gray-400'
            }`}
          >
            <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleSave}
            className={`p-2 rounded-lg transition-colors ${
              saved 
                ? 'bg-blue-500/20 text-blue-400' 
                : 'hover:bg-white/10 text-gray-400'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors">
        {post.title}
      </h3>

      {/* Content Preview */}
      <div className="mb-4">
        <p className="text-gray-300 line-clamp-3">
          {post.content.length > 150 ? `${post.content.substring(0, 150)}...` : post.content}
        </p>
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-white/5 rounded-md text-gray-400"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(post.createdAt)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-400" />
            <span className="text-sm">{likes}</span>
          </div>

          <Link
            href={`/poetry/${post._id}`}
            className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg hover:from-blue-600/30 hover:to-purple-600/30 transition-all group"
          >
            <span className="text-sm">Read</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}