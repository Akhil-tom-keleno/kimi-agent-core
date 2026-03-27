import { Link } from 'react-router-dom'
import { Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <Link to="/" className="inline-block mb-6">
              <span className="text-3xl font-black text-white tracking-tight">CORE</span>
            </Link>
            <p className="text-gray-600 max-w-sm mb-6">
              The operating partner for holiday home operators. We combine technology, local expertise, and operational excellence to maximize your property's potential.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://linkedin.com/company/core-dxb" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Linkedin className="w-5 h-5 text-gray-600" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">Company</h4>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">Solutions</h4>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li><Link to="/revenue-management" className="hover:text-white transition-colors">Revenue Management</Link></li>
              <li><Link to="/operations" className="hover:text-white transition-colors">Operations</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-800 text-sm">© {new Date().getFullYear()} CORE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
