import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class GeometricBackground extends StatelessWidget {
  final Widget child;
  final bool isDarkMode;

  const GeometricBackground({
    super.key,
    required this.child,
    this.isDarkMode = true,
  });

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        // Base Theme Background
        AnimatedContainer(
          duration: const Duration(milliseconds: 300),
          color: isDarkMode ? AppTheme.darkBackground : AppTheme.lightBackground,
        ),
        // Custom Painter for Geometric Patterns
        Positioned.fill(
          child: CustomPaint(
            painter: GeometricBackgroundPainter(isDarkMode: isDarkMode),
          ),
        ),
        // Child Content Widget
        Positioned.fill(
          child: child,
        ),
      ],
    );
  }
}

class GeometricBackgroundPainter extends CustomPainter {
  final bool isDarkMode;

  GeometricBackgroundPainter({required this.isDarkMode});

  @override
  void paint(Canvas canvas, Size size) {
    final width = size.width;
    final height = size.height;

    // 1. Ambient Radial Orbs
    final Paint glowPaint1 = Paint()
      ..shader = RadialGradient(
        colors: isDarkMode
            ? [
                AppTheme.primaryAccent.withOpacity(0.18),
                AppTheme.primaryAccent.withOpacity(0.05),
                Colors.transparent,
              ]
            : [
                AppTheme.primaryAccent.withOpacity(0.12),
                AppTheme.primaryAccent.withOpacity(0.03),
                Colors.transparent,
              ],
      ).createShader(Rect.fromCircle(
        center: Offset(width * 0.85, height * 0.15),
        radius: width * 0.65,
      ));
    canvas.drawCircle(Offset(width * 0.85, height * 0.15), width * 0.65, glowPaint1);

    final Paint glowPaint2 = Paint()
      ..shader = RadialGradient(
        colors: isDarkMode
            ? [
                AppTheme.secondaryAccent.withOpacity(0.12),
                AppTheme.secondaryAccent.withOpacity(0.03),
                Colors.transparent,
              ]
            : [
                AppTheme.secondaryAccent.withOpacity(0.15),
                AppTheme.secondaryAccent.withOpacity(0.04),
                Colors.transparent,
              ],
      ).createShader(Rect.fromCircle(
        center: Offset(width * 0.15, height * 0.65),
        radius: width * 0.55,
      ));
    canvas.drawCircle(Offset(width * 0.15, height * 0.65), width * 0.55, glowPaint2);

    // 2. Concentric Geometric Circles
    final Paint ringPaint = Paint()
      ..color = isDarkMode
          ? Colors.white.withOpacity(0.035)
          : Colors.black.withOpacity(0.04)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.2;

    final Offset centerTop = Offset(width * 0.85, height * 0.15);
    canvas.drawCircle(centerTop, 90, ringPaint);
    canvas.drawCircle(centerTop, 170, ringPaint);
    canvas.drawCircle(centerTop, 260, ringPaint);

    final Offset centerBottom = Offset(width * 0.1, height * 0.8);
    canvas.drawCircle(centerBottom, 120, ringPaint);
    canvas.drawCircle(centerBottom, 220, ringPaint);

    // 3. Subtle Lines
    final Paint linePaint = Paint()
      ..color = isDarkMode
          ? AppTheme.secondaryAccent.withOpacity(0.04)
          : AppTheme.primaryAccent.withOpacity(0.06)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.0;

    final path = Path();
    path.moveTo(0, height * 0.3);
    path.lineTo(width * 0.4, height * 0.2);
    path.lineTo(width * 0.7, height * 0.45);
    path.lineTo(width, height * 0.35);

    path.moveTo(width * 0.2, height * 0.85);
    path.lineTo(width * 0.6, height * 0.7);
    path.lineTo(width, height * 0.8);

    canvas.drawPath(path, linePaint);

    _drawCrosshair(canvas, Offset(width * 0.4, height * 0.2));
    _drawCrosshair(canvas, Offset(width * 0.7, height * 0.45));
    _drawCrosshair(canvas, Offset(width * 0.6, height * 0.7));
  }

  void _drawCrosshair(Canvas canvas, Offset offset) {
    final Paint dotPaint = Paint()
      ..color = isDarkMode
          ? AppTheme.secondaryAccent.withOpacity(0.25)
          : AppTheme.primaryAccent.withOpacity(0.3)
      ..style = PaintingStyle.fill;
    canvas.drawCircle(offset, 3.0, dotPaint);

    final Paint outlinePaint = Paint()
      ..color = isDarkMode
          ? Colors.white.withOpacity(0.08)
          : Colors.black.withOpacity(0.08)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.0;
    canvas.drawCircle(offset, 7.0, outlinePaint);
  }

  @override
  bool shouldRepaint(covariant GeometricBackgroundPainter oldDelegate) {
    return oldDelegate.isDarkMode != isDarkMode;
  }
}
