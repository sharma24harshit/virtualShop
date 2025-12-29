const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('../models/Product');
const User = require('../models/User');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/industrybuying';

// Sample products data
const sampleProducts = [
  {
    id: 'prod_1',
    name: 'Classic White T-Shirt',
    brand: 'BrandX',
    Categories: 't_shirt',
    price: '599',
    og_price: '999',
    saving: '40% off',
    rating: 4.5,
    raitng: 4.5,
    image: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500'
    ],
    discription: 'Comfortable and stylish white t-shirt made from premium cotton.',
    show: true
  },
  {
    id: 'prod_8',
    name: 'Classic White T-Shirt',
    brand: 'BrandXY',
    Categories: 't_shirt',
    price: '499',
    og_price: '999',
    saving: '50% off',
    rating: 4.6,
    raitng: 4.7,
    image: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=580?w=500',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=580?w=500',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=580?w=500',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=580?w=500'
    ],
    discription: 'Comfortable and stylish white t-shirt made from premium cotton.',
    show: true
  },
  {
    id: 'prod_9',
    name: 'Classic Black T-Shirt',
    brand: 'BrandXY',
    Categories: 't_shirt',
    price: '699',
    og_price: '999',
    saving: '30% off',
    rating: 4.7,
    raitng: 4.6,
    image: [
      'https://images.unsplash.com/photo-1666358777069-b875ec14ee59?q=80&w=387?w=500',
      'https://images.unsplash.com/photo-1666358777069-b875ec14ee59?q=80&w=387?w=500',
      'https://images.unsplash.com/photo-1666358777069-b875ec14ee59?q=80&w=387?w=500',
      'https://images.unsplash.com/photo-1666358777069-b875ec14ee59?q=80&w=387?w=500'
    ],
    discription: 'Comfortable and stylish black t-shirt made from premium cotton.',
    show: true
  },
  {
    id: 'prod_10',
    name: 'Classic Navy Blue T-Shirt',
    brand: 'BrandXYX',
    Categories: 't_shirt',
    price: '699',
    og_price: '999',
    saving: '30% off',
    rating: 4.7,
    raitng: 4.6,
    image: [
      'https://images.unsplash.com/photo-1666358086313-543412e1cdc2?w=500',
      'https://images.unsplash.com/photo-1666358084111-8c6f4b439c64?w=500',
      'https://images.unsplash.com/photo-1666358086313-543412e1cdc2?w=500',
      'https://images.unsplash.com/photo-1666358084111-8c6f4b439c64?w=500'
    ],
    discription: 'Comfortable and stylish Navy Blue t-shirt made from premium cotton.',
    show: true
  },
  {
    id: 'prod_11',
    name: 'Classic Grey T-Shirt',
    brand: 'BrandXYX',
    Categories: 't_shirt',
    price: '499',
    og_price: '999',
    saving: '50% off',
    rating: 4.5,
    raitng: 4.8,
    image: [
      'https://plus.unsplash.com/premium_photo-1689565524694-88720c282271?w=500',
      'https://plus.unsplash.com/premium_photo-1689565524694-88720c282271?w=500',
      'https://plus.unsplash.com/premium_photo-1689565524694-88720c282271?w=500',
      'https://plus.unsplash.com/premium_photo-1689565524694-88720c282271?w=500'
    ],
    discription: 'Comfortable and stylish Grey t-shirt made from premium cotton.',
    show: true
  },
  {
    id: 'prod_12',
    name: 'Classic Striped T-Shirt',
    brand: 'BrandXYX',
    Categories: 't_shirt',
    price: '499',
    og_price: '999',
    saving: '50% off',
    rating: 4.5,
    raitng: 4.8,
    image: [
      'https://plus.unsplash.com/premium_photo-1727967189534-5b939e378889?w=500',
      'https://plus.unsplash.com/premium_photo-1727967189534-5b939e378889?w=500',
      'https://plus.unsplash.com/premium_photo-1727967189534-5b939e378889?w=500',
      'https://plus.unsplash.com/premium_photo-1727967189534-5b939e378889?w=500'
    ],
    discription: 'Comfortable and stylish Striped t-shirt made from premium cotton.',
    show: true
  },
  {
    id: 'prod_2',
    name: 'Running Shoes',
    brand: 'SportBrand',
    Categories: 'shoes',
    price: '2999',
    og_price: '4999',
    saving: '40% off',
    rating: 4.3,
    raitng: 4.3,
    image: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'
    ],
    discription: 'High-quality running shoes perfect for daily workouts.',
    show: true
  },
  {
    id: 'prod_41',
    name: 'Running Shoes',
    brand: 'SportBrand',
    Categories: 'shoes',
    price: '2999',
    og_price: '4999',
    saving: '40% off',
    rating: 4.3,
    raitng: 4.3,
    image: [
      'https://images.unsplash.com/photo-1588361861040-ac9b1018f6d5?q=80&w=500',
      'https://images.unsplash.com/photo-1588361861040-ac9b1018f6d5?q=80&w=500',
      'https://images.unsplash.com/photo-1588361861040-ac9b1018f6d5?q=80&w=500',
      'https://images.unsplash.com/photo-1588361861040-ac9b1018f6d5?q=80&w=500'
    ],
    discription: 'High-quality running shoes perfect for daily workouts.',
    show: true
  },
  {
    id: 'prod_42',
    name: 'Running Shoes',
    brand: 'SportBrand',
    Categories: 'shoes',
    price: '2999',
    og_price: '4999',
    saving: '40% off',
    rating: 4.3,
    raitng: 4.3,
    image: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=500',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=500',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=500',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=500'
    ],
    discription: 'High-quality running shoes perfect for daily workouts.',
    show: true
  },
  {
    id: 'prod_43',
    name: 'Running Shoes',
    brand: 'SportBrand',
    Categories: 'shoes',
    price: '2999',
    og_price: '4999',
    saving: '40% off',
    rating: 4.3,
    raitng: 4.3,
    image: [
      'https://plus.unsplash.com/premium_photo-1670983855679-05158dc6fb6a?w=500',
      'https://plus.unsplash.com/premium_photo-1670983855679-05158dc6fb6a?w=500',
      'https://plus.unsplash.com/premium_photo-1670983855679-05158dc6fb6a?w=500',
      'https://plus.unsplash.com/premium_photo-1670983855679-05158dc6fb6a?w=500'
    ],
    discription: 'High-quality running shoes perfect for daily workouts.',
    show: true
  },
  {
    id: 'prod_44',
    name: 'Running Shoes',
    brand: 'SportBrand',
    Categories: 'shoes',
    price: '2999',
    og_price: '4999',
    saving: '40% off',
    rating: 4.3,
    raitng: 4.3,
    image: [
      'https://plus.unsplash.com/premium_photo-1673627556491-2114d2480d1f?w=500',
      'https://plus.unsplash.com/premium_photo-1673627556491-2114d2480d1f?w=500',
      'https://plus.unsplash.com/premium_photo-1673627556491-2114d2480d1f?w=500',
      'https://plus.unsplash.com/premium_photo-1673627556491-2114d2480d1f?w=500'
    ],
    discription: 'High-quality running shoes perfect for daily workouts.',
    show: true
  },
  {
    id: 'prod_45',
    name: 'Running Shoes',
    brand: 'SportBrand',
    Categories: 'shoes',
    price: '2999',
    og_price: '4999',
    saving: '40% off',
    rating: 4.3,
    raitng: 4.3,
    image: [
      'https://images.unsplash.com/photo-1562183241-b937e95585b6?q=80&w=500',
      'https://images.unsplash.com/photo-1562183241-b937e95585b6?q=80&w=500',
      'https://images.unsplash.com/photo-1562183241-b937e95585b6?q=80&w=500',
      'https://images.unsplash.com/photo-1562183241-b937e95585b6?q=80&w=500'
    ],
    discription: 'High-quality running shoes perfect for daily workouts.',
    show: true
  },
  {
    id: 'prod_46',
    name: 'Running Shoes',
    brand: 'SportBrand',
    Categories: 'shoes',
    price: '2999',
    og_price: '4999',
    saving: '40% off',
    rating: 4.3,
    raitng: 4.3,
    image: [
      'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=500',
      'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=500',
      'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=500',
      'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=500'
    ],
    discription: 'High-quality running shoes perfect for daily workouts.',
    show: true
  },
  {
    id: 'prod_47',
    name: 'Running Shoes',
    brand: 'SportBrand',
    Categories: 'shoes',
    price: '2999',
    og_price: '4999',
    saving: '40% off',
    rating: 4.3,
    raitng: 4.3,
    image: [
      'https://images.unsplash.com/photo-1621665421571-2d325f9c7c6a?w=500',
      'https://images.unsplash.com/photo-1621665421571-2d325f9c7c6a?w=500',
      'https://images.unsplash.com/photo-1621665421571-2d325f9c7c6a?w=500',
      'https://images.unsplash.com/photo-1621665421571-2d325f9c7c6a?w=500'
    ],
    discription: 'High-quality running shoes perfect for daily workouts.',
    show: true
  },
  {
    id: 'prod_48',
    name: 'Running Shoes',
    brand: 'SportBrand',
    Categories: 'shoes',
    price: '2999',
    og_price: '4999',
    saving: '40% off',
    rating: 4.3,
    raitng: 4.3,
    image: [
      'https://images.unsplash.com/photo-1720019315323-5e2b98a58ba8?w=500',
      'https://images.unsplash.com/photo-1720019315323-5e2b98a58ba8?w=500',
      'https://images.unsplash.com/photo-1720019315323-5e2b98a58ba8?w=500',
      'https://images.unsplash.com/photo-1720019315323-5e2b98a58ba8?w=500'
    ],
    discription: 'High-quality running shoes perfect for daily workouts.',
    show: true
  },
  {
    id: 'prod_49',
    name: 'Running Shoes',
    brand: 'SportBrand',
    Categories: 'shoes',
    price: '2999',
    og_price: '4999',
    saving: '40% off',
    rating: 4.3,
    raitng: 4.3,
    image: [
      'https://images.unsplash.com/photo-1705997696539-a4f44e80d9fb?w=500',
      'https://images.unsplash.com/photo-1705997696539-a4f44e80d9fb?w=500',
      'https://images.unsplash.com/photo-1705997696539-a4f44e80d9fb?w=500',
      'https://images.unsplash.com/photo-1705997696539-a4f44e80d9fb?w=500'
    ],
    discription: 'High-quality running shoes perfect for daily workouts.',
    show: true
  },
  {
    id: 'prod_3',
    name: 'Leather Jacket',
    brand: 'FashionBrand',
    Categories: 'Jacket',
    price: '4999',
    og_price: '7999',
    saving: '37% off',
    rating: 4.7,
    raitng: 4.7,
    image: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500'
    ],
    discription: 'Genuine leather jacket with modern design.',
    show: true
  },
  {
    id: 'prod_13',
    name: 'Black Leather Jacket',
    brand: 'FashionBrand',
    Categories: 'Jacket',
    price: '3999',
    og_price: '5999',
    saving: '37% off',
    rating: 4.7,
    raitng: 4.7,
    image: [
      'https://images.unsplash.com/photo-1675877879221-871aa9f7c314?q=80&w=464',
      'https://images.unsplash.com/photo-1675877879221-871aa9f7c314?q=80&w=464',
      'https://images.unsplash.com/photo-1675877879221-871aa9f7c314?q=80&w=464',
      'https://images.unsplash.com/photo-1675877879221-871aa9f7c314?q=80&w=464'
    ],
    discription: 'Genuine leather black jacket with modern design.',
    show: true
  },
  {
    id: 'prod_14',
    name: 'Brown Blazer',
    brand: 'FashionBrand',
    Categories: 'Jacket',
    price: '4999',
    og_price: '6999',
    saving: '37% off',
    rating: 4.7,
    raitng: 4.7,
    image: [
      'https://images.unsplash.com/photo-1697319501786-8f5dc64326ad?q=80&w=464',
      'https://images.unsplash.com/photo-1697319501786-8f5dc64326ad?q=80&w=464',
      'https://images.unsplash.com/photo-1697319501786-8f5dc64326ad?q=80&w=464',
      'https://images.unsplash.com/photo-1697319501786-8f5dc64326ad?q=80&w=464'
    ],
    discription: 'Genuine brown blazer with modern design.',
    show: true
  },
  {
    id: 'prod_15',
    name: 'Blue Jacket',
    brand: 'FashionBrand',
    Categories: 'Jacket',
    price: '4999',
    og_price: '6999',
    saving: '37% off',
    rating: 4.7,
    raitng: 4.7,
    image: [
      'https://images.unsplash.com/photo-1627138510245-445e78928d1c?w=500',
      'https://images.unsplash.com/photo-1627138510245-445e78928d1c?w=500',
      'https://images.unsplash.com/photo-1627138510245-445e78928d1c?w=500',
      'https://images.unsplash.com/photo-1627138510245-445e78928d1c?w=500'
    ],
    discription: 'Genuine Blue Jacket with modern design.',
    show: true
  },
  {
    id: 'prod_16',
    name: 'Faded Green Jacket',
    brand: 'FashionBrand',
    Categories: 'Jacket',
    price: '4999',
    og_price: '6999',
    saving: '37% off',
    rating: 4.7,
    raitng: 4.7,
    image: [
      'https://images.unsplash.com/photo-1667841027304-3e9b1f6f4e52?w=500',
      'https://images.unsplash.com/photo-1667841027304-3e9b1f6f4e52?w=500',
      'https://images.unsplash.com/photo-1667841027304-3e9b1f6f4e52?w=500',
      'https://images.unsplash.com/photo-1667841027304-3e9b1f6f4e52?w=500'
    ],
    discription: 'Genuine Green Jacket with modern design.',
    show: true
  },
  {
    id: 'prod_16',
    name: 'Faded Brown Jacket',
    brand: 'FashionBrand',
    Categories: 'Jacket',
    price: '4999',
    og_price: '6999',
    saving: '37% off',
    rating: 4.7,
    raitng: 4.7,
    image: [
      'https://plus.unsplash.com/premium_photo-1666298865553-7e4120c11f50?w=500',
      'https://plus.unsplash.com/premium_photo-1666298865553-7e4120c11f50?w=500',
      'https://plus.unsplash.com/premium_photo-1666298865553-7e4120c11f50?w=500',
      'https://plus.unsplash.com/premium_photo-1666298865553-7e4120c11f50?w=500'
    ],
    discription: 'Genuine Brown Jacket with modern design.',
    show: true
  },
  {
    id: 'prod_17',
    name: 'Off White Jacket',
    brand: 'FashionBrand',
    Categories: 'Jacket',
    price: '4999',
    og_price: '6999',
    saving: '37% off',
    rating: 4.7,
    raitng: 4.7,
    image: [
      'https://images.unsplash.com/photo-1643308002103-f5323c0afa01?w=500',
      'https://images.unsplash.com/photo-1643308002103-f5323c0afa01?w=500',
      'https://images.unsplash.com/photo-1643308002103-f5323c0afa01?w=500',
      'https://images.unsplash.com/photo-1643308002103-f5323c0afa01?w=500'
    ],
    discription: 'Genuine Off White Jacket with modern design.',
    show: true
  },
  {
    id: 'prod_4',
    name: 'Travel Backpack',
    brand: 'TravelGear',
    Categories: 'bags',
    price: '1999',
    og_price: '2999',
    saving: '33% off',
    rating: 4.2,
    raitng: 4.2,
    image: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'
    ],
    discription: 'Durable travel backpack with multiple compartments.',
    show: true
  },
  {
    id: 'prod_18',
    name: 'Black Travel Backpack',
    brand: 'TravelGear',
    Categories: 'bags',
    price: '1999',
    og_price: '2999',
    saving: '33% off',
    rating: 4.2,
    raitng: 4.2,
    image: [
      'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=500',
      'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=500',
      'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=500',
      'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=500'
    ],
    discription: 'Durable travel backpack with multiple compartments.',
    show: true
  },
  {
    id: 'prod_19',
    name: 'Black Travel Backpack',
    brand: 'TravelGear',
    Categories: 'bags',
    price: '1999',
    og_price: '2999',
    saving: '33% off',
    rating: 4.2,
    raitng: 4.2,
    image: [
      'https://images.unsplash.com/photo-1622560481979-f5b0174242a0?w=500',
      'https://images.unsplash.com/photo-1622560481979-f5b0174242a0?w=500',
      'https://images.unsplash.com/photo-1622560481979-f5b0174242a0?w=500',
      'https://images.unsplash.com/photo-1622560481979-f5b0174242a0?w=500'
    ],
    discription: 'Durable travel backpack with multiple compartments.',
    show: true
  },
  {
    id: 'prod_20',
    name: 'Brown Travel Backpack',
    brand: 'TravelGear',
    Categories: 'bags',
    price: '1999',
    og_price: '2999',
    saving: '33% off',
    rating: 4.2,
    raitng: 4.2,
    image: [
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500'
    ],
    discription: 'Durable travel Brown backpack with multiple compartments.',
    show: true
  },
  {
    id: 'prod_21',
    name: 'Red Travel Backpack',
    brand: 'TravelGear',
    Categories: 'bags',
    price: '1999',
    og_price: '2999',
    saving: '33% off',
    rating: 4.2,
    raitng: 4.2,
    image: [
      'https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=500',
      'https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=500',
      'https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=500',
      'https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=500'
    ],
    discription: 'Durable travel Red backpack with multiple compartments.',
    show: true
  },
  {
    id: 'prod_22',
    name: 'Brown Travel Backpack',
    brand: 'TravelGear',
    Categories: 'bags',
    price: '1999',
    og_price: '2999',
    saving: '33% off',
    rating: 4.2,
    raitng: 4.2,
    image: [
      'https://images.unsplash.com/photo-1588008690994-53d918a417a0?w=500',
      'https://images.unsplash.com/photo-1588008690994-53d918a417a0?w=500',
      'https://images.unsplash.com/photo-1588008690994-53d918a417a0?w=500',
      'https://images.unsplash.com/photo-1588008690994-53d918a417a0?w=500'
    ],
    discription: 'Durable travel Brown backpack with multiple compartments.',
    show: true
  },
  {
    id: 'prod_5',
    name: 'Smart Watch',
    brand: 'TechWatch',
    Categories: 'watch',
    price: '4999',
    og_price: '7999',
    saving: '37% off',
    rating: 4.6,
    raitng: 4.6,
    image: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
    ],
    discription: 'Feature-rich smartwatch with fitness tracking.',
    show: true
  },
  {
    id: 'prod_23',
    name: 'Smart Watch',
    brand: 'TechWatch',
    Categories: 'watch',
    price: '4999',
    og_price: '7999',
    saving: '37% off',
    rating: 4.6,
    raitng: 4.6,
    image: [
      'https://images.unsplash.com/photo-1619134778706-7015533a6150?w=500',
      'https://images.unsplash.com/photo-1619134778706-7015533a6150?w=500',
      'https://images.unsplash.com/photo-1619134778706-7015533a6150?w=500',
      'https://images.unsplash.com/photo-1619134778706-7015533a6150?w=500'
    ],
    discription: 'Feature-rich smartwatch with fitness tracking.',
    show: true
  },
  {
    id: 'prod_24',
    name: 'Smart Watch',
    brand: 'TechWatch',
    Categories: 'watch',
    price: '4999',
    og_price: '7999',
    saving: '37% off',
    rating: 4.6,
    raitng: 4.6,
    image: [
      'https://images.unsplash.com/photo-1609587312208-cea54be969e7?q=80&w=500',
      'https://images.unsplash.com/photo-1609587312208-cea54be969e7?q=80&w=500',
      'https://images.unsplash.com/photo-1609587312208-cea54be969e7?q=80&w=500',
      'https://images.unsplash.com/photo-1609587312208-cea54be969e7?q=80&w=500'
    ],
    discription: 'Feature-rich smartwatch with fitness tracking.',
    show: true
  },
  {
    id: 'prod_25',
    name: 'Smart Watch',
    brand: 'TechWatch',
    Categories: 'watch',
    price: '4999',
    og_price: '7999',
    saving: '37% off',
    rating: 4.6,
    raitng: 4.6,
    image: [
      'https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?q=80&w=500',
      'https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?q=80&w=500',
      'https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?q=80&w=500',
      'https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?q=80&w=500'
    ],
    discription: 'Feature-rich smartwatch with fitness tracking.',
    show: true
  },
  {
    id: 'prod_26',
    name: 'Smart Watch',
    brand: 'TechWatch',
    Categories: 'watch',
    price: '4999',
    og_price: '7999',
    saving: '37% off',
    rating: 4.6,
    raitng: 4.6,
    image: [
      'https://images.unsplash.com/photo-1663495974376-1b0f63f593b6?w=500',
      'https://images.unsplash.com/photo-1663495974376-1b0f63f593b6?w=500',
      'https://images.unsplash.com/photo-1663495974376-1b0f63f593b6?w=500',
      'https://images.unsplash.com/photo-1663495974376-1b0f63f593b6?w=500'
    ],
    discription: 'Feature-rich smartwatch with fitness tracking.',
    show: true
  },
  {
    id: 'prod_27',
    name: 'Smart Watch',
    brand: 'TechWatch',
    Categories: 'watch',
    price: '4999',
    og_price: '7999',
    saving: '37% off',
    rating: 4.6,
    raitng: 4.6,
    image: [
      'https://images.unsplash.com/photo-1659875976926-6ff8dda5d947?w=500',
      'https://images.unsplash.com/photo-1659875976926-6ff8dda5d947?w=500',
      'https://images.unsplash.com/photo-1659875976926-6ff8dda5d947?w=500',
      'https://images.unsplash.com/photo-1659875976926-6ff8dda5d947?w=500'
    ],
    discription: 'Feature-rich smartwatch with fitness tracking.',
    show: true
  },
  {
    id: 'prod_28',
    name: 'Smart Watch',
    brand: 'TechWatch',
    Categories: 'watch',
    price: '4999',
    og_price: '7999',
    saving: '37% off',
    rating: 4.6,
    raitng: 4.6,
    image: [
      'https://images.unsplash.com/photo-1560790587-ef1b9cc6ef6d?w=500',
      'https://images.unsplash.com/photo-1560790587-ef1b9cc6ef6d?w=500',
      'https://images.unsplash.com/photo-1560790587-ef1b9cc6ef6d?w=500',
      'https://images.unsplash.com/photo-1560790587-ef1b9cc6ef6d?w=500'
    ],
    discription: 'Feature-rich smartwatch with fitness tracking.',
    show: true
  },
  {
    id: 'prod_6',
    name: 'Wireless Headphones',
    brand: 'AudioTech',
    Categories: 'Headphones',
    price: '2999',
    og_price: '4999',
    saving: '40% off',
    rating: 4.4,
    raitng: 4.4,
    image: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'
    ],
    discription: 'Premium wireless headphones with noise cancellation.',
    show: true
  },
  {
    id: 'prod_29',
    name: 'Wireless Headphones',
    brand: 'AudioTech',
    Categories: 'Headphones',
    price: '2999',
    og_price: '4999',
    saving: '40% off',
    rating: 4.4,
    raitng: 4.4,
    image: [
      'https://plus.unsplash.com/premium_photo-1678099940967-73fe30680949?q=80&w=500',
      'https://plus.unsplash.com/premium_photo-1678099940967-73fe30680949?q=80&w=500',
      'https://plus.unsplash.com/premium_photo-1678099940967-73fe30680949?q=80&w=500',
      'https://plus.unsplash.com/premium_photo-1678099940967-73fe30680949?q=80&w=500'
    ],
    discription: 'Premium wireless headphones with noise cancellation.',
    show: true
  },
  {
    id: 'prod_30',
    name: 'Wireless Headphones',
    brand: 'AudioTech',
    Categories: 'Headphones',
    price: '2999',
    og_price: '4999',
    saving: '40% off',
    rating: 4.4,
    raitng: 4.4,
    image: [
      'https://plus.unsplash.com/premium_photo-1679865289918-b21aae5a9559?w=500',
      'https://plus.unsplash.com/premium_photo-1679865289918-b21aae5a9559?w=500',
      'https://plus.unsplash.com/premium_photo-1679865289918-b21aae5a9559?w=500',
      'https://plus.unsplash.com/premium_photo-1679865289918-b21aae5a9559?w=500'
    ],
    discription: 'Premium wireless headphones with noise cancellation.',
    show: true
  },
  {
    id: 'prod_31',
    name: 'Wireless Headphones',
    brand: 'AudioTech',
    Categories: 'Headphones',
    price: '2999',
    og_price: '4999',
    saving: '40% off',
    rating: 4.4,
    raitng: 4.4,
    image: [
      'https://plus.unsplash.com/premium_photo-1680346528789-0ffcc13f5ebf?w=500',
      'https://plus.unsplash.com/premium_photo-1680346528789-0ffcc13f5ebf?w=500',
      'https://plus.unsplash.com/premium_photo-1680346528789-0ffcc13f5ebf?w=500',
      'https://plus.unsplash.com/premium_photo-1680346528789-0ffcc13f5ebf?w=500'
    ],
    discription: 'Premium wireless headphones with noise cancellation.',
    show: true
  },
  {
    id: 'prod_32',
    name: 'Wireless Headphones',
    brand: 'AudioTech',
    Categories: 'Headphones',
    price: '2999',
    og_price: '4999',
    saving: '40% off',
    rating: 4.4,
    raitng: 4.4,
    image: [
      'https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?q=80&w=500',
      'https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?q=80&w=500',
      'https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?q=80&w=500',
      'https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?q=80&w=500'
    ],
    discription: 'Premium wireless headphones with noise cancellation.',
    show: true
  },
  {
    id: 'prod_33',
    name: 'Wireless Headphones',
    brand: 'AudioTech',
    Categories: 'Headphones',
    price: '2999',
    og_price: '4999',
    saving: '40% off',
    rating: 4.4,
    raitng: 4.4,
    image: [
      'https://plus.unsplash.com/premium_photo-1760531786410-85520eb77ad3?w=500',
      'https://plus.unsplash.com/premium_photo-1760531786410-85520eb77ad3?w=500',
      'https://plus.unsplash.com/premium_photo-1760531786410-85520eb77ad3?w=500',
      'https://plus.unsplash.com/premium_photo-1760531786410-85520eb77ad3?w=500'
    ],
    discription: 'Premium wireless headphones with noise cancellation.',
    show: true
  },
  {
    id: 'prod_7',
    name: 'Smartphone Pro',
    brand: 'TechMobile',
    Categories: 'mobile',
    price: '29999',
    og_price: '39999',
    saving: '25% off',
    rating: 4.8,
    raitng: 4.8,
    image: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500'
    ],
    discription: 'Latest smartphone with advanced features and camera.',
    show: true
  },
  {
    id: 'prod_34',
    name: 'Smartphone Pro',
    brand: 'TechMobile',
    Categories: 'mobile',
    price: '29999',
    og_price: '39999',
    saving: '25% off',
    rating: 4.8,
    raitng: 4.8,
    image: [
      'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=500',
      'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=500',
      'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=500',
      'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=500'
    ],
    discription: 'Latest smartphone with advanced features and camera.',
    show: true
  },
  {
    id: 'prod_35',
    name: 'Smartphone Pro',
    brand: 'TechMobile',
    Categories: 'mobile',
    price: '29999',
    og_price: '39999',
    saving: '25% off',
    rating: 4.8,
    raitng: 4.8,
    image: [
      'https://images.unsplash.com/photo-1706372124839-f35d821ccd24?q=80&w=500',
      'https://images.unsplash.com/photo-1706372124839-f35d821ccd24?q=80&w=500',
      'https://images.unsplash.com/photo-1706372124839-f35d821ccd24?q=80&w=500',
      'https://images.unsplash.com/photo-1706372124839-f35d821ccd24?q=80&w=500'
    ],
    discription: 'Latest smartphone with advanced features and camera.',
    show: true
  },
  {
    id: 'prod_36',
    name: 'Smartphone Pro',
    brand: 'TechMobile',
    Categories: 'mobile',
    price: '29999',
    og_price: '39999',
    saving: '25% off',
    rating: 4.8,
    raitng: 4.8,
    image: [
      'https://images.unsplash.com/photo-1718309602365-c692fd1fa48f?w=500',
      'https://images.unsplash.com/photo-1718309602365-c692fd1fa48f?w=500',
      'https://images.unsplash.com/photo-1718309602365-c692fd1fa48f?w=500',
      'https://images.unsplash.com/photo-1718309602365-c692fd1fa48f?w=500'
    ],
    discription: 'Latest smartphone with advanced features and camera.',
    show: true
  },
  {
    id: 'prod_37',
    name: 'Smartphone Pro',
    brand: 'TechMobile',
    Categories: 'mobile',
    price: '29999',
    og_price: '39999',
    saving: '25% off',
    rating: 4.8,
    raitng: 4.8,
    image: [
      'https://images.unsplash.com/photo-1729514358644-4aba4832f2f9?w=500',
      'https://images.unsplash.com/photo-1729514358644-4aba4832f2f9?w=500',
      'https://images.unsplash.com/photo-1729514358644-4aba4832f2f9?w=500',
      'https://images.unsplash.com/photo-1729514358644-4aba4832f2f9?w=500'
    ],
    discription: 'Latest smartphone with advanced features and camera.',
    show: true
  },
  {
    id: 'prod_38',
    name: 'Smartphone Pro',
    brand: 'TechMobile',
    Categories: 'mobile',
    price: '29999',
    og_price: '39999',
    saving: '25% off',
    rating: 4.8,
    raitng: 4.8,
    image: [
      'https://images.unsplash.com/photo-1729368392723-44e8d6b10cca?w=500',
      'https://images.unsplash.com/photo-1729368392723-44e8d6b10cca?w=500',
      'https://images.unsplash.com/photo-1729368392723-44e8d6b10cca?w=500',
      'https://images.unsplash.com/photo-1729368392723-44e8d6b10cca?w=500'
    ],
    discription: 'Latest smartphone with advanced features and camera.',
    show: true
  },
  {
    id: 'prod_39',
    name: 'Smartphone Pro',
    brand: 'TechMobile',
    Categories: 'mobile',
    price: '29999',
    og_price: '39999',
    saving: '25% off',
    rating: 4.8,
    raitng: 4.8,
    image: [
      'https://images.unsplash.com/photo-1633062024794-764e822586eb?w=500',
      'https://images.unsplash.com/photo-1633062024794-764e822586eb?w=500',
      'https://images.unsplash.com/photo-1633062024794-764e822586eb?w=500',
      'https://images.unsplash.com/photo-1633062024794-764e822586eb?w=500'
    ],
    discription: 'Latest smartphone with advanced features and camera.',
    show: true
  },
  {
    id: 'prod_40',
    name: 'Smartphone Pro',
    brand: 'TechMobile',
    Categories: 'mobile',
    price: '29999',
    og_price: '39999',
    saving: '25% off',
    rating: 4.8,
    raitng: 4.8,
    image: [
      'https://images.unsplash.com/photo-1663841092674-da58c50c866f?q=80&w=500',
      'https://images.unsplash.com/photo-1663841092674-da58c50c866f?q=80&w=500',
      'https://images.unsplash.com/photo-1663841092674-da58c50c866f?q=80&w=500',
      'https://images.unsplash.com/photo-1663841092674-da58c50c866f?q=80&w=500'
    ],
    discription: 'Latest smartphone with advanced features and camera.',
    show: true
  },
];

// Sample users data
const sampleUsers = [
  {
    id: 'user_1',
    name: 'John Doe',
    email: 'john@example.com',
    profile: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    active: true,
    cart: [],
    whishList: [],
    orders: []
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log(`Inserted ${sampleProducts.length} products`);

    // Insert sample users
    await User.insertMany(sampleUsers);
    console.log(`Inserted ${sampleUsers.length} users`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

