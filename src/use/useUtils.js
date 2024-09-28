import pinia from '@/plugins/pinia';
import { useMainStore } from '@/stores/useMainStore';
const store = useMainStore(pinia);
import { bus } from '@/plugins/bus';

import { USER_BIKE, USER_LEVEL } from '@/plugins/enums';

export const runProgressTest = async () => {
  for (let i = 0; i <= 100; i += 5) {
    store.progressValue = i;
    if (i === 100) {
      bus.emit('dialog:displaySuccessDialog');
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
};

export const showUserDetailsDialog = () => {
  bus.emit('dialog:displayUserDetailsDialog');
};

let bikeSpeedMap = {
  [USER_BIKE.COMMON]: 10,
  [USER_BIKE.MTB]: 15,
  [USER_BIKE.GRAVEL]: 20,
  [USER_BIKE.ROAD_BIKE]: 30
};

let bikeUserFactor = {
  [USER_LEVEL.BEGINNER]: 1.1,
  [USER_LEVEL.AMATEUR]: 1,
  [USER_LEVEL.PROFESSIONAL]: 0.9
};

export const findSpeed = (bikeType) => {
  return bikeSpeedMap[bikeType] || bikeSpeedMap[USER_BIKE.COMMON];
};

export const findUserFactor = (userLevel) => {
  return bikeUserFactor[userLevel] || bikeUserFactor[USER_LEVEL.AMATEUR];
};
