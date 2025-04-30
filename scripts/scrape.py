import requests

url = 'https://steadfast-ecommerce-backend.onrender.com/api/categories'
headers = {
    'Content-Type': 'application/json'
}
categories = [
    {
        "image_url": "https://www-konga-com-res.cloudinary.com/w_400,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product/I/O/198489_1694556552.jpg",
        "name": "Modern Ceiling Lamp",
        "slug": "modern-ceiling-lamp",
        "description": "Elevate your room with this contemporary ceiling lamp designed for modern interiors."
    },
    {
        "image_url": "https://www-konga-com-res.cloudinary.com/w_400,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product/T/L/181529_1735907192.jpg",
        "name": "LED Chandelier",
        "slug": "led-chandelier",
        "description": "Elegant LED chandelier perfect for living rooms and dining spaces."
    },
    {
        "image_url": "https://www-konga-com-res.cloudinary.com/w_400,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product/F/J/125947_1637587768.jpg",
        "name": "Classic Wall Lamp",
        "slug": "classic-wall-lamp",
        "description": "Timeless wall lighting that adds warmth and sophistication to any room."
    },
    {
        "image_url": "https://www-konga-com-res.cloudinary.com/w_400,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product/A/A/178139_1745498528.jpg",
        "name": "Pendant Light",
        "slug": "pendant-light",
        "description": "Minimalist pendant light ideal for kitchen islands or hallways."
    },
    {
        "image_url": "https://www-konga-com-res.cloudinary.com/w_400,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product/Z/I/178139_1745500757.jpg",
        "name": "Double Head Spotlight",
        "slug": "double-head-spotlight",
        "description": "Adjustable spotlight for targeted illumination and aesthetic appeal."
    },
    {
        "image_url": "https://www-konga-com-res.cloudinary.com/w_400,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product/S/D/160792_1744902403.jpg",
        "name": "Luxury Bedside Lamp",
        "slug": "luxury-bedside-lamp",
        "description": "Elegant lamp with soft lighting, perfect for nightstands and bedrooms."
    },
    {
        "image_url": "https://www-konga-com-res.cloudinary.com/w_400,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product/N/H/197817_1744297635.jpg",
        "name": "Motion Sensor Light",
        "slug": "motion-sensor-light",
        "description": "Smart lighting solution with motion detection for security and convenience."
    },
    {
        "image_url": "https://www-konga-com-res.cloudinary.com/w_400,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product/O/V/197817_1744298380.jpg",
        "name": "Vintage Hanging Lamp",
        "slug": "vintage-hanging-lamp",
        "description": "Retro-style hanging lamp bringing character and charm to your space."
    },
    {
        "image_url": "https://www-konga-com-res.cloudinary.com/w_400,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product/P/C/177954_1744891135.jpg",
        "name": "Desk LED Light",
        "slug": "desk-led-light",
        "description": "Energy-efficient desk light with adjustable brightness for working or studying."
    },
    {
        "image_url": "https://www-konga-com-res.cloudinary.com/w_400,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product/Z/Z/124672_1744815979.jpg",
        "name": "Crystal Light Fixture",
        "slug": "crystal-light-fixture",
        "description": "Luxurious crystal light fixture that adds elegance to any room."
    },
    {
        "image_url": "https://www-konga-com-res.cloudinary.com/w_400,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product/P/Z/178139_1744904711.jpg",
        "name": "Minimal Wall Sconce",
        "slug": "minimal-wall-sconce",
        "description": "Sleek wall sconce that blends functionality with minimalist design."
    },
    {
        "image_url": "https://www-konga-com-res.cloudinary.com/w_400,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product/X/I/124672_1744826478.jpg",
        "name": "Gold-Plated Table Lamp",
        "slug": "gold-plated-table-lamp",
        "description": "Decorative gold lamp that adds a touch of luxury to your workspace or bedroom."
    }
]

for category in categories:
    response = requests.post(url, headers=headers, json=category)
    print(f"Status Code for {category['name']}: {response.status_code}")
    print(response.json())