KOLLAUDIERUNG V6.12 – GITHUB PAGES
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


V6.12
----
- Fehler beim Plan/PDF-Speichern ohne aktives Projekt behoben.
- Plan-Upload kann nur noch bei aktivem Projekt geöffnet werden.
- Plan-Dateispeicherung verwendet nun explizit die Projekt-ID.
- Verständliche Fehlermeldung statt "Cannot read properties of null".


V6.12
-----
- Eine Positionsbeschreibung kann mehrere LV-Positionen enthalten.
- LV-Position + Rechenansatz kann mehrfach vorgemerkt werden.
- Beim Speichern entstehen einzelne, eindeutig abrechenbare IDs mit gemeinsamer Beschreibung.
- Die aktuelle noch ausgefüllte LV-Position wird beim Speichern automatisch mitgenommen.
- Planmarkierung kann nachträglich über „Plan bearbeiten“ ergänzt/geändert werden.


V6.12
-----
- Alter Testserver-Hinweis oben entfernt.


V6.12
-----
- Eine Erfassung hat genau eine sichtbare ID, auch mit mehreren LV-Positionen.
- Beispiel: ID 1 "Dose + Kabel" kann Dose, Kabel und Anschluss enthalten.
- Beim Bearbeiten einer ID werden alle zugehörigen LV-Positionen geladen.
- LV-Positionen können nachträglich hinzugefügt, geändert und entfernt werden.
- Beschreibung, Detail, Status und Anmerkung sind vollständig bearbeitbar.
- Planmarkierungen gehören zur gemeinsamen Erfassungs-ID.
- Aufmaßblatt zeigt ID und Beschreibung nur einmal; darunter stehen die LV-Unterpositionen.
