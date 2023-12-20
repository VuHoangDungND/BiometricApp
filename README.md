# BiometricApp
* When clone repo, follow there
1. install all libraries :
```
npm install
```
2. connect usb with your android phone and input terminal :
```
npm start
```
3. press -a to connect and see result.

* To deloy app with expo app:
1. install eas-cli
```
npm install -g eas-cli
```
2. login with account expo (if you don't have, make one in https://expo.dev/ )
```
eas login
```
3.Then deloy app :
```
eas build -p android
```
4.Done! Now, you have file .apk in expo web and you can install through there.

### Note
You should change file .env for test in local and file eas.json for deloy in EXPO_PUBLIC_API_URL because it use my api.
