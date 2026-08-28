KOLLAUDIERUNG V6.4 – PWA
=========================

ZIEL
----
Diese Version ist für eine echte HTTPS-Webadresse gedacht.
Kein lokaler Windows-Testserver ist im späteren Betrieb erforderlich.

DATEIEN
-------
index.html
manifest.webmanifest
service-worker.js
icon-180.png
icon-192.png
icon-512.png

BEREITSTELLUNG
--------------
Den kompletten Inhalt dieses Ordners unverändert auf einen statischen HTTPS-Webspace hochladen.
Beispiel:
https://kollaudierung.firma.at/

WICHTIG:
- HTTPS ist für die Installation/Offline-Funktion erforderlich.
- Die Webadresse liefert nur die App aus.
- Projekte, Aufmaße und Arbeitsdaten bleiben weiterhin lokal im Browser/Gerät.
- Master -> Arbeitsdatei -> Monteur -> Rückgabe bleibt wie in V6.2.

IPHONE / IPAD
-------------
1. HTTPS-Adresse in Safari öffnen.
2. Teilen.
3. Zum Home-Bildschirm.
4. Hinzufügen.
5. Danach die App über das Symbol starten.

SAMSUNG / ANDROID
-----------------
1. HTTPS-Adresse in Chrome öffnen.
2. App installieren / Zum Startbildschirm hinzufügen.
3. Danach über das App-Symbol starten.

WINDOWS
-------
In Chrome/Edge öffnen und App installieren.

OFFLINE
-------
Die App-Oberfläche wird über einen Service Worker lokal gespeichert.
Die bisher verwendeten Excel-/PDF-Bibliotheken werden bei der Installation nach Möglichkeit
ebenfalls in den Cache geladen und danach wiederverwendet.

HINWEIS
-------
Vor echtem Baustelleneinsatz bitte Installation, Neustart ohne Internet, Excel-Import,
PDF-Import, Planbearbeitung sowie Arbeitsdatei/Rückgabe auf den Zielgeräten testen.


V6.4
----
- Keine eingebauten Beispielprojekte mehr.
- Neue Installation startet mit leerer Projektliste.
- Eingabefelder verwenden neutrale, allgemeine Platzhalter.
- Kein vorgegebenes Gewerk.
- Bestehende lokal gespeicherte Projekte werden beim Versionswechsel nicht automatisch gelöscht.
