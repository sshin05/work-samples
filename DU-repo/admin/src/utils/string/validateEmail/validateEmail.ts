export const validateEmail = (email?: string) => {
  // In cases of undefined or null, we cast to empty string which will fail validation
  const formattedEmail = String(email).toLowerCase();

  // Whitespace is invalid in an email but hard to regex, so we check here
  if (formattedEmail.includes(' ')) return false;

  /* 
     This expression will catch 99.9% of invalid emails according to RFC 5322 standards.
     For official documentation of such standards you can visit
     https://datatracker.ietf.org/doc/html/rfc5322
    */

  const regex =
    // eslint-disable-next-line  no-empty-character-class
    /([!#-*+/-9=?A-Z^-~-]+(.[!#-*+/-9=?A-Z^-~-]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([!#-*+/-9=?A-Z^-~-]+(.[!#-*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])/;

  return regex.test(formattedEmail);
};
