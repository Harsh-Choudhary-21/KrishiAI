'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiFilter, FiChevronDown, FiChevronUp, FiSearch, FiBarChart2, FiTrendingUp, FiTrendingDown } from 'react-icons/fi'
import toast from 'react-hot-toast'

// Mock crop price data
type CropPrice = {
  id: number
  crop: string
  variety: string
  price: number
  unit: string
  market: string
  state: string
  trend: 'up' | 'down' | 'stable'
  change: number
  lastUpdated: string
}

const MOCK_CROP_PRICES: CropPrice[] = [
  {
    id: 1,
    crop: 'Tomato',
    variety: 'Local',
    price: 1850,
    unit: 'quintal',
    market: 'Azadpur',
    state: 'Delhi',
    trend: 'up',
    change: 5.2,
    lastUpdated: '2023-12-01'
  },
  {
    id: 2,
    crop: 'Tomato',
    variety: 'Hybrid',
    price: 2450,
    unit: 'quintal',
    market: 'Bengaluru',
    state: 'Karnataka',
    trend: 'up',
    change: 8.7,
    lastUpdated: '2023-12-01'
  },
  {
    id: 3,
    crop: 'Potato',
    variety: 'Kufri Jyoti',
    price: 1250,
    unit: 'quintal',
    market: 'Agra',
    state: 'Uttar Pradesh',
    trend: 'down',
    change: -3.1,
    lastUpdated: '2023-12-01'
  },
  {
    id: 4,
    crop: 'Potato',
    variety: 'Kufri Chandramukhi',
    price: 1380,
    unit: 'quintal',
    market: 'Jalandhar',
    state: 'Punjab',
    trend: 'stable',
    change: 0.8,
    lastUpdated: '2023-12-01'
  },
  {
    id: 5,
    crop: 'Wheat',
    variety: 'Sharbati',
    price: 2250,
    unit: 'quintal',
    market: 'Indore',
    state: 'Madhya Pradesh',
    trend: 'up',
    change: 3.5,
    lastUpdated: '2023-12-01'
  },
  {
    id: 6,
    crop: 'Wheat',
    variety: 'Lokwan',
    price: 2180,
    unit: 'quintal',
    market: 'Karnal',
    state: 'Haryana',
    trend: 'up',
    change: 2.1,
    lastUpdated: '2023-12-01'
  },
  {
    id: 7,
    crop: 'Rice',
    variety: 'Basmati',
    price: 3800,
    unit: 'quintal',
    market: 'Karnal',
    state: 'Haryana',
    trend: 'up',
    change: 4.5,
    lastUpdated: '2023-12-01'
  },
  {
    id: 8,
    crop: 'Onion',
    variety: 'Red',
    price: 1650,
    unit: 'quintal',
    market: 'Lasalgaon',
    state: 'Maharashtra',
    trend: 'down',
    change: -6.2,
    lastUpdated: '2023-12-01'
  },
  {
    id: 9,
    crop: 'Tomato',
    variety: 'Local',
    price: 1780,
    unit: 'quintal',
    market: 'Kolkata',
    state: 'West Bengal',
    trend: 'down',
    change: -2.8,
    lastUpdated: '2023-12-01'
  },
  {
    id: 10,
    crop: 'Potato',
    variety: 'Kufri Pukhraj',
    price: 1320,
    unit: 'quintal',
    market: 'Patna',
    state: 'Bihar',
    trend: 'stable',
    change: 0.2,
    lastUpdated: '2023-12-01'
  }
]

// Get unique values for filters
const getUniqueValues = (data: CropPrice[], key: keyof CropPrice) => {
  return Array.from(new Set(data.map(item => item[key])))
}

export default function PricesPage() {
  const [priceData, setPriceData] = useState<CropPrice[]>(MOCK_CROP_PRICES)
  const [filteredData, setFilteredData] = useState<CropPrice[]>(MOCK_CROP_PRICES)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState<{
    key: keyof CropPrice,
    direction: 'ascending' | 'descending'
  } | null>(null)
  const [filters, setFilters] = useState<{
    crop: string[],
    state: string[],
    trend: string[]
  }>({
    crop: [],
    state: [],
    trend: []
  })
  const [showFilters, setShowFilters] = useState(false)
  
  // Unique values for filters
  const uniqueCrops = getUniqueValues(priceData, 'crop') as string[]
  const uniqueStates = getUniqueValues(priceData, 'state') as string[]
  const uniqueTrends = getUniqueValues(priceData, 'trend') as string[]
  
  // Fetch price data
  useEffect(() => {
    const fetchPrices = async () => {
      setLoading(true)
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800))
        setPriceData(MOCK_CROP_PRICES)
        setFilteredData(MOCK_CROP_PRICES)
      } catch (error) {
        console.error('Error fetching price data:', error)
        toast.error('Failed to fetch price data')
      } finally {
        setLoading(false)
      }
    }
    
    fetchPrices()
  }, [])
  
  // Apply filters and search
  useEffect(() => {
    let result = [...priceData]
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(item => 
        item.crop.toLowerCase().includes(term) ||
        item.variety.toLowerCase().includes(term) ||
        item.market.toLowerCase().includes(term) ||
        item.state.toLowerCase().includes(term)
      )
    }
    
    // Apply filters
    if (filters.crop.length > 0) {
      result = result.filter(item => filters.crop.includes(item.crop))
    }
    
    if (filters.state.length > 0) {
      result = result.filter(item => filters.state.includes(item.state))
    }
    
    if (filters.trend.length > 0) {
      result = result.filter(item => filters.trend.includes(item.trend))
    }
    
    // Apply sort
    if (sortConfig) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }
    
    setFilteredData(result)
  }, [priceData, searchTerm, filters, sortConfig])
  
  // Handle sort
  const requestSort = (key: keyof CropPrice) => {
    let direction: 'ascending' | 'descending' = 'ascending'
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    
    setSortConfig({ key, direction })
  }
  
  // Handle filter change
  const handleFilterChange = (type: keyof typeof filters, value: string) => {
    setFilters(prev => {
      const currentFilters = [...prev[type]]
      const index = currentFilters.indexOf(value)
      
      if (index === -1) {
        return { ...prev, [type]: [...currentFilters, value] }
      } else {
        currentFilters.splice(index, 1)
        return { ...prev, [type]: currentFilters }
      }
    })
  }
  
  // Clear all filters
  const clearFilters = () => {
    setFilters({
      crop: [],
      state: [],
      trend: []
    })
    setSearchTerm('')
  }
  
  // Get trend icon
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <FiTrendingUp className="text-success-500" />
      case 'down':
        return <FiTrendingDown className="text-error-500" />
      default:
        return <FiBarChart2 className="text-gray-500" />
    }
  }

  return (
    <div className="container-custom py-8">
      <div className="card overflow-hidden">
        <div className="bg-secondary-700 p-6 text-white">
          <h1 className="text-2xl font-bold">Mandi Prices</h1>
          <p className="text-secondary-100 mt-2">
            Latest crop prices from major agricultural markets across India
          </p>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            {/* Search */}
            <div className="relative w-full md:w-64">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search crops, markets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            {/* Filter button */}
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 btn bg-gray-100 text-gray-700 hover:bg-gray-200 w-full md:w-auto justify-center"
            >
              <FiFilter />
              <span>Filters</span>
              {showFilters ? <FiChevronUp /> : <FiChevronDown />}
            </button>
          </div>
          
          {/* Filters panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 border rounded-lg p-4 bg-gray-50"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Crop filter */}
                <div>
                  <h3 className="font-semibold mb-2">Crop</h3>
                  <div className="space-y-2">
                    {uniqueCrops.map((crop) => (
                      <label key={crop} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.crop.includes(crop)}
                          onChange={() => handleFilterChange('crop', crop)}
                          className="rounded text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm">{crop}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* State filter */}
                <div>
                  <h3 className="font-semibold mb-2">State</h3>
                  <div className="space-y-2">
                    {uniqueStates.map((state) => (
                      <label key={state} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.state.includes(state)}
                          onChange={() => handleFilterChange('state', state)}
                          className="rounded text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm">{state}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Trend filter */}
                <div>
                  <h3 className="font-semibold mb-2">Price Trend</h3>
                  <div className="space-y-2">
                    {uniqueTrends.map((trend) => (
                      <label key={trend} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.trend.includes(trend)}
                          onChange={() => handleFilterChange('trend', trend)}
                          className="rounded text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm capitalize flex items-center">
                          {getTrendIcon(trend)}
                          <span className="ml-1">{trend}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Clear All Filters
                </button>
              </div>
            </motion.div>
          )}
          
          {/* Results summary */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-600">
              Showing {filteredData.length} of {priceData.length} prices
            </p>
            <p className="text-sm text-gray-600">
              Last updated: December 1, 2023
            </p>
          </div>
          
          {/* Prices table */}
          <div className="overflow-x-auto -mx-4 sm:-mx-0">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('crop')}
                  >
                    <div className="flex items-center">
                      Crop
                      {sortConfig?.key === 'crop' && (
                        sortConfig.direction === 'ascending' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('variety')}
                  >
                    <div className="flex items-center">
                      Variety
                      {sortConfig?.key === 'variety' && (
                        sortConfig.direction === 'ascending' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('price')}
                  >
                    <div className="flex items-center">
                      Price (₹)
                      {sortConfig?.key === 'price' && (
                        sortConfig.direction === 'ascending' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('market')}
                  >
                    <div className="flex items-center">
                      Market
                      {sortConfig?.key === 'market' && (
                        sortConfig.direction === 'ascending' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('state')}
                  >
                    <div className="flex items-center">
                      State
                      {sortConfig?.key === 'state' && (
                        sortConfig.direction === 'ascending' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('trend')}
                  >
                    <div className="flex items-center">
                      Trend
                      {sortConfig?.key === 'trend' && (
                        sortConfig.direction === 'ascending' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  // Loading skeleton
                  [...Array(5)].map((_, index) => (
                    <tr key={index}>
                      {[...Array(6)].map((_, cellIndex) => (
                        <td key={cellIndex} className="px-4 py-4">
                          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                        </td>
                      ))}
                    </tr>
                  ))
                ) : filteredData.length > 0 ? (
                  // Price data
                  filteredData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.crop}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                        {item.variety}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold">
                        ₹{item.price}/{item.unit}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                        {item.market}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                        {item.state}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center">
                          {getTrendIcon(item.trend)}
                          <span 
                            className={`ml-1 ${
                              item.trend === 'up' 
                                ? 'text-success-500' 
                                : item.trend === 'down' 
                                  ? 'text-error-500' 
                                  : 'text-gray-500'
                            }`}
                          >
                            {item.change > 0 ? '+' : ''}{item.change}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  // No results
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-sm text-gray-500">
                      No matching price data found. Try adjusting your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Price trends and insights */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Price Trends</h2>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-medium mb-2">Tomato Prices Rising</h3>
              <p className="text-sm text-gray-600">
                Tomato prices have seen a significant rise of 8.7% in the past week due to unseasonal rainfall affecting crops in major producing regions.
              </p>
            </div>
            <div className="border-b pb-4">
              <h3 className="font-medium mb-2">Onion Price Decline</h3>
              <p className="text-sm text-gray-600">
                Onion prices have fallen by 6.2% as new harvest arrives in markets, providing relief to consumers after months of high prices.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Wheat Remains Strong</h3>
              <p className="text-sm text-gray-600">
                Wheat prices continue to show strength with a 3.5% increase, supported by government procurement and steady export demand.
              </p>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Market Insights</h2>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-medium mb-2">When to Sell Your Produce</h3>
              <p className="text-sm text-gray-600">
                For tomatoes, prices typically peak in May-June and November-December. Potatoes see better rates in October-November, while wheat prices are generally highest just after harvest in April-May.
              </p>
            </div>
            <div className="border-b pb-4">
              <h3 className="font-medium mb-2">Best Markets by Region</h3>
              <p className="text-sm text-gray-600">
                North India: Azadpur (Delhi) for vegetables, Karnal (Haryana) for grains
                South India: Bengaluru (Karnataka) offers competitive rates for most produce
                West India: Lasalgaon (Maharashtra) for onions, Vashi (Mumbai) for vegetables
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Price Forecasts</h3>
              <p className="text-sm text-gray-600">
                Experts predict stable to slightly higher prices for most crops in the coming weeks, with the exception of seasonal vegetables which may see price moderation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}