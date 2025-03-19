/**
 * Props for the ProgramLink component.
 */
export type ProgramLinkProps = {
  /** The URL for the link destination. */
  href: string;
  /** The tag associated with the affiliate's program status. */
  tagName: string | null;
  /** The program name. */
  programName: string;
  /** The affiliate ID. */
  affiliateId?: string;
  /** The URL of the logo to display. */
  logoUrl?: string;
};
