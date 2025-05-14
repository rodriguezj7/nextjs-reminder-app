import React, { useState } from "react";
import RemindersList from "./RemindersList";
import remindersCSS from './reminders.module.css';

interface Reminder {
  _id: string;
  dueDate: string;
  title: string;
  description: string;
  status: "overdue" | "to-do" | "completed";
}

interface RemindersProps {
  reminders: Array<Reminder>;
  onViewCompleted: () => void;
  onCreateNew: (newReminder: Reminder) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updatedReminder: Reminder) => void;
  onComplete: (id: string) => void;
}

export default function Reminders({
  reminders,
  // onViewCompleted,
  onCreateNew,
  onDelete,
  onEdit,
  onComplete,
}: RemindersProps) {
  const [newReminder, setNewReminder] = useState({
    date: "",
    description: "",
  });

  const handleAddReminder = () => {
    if (!newReminder.date || !newReminder.description) return;
    onCreateNew({
      _id: null,
      dueDate: newReminder.date,
      description: newReminder.description,
      status: "to-do",
    });
    setNewReminder({ date: "", description: "" });
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Reminders: {reminders.length}</h4>
        <div className={remindersCSS.remindersButtons}>
          {/* <button className="btn btn-outline-primary me-2" onClick={onViewCompleted}>
            View Completed
          </button> */}
          <button className="btn btn-primary" onClick={handleAddReminder} style={{
                backgroundColor:' #163B42',
                borderColor: '#163B42',
                color: 'white',
                }}>
            Create New Test change 2
          </button>
        </div>
      </div>

      {/* New Reminder Form */}
      <div className="border p-3 mb-3 rounded">
        <input
          type="date"
          className="form-control mb-2"
          value={newReminder.date}
          onChange={(e) => setNewReminder({ ...newReminder, date: e.target.value })}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Add Note"
          value={newReminder.description}
          onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
        />
      </div>

      {/* Render Reminder List */}
      <RemindersList reminders={reminders} onDelete={onDelete} onEdit={onEdit} onComplete={onComplete} />
    </div>
  );
}