"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { resolveLegacyPath, type Locale } from "@/lib/routes";

type LocaleLinkProps = Omit<ComponentProps<typeof NextLink>, "href"> & {
  /** A path written the old way, e.g. "/recursos/las-divisiones#perfiles". */
  to: string;
};

/**
 * A link that always points at the current language.
 *
 * Drop-in for the router's Link: it keeps the `to` prop the components already
 * pass and resolves it through the route map, so the same JSX produces
 * /es/recursos or /en/resources depending on the page it renders on.
 */
const LocaleLink = ({ to, ...props }: LocaleLinkProps) => {
  const { language } = useLanguage();
  return <NextLink href={resolveLegacyPath(language as Locale, to)} {...props} />;
};

export default LocaleLink;
