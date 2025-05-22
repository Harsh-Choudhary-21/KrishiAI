import Link from 'next/link'
import { FiHeart } from 'react-icons/fi'

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">KM</span>
              </div>
              <span className="text-lg font-bold text-gray-900">KrishiMitra AI</span>
            </div>
            <p className="mt-4 text-sm text-gray-600 max-w-md">
              Empowering farmers with AI-driven insights, disease detection, and market information to improve agricultural productivity.
            </p>
          </div>
          
          <div>
            <h5 className="font-semibold text-gray-900 mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/chat" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Chat
                </Link>
              </li>
              <li>
                <Link href="/disease-scanner" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Disease Scanner
                </Link>
              </li>
              <li>
                <Link href="/prices" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Prices
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold text-gray-900 mb-4">Resources</h5>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Farming Tips
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Weather Forecasts
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Government Schemes
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            © {currentYear} KrishiMitra AI. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex items-center">
            <span className="text-sm text-gray-600 flex items-center">
              Made with <FiHeart className="mx-1 text-error-500" /> for Indian Farmers
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}