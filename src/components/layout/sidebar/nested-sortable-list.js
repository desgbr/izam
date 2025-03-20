import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from "./sortable-item";
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useState, useEffect } from "react";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { trackEvent } from "@/services";

const NestedSortableList = ({
  items,
  editMode,
  handleToggleExpand,
  expandedItems,
  handleEditToggle,
  handleLabelChange,
  handleVisibilityToggle,
  parentId,
  depth,
}) => {
  const [localItems, setLocalItems] = useState(items);

  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = localItems.findIndex((item) => item.id === active.id);
      const newIndex = localItems.findIndex((item) => item.id === over.id);

      const newItems = [...localItems];
      const [removed] = newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, removed);

      setLocalItems(newItems);
      handleEditToggle(parentId, newItems);
      const item = localItems[newIndex];
      trackEvent({
        id: item?.id,
        from: oldIndex,
        to: newIndex,
      }).then((res) => {
        console.log('trackEvent ---->', res);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext
        items={localItems.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        {localItems.map((item) => (
          <SortableItem
            key={item.id}
            id={item.id}
            item={item}
            isChild={true}
            editMode={editMode}
            handleToggleExpand={handleToggleExpand}
            expandedItems={expandedItems}
            handleEditToggle={handleEditToggle}
            handleLabelChange={handleLabelChange}
            handleVisibilityToggle={handleVisibilityToggle}
            depth={depth}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default NestedSortableList