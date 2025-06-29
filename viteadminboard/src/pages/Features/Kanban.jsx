import React, { useState, useEffect } from "react";
import {
  FaCommentAlt,
  FaPaperclip,
  FaPlus,
  FaTimes,
  FaTrash,
  FaEdit,
} from "react-icons/fa";

const initialData = {
  todo: [
    {
      title: "Landing page design & development",
      desc: "Lorem ipsum dolor sit amet consectetur sed id massa morbi porta malesuada dictumst.",
      tags: ["Development"],
      comments: 2,
      files: 4,
    },
    {
      title: "Landing page design",
      desc: "Lorem ipsum dolor sit amet consectetur sed id massa morbi porta malesuada dictumst.",
      tags: ["Design"],
      comments: 6,
      files: 8,
    },
  ],
  inprogress: [
    {
      title: "Mobile app UI/UX design & development",
      desc: "Lorem ipsum dolor sit amet consectetur sed id massa morbi porta malesuada dictumst.",
      tags: ["Development"],
      comments: 2,
      files: 10,
    },
    {
      title: "Fix homepage bugs",
      desc: "Lorem ipsum dolor sit amet consectetur sed id massa morbi porta malesuada dictumst.",
      tags: ["Development"],
      comments: 12,
      files: 6,
    },
    {
      title: "Secret marketing page",
      desc: "Lorem ipsum dolor sit amet consectetur sed id massa morbi porta malesuada dictumst.",
      tags: ["Development"],
      comments: 8,
      files: 4,
    },
  ],
  completed: [
    {
      title: "SEO campaign",
      desc: "Lorem ipsum dolor sit amet consectetur sed id massa morbi porta malesuada dictumst.",
      tags: ["Marketing"],
      comments: 10,
      files: 12,
    },
    {
      title: "Target definition meeting",
      desc: "Lorem ipsum dolor sit amet consectetur sed id massa morbi porta malesuada dictumst.",
      tags: ["Marketing"],
      comments: 14,
      files: 6,
    },
    {
      title: "Twitter campaign",
      desc: "Lorem ipsum dolor sit amet consectetur sed id massa morbi porta malesuada dictumst.",
      tags: ["Marketing"],
      comments: 12,
      files: 2,
    },
  ],
};

const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem("kanban-data");
    return stored ? JSON.parse(stored) : initialData;
  } catch {
    return initialData;
  }
};

const saveToStorage = (data) => {
  try {
    localStorage.setItem("kanban-data", JSON.stringify(data));
  } catch {
    console.warn("Failed to save Kanban data");
  }
};

const KanbanColumn = ({
  title,
  items,
  onCardClick,
  onAddCardClick,
  onDeleteCard,
  onEditCard,
  filterTag,
}) => (
  <div className="w-full md:w-1/3 px-2">
    <h2
      className="text-xl font-semibold mb-2 flex justify-between items-center"
      style={{ color: "var(--text)" }}
    >
      {title}
      <span
        className="text-xs px-2 py-1 rounded-full"
        style={{ backgroundColor: "var(--border)", color: "var(--text)" }}
      >
        {items.length}
      </span>
    </h2>
    <div className="space-y-4">
      {items
        .filter((item) => !filterTag || item.tags.includes(filterTag))
        .map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-lg shadow"
            style={{ backgroundColor: "var(--card)", color: "var(--text)" }}
          >
            <div className="flex justify-between">
              <h3
                className="font-bold mb-1 cursor-pointer"
                onClick={() => onCardClick(item)}
              >
                {item.title}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    onEditCard(title.toLowerCase().replace(/ /g, ""), idx)
                  }
                  className="text-blue-400 hover:text-blue-600"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() =>
                    onDeleteCard(title.toLowerCase().replace(/ /g, ""), idx)
                  }
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            <p className="text-sm mb-2" style={{ color: "var(--muted)" }}>
              {item.desc}
            </p>
            <div className="flex flex-wrap gap-2 mb-2">
              {item.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 rounded"
                  style={{ backgroundColor: "var(--accent)", color: "#fff" }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div
              className="flex items-center gap-4 text-sm"
              style={{ color: "var(--muted)" }}
            >
              <span className="flex items-center gap-1">
                <FaCommentAlt /> {item.comments}
              </span>
              <span className="flex items-center gap-1">
                <FaPaperclip /> {item.files}
              </span>
            </div>
          </div>
        ))}
      <button
        onClick={() => onAddCardClick(title.toLowerCase().replace(/ /g, ""))}
        className="w-full flex items-center justify-center gap-2 py-2 rounded"
        style={{ backgroundColor: "var(--border)", color: "var(--text)" }}
      >
        <FaPlus /> Add card
      </button>
    </div>
  </div>
);

const AddCardModal = ({ onClose, onAdd, column, initial = {} }) => {
  const [title, setTitle] = useState(initial.title || "");
  const [desc, setDesc] = useState(initial.desc || "");
  const [tag, setTag] = useState(initial.tags ? initial.tags[0] : "");

  const handleSubmit = () => {
    if (title && desc && tag) {
      onAdd(column, {
        title,
        desc,
        tags: [tag],
        comments: 0,
        files: 0,
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div
        className="p-6 rounded-lg w-[90%] max-w-lg relative"
        style={{ backgroundColor: "var(--card)", color: "var(--text)" }}
      >
        <button className="absolute top-3 right-3 text-lg" onClick={onClose}>
          <FaTimes />
        </button>
        <h2 className="text-xl font-semibold mb-4">
          {initial.title ? "Edit Task" : "Add New Task"}
        </h2>
        <input
          className="w-full p-2 mb-2 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            backgroundColor: "var(--input)",
            color: "var(--text)",
            border: "1px solid var(--border)",
          }}
        />
        <textarea
          className="w-full p-2 mb-2 rounded"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          style={{
            backgroundColor: "var(--input)",
            color: "var(--text)",
            border: "1px solid var(--border)",
          }}
        />
        <input
          className="w-full p-2 mb-4 rounded"
          placeholder="Tag (e.g., Development)"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          style={{
            backgroundColor: "var(--input)",
            color: "var(--text)",
            border: "1px solid var(--border)",
          }}
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2 rounded"
          style={{ backgroundColor: "var(--accent)", color: "#fff" }}
        >
          {initial.title ? "Update Task" : "Add Task"}
        </button>
      </div>
    </div>
  );
};

export default function Kanban() {
  const [data, setData] = useState(loadFromStorage);
  const [selectedTask, setSelectedTask] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addColumn, setAddColumn] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [filterTag, setFilterTag] = useState("");

  useEffect(() => {
    saveToStorage(data);
  }, [data]);

  const handleAddCardClick = (column) => {
    setAddColumn(column);
    setEditingTask(null);
    setAddModalOpen(true);
  };

  const handleAddCard = (column, newCard) => {
    if (editingTask !== null) {
      setData((prev) => {
        const copy = [...prev[column]];
        copy[editingTask] = newCard;
        return { ...prev, [column]: copy };
      });
    } else {
      setData((prev) => ({ ...prev, [column]: [...prev[column], newCard] }));
    }
  };

  const handleDeleteCard = (column, idx) => {
    setData((prev) => ({
      ...prev,
      [column]: prev[column].filter((_, i) => i !== idx),
    }));
  };

  const handleEditCard = (column, idx) => {
    setAddColumn(column);
    setEditingTask(idx);
    setAddModalOpen(true);
  };

  return (
    <>
      <div className="mb-4">
        <select
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
          style={{
            backgroundColor: "var(--input)",
            color: "var(--text)",
            border: "1px solid var(--border)",
          }}
          className="px-3 py-2 rounded w-full md:w-auto"
        >
          <option value="">All Tags</option>
          <option value="Development">Development</option>
          <option value="Design">Design</option>
          <option value="Marketing">Marketing</option>
        </select>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <KanbanColumn
          title="To Do"
          items={data.todo}
          onCardClick={setSelectedTask}
          onAddCardClick={handleAddCardClick}
          onDeleteCard={handleDeleteCard}
          onEditCard={handleEditCard}
          filterTag={filterTag}
        />
        <KanbanColumn
          title="In Progress"
          items={data.inprogress}
          onCardClick={setSelectedTask}
          onAddCardClick={handleAddCardClick}
          onDeleteCard={handleDeleteCard}
          onEditCard={handleEditCard}
          filterTag={filterTag}
        />
        <KanbanColumn
          title="Completed"
          items={data.completed}
          onCardClick={setSelectedTask}
          onAddCardClick={handleAddCardClick}
          onDeleteCard={handleDeleteCard}
          onEditCard={handleEditCard}
          filterTag={filterTag}
        />
      </div>

      {selectedTask && (
        <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}
      {addModalOpen && (
        <AddCardModal
          onClose={() => setAddModalOpen(false)}
          onAdd={handleAddCard}
          column={addColumn}
          initial={editingTask !== null ? data[addColumn][editingTask] : {}}
        />
      )}
    </>
  );
}
