import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {Platform} from 'react-native';

const PLATFORM_LOCATION_ALWAYS_PERMISSIONS = {
  ios: PERMISSIONS.IOS.LOCATION_ALWAYS,
};

const REQUEST_PERMISSION_TYPE = {
  location: PLATFORM_LOCATION_ALWAYS_PERMISSIONS,
};

const PERMISSION_TYPE = {
  location: 'location',
};

export default class AppPermission {
  checkPermission = async (type): Promise<boolean> => {
    const permissions = REQUEST_PERMISSION_TYPE[type][Platform.OS];
    if (!permissions) {
      return true;
    }
    try {
      const result = await check(permissions);
      if (result === RESULTS.GRANTED) {
        return true;
      }
      return this.requestPermission();
    } catch (error) {
      return false;
    }
  };

  requestPermission = async (permissions): Promise<boolean> => {
    try {
      const result = await request(permissions);
      return result === RESULTS.GRANTED;
    } catch (error) {
      return false;
    }
  };
}

export {PERMISSION_TYPE}
