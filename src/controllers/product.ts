/**
 * @interface IProduct
 * @property {number} id - Идентификатор продукта
 * @property {string} color - Цвет продукта
 * @property {string} colorSave - Цвет сохранения продукта
 * @property {string} name - Название продукта
 * @property {string} fullName - Полное название продукта
 * @property {string} review - Отзывы о продукте
 * @property {number} price - Цена продукта
 * @property {number} save - Скидка на продукт
 * @property {number} rating - Рейтинг продукта
 * @property {string} image - Фото продукта
 * @property {string} brand - Бренд продукта
 * @property {string} releaseDate - Дата релиза продукта
 * @property {string} model - Модель продукта
 * @property {boolean} deliveryAvailable - Возможность доставки продукта
 * @property {string} description - Описание продукта
 * @property {CategoryProducts[]} category - Категория продукта
 */
export interface IProduct {
    id: number
    color?: string
    colorSave?: string
    name: string
    fullName?: string
    review?: number
    price?: number
    save?: number
    rating?: number
    image?: string
    brand?: string,
    releaseDate?: string,
    model?: string,
    deliveryAvailable?: boolean,
    description?: string
    category?: CategoryProducts[]
    isNew?: boolean
}
  
export enum CategoryProducts {
    TOP_PICKS = 'TOP_PICKS',
    WATCHES = 'WATCHES',
    EARBUDS = 'EARBUDS',
    WIRELESS = 'WIRELESS',
    WIRED = 'WIRED',
    CARTS_IN_PAGE = 'CARTS_IN_PAGE',
  }
export const MOCK_PRODUCTS: IProduct[] = [
    {
      id: 1,
      color: '$card-blue-5',
      colorSave: '$card-color_green',
      name: 'TWS Apple AirPods Pro',
      fullName: 'Apple AirPods Pro (2nd Generation) - TWS Earbuds with USB-C (White)',
      price: 349.99,
      save: 5,
      rating: 4.6,
      image: '/img/Top_Picks_1.png',
      brand: 'Apple',
      releaseDate: '2023-07-10',
      model: 'AirPods Pro White',
      deliveryAvailable: true,
      description: 'Experience superior sound with Apple AirPods Pro (2nd Generation). These TWS earbuds feature Active Noise Cancellation, Transparency Mode, and Spatial Audio for an immersive listening experience.',
      category: [CategoryProducts.TOP_PICKS, CategoryProducts.WIRED],
      isNew: true
    },
    {
      id: 2,
      color: '$card-blue-4',
      name: 'Sony WF-1000XM4',
      fullName: 'Sony WF-1000XM4 - Wireless Noise Cancelling Earbuds (Black)',
      price: 279.99,
      save: 10,
      rating: 4.7,
      image: '/img/Top_Picks_2.png',
      brand: 'Sony',
      releaseDate: '2022-06-08',
      model: 'WF-1000XM4 Black',
      deliveryAvailable: true,
      description: 'Sony WF-1000XM4 offers industry-leading noise cancellation and exceptional sound quality. Perfect for music lovers and commuters.',
      category: [CategoryProducts.TOP_PICKS, CategoryProducts.EARBUDS],
      isNew: true
    },
    {
      id: 3,
      color: '$card-blue-3',
      name: 'Bose QuietComfort Earbuds II',
      fullName: 'Bose QuietComfort Earbuds II - Wireless Noise Cancelling Earbuds (White)',
      price: 299.99,
      save: 8,
      rating: 4.5,
      image: '/img/Top_Picks_3.png',
      brand: 'Bose',
      releaseDate: '2023-09-15',
      model: 'QuietComfort Earbuds II White',
      deliveryAvailable: true,
      description: 'Bose QuietComfort Earbuds II deliver unmatched noise cancellation and crystal-clear sound. Ideal for travel and daily use.',
      category: [CategoryProducts.TOP_PICKS, CategoryProducts.EARBUDS],
      isNew: true
    },
    {
      id: 4,
      color: '$card-purple',
      name: 'Samsung Galaxy Buds2 Pro',
      fullName: 'Samsung Galaxy Buds2 Pro - Wireless Earbuds with Noise Cancellation (Purple)',
      price: 229.99,
      save: 12,
      rating: 4.4,
      image: '/img/Trending Earphones_1.png',
      brand: 'Samsung',
      releaseDate: '2023-08-20',
      model: 'Galaxy Buds2 Pro Purple',
      deliveryAvailable: true,
      description: 'Samsung Galaxy Buds2 Pro offers superior sound quality and effective noise cancellation. Perfect for Samsung device users.',
      category: [CategoryProducts.EARBUDS, CategoryProducts.WIRED],
      isNew: true
    },
    {
      id: 5,
      color: '$card-mint',
      name: 'Jabra Elite 7 Pro',
      fullName: 'Jabra Elite 7 Pro - True Wireless Earbuds with ANC (Mint)',
      price: 199.99,
      save: 15,
      rating: 4.6,
      image: '/img/Trending Earphones_2.png',
      brand: 'Jabra',
      releaseDate: '2023-07-05',
      model: 'Elite 7 Pro Mint',
      deliveryAvailable: true,
      description: 'Jabra Elite 7 Pro delivers excellent sound quality and advanced noise cancellation. Ideal for calls and music.',
      category: [CategoryProducts.EARBUDS, CategoryProducts.WIRED],
      isNew: true
    },
    {
      id: 6,
      color: '$primary-color',
      name: 'Beats Fit Pro',
      fullName: 'Beats Fit Pro - True Wireless Earbuds with Wingtips (Black)',
      price: 199.99,
      save: 10,
      rating: 4.5,
      image: '/img/Trending Earphones_3.png',
      brand: 'Beats',
      releaseDate: '2023-06-12',
      model: 'Fit Pro Black',
      deliveryAvailable: true,
      description: 'Beats Fit Pro offers secure fit and powerful sound. Perfect for workouts and daily use.',
      category: [CategoryProducts.EARBUDS, CategoryProducts.WIRELESS],
      isNew: true
    },
    {
      id: 7,
      color: '$card-blue-5',
      name: 'Sennheiser Momentum True Wireless 3',
      fullName: 'Sennheiser Momentum True Wireless 3 - Premium Wireless Earbuds (Black)',
      price: 249.99,
      save: 7,
      rating: 4.7,
      image: '/img/Top_Picks_1.png',
      brand: 'Sennheiser',
      releaseDate: '2023-05-25',
      model: 'Momentum True Wireless 3 Black',
      deliveryAvailable: true,
      description: 'Sennheiser Momentum True Wireless 3 delivers exceptional sound quality and advanced features. Perfect for audiophiles.',
      category: [CategoryProducts.WATCHES, CategoryProducts.EARBUDS],
      isNew: true
    },
    {
      id: 8,
      color: '$card-blue-4',
      name: 'Google Pixel Buds Pro',
      fullName: 'Google Pixel Buds Pro - Wireless Earbuds with Noise Cancellation (Charcoal)',
      price: 199.99,
      save: 10,
      rating: 4.6,
      image: '/img/Top_Picks_2.png',
      brand: 'Google',
      releaseDate: '2023-07-28',
      model: 'Pixel Buds Pro Charcoal',
      deliveryAvailable: true,
      description: 'Google Pixel Buds Pro offers great sound quality and effective noise cancellation. Perfect for Android users.',
      category: [CategoryProducts.WATCHES, CategoryProducts.EARBUDS],
      isNew: true
    },
    {
      id: 9,
      color: '$card-blue-3',
      name: 'Anker Soundcore Liberty 3 Pro',
      fullName: 'Anker Soundcore Liberty 3 Pro - True Wireless Earbuds with ANC (White)',
      price: 169.99,
      save: 12,
      rating: 4.5,
      image: '/img/Top_Picks_3.png',
      brand: 'Anker',
      releaseDate: '2023-06-18',
      model: 'Liberty 3 Pro White',
      deliveryAvailable: true,
      description: 'Anker Soundcore Liberty 3 Pro delivers excellent sound quality and advanced noise cancellation. Ideal for daily use.',
      category: [CategoryProducts.WATCHES, CategoryProducts.WIRED],
      isNew: true
    },
    {
      id: 10,
      color: '$card-purple',
      name: 'OnePlus Buds Pro',
      fullName: 'OnePlus Buds Pro - True Wireless Earbuds with Noise Cancellation (Matte Black)',
      price: 149.99,
      save: 15,
      rating: 4.4,
      image: '/img/Trending Earphones_1.png',
      brand: 'OnePlus',
      releaseDate: '2023-07-15',
      model: 'Buds Pro Matte Black',
      deliveryAvailable: true,
      description: 'OnePlus Buds Pro offers great sound quality and effective noise cancellation. Perfect for OnePlus device users.',
      category: [CategoryProducts.WATCHES, CategoryProducts.WIRELESS],
      isNew: true
    },
    {
      id: 11,
      color: '$card-mint',
      name: 'Skullcandy Indy ANC',
      fullName: 'Skullcandy Indy ANC - True Wireless Earbuds with Noise Cancellation (True Black)',
      price: 129.99,
      save: 10,
      rating: 4.3,
      image: '/img/Trending Earphones_2.png',
      brand: 'Skullcandy',
      releaseDate: '2023-06-22',
      model: 'Indy ANC True Black',
      deliveryAvailable: true,
      description: 'Skullcandy Indy ANC delivers good sound quality and effective noise cancellation. Ideal for daily use.',
      category: [CategoryProducts.WATCHES, CategoryProducts.WIRELESS],
      isNew: true
    },
    {
      id: 12,
      color: '$primary-color',
      name: 'JBL Tune 230NC',
      fullName: 'JBL Tune 230NC - True Wireless Earbuds with Noise Cancellation (Black)',
      price: 99.99,
      save: 10,
      rating: 4.2,
      image: '/img/Trending Earphones_3.png',
      brand: 'JBL',
      releaseDate: '2023-07-01',
      model: 'Tune 230NC Black',
      deliveryAvailable: true,
      description: 'JBL Tune 230NC offers good sound quality and effective noise cancellation. Perfect for daily use.',
      category: [CategoryProducts.EARBUDS, CategoryProducts.WIRELESS],
      isNew: true
    },
    {
      id: 13,
      color: '$card-blue-5',
      name: 'Master & Dynamic MW08',
      fullName: 'Master & Dynamic MW08 - True Wireless Earbuds (Black)',
      price: 299.99,
      save: 5,
      rating: 4.6,
      image: '/img/Top_Picks_1.png',
      brand: 'Master & Dynamic',
      releaseDate: '2023-05-10',
      model: 'MW08 Black',
      deliveryAvailable: true,
      description: 'Master & Dynamic MW08 delivers exceptional sound quality and premium build. Perfect for audiophiles.',
      category: [CategoryProducts.TOP_PICKS, CategoryProducts.WATCHES],
      isNew: true
    },
    {
      id: 14,
      color: '$card-blue-4',
      name: 'Bang & Olufsen Beoplay EQ',
      fullName: 'Bang & Olufsen Beoplay EQ - True Wireless Earbuds with ANC (Black Anthracite)',
      price: 399.99,
      save: 5,
      rating: 4.7,
      image: '/img/Top_Picks_2.png',
      brand: 'Bang & Olufsen',
      releaseDate: '2023-06-18',
      model: 'Beoplay EQ Black Anthracite',
      deliveryAvailable: true,
      description: 'Bang & Olufsen Beoplay EQ offers premium sound quality and advanced noise cancellation. Perfect for luxury seekers.',
      category: [CategoryProducts.TOP_PICKS, CategoryProducts.EARBUDS],
      isNew: true
    },
    {
      id: 15,
      color: '$card-blue-3',
      name: 'Technics EAH-AZ60',
      fullName: 'Technics EAH-AZ60 - True Wireless Earbuds with Noise Cancellation (Silver)',
      price: 229.99,
      save: 10,
      rating: 4.5,
      image: '/img/Top_Picks_3.png',
      brand: 'Technics',
      releaseDate: '2023-07-25',
      model: 'EAH-AZ60 Silver',
      deliveryAvailable: true,
      description: 'Technics EAH-AZ60 delivers excellent sound quality and effective noise cancellation. Perfect for music lovers.',
      category: [CategoryProducts.WATCHES, CategoryProducts.EARBUDS],
      isNew: true
    },
  ]
  