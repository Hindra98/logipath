import { X } from "lucide-react";
import Button from "../ui/Button";
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={title ?? "Modal dialog"}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div
        className="relative w-full max-w-xl mx-4 bg-white rounded-lg shadow-xl overflow-hidden z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b bg-cameroun-green/20">
          <div className="text-lg font-semibold text-gray-900">
            {title ?? "Logipath"}
          </div>
          <Button variant="ghost" className="p-1" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-4 bg-cameroun-green/10">{children}</div>
      </div>
    </div>
  );
}
