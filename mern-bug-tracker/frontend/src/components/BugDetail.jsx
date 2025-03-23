import { useState } from "react";
import PropTypes from "prop-types";
import { formatTimeElapsed } from "../lib/bug-utils";
import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";
import Divider from "@mui/material/Divider";
import { Edit, Trash2, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Button
  } from "@mui/material";

const BugDetail = ({ bug, onDelete, className }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleDelete = () => {
    if (onDelete) {
      onDelete(bug.id);
      navigate("/bugs");
    }
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className={cn("space-y-6 animate-fade-in", className)}>
      <div className="flex justify-between items-start flex-wrap gap-4">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link to={`/bugs/${bug.id}/edit`}>
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Link>
          </Button>

          <Button variant="destructive" size="sm" onClick={() => setIsDeleteDialogOpen(true)}>
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          <StatusBadge status={bug.status} />
          <PriorityBadge priority={bug.priority} />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold">{bug.title}</h1>

        <div className="text-sm text-muted-foreground">
          <p>Reported by <span className="font-medium text-foreground">{bug.reportedBy}</span> on {formatTimeElapsed(bug.createdAt)}</p>
          {bug.assignedTo && (
            <p>Assigned to <span className="font-medium text-foreground">{bug.assignedTo}</span></p>
          )}
          <p>Last updated: {formatTimeElapsed(bug.updatedAt)}</p>
        </div>
      </div>

      <Divider />

      <div className="space-y-6">
        <section>
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <div className="text-sm whitespace-pre-line bg-accent/50 p-4 rounded-md">
            {bug.description}
          </div>
        </section>

        {bug.steps && (
          <section>
            <h2 className="text-lg font-semibold mb-2">Steps to Reproduce</h2>
            <div className="text-sm whitespace-pre-line bg-accent/50 p-4 rounded-md">
              {bug.steps}
            </div>
          </section>
        )}

        {bug.environment && (
          <section>
            <h2 className="text-lg font-semibold mb-2">Environment</h2>
            <div className="text-sm bg-accent/50 p-4 rounded-md">
              {bug.environment}
            </div>
          </section>
        )}
      </div>

      <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
            <DialogContentText>
            Are you sure you want to delete this bug report? This action cannot be undone.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button variant="outlined" onClick={() => setIsDeleteDialogOpen(false)}>
            Cancel
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

// Define PropTypes for type checking
BugDetail.propTypes = {
  bug: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    steps: PropTypes.string,
    environment: PropTypes.string,
    reportedBy: PropTypes.string.isRequired,
    assignedTo: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func,
  className: PropTypes.string,
};

export default BugDetail;
