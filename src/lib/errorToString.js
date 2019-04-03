export default error => {
  if (!error) return 'Une erreur est survenue'
  switch (error) {
    case 'INVALID_FORM':
      return 'Formulaire incomplet'
    case 'NOT_ADMIN':
      return 'Vous devez avoir des droits administrateurs pour accéder à cette page'
    case 'ALREADY_ADMIN':
      return 'Cette personne est déjà administrateur'
    case 'INVALID_TOKEN':
      return 'Jeton invalide, veuillez vous reconnecter'
    case 'UNKNOWN':
      return 'Une erreur est survenue'
    case '':
      return 'Une erreur est survenue'
    default:
      return error
  }
}
