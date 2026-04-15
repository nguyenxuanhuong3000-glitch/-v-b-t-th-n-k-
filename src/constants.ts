import { TransportItem } from './types';

export const TRANSPORT_DATA: TransportItem[] = [
  // Road
  { id: 'car', name: 'Ô tô', type: 'road', image: '🚗' },
  { id: 'bus', name: 'Xe buýt', type: 'road', image: '🚌' },
  { id: 'bike', name: 'Xe đạp', type: 'road', image: '🚲' },
  { id: 'motorbike', name: 'Xe máy', type: 'road', image: '🛵' },
  { id: 'truck', name: 'Xe tải', type: 'road', image: '🚚' },
  { id: 'ambulance', name: 'Xe cứu thương', type: 'road', image: '🚑' },
  
  // Air
  { id: 'plane', name: 'Máy bay', type: 'air', image: '✈️' },
  { id: 'helicopter', name: 'Trực thăng', type: 'air', image: '🚁' },
  { id: 'rocket', name: 'Tên lửa', type: 'air', image: '🚀' },
  { id: 'balloon', name: 'Khinh khí cầu', type: 'air', image: '🎈' },
  
  // Water
  { id: 'ship', name: 'Tàu thủy', type: 'water', image: '🚢' },
  { id: 'boat', name: 'Thuyền', type: 'water', image: '⛵' },
  { id: 'speedboat', name: 'Ca nô', type: 'water', image: '🚤' },
  { id: 'submarine', name: 'Tàu ngầm', type: 'water', image: '⚓' },
  
  // Rail
  { id: 'train', name: 'Tàu hỏa', type: 'rail', image: '🚆' },
  { id: 'tram', name: 'Tàu điện', type: 'rail', image: '🚋' },
  { id: 'steam-train', name: 'Tàu hơi nước', type: 'rail', image: '🚂' },
];

export const CATEGORIES = {
  road: { name: 'Đường bộ', icon: '🛣️', color: 'bg-road-gray' },
  air: { name: 'Đường hàng không', icon: '☁️', color: 'bg-sky-400' },
  water: { name: 'Đường thủy', icon: '🌊', color: 'bg-ocean-blue' },
  rail: { name: 'Đường sắt', icon: '🛤️', color: 'bg-orange-600' },
};
