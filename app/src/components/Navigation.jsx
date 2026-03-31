import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="fixed w-full z-50 top-0 bg-black/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="https://kimi-web-img.moonshot.cn/img/upload/C%20(2)%20copy.png" 
            alt="CORE" 
            className="h-8 md:h-10 w-auto brightness-0 invert"
          />
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          {/* Solutions Dropdown */}
          <div 
            className="relative group"
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <button 
              className="nav-link text-sm font-medium text-gray-400 hover:text-white flex items-center gap-1"
            >
              Solutions
              <ChevronDown className="w-4 h-4" />
            </button>
            <div 
              className={`dropdown-menu absolute top-full left-0 mt-2 w-56 bg-corex-gray border border-white/10 rounded-xl overflow-hidden shadow-2xl ${solutionsOpen ? 'opacity-100 visible translate-y-0' : ''}`}
            >
              <Link 
                to="/revenue-management" 
                className={`block px-4 py-3 text-sm hover:bg-white/10 transition-colors ${isActive('/revenue-management') ? 'text-white border-l-2 border-white' : 'text-gray-400 hover:text-white'}`}
              >
                Revenue Management
              </Link>
              <Link 
                to="/operations" 
                className={`block px-4 py-3 text-sm hover:bg-white/10 transition-colors ${isActive('/operations') ? 'text-white border-l-2 border-white' : 'text-gray-400 hover:text-white'}`}
              >
                Operations
              </Link>
            </div>
          </div>
          
          <Link 
            to="/book-a-call" 
            className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors duration-300"
          >
            Book a call
          </Link>
        </div>

        <button 
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-white/10 absolute w-full">
          <div className="px-6 py-4 space-y-3">
            <p className="text-gray-500 text-xs uppercase tracking-wider">Solutions</p>
            <Link 
              to="/revenue-management" 
              className={`block py-2 pl-4 ${isActive('/revenue-management') ? 'text-white border-l-2 border-white' : 'text-gray-400'}`}
              onClick={() => setIsOpen(false)}
            >
              Revenue Management
            </Link>
            <Link 
              to="/operations" 
              className={`block py-2 pl-4 ${isActive('/operations') ? 'text-white border-l-2 border-white' : 'text-gray-400'}`}
              onClick={() => setIsOpen(false)}
            >
              Operations
            </Link>
            <Link 
              to="/book-a-call" 
              className="block bg-white text-black px-4 py-2 rounded-full font-bold text-center mt-4"
              onClick={() => setIsOpen(false)}
            >
              Book a call
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navigation
