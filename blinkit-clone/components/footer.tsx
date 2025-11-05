import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Useful Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Useful Links</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/about" className="hover:text-gray-900">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-gray-900">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gray-900">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/payment-policy" className="hover:text-gray-900">
                  Payment Policy
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-gray-900">
                  Returns Policy
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-gray-900">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:text-gray-900">
                  Security
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-900">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories Part 1 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/category/vegetables-fruits" className="hover:text-gray-900">
                  Vegetables & Fruits
                </Link>
              </li>
              <li>
                <Link href="/category/dairy-breakfast" className="hover:text-gray-900">
                  Dairy & Breakfast
                </Link>
              </li>
              <li>
                <Link href="/category/munchies" className="hover:text-gray-900">
                  Munchies
                </Link>
              </li>
              <li>
                <Link href="/category/cold-drinks-juices" className="hover:text-gray-900">
                  Cold Drinks & Juices
                </Link>
              </li>
              <li>
                <Link href="/category/tea-coffee-health-drinks" className="hover:text-gray-900">
                  Tea, Coffee & Health Drinks
                </Link>
              </li>
              <li>
                <Link href="/category/bakery-biscuits" className="hover:text-gray-900">
                  Bakery & Biscuits
                </Link>
              </li>
              <li>
                <Link href="/category/sweet-tooth" className="hover:text-gray-900">
                  Sweet Tooth
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories Part 2 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">More Categories</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/category/paan-corner" className="hover:text-gray-900">
                  Paan Corner
                </Link>
              </li>
              <li>
                <Link href="/category/breakfast-instant-food" className="hover:text-gray-900">
                  Breakfast & Instant Food
                </Link>
              </li>
              <li>
                <Link href="/category/atta-rice-dal" className="hover:text-gray-900">
                  Atta, Rice & Dal
                </Link>
              </li>
              <li>
                <Link href="/category/masala-oil-more" className="hover:text-gray-900">
                  Masala, Oil & More
                </Link>
              </li>
              <li>
                <Link href="/category/sauces-spreads" className="hover:text-gray-900">
                  Sauces & Spreads
                </Link>
              </li>
              <li>
                <Link href="/category/chicken-meat-fish" className="hover:text-gray-900">
                  Chicken, Meat & Fish
                </Link>
              </li>
              <li>
                <Link href="/category/organic-healthy-living" className="hover:text-gray-900">
                  Organic & Healthy Living
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories Part 3 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Essential Categories</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/category/baby-care" className="hover:text-gray-900">
                  Baby Care
                </Link>
              </li>
              <li>
                <Link href="/category/pharma-wellness" className="hover:text-gray-900">
                  Pharma & Wellness
                </Link>
              </li>
              <li>
                <Link href="/category/cleaning-essentials" className="hover:text-gray-900">
                  Cleaning Essentials
                </Link>
              </li>
              <li>
                <Link href="/category/home-office" className="hover:text-gray-900">
                  Home & Office
                </Link>
              </li>
              <li>
                <Link href="/category/personal-care" className="hover:text-gray-900">
                  Personal Care
                </Link>
              </li>
              <li>
                <Link href="/category/pet-care" className="hover:text-gray-900">
                  Pet Care
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 mb-4 md:mb-0">© 2025 GoBazaar. All Rights Reserved.</p>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Download App</span>
              <div className="flex space-x-2">
                <Link href="#" className="bg-black text-white px-3 py-1 rounded text-xs">
                  App Store
                </Link>
                <Link href="#" className="bg-black text-white px-3 py-1 rounded text-xs">
                  Google Play
                </Link>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4 mt-6">
            <Link
              href="#"
              className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white text-sm"
            >
              f
            </Link>
            <Link
              href="#"
              className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white text-sm"
            >
              X
            </Link>
            <Link
              href="#"
              className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white text-sm"
            >
              @
            </Link>
            <Link
              href="#"
              className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white text-sm"
            >
              in
            </Link>
            <Link
              href="#"
              className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white text-sm"
            >
              ©
            </Link>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4 leading-relaxed">
            "GoBazaar" is owned & managed by "Kaonain Pursuit" (formerly known as Kaonain Pursuit Overseas Exporter). 
            We deliver fresh groceries and daily essentials to your doorstep in just 20 minutes across Pune.
          </p>
        </div>
      </div>
    </footer>
  )
}
