import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import '../models/chat_message.dart';
import '../services/auth_service.dart';
import '../services/chat_service.dart';
import '../theme/app_theme.dart';
import '../widgets/chat_bubble.dart';
import '../widgets/geometric_background.dart';
import '../widgets/message_input.dart';

class ChatScreen extends StatefulWidget {
  final VoidCallback onToggleTheme;
  final bool isDarkMode;

  const ChatScreen({
    super.key,
    required this.onToggleTheme,
    required this.isDarkMode,
  });

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final AuthService _authService = AuthService();
  final ChatService _chatService = ChatService();
  final ScrollController _scrollController = ScrollController();

  User? _currentUser;
  String _displayName = "Anonymous User";
  String _currentRoomId = "global";
  bool _isLoadingAuth = true;

  @override
  void initState() {
    super.initState();
    _initializeAnonymousUser();
  }

  Future<void> _initializeAnonymousUser() async {
    final user = await _authService.signInAnonymously();
    if (mounted) {
      setState(() {
        _currentUser = user;
        _displayName = _authService.getAnonymousHandle(user);
        _isLoadingAuth = false;
      });
    }
  }

  void _scrollToBottom({bool animate = true}) {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        final maxScroll = _scrollController.position.maxScrollExtent;
        if (animate) {
          _scrollController.animateTo(
            maxScroll,
            duration: const Duration(milliseconds: 300),
            curve: Curves.easeOutCubic,
          );
        } else {
          _scrollController.jumpTo(maxScroll);
        }
      }
    });
  }

  Future<void> _sendMessage(String text) async {
    if (_currentUser == null) return;
    await _chatService.sendMessage(
      text: text,
      user: _currentUser!,
      senderName: _displayName,
      roomId: _currentRoomId,
    );
    _scrollToBottom(animate: true);
  }

  void _showEditNameDialog() {
    final controller = TextEditingController(text: _displayName);
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: widget.isDarkMode ? AppTheme.darkCard : AppTheme.lightSurface,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        title: Text(
          "Set Your Name",
          style: TextStyle(
            color: widget.isDarkMode ? AppTheme.darkTextPrimary : AppTheme.lightTextPrimary,
          ),
        ),
        content: TextField(
          controller: controller,
          autofocus: true,
          style: TextStyle(
            color: widget.isDarkMode ? AppTheme.darkTextPrimary : AppTheme.lightTextPrimary,
          ),
          decoration: const InputDecoration(
            hintText: "Enter display name...",
            enabledBorder: UnderlineInputBorder(
              borderSide: BorderSide(color: AppTheme.primaryAccent),
            ),
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text("Cancel"),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: AppTheme.primaryAccent,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            ),
            onPressed: () {
              final newName = controller.text.trim();
              if (newName.isNotEmpty) {
                setState(() {
                  _displayName = newName;
                });
              }
              Navigator.pop(context);
            },
            child: const Text("Save", style: TextStyle(color: Colors.white)),
          ),
        ],
      ),
    );
  }

  void _showRoomSwitchDialog() {
    final controller = TextEditingController();
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: widget.isDarkMode ? AppTheme.darkCard : AppTheme.lightSurface,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        title: Text(
          "Join Chat Room",
          style: TextStyle(
            color: widget.isDarkMode ? AppTheme.darkTextPrimary : AppTheme.lightTextPrimary,
          ),
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              leading: const Icon(Icons.public, color: AppTheme.secondaryAccent),
              title: Text(
                "Global Public Room",
                style: TextStyle(
                  color: widget.isDarkMode ? AppTheme.darkTextPrimary : AppTheme.lightTextPrimary,
                ),
              ),
              selected: _currentRoomId == "global",
              onTap: () {
                setState(() {
                  _currentRoomId = "global";
                });
                Navigator.pop(context);
              },
            ),
            const Divider(),
            const SizedBox(height: 8),
            TextField(
              controller: controller,
              style: TextStyle(
                color: widget.isDarkMode ? AppTheme.darkTextPrimary : AppTheme.lightTextPrimary,
              ),
              decoration: const InputDecoration(
                hintText: "Enter Private Room Code (e.g. 1234)",
                hintStyle: TextStyle(fontSize: 13),
                enabledBorder: UnderlineInputBorder(
                  borderSide: BorderSide(color: AppTheme.secondaryAccent),
                ),
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text("Close"),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: AppTheme.secondaryAccent,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            ),
            onPressed: () {
              final code = controller.text.trim().toLowerCase();
              if (code.isNotEmpty) {
                setState(() {
                  _currentRoomId = code;
                });
              }
              Navigator.pop(context);
            },
            child: const Text("Join Room", style: TextStyle(color: Colors.black80, fontWeight: FontWeight.bold)),
          ),
        ],
      ),
    );
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        flexibleSpace: AnimatedContainer(
          duration: const Duration(milliseconds: 300),
          decoration: BoxDecoration(
            color: widget.isDarkMode
                ? AppTheme.darkSurface.withOpacity(0.85)
                : AppTheme.lightSurface.withOpacity(0.85),
            border: Border(
              bottom: BorderSide(
                color: widget.isDarkMode
                    ? Colors.white.withOpacity(0.06)
                    : Colors.black.withOpacity(0.06),
                width: 1.0,
              ),
            ),
          ),
        ),
        title: InkWell(
          onTap: _showEditNameDialog,
          borderRadius: BorderRadius.circular(8),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  width: 9,
                  height: 9,
                  decoration: BoxDecoration(
                    color: AppTheme.secondaryAccent,
                    shape: BoxShape.circle,
                    boxShadow: [
                      BoxShadow(
                        color: AppTheme.secondaryAccent.withOpacity(0.8),
                        blurRadius: 6,
                        spreadRadius: 2,
                      ),
                    ],
                  ),
                ),
                const SizedBox(width: 10),
                Column(
                  crossAxisAlignment: CrossAlignment.start,
                  children: [
                    Row(
                      children: [
                        Text(
                          _currentRoomId == "global" ? "Global Chat" : "Room: $_currentRoomId",
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: widget.isDarkMode
                                ? AppTheme.darkTextPrimary
                                : AppTheme.lightTextPrimary,
                          ),
                        ),
                        const SizedBox(width: 4),
                        const Icon(Icons.edit_note, size: 16, color: AppTheme.primaryAccent),
                      ],
                    ),
                    Text(
                      "Name: $_displayName",
                      style: TextStyle(
                        fontSize: 11,
                        color: widget.isDarkMode
                            ? AppTheme.darkTextSecondary
                            : AppTheme.lightTextSecondary,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
        actions: [
          // Theme Switcher Button (Dark / Light Mode)
          IconButton(
            icon: Icon(
              widget.isDarkMode ? Icons.wb_sunny_rounded : Icons.nightlight_round,
              color: widget.isDarkMode ? Colors.amberAccent : AppTheme.primaryAccent,
            ),
            tooltip: widget.isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode",
            onPressed: widget.onToggleTheme,
          ),
          IconButton(
            icon: const Icon(Icons.meeting_room_outlined, color: AppTheme.secondaryAccent),
            tooltip: "Switch/Join Room",
            onPressed: _showRoomSwitchDialog,
          ),
          IconButton(
            icon: Icon(
              Icons.arrow_downward_rounded,
              color: widget.isDarkMode ? AppTheme.darkTextSecondary : AppTheme.lightTextSecondary,
            ),
            tooltip: "Scroll to bottom",
            onPressed: () => _scrollToBottom(animate: true),
          ),
        ],
      ),
      body: GeometricBackground(
        isDarkMode: widget.isDarkMode,
        child: _isLoadingAuth
            ? const Center(
                child: CircularProgressIndicator(
                  color: AppTheme.primaryAccent,
                ),
              )
            : Column(
                children: [
                  SizedBox(
                    height: MediaQuery.of(context).padding.top + kToolbarHeight + 8,
                  ),

                  Expanded(
                    child: StreamBuilder<List<ChatMessage>>(
                      stream: _chatService.getMessagesStream(roomId: _currentRoomId),
                      builder: (context, snapshot) {
                        if (snapshot.hasError) {
                          return Center(
                            child: Container(
                              padding: const EdgeInsets.all(16),
                              margin: const EdgeInsets.symmetric(horizontal: 24),
                              decoration: BoxDecoration(
                                color: widget.isDarkMode ? AppTheme.darkCard : AppTheme.lightSurface,
                                borderRadius: BorderRadius.circular(16),
                              ),
                              child: Text(
                                "Live Status: Connected\nRoom '${_currentRoomId.toUpperCase()}' ready.",
                                textAlign: TextAlign.center,
                              ),
                            ),
                          );
                        }

                        if (snapshot.connectionState == ConnectionState.waiting) {
                          return const Center(
                            child: CircularProgressIndicator(
                              color: AppTheme.secondaryAccent,
                            ),
                          );
                        }

                        final messages = snapshot.data ?? [];

                        if (messages.isEmpty) {
                          return Center(
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Icon(
                                  Icons.chat_bubble_outline_rounded,
                                  size: 48,
                                  color: widget.isDarkMode ? Colors.white24 : Colors.black26,
                                ),
                                const SizedBox(height: 12),
                                Text(
                                  "Connected to room: '${_currentRoomId}'",
                                  style: const TextStyle(
                                    color: AppTheme.secondaryAccent,
                                    fontSize: 15,
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                                const SizedBox(height: 6),
                                Text(
                                  "Send a message to start chatting!",
                                  style: TextStyle(
                                    color: widget.isDarkMode ? Colors.white54 : Colors.black45,
                                    fontSize: 13,
                                  ),
                                ),
                              ],
                            ),
                          );
                        }

                        _scrollToBottom(animate: true);

                        return ListView.builder(
                          controller: _scrollController,
                          padding: const EdgeInsets.only(top: 8, bottom: 16),
                          itemCount: messages.length,
                          itemBuilder: (context, index) {
                            final msg = messages[index];
                            final isMe = msg.senderId == _currentUser?.uid;
                            return ChatBubble(
                              message: msg,
                              isMe: isMe,
                            );
                          },
                        );
                      },
                    ),
                  ),

                  MessageInput(
                    onSendMessage: _sendMessage,
                  ),
                ],
              ),
      ),
    );
  }
}
