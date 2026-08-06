import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../models/chat_message.dart';
import '../theme/app_theme.dart';

class ChatBubble extends StatefulWidget {
  final ChatMessage message;
  final bool isMe;

  const ChatBubble({
    super.key,
    required this.message,
    required this.isMe,
  });

  @override
  State<ChatBubble> createState() => _ChatBubbleState();
}

class _ChatBubbleState extends State<ChatBubble>
    with SingleTickerProviderStateMixin {
  late AnimationController _animController;
  late Animation<double> _fadeAnim;
  late Animation<Offset> _slideAnim;

  @override
  void initState() {
    super.initState();
    _animController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 320),
    );

    _fadeAnim = CurvedAnimation(
      parent: _animController,
      curve: Curves.easeOut,
    );

    _slideAnim = Tween<Offset>(
      begin: widget.isMe ? const Offset(0.15, 0.1) : const Offset(-0.15, 0.1),
      end: Offset.zero,
    ).animate(CurvedAnimation(
      parent: _animController,
      curve: Curves.easeOutCubic,
    ));

    _animController.forward();
  }

  @override
  void dispose() {
    _animController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;
    final formattedTime = DateFormat('h:mm a').format(widget.message.timestamp);
    final avatarChar = widget.message.senderName.isNotEmpty
        ? widget.message.senderName[widget.message.senderName.length - 1]
        : 'U';

    final receivedBubbleBg = isDarkMode
        ? AppTheme.darkReceivedBubble
        : AppTheme.lightReceivedBubble;

    final receivedTextColor = isDarkMode
        ? AppTheme.darkTextPrimary
        : AppTheme.lightTextPrimary;

    return FadeTransition(
      opacity: _fadeAnim,
      child: SlideTransition(
        position: _slideAnim,
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 6.0, horizontal: 16.0),
          child: Row(
            mainAxisAlignment:
                widget.isMe ? MainAxisAlignment.end : MainAxisAlignment.start,
            crossAxisAlignment: CrossAlignment.end,
            children: [
              if (!widget.isMe) ...[
                CircleAvatar(
                  radius: 16,
                  backgroundColor: AppTheme.secondaryAccent.withOpacity(0.25),
                  child: Text(
                    avatarChar,
                    style: const TextStyle(
                      color: AppTheme.secondaryAccent,
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                const SizedBox(width: 8),
              ],

              Flexible(
                child: Container(
                  constraints: BoxConstraints(
                    maxWidth: MediaQuery.of(context).size.width * 0.72,
                  ),
                  padding: const EdgeInsets.symmetric(
                    horizontal: 16.0,
                    vertical: 12.0,
                  ),
                  decoration: BoxDecoration(
                    gradient: widget.isMe
                        ? const LinearGradient(
                            colors: [
                              AppTheme.sentBubbleColor,
                              AppTheme.primaryAccent,
                            ],
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                          )
                        : null,
                    color: widget.isMe ? null : receivedBubbleBg,
                    borderRadius: widget.isMe
                        ? const BorderRadius.only(
                            topLeft: Radius.circular(20),
                            topRight: Radius.circular(20),
                            bottomLeft: Radius.circular(20),
                            bottomRight: Radius.circular(4),
                          )
                        : const BorderRadius.only(
                            topLeft: Radius.circular(20),
                            topRight: Radius.circular(20),
                            bottomLeft: Radius.circular(4),
                            bottomRight: Radius.circular(20),
                          ),
                    boxShadow: [
                      BoxShadow(
                        color: widget.isMe
                            ? AppTheme.primaryAccent.withOpacity(0.25)
                            : (isDarkMode
                                ? Colors.black.withOpacity(0.3)
                                : Colors.black.withOpacity(0.06)),
                        blurRadius: 8,
                        offset: const Offset(0, 4),
                      ),
                    ],
                    border: Border.all(
                      color: widget.isMe
                          ? Colors.white.withOpacity(0.15)
                          : (isDarkMode
                              ? Colors.white.withOpacity(0.06)
                              : Colors.black.withOpacity(0.05)),
                      width: 1.0,
                    ),
                  ),
                  child: Column(
                    crossAxisAlignment: widget.isMe
                        ? CrossAlignment.end
                        : CrossAlignment.start,
                    children: [
                      if (!widget.isMe) ...[
                        Text(
                          widget.message.senderName,
                          style: TextStyle(
                            color: isDarkMode
                                ? AppTheme.secondaryAccent.withOpacity(0.9)
                                : AppTheme.primaryAccent,
                            fontSize: 11,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        const SizedBox(height: 4),
                      ],

                      SelectableText(
                        widget.message.text,
                        style: TextStyle(
                          color: widget.isMe ? Colors.white : receivedTextColor,
                          fontSize: 15,
                          height: 1.35,
                          letterSpacing: 0.2,
                        ),
                      ),

                      const SizedBox(height: 6),

                      Row(
                        mainAxisSize: MainAxisSize.min,
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: [
                          Text(
                            formattedTime,
                            style: TextStyle(
                              color: widget.isMe
                                  ? Colors.white.withOpacity(0.65)
                                  : (isDarkMode
                                      ? Colors.white.withOpacity(0.55)
                                      : Colors.black45),
                              fontSize: 10,
                            ),
                          ),
                          if (widget.isMe) ...[
                            const SizedBox(width: 4),
                            Icon(
                              Icons.done_all_rounded,
                              size: 13,
                              color: Colors.white.withOpacity(0.7),
                            ),
                          ],
                        ],
                      ),
                    ],
                  ),
                ),
              ),

              if (widget.isMe) ...[
                const SizedBox(width: 8),
                CircleAvatar(
                  radius: 16,
                  backgroundColor: AppTheme.primaryAccent.withOpacity(0.25),
                  child: Text(
                    avatarChar,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}
