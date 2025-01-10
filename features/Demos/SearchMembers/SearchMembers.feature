Feature: Téléchargement de membres
  En tant que profil autorisé, je souhaite pouvoir visualiser la liste des téléchargements des membres

  @RG1
  Scenario: Affichage du moteur de recherche
    Given J’accède à la page des téléchargements
    When Je suis un utilisateur non connecté
    Then un titre "Recherche par Nom" est visible
    And un champ texte "name" est visible avec la valeur "", un placeholder "John Doe"
    And un label "Nom du membre" est visible
    And une aide à la saisie "Minimum 3 caractères pour un nom" est visible
    And un bouton "Rechercher" est désactivé
    And un titre "Tableau des membres" est visible
