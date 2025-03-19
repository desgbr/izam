"use client";
// components/Sidebar.js
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { Settings, ChevronDown, ChevronUp, X, Check } from "lucide-react";
import SortableItem from "./sortable-item";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { editNav, getNavData, trackEvent } from "@/services";
const sendRequest = async (url, { arg }) => {
  return await editNav(arg);
};

const Sidebar = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [originalMenuItems, setOriginalMenuItems] = useState([]);
  const [expandedItems, setExpandedItems] = useState([2, 4]);
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const { data, mutate } = useSWR("get-navigation", getNavData, {
    revalidateOnFocus: false,
    onSuccess: (res) => {
      console.log(res);
      setMenuItems(res);
      setOriginalMenuItems(JSON.parse(JSON.stringify(res))); // Create a deep copy
    },
  });

  const { trigger: saveNavigation } = useSWRMutation(
    "edit-navigation",
    sendRequest
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = menuItems.findIndex((item) => item.id === active.id);
      const newIndex = menuItems.findIndex((item) => item.id === over.id);

      const newItems = [...menuItems];
      const [removed] = newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, removed);

      setMenuItems(newItems);
      const item = menuItems[newIndex];
      trackEvent({
        id: item?.id,
        from: oldIndex,
        to: newIndex,
      }).then((res) => {
        console.log("trackEvent ---->", res);
      });
    }
  };

  const handleToggleExpand = (id) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleEditToggle = (parentId, newChildren) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === parentId ? { ...item, children: newChildren } : item
      )
    );
  };

  const handleLabelChange = (id, newLabel) => {
    setMenuItems((prev) => {
      const updateNestedItems = (items) => {
        return items.map((item) => {
          if (item.id === id) {
            return { ...item, title: newLabel };
          }
          if (item.children) {
            return {
              ...item,
              children: updateNestedItems(item.children),
            };
          }
          return item;
        });
      };

      return updateNestedItems(prev);
    });
  };

  const handleVisibilityToggle = (id) => {
    setMenuItems((prev) => {
      const updateNestedItems = (items) => {
        return items.map((item) => {
          if (item.id === id) {
            return { ...item, visible: item.visible === false ? true : false };
          }
          if (item.children) {
            return {
              ...item,
              children: updateNestedItems(item.children),
            };
          }
          return item;
        });
      };

      return updateNestedItems(prev);
    });
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  const handleSave = () => {
    saveNavigation(menuItems)
      .then((response) => {
        console.log("Navigation saved successfully:", response);
        mutate();
        setOriginalMenuItems(JSON.parse(JSON.stringify(menuItems)));
        setEditMode(false); 
      })
      .catch((error) => {
        console.error("Error saving navigation:", error);
        // Optionally add error handling UI here
      });
  };

  const handleCancelChanges = () => {
    setMenuItems(JSON.parse(JSON.stringify(originalMenuItems)));
    setEditMode(false); 
  };

  return (
    <div className=" min-w-96 md:max-w-[440px] bg-white shadow-md h-full">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-2xl font-medium">Menu</h2>
        <button onClick={toggleEditMode}>
          {editMode ? (
            <div className="flex space-x-2">
              <X
                onClick={handleCancelChanges}
                size={20}
                className="text-red-500 size-10 rounded-full p-1 border-2 border-red-500 hover:bg-red-100"
              />
              <Check
                onClick={handleSave}
                size={20}
                className="text-green-500 size-10 rounded-full p-1 border-2 border-green-500 hover:bg-green-100"
              />
            </div>
          ) : (
            <Settings className="size-8" />
          )}
        </button>
      </div>

      {editMode ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext
            items={menuItems.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            {menuItems.map((item) => (
              <SortableItem
                key={item.id}
                id={item.id}
                item={item}
                editMode={true}
                handleToggleExpand={handleToggleExpand}
                expandedItems={expandedItems}
                handleEditToggle={handleEditToggle}
                handleLabelChange={handleLabelChange}
                handleVisibilityToggle={handleVisibilityToggle}
              />
            ))}
          </SortableContext>
        </DndContext>
      ) : (
        <div className="flex flex-col gap-2 mx-4 mt-4">
          {menuItems.map((item) => {
            if (item.visible === false) return null;

            return (
              <div key={item.id}>
                <div
                  className="bg-[#F7F7F7] rounded-md"
                  onClick={() => {
                    if (item.children) {
                      handleToggleExpand(item.id);
                    } else if (item.target) {
                      router.push(item.target);
                    }
                  }}
                >
                  <div
                    className={`p-4 cursor-pointer flex items-center rounded-md ${
                      pathname === item.target
                        ? "bg-gray-100"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    {item.children && (
                      <span className="mr-2">
                        {expandedItems.includes(item.id) ? (
                          <ChevronDown size={18} />
                        ) : (
                          <ChevronUp size={18} />
                        )}
                      </span>
                    )}
                    <span className="text-2xl">{item.title}</span>
                  </div>
                </div>

                {item.children && expandedItems.includes(item.id) && (
                  <div>
                    {item.children
                      .filter((child) => child.visible !== false)
                      .map((child) => (
                        <div
                          key={child.id}
                          className={`p-3 pl-8 hover:bg-gray-100 cursor-pointer text-[22px] ${
                            pathname === child.target ? "bg-gray-100" : ""
                          }`}
                          onClick={() => router.push(child.target)}
                        >
                          {child.title}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
