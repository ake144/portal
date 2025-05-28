"use client";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useState } from "react";

interface College {
  id: number;
  name: string;
}

interface AddNoticeCardProps {
  colleges: College[];
  onNoticeAdded: () => void;
  onCancel: () => void;
}

export function AddNoticeCard({ colleges, onNoticeAdded, onCancel }: AddNoticeCardProps) {
  const [formData, setFormData] = useState({
    college_id: "",
    message: "",
    deadline: "",
    is_active: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/notices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          college_id: Number.parseInt(formData.college_id),
        }),
      });

      if (response.ok) {
        toast("Success", {
          description: "Notice has been added successfully.",
        });
        setFormData({
          college_id: "",
          message: "",
          deadline: "",
          is_active: true,
        });
        onNoticeAdded();
      } else {
        throw new Error("Failed to add notice");
      }
    } catch (error) {
      toast("Error", {
        description: "Failed to add notice. Please try again.",
        style: {
          color: "red",
          backgroundColor: "#f8d7da",
          borderColor: "#f5c6cb",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-[60%] mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Add New Notice</h2>
        <p className="text-sm text-gray-500 mt-1">Fill in the details below to create a new notice</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="college">College *</Label>
          <Select
            value={formData.college_id}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, college_id: value }))}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a college" />
            </SelectTrigger>
            <SelectContent>
              {colleges.map((college) => (
                <SelectItem key={college.id} value={college.id.toString()}>
                  {college.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label htmlFor="message">Notice Message *</Label>
          <Textarea
            id="message"
            placeholder="Enter the notice content..."
            value={formData.message}
            onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
            required
            rows={5}
            className="min-h-[120px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="deadline">Deadline *</Label>
            <Input
              id="deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData((prev) => ({ ...prev, deadline: e.target.value }))}
              required
            />
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center h-10">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, is_active: checked }))}
              />
            </div>
            <div>
              <Label htmlFor="is_active" className="block mb-1">
                Notice Status
              </Label>
              <p className="text-sm text-gray-500">
                {formData.is_active ? "Active" : "Inactive"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="min-w-[100px]"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="min-w-[100px] bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? "Adding..." : "Add Notice"}
          </Button>
        </div>
      </form>
    </div>
  );
}