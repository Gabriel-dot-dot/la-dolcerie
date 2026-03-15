import { useState, useEffect, useRef } from 'react'
import { MapPin, Clock, Phone, Instagram, X, ChevronDown, Star, ExternalLink } from 'lucide-react'

// Image URLs - using the captured screenshots from user uploads
const IMAGES = {
  pulpo: 'https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FGgok0svOibgp8sTkCLoxfxDJx0M2%2FCapturadepantalla2026-03-11154522__e00aa788.png?alt=media&token=b0de1215-b16a-4b19-aac8-09ae5c989f8c',
  tuna: 'https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FGgok0svOibgp8sTkCLoxfxDJx0M2%2FCapturadepantalla2026-03-11154549__a45b9965.png?alt=media&token=b2f674c8-47f0-4c74-8e1e-d3bb42c94917',
  benedict: 'https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FGgok0svOibgp8sTkCLoxfxDJx0M2%2FCapturadepantalla2026-03-11154601__104c27e4.png?alt=media&token=38dea0a8-c75b-4b81-950d-d6034417a509',
  pineapple: 'https://firebasestorage.googleapis.com/v0/b/blink-451505.firebasestorage.app/o/user-uploads%2FGgok0svOibgp8sTkCLoxfxDJx0M2%2FCapturadepantalla2026-03-11154536__90b4f1bb.png?alt=media&token=fc82ae3d-0c60-408b-8eb7-1efda80895ba'
}

const WHATSAPP_LINK = 'https://wa.me/18095650333'
const INSTAGRAM_LINK = 'https://www.instagram.com/ladolcerie/'

// Menu data extracted from ZIP
const MENU_DATA = {
  'Appetizers': [
    { name: 'Soup of the Day', price: '$250', description: '' },
    { name: 'Chicken Soup', price: '$280', description: '' },
    { name: 'Caesar Salad', price: '$380', description: '' },
    { name: 'Garden Salad', price: '$300', description: '' },
    { name: 'Burrata Salad', price: '$480', description: '' },
    { name: 'Pulpo al Grill', price: '$680', description: 'con limoncello y papas con perejil' },
    { name: 'Chicken Wings', price: '$380', description: 'bbq o buffalo' },
    { name: 'Calamares', price: '$420', description: 'rebozados' },
    { name: 'Nachos', price: '$380', description: '' },
    { name: 'Aroz Calamares', price: '$520', description: '' },
  ],
  'To Share': [
    { name: 'Carpaccio de Res', price: '$520', description: '' },
    { name: 'Carpaccio de Salmón', price: '$580', description: '' },
    { name: 'Beef Carpaccio', price: '$550', description: '' },
    { name: 'Salmon Carpaccio', price: '$590', description: '' },
  ],
  'Carpaccios': [
    { name: 'Carpaccio de Res', price: '$520', description: '' },
    { name: 'Carpaccio de Salmón', price: '$580', description: '' },
    { name: 'Beef Carpaccio', price: '$550', description: '' },
    { name: 'Salmon Carpaccio', price: '$590', description: '' },
  ],
  'Soups and Crêpes': [
    { name: 'Sopa de Mariscos', price: '$480', description: '' },
    { name: 'Sopa de Pollo', price: '$280', description: '' },
    { name: 'Creppe de Queso', price: '$320', description: '' },
    { name: 'Creppe de Jamón', price: '$350', description: '' },
  ],
  'Sushi Bar': [
    { name: 'Sushi Regular', price: '$680', description: '8 pzs' },
    { name: 'Sushi Salmón', price: '$780', description: '8 pzs' },
    { name: 'Sushi Camarón', price: '$820', description: '8 pzs' },
    { name: 'Sushi Fancy', price: '$980', description: '12 pzs' },
    { name: 'Tataki de Atún', price: '$620', description: '' },
    { name: 'Ceviche de Marinos', price: '$580', description: '' },
    { name: 'Tiradito de Salmón', price: '$520', description: '' },
    { name: 'Tiradito de Pulpo', price: '$550', description: '' },
    { name: 'Spicy Tuna Tartare', price: '$680', description: '' },
    { name: 'Nigiri Salmón', price: '$280', description: '2 pzs' },
    { name: 'Nigiri Camarón', price: '$320', description: '2 pzs' },
    { name: 'Sashimi Salmón', price: '$520', description: '6 pzs' },
    { name: 'Sashimi Atún', price: '$580', description: '6 pzs' },
    { name: 'Roll California', price: '$520', description: '8 pzs' },
    { name: 'Roll Philadelphia', price: '$520', description: '8 pzs' },
    { name: 'Roll Tropical', price: '$520', description: '8 pzs' },
    { name: 'Roll Dragon', price: '$680', description: '8 pzs' },
    { name: 'Roll Spider', price: '$680', description: '8 pzs' },
    { name: 'Roll Samurai', price: '$720', description: '8 pzs' },
    { name: 'Roll La Dolcerie', price: '$980', description: '12 pzs' },
  ],
  'Brick Oven Pizza': [
    { name: 'Pizza Margarita', price: '$420', description: '' },
    { name: 'Pizza Pepperoni', price: '$480', description: '' },
    { name: 'Pizza Hawaiana', price: '$480', description: '' },
    { name: 'Pizza Pollo', price: '$520', description: '' },
    { name: 'Pizza Vegetales', price: '$480', description: '' },
    { name: 'Pizza Jamón y Queso', price: '$520', description: '' },
    { name: 'Pizza 4 Quesos', price: '$580', description: '' },
    { name: 'PizzaBBQ', price: '$580', description: '' },
    { name: 'Pizza Mariscos', price: '$680', description: '' },
  ],
  'Burgers & Sandwiches': [
    { name: 'Classic Burger', price: '$520', description: '' },
    { name: 'Bacon Burger', price: '$580', description: '' },
    { name: 'Cheese Burger', price: '$550', description: '' },
    { name: 'Chicken Burger', price: '$520', description: '' },
    { name: 'Churrasco Burger', price: '$680', description: '' },
    { name: 'Club Sandwich', price: '$520', description: '' },
    { name: 'Panini', price: '$480', description: '' },
  ],
  'Salads & Wraps': [
    { name: 'Ensalada de Pollo', price: '$480', description: '' },
    { name: 'Ensalada de Atún', price: '$520', description: '' },
    { name: 'Caesar Salad con Pollo', price: '$520', description: '' },
    { name: 'Wraps', price: '$450', description: '' },
  ],
  'Pasta': [
    { name: 'Pasta Alfredo', price: '$480', description: '' },
    { name: 'Pasta Bolognesa', price: '$520', description: '' },
    { name: 'Pasta Carbonara', price: '$520', description: '' },
    { name: 'Pasta Mariscos', price: '$620', description: '' },
    { name: 'Penne Vodka', price: '$520', description: '' },
    { name: 'Lasagna', price: '$520', description: '' },
    { name: 'Ravioli', price: '$580', description: '' },
  ],
  'Risotto': [
    { name: 'Risotto Mariscos', price: '$680', description: '' },
    { name: 'Risotto Pollo', price: '$580', description: '' },
    { name: 'Risotto Hongos', price: '$520', description: '' },
  ],
  'Homemade Pasta': [
    { name: 'Pasta Alfredo', price: '$480', description: '' },
    { name: 'Pasta Bolognesa', price: '$520', description: '' },
    { name: 'Pasta Carbonara', price: '$520', description: '' },
    { name: 'Pasta Mariscos', price: '$620', description: '' },
    { name: 'Penne Vodka', price: '$520', description: '' },
    { name: 'Lasagna', price: '$520', description: '' },
    { name: 'Ravioli', price: '$580', description: '' },
  ],
  'Fish Market': [
    { name: 'Filete de Pescado', price: '$720', description: '' },
    { name: 'Salmon a la Plancha', price: '$820', description: '' },
    { name: 'Corvina', price: '$680', description: '' },
    { name: 'Camarones al Ajillo', price: '$720', description: '' },
    { name: 'Paella', price: '$980', description: '' },
  ],
  'Butcher': [
    { name: 'Churrasco de Res', price: '$780', description: '' },
    { name: 'Rib Eye Steak', price: '$920', description: '' },
    { name: 'Pork Ribs', price: '$680', description: '' },
    { name: 'Pollo al Horno', price: '$520', description: '' },
    { name: 'Chuleta de Cerdo', price: '$520', description: '' },
  ],
  'Sides': [
    { name: 'Papas Fritas', price: '$220', description: '' },
    { name: 'Papas Gratinadas', price: '$280', description: '' },
    { name: 'Arroz Blanco', price: '$150', description: '' },
    { name: 'Arroz con Vegetales', price: '$180', description: '' },
    { name: 'Vegetales al Vapor', price: '$220', description: '' },
    { name: 'Maduros', price: '$180', description: '' },
    { name: 'Tajadas', price: '$180', description: '' },
    { name: 'Plátanos', price: '$150', description: '' },
  ],
  'Signature Cocktails': [
    { name: 'Mojito', price: '$350', description: '' },
    { name: 'Caipiriña', price: '$350', description: '' },
    { name: 'Daiquiri', price: '$350', description: '' },
    { name: 'Piña Colada', price: '$380', description: '' },
    { name: 'Frozen', price: '$320', description: '' },
    { name: 'Margarita', price: '$350', description: '' },
    { name: 'Tequila Sunrise', price: '$380', description: '' },
    { name: 'Long Island', price: '$420', description: '' },
    { name: 'Blue Lagoon', price: '$380', description: '' },
    { name: 'Cosmopolitan', price: '$380', description: '' },
    { name: 'Red Wine', price: '$350', description: '' },
    { name: 'White Wine', price: '$350', description: '' },
    { name: 'Champagne', price: '$450', description: '' },
    { name: 'Beer', price: '$250', description: '' },
    { name: 'Soft Drinks', price: '$150', description: '' },
    { name: 'Water', price: '$120', description: '' },
  ],
  'From Our House': [
    { name: 'Flan de Coco', price: '$280', description: '' },
    { name: 'Tres Leches', price: '$320', description: '' },
    { name: 'Pineapple Cobbler', price: '$380', description: '' },
    { name: 'Brownie con Helado', price: '$320', description: '' },
    { name: 'Cheese Cake', price: '$320', description: '' },
    { name: 'Creppe de Frutilla', price: '$280', description: '' },
    { name: 'Chocolate Lava', price: '$380', description: '' },
    { name: 'Café', price: '$180', description: '' },
    { name: 'Capuccino', price: '$220', description: '' },
    { name: 'Chocolate Caliente', price: '$220', description: '' },
    { name: 'Té', price: '$180', description: '' },
  ],
}

const CATEGORIES = Object.keys(MENU_DATA)

const REVIEWS = [
  { name: 'Devanny Lopez', rating: 5, localGuide: true, text: 'The food was absolutely phenomenal and incredibly memorable, especially the tuna tartare and their avocado ceviche. Absolutely recommend!' },
  { name: 'Andrea Walker', rating: 5, localGuide: true, text: 'The food is incredible and very reasonably priced. And the desserts are divine. Very welcoming staff — you will enjoy your evening here.' },
  { name: 'Michelle Mitton', rating: 5, localGuide: true, reviews: 982, text: 'Now our official favorite — what a beautiful little place! The service was excellent and so nicely decorated. The omelette with chorizo and aguacate was delicious. We\'ll be back!' },
  { name: 'Evie Smith', rating: 5, localGuide: false, text: 'I had a wonderful experience. The restaurant is beautifully decorated, has an amazing atmosphere as well as a big terrace outside.' },
  { name: 'Christel Handal', rating: 5, localGuide: true, reviews: 78, text: 'A Charming Restaurant with Delicious Food. La Dolcerie is a lovely restaurant known for its good food and welcoming atmosphere.' },
  { name: 'Victoria Borges', rating: 4, localGuide: true, text: 'The food was great! The atmosphere and presentation make it a special place to dine.' },
  { name: 'Marlyn Guzman Castellon', rating: 4, localGuide: true, reviews: 47, text: 'Beautiful place with many servers available. Desserts are good. The hot chocolate is absolutely delicious.' },
  { name: 'Providencial Property Management', rating: 4, localGuide: true, text: 'A very cozy spot in Santo Domingo with an amazing atmosphere — perfect for drinks and hanging out with friends.' },
]

// Featured dishes - orden: Pulpo, Tuna, Pineapple
const FEATURED_DISHES = [
  { name: 'Pulpo Limoncello', description: 'Del mar a tu mesa — un abrazo de limoncello', price: '$680', image: IMAGES.benedict },
  { name: 'Spicy Tuna Tartare', description: 'Intensidad y frescura en cada capa', price: '$680', image: IMAGES.tuna },
  { name: 'Pineapple Cobbler', description: 'El final perfecto para una noche perfecta', price: '$380', image: IMAGES.pulpo },
]

// Intersection Observer hook
function useIntersectionObserver() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}

// FadeIn component
function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, isVisible } = useIntersectionObserver()
  
  return (
    <div 
      ref={ref} 
      className={`fade-in-up ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  )
}

// Modal Component
function OrderModal({ dish, price, onClose }: { dish: string; price: string; onClose: () => void }) {
  const [formData, setFormData] = useState({ name: '', location: '', phone: '', notes: '' })
  const [isClosing, setIsClosing] = useState(false)

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(onClose, 300)
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.location || !formData.phone) return
    
    const message = `*Nuevo Pedido - La Dolcerie*%0A%0A*Cliente:* ${formData.name}%0A*Teléfono:* ${formData.phone}%0A*Dirección:* ${formData.location}%0A%0A*Plato:* ${dish}%0A*Precio:* ${price}%0A%0A*Notas:* ${formData.notes || 'Sin notas'}`
    window.open(`${WHATSAPP_LINK}?text=${message}`, '_blank')
  }

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
      onClick={handleClose}
    >
      <div 
        className={`relative w-full max-w-md bg-[#1A1A1A] border border-[#7C2D3E] p-8 transition-transform duration-300 ${isClosing ? 'scale-95' : 'scale-100'}`}
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-white hover:text-[#7C2D3E] transition-colors"
        >
          <X size={24} />
        </button>

        <h3 className="font-['Playfair_Display'] text-2xl text-white mb-2">{dish}</h3>
        <p className="text-[#7C2D3E] font-['Montserrat'] font-medium mb-6">{price}</p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nombre completo *"
            className="input-underline w-full"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Ubicación / Dirección de entrega *"
            className="input-underline w-full"
            value={formData.location}
            onChange={e => setFormData({ ...formData, location: e.target.value })}
          />
          <input
            type="tel"
            placeholder="Teléfono *"
            className="input-underline w-full"
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
          />
          <input
            type="text"
            placeholder="Notas adicionales (opcional)"
            className="input-underline w-full"
            value={formData.notes}
            onChange={e => setFormData({ ...formData, notes: e.target.value })}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-8 py-3 bg-[#7C2D3E] text-white hover:bg-white hover:text-[#7C2D3E] transition-all duration-300 font-['Montserrat'] font-medium"
        >
          ENVIAR PEDIDO
        </button>
      </div>
    </div>
  )
}

// Reservation Modal
function ReservationModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({ name: '', phone: '', date: '', time: '', guests: '', occasion: '' })
  const [isClosing, setIsClosing] = useState(false)

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(onClose, 300)
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.phone || !formData.date || !formData.time || !formData.guests) return
    
    const message = `*Nueva Reserva - La Dolcerie*%0A%0A*Nombre:* ${formData.name}%0A*Teléfono:* ${formData.phone}%0A*Fecha:* ${formData.date}%0A*Hora:* ${formData.time}%0A*Personas:* ${formData.guests}%0A%0AOcasión: ${formData.occasion || 'No especificada'}`
    window.open(`${WHATSAPP_LINK}?text=${message}`, '_blank')
  }

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
      onClick={handleClose}
    >
      <div 
        className={`relative w-full max-w-md bg-[#1A1A1A] border border-[#7C2D3E] p-8 transition-transform duration-300 ${isClosing ? 'scale-95' : 'scale-100'}`}
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-white hover:text-[#7C2D3E] transition-colors"
        >
          <X size={24} />
        </button>

        <h3 className="font-['Playfair_Display'] text-2xl text-white mb-2">Reserve su experiencia</h3>
        <p className="text-gray-400 font-['Montserrat'] font-light text-sm mb-6">Complete los datos para reservar su mesa</p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nombre completo *"
            className="input-underline w-full"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="tel"
            placeholder="Teléfono *"
            className="input-underline w-full"
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
          />
          <input
            type="date"
            className="input-underline w-full"
            value={formData.date}
            onChange={e => setFormData({ ...formData, date: e.target.value })}
          />
          <input
            type="time"
            className="input-underline w-full"
            value={formData.time}
            onChange={e => setFormData({ ...formData, time: e.target.value })}
          />
          <input
            type="number"
            placeholder="Número de personas *"
            className="input-underline w-full"
            value={formData.guests}
            onChange={e => setFormData({ ...formData, guests: e.target.value })}
          />
          <input
            type="text"
            placeholder="Ocasión especial (opcional)"
            className="input-underline w-full"
            value={formData.occasion}
            onChange={e => setFormData({ ...formData, occasion: e.target.value })}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-8 py-3 bg-[#7C2D3E] text-white hover:bg-white hover:text-[#7C2D3E] transition-all duration-300 font-['Montserrat'] font-medium"
        >
          CONFIRMAR RESERVA
        </button>
      </div>
    </div>
  )
}

// Main App Component
function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('Appetizers')
  const [showReservation, setShowReservation] = useState(false)
  const [selectedDish, setSelectedDish] = useState<{ name: string; price: string } | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleDishClick = (dish: typeof FEATURED_DISHES[0]) => {
    if (dish.price) {
      setSelectedDish({ name: dish.name, price: dish.price })
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white cursor-burgundy">
      {/* Floating Social Sidebar - Left */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-6">
        <div className="w-px h-20 bg-[#F2EDE4] opacity-30"></div>
        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="social-icon text-[#F2EDE4]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
        <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="social-icon text-[#F2EDE4]">
          <Instagram size={20} />
        </a>
        <p className="vertical-text text-[#F2EDE4] text-xs font-['Montserrat'] font-light tracking-widest">Síguenos</p>
      </div>

      {/* Floating Sidebar - Right */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-6">
        <div className="w-px h-20 bg-[#F2EDE4] opacity-30"></div>
        <p className="vertical-text text-[#F2EDE4] text-xs font-['Montserrat'] font-light">Rafael Augusto Sánchez #20 — Santo Domingo</p>
        <p className="vertical-text text-[#F2EDE4] text-xs font-['Montserrat'] font-light">Reservas: +1 809 565 0333</p>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0A0A0A]/95 backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-['Playfair_Display'] text-xl tracking-widest">La Dolcerie</div>
          <div className="hidden md:flex gap-8 font-['Montserrat'] font-light text-sm">
            <button onClick={() => scrollToSection('philosophy')} className="hover:text-[#7C2D3E] transition-colors">Nosotros</button>
            <button onClick={() => scrollToSection('featured')} className="hover:text-[#7C2D3E] transition-colors">Platos</button>
            <button onClick={() => setMenuOpen(true)} className="hover:text-[#7C2D3E] transition-colors">Menú</button>
            <button onClick={() => setShowReservation(true)} className="hover:text-[#7C2D3E] transition-colors">Reservas</button>
            <button onClick={() => scrollToSection('location')} className="hover:text-[#7C2D3E] transition-colors">Ubicación</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={IMAGES.benedict} 
            alt="Pulpo Limoncello" 
            className="w-full h-full object-cover filter brightness-90 contrast-95 sepia-[0.08]"
          />
          <div className="absolute inset-0 bg-black/65"></div>
        </div>
        
        <div className="relative z-10 text-center px-6">
          <FadeIn>
            <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl lg:text-8xl italic tracking-wider mb-4">
              La Dolcerie
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="font-['Montserrat'] text-sm md:text-base tracking-[0.3em] mb-6">
              BISTRO · EST. 2006
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="w-16 h-px bg-[#7C2D3E] mx-auto mb-6"></div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="font-['Montserrat'] text-xs tracking-[0.4em] mb-12">
              SANTO DOMINGO
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button 
                onClick={() => setShowReservation(true)}
                className="px-8 py-3 border border-[#7C2D3E] text-[#7C2D3E] hover:bg-[#7C2D3E] hover:text-white transition-all duration-300 font-['Montserrat'] font-medium text-sm tracking-wider"
              >
                RESERVAR MESA
              </button>
              <button 
                onClick={() => scrollToSection('featured')}
                className="px-8 py-3 border border-[#7C2D3E] text-[#7C2D3E] hover:bg-[#7C2D3E] hover:text-white transition-all duration-300 font-['Montserrat'] font-medium text-sm tracking-wider"
              >
                VER MENÚ
              </button>
            </div>
          </FadeIn>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator">
          <ChevronDown className="text-white/50" size={24} />
        </div>
      </section>

      {/* Philosophy / About Section */}
      <section id="philosophy" className="py-24 bg-[#F2EDE4] text-[#0A0A0A] grain-overlay relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <blockquote className="font-['Cormorant_Garamond'] italic text-3xl md:text-4xl leading-relaxed mb-8">
                "Diecinueve años creando momentos inolvidables en cada plato"
              </blockquote>
              <p className="font-['Montserrat'] font-light text-[#6B6B6B] leading-relaxed mb-8">
                La Dolcerie es el encuentro entre la cocina europea y la creatividad contemporánea. 
                Desde 2006, un espacio donde cada visita se convierte en un recuerdo.
              </p>
              <div className="diamond-separator">
                <div className="diamond"></div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="relative">
                <img 
                  src={IMAGES.tuna} 
                  alt="Spicy Tuna Tartare" 
                  className="w-full aspect-square object-cover filter brightness-85 contrast-110 sepia-[0.1] saturate-90"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section id="featured" className="py-24 bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl text-center mb-4">
              Platos que no olvidarás
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="font-['Cormorant_Garamond'] italic text-[#7C2D3E] text-center text-xl mb-16">
              Una selección para despertar los sentidos
            </p>
          </FadeIn>

          {/* Layout 3 columnas estilo carrusel */}
          <div className="flex items-center justify-center gap-4 md:gap-8 overflow-x-auto pb-4">
            {FEATURED_DISHES.map((dish, index) => (
              <FadeIn key={dish.name} delay={0.1 * (index + 1)}>
                <div 
                  className="dish-card relative group cursor-pointer overflow-hidden flex-shrink-0 w-56 h-56 md:w-72 md:h-72"
                  onClick={() => handleDishClick(dish)}
                >
                  <img 
                    src={dish.image} 
                    alt={dish.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-85 contrast-110 sepia-[0.1] saturate-90"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/75 transition-all duration-350 flex flex-col items-center justify-center p-4">
                    <h3 className="font-['Playfair_Display'] text-white text-center mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-350 text-lg md:text-xl">
                      {dish.name}
                    </h3>
                    {dish.price && (
                      <p className="text-[#7C2D3E] font-['Montserrat'] font-medium mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-350 text-sm">
                        {dish.price}
                      </p>
                    )}
                    <p className="font-['Cormorant_Garamond'] italic text-gray-300 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-350 text-xs md:text-sm">
                      {dish.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="text-center mt-16">
              <button 
                onClick={() => setMenuOpen(true)}
                className="px-8 py-3 border border-[#7C2D3E] text-[#7C2D3E] hover:bg-[#7C2D3E] hover:text-white transition-all duration-300 font-['Montserrat'] font-medium text-sm tracking-wider"
              >
                VER MENÚ COMPLETO
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Full Menu Section */}
      <section id="fullmenu" className={`py-24 bg-[#0A0A0A] transition-all duration-800 ${menuOpen ? 'opacity-100' : ''}`}>
        <div className={`menu-reveal ${menuOpen ? 'open' : ''}`}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex justify-between items-start mb-12">
              <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl text-white">
                Nuestro Menú
              </h2>
              <button 
                onClick={() => setMenuOpen(false)}
                className="text-white hover:text-[#7C2D3E] transition-colors"
              >
                <X size={32} />
              </button>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-12 sticky top-20 z-10 bg-[#0A0A0A] py-4">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category)
                    document.getElementById(`category-${category}`)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className={`category-tab px-4 py-2 border font-['Montserrat'] font-light text-sm ${activeCategory === category ? 'active' : ''}`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Menu Items */}
            <div className="space-y-16">
              {CATEGORIES.map((category) => (
                <div key={category} id={`category-${category}`}>
                  <h3 className="font-['Playfair_Display'] text-2xl text-white mb-8 border-b border-[#2C2C2C] pb-4">
                    {category}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {MENU_DATA[category as keyof typeof MENU_DATA]?.map((item, idx) => (
                      <div 
                        key={idx}
                        onClick={() => item.price && setSelectedDish({ name: item.name, price: item.price })}
                        className={`menu-item-card p-4 border border-[#2C2C2C] cursor-pointer ${item.price ? 'hover:border-[#7C2D3E]' : ''}`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-['Playfair_Display'] text-lg text-white">{item.name}</h4>
                            {item.description && (
                              <p className="font-['Cormorant_Garamond'] italic text-gray-400 mt-1">{item.description}</p>
                            )}
                          </div>
                          <span className="text-[#7C2D3E] font-['Montserrat'] font-medium ml-4">
                            {item.price}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Order via WhatsApp */}
            <div className="text-center mt-16">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-12 py-4 bg-[#7C2D3E] text-white hover:bg-white hover:text-[#7C2D3E] transition-all duration-300 font-['Montserrat'] font-medium text-lg"
              >
                ORDENAR VÍA WHATSAPP
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto px-6 mb-12">
          <FadeIn>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl text-[#0A0A0A] text-center">
              Experiencias que hablan por sí solas
            </h2>
          </FadeIn>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden">
          <div className="flex reviews-carousel" style={{ width: 'fit-content' }}>
            {[...REVIEWS, ...REVIEWS].map((review, index) => (
              <div 
                key={index} 
                className="w-80 flex-shrink-0 px-4"
              >
                <div className="bg-white border-l-4 border-[#7C2D3E] p-6 shadow-soft h-full">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className={i < review.rating ? 'fill-[#7C2D3E] text-[#7C2D3E]' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <p className="font-['Cormorant_Garamond'] italic text-[#6B6B6B] text-sm mb-4">
                    "{review.text}"
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="font-['Montserrat'] font-medium text-[#0A0A0A] text-sm">{review.name}</p>
                    {review.localGuide && (
                      <span className="text-xs text-[#7C2D3E] font-['Montserrat']">
                        {review.reviews ? `Local Guide · ${review.reviews} reseñas` : 'Local Guide'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <FadeIn>
          <div className="text-center mt-12">
            <a
              href="https://www.google.com/search?q=La+Dolcerie+Santo+Domingo+reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 border border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-all duration-300 font-['Montserrat'] font-medium text-sm"
            >
              VER TODAS LAS RESEÑAS EN GOOGLE
            </a>
          </div>
        </FadeIn>
      </section>

      {/* Location Section */}
      <section id="location" className="py-24 bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Map */}
            <FadeIn>
              <div className="h-[400px] md:h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.264797527498!2d-69.9390584!3d18.4703819!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eaf89e3f69ff34b%3A0xf1c7a2f2993acd8b!2sLa%20Dolcerie!5e0!3m2!1ses!2sdo!4v1742068000000!5m2!1ses!2sdo"
                  width="100%"
                  height="100%"
                  style={{ filter: 'grayscale(100%) saturate(0) contrast(1.1)' }}
                  frameBorder="0"
                  loading="lazy"
                  title="Location Map"
                ></iframe>
              </div>
            </FadeIn>

            {/* Info */}
            <FadeIn delay={0.2}>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <MapPin className="text-white flex-shrink-0" size={24} />
                  <div>
                    <p className="font-['Montserrat'] font-light text-white">Rafael Augusto Sánchez #20</p>
                    <p className="font-['Montserrat'] font-light text-gray-400">Santo Domingo 10109</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="text-[#7C2D3E] flex-shrink-0" size={24} />
                  <div>
                    <p className="font-['Montserrat'] font-light text-white">Horario:</p>
                    <p className="font-['Montserrat'] font-light text-gray-400">Consultar disponibilidad</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="text-white flex-shrink-0" size={24} />
                  <div>
                    <p className="font-['Montserrat'] font-light text-white">+1 809 565 0333</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Instagram className="text-white flex-shrink-0" size={24} />
                  <div>
                    <p className="font-['Montserrat'] font-light text-white">@ladolcerie</p>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=La+Dolcerie+Santo+Domingo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-3 border border-white text-white hover:bg-white hover:text-[#0A0A0A] transition-all duration-300 font-['Montserrat'] font-medium text-sm text-center"
                  >
                    CÓMO LLEGAR
                  </a>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-3 bg-[#7C2D3E] text-white hover:bg-white hover:text-[#7C2D3E] transition-all duration-300 font-['Montserrat'] font-medium text-sm text-center"
                  >
                    ESCRÍBENOS
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section className="py-24 bg-[#0A0A0A] grain-overlay relative">
        <div className="max-w-2xl mx-auto px-6">
          <FadeIn>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl text-white text-center mb-4">
              Reserve su experiencia
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="font-['Cormorant_Garamond'] italic text-gray-400 text-center mb-12">
              Lo esperamos para una velada inolvidable
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="space-y-6">
              <input type="text" placeholder="Nombre completo" className="input-underline w-full" />
              <input type="tel" placeholder="Teléfono" className="input-underline w-full" />
              <div className="grid grid-cols-2 gap-6">
                <input type="date" className="input-underline w-full" />
                <input type="time" className="input-underline w-full" />
              </div>
              <input type="number" placeholder="Número de personas" className="input-underline w-full" />
              <input type="text" placeholder="Ocasión especial (opcional)" className="input-underline w-full" />
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="text-center mt-12">
              <button 
                onClick={() => setShowReservation(true)}
                className="px-12 py-4 bg-[#7C2D3E] text-white hover:bg-white hover:text-[#7C2D3E] transition-all duration-300 font-['Montserrat'] font-medium"
              >
                CONFIRMAR RESERVA
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#0A0A0A] border-t border-[#7C2D3E]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <FadeIn>
            <h3 className="font-['Playfair_Display'] italic text-3xl text-white mb-4">
              La Dolcerie
            </h3>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="font-['Cormorant_Garamond'] italic text-[#FAF7F2] mb-8">
              Bistro · Est. 2006 · Santo Domingo
            </p>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <div className="flex justify-center gap-6 mb-8">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-[#7C2D3E] hover:text-white transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="text-[#7C2D3E] hover:text-white transition-colors">
                <Instagram size={24} />
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-wrap justify-center gap-6 mb-8 font-['Montserrat'] font-light text-sm text-gray-400">
              <button onClick={() => setMenuOpen(true)} className="hover:text-white transition-colors">Menú</button>
              <button onClick={() => setShowReservation(true)} className="hover:text-white transition-colors">Reservas</button>
              <a href="#location" className="hover:text-white transition-colors">Ubicación</a>
              <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="w-24 h-px bg-[#7C2D3E] mx-auto mb-8"></div>
          </FadeIn>

          <FadeIn delay={0.5}>
            <p className="font-['Montserrat'] font-light text-xs text-gray-500">
              © 2026 La Dolcerie Bistro — Santo Domingo, República Dominicana
            </p>
          </FadeIn>
        </div>
      </footer>

      {/* Mobile Footer Socials */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0A0A0A]/95 backdrop-blur-md border-t border-[#2C2C2C] p-4 flex justify-center gap-8 z-40">
        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
        <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="text-white">
          <Instagram size={24} />
        </a>
        <a 
          href="https://www.google.com/maps/dir/?api=1&destination=Rafael+Augusto+Sanchez+20+Santo+Domingo"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white"
        >
          <MapPin size={24} />
        </a>
      </div>

      {/* Order Modal */}
      {selectedDish && (
        <OrderModal 
          dish={selectedDish.name} 
          price={selectedDish.price} 
          onClose={() => setSelectedDish(null)} 
        />
      )}

      {/* Reservation Modal */}
      {showReservation && (
        <ReservationModal onClose={() => setShowReservation(false)} />
      )}
    </div>
  )
}

export default App
