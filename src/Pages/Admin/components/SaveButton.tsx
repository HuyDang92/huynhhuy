import { useAdminData } from "../../../context/AdminDataContext";

interface Props {
  tabKey: string;
  onClick: () => void;
}

export default function SaveButton({ tabKey, onClick }: Props) {
  const { saving, savedKey, errorKey } = useAdminData();

  const isError = errorKey === tabKey;
  const isSaved = savedKey === tabKey;

  return (
    <div className="space-y-2">
      <button
        onClick={onClick}
        disabled={saving}
        className={`
          disabled:opacity-50 text-white rounded-xl px-6 py-3 text-sm font-medium transition-colors
          ${isError
            ? "bg-red-600 hover:bg-red-700"
            : "bg-[#FF5858] hover:bg-[#ff4040]"
          }
        `}
      >
        {saving ? "Saving…" : isSaved ? "Saved ✓" : isError ? "Failed – retry" : "Save Changes"}
      </button>
      {isError && (
        <p className="text-red-400 text-xs">
          Firestore write failed. Check that Firestore is enabled in Firebase Console and security rules allow writes.
        </p>
      )}
    </div>
  );
}
