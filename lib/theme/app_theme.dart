import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // Cinematic Dark Palette
  static const Color darkBackground = Color(0xFF0B0C10);
  static const Color darkSurface = Color(0xFF141824);
  static const Color darkCard = Color(0xFF1D2436);
  static const Color darkTextPrimary = Color(0xFFDFE6E9);
  static const Color darkTextSecondary = Color(0xFFB2BEC3);
  static const Color darkReceivedBubble = Color(0xFF222B3E);

  // Sleek Light Palette
  static const Color lightBackground = Color(0xFFF5F6FA);
  static const Color lightSurface = Color(0xFFFFFFFF);
  static const Color lightCard = Color(0xFFEAEAEE);
  static const Color lightTextPrimary = Color(0xFF2D3436);
  static const Color lightTextSecondary = Color(0xFF636E72);
  static const Color lightReceivedBubble = Color(0xFFE1E8ED);

  // Common Accents
  static const Color primaryAccent = Color(0xFF6C5CE7);   // Electric Violet
  static const Color secondaryAccent = Color(0xFF00CEC9); // Neon Cyan
  static const Color sentBubbleColor = Color(0xFF5841D8);

  static ThemeData get darkTheme {
    return ThemeData.dark().copyWith(
      scaffoldBackgroundColor: darkBackground,
      primaryColor: primaryAccent,
      colorScheme: const ColorScheme.dark(
        primary: primaryAccent,
        secondary: secondaryAccent,
        surface: darkSurface,
      ),
      textTheme: GoogleFonts.outfitTextTheme(ThemeData.dark().textTheme).copyWith(
        bodyLarge: GoogleFonts.outfit(color: darkTextPrimary, fontSize: 16),
        bodyMedium: GoogleFonts.outfit(color: darkTextSecondary, fontSize: 14),
        titleLarge: GoogleFonts.outfit(
          color: darkTextPrimary,
          fontSize: 20,
          fontWeight: FontWeight.bold,
        ),
      ),
      appBarTheme: AppBarTheme(
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: true,
        iconTheme: const IconThemeData(color: darkTextPrimary),
        titleTextStyle: GoogleFonts.outfit(
          color: darkTextPrimary,
          fontSize: 18,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }

  static ThemeData get lightTheme {
    return ThemeData.light().copyWith(
      scaffoldBackgroundColor: lightBackground,
      primaryColor: primaryAccent,
      colorScheme: const ColorScheme.light(
        primary: primaryAccent,
        secondary: secondaryAccent,
        surface: lightSurface,
      ),
      textTheme: GoogleFonts.outfitTextTheme(ThemeData.light().textTheme).copyWith(
        bodyLarge: GoogleFonts.outfit(color: lightTextPrimary, fontSize: 16),
        bodyMedium: GoogleFonts.outfit(color: lightTextSecondary, fontSize: 14),
        titleLarge: GoogleFonts.outfit(
          color: lightTextPrimary,
          fontSize: 20,
          fontWeight: FontWeight.bold,
        ),
      ),
      appBarTheme: AppBarTheme(
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: true,
        iconTheme: const IconThemeData(color: lightTextPrimary),
        titleTextStyle: GoogleFonts.outfit(
          color: lightTextPrimary,
          fontSize: 18,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }
}
