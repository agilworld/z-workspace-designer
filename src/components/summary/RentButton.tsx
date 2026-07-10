/**
 * RentButton — primary CTA to redirect to monis.rent checkout.
 *
 * @status implemented
 */

interface RentButtonProps {
  /** Disable the button when the workspace is empty. */
  disabled: boolean;
}

export function RentButton({ disabled }: RentButtonProps) {
  return (
    <div className="space-y-2">
      <a
        href="https://www.monis.rent"
        target="_blank"
        rel="noopener noreferrer"
        className={
          disabled
            ? 'pointer-events-none'
            : undefined
        }
      >
        <button
          type="button"
          disabled={disabled}
          className={`w-full rounded-xl px-6 py-3.5 font-semibold text-white shadow-lg shadow-emerald-200/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 ${
            disabled
              ? 'cursor-not-allowed bg-emerald-600 opacity-50 shadow-none'
              : 'cursor-pointer bg-emerald-600 hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-200/50 active:scale-[0.98]'
          }`}
        >
          Rent This Workspace →
        </button>
      </a>

      <p className="text-center text-xs text-slate-400">Powered by monis.rent</p>
    </div>
  );
}
