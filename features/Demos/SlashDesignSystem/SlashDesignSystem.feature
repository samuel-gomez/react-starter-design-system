Feature: Page SlashDesignSystem
  En tant que profil autorisé, je souhaite pouvoir afficher la page SlashDesignSystem

  @RG1
  Scenario: Affichage de la page SlashDesignSystem
    Given J'accède à la page SlashDesignSystem
    When Je suis un utilisateur non connecté
    Then un titre "Liste des composants" est visible

