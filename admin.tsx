'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  Users, 
  FileText, 
  Image as ImageIcon, 
  Video,
  MessageSquare,
  TrendingUp,
  Eye,
  Heart
} from 'lucide-react'
import AdminSidebar from './components/AdminSidebar'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalPhotos: 0,
    totalVideos: 0,
    totalUsers: 0,
    unreadMessages: 0,
    totalLikes: 0
  })

  const [recentActivity, setRecentActivity] = useState<any[]>([])

  useEffect(() => {
    // Fetch dashboard data
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // In production, replace with actual API calls
      setStats({
        totalPosts: 24,
        totalPhotos: 16,
        totalVideos: 8,
        totalUsers: 42,
        unreadMessages: 3,
        totalLikes: 128
      })

      setRecentActivity([
        { id: 1, type: 'post', action: 'created', title: 'Midnight Sonnet', time: '2 hours ago' },
        { id: 2, type: 'photo', action: 'uploaded', title: 'Cosmic Dawn', time: '4 hours ago' },
        { id: 3, type: 'message', action: 'received', title: 'Contact Form', time: '1 day ago' },
        { id: 4, type: 'user', action: 'registered', title: 'New User', time: '2 days ago' }
      ])
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    }
  }

  const statCards = [
    {
      title: 'Total Posts',
      value: stats.totalPosts,
      icon: FileText,
      color: 'from-blue-500 to-cyan-500',
      change: '+12%'
    },
    {
      title: 'Photos',
      value: stats.totalPhotos,
      icon: ImageIcon,
      color: 'from-purple-500 to-pink-500',
      change: '+8%'
    },
    {
      title: 'Videos',
      value: stats.totalVideos,
      icon: Video,
      color: 'from-orange-500 to-red-500',
      change: '+24%'
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'from-green-500 to-emerald-500',
      change: '+5%'
    },
    {
      title: 'Messages',
      value: stats.unreadMessages,
      icon: MessageSquare,
      color: 'from-yellow-500 to-amber-500',
      change: 'New'
    },
    {
      title: 'Total Likes',
      value: stats.totalLikes,
      icon: Heart,
      color: 'from-rose-500 to-pink-500',
      change: '+18%'
    }
  ]

  return (
    <div className="min-h-screen bg-black">
      <AdminSidebar />
      
      <div className="ml-0 lg:ml-64 p-4 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold gradient-text mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-400">
            Welcome back! Here's what's happening with your poetry universe.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass p-6 rounded-2xl hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-semibold text-green-400">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
              <p className="text-gray-400">{stat.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chart Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Performance</h2>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            
            {/* Placeholder for chart */}
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500">Analytics Chart</p>
                <p className="text-sm text-gray-600">Chart visualization will appear here</p>
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Recent Activity</h2>
              <Eye className="w-5 h-5 text-gray-400" />
            </div>

            <div className="space-y-4">
              {recentActivity.map((activity: any) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'post' ? 'bg-blue-500/20' :
                    activity.type === 'photo' ? 'bg-purple-500/20' :
                    activity.type === 'message' ? 'bg-yellow-500/20' :
                    'bg-green-500/20'
                  }`}>
                    {activity.type === 'post' && <FileText className="w-5 h-5" />}
                    {activity.type === 'photo' && <ImageIcon className="w-5 h-5" />}
                    {activity.type === 'message' && <MessageSquare className="w-5 h-5" />}
                    {activity.type === 'user' && <Users className="w-5 h-5" />}
                  </div>
                  
                  <div className="flex-1">
                    <p className="font-medium">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-400">
                      {activity.action.charAt(0).toUpperCase() + activity.action.slice(1)}
                    </p>
                  </div>
                  
                  <span className="text-sm text-gray-500">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Create New Post', href: '/admin/upload/poetry', icon: FileText },
              { label: 'Upload Photo', href: '/admin/upload/photos', icon: ImageIcon },
              { label: 'Upload Video', href: '/admin/upload/videos', icon: Video }
            ].map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="glass p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500">
                    <action.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{action.label}</h3>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300">
                      Click to start creating
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}