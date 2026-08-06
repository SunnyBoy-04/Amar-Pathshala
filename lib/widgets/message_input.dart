import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class MessageInput extends StatefulWidget {
  final Function(String text) onSendMessage;

  const MessageInput({
    super.key,
    required this.onSendMessage,
  });

  @override
  State<MessageInput> createState() => _MessageInputState();
}

class _MessageInputState extends State<MessageInput> {
  final TextEditingController _controller = TextEditingController();
  final FocusNode _focusNode = FocusNode();
  bool _isComposing = false;

  void _handleSend() {
    final text = _controller.text.trim();
    if (text.isNotEmpty) {
      widget.onSendMessage(text);
      _controller.clear();
      setState(() {
        _isComposing = false;
      });
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    _focusNode.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;
    final surfaceColor = isDarkMode
        ? AppTheme.darkSurface.withOpacity(0.92)
        : AppTheme.lightSurface.withOpacity(0.95);
    final textColor = isDarkMode ? AppTheme.darkTextPrimary : AppTheme.lightTextPrimary;

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 12.0),
      color: Colors.transparent,
      child: SafeArea(
        top: false,
        child: Container(
          decoration: BoxDecoration(
            color: surfaceColor,
            borderRadius: BorderRadius.circular(30),
            border: Border.all(
              color: _isComposing
                  ? AppTheme.primaryAccent.withOpacity(0.6)
                  : (isDarkMode ? Colors.white.withOpacity(0.08) : Colors.black.withOpacity(0.08)),
              width: 1.2,
            ),
            boxShadow: [
              BoxShadow(
                color: _isComposing
                    ? AppTheme.primaryAccent.withOpacity(0.18)
                    : (isDarkMode ? Colors.black.withOpacity(0.4) : Colors.black.withOpacity(0.08)),
                blurRadius: 16,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 4.0),
          child: Row(
            children: [
              Icon(
                Icons.chat_bubble_outline_rounded,
                color: _isComposing
                    ? AppTheme.secondaryAccent
                    : (isDarkMode ? AppTheme.darkTextSecondary : AppTheme.lightTextSecondary),
                size: 20,
              ),
              const SizedBox(width: 12),

              Expanded(
                child: TextField(
                  controller: _controller,
                  focusNode: _focusNode,
                  keyboardType: TextInputType.multiline,
                  maxLines: 4,
                  minLines: 1,
                  style: TextStyle(
                    color: textColor,
                    fontSize: 15,
                  ),
                  decoration: InputDecoration(
                    hintText: "Type a text message...",
                    hintStyle: TextStyle(
                      color: isDarkMode ? AppTheme.darkTextSecondary : AppTheme.lightTextSecondary,
                      fontSize: 14,
                    ),
                    border: InputBorder.none,
                    isDense: true,
                    contentPadding: const EdgeInsets.symmetric(vertical: 10),
                  ),
                  onChanged: (text) {
                    setState(() {
                      _isComposing = text.trim().isNotEmpty;
                    });
                  },
                  onSubmitted: (_) => _handleSend(),
                ),
              ),

              const SizedBox(width: 8),

              AnimatedContainer(
                duration: const Duration(milliseconds: 200),
                curve: Curves.easeInOut,
                decoration: BoxDecoration(
                  gradient: _isComposing
                      ? const LinearGradient(
                          colors: [
                            AppTheme.primaryAccent,
                            AppTheme.secondaryAccent,
                          ],
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                        )
                      : null,
                  color: _isComposing
                      ? null
                      : (isDarkMode
                          ? Colors.white.withOpacity(0.08)
                          : Colors.black.withOpacity(0.06)),
                  shape: BoxShape.circle,
                  boxShadow: _isComposing
                      ? [
                          BoxShadow(
                            color: AppTheme.primaryAccent.withOpacity(0.4),
                            blurRadius: 10,
                            spreadRadius: 1,
                          )
                        ]
                      : [],
                ),
                child: IconButton(
                  onPressed: _isComposing ? _handleSend : null,
                  icon: const Icon(
                    Icons.send_rounded,
                    size: 18,
                  ),
                  color: _isComposing
                      ? Colors.white
                      : (isDarkMode ? AppTheme.darkTextSecondary : AppTheme.lightTextSecondary),
                  tooltip: 'Send Text Message',
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
