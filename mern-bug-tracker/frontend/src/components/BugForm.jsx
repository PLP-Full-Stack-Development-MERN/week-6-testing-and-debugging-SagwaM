import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import {
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
  } from "@mui/material";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }).max(100, { message: "Title must not exceed 100 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  status: z.enum(["open", "in-progress", "in-review", "resolved"]),
  priority: z.enum(["low", "medium", "high", "critical"]),
  reportedBy: z.string().min(2, { message: "Reporter name must be at least 2 characters." }),
  assignedTo: z.string().optional(),
  steps: z.string().optional(),
  environment: z.string().optional(),
});

const BugForm = ({ initialData, onSubmit, isSubmitting = false, className }) => {
  const isEditing = !!initialData?.id;

  const defaultValues = {
    title: initialData?.title || "",
    description: initialData?.description || "",
    status: initialData?.status || "open",
    priority: initialData?.priority || "medium",
    reportedBy: initialData?.reportedBy || "",
    assignedTo: initialData?.assignedTo || "",
    steps: initialData?.steps || "",
    environment: initialData?.environment || "",
  };

  const { register, handleSubmit, watch, formState: { errors } } = useForm({ 
    resolver: zodResolver(formSchema), 
    defaultValues 
  });

  const handleFormSubmit = (data) => {
    try {
      onSubmit(data);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit the bug report. Please try again.");
    }
  };

  return (
    <Box className={cn("animate-fade-in", className)}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {/* Title */}
        <TextField
          label="Bug Title"
          {...register("title")}
          error={!!errors.title}
          helperText={errors.title?.message}
          required
          fullWidth
          margin="normal"
        />

        {/* Description */}
        <TextField
          label="Description"
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
          required
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />

        {/* Status */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select {...register("status")} defaultValue={defaultValues.status}>
            <MenuItem value="open">Open</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="in-review">In Review</MenuItem>
            <MenuItem value="resolved">Resolved</MenuItem>
          </Select>
        </FormControl>

        {/* Priority */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Priority</InputLabel>
          <Select {...register("priority")} defaultValue={defaultValues.priority}>
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
            <MenuItem value="critical">Critical</MenuItem>
          </Select>
        </FormControl>

        {/* Reported By */}
        <TextField
          label="Reported By"
          {...register("reportedBy")}
          error={!!errors.reportedBy}
          helperText={errors.reportedBy?.message}
          required
          fullWidth
          margin="normal"
        />

        {/* Assigned To */}
        <TextField
          label="Assigned To (Optional)"
          {...register("assignedTo")}
          fullWidth
          margin="normal"
        />

        {/* Steps to Reproduce */}
        <TextField
          label="Steps to Reproduce"
          {...register("steps")}
          fullWidth
          multiline
          rows={3}
          margin="normal"
        />

        {/* Environment */}
        <TextField
          label="Environment (OS, Browser, etc.)"
          {...register("environment")}
          fullWidth
          margin="normal"
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          sx={{ mt: 2 }}
        >
          {isSubmitting ? "Submitting..." : "Submit Bug Report"}
        </Button>
      </form>
    </Box>
  );
};

export default BugForm;
