export function calculateAge(birthdate: string): number {
  const today = new Date();
  const birth = new Date(birthdate);
  let age = today.getFullYear() - birth.getFullYear();
  const currentMonth = today.getMonth();
  const birthMonth = birth.getMonth();

  // Check if the birthday has not occurred yet this year
  if (
    currentMonth < birthMonth ||
    (currentMonth === birthMonth && today.getDate() < birth.getDate())
  ) {
    age--;
  }

  return age;
}
