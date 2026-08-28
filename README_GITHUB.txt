KOLLAUDIERUNG V6.9 – GITHUB PAGES
=================================

Diese Dateien direkt in dein GitHub-Repository "kollaudierung-app" hochladen:

index.html
manifest.webmanifest
service-worker.js
icon-180.png
icon-192.png
icon-512.png

Vorhandene Dateien mit gleichem Namen auf GitHub ersetzen.

Danach GitHub Pages kurz neu deployen lassen und die App-Adresse neu laden.


V6.9
----
- Fehler beim Plan/PDF-Speichern ohne aktives Projekt behoben.
- Plan-Upload kann nur noch bei aktivem Projekt geöffnet werden.
- Plan-Dateispeicherung verwendet nun explizit die Projekt-ID.
- Verständliche Fehlermeldung statt "Cannot read properties of null".
