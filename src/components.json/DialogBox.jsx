// DialogBox.jsx
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

const DialogBox = ({ open, onClose, title, children }) => {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed inset-0 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full relative">
            <Dialog.Title className="text-xl font-bold">{title}</Dialog.Title>
            <button onClick={onClose} className="absolute top-4 right-4">
              <X size={20} />
            </button>
            <div className="mt-4">{children}</div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogBox;
