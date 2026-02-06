import type { HistorialItem as HistorialItemType } from "../../types";
import { HistorialItem } from "./HistorialItem";
import { Modal } from "../ui";
import "./historial.css";

interface HistorialListProps {
  open: boolean;
  onClose: () => void;
  historial: HistorialItemType[];
  onRemove: (id: string) => void;
  onClearAll: () => void;
  onSelect?: (item: HistorialItemType) => void;
}

export function HistorialList({ open, onClose, historial, onRemove, onClearAll, onSelect }: HistorialListProps) {
  if (!open) return null;

  function handleSelect(item: HistorialItemType) {
    onSelect?.(item);
    onClose();
  }

  return (
    <Modal
      title="Historial"
      onClose={onClose}
      footer={
        historial.length > 0 ? (
          <button className="historial-clear-btn" onClick={onClearAll}>
            Limpiar historial
          </button>
        ) : undefined
      }
    >
      {historial.length === 0 ? (
        <div className="historial-empty">
          <span className="historial-empty-icon">📋</span>
          <p>Sin conversiones aún</p>
        </div>
      ) : (
        <div className="historial-scroll">
          {historial.map((item) => (
            <HistorialItem
              key={item.id}
              item={item}
              onRemove={onRemove}
              onSelect={() => handleSelect(item)}
            />
          ))}
        </div>
      )}
    </Modal>
  );
}
