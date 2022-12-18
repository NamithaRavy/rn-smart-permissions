import { NativeModules, Platform } from 'react-native';
import PermissionManager from "./utils/permissionManager"

const LINKING_ERROR =
  `The package 'rn-smart-permissions' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const RnSmartPermissions = NativeModules.RnSmartPermissions
  ? NativeModules.RnSmartPermissions
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export const PERMISSION = {
  BLUETOOTH : "bluetooth",
  LOCATION : "location"
}

export const PERMISSION_RESULT = {
  AUTHORIZED: "authorized",
  UNAVAILABLE: "unavailable",
  DENIED: "denied"
}

export function turnOnBluetooth() {
  return RnSmartPermissions.turnOnBluetooth();
}

export function checkAndRequestPermissions(permission , permissionRationaleDialog , permissionBlockedDialog) {
  return PermissionManager.checkAndRequestPermission(permission, permissionRationaleDialog, permissionBlockedDialog);
}