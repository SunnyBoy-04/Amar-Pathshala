import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import '../models/chat_message.dart';

class ChatService {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  /// Returns real-time message stream for a specific chat room (default: 'global')
  Stream<List<ChatMessage>> getMessagesStream({String roomId = 'global'}) {
    return _firestore
        .collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp', descending: false)
        .snapshots()
        .map((snapshot) {
      return snapshot.docs.map((doc) => ChatMessage.fromFirestore(doc)).toList();
    });
  }

  /// Sends a text message to the designated room in Firestore
  Future<void> sendMessage({
    required String text,
    required User user,
    required String senderName,
    String roomId = 'global',
  }) async {
    final trimmedText = text.trim();
    if (trimmedText.isEmpty) return;

    final messageData = {
      'senderId': user.uid,
      'senderName': senderName,
      'text': trimmedText,
      'timestamp': FieldValue.serverTimestamp(),
    };

    await _firestore
        .collection('rooms')
        .doc(roomId)
        .collection('messages')
        .add(messageData);
  }
}
