import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import { initialTasks } from "../data/kanbanTasks";

export default function Kanban() {
  const [tasks, setTasks] = useState(initialTasks);

  function onDragEnd(result) {
    if (!result.destination) return;

    const newTasks = Array.from(tasks);
    const [movedItem] = newTasks.splice(result.source.index, 1);
    newTasks.splice(result.destination.index, 0, movedItem);

    setTasks(newTasks);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="kanban">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="grid gap-4"
          >
            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    className="p-4 bg-white dark:bg-gray-700 rounded shadow"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {task.title}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
