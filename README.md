# Isidor’s Quest: Chasing the Glow

**Projet SAE S5 & S6 - BUT Informatique (3ᵉ année)**
Développement d’un jeu vidéo 2D en Unity et d’un site de distribution React Native

## Présentation

*Isidor’s Quest* est un jeu de plateforme 2D en pixel art développé dans Unity. Il propose une expérience rétro et moderne. Le joueur peut choisir entre deux classes (archer ou guerrier), et explore différents niveaux en affrontant des ennemis, tout en développant ses compétences et en interagissant dans un village central.

Ce projet inclut également un **site web dédié** développé avec React Native, Node.js et MongoDB. Il permet de créer un compte, acheter le jeu (paiement test via Stripe ou PayPal), et y jouer directement depuis le navigateur grâce à une version WebGL intégrée.

## Technologies utilisées

### Jeu

* **Unity 2D (C#)** — Développement du jeu
* **WebGL** — export navigateur

### Site Web

* **React Native** — Frontend
* **Node.js + Express** — Backend
* **MongoDB + Mongoose** — Base de données
* **Jest** — Tests unitaires
* **Stripe / PayPal SDK** — Systèmes de paiement

### Outils d’organisation

* GitHub, Trello, Discord, Figma, Notion, Visual Paradigm

## Fonctionnalités

### Côté Jeu (Unity)

* Choix de classe : Archer ou Guerrier
* Niveaux progressifs avec ennemis, plateformes dynamiques
* Village avec boutique et arbre de compétences
* Système d'inventaire, pièces, potions, sauvegarde de progression
* WebGL pour intégration navigateur
* Sauvegarde des données en base

### Côté Site Web (React Native Web)

* Authentification (inscription, connexion, réinitialisation mot de passe)
* Vérification par e-mail (code)
* Paiement sécurisé (test) via Stripe ou PayPal
* Accès au jeu uniquement après achat
* Interface bilingue (Français / Anglais)
* Intégration du jeu via iframe 

## Lancer le projet

### 1. Prérequis

* Node.js, MongoDB
* Unity
* Visual Studio Code (recommandé)

### 2. Installation

#### Backend :

```bash
cd WebsiteSaeReact/Backend
npm install
```

#### Frontend :

```bash
cd ../isidor
npm install
```

---

### 3. Démarrage

#### Lancer le backend :

```bash
cd WebsiteSaeReact/Backend
npm start
```

#### Lancer le frontend :

```bash
cd ../isidor
npm start
```
> Une fois lancé, pressez `w` pour **ouvrir automatiquement le site web dans le navigateur**.

---

### 4. Connexion utilisateur

Avant de lancer le jeu, certains prérequis sont nécessaires :

* Avoir une **adresse email valide** (pour recevoir un code de vérification).
* Installer l'application **Google Authenticator**.
* Créer un compte et se connecter via le **site web** lancé.

---

### 5. Lancer le jeu 

#### Option 1 – Depuis Unity (éditeur) :

1. Ouvrir le projet **`IsidorQuest`** avec Unity.
2. Dans l’explorateur de projet (fenêtre **Project**), chercher :

   ```
   Assets/Scenes/HomeMenu.unity
   ```
3. Double-cliquez sur la scène `HomeMenu.unity`.
4. Cliquez sur le bouton **Play** (icône triangle en haut de l’écran) pour démarrer le jeu dans l'éditeur.

#### Option 2 – Depuis WebGL (intégration web) :

##### Étapes de build WebGL :

1. Ouvrir le projet Unity (`IsidorQuest`) dans l’éditeur.
2. Aller dans **File > Build Settings**, sélectionner **WebGL** comme plateforme.
3. Cliquer sur **Build** : cela génère un dossier `isidor_build_web_jeu` (par exemple) contenant `index.html`.

##### Lancer :
Aller dans le dossier où le build Unity WebGL a été généré (`isidor_build_web_jeu`) :
1. Installer le serveur local (si ce n’est pas déjà fait) :
  ```bash
  npm install -g serve
  ```
2. Lancer le serveur sur le port 5500
  ```bash
  serve -l 5500
  ```
> Le jeu sera accessible à l’adresse : [http://localhost:5500](http://localhost:5500). Ce lien est utilisé dans le site lancé via une balise `iframe` :

> ```html
> <iframe src="http://localhost:5500"></iframe>
> ```

> **Ne changez pas le port 5500**, sauf si vous mettez également à jour le code du site web qui l’utilise.

## Accès au jeu
Un compte utilisateur et **un paiement** (fictif) sont nécessaires.

### Données de test :

* **Stripe** :

  * Carte : `4242 4242 4242 4242`
  * Expiration : une date future
  * CVC : n’importe quel 3 chiffres

* **PayPal** :

  * Voir les identifiants de test dans le [rapport PDF](Rapport_final.pdf)

