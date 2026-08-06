import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/foundation.dart';

class AuthService {
  final FirebaseAuth _auth = FirebaseAuth.instance;

  /// Stream of Auth State changes
  Stream<User?> get authStateChanges => _auth.authStateChanges();

  /// Gets the current logged-in user
  User? get currentUser => _auth.currentUser;

  /// Performs seamless anonymous sign-in
  Future<User?> signInAnonymously() async {
    try {
      if (_auth.currentUser != null) {
        return _auth.currentUser;
      }
      final UserCredential credential = await _auth.signInAnonymously();
      return credential.user;
    } catch (e) {
      if (kDebugMode) {
        print("Error during anonymous sign in: $e");
      }
      return null;
    }
  }

  /// Generates a clean display handle based on anonymous UID snippet
  String getAnonymousHandle(User? user) {
    if (user == null) return "Guest";
    final uid = user.uid;
    if (uid.length >= 6) {
      final shortUid = uid.substring(uid.length - 4).toUpperCase();
      return "User_$shortUid";
    }
    return "User_${user.uid.substring(0, 4)}";
  }

  /// Signs out the user
  Future<void> signOut() async {
    await _auth.signOut();
  }
}
