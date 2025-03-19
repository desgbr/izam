import { Check, ChevronDown, ChevronUp, Edit, Eye, EyeOff, GripVertical, Pencil, X } from "lucide-react";
import Link from "next/link";
import NestedSortableList from "./nested-sortable-list";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { useState } from "react";

const SortableItem = ({
  id,
  item,
  isChild = false,
  editMode,
  handleToggleExpand,
  expandedItems,
  handleEditToggle,
  handleLabelChange,
  handleVisibilityToggle,
  depth = 0,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [tempLabel, setTempLabel] = useState(item.title);

  const handleEditClick = () => {
    setIsEditing(true);
    setTempLabel(item.title);
  };

  const handleSaveEdit = () => {
    handleLabelChange(id, tempLabel);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setTempLabel(item.title);
  };

  const isExpanded = expandedItems.includes(id);
  const hasChildren = item.children && item.children.length > 0;
  const isVisible = item.visible !== false;

  if (!editMode && !isVisible) {
    return null;
  }

  return (
    <div ref={setNodeRef} style={style} className={`${isChild ? "ml-4" : ""}`}>
      <div
        className={`flex items-center py-3 px-2 ${
          editMode ? "bg-white" : "hover:bg-gray-100"
        }`}
      >
        {editMode && (
          <span
            {...attributes}
            {...listeners}
            className="cursor-move mr-2 size-7"
          >
            <GripVertical size={22} />
          </span>
        )}

        {hasChildren && (
          <button
            onClick={() => handleToggleExpand(id)}
            className="mr-2 focus:outline-none"
          >
            {isExpanded ? <ChevronDown size={25} /> : <ChevronUp size={25} />}
          </button>
        )}

        {!isEditing ? (
          <div className="flex-1">
            {!hasChildren && item.target ? (
              <Link href={item.target} className="flex-1 text-2xl">
                {item.title}
              </Link>
            ) : (
              <span className="flex-1 text-2xl">{item.title}</span>
            )}
          </div>
        ) : (
          <input
            type="text"
            value={tempLabel}
            onChange={(e) => setTempLabel(e.target.value)}
            className="flex-1 px-2 py-1 border rounded"
            autoFocus
          />
        )}

        {editMode && (
          <>
            {isEditing ? (
              <div className="flex">
                <button
                  onClick={handleCancelEdit}
                  className="ml-2 text-red-500"
                >
                  <X size={25} />
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="ml-2 text-green-500"
                >
                  <Check size={25} />
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={handleEditClick}
                  className="ml-2 text-[#848484]"
                >
                  <Pencil size={25} />
                </button>
                <button
                  onClick={() => handleVisibilityToggle(id)}
                  className='ml-2 text-[#848484]'
                >
                  {isVisible ? <Eye size={25} /> : <EyeOff size={25} />}
                </button>
              </>
            )}
          </>
        )}
      </div>

      {hasChildren && isExpanded && (
        <div className="ml-4">
          {editMode ? (
            <NestedSortableList
              items={item.children}
              editMode={editMode}
              handleToggleExpand={handleToggleExpand}
              expandedItems={expandedItems}
              handleEditToggle={handleEditToggle}
              handleLabelChange={handleLabelChange}
              handleVisibilityToggle={handleVisibilityToggle}
              parentId={id}
              depth={depth + 1}
            />
          ) : (
            item.children
              .filter((child) => child.visible !== false)
              .map((child) => (
                <div key={child.id} className="py-2 px-4">
                  <Link href={child.target || "#"}>{child.title}</Link>
                </div>
              ))
          )}
        </div>
      )}
    </div>
  );
};

export default SortableItem