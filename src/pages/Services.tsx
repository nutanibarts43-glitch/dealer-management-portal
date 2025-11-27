import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  sortableKeyboardCoordinates as kbCoords,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { FiEdit2, FiTrash2, FiPlus, FiMove } from "react-icons/fi";
import { THEME } from "../utils/helpers";
import type { AppDispatch, RootState } from "../redux/store";
import { addService, deleteService, reorderServices, updateService } from "../redux/servicesSlice";
import type { ServiceItemType } from "../types/service.types";


/* -------------------- Validation Schema (Zod) -------------------- */
const serviceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  price: z.string().optional(),
});

type ServiceFormType = z.infer<typeof serviceSchema>;

/* -------------------- Sortable Item (uses dnd-kit) -------------------- */
function SortableServiceItem({
  item,
  index,
  onEdit,
  onDelete,
}: {
  item: ServiceItemType;
  index: number;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="p-4 bg-white rounded shadow flex items-start gap-4"
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="p-2 rounded-md cursor-grab text-gray-500 hover:text-[#B9986D]"
        title="Drag to reorder"
      >
        <FiMove size={18} />
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold">{item.title}</h3>
            {item.description && (
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
            )}
            {item.price && (
              <div className="text-sm text-gray-700 mt-2">
                Price: <strong>{item.price}</strong>
              </div>
            )}
          </div>

          <div className="hidden md:flex flex-col items-end gap-2">
            <div className="text-sm text-gray-500">#{index + 1}</div>

            <div className="flex gap-2">
              <button
                onClick={() => onEdit(item.id)}
                className="px-3 py-1 rounded border"
                style={{ borderColor: THEME }}
                title="Edit"
              >
                <FiEdit2 />
              </button>

              <button
                onClick={() => onDelete(item.id)}
                className="px-3 py-1 rounded text-white"
                style={{ backgroundColor: "#ef4444" }}
                title="Delete"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile action buttons */}
        <div className="mt-3 md:hidden flex gap-2">
          <button
            onClick={() => onEdit(item.id)}
            className="px-3 py-1 rounded border"
            style={{ borderColor: THEME }}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="px-3 py-1 rounded text-white"
            style={{ backgroundColor: "#ef4444" }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------- Services Page -------------------- */
export default function ServicesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const services = useSelector((s: RootState) => s.services.list);
  const dealerTier = useSelector(
    (s: RootState) => s.dealer?.tier ?? "bronze"
  ) as "bronze" | "silver" | "gold" | "platinum";

  // local UI state
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [toDelete, setToDelete] = useState<string | null>(null);

  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  // Tier limits: Bronze & Silver show top 3 publicly. We'll show warning when limit hits.
  const tierLimits: Record<string, number | null> = {
    bronze: 3,
    silver: 3,
    gold: 5,
    platinum: null,
  };
  const visibleLimit = tierLimits[dealerTier];

  // Form with React Hook Form + Zod
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<ServiceFormType>({
    resolver: zodResolver(serviceSchema),
    defaultValues: { title: "", description: "", price: "" },
  });

  // open add modal
  function openAdd() {
    setEditingId(null);
    reset({ title: "", description: "", price: "" });
    setModalOpen(true);
  }

  // open edit modal
  function openEdit(id: string) {
    const svc = services.find((s) => s.id === id);
    if (!svc) return;
    setEditingId(id);
    setValue("title", svc.title);
    setValue("description", svc.description ?? "");
    setValue("price", svc.price ?? "");
    setModalOpen(true);
  }

  // handle add/update
  const onSubmit = (data: ServiceFormType) => {
    if (editingId) {
      const updated: ServiceItemType = {
        id: editingId,
        title: data.title.trim(),
        description: data.description?.trim(),
        price: data.price?.trim(),
        visible: true,
      };
      dispatch(updateService(updated));
    } else {
      const newItem: ServiceItemType = {
        id: z.uuidv4(),
        title: data.title.trim(),
        description: data.description?.trim(),
        price: data.price?.trim(),
        visible: true,
      };
      dispatch(addService(newItem));
    }
    setModalOpen(false);
  };

  // delete confirm
  function confirmDelete(id: string) {
    setToDelete(id);
  }
  function doDelete() {
    if (!toDelete) return;
    dispatch(deleteService(toDelete));
    setToDelete(null);
  }

  // dnd end handler -> compute new order and dispatch reorder
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = services.findIndex((s) => s.id === String(active.id));
    const newIndex = services.findIndex((s) => s.id === String(over.id));
    if (oldIndex === -1 || newIndex === -1) return;

    const newArr = arrayMove(services, oldIndex, newIndex);
    dispatch(reorderServices(newArr));
  }

  // toggle visibility for public listing
  function toggleVisible(id: string) {
    const svc = services.find((s) => s.id === id);
    if (!svc) return;
    const updated = { ...svc, visible: !svc.visible };
    dispatch(updateService(updated));
  }

  // memoized note about tier
  const tierNote = useMemo(() => {
    if (visibleLimit === null)
      return `Your ${dealerTier} tier allows unlimited public services.`;
    return `Your ${dealerTier} tier shows top ${visibleLimit} services in public listing.`;
  }, [dealerTier, visibleLimit]);

  // initial data load (mocked if empty) — for demo only; replace with API load
  useEffect(() => {
    if (services.length === 0) {
      const demo: ServiceItemType[] = [
        {
          id: z.uuidv4(),
          title: "Home Theater Installation",
          description: "Turnkey design & install",
          price: "₹25,000",
          visible: true,
        },
        {
          id: z.uuidv4(),
          title: "Multiroom Audio",
          description: "Whole-home audio setup",
          price: "₹18,000",
          visible: true,
        },
        {
          id: z.uuidv4(),
          title: "Automation Setup",
          description: "Smart home automation",
          price: "₹40,000",
          visible: true,
        },
      ];
      dispatch(reorderServices(demo));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: THEME }}>
            Services
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage and order the services that appear on your public listing.
          </p>
          <div className="mt-2 text-xs text-gray-500">{tierNote}</div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={openAdd}
            className="px-4 py-2 rounded-md text-white flex items-center gap-2"
            style={{ backgroundColor: THEME }}
          >
            <FiPlus /> Add Service
          </button>

          <button
            onClick={() => {
              // mock save: in production call API to persist order/list
              alert("Saved (mock). Replace with API call to persist services.");
            }}
            className="px-4 py-2 rounded-md border"
            style={{ borderColor: THEME, color: THEME }}
          >
            Save
          </button>
        </div>
      </div>

      {/* Services list with DnD */}
      <div className="space-y-3">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={services.map((s) => s.id)}
            strategy={verticalListSortingStrategy}
          >
            {services.map((svc, idx) => (
              <div key={svc.id}>
                <SortableServiceItem
                  item={svc}
                  index={idx}
                  onEdit={openEdit}
                  onDelete={confirmDelete}
                />
                {/* Below each item show small controls for visibility and position on small screens */}
                <div className="flex items-center gap-3 mt-2 mb-4">
                  <button
                    onClick={() => toggleVisible(svc.id)}
                    className={`px-3 py-1 rounded text-sm ${
                      svc.visible
                        ? "bg-green-50 border border-green-200 text-green-700"
                        : "bg-red-50 border border-red-200 text-red-700"
                    }`}
                  >
                    {svc.visible ? "Visible" : "Hidden"}
                  </button>
                  <div className="text-sm text-gray-500">
                    Position: <strong>{idx + 1}</strong>
                  </div>
                </div>
              </div>
            ))}
          </SortableContext>
        </DndContext>
      </div>

      {/* If tier limit exists and user has more services than visible limit, show tip */}
      {visibleLimit !== null && services.length > visibleLimit && (
        <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-300 text-sm text-yellow-800 rounded">
          You have <strong>{services.length}</strong> services but only the{" "}
          <strong>top {visibleLimit}</strong> will appear publicly for your
          tier.
          <span className="ml-3">
            Consider upgrading to show more services.
          </span>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-lg w-full max-w-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              {editingId ? "Edit Service" : "Add Service"}
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div>
                <label className="text-sm text-gray-600">Title *</label>
                <input
                  className="w-full p-2 border rounded"
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm text-gray-600">Description</label>
                <textarea
                  className="w-full p-2 border rounded"
                  {...register("description")}
                  rows={3}
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">
                  Price (optional)
                </label>
                <input
                  className="w-full p-2 border rounded"
                  {...register("price")}
                />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 rounded border"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded text-white"
                  style={{ backgroundColor: THEME }}
                >
                  {editingId ? "Save Changes" : "Add Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {toDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded p-6 max-w-md w-full shadow-lg">
            <h4 className="text-lg font-semibold mb-3">Confirm Delete</h4>
            <p className="text-sm text-gray-700 mb-4">
              Are you sure you want to delete this service? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded border"
                onClick={() => setToDelete(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded text-white"
                onClick={doDelete}
                style={{ backgroundColor: THEME }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
