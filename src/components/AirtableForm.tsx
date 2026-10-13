/**
 * The admissions form, served straight from Airtable.
 *
 * Submissions land in the "Leads" table of the CRM, so there is no backend of
 * our own in the path and no API token in the bundle — the embed is a plain
 * iframe. Airtable's own automation picks the submission up from there.
 *
 * Unlike the third parties elsewhere on the site, this one is not behind a
 * click-to-load gate: it is the whole purpose of the page it sits on.
 */

const FORM_URL =
  "https://airtable.com/embed/appwUisPpFsktV9d5/pagwCtD7QNLq4Ig2V/form";

type AirtableFormProps = {
  title: string;
  className?: string;
};

const AirtableForm = ({ title, className }: AirtableFormProps) => (
  <div
    className={`overflow-hidden rounded-2xl border border-border bg-white ${className ?? ""}`}
  >
    <iframe
      src={FORM_URL}
      title={title}
      className="block h-[780px] w-full border-0 sm:h-[900px]"
      referrerPolicy="strict-origin-when-cross-origin"
    />
  </div>
);

export default AirtableForm;
