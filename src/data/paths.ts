import type { Path } from './types';

export const paths: Path[] = [
  // Water & Life
  {
    id: 'sacred-rivers',
    name: 'Journey of Sacred Rivers',
    description: 'Explore the seven sacred rivers (Sapta Sindhavaḥ) that nourished Vedic civilization.',
    color: '#3B82F6', // blue
    locations: ['sarasvati', 'sindhu', 'ganga', 'yamuna', 'rasa'],
    purpose: 'water',
  },
  
  // Ritual & Fire
  {
    id: 'fire-ritual',
    name: 'Path of Sacred Fire (Agni)',
    description: 'Journey through locations where Agni (fire) rituals were central to Vedic worship.',
    color: '#fb923c', // orange
    locations: ['ilaspada', 'bharatas', 'purus', 'kurukshetra'],
    purpose: 'fire',
  },
  {
    id: 'soma-trail',
    name: 'The Soma Trail',
    description: 'Follow the path of Soma from the mountain heights to the ritual ground.',
    color: '#8B5CF6', // purple
    locations: ['mujavat', 'ilaspada'],
    purpose: 'ritual',
  },
  
  // Cosmic & Order
  {
    id: 'cosmic-order',
    name: 'Path of Ṛta (Cosmic Order)',
    description: 'Explore locations associated with Ṛta, the cosmic order and truth.',
    color: '#fde047', // yellow
    locations: ['ushas-east', 'sarasvati', 'kurukshetra', 'bharatas', 'ilaspada'],
    purpose: 'cosmic',
  },
  {
    id: 'dawn-journey',
    name: 'Dawn Across the Vedic World',
    description: 'Experience the journey of Uṣas (Dawn) as she illuminates the sacred geography.',
    color: '#F59E0B', // amber
    locations: ['ushas-east', 'sarasvati', 'sindhu'],
    purpose: 'cosmic',
  },
  
  // Battle & Victory
  {
    id: 'bharata-glory',
    name: 'Glory of the Bharatas',
    description: 'The lands and battles of the mighty Bharata tribe.',
    color: '#EF4444', // red
    locations: ['bharatas', 'purus', 'kurukshetra'],
    purpose: 'battle',
  },
  {
    id: 'battle-grounds',
    name: 'Battlegrounds of the Rig Veda',
    description: 'Sites of great conflicts between Āryan tribes and their foes.',
    color: '#DC2626', // dark red
    locations: ['kurukshetra', 'bharatas', 'purus', 'sindhu'],
    purpose: 'battle',
  },
  
  // Hospitality & Community
  {
    id: 'tribal-lands',
    name: 'Lands of Hospitality',
    description: 'Visit the territories of the great Vedic tribes and their traditions of hospitality.',
    color: '#10b981', // green
    locations: ['bharatas', 'purus', 'kurukshetra', 'sarasvati'],
    purpose: 'hospitality',
  },
];
