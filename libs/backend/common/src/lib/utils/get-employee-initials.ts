export const getEmployeeFullNameForInitials = function(firstName, middleName, surname) {
  const fullName = getEmployeeFullName(firstName, middleName, surname)
  const limitedNameSegments = fullName.split(' ', 3)
  return limitedNameSegments.join(' ')
}

export const  getEmployeeFullName = function(firstName: string, middleName: string, surname: string)  {
  const placeHolder = 'MIDDLE_NAME_PLACEHOLDER'
  const simpleName =  `${firstName?firstName?.trim():''} ${placeHolder} ${surname?.trim()}`
  const midName = middleName?middleName?.trim(): ''
  return simpleName.replace(placeHolder, midName)
}
