import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart'
    show defaultTargetPlatform, kIsWeb, TargetPlatform;

/// Default [FirebaseOptions] for use with the Flutter Firebase plugin.
class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      return web;
    }
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return android;
      case TargetPlatform.iOS:
        return ios;
      case TargetPlatform.macOS:
        return macos;
      case TargetPlatform.windows:
        return windows;
      case TargetPlatform.linux:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for linux - '
          'you can reconfigure this by running the FlutterFire CLI.',
        );
      default:
        throw UnsupportedError(
          'DefaultFirebaseOptions are not supported for this platform.',
        );
    }
  }

  static const FirebaseOptions web = FirebaseOptions(
    apiKey: 'AIzaSyA_Placeholder_ApiKey_For_Web_001',
    appId: '1:100000000000:web:abcdef1234567890',
    messagingSenderId: '100000000000',
    projectId: 'chatting-app-demo',
    authDomain: 'chatting-app-demo.firebaseapp.com',
    storageBucket: 'chatting-app-demo.appspot.com',
  );

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyA_Placeholder_ApiKey_For_Android_001',
    appId: '1:100000000000:android:abcdef1234567890',
    messagingSenderId: '100000000000',
    projectId: 'chatting-app-demo',
    storageBucket: 'chatting-app-demo.appspot.com',
  );

  static const FirebaseOptions ios = FirebaseOptions(
    apiKey: 'AIzaSyA_Placeholder_ApiKey_For_iOS_001',
    appId: '1:100000000000:ios:abcdef1234567890',
    messagingSenderId: '100000000000',
    projectId: 'chatting-app-demo',
    storageBucket: 'chatting-app-demo.appspot.com',
    iosBundleId: 'com.example.chatApp',
  );

  static const FirebaseOptions macos = FirebaseOptions(
    apiKey: 'AIzaSyA_Placeholder_ApiKey_For_macOS_001',
    appId: '1:100000000000:ios:abcdef1234567890',
    messagingSenderId: '100000000000',
    projectId: 'chatting-app-demo',
    storageBucket: 'chatting-app-demo.appspot.com',
    iosBundleId: 'com.example.chatApp',
  );

  static const FirebaseOptions windows = FirebaseOptions(
    apiKey: 'AIzaSyA_Placeholder_ApiKey_For_Windows_001',
    appId: '1:100000000000:web:abcdef1234567890',
    messagingSenderId: '100000000000',
    projectId: 'chatting-app-demo',
    authDomain: 'chatting-app-demo.firebaseapp.com',
    storageBucket: 'chatting-app-demo.appspot.com',
  );
}
