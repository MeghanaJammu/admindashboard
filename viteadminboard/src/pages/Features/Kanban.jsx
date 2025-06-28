// pages/Features/Kanban.jsx
import React, { useState, useEffect } from "react";
import { FaCommentAlt, FaPaperclip, FaPlus, FaTimes } from "react-icons/fa";

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

const KanbanColumn = ({ title, items, onCardClick, onAddCardClick }) => (
  <div className="w-full md:w-1/3 px-2">
    <h2 className="text-xl font-semibold text-white mb-2 flex justify-between items-center">
      {title}
      <span className="text-xs bg-gray-700 px-2 py-1 rounded-full">
        {items.length}
      </span>
    </h2>
    <div className="space-y-4">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="bg-gray-800 p-4 rounded-lg shadow text-white cursor-pointer hover:bg-gray-700"
          onClick={() => onCardClick(item)}
        >
          <h3 className="font-bold mb-1">{item.title}</h3>
          <p className="text-sm text-gray-400 mb-2">{item.desc}</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {item.tags.map((tag, i) => (
              <span key={i} className="text-xs bg-blue-700 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-300">
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
        className="w-full flex items-center justify-center gap-2 py-2 bg-gray-700 rounded text-white hover:bg-gray-600"
      >
        <FaPlus /> Add card
      </button>
    </div>
  </div>
);

const TaskModal = ({ task, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg w-[90%] max-w-lg text-gray-800 relative">
      <button className="absolute top-3 right-3 text-lg" onClick={onClose}>
        <FaTimes />
      </button>
      <h2 className="text-2xl font-bold mb-2">{task.title}</h2>
      <p className="text-sm mb-4">{task.desc}</p>
      <div className="flex flex-wrap gap-2 mb-2">
        {task.tags.map((tag, idx) => (
          <span key={idx} className="text-xs bg-blue-700 px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-4 text-sm text-gray-400">
        <span className="flex items-center gap-1">
          <FaCommentAlt /> {task.comments} comments
        </span>
        <span className="flex items-center gap-1">
          <FaPaperclip /> {task.files} files
        </span>
      </div>
    </div>
  </div>
);

const AddCardModal = ({ onClose, onAdd, column }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tag, setTag] = useState("");

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
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-[90%] max-w-lg text-gray-800 dark:text-white relative">
        <button className="absolute top-3 right-3 text-lg" onClick={onClose}>
          <FaTimes />
        </button>
        <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
        <input
          type="text"
          className="w-full p-2 mb-2 rounded bg-gray-200 dark:bg-gray-800"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full p-2 mb-2 rounded bg-gray-200 dark:bg-gray-800"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <input
          type="text"
          className="w-full p-2 mb-4 rounded bg-gray-200 dark:bg-gray-800"
          placeholder="Tag (e.g., Development)"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-white"
        >
          Add Task
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

  useEffect(() => {
    saveToStorage(data);
  }, [data]);

  const handleAddCardClick = (column) => {
    setAddColumn(column);
    setAddModalOpen(true);
  };

  const handleAddCard = (column, newCard) => {
    setData((prev) => ({
      ...prev,
      [column]: [...prev[column], newCard],
    }));
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4">
        <KanbanColumn
          title="To Do"
          items={data.todo}
          onCardClick={setSelectedTask}
          onAddCardClick={handleAddCardClick}
        />
        <KanbanColumn
          title="In Progress"
          items={data.inprogress}
          onCardClick={setSelectedTask}
          onAddCardClick={handleAddCardClick}
        />
        <KanbanColumn
          title="Completed"
          items={data.completed}
          onCardClick={setSelectedTask}
          onAddCardClick={handleAddCardClick}
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
        />
      )}
    </>
  );
}
