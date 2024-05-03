export const getInitials = (fullName: string) => {
  const parts = fullName.split(' ')

  if (parts.length >= 2) {
   
    const firstInitial = parts[0].charAt(0).toUpperCase()

   
    const lastInitial = parts[1].charAt(0).toUpperCase()

    
    return firstInitial + lastInitial
  } else {
    
    return fullName.charAt(0).toUpperCase()
  }
}
