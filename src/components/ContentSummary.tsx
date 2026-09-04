import type { EncodeResult } from '../content/result';

interface ContentSummaryProps {
  result: EncodeResult;
}

export function ContentSummary({ result }: ContentSummaryProps) {
  if (result.ok) {
    return (
      <div className="content-summary content-summary-ok" aria-live="polite">
        <span className="content-summary-label">Esto es exactamente lo que se codificará:</span>
        <code>{result.value}</code>
      </div>
    );
  }

  return (
    <div className="content-summary content-summary-error" role="alert">
      {result.error}
    </div>
  );
}
