import Link from 'next/link'
import Image from 'next/image'
import { FiMessageSquare, FiCamera, FiBarChart2, FiCloudLightning } from 'react-icons/fi'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-700 to-primary-900 text-white">
        <div className="container-custom py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                Your AI-Powered Agricultural Assistant
              </h1>
              <p className="text-lg md:text-xl text-primary-50 max-w-lg">
                KrishiMitra AI helps farmers make better decisions with instant crop advice, disease detection, and market prices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/chat" className="btn bg-white text-primary-700 hover:bg-gray-100 px-6 py-3 rounded-md font-medium text-base">
                  Start Chatting
                </Link>
                <Link href="/disease-scanner" className="btn bg-primary-600 text-white hover:bg-primary-500 border border-primary-400 px-6 py-3 rounded-md font-medium text-base">
                  Scan Crop Disease
                </Link>
              </div>
            </div>
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-xl">
              <Image 
                src="https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg"
                alt="Farmer in field with crops"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How KrishiMitra AI Helps You</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI-powered tools help you grow better crops, identify diseases early, and get fair prices for your produce.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="card p-6 flex flex-col items-center text-center transition-transform hover:scale-105">
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <FiMessageSquare className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ask Any Question</h3>
              <p className="text-gray-600">
                Get instant answers about crops, fertilizers, pesticides, and government schemes.
              </p>
              <Link href="/chat" className="mt-4 text-primary-600 font-medium hover:text-primary-700 flex items-center">
                Try the Chat
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            {/* Feature 2 */}
            <div className="card p-6 flex flex-col items-center text-center transition-transform hover:scale-105">
              <div className="w-16 h-16 rounded-full bg-accent-100 flex items-center justify-center mb-4">
                <FiCamera className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Detect Crop Diseases</h3>
              <p className="text-gray-600">
                Take a photo of your plant and instantly identify diseases with treatment recommendations.
              </p>
              <Link href="/disease-scanner" className="mt-4 text-accent-600 font-medium hover:text-accent-700 flex items-center">
                Scan Your Crops
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            {/* Feature 3 */}
            <div className="card p-6 flex flex-col items-center text-center transition-transform hover:scale-105">
              <div className="w-16 h-16 rounded-full bg-secondary-100 flex items-center justify-center mb-4">
                <FiBarChart2 className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Check Market Prices</h3>
              <p className="text-gray-600">
                Stay updated with the latest mandi prices to sell your produce at the best rates.
              </p>
              <Link href="/prices" className="mt-4 text-secondary-600 font-medium hover:text-secondary-700 flex items-center">
                View Prices
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            {/* Feature 4 */}
            <div className="card p-6 flex flex-col items-center text-center transition-transform hover:scale-105">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <FiCloudLightning className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Weather Forecasts</h3>
              <p className="text-gray-600">
                Plan your farming activities with accurate weather predictions for your location.
              </p>
              <Link href="/chat" className="mt-4 text-blue-600 font-medium hover:text-blue-700 flex items-center">
                Check Weather
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Farmers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from farmers who are already using KrishiMitra AI to improve their farming practices.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary-200 flex items-center justify-center">
                  <span className="text-primary-700 font-bold">RS</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Rajesh Singh</h4>
                  <p className="text-sm text-gray-600">Wheat Farmer, Punjab</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The disease scanner saved my wheat crop this season. I identified stem rust early and applied the right treatment."
              </p>
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-accent-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary-200 flex items-center justify-center">
                  <span className="text-primary-700 font-bold">SP</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Sunita Patel</h4>
                  <p className="text-sm text-gray-600">Tomato Grower, Gujarat</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I use the price checker every day to decide when to sell my tomatoes. It has helped me increase my profits by 20%."
              </p>
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-accent-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary-200 flex items-center justify-center">
                  <span className="text-primary-700 font-bold">MK</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Mohan Kumar</h4>
                  <p className="text-sm text-gray-600">Rice Farmer, Tamil Nadu</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The chat feature gives me instant answers about government subsidies and new farming techniques. Very helpful!"
              </p>
              <div className="flex mt-4">
                {[...Array(4)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-accent-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary-50">
        <div className="container-custom">
          <div className="rounded-xl bg-gradient-to-r from-primary-600 to-primary-800 p-8 md:p-12 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Ready to Transform Your Farming?
                </h2>
                <p className="text-primary-100 max-w-lg">
                  Join thousands of farmers using KrishiMitra AI to grow better crops, detect diseases early, and get better prices.
                </p>
              </div>
              <div className="flex flex-col space-y-4">
                <Link href="/chat" className="btn bg-white text-primary-700 hover:bg-gray-100 px-6 py-3 rounded-md font-medium text-base text-center">
                  Get Started Now
                </Link>
                <Link href="/disease-scanner" className="btn bg-primary-700 text-white hover:bg-primary-600 border border-primary-400 px-6 py-3 rounded-md font-medium text-base text-center">
                  Try Disease Scanner
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}