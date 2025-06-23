"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  BUnitName: z.string().min(2, "Business unit name must be at least 2 characters."),
  Location: z.string().min(2, "Location must be at least 2 characters."),
});

export default function RegisterBusinessUnitForm() {
  const [status, setStatus] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      BUnitName: "",
      Location: "",
    },
  });

  const onSubmit = async (values) => {
    setStatus({ message: "Registering...", type: "info" });
    try {
      const response = await axios.post("/api/business-units", values);
      setStatus({ message: response.data.message, type: "success" });
      form.reset();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      setStatus({ message: errorMessage, type: "error" });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Register Standalone Business Unit</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="BUnitName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Unit Name</FormLabel>
                <FormControl>
                  <Input placeholder="Primal Confectionaries" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="4, Honour Way." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Registering..." : "Register Unit"}
          </Button>
        </form>
      </Form>
      {status && (
        <p className={`mt-4 text-sm ${
            status.type === "success" ? "text-green-600" :
            status.type === "error" ? "text-red-600" : "text-gray-600"
          }`}
        >
          {status.message}
        </p>
      )}
    </div>
  );
}
