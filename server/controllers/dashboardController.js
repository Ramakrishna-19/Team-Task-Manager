import Task from "../models/Task.js";
import Project from "../models/Project.js";

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    const projects = await Project.find({ members: userId });

    const projectIds = projects.map((p) => p._id);

    const tasks = await Task.find({ project: { $in: projectIds } });

    const totalTasks = tasks.length;
    const todo = tasks.filter((t) => t.status === "todo").length;
    const inProgress = tasks.filter((t) => t.status === "in-progress").length;
    const done = tasks.filter((t) => t.status === "done").length;

    const now = new Date();
    const overdue = tasks.filter(
      (t) => t.dueDate && t.dueDate < now && t.status !== "done"
    );

    res.json({
      totalProjects: projects.length,
      totalTasks,
      status: {
        todo,
        inProgress,
        done,
      },
      overdueTasks: overdue.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};