import React, { useState } from 'react'
import { Share2, Copy, MessageCircle, Twitter, Facebook, Check } from 'lucide-react'

interface ShareButtonsProps {
  title: string
  url: string
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url }) => {
  const [copied, setCopied] = useState(false)

  const shareData = {
    title,
    url: window.location.origin + url,
    text: `Check out this blog post: ${title}`,
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareData.url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const shareToWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareData.text} ${shareData.url}`)}`
    window.open(whatsappUrl, '_blank')
  }

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`
    window.open(twitterUrl, '_blank')
  }

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`
    window.open(facebookUrl, '_blank')
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.error('Error sharing:', err)
      }
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-4 animate-fade-in">
      <span className="text-xs sm:text-sm font-medium text-gray-700 mr-1 sm:mr-2 w-full sm:w-auto mb-2 sm:mb-0">Share:</span>
      
      {navigator.share && (
        <button
          onClick={handleNativeShare}
          className="btn-secondary flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm px-2 sm:px-4 py-2"
          title="Share"
        >
          <Share2 className="h-4 w-4" />
          <span className="hidden sm:inline">Share</span>
        </button>
      )}

      <button
        onClick={shareToWhatsApp}
        className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-300 hover-lift text-xs sm:text-sm"
        title="Share on WhatsApp"
      >
        <MessageCircle className="h-4 w-4" />
        <span className="hidden sm:inline">WhatsApp</span>
        <span className="sm:hidden">WA</span>
      </button>

      <button
        onClick={shareToTwitter}
        className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 hover-lift text-xs sm:text-sm"
        title="Share on Twitter"
      >
        <Twitter className="h-4 w-4" />
        <span className="hidden sm:inline">Twitter</span>
        <span className="sm:hidden">X</span>
      </button>

      <button
        onClick={shareToFacebook}
        className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 hover-lift text-xs sm:text-sm"
        title="Share on Facebook"
      >
        <Facebook className="h-4 w-4" />
        <span className="hidden sm:inline">Facebook</span>
        <span className="sm:hidden">FB</span>
      </button>

      <button
        onClick={copyToClipboard}
        className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 hover-lift ${
          copied 
            ? 'bg-green-100 text-green-700 scale-105' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        } text-xs sm:text-sm px-2 sm:px-4 py-2`}
        title="Copy Link"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy Link'}</span>
        <span className="sm:hidden">{copied ? '✓' : 'Copy'}</span>
      </button>
    </div>
  )
}

export default ShareButtons