// Customize this file per client. All vehicle inventory, prices and photos are DEMO placeholders.
export const business = {
  name: 'Prime Bike Rentals',
  subtitle: 'Scooters · Motorcycles · Self Ride',
  location: 'Vijayawada, Andhra Pradesh',
  whatsapp: '91987456321', // Provisional demo number; appears only inside WhatsApp links
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Vijayawada%2C%20Andhra%20Pradesh',
  googleMapsEmbedUrl: 'https://www.google.com/maps?q=Vijayawada%2C%20Andhra%20Pradesh&z=13&output=embed'
};
export const bikes = [
  {
    'id': 'activa6g',
    'name': 'Honda Activa 6G',
    'type': 'Scooter',
    'variant': '110 cc · Standard',
    'seats': 2,
    'fuel': 'Petrol',
    'transmission': 'Automatic',
    'image': 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1100&q=85',
    'description': 'Practical automatic scooter for comfortable city errands and daily travel.',
    'self': {
      'h12': 450,
      'h24': 750
    },
    'km12': 60,
    'km24': 120,
    'extraHour': 60,
    'extraKm': 5
  },
  {
    'id': 'jupiter125',
    'name': 'TVS Jupiter 125',
    'type': 'Scooter',
    'variant': '125 cc · Comfort',
    'seats': 2,
    'fuel': 'Petrol',
    'transmission': 'Automatic',
    'image': 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1100&q=85',
    'description': 'Smooth, easy-to-ride scooter with everyday utility and rider comfort.',
    'self': {
      'h12': 500,
      'h24': 850
    },
    'km12': 60,
    'km24': 120,
    'extraHour': 70,
    'extraKm': 5
  },
  {
    'id': 'access125',
    'name': 'Suzuki Access 125',
    'type': 'Scooter',
    'variant': '125 cc · Premium',
    'seats': 2,
    'fuel': 'Petrol',
    'transmission': 'Automatic',
    'image': 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1100&q=85',
    'description': 'Responsive automatic scooter for urban exploring and short stays.',
    'self': {
      'h12': 550,
      'h24': 900
    },
    'km12': 65,
    'km24': 130,
    'extraHour': 70,
    'extraKm': 6
  },
  {
    'id': 'splendor',
    'name': 'Hero Splendor Plus',
    'type': 'Commuter Bike',
    'variant': '100 cc · Economy',
    'seats': 2,
    'fuel': 'Petrol',
    'transmission': 'Manual',
    'image': 'https://images.unsplash.com/photo-1558980664-10e7170b5b17?auto=format&fit=crop&w=1100&q=85',
    'description': 'Lightweight and economical geared motorcycle for regular commutes.',
    'self': {
      'h12': 450,
      'h24': 750
    },
    'km12': 75,
    'km24': 150,
    'extraHour': 60,
    'extraKm': 5
  },
  {
    'id': 'pulsar',
    'name': 'Bajaj Pulsar NS200',
    'type': 'Street Bike',
    'variant': '200 cc · Sport',
    'seats': 2,
    'fuel': 'Petrol',
    'transmission': 'Manual',
    'image': 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=1100&q=85',
    'description': 'A punchy street motorcycle for riders who prefer a sporty feel.',
    'self': {
      'h12': 900,
      'h24': 1500
    },
    'km12': 80,
    'km24': 160,
    'extraHour': 120,
    'extraKm': 8
  },
  {
    'id': 'classic350',
    'name': 'Royal Enfield Classic 350',
    'type': 'Cruiser Bike',
    'variant': '350 cc · Classic',
    'seats': 2,
    'fuel': 'Petrol',
    'transmission': 'Manual',
    'image': 'https://images.unsplash.com/photo-1558980394-0c6c921b7d65?auto=format&fit=crop&w=1100&q=85',
    'description': 'Classic touring character and relaxed riding position for longer getaways.',
    'self': {
      'h12': 1400,
      'h24': 2400
    },
    'km12': 100,
    'km24': 200,
    'extraHour': 180,
    'extraKm': 10
  },
  {
    'id': 'hunter350',
    'name': 'Royal Enfield Hunter 350',
    'type': 'Street Bike',
    'variant': '350 cc · Roadster',
    'seats': 2,
    'fuel': 'Petrol',
    'transmission': 'Manual',
    'image': 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1100&q=85',
    'description': 'Compact roadster with plenty of character for city and weekend riding.',
    'self': {
      'h12': 1200,
      'h24': 2100
    },
    'km12': 90,
    'km24': 180,
    'extraHour': 150,
    'extraKm': 10
  },
  {
    'id': 'ntorq',
    'name': 'TVS Ntorq 125',
    'type': 'Scooter',
    'variant': '125 cc · Sporty',
    'seats': 2,
    'fuel': 'Petrol',
    'transmission': 'Automatic',
    'image': 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1100&q=85',
    'description': 'Sporty automatic ride for quick trips around town.',
    'self': {
      'h12': 650,
      'h24': 1050
    },
    'km12': 70,
    'km24': 140,
    'extraHour': 80,
    'extraKm': 6
  }
];
export const money = (value) => `₹${Number(value).toLocaleString('en-IN')}`;
export function waLink(message){return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;}
