Github Repository für die Datenintegration von "Cultural Heritage Data" mit Linked Open Data Technologien.
Zur Transformation der Ursprungsdaten in JSON-LD wird Logstash verwendet. ElasticSearch dient als Datastore zur Speicherung der JSON-LD Dokumente. Die auf Angular basierte Web Applikation nutzt die ElasticSearch API zur Darstellung der Daten.

Web Applikation
---
Die Entwicklungsumgebung verwendet die gängigen Webtools, wie den Paketmanager
npm und den Webseiten Paketmanager bower.
Installation z.B. unter MacOS X unter Verwendung von Homebrew:

brew install bower
brew install npm

Installation von Bower mit npm, sowie der Abhängigkeiten der Web App mit Hilfe von
Bower:
npm install -g bower
bower install

Einige eingebundene Bibliotheken, wie Leaflet, benötigen für das Kompilieren von Typescript
die Type Definitionen:
npm install @types/leaflet-awesome-markers@latest --save
npm install @types/leaflet@latest --save
