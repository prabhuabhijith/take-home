import "./styles.css";
import React from "react";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

export default function App() {
  const [allTaskList, setAllTaskList] = React.useState([]);
  const [allCategories, setAllCategories] = React.useState([]);
  const [catName, setCatName] = React.useState("");
  const [taskName, setTaskName] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [openTask, setOpenTask] = React.useState(false);

  const openDialogBox = () => {
    setOpen(true);
  };

  const openDialogBoxforTask = () => {
    setOpenTask(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseTask = () => {
    setOpenTask(false);
  };

  const addNewCategory = () => {
    var newCategory = {
      id: new Date().getTime(),
      name: catName
    };
    if (!selectedCategory) {
      setSelectedCategory(newCategory.id);
    }
    setAllCategories((prevState) => [...prevState, newCategory]);
    setCatName("");
    setOpen(false);
  };

  const addNewTask = () => {
    var newTask = {
      id: new Date().getTime(),
      name: taskName,
      category: selectedCategory,
      completed: false
    };
    setAllTaskList((prevState) => [...prevState, newTask]);
    setTaskName("");
    setOpenTask(false);
  };

  const deleteTask = (id) => {
    const indexDelete = allTaskList.findIndex((task) => task.id === id);
    const newtaskList = [...allTaskList];
    newtaskList.splice(indexDelete, 1);
    setAllTaskList(newtaskList);
  };

  const completeTask = (id) => {
    const indexComplete = allTaskList.findIndex((task) => task.id === id);
    const newtaskList = [...allTaskList];
    newtaskList[indexComplete].completed = !newtaskList[indexComplete]
      .completed;
    setAllTaskList(newtaskList);
  };

  return (
    <div className="App">
      <div className="d-flex">
        <div className="cat-wrapper">
          <p>All Categories</p>
          {allCategories.map((categorie) => (
            <div
              key={categorie.id}
              onClick={() => setSelectedCategory(categorie.id)}
            >
              <p
                className={
                  categorie.id === selectedCategory
                    ? "cat-name-selected"
                    : "cat-name"
                }
              >
                {categorie.name}
              </p>
            </div>
          ))}
          <button className="add-icon" onClick={openDialogBox}>+</button>
          <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
           Enter Category Name
        </DialogTitle>
        <DialogContent>
        <input
            value={catName}
            onChange={(e) => setCatName(e.target.value)}
            placeholder="Enter Category Name"
          />
        </DialogContent>
        <DialogActions>
        <button disabled={!catName} onClick={() => addNewCategory()}>
            Add Category
          </button>
          <button onClick={handleClose} color="primary" autoFocus>
           Cancel
          </button>
        </DialogActions>
      </Dialog>
          <br />
          <br />
          
        </div>
        <div className="task-wrapper">
          <p>Tasks for Category</p>
          {allTaskList
            .filter((task, index) => task.category === selectedCategory)
            .map((innerTask) => (
              <div className="d-flex-center" key={innerTask.id}>
                <div className="d-flex-center">
                  <input
                    type="checkbox"
                    checked={innerTask.completed}
                    onClick={() => completeTask(innerTask.id)}
                  />
                  <p>
                    {innerTask.name}
                  </p>
                </div>
                <span
                  className="danger"
                  onClick={() => deleteTask(innerTask.id)}
                >
                  X
                </span>
              </div>
            ))}
        
          <br />
          <br />
          <button className="add-icon" onClick={openDialogBoxforTask}>+</button>
          <Dialog open={openTask} onClose={handleCloseTask}>
        <DialogTitle>
           Enter Task Name
        </DialogTitle>
        <DialogContent>
        <input
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Enter Task Name"
            disabled={!selectedCategory}
          />
        </DialogContent>
        <DialogActions>
        <button
            disabled={!selectedCategory || !taskName}
            onClick={() => addNewTask()}
          >
            Add Task
          </button>
          <button onClick={handleCloseTask} color="primary" autoFocus>
           Cancel
          </button>
        </DialogActions>
      </Dialog>
        </div>
      </div>
    </div>
  );
}
