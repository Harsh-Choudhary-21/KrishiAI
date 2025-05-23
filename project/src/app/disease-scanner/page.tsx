'use client'
import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiUpload, FiCamera, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi'
import toast from 'react-hot-toast'

type DetectionResult = {
  disease: string
  confidence: number
  description: string
  treatment: string
}

// Mock disease detection results
const mockDiseaseResults: Record<string, DetectionResult> = {
  'default': {
    disease: 'Tomato Late Blight',
    confidence: 92.7,
    description: 'Late blight is a disease caused by the fungus-like oomycete pathogen Phytophthora infestans. It can cause significant yield losses and primarily affects leaves, stems, and fruits.',
    treatment: 'Apply fungicide containing chlorothalonil or mancozeb every 7-10 days. Remove and destroy infected plant parts. Ensure proper spacing between plants for good air circulation.'
  },
  'rice': {
    disease: 'Rice Blast',
    confidence: 88.3,
    description: 'Rice blast is caused by the fungus Magnaporthe oryzae. It affects all above-ground parts of the rice plant and can cause lesions on leaves, stems, and panicles.',
    treatment: 'Use blast-resistant rice varieties. Apply fungicides like Trifloxystrobin or Azoxystrobin. Maintain proper water management in the field. Avoid excessive nitrogen fertilization.'
  },
  'wheat': {
    disease: 'Wheat Rust',
    confidence: 95.1,
    description: 'Wheat rust is a fungal disease that appears as rusty spots on leaves and stems. The three types are stem rust, leaf rust, and stripe rust, all caused by different Puccinia species.',
    treatment: 'Plant rust-resistant wheat varieties. Apply fungicides like propiconazole or tebuconazole at the early signs of infection. Practice crop rotation to break the disease cycle.'
  },
  'potato': {
    disease: 'Potato Early Blight',
    confidence: 86.5,
    description: 'Early blight is caused by the fungus Alternaria solani. It causes dark, concentric lesions on lower leaves first, then spreads upward on the plant as the disease progresses.',
    treatment: 'Apply fungicides containing chlorothalonil or copper-based products. Maintain adequate plant nutrition, especially potassium. Practice crop rotation with non-host plants.'
  }
}

export default function DiseaseScanner() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<DetectionResult | null>(null)
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0]
      setFile(selectedFile)
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(selectedFile)
      setPreview(previewUrl)
      setResult(null)
    }
  }, [])
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/jpg': []
    },
    maxSize: 5242880, // 5MB
    multiple: false
  })
  
  const analyzeImage = async () => {
    if (!file) return
    
    setIsAnalyzing(true)
    toast.loading('Analyzing image...', { id: 'analyzing' })
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Get mock result based on filename
      let mockResult = mockDiseaseResults.default
      const fileName = file.name.toLowerCase()
      
      if (fileName.includes('rice')) {
        mockResult = mockDiseaseResults.rice
      } else if (fileName.includes('wheat')) {
        mockResult = mockDiseaseResults.wheat
      } else if (fileName.includes('potato')) {
        mockResult = mockDiseaseResults.potato
      }
      
      setResult(mockResult)
      toast.success('Analysis complete!', { id: 'analyzing' })
    } catch (error) {
      console.error('Error analyzing image:', error)
      toast.error('Failed to analyze image. Please try again.', { id: 'analyzing' })
    } finally {
      setIsAnalyzing(false)
    }
  }
  
  const resetScanner = () => {
    setFile(null)
    setPreview(null)
    setResult(null)
    
    if (preview) {
      URL.revokeObjectURL(preview)
    }
  }
  
  const getConfidenceColorClass = (confidence: number) => {
    if (confidence >= 90) return 'bg-success-500'
    if (confidence >= 70) return 'bg-accent-500'
    return 'bg-error-500'
  }

  return (
    <div className="container-custom py-8">
      <div className="max-w-4xl mx-auto">
        <div className="card overflow-hidden">
          <div className="bg-primary-700 p-6 text-white">
            <h1 className="text-2xl font-bold">Crop Disease Scanner</h1>
            <p className="text-primary-100 mt-2">
              Upload a photo of your plant to identify diseases and get treatment recommendations.
            </p>
          </div>
          
          <div className="p-6">
            {!preview ? (
              <div
                {...getRootProps()}
                className={`upload-area ${isDragActive ? 'upload-area-active' : ''} cursor-pointer`}
              >
                <input {...getInputProps()} />
                <FiUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">
                  {isDragActive
                    ? "Drop the image here..."
                    : "Drag and drop an image here, or click to select"}
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Supported formats: JPG, PNG (Max: 5MB)
                </p>
                <button
                  type="button"
                  className="mt-4 btn btn-primary flex items-center justify-center"
                  onClick={(e) => {
                   onClick={(e) => {
                          e.stopPropagation();
                          (document.querySelector('input[type="file"]') as HTMLInputElement)?.click();
                  }}


                  }}
                >
                  <FiCamera className="w-4 h-4 mr-2" />
                  Select Image
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="relative h-64 md:h-80 rounded-lg overflow-hidden border border-gray-200">
                  <Image
                    src={preview}
                    alt="Plant image"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                
                {!result ? (
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                    <button
                      type="button"
                      className="btn btn-primary flex-1"
                      onClick={analyzeImage}
                      disabled={isAnalyzing}
                    >
                      {isAnalyzing ? 'Analyzing...' : 'Analyze Image'}
                    </button>
                    <button
                      type="button"
                      className="btn bg-gray-200 text-gray-800 hover:bg-gray-300"
                      onClick={resetScanner}
                      disabled={isAnalyzing}
                    >
                      Upload Different Image
                    </button>
                  </div>
                ) : (
                  <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">Detection Result</h3>
                        <div className="flex items-center">
                          <span className="text-sm font-semibold mr-2">Confidence:</span>
                          <div className="confidence-indicator w-24">
                            <div 
                              className={`confidence-bar ${getConfidenceColorClass(result.confidence)}`}
                              style={{ width: `${result.confidence}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 font-bold text-sm">{result.confidence.toFixed(1)}%</span>
                        </div>
                      </div>
                      
                      <div className="bg-red-50 border border-red-100 rounded-md p-3 mb-4 flex items-start">
                        <FiAlertTriangle className="text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-red-700">Detected: {result.disease}</h4>
                          <p className="text-sm text-red-600">{result.description}</p>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 border border-green-100 rounded-md p-3 flex items-start">
                        <FiCheckCircle className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-green-700">Recommended Treatment</h4>
                          <p className="text-sm text-green-600">{result.treatment}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                      <button
                        type="button"
                        className="btn bg-secondary-600 text-white hover:bg-secondary-700 flex-1"
                        onClick={() => {
                          toast.success('Treatment recommendations saved!')
                        }}
                      >
                        Save Results
                      </button>
                      <button
                        type="button"
                        className="btn bg-gray-200 text-gray-800 hover:bg-gray-300"
                        onClick={resetScanner}
                      >
                        Scan Another Image
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>
          
          <div className="bg-gray-50 p-6 border-t border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Tips for Better Results</h3>
            <ul className="text-gray-600 text-sm space-y-2">
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Take clear, well-lit photos of the affected plant parts
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Include both healthy and diseased areas for comparison
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Get close-up shots of any visible symptoms (spots, lesions, etc.)
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                For best results, avoid shadows and use natural daylight
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 card p-6">
          <h2 className="text-xl font-semibold mb-4">How the Disease Scanner Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-3">
                <FiCamera className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-semibold mb-2">Capture</h3>
              <p className="text-sm text-gray-600">
                Take a clear photo of the affected plant part showing symptoms.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-accent-100 flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-accent-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Analyze</h3>
              <p className="text-sm text-gray-600">
                Our AI model analyzes the image to identify common crop diseases.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-success-100 flex items-center justify-center mb-3">
                <FiCheckCircle className="w-8 h-8 text-success-500" />
              </div>
              <h3 className="font-semibold mb-2">Diagnose</h3>
              <p className="text-sm text-gray-600">
                Get detailed results with disease identification and treatment recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
