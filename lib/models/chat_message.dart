import 'package:cloud_firestore/cloud_firestore.dart';

class ChatMessage {
  final String id;
  final String senderId;
  final String senderName;
  final String text;
  final DateTime timestamp;

  ChatMessage({
    required this.id,
    required this.senderId,
    required this.senderName,
    required this.text,
    required this.timestamp,
  });

  /// Factory constructor to create a ChatMessage from a Firestore Document Snapshot
  factory ChatMessage.fromFirestore(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>? ?? {};
    
    // Safely extract timestamp field
    DateTime parsedTimestamp = DateTime.now();
    if (data['timestamp'] != null) {
      if (data['timestamp'] is Timestamp) {
        parsedTimestamp = (data['timestamp'] as Timestamp).toDate();
      } else if (data['timestamp'] is int) {
        parsedTimestamp = DateTime.fromMillisecondsSinceEpoch(data['timestamp']);
      }
    }

    return ChatMessage(
      id: doc.id,
      senderId: data['senderId'] as String? ?? 'unknown_id',
      senderName: data['senderName'] as String? ?? 'Anonymous',
      text: data['text'] as String? ?? '',
      timestamp: parsedTimestamp,
    );
  }

  /// Converts ChatMessage instance into a JSON Map for Firestore insertion
  Map<String, dynamic> toMap() {
    return {
      'senderId': senderId,
      'senderName': senderName,
      'text': text,
      'timestamp': FieldValue.serverTimestamp(),
    };
  }
}
