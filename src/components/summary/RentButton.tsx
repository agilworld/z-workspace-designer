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
    <div className="space-y-1.5">
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
          className={`w-full rounded-2xl px-6 py-3 font-semibold text-white shadow-lg shadow-blue-200/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${
            disabled
              ? 'cursor-not-allowed bg-blue-400 opacity-50 shadow-none'
              : 'cursor-pointer bg-blue-600 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200/50 active:scale-[0.98]'
          }`}
        >
          Rent Your Setup! →
        </button>
      </a>

      <p className="text-center text-[10px] text-slate-400">Powered by monis.rent</p>
    </div>
  );
}
