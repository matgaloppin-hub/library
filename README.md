# 🚀 Projet Agile (Monorepo)

Ce dépôt contient l'ensemble du code de notre application :
* `📁 server/` : Le backend en Spring Boot (Java)
* `📁 client/` : Le frontend en Angular (À venir)

---

## ⚙️ Backend (Server)

Le backend utilise une base de données locale **H2** en mode fichier. 

### Démarrage
1. Ouvrez le dossier `server` dans votre IDE.
2. Lancez l'application (`ServerApplication.java`).
3. Le dossier `/data` contenant votre base de données locale sera créé automatiquement à l'intérieur du dossier `server`. (Ce dossier est ignoré par Git pour éviter les conflits).

### Accéder à la base de données locale
Allez sur : http://localhost:8080/h2-console

⚠️ **TRÈS IMPORTANT :** Lors de votre première connexion, remplissez EXACTEMENT ces informations pour ne pas créer de base vide par erreur :
* **Driver Class :** `org.h2.Driver`
* **JDBC URL :** `jdbc:h2:file:./data/bd`
* **User Name :** `sa`
* **Password :** *(Laissez vide)*

💡 *Astuce : Dans la case "Saved Settings" en haut, tapez "Mini Projet" et cliquez sur la disquette bleue pour sauvegarder cette configuration pour vos prochaines visites !*