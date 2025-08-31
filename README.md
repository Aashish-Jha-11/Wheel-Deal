# 🚗 WheelDeal - Futuristic Car Marketplace

A modern, futuristic car marketplace built with Next.js, featuring a Spinny-inspired design with glassmorphic UI elements and comprehensive car buying features.

## ✨ Features

### 🎨 Design & UI
- **Futuristic Glassmorphic Design**: Clean, minimal interface with blue and purple gradient accents
- **Responsive Layout**: Fully responsive design that works on all devices
- **Smooth Animations**: Hover effects and transitions for enhanced user experience
- **Dark Theme**: Modern dark theme with glassmorphic elements

### 🚗 Car Features
- **Car Catalog**: Browse through a curated collection of premium cars
- **Detailed Car Pages**: Individual pages for each car with comprehensive information
- **360° View**: Simulated 360-degree car view functionality
- **Car Specifications**: Detailed specs including range, acceleration, power, etc.
- **Electric Vehicle Support**: Special highlighting for electric vehicles

### 💰 EMI Calculator
- **Advanced EMI Calculator**: Calculate monthly EMIs with interest rates
- **Loan Breakdown**: Detailed breakdown of principal, interest, and total amount
- **Multiple Duration Options**: Support for months and years
- **Real-time Calculations**: Instant updates as you modify values

### 🔧 Interactive Features
- **Test Drive Booking**: Book test drives for any car
- **Favorites System**: Save cars to your favorites list
- **Compare Cars**: Compare up to 3 cars side by side
- **Share Functionality**: Share car listings with others
- **Search & Filter**: Find cars based on various criteria

### 📱 User Experience
- **Hero Carousel**: Showcase featured cars with smooth transitions
- **Toast Notifications**: User-friendly notifications for actions
- **Loading States**: Proper loading indicators throughout the app
- **Error Handling**: Graceful error handling with user feedback

## 🛠 Tech Stack

- **Framework**: Next.js 15.2.4
- **Language**: JavaScript (JSX)
- **Styling**: Tailwind CSS
- **Icons**: Custom SVG icons
- **State Management**: React hooks (useState, useEffect)
- **Routing**: Next.js App Router

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd WheelDeal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
WheelDeal/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── cars/              # Car listing and detail pages
│   ├── tools/             # Utility pages (EMI Calculator)
│   ├── layout.jsx         # Root layout
│   └── page.jsx           # Homepage
├── components/            # Reusable components
│   ├── car-overview.jsx   # Car grid component
│   ├── emi-calculator.jsx # EMI calculator component
│   ├── footer.jsx         # Footer component
│   ├── hero-carousel.jsx  # Hero carousel
│   ├── navbar.jsx         # Navigation bar
│   ├── test-drive-form.jsx # Test drive booking form
│   └── three-sixty-modal.jsx # 360° view modal
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and data
│   └── cars-data.js       # Car database
├── public/                # Static assets
└── styles/                # Global styles
```

## 🎯 Key Components

### Homepage (`app/page.jsx`)
- Hero section with car carousel
- Featured cars overview
- EMI calculator integration
- Futuristic background effects

### Car Detail Page (`app/cars/[slug]/page.jsx`)
- Comprehensive car information
- Image gallery with 360° view
- Test drive booking form
- Car specifications and features

### EMI Calculator (`app/tools/emi-calculator/page.jsx`)
- Advanced loan calculator
- Real-time EMI calculations
- Loan breakdown analysis
- Helpful tips and guidance

### Car Overview (`components/car-overview.jsx`)
- Grid layout for car cards
- Interactive features (favorites, compare, share)
- Electric vehicle indicators
- Responsive design

## 🎨 Design System

### Colors
- **Primary**: Blue (#00C2FF)
- **Secondary**: Purple (#7A5CFF)
- **Background**: Dark (#0B0F14)
- **Text**: White with opacity variations

### Typography
- Clean, modern font stack
- Responsive text sizing
- Proper hierarchy with font weights

### Components
- Glassmorphic cards with backdrop blur
- Gradient borders and shadows
- Smooth hover transitions
- Consistent spacing and padding

## 🔧 API Endpoints

### Test Drive Booking (`/api/test-drive`)
- **Method**: POST
- **Body**: `{ name, phone, when, carSlug, carName }`
- **Response**: Success/error status

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Design inspired by Spinny's car marketplace
- Icons from various open-source icon libraries
- Car images for demonstration purposes

---

**Note**: This is a demo project showcasing modern web development practices. The car data and images are for demonstration purposes only.
